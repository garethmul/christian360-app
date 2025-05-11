import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DigitalProductsScreen = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Digital Products</Text>
        <Text className="text-gray-600 mb-4">Access courses, sermons, and digital resources to strengthen your faith.</Text>
        
        <View className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <View className="h-40 bg-blue-100 items-center justify-center">
            <Ionicons name="school-outline" size={60} color="#3b82f6" />
          </View>
          <View className="p-4">
            <Text className="text-lg font-bold mb-1">Biblical Leadership Course</Text>
            <Text className="text-gray-600 mb-3">Learn principles of Christ-centered leadership for ministry and business</Text>
            <View className="flex-row justify-between items-center">
              <Text className="font-bold text-lg">$49.99</Text>
              <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded">
                <Text className="text-white font-bold">Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <View className="h-40 bg-purple-100 items-center justify-center">
            <Ionicons name="mic-outline" size={60} color="#8b5cf6" />
          </View>
          <View className="p-4">
            <Text className="text-lg font-bold mb-1">Sermon Series: Grace Explained</Text>
            <Text className="text-gray-600 mb-3">Five-part audio series on understanding God's grace</Text>
            <View className="flex-row justify-between items-center">
              <Text className="font-bold text-lg">$19.99</Text>
              <TouchableOpacity className="bg-purple-500 px-4 py-2 rounded">
                <Text className="text-white font-bold">Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <View className="h-40 bg-green-100 items-center justify-center">
            <Ionicons name="document-text-outline" size={60} color="#10b981" />
          </View>
          <View className="p-4">
            <Text className="text-lg font-bold mb-1">Prayer Journal Templates</Text>
            <Text className="text-gray-600 mb-3">Digital templates to help structure your daily prayer time</Text>
            <View className="flex-row justify-between items-center">
              <Text className="font-bold text-lg">$12.99</Text>
              <TouchableOpacity className="bg-green-500 px-4 py-2 rounded">
                <Text className="text-white font-bold">Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DigitalProductsScreen; 