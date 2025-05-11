import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const LocationCard = ({
  name = 'Grace Community Church',
  type = 'Church',
  address = '123 Main St, Nashville, TN 37203',
  distance = '1.2 miles away',
  rating = 4.7,
  reviews = 120,
  phone = '(615) 555-1234',
  website = 'www.gracechurch.org',
  hours = 'Opens 9:00 AM',
  imageUrl = 'https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2h1cmNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  openNow = true,
}) => {
  return (
    <TouchableOpacity className="bg-white rounded-lg shadow-sm mb-3 overflow-hidden flex-row">
      {/* Image */}
      <Image
        source={{ uri: imageUrl }}
        className="w-24 h-full"
        resizeMode="cover"
      />
      
      {/* Content */}
      <View className="flex-1 p-3">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-2">
            <Text className="text-lg font-bold text-gray-800">{name}</Text>
            <Text className="text-gray-600 text-sm">{type}</Text>
          </View>
          <View className="bg-gray-100 rounded-md px-2 py-1">
            <Text className="text-gray-800 font-medium">{rating}</Text>
          </View>
        </View>
        
        <Text className="text-gray-600 text-sm mt-1">{address}</Text>
        <Text className="text-gray-500 text-xs mt-1">{distance}</Text>
        
        <View className="flex-row mt-2">
          <View className="bg-green-100 rounded-full px-2 py-1 mr-2">
            <Text className="text-xs text-green-800">{openNow ? 'Open now' : 'Closed'}</Text>
          </View>
          <View className="bg-gray-100 rounded-full px-2 py-1">
            <Text className="text-xs text-gray-800">{hours}</Text>
          </View>
        </View>
        
        <View className="flex-row justify-between mt-3">
          <TouchableOpacity className="bg-indigo-600 px-3 py-1 rounded-md">
            <Text className="text-white text-xs font-medium">Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-indigo-100 px-3 py-1 rounded-md">
            <Text className="text-indigo-800 text-xs font-medium">Save</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-indigo-100 px-3 py-1 rounded-md">
            <Text className="text-indigo-800 text-xs font-medium">Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LocationCard; 