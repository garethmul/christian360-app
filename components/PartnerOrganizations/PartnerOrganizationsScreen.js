import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PartnerOrganizationsScreen = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Partner Organizations</Text>
        <Text className="text-gray-600 mb-4">Connect with Christian ministries and organizations in our network.</Text>
        
        <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <View className="flex-row items-center mb-3">
            <View className="h-16 w-16 bg-red-100 rounded-full items-center justify-center mr-3">
              <Ionicons name="heart-outline" size={30} color="#f43f5e" />
            </View>
            <View>
              <Text className="text-lg font-bold">Compassion International</Text>
              <Text className="text-gray-600">Child sponsorship ministry</Text>
            </View>
          </View>
          <Text className="text-gray-700 mb-3">Release children from poverty in Jesus' name through holistic child development programs.</Text>
          <TouchableOpacity className="bg-red-50 py-2 rounded-lg items-center">
            <Text className="text-red-600 font-semibold">Learn More</Text>
          </TouchableOpacity>
        </View>
        
        <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <View className="flex-row items-center mb-3">
            <View className="h-16 w-16 bg-blue-100 rounded-full items-center justify-center mr-3">
              <Ionicons name="water-outline" size={30} color="#3b82f6" />
            </View>
            <View>
              <Text className="text-lg font-bold">Living Water International</Text>
              <Text className="text-gray-600">Clean water initiatives</Text>
            </View>
          </View>
          <Text className="text-gray-700 mb-3">Providing access to clean water and spreading the gospel to communities in need around the world.</Text>
          <TouchableOpacity className="bg-blue-50 py-2 rounded-lg items-center">
            <Text className="text-blue-600 font-semibold">Learn More</Text>
          </TouchableOpacity>
        </View>
        
        <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <View className="flex-row items-center mb-3">
            <View className="h-16 w-16 bg-green-100 rounded-full items-center justify-center mr-3">
              <Ionicons name="home-outline" size={30} color="#10b981" />
            </View>
            <View>
              <Text className="text-lg font-bold">Habitat for Humanity</Text>
              <Text className="text-gray-600">Housing ministry</Text>
            </View>
          </View>
          <Text className="text-gray-700 mb-3">Building strength, stability and self-reliance through shelter with a Christian foundation.</Text>
          <TouchableOpacity className="bg-green-50 py-2 rounded-lg items-center">
            <Text className="text-green-600 font-semibold">Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PartnerOrganizationsScreen; 