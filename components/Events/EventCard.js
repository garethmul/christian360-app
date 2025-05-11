import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EventCard = ({
  id,
  title = 'Annual Worship Conference',
  organizer = 'Grace Community Church',
  organizerLogo = 'https://randomuser.me/api/portraits/lego/1.jpg',
  date = 'Oct 15-17, 2023',
  time = '9:00 AM - 5:00 PM',
  location = 'Nashville Convention Center',
  imageUrl = 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29yc2hpcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  price = 'From $99',
  attendees = 325,
  navigation
}) => {
  const [bookmarked, setBookmarked] = useState(false);
  
  const handlePress = () => {
    if (navigation) {
      navigation.navigate('EventDetails', { eventId: id });
    }
  };
  
  const toggleBookmark = (e) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
  };
  
  return (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden"
      activeOpacity={0.8}
      onPress={handlePress}
    >
      {/* Event Image */}
      <View className="relative">
        <Image 
          source={{ uri: imageUrl }} 
          className="w-full h-40"
          resizeMode="cover"
        />
        <TouchableOpacity 
          className="absolute top-3 right-3 bg-black bg-opacity-20 rounded-full p-1"
          onPress={toggleBookmark}
        >
          {bookmarked ? (
            <Ionicons name="bookmark" size={24} color="#ffffff" />
          ) : (
            <Ionicons name="bookmark-outline" size={24} color="#ffffff" />
          )}
        </TouchableOpacity>
      </View>
      
      {/* Event Details */}
      <View className="p-4">
        <View className="flex-row mb-2">
          <Image 
            source={{ uri: organizerLogo }} 
            className="w-8 h-8 rounded-full mr-2"
          />
          <View className="flex-1">
            <Text className="text-lg font-bold text-indigo-900">{title}</Text>
            <Text className="text-sm text-gray-700">{organizer}</Text>
          </View>
        </View>
        
        <View className="flex-row items-center mb-1">
          <Ionicons name="calendar-outline" size={16} color="#4f46e5" className="mr-1" />
          <Text className="text-sm font-medium text-gray-800 ml-1">{date}</Text>
          <Text className="text-sm text-gray-600"> • {time}</Text>
        </View>
        
        <View className="flex-row items-center mb-3">
          <Ionicons name="location-outline" size={16} color="#4f46e5" className="mr-1" />
          <Text className="text-sm text-gray-700 ml-1">{location}</Text>
        </View>
        
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-sm font-medium text-indigo-800">{price}</Text>
          <View className="flex-row items-center">
            <Ionicons name="people-outline" size={16} color="#6b7280" className="mr-1" />
            <Text className="text-xs text-gray-600 ml-1">{attendees} attending</Text>
          </View>
        </View>
      </View>
      
      {/* Event Action */}
      <TouchableOpacity className="bg-indigo-600 py-3 w-full">
        <Text className="text-white font-bold text-center">Register Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default EventCard; 