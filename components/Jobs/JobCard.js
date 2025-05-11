import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const JobCard = ({
  id,
  title = 'Worship Pastor',
  company = 'Gracey Community Church',
  logoUrl = 'https://randomuser.me/api/portraits/lego/1.jpg',
  location = 'Nashville, TN',
  salary = '$45,000 - $60,000',
  type = 'Full-time',
  postedDate = '3 days ago',
  description = 'Leading worship services and coordinating music ministry. Must have experience in modern worship styles and team leadership.',
  navigation
}) => {
  const [bookmarked, setBookmarked] = useState(false);
  
  const handlePress = () => {
    if (navigation) {
      navigation.navigate('JobDetails', { jobId: id });
    }
  };
  
  const toggleBookmark = (e) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
  };
  
  return (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm mb-4 p-4"
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <View className="flex-row justify-between mb-3">
        <View className="flex-row">
          <Image 
            source={{ uri: logoUrl }} 
            className="w-12 h-12 rounded-lg mr-3"
            resizeMode="cover"
          />
          <View>
            <Text className="text-lg font-bold text-indigo-900">{title}</Text>
            <Text className="text-base font-medium text-gray-800">{company}</Text>
            <Text className="text-sm text-gray-600">{location}</Text>
          </View>
        </View>
        <TouchableOpacity 
          className="h-8 w-8 items-center justify-center"
          onPress={toggleBookmark}
        >
          {bookmarked ? (
            <Ionicons name="bookmark" size={24} color="#4f46e5" />
          ) : (
            <Ionicons name="bookmark-outline" size={24} color="#9ca3af" />
          )}
        </TouchableOpacity>
      </View>
      
      <View className="flex-row mb-3 ml-15">
        <View className="bg-indigo-100 rounded-full px-2 py-1 mr-2">
          <Text className="text-xs text-indigo-800">{type}</Text>
        </View>
        <View className="bg-green-100 rounded-full px-2 py-1">
          <Text className="text-xs text-green-800">{salary}</Text>
        </View>
      </View>
      
      <Text className="text-sm text-gray-700 mb-3" numberOfLines={2}>
        {description}
      </Text>
      
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-xs text-gray-500">Posted {postedDate}</Text>
        <TouchableOpacity className="bg-indigo-600 px-3 py-1 rounded-md">
          <Text className="text-white font-medium">Apply</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard; 