import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SafeLayout from './ui/SafeLayout';

const FeatureItem = ({ title, iconComponent, description, color, onPress }) => (
  <TouchableOpacity 
    className={`bg-white rounded-lg shadow-sm mb-4 p-4 border-l-4`} 
    style={{ borderLeftColor: color }}
    onPress={onPress}
  >
    <View className="flex-row items-center">
      <View className={`w-12 h-12 rounded-full items-center justify-center mr-4`} style={{ backgroundColor: `${color}20` }}>
        {iconComponent}
      </View>
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-800">{title}</Text>
        <Text className="text-sm text-gray-600">{description}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#9ca3af" />
    </View>
  </TouchableOpacity>
);

const MoreScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeLayout backgroundColor="#f3f4f6" edges={['top', 'bottom']}>
      <View className="p-4">
        <View className="bg-indigo-700 rounded-lg p-6 mb-6">
          <Text className="text-2xl font-bold text-white mb-2">Christian360</Text>
          <Text className="text-white text-base mb-4">Connect, grow, and engage with your Christian community</Text>
          <TouchableOpacity className="bg-white rounded-lg py-2 px-4 self-start">
            <Text className="text-indigo-700 font-bold">View Profile</Text>
          </TouchableOpacity>
        </View>
        
        <Text className="text-xl font-bold text-gray-800 mb-3">Explore More</Text>
        
        <FeatureItem
          title="Locations"
          iconComponent={<Ionicons name="location" size={24} color="#ef4444" />}
          description="Find churches, Christian businesses, and resources"
          color="#ef4444"
          onPress={() => navigation.navigate('Locations')}
        />
        
        <FeatureItem
          title="Groups"
          iconComponent={<Ionicons name="people" size={24} color="#8b5cf6" />}
          description="Join Bible studies, prayer groups, and ministry teams"
          color="#8b5cf6"
          onPress={() => navigation.navigate('Groups')}
        />
        
        <FeatureItem
          title="Recommended Reading"
          iconComponent={<Ionicons name="book" size={24} color="#f59e0b" />}
          description="Discover Christian books, devotionals, and Bible studies"
          color="#f59e0b"
          onPress={() => navigation.navigate('RecommendedReading')}
        />
        
        <FeatureItem
          title="Digital Products"
          iconComponent={<Ionicons name="cart" size={24} color="#06b6d4" />}
          description="Access courses, sermons, and digital resources"
          color="#06b6d4"
          onPress={() => navigation.navigate('DigitalProducts')}
        />
        
        <FeatureItem
          title="Partner Organizations"
          iconComponent={<Ionicons name="business" size={24} color="#f43f5e" />}
          description="Connect with Christian ministries and organizations"
          color="#f43f5e"
          onPress={() => navigation.navigate('PartnerOrganizations')}
        />
        
        <View className="h-6" />
      </View>
    </SafeLayout>
  );
};

export default MoreScreen; 