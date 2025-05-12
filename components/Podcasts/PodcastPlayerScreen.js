import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StatusBar
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AudioService } from './PodcastCarousel';

const { width } = Dimensions.get('window');

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const PodcastPlayerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { podcast } = route.params || {};
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [positionText, setPositionText] = useState('0:00');
  const [durationText, setDurationText] = useState('0:00');
  
  useEffect(() => {
    // Load and play the podcast when the screen mounts
    loadAudio();
    
    // Subscribe to audio status updates
    const unsubscribe = AudioService.addListener(state => {
      setIsPlaying(state.isPlaying && state.playingId === podcast?.id);
    });
    
    // Cleanup function to unload the audio when the screen unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  
  // Effect to update position every second while playing
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(async () => {
        if (AudioService.currentSound) {
          try {
            const status = await AudioService.currentSound.getStatusAsync();
            if (status.isLoaded) {
              setPosition(status.positionMillis / 1000);
              setPositionText(formatTime(status.positionMillis / 1000));
            }
          } catch (error) {
            console.error('Error getting playback status:', error);
          }
        }
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying]);
  
  const loadAudio = async () => {
    if (!podcast || !podcast.audioUrl) {
      setError('No audio URL provided');
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Stop any current audio (from carousel or another player)
      await AudioService.stopCurrentSound();
      
      // Set up status update listener for this component
      const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
          setDuration(status.durationMillis / 1000);
          setDurationText(formatTime(status.durationMillis / 1000));
          setPosition(status.positionMillis / 1000);
          setPositionText(formatTime(status.positionMillis / 1000));
          setIsPlaying(status.isPlaying);
          
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        } else {
          if (status.error) {
            console.error(`Encountered a fatal error during playback: ${status.error}`);
            setError(`Playback Error: ${status.error}`);
          }
        }
      };
      
      // Play the podcast using AudioService
      const { sound } = await Audio.Sound.createAsync(
        { uri: podcast.audioUrl },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );
      
      // Store the sound in AudioService
      AudioService.currentSound = sound;
      AudioService.playingId = podcast.id;
      AudioService.isPlaying = true;
      AudioService.notifyListeners();
      
      setIsPlaying(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading audio:', error);
      setError('Failed to load audio. Please try again.');
      setIsLoading(false);
    }
  };
  
  const handlePlayPause = async () => {
    await AudioService.togglePlayPause();
  };
  
  const handleSeek = async (value) => {
    if (!AudioService.currentSound) return;
    
    try {
      // Check if the sound is loaded before attempting to seek
      const status = await AudioService.currentSound.getStatusAsync();
      if (status.isLoaded) {
        await AudioService.currentSound.setPositionAsync(value * 1000);
      }
    } catch (error) {
      console.error('Error seeking:', error);
      // Don't show an error UI for seek failures, just log it
    }
  };
  
  const handleSkipBackward = async () => {
    if (!AudioService.currentSound) return;
    
    try {
      // Check if the sound is loaded before attempting to seek
      const status = await AudioService.currentSound.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = Math.max(0, position - 15);
        await AudioService.currentSound.setPositionAsync(newPosition * 1000);
      }
    } catch (error) {
      console.error('Error skipping backward:', error);
      // Don't show an error UI for skip failures, just log it
    }
  };
  
  const handleSkipForward = async () => {
    if (!AudioService.currentSound) return;
    
    try {
      // Check if the sound is loaded before attempting to seek
      const status = await AudioService.currentSound.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = Math.min(duration, position + 30);
        await AudioService.currentSound.setPositionAsync(newPosition * 1000);
      }
    } catch (error) {
      console.error('Error skipping forward:', error);
      // Don't show an error UI for skip failures, just log it
    }
  };
  
  const handleBack = () => {
    navigation.goBack();
  };
  
  if (!podcast) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={50} color="#ef4444" />
          <Text style={styles.errorText}>No podcast data provided</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <Ionicons name="chevron-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <View style={styles.placeholderButton} />
      </View>
      
      {/* Album Art */}
      <View style={styles.artworkContainer}>
        <Image 
          source={{ uri: podcast.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image' }} 
          style={styles.artwork}
          resizeMode="cover"
        />
      </View>
      
      {/* Podcast Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{podcast.title}</Text>
        <Text style={styles.publisher} numberOfLines={1}>{podcast.publisher || 'Unknown Publisher'}</Text>
      </View>
      
      {/* Playback Error */}
      {error && (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={loadAudio}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Slider
          style={styles.progressBar}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={handleSeek}
          minimumTrackTintColor="#6366f1"
          maximumTrackTintColor="#e5e7eb"
          thumbTintColor="#6366f1"
          disabled={isLoading || !!error}
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{positionText}</Text>
          <Text style={styles.timeText}>{durationText}</Text>
        </View>
      </View>
      
      {/* Playback Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={handleSkipBackward}
          disabled={isLoading || !!error}
        >
          <Ionicons name="play-skip-back-outline" size={24} color={isLoading || error ? "#9ca3af" : "#1f2937"} />
          <Text style={[styles.skipText, isLoading || error ? { color: "#9ca3af" } : null]}>15s</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.playButton}
          onPress={handlePlayPause}
          disabled={isLoading || !!error}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <Ionicons name={isPlaying ? "pause" : "play"} size={36} color="#ffffff" />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={handleSkipForward}
          disabled={isLoading || !!error}
        >
          <Ionicons name="play-skip-forward-outline" size={24} color={isLoading || error ? "#9ca3af" : "#1f2937"} />
          <Text style={[styles.skipText, isLoading || error ? { color: "#9ca3af" } : null]}>30s</Text>
        </TouchableOpacity>
      </View>
      
      {/* Description */}
      <ScrollView style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Episode Description</Text>
        <Text style={styles.description}>{podcast.description || 'No description available.'}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  placeholderButton: {
    width: 40,
  },
  artworkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  artwork: {
    width: width - 80,
    height: width - 80,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  infoContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  publisher: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  errorMessageContainer: {
    padding: 16,
    backgroundColor: '#fee2e2',
    marginHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  errorMessage: {
    color: '#b91c1c',
    textAlign: 'center',
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  progressContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  progressBar: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -12,
  },
  timeText: {
    fontSize: 12,
    color: '#6b7280',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  secondaryButton: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  skipText: {
    fontSize: 12,
    marginTop: 4,
    color: '#1f2937',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 32,
  },
  descriptionContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  backButtonText: {
    color: '#6366f1',
    fontWeight: 'bold',
  },
});

export default PodcastPlayerScreen; 