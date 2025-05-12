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
const CARD_WIDTH = width * 0.75;

const PodcastCarousel = ({ feedUrl, title, navigateToPlayer }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sound, setSound] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    fetchPodcasts();
    
    // Cleanup function
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
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
        
        return {
          id: item.id || item.guid || item.title,
          title: item.title,
          description: item.description,
          published: formattedDate,
          audioUrl: item.enclosures && item.enclosures.length > 0 
            ? item.enclosures.find(enc => enc.mimeType && enc.mimeType.startsWith('audio/'))?.url || ''
            : '',
          imageUrl,
          duration: item.itunes && item.itunes.duration ? item.itunes.duration : '',
          link: item.links && item.links.length > 0 ? item.links[0].url : '',
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

  const playPauseEpisode = async (episode) => {
    // If there's already a sound playing
    if (sound) {
      // If it's the same episode, toggle play/pause
      if (playingId === episode.id) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          if (status.isPlaying) {
            await sound.pauseAsync();
          } else {
            await sound.playAsync();
          }
        }
      } else {
        // If it's a different episode, unload the current and play the new one
        await sound.unloadAsync();
        loadAndPlaySound(episode);
      }
    } else {
      // If no sound is currently loaded, load and play the episode
      loadAndPlaySound(episode);
    }
  };

  const loadAndPlaySound = async (episode) => {
    try {
      if (!episode.audioUrl) {
        console.error('No audio URL found for this episode');
        return;
      }
      
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: episode.audioUrl },
        { shouldPlay: true }
      );
      
      setSound(newSound);
      setPlayingId(episode.id);
      
      // Listen for playback status updates
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setPlayingId(null);
        }
      });
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const renderPodcastItem = ({ item }) => {
    const isPlaying = playingId === item.id;
    
    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigateToPlayer ? navigateToPlayer(item) : playPauseEpisode(item)}
        activeOpacity={0.7}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image' }} 
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.playButton}>
            <Ionicons 
              name={isPlaying ? "pause-circle" : "play-circle"} 
              size={50} 
              color="white" 
            />
          </View>
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
        renderItem={renderPodcastItem}
        keyExtractor={(item) => item.id}
        horizontal
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
    paddingHorizontal: 16,
  },
  listContent: {
    paddingLeft: 16,
    paddingRight: 8,
  },
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

export default PodcastCarousel; 