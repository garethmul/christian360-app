import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import { Audio } from 'expo-av';
import * as rssParser from 'react-native-rss-parser';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.375;

// Global audio state to prevent multiple audio playing simultaneously
class AudioService {
  static currentSound = null;
  static playingId = null;
  static isPlaying = false;
  static listeners = [];

  static async playNewSound(audioUrl, id) {
    // Stop current sound if any
    await AudioService.stopCurrentSound();
    
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true },
        AudioService.onPlaybackStatusUpdate
      );
      
      AudioService.currentSound = sound;
      AudioService.playingId = id;
      AudioService.isPlaying = true;
      AudioService.notifyListeners();
      
      return sound;
    } catch (error) {
      console.error('Error playing audio:', error);
      return null;
    }
  }
  
  static async stopCurrentSound() {
    if (AudioService.currentSound) {
      try {
        // Check if the sound is loaded before attempting to stop/unload
        const status = await AudioService.currentSound.getStatusAsync();
        if (status.isLoaded) {
          await AudioService.currentSound.stopAsync();
          await AudioService.currentSound.unloadAsync();
        }
      } catch (error) {
        console.error('Error stopping audio:', error);
        // Even if there's an error, we should reset the state
      }
      AudioService.currentSound = null;
      AudioService.playingId = null;
      AudioService.isPlaying = false;
      AudioService.notifyListeners();
    }
  }
  
  static async togglePlayPause() {
    if (!AudioService.currentSound) return;
    
    try {
      if (AudioService.isPlaying) {
        await AudioService.currentSound.pauseAsync();
        AudioService.isPlaying = false;
      } else {
        await AudioService.currentSound.playAsync();
        AudioService.isPlaying = true;
      }
      AudioService.notifyListeners();
    } catch (error) {
      console.error('Error toggling play/pause:', error);
    }
  }
  
  static onPlaybackStatusUpdate(status) {
    if (status.isLoaded) {
      AudioService.isPlaying = status.isPlaying;
      
      if (status.didJustFinish) {
        AudioService.isPlaying = false;
        AudioService.playingId = null;
      }
      
      AudioService.notifyListeners();
    }
  }
  
  static addListener(callback) {
    AudioService.listeners.push(callback);
    return () => {
      AudioService.listeners = AudioService.listeners.filter(listener => listener !== callback);
    };
  }
  
  static notifyListeners() {
    AudioService.listeners.forEach(listener => {
      listener({
        playingId: AudioService.playingId,
        isPlaying: AudioService.isPlaying
      });
    });
  }
}

// Helper function to format duration from seconds to MM:SS or HH:MM:SS
const formatDuration = (duration) => {
  if (!duration) return '';
  
  // If duration is already formatted as 'MM:SS' or 'HH:MM:SS', return it as is
  if (typeof duration === 'string' && duration.includes(':')) {
    return duration;
  }
  
  // If duration is a number (seconds), format it
  let seconds = parseInt(duration, 10);
  if (isNaN(seconds)) return '';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
};

const PodcastCarousel = ({ feedUrl, title, navigateToPlayer, horizontalLayout = false }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState({}); // Store progress for each podcast
  const [playbackState, setPlaybackState] = useState({
    playingId: null,
    isPlaying: false
  });

  useEffect(() => {
    fetchPodcasts();
    
    // Subscribe to audio service updates
    const unsubscribe = AudioService.addListener(state => {
      setPlaybackState(state);
    });
    
    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, [feedUrl]);

  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch the RSS feed
      const response = await fetch(feedUrl);
      const responseText = await response.text();
      
      // Parse the RSS feed
      const parsedFeed = await rssParser.parse(responseText);
      
      // Extract podcast items
      const podcastItems = parsedFeed.items.map(item => {
        // Extract image URL from the enclosure or try to find it in the item description
        let imageUrl = '';
        
        // Try to get image from itunes:image
        if (item.itunes && item.itunes.image) {
          imageUrl = item.itunes.image;
        } 
        // If no itunes image, try to find an enclosure of type image
        else if (item.enclosures && item.enclosures.length > 0) {
          const imageEnclosure = item.enclosures.find(enc => enc.mimeType && enc.mimeType.startsWith('image/'));
          if (imageEnclosure) {
            imageUrl = imageEnclosure.url;
          } else {
            // If no image enclosure, use the first audio enclosure and later we'll use show artwork
            const audioEnclosure = item.enclosures.find(enc => enc.mimeType && enc.mimeType.startsWith('audio/'));
            if (audioEnclosure) {
              // We'll use show artwork instead
              imageUrl = parsedFeed.image ? parsedFeed.image.url : '';
            }
          }
        }
        
        // If still no image, try to use the feed's image
        if (!imageUrl && parsedFeed.image) {
          imageUrl = parsedFeed.image.url;
        }
        
        // Format the date
        const pubDate = new Date(item.published);
        const formattedDate = pubDate.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
        
        // Format duration properly
        const formattedDuration = formatDuration(item.itunes?.duration);
        
        return {
          id: item.id || item.guid || item.title,
          title: item.title,
          description: item.description,
          published: formattedDate,
          audioUrl: item.enclosures && item.enclosures.length > 0 
            ? item.enclosures.find(enc => enc.mimeType && enc.mimeType.startsWith('audio/'))?.url || ''
            : '',
          imageUrl,
          duration: formattedDuration,
          link: item.links && item.links.length > 0 ? item.links[0].url : '',
          publisher: parsedFeed.title || '',
        };
      });
      
      setPodcasts(podcastItems);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching podcasts:', err);
      setError('Failed to load podcasts. Please try again later.');
      setLoading(false);
    }
  };

  const togglePlayPause = async (episode) => {
    // If this is the currently playing episode
    if (playbackState.playingId === episode.id) {
      // Toggle play/pause
      AudioService.togglePlayPause();
    } else {
      // Play a new episode
      if (!episode.audioUrl) {
        console.error('No audio URL found for this episode');
        return;
      }
      
      try {
        await AudioService.playNewSound(episode.audioUrl, episode.id);
        
        // Initialize progress for this episode if not already set
        if (!progress[episode.id]) {
          setProgress(prev => ({
            ...prev,
            [episode.id]: 0
          }));
        }
      } catch (error) {
        console.error('Error playing podcast:', error);
      }
    }
  };

  const renderVerticalPodcastItem = ({ item }) => {
    const isPlaying = playbackState.playingId === item.id && playbackState.isPlaying;
    const currentProgress = progress[item.id] || 0;
    
    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigateToPlayer && navigateToPlayer(item)}
        activeOpacity={0.7}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image' }} 
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.playButton}
            onPress={(e) => {
              e.stopPropagation();
              togglePlayPause(item);
            }}
          >
            <Ionicons 
              name={isPlaying ? "pause-circle" : "play-circle"} 
              size={50} 
              color="white" 
            />
          </TouchableOpacity>
          {currentProgress > 0 && (
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${currentProgress * 100}%` }]} />
            </View>
          )}
        </View>
        <View style={styles.contentContainer}>
          <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.published}</Text>
          {item.duration && (
            <View style={styles.durationContainer}>
              <Ionicons name="time-outline" size={14} color="#6b7280" />
              <Text style={styles.duration}>{item.duration}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderHorizontalPodcastItem = ({ item }) => {
    const isPlaying = playbackState.playingId === item.id && playbackState.isPlaying;
    const currentProgress = progress[item.id] || 0;
    
    return (
      <TouchableOpacity 
        style={styles.horizontalCard}
        onPress={() => navigateToPlayer && navigateToPlayer(item)}
        activeOpacity={0.7}
      >
        <View style={styles.horizontalImageContainer}>
          <Image 
            source={{ uri: item.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image' }} 
            style={styles.horizontalImage}
            resizeMode="cover"
          />
          {currentProgress > 0 && (
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${currentProgress * 100}%` }]} />
            </View>
          )}
        </View>
        <View style={styles.horizontalContentContainer}>
          <Text numberOfLines={2} style={styles.horizontalTitle}>{item.title}</Text>
          <Text style={styles.horizontalPublisher} numberOfLines={1}>{item.publisher}</Text>
          <View style={styles.horizontalMetaContainer}>
            <Text style={styles.date}>{item.published}</Text>
            {item.duration && (
              <View style={styles.durationContainer}>
                <Ionicons name="time-outline" size={14} color="#6b7280" />
                <Text style={styles.duration}>{item.duration}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity 
            style={styles.horizontalPlayButton}
            onPress={(e) => {
              e.stopPropagation();
              togglePlayPause(item);
            }}
          >
            <Ionicons 
              name={isPlaying ? "pause-circle" : "play-circle"} 
              size={40} 
              color="#6366f1" 
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={50} color="#ef4444" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchPodcasts}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (podcasts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="mic-off-outline" size={50} color="#9ca3af" />
        <Text style={styles.emptyText}>No podcasts found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={podcasts}
        renderItem={horizontalLayout ? renderHorizontalPodcastItem : renderVerticalPodcastItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 0,
  },
  listContent: {
    paddingLeft: 0,
    paddingRight: 8,
  },
  // Vertical card styles
  card: {
    width: CARD_WIDTH,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6366f1',
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#1f2937',
  },
  date: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 13,
    color: '#6b7280',
    marginLeft: 4,
  },
  // Horizontal card styles
  horizontalCard: {
    flexDirection: 'row',
    width: width * 0.8,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  horizontalImageContainer: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  horizontalImage: {
    width: '100%',
    height: '100%',
  },
  horizontalContentContainer: {
    flex: 1,
    padding: 12,
    position: 'relative',
  },
  horizontalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1f2937',
    paddingRight: 40, // Make room for play button
  },
  horizontalPublisher: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  horizontalMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  horizontalPlayButton: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  // Other styles
  loadingContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
    marginTop: 12,
  },
});

// Export the AudioService as well so it can be used by other components
export { AudioService };
export default PodcastCarousel; 