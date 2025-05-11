import React from 'react';
import { View, Text, Image } from 'react-native';
import SafeLayout from '../ui/SafeLayout';

const RecommendedReadingScreen = () => {
  return (
    <SafeLayout backgroundColor="#f9fafb">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Recommended Reading</Text>
        <Text className="text-gray-600 mb-4">Discover Christian books, devotionals, and Bible studies to grow your faith.</Text>
        
        <View className="bg-white rounded-lg shadow-sm p-4 mb-4 flex-row">
          <View className="h-28 w-20 bg-gray-200 rounded mr-3" />
          <View className="flex-1">
            <Text className="text-lg font-bold mb-1">Mere Christianity</Text>
            <Text className="text-gray-600 mb-1">C.S. Lewis</Text>
            <Text className="text-sm text-gray-500 mb-2">Classic exploration of faith and reason</Text>
            <View className="flex-row">
              <View className="bg-yellow-100 px-2 py-1 rounded mr-2">
                <Text className="text-xs text-yellow-800">Apologetics</Text>
              </View>
              <View className="bg-blue-100 px-2 py-1 rounded">
                <Text className="text-xs text-blue-800">Bestseller</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View className="bg-white rounded-lg shadow-sm p-4 mb-4 flex-row">
          <View className="h-28 w-20 bg-gray-200 rounded mr-3" />
          <View className="flex-1">
            <Text className="text-lg font-bold mb-1">The Purpose Driven Life</Text>
            <Text className="text-gray-600 mb-1">Rick Warren</Text>
            <Text className="text-sm text-gray-500 mb-2">Discover your purpose and meaning</Text>
            <View className="flex-row">
              <View className="bg-green-100 px-2 py-1 rounded mr-2">
                <Text className="text-xs text-green-800">Spiritual Growth</Text>
              </View>
              <View className="bg-blue-100 px-2 py-1 rounded">
                <Text className="text-xs text-blue-800">Bestseller</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View className="bg-white rounded-lg shadow-sm p-4 mb-4 flex-row">
          <View className="h-28 w-20 bg-gray-200 rounded mr-3" />
          <View className="flex-1">
            <Text className="text-lg font-bold mb-1">Crazy Love</Text>
            <Text className="text-gray-600 mb-1">Francis Chan</Text>
            <Text className="text-sm text-gray-500 mb-2">Exploring God's amazing love</Text>
            <View className="flex-row">
              <View className="bg-red-100 px-2 py-1 rounded mr-2">
                <Text className="text-xs text-red-800">God's Love</Text>
              </View>
              <View className="bg-purple-100 px-2 py-1 rounded">
                <Text className="text-xs text-purple-800">Devotional</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeLayout>
  );
};

export default RecommendedReadingScreen; 