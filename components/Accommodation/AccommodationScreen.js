import React from 'react';
import { View, Text, FlatList, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import AccommodationCard from './AccommodationCard';

const DUMMY_ACCOMMODATIONS = [
  {
    id: '1',
    name: 'Peaceful Retreat House',
    location: 'Nashville, TN',
    type: 'Entire house',
    price: '$120',
    perNight: true,
    rating: 4.8,
    reviews: 36,
    beds: 3,
    baths: 2,
    amenities: ['WiFi', 'Kitchen', 'Free parking'],
    christian: true,
    imageUrl: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjByZXRyZWF0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '2',
    name: 'Riverside Seminary Guest House',
    location: 'Louisville, KY',
    type: 'Private room',
    price: '$75',
    perNight: true,
    rating: 4.9,
    reviews: 52,
    beds: 1,
    baths: 1,
    amenities: ['WiFi', 'Breakfast included', 'Campus access'],
    christian: true,
    imageUrl: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z3Vlc3QlMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '3',
    name: 'Mountain Prayer Retreat',
    location: 'Gatlinburg, TN',
    type: 'Cabin',
    price: '$195',
    perNight: true,
    rating: 4.7,
    reviews: 29,
    beds: 4,
    baths: 2,
    amenities: ['WiFi', 'Kitchen', 'Hot tub', 'Prayer garden'],
    christian: true,
    imageUrl: 'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNhYmlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
];

const AccommodationScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1">
        <View className="p-4 bg-white border-b border-gray-200">
          <Text className="text-xl font-bold text-indigo-800 mb-2">Christian360 Stays</Text>
          
          {/* Search bar */}
          <View className="flex-row bg-gray-100 rounded-lg p-2 mb-3">
            <TextInput 
              placeholder="Where are you going?"
              className="flex-1 text-base"
            />
            <TouchableOpacity>
              <Text className="text-indigo-600 font-medium">Search</Text>
            </TouchableOpacity>
          </View>
          
          {/* Filter chips */}
          <View className="flex-row mt-2 pb-2">
            <TouchableOpacity className="bg-indigo-100 rounded-full px-3 py-1 mr-2">
              <Text className="text-indigo-800">Christian-friendly</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-200 rounded-full px-3 py-1 mr-2">
              <Text className="text-gray-800">Entire place</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-200 rounded-full px-3 py-1">
              <Text className="text-gray-800">Retreat centers</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <FlatList
          data={DUMMY_ACCOMMODATIONS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AccommodationCard {...item} />}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default AccommodationScreen; 