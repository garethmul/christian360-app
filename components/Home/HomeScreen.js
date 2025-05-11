import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SafeLayout from '../ui/SafeLayout';

const SectionCard = ({ title, icon, color, onPress, children }) => {
  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <View className={`w-8 h-8 rounded-full items-center justify-center mr-2`} style={{ backgroundColor: color }}>
            {icon}
          </View>
          <Text className="text-lg font-bold">{title}</Text>
        </View>
        <TouchableOpacity onPress={onPress} className="flex-row items-center">
          <Text className="text-indigo-600 mr-1">See all</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#6366f1" />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeLayout backgroundColor="#f9fafb">
      <View className="p-4">
        <View className="mb-6">
          <Text className="text-2xl font-bold mb-1">Welcome to Christian360</Text>
          <Text className="text-gray-600">Your Christian community hub</Text>
        </View>

        {/* Posts Section */}
        <SectionCard 
          title="Latest Posts" 
          icon={<Ionicons name="newspaper-outline" size={18} color="#fff" />}
          color="#6366f1"
          onPress={() => navigation.navigate('Posts')}
        >
          <View className="bg-white rounded-lg shadow-sm p-4">
            <View className="flex-row mb-3">
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                className="w-10 h-10 rounded-full mr-3" 
              />
              <View>
                <Text className="font-bold">John Smith</Text>
                <Text className="text-gray-500 text-xs">3 hours ago</Text>
              </View>
            </View>
            <Text className="mb-4">Just attended an amazing worship service at Grace Community Church...</Text>
            <TouchableOpacity 
              className="bg-indigo-50 py-2 rounded-lg items-center" 
              onPress={() => navigation.navigate('Posts')}
            >
              <Text className="text-indigo-600 font-semibold">View More Posts</Text>
            </TouchableOpacity>
          </View>
        </SectionCard>

        {/* Organizations Section */}
        <SectionCard 
          title="Christian Organizations" 
          icon={<Ionicons name="business-outline" size={18} color="#fff" />}
          color="#8b5cf6"
          onPress={() => navigation.navigate('Organizations')}
        >
          <View className="bg-white rounded-lg shadow-sm p-4">
            <View className="flex-row mb-3">
              <Image 
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/Compassion_International_Logo.svg/320px-Compassion_International_Logo.svg.png' }} 
                className="w-10 h-10 rounded mr-3 bg-white"
                resizeMode="contain"
              />
              <View>
                <Text className="font-bold">Compassion International</Text>
                <Text className="text-gray-500 text-xs">Nonprofit Organization</Text>
              </View>
            </View>
            <Text className="mb-4">Connect with Christian charities, churches, and businesses.</Text>
            <TouchableOpacity 
              className="bg-purple-50 py-2 rounded-lg items-center" 
              onPress={() => navigation.navigate('Organizations')}
            >
              <Text className="text-purple-600 font-semibold">View Organizations</Text>
            </TouchableOpacity>
          </View>
        </SectionCard>

        {/* Events Section */}
        <SectionCard 
          title="Upcoming Events" 
          icon={<Ionicons name="calendar-outline" size={18} color="#fff" />}
          color="#ec4899"
          onPress={() => navigation.navigate('Events')}
        >
          <View className="bg-white rounded-lg shadow-sm p-4">
            <Text className="font-bold mb-1">Annual Youth Conference</Text>
            <View className="flex-row items-center mb-1">
              <Ionicons name="location-outline" size={14} color="#6b7280" className="mr-1" />
              <Text className="text-gray-500 text-sm">Hope Center, Dallas TX</Text>
            </View>
            <View className="flex-row items-center mb-3">
              <Ionicons name="time-outline" size={14} color="#6b7280" className="mr-1" />
              <Text className="text-gray-500 text-sm">Sat, Oct 15 • 9:00 AM</Text>
            </View>
            <TouchableOpacity 
              className="bg-pink-50 py-2 rounded-lg items-center" 
              onPress={() => navigation.navigate('Events')}
            >
              <Text className="text-pink-600 font-semibold">View All Events</Text>
            </TouchableOpacity>
          </View>
        </SectionCard>

        {/* Jobs Section */}
        <SectionCard 
          title="Featured Jobs" 
          icon={<Ionicons name="briefcase-outline" size={18} color="#fff" />}
          color="#3b82f6"
          onPress={() => navigation.navigate('Jobs')}
        >
          <View className="bg-white rounded-lg shadow-sm p-4">
            <Text className="font-bold mb-1">Youth Pastor</Text>
            <Text className="text-gray-600 mb-1">Faith Community Church</Text>
            <View className="flex-row items-center mb-3">
              <Ionicons name="location-outline" size={14} color="#6b7280" className="mr-1" />
              <Text className="text-gray-500 text-sm">Austin, TX • Full-time</Text>
            </View>
            <TouchableOpacity 
              className="bg-blue-50 py-2 rounded-lg items-center" 
              onPress={() => navigation.navigate('Jobs')}
            >
              <Text className="text-blue-600 font-semibold">Browse All Jobs</Text>
            </TouchableOpacity>
          </View>
        </SectionCard>

        {/* Accommodation Section */}
        <SectionCard 
          title="Accommodation" 
          icon={<Ionicons name="home-outline" size={18} color="#fff" />}
          color="#10b981"
          onPress={() => navigation.navigate('Stays')}
        >
          <View className="bg-white rounded-lg shadow-sm p-4">
            <Text className="font-bold mb-1">Christian Homestay</Text>
            <Text className="text-gray-600 mb-1">Family-friendly environment near campus</Text>
            <View className="flex-row items-center mb-3">
              <Ionicons name="location-outline" size={14} color="#6b7280" className="mr-1" />
              <Text className="text-gray-500 text-sm">Nashville, TN • $750/month</Text>
            </View>
            <TouchableOpacity 
              className="bg-green-50 py-2 rounded-lg items-center" 
              onPress={() => navigation.navigate('Stays')}
            >
              <Text className="text-green-600 font-semibold">Find Accommodation</Text>
            </TouchableOpacity>
          </View>
        </SectionCard>

        {/* Quick Access Sections */}
        <Text className="text-xl font-bold mb-4">More Resources</Text>
        <View className="flex-row flex-wrap justify-between">
          <QuickAccessCard 
            title="Groups" 
            icon={<Ionicons name="people-outline" size={24} color="#8b5cf6" />}
            color="#8b5cf6"
            onPress={() => navigation.navigate('More', { screen: 'Groups' })}
          />
          <QuickAccessCard 
            title="Organizations" 
            icon={<Ionicons name="business-outline" size={24} color="#818cf8" />}
            color="#818cf8"
            onPress={() => navigation.navigate('Organizations')}
          />
          <QuickAccessCard 
            title="Reading" 
            icon={<Ionicons name="book-outline" size={24} color="#f59e0b" />}
            color="#f59e0b"
            onPress={() => navigation.navigate('More', { screen: 'RecommendedReading' })}
          />
          <QuickAccessCard 
            title="Products" 
            icon={<Ionicons name="cart-outline" size={24} color="#06b6d4" />}
            color="#06b6d4"
            onPress={() => navigation.navigate('More', { screen: 'DigitalProducts' })}
          />
          <QuickAccessCard 
            title="Partners" 
            icon={<Ionicons name="business-outline" size={24} color="#f43f5e" />}
            color="#f43f5e"
            onPress={() => navigation.navigate('More', { screen: 'PartnerOrganizations' })}
          />
        </View>
      </View>
    </SafeLayout>
  );
};

const QuickAccessCard = ({ title, icon, color, onPress }) => {
  return (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm p-4 items-center mb-4"
      style={{ width: '48%' }}
      onPress={onPress}
    >
      <View className={`w-12 h-12 rounded-full items-center justify-center mb-2`} style={{ backgroundColor: `${color}20` }}>
        {icon}
      </View>
      <Text className="font-medium">{title}</Text>
    </TouchableOpacity>
  );
};

export default HomeScreen; 