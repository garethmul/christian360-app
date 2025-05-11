import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

// Reuse sample moments data from MomentStories.js
// In a real app, this would be imported from a central data store
const sampleMoments = [
  {
    id: 'moment1',
    title: 'Morning Prayer',
    time: '07:00',
    user: {
      id: 'user1',
      name: 'Emma Taylor',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'verse', text: 'Psalm 5:3', content: 'In the morning, Lord, you hear my voice; in the morning I lay my requests before you and wait expectantly.' },
      { type: 'prayer', content: 'Lord, as I begin this day, guide my thoughts and actions...' },
      { type: 'reflection', content: 'How can I be more intentional about starting my day with God?' }
    ]
  },
  {
    id: 'moment2',
    title: 'Daily Verse',
    time: '12:00',
    user: {
      id: 'user2',
      name: 'Daily Light',
      avatar: 'https://i.imgur.com/NE0e3Dt.png'
    },
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'verse', text: 'Philippians 4:13', content: 'I can do all things through Christ who strengthens me.' },
      { type: 'explanation', content: 'This verse reminds us that our strength comes not from ourselves but from Christ.' },
      { type: 'application', content: 'What challenge are you facing today that you need Christ\'s strength for?' }
    ]
  },
  {
    id: 'moment3',
    title: 'Evening Reflection',
    time: '19:30',
    user: {
      id: 'user3',
      name: 'Pastor David',
      avatar: 'https://randomuser.me/api/portraits/men/85.jpg'
    },
    image: 'https://images.unsplash.com/photo-1510137200597-2c01abeff42a?auto=format&fit=crop&w=500&q=60',
    viewed: true,
    content: [
      { type: 'question', content: 'How did you see God working in your life today?' },
      { type: 'meditation', content: 'Take a moment to reflect on the blessings of today...' },
      { type: 'prayer', content: 'Lord, thank you for your presence in my life today...' }
    ]
  },
  {
    id: 'moment4',
    title: 'Night Devotion',
    time: '21:45',
    user: {
      id: 'user4',
      name: 'Peace & Rest',
      avatar: 'https://i.imgur.com/H4PnCGh.png'
    },
    image: 'https://images.unsplash.com/photo-1488866022504-f2584929ca5f?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'verse', text: 'Psalm 4:8', content: 'In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.' },
      { type: 'gratitude', content: 'List three things you\'re thankful for today...' },
      { type: 'prayer', content: 'Lord, as I close this day...' }
    ]
  },
  {
    id: 'moment5',
    title: 'World Prayer',
    time: '16:00',
    user: {
      id: 'user5',
      name: 'Global Mission',
      avatar: 'https://i.imgur.com/4QgRC0A.png'
    },
    image: 'https://images.unsplash.com/photo-1589483233147-8c6e2fb175a5?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'focus', content: 'Today we pray for Christian communities in Northern Africa' },
      { type: 'info', content: 'Many believers in this region face persecution and limited resources...' },
      { type: 'prayer', content: 'Lord, strengthen and protect your people in Northern Africa...' }
    ]
  }
];

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PROGRESS_BAR_HEIGHT = 3;
const LONG_PRESS_DURATION = 500;
const STORY_DURATION = 6000; // 6 seconds per story segment

const MomentViewer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const { momentId } = route.params || { momentId: 'moment1' };

  // Find the starting moment index
  const startIndex = sampleMoments.findIndex(moment => moment.id === momentId);
  const [currentMomentIndex, setCurrentMomentIndex] = useState(startIndex >= 0 ? startIndex : 0);
  const [contentIndex, setContentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Animation values
  const progressValue = useRef(new Animated.Value(0)).current;
  const animation = useRef(null);
  
  const currentMoment = sampleMoments[currentMomentIndex];
  const currentContent = currentMoment?.content[contentIndex];
  
  // Reset and start progress animation
  const startProgressAnimation = () => {
    progressValue.setValue(0);
    animation.current = Animated.timing(progressValue, {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false,
    });
    animation.current.start(({ finished }) => {
      if (finished) {
        nextContent();
      }
    });
  };
  
  // Pause the current animation
  const pauseAnimation = () => {
    if (animation.current) {
      animation.current.stop();
    }
  };
  
  // Move to the next content segment
  const nextContent = () => {
    if (contentIndex < currentMoment.content.length - 1) {
      // More content in current moment
      setContentIndex(contentIndex + 1);
    } else {
      // Move to next moment
      if (currentMomentIndex < sampleMoments.length - 1) {
        setCurrentMomentIndex(currentMomentIndex + 1);
        setContentIndex(0);
      } else {
        // End of all moments, go back to home
        navigation.goBack();
      }
    }
  };
  
  // Move to the previous content segment
  const prevContent = () => {
    if (contentIndex > 0) {
      // Previous content in current moment
      setContentIndex(contentIndex - 1);
    } else {
      // Move to previous moment
      if (currentMomentIndex > 0) {
        setCurrentMomentIndex(currentMomentIndex - 1);
        // Set to last content of the previous moment
        const prevMoment = sampleMoments[currentMomentIndex - 1];
        setContentIndex(prevMoment.content.length - 1);
      }
    }
  };
  
  // Setup pan responder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsPaused(true);
        pauseAnimation();
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          // Swipe left - move to next
          nextContent();
        } else if (gestureState.dx > 50) {
          // Swipe right - move to previous
          prevContent();
        } else {
          // Tap - toggle pause/play
          setIsPaused(false);
          startProgressAnimation();
        }
      },
    })
  ).current;
  
  // Setup long press handler
  const longPressTimeout = useRef(null);
  
  const handleTouchStart = () => {
    longPressTimeout.current = setTimeout(() => {
      setIsPaused(true);
      pauseAnimation();
    }, LONG_PRESS_DURATION);
  };
  
  const handleTouchEnd = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
    }
    if (isPaused) {
      setIsPaused(false);
      startProgressAnimation();
    }
  };
  
  // Reset and start animation when content changes
  useEffect(() => {
    startProgressAnimation();
    
    return () => {
      if (animation.current) {
        animation.current.stop();
      }
    };
  }, [currentMomentIndex, contentIndex]);
  
  // Handle back button
  const handleClose = () => {
    navigation.goBack();
  };
  
  // Handle user interactions
  const toggleResponse = () => {
    setShowResponse(!showResponse);
    setIsPaused(!isPaused);
    if (isPaused) {
      startProgressAnimation();
    } else {
      pauseAnimation();
    }
  };
  
  const submitResponse = () => {
    // In a real app, this would save the response
    setShowResponse(false);
    setIsPaused(false);
    setResponseText('');
    startProgressAnimation();
  };
  
  // Get fallback image if moment image fails to load
  const getFallbackImage = () => {
    return `https://via.placeholder.com/800x1200/6366f1/ffffff?text=${currentMoment.title}`;
  };
  
  // Render progress bars
  const renderProgressBars = () => {
    return (
      <View className="flex-row justify-between w-full px-2 mt-2">
        {currentMoment?.content.map((_, index) => {
          // For the current segment, use animated width
          if (index === contentIndex) {
            return (
              <Animated.View
                key={index}
                style={[
                  styles.progressBar,
                  { 
                    width: progressValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', `${100 / currentMoment.content.length}%`],
                    }),
                    backgroundColor: '#fff',
                  },
                ]}
              />
            );
          }
          
          // For completed segments, show full width
          if (index < contentIndex) {
            return (
              <View
                key={index}
                style={[
                  styles.progressBar,
                  { 
                    width: `${100 / currentMoment.content.length}%`,
                    backgroundColor: '#fff', 
                  },
                ]}
              />
            );
          }
          
          // For future segments, show empty
          return (
            <View
              key={index}
              style={[
                styles.progressBar,
                { 
                  width: `${100 / currentMoment.content.length}%`,
                  backgroundColor: 'rgba(255, 255, 255, 0.3)', 
                },
              ]}
            />
          );
        })}
      </View>
    );
  };
  
  // Render content based on type
  const renderContent = () => {
    if (!currentContent) return null;
    
    switch(currentContent.type) {
      case 'verse':
        return (
          <View className="px-4">
            <Text className="text-xl font-bold text-white mb-2">{currentContent.text}</Text>
            <Text className="text-white text-lg">{currentContent.content}</Text>
          </View>
        );
      case 'prayer':
        return (
          <View className="px-4">
            <Text className="text-xl font-bold text-white mb-2">Prayer</Text>
            <Text className="text-white text-lg">{currentContent.content}</Text>
          </View>
        );
      case 'reflection':
      case 'question':
        return (
          <View className="px-4">
            <Text className="text-xl font-bold text-white mb-2">Reflection</Text>
            <Text className="text-white text-lg mb-4">{currentContent.content}</Text>
            <TouchableOpacity
              className="bg-white/30 py-3 px-4 rounded-lg"
              onPress={toggleResponse}
            >
              <Text className="text-white text-center font-medium">Share Your Thoughts</Text>
            </TouchableOpacity>
          </View>
        );
      case 'explanation':
        return (
          <View className="px-4">
            <Text className="text-xl font-bold text-white mb-2">Explanation</Text>
            <Text className="text-white text-lg">{currentContent.content}</Text>
          </View>
        );
      case 'application':
        return (
          <View className="px-4">
            <Text className="text-xl font-bold text-white mb-2">Application</Text>
            <Text className="text-white text-lg mb-4">{currentContent.content}</Text>
            <TouchableOpacity
              className="bg-white/30 py-3 px-4 rounded-lg"
              onPress={toggleResponse}
            >
              <Text className="text-white text-center font-medium">Share Your Response</Text>
            </TouchableOpacity>
          </View>
        );
      case 'focus':
      case 'gratitude':
        return (
          <View className="px-4">
            <Text className="text-xl font-bold text-white mb-2">{currentContent.type.charAt(0).toUpperCase() + currentContent.type.slice(1)}</Text>
            <Text className="text-white text-lg">{currentContent.content}</Text>
          </View>
        );
      case 'info':
        return (
          <View className="px-4">
            <Text className="text-xl font-bold text-white mb-2">Information</Text>
            <Text className="text-white text-lg">{currentContent.content}</Text>
          </View>
        );
      default:
        return (
          <View className="px-4">
            <Text className="text-white text-lg">{currentContent.content}</Text>
          </View>
        );
    }
  };
  
  if (!currentMoment) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <Text className="text-white text-lg">Moment not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Main moment view with pan responder for gestures */}
      <Pressable
        style={{ flex: 1 }}
        {...panResponder.panHandlers}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background image with gradient overlay */}
        <Image
          source={{ uri: imageError ? getFallbackImage() : currentMoment.image }}
          style={[StyleSheet.absoluteFill]}
          onError={() => setImageError(true)}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
          style={StyleSheet.absoluteFill}
        />

        {/* Content layout */}
        <View style={{ paddingTop: insets.top, flex: 1 }}>
          {/* Progress bars */}
          {renderProgressBars()}
          
          {/* Header with user info */}
          <View className="flex-row justify-between items-center p-4">
            <View className="flex-row items-center">
              <Image 
                source={{ uri: currentMoment.user.avatar }} 
                className="w-8 h-8 rounded-full mr-2" 
                resizeMode="cover"
              />
              <View>
                <Text className="text-white font-semibold">{currentMoment.user.name}</Text>
                <Text className="text-white text-xs opacity-80">{currentMoment.time} · {currentMoment.title}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Main content area */}
          <View className="flex-1 justify-center">
            {renderContent()}
          </View>
          
          {/* Navigation hints */}
          <View className="flex-row justify-between px-4 pb-4 mb-2">
            <Text className="text-white/50 text-xs">
              {currentMomentIndex > 0 ? '< Swipe right for previous' : ''}
            </Text>
            <Text className="text-white/50 text-xs">
              {currentMomentIndex < sampleMoments.length - 1 ? 'Swipe left for next >' : ''}
            </Text>
          </View>
        </View>
      </Pressable>
      
      {/* Response input overlay */}
      {showResponse && (
        <View className="absolute bottom-0 left-0 right-0 bg-black/90 p-4 pb-8" style={{ paddingBottom: insets.bottom + 8 }}>
          <Text className="text-white font-semibold mb-2">Your Response:</Text>
          <TextInput
            className="bg-white/20 text-white p-3 rounded-lg mb-3 min-h-[100px]"
            multiline
            placeholder="Type your thoughts here..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={responseText}
            onChangeText={setResponseText}
            autoFocus
          />
          <View className="flex-row justify-end">
            <TouchableOpacity 
              className="bg-transparent py-2 px-4 mr-2"
              onPress={toggleResponse}
            >
              <Text className="text-white">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="bg-indigo-600 py-2 px-4 rounded-lg"
              onPress={submitResponse}
            >
              <Text className="text-white font-medium">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: PROGRESS_BAR_HEIGHT,
    marginHorizontal: 2,
    borderRadius: PROGRESS_BAR_HEIGHT / 2,
  },
});

export default MomentViewer; 