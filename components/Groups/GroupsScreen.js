import React from 'react';
import { View, Text } from 'react-native';
import SafeLayout from '../ui/SafeLayout';

const GroupsScreen = () => {
  return (
    <SafeLayout backgroundColor="#f9fafb">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Groups</Text>
        <Text className="text-gray-600 mb-4">Join Bible studies, prayer groups, and ministry teams in your area.</Text>
        
        <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <Text className="text-lg font-bold mb-1">Young Adults Bible Study</Text>
          <Text className="text-gray-600 mb-2">Weekly study group for ages 18-30</Text>
          <Text className="text-sm text-gray-500">12 members • Meets on Tuesdays</Text>
        </View>
        
        <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <Text className="text-lg font-bold mb-1">Prayer Warriors</Text>
          <Text className="text-gray-600 mb-2">Dedicated prayer group for community needs</Text>
          <Text className="text-sm text-gray-500">24 members • Meets on Mondays</Text>
        </View>
        
        <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <Text className="text-lg font-bold mb-1">Worship Team</Text>
          <Text className="text-gray-600 mb-2">Musicians and vocalists for Sunday services</Text>
          <Text className="text-sm text-gray-500">8 members • Practices on Thursdays</Text>
        </View>
      </View>
    </SafeLayout>
  );
};

export default GroupsScreen; 