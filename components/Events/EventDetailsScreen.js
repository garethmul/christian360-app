import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  SafeAreaView,
  FlatList,
  StyleSheet
} from 'react-native';
import { Video } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { DUMMY_EVENTS } from './EventsScreen';

const { width } = Dimensions.get('window');

const EventDetailsScreen = ({ route, navigation }) => {
  const eventId = route.params?.eventId;
  const event = eventId ? DUMMY_EVENTS.find(e => e.id === eventId) : undefined;
  const [bookmarked, setBookmarked] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);
  const videoRef = React.useRef(null);
  
  if (!event) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100">
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-lg text-red-500">Event data not found or event ID missing.</Text>
          {/* For debugging: <Text>Params: {JSON.stringify(route.params)}</Text> */}
        </View>
      </SafeAreaView>
    );
  }
  
  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };
  
  const handleVideoPlayback = () => {
    setPlayingVideo(true);
  };
  
  const renderMediaItem = ({ item }) => (
    <TouchableOpacity className="mr-2" activeOpacity={0.9}>
      <Image 
        source={{ uri: item }} 
        style={{ width: width * 0.7, height: 180, borderRadius: 8 }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
  
  const renderListItem = (item, index) => (
    <View key={index} className="flex-row mb-3">
      <View className="h-2 w-2 bg-indigo-600 rounded-full mt-2 mr-2" />
      <Text className="text-gray-800 flex-1">{item}</Text>
    </View>
  );
  
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View className="relative">
          <Image 
            source={{ uri: event.imageUrl }} 
            style={{ width: width, height: 220 }}
            resizeMode="cover"
          />
          
          {/* Overlay & Buttons */}
          <View className="absolute top-0 left-0 right-0 p-4 flex-row justify-between">
            <TouchableOpacity 
              className="bg-black bg-opacity-50 h-10 w-10 rounded-full items-center justify-center"
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity 
              className="bg-black bg-opacity-50 h-10 w-10 rounded-full items-center justify-center"
              onPress={toggleBookmark}
            >
              {bookmarked ? (
                <Ionicons name="bookmark" size={20} color="#ffffff" />
              ) : (
                <Ionicons name="bookmark-outline" size={20} color="#ffffff" />
              )}
            </TouchableOpacity>
          </View>
          
          {/* Date Badge */}
          <View className="absolute bottom-0 right-0 bg-indigo-800 px-4 py-2 rounded-tl-lg">
            <Text className="text-white font-bold">{event.date}</Text>
          </View>
        </View>
        
        {/* Event Info */}
        <View className="bg-white p-5">
          <Text className="text-2xl font-bold text-gray-900 mb-1">{event.title}</Text>
          
          <View className="flex-row items-center mb-4">
            <Image 
              source={{ uri: event.organizerLogo }} 
              className="w-6 h-6 rounded-full mr-2"
            />
            <Text className="text-indigo-700 font-medium">{event.organizer}</Text>
          </View>
          
          <View className="flex-row mb-3">
            <View className="flex-row items-center mr-4">
              <Ionicons name="time-outline" size={18} color="#4f46e5" />
              <Text className="ml-1 text-gray-700">{event.time}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={18} color="#4f46e5" />
              <Text className="ml-1 text-gray-700">{event.location}</Text>
            </View>
          </View>
          
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-lg font-bold text-indigo-800">{event.price}</Text>
            <View className="flex-row items-center">
              <Ionicons name="people" size={18} color="#6b7280" />
              <Text className="ml-1 text-gray-600">{event.attendees} attending</Text>
            </View>
          </View>
          
          <TouchableOpacity className="bg-indigo-600 py-3 rounded-lg items-center">
            <Text className="text-white font-bold text-lg">Register Now</Text>
          </TouchableOpacity>
        </View>
        
        {/* Event Description */}
        <View className="bg-white p-5 mt-3">
          <Text className="text-xl font-bold text-gray-900 mb-3">About This Event</Text>
          <Text className="text-gray-700 leading-6 mb-4">{event.description}</Text>
          
          {/* Speakers/Performers Section */}
          {event.speakers && (
            <View className="mb-4">
              <Text className="text-lg font-bold text-gray-900 mb-2">Speakers</Text>
              {event.speakers.map(renderListItem)}
            </View>
          )}
          
          {event.performers && (
            <View className="mb-4">
              <Text className="text-lg font-bold text-gray-900 mb-2">Performers</Text>
              {event.performers.map(renderListItem)}
            </View>
          )}
          
          {/* Schedule/Program Section */}
          {event.schedule && (
            <View className="mb-4">
              <Text className="text-lg font-bold text-gray-900 mb-2">Event Schedule</Text>
              {event.schedule.map(renderListItem)}
            </View>
          )}
          
          {event.program && (
            <View className="mb-4">
              <Text className="text-lg font-bold text-gray-900 mb-2">Program</Text>
              {event.program.map(renderListItem)}
            </View>
          )}
        </View>
        
        {/* Event Media */}
        <View className="bg-white p-5 mt-3">
          <Text className="text-xl font-bold text-gray-900 mb-3">Event Media</Text>
          
          {/* Event Video */}
          {event.videoUrl && (
            <View className="mb-5">
              <Text className="text-lg font-bold text-gray-900 mb-2">Video Preview</Text>
              {!playingVideo ? (
                <TouchableOpacity 
                  onPress={handleVideoPlayback}
                  activeOpacity={0.9}
                  className="relative"
                >
                  <Image 
                    source={{ uri: event.media[0] }}
                    style={{ width: '100%', height: 200, borderRadius: 8 }}
                    resizeMode="cover"
                  />
                  <View className="absolute inset-0 items-center justify-center">
                    <View className="bg-indigo-600 rounded-full h-16 w-16 items-center justify-center">
                      <Ionicons name="play" size={30} color="#ffffff" />
                    </View>
                  </View>
                </TouchableOpacity>
              ) : (
                <Video
                  source={{ uri: event.videoUrl }}
                  rate={1.0}
                  volume={1.0}
                  muted={false}
                  resizeMode="cover"
                  shouldPlay={true}
                  controls
                  style={{ width: '100%', height: 200, borderRadius: 8 }}
                />
              )}
            </View>
          )}
          
          {/* Photo Gallery */}
          <Text className="text-lg font-bold text-gray-900 mb-2">Photo Gallery</Text>
          <FlatList
            data={event.media}
            renderItem={renderMediaItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="py-2"
          />
        </View>
        
        {/* Organizer Info */}
        <View className="bg-white p-5 mt-3 mb-5">
          <Text className="text-xl font-bold text-gray-900 mb-3">About the Organizer</Text>
          <View className="flex-row items-center">
            <Image 
              source={{ uri: event.organizerLogo }} 
              className="w-12 h-12 rounded-full mr-3"
            />
            <View>
              <Text className="text-lg font-bold text-gray-900">{event.organizer}</Text>
              <Text className="text-sm text-gray-600">Event Organizer</Text>
            </View>
          </View>
          <TouchableOpacity className="mt-4 border border-indigo-600 py-2 rounded-lg items-center">
            <Text className="text-indigo-600 font-bold">View More Events</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventDetailsScreen; 