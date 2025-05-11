import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LocationsScreen = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Locations</Text>
        <Text className="text-gray-600 mb-4">Find churches, Christian businesses, and community resources in your area.</Text>
        
        <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <View className="flex-row items-start">
            <View className="bg-indigo-100 p-3 rounded-lg mr-3">
              <Ionicons name="business-outline" size={24} color="#6366f1" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold mb-1">Grace Community Church</Text>
              <Text className="text-gray-600 mb-2">Non-denominational church with contemporary worship</Text>
              <View className="flex-row items-center mb-1">
                <Ionicons name="location-outline" size={14} color="#6b7280" />
                <Text className="text-gray-500 text-sm ml-1">123 Main St, Austin, TX</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="time-outline" size={14} color="#6b7280" />
                <Text className="text-gray-500 text-sm ml-1">Services: Sun 9AM & 11AM</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <View className="flex-row items-start">
            <View className="bg-green-100 p-3 rounded-lg mr-3">
              <Ionicons name="book-outline" size={24} color="#10b981" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold mb-1">Faith Bookstore</Text>
              <Text className="text-gray-600 mb-2">Christian books, Bibles, and gifts</Text>
              <View className="flex-row items-center mb-1">
                <Ionicons name="location-outline" size={14} color="#6b7280" />
                <Text className="text-gray-500 text-sm ml-1">456 Oak St, Austin, TX</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="time-outline" size={14} color="#6b7280" />
                <Text className="text-gray-500 text-sm ml-1">Mon-Sat: 10AM - 7PM</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <View className="flex-row items-start">
            <View className="bg-blue-100 p-3 rounded-lg mr-3">
              <Ionicons name="cafe-outline" size={24} color="#3b82f6" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold mb-1">Abundant Life Café</Text>
              <Text className="text-gray-600 mb-2">Christian-owned coffee shop with study spaces</Text>
              <View className="flex-row items-center mb-1">
                <Ionicons name="location-outline" size={14} color="#6b7280" />
                <Text className="text-gray-500 text-sm ml-1">789 Elm St, Austin, TX</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="time-outline" size={14} color="#6b7280" />
                <Text className="text-gray-500 text-sm ml-1">Daily: 7AM - 8PM</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LocationsScreen; 