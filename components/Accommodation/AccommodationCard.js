import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const AccommodationCard = ({
  name = 'Peaceful Retreat House',
  location = 'Nashville, TN',
  type = 'Entire house',
  price = '$120',
  perNight = true,
  rating = 4.8,
  reviews = 36,
  beds = 3,
  baths = 2,
  amenities = ['WiFi', 'Kitchen', 'Free parking'],
  christian = true,
  imageUrl = 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjByZXRyZWF0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
}) => {
  return (
    <TouchableOpacity className="bg-white rounded-lg shadow-sm mb-5 overflow-hidden">
      {/* Image */}
      <Image
        source={{ uri: imageUrl }}
        className="w-full h-48"
        resizeMode="cover"
      />
      
      {/* Christian-friendly badge */}
      {christian && (
        <View className="absolute top-2 right-2 bg-indigo-600 px-2 py-1 rounded-md">
          <Text className="text-white text-xs font-bold">Christian-friendly</Text>
        </View>
      )}
      
      {/* Content */}
      <View className="p-3">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-lg font-bold text-gray-800">{name}</Text>
          <View className="flex-row items-center">
            <Text className="text-gray-800 font-medium mr-1">{rating}</Text>
            <Text className="text-gray-600">({reviews})</Text>
          </View>
        </View>
        
        <Text className="text-gray-600 mb-1">{location}</Text>
        <Text className="text-gray-600 mb-2">{type} • {beds} beds • {baths} baths</Text>
        
        <View className="flex-row flex-wrap mb-2">
          {amenities.map((amenity, index) => (
            <View key={index} className="bg-gray-200 rounded-full px-2 py-1 mr-1 mb-1">
              <Text className="text-xs text-gray-700">{amenity}</Text>
            </View>
          ))}
        </View>
        
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-indigo-900 font-bold text-lg">
            {price} <Text className="text-sm text-gray-600">{perNight ? '/ night' : 'total'}</Text>
          </Text>
          <TouchableOpacity className="bg-indigo-600 px-4 py-2 rounded-md">
            <Text className="text-white font-medium">Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AccommodationCard; 