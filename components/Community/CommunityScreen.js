import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SafeLayout from '../ui/SafeLayout';

const CommunityScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('organizations');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate data refreshing
    setTimeout(() => setRefreshing(false), 1500);
  };

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  const navigateToScreen = (screenName, params = {}) => {
    navigation.navigate(screenName, params);
  };

  // Organization card component
  const OrganizationCard = ({ item }) => (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden"
      onPress={() => navigateToScreen('OrganizationDetail', { organization: item })}
    >
      <Image 
        source={{ uri: item.banner }}
        className="w-full h-32"
        resizeMode="cover"
      />
      <View className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />
      <View className="absolute top-3 left-3 bg-white rounded-full p-1">
        <Image 
          source={{ uri: item.logo }}
          className="w-10 h-10"
          resizeMode="contain"
        />
      </View>
      <View className="p-3">
        <Text className="font-bold text-lg">{item.name}</Text>
        <Text className="text-gray-600 mb-2">{item.type}</Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={16} color="#6b7280" />
            <Text className="text-gray-600 text-sm ml-1">{item.location}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="people-outline" size={16} color="#6b7280" />
            <Text className="text-gray-600 text-sm ml-1">{item.followers} followers</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Job card component
  const JobCard = ({ item }) => (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm mb-4 p-4"
      onPress={() => navigateToScreen('JobDetails', { jobId: item.id })}
    >
      <View className="flex-row">
        <Image 
          source={{ uri: item.companyLogo }}
          className="w-12 h-12 rounded-lg mr-3"
          resizeMode="contain"
        />
        <View className="flex-1">
          <Text className="font-bold text-lg">{item.title}</Text>
          <Text className="text-gray-600">{item.company}</Text>
        </View>
      </View>
      <View className="flex-row mt-3 flex-wrap">
        <View className="bg-blue-50 rounded-full px-2 py-1 mr-2 mb-2">
          <Text className="text-blue-700 text-xs">{item.location}</Text>
        </View>
        <View className="bg-green-50 rounded-full px-2 py-1 mr-2 mb-2">
          <Text className="text-green-700 text-xs">{item.type}</Text>
        </View>
        <View className="bg-purple-50 rounded-full px-2 py-1 mb-2">
          <Text className="text-purple-700 text-xs">${item.salary}</Text>
        </View>
      </View>
      <Text className="text-gray-500 mt-2" numberOfLines={2}>{item.description}</Text>
      <View className="flex-row items-center justify-between mt-3">
        <Text className="text-gray-400 text-xs">Posted {item.postedDate}</Text>
        <View className="bg-indigo-100 rounded-full px-3 py-1">
          <Text className="text-indigo-700 font-medium">Apply</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Event card component
  const EventCard = ({ item }) => (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden"
      onPress={() => navigateToScreen('EventDetails', { eventId: item.id })}
    >
      <Image 
        source={{ uri: item.image }}
        className="w-full h-40"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="font-bold text-lg">{item.title}</Text>
        <View className="flex-row items-center mt-1 mb-2">
          <View className="w-6 h-6 rounded-full overflow-hidden mr-1">
            <Image 
              source={{ uri: item.organizerLogo }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-gray-600">{item.organizer}</Text>
        </View>
        <View className="flex-row items-center mb-1">
          <Ionicons name="calendar-outline" size={16} color="#6b7280" />
          <Text className="text-gray-600 ml-1">{item.date}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={16} color="#6b7280" />
          <Text className="text-gray-600 ml-1">{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Person card component
  const PersonCard = ({ item }) => (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm mb-4 p-3 flex-row items-center"
      onPress={() => {/* Navigate to profile */}}
    >
      <Image 
        source={{ uri: item.avatar }}
        className="w-14 h-14 rounded-full mr-3"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="font-bold text-lg">{item.name}</Text>
        <Text className="text-gray-600">{item.role}</Text>
        <View className="flex-row items-center mt-1">
          <Ionicons name="business-outline" size={14} color="#6b7280" />
          <Text className="text-gray-500 text-sm ml-1">{item.organization}</Text>
        </View>
      </View>
      <TouchableOpacity 
        className="bg-indigo-100 rounded-full px-3 py-1.5"
      >
        <Text className="text-indigo-700 font-medium">Connect</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Sample data for organizations
  const organizations = [
    {
      id: '1',
      name: 'Compassion International',
      type: 'Non-profit Organization',
      location: 'Colorado Springs, CO',
      followers: '25K',
      logo: 'https://i.imgur.com/UDkxV4c.png',
      banner: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: '2',
      name: 'Elevation Church',
      type: 'Church',
      location: 'Charlotte, NC',
      followers: '120K',
      logo: 'https://i.imgur.com/9RL2ycU.png',
      banner: 'https://images.unsplash.com/photo-1493804714600-6edb1cd93080?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: '3',
      name: 'Chick-fil-A',
      type: 'Restaurant Chain',
      location: 'Atlanta, GA',
      followers: '500K',
      logo: 'https://i.imgur.com/DvIDESs.png',
      banner: 'https://images.unsplash.com/photo-1606149059549-6042addafc5a?auto=format&fit=crop&w=800&q=60'
    }
  ];

  // Sample data for jobs
  const jobs = [
    {
      id: '1',
      title: 'Youth Pastor',
      company: 'Grace Community Church',
      companyLogo: 'https://i.imgur.com/OXCJ5Mv.png',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '45-55K',
      description: 'Looking for a passionate youth pastor to lead our growing youth ministry program and develop discipleship initiatives.',
      postedDate: '2 days ago'
    },
    {
      id: '2',
      title: 'Communications Director',
      company: 'Hope International',
      companyLogo: 'https://i.imgur.com/JYI3Eoo.png',
      location: 'Remote',
      type: 'Full-time',
      salary: '65-75K',
      description: 'Experienced communications professional needed to oversee marketing, social media, and public relations for our global missions organization.',
      postedDate: '1 week ago'
    },
    {
      id: '3',
      title: 'Children\'s Ministry Volunteer',
      company: 'Faith Community Church',
      companyLogo: 'https://i.imgur.com/MYDj56O.png',
      location: 'Dallas, TX',
      type: 'Volunteer',
      salary: 'Unpaid',
      description: 'Join our children\'s ministry team to help with Sunday morning programs for children ages 3-10.',
      postedDate: '3 days ago'
    }
  ];

  // Sample data for events
  const events = [
    {
      id: '1',
      title: 'Worship Night',
      organizer: 'Hillsong Church',
      organizerLogo: 'https://i.imgur.com/UcMR5Lq.png',
      date: 'Sat, Jul 15 • 7:00 PM',
      location: 'Phoenix, AZ',
      image: 'https://images.unsplash.com/photo-1472653816316-3ad6f10a6592?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: '2',
      title: 'Men\'s Retreat',
      organizer: 'Promise Keepers',
      organizerLogo: 'https://i.imgur.com/jXHxHcm.png',
      date: 'Aug 5-7, 2023',
      location: 'Colorado Springs, CO',
      image: 'https://images.unsplash.com/photo-1527523928924-88d88a6f21e8?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: '3',
      title: 'Youth Conference',
      organizer: 'Youth With A Mission',
      organizerLogo: 'https://i.imgur.com/QyTPSSO.png',
      date: 'Sep 20-22, 2023',
      location: 'Nashville, TN',
      image: 'https://images.unsplash.com/photo-1508906662083-8dd3dfa6b24c?auto=format&fit=crop&w=800&q=60'
    }
  ];

  // Sample data for people
  const people = [
    {
      id: '1',
      name: 'Jonathan Taylor',
      role: 'Worship Pastor',
      organization: 'Bethel Church',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: '2',
      name: 'Sarah Williams',
      role: 'Communications Director',
      organization: 'World Vision',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: '3',
      name: 'David Chen',
      role: 'Volunteer Coordinator',
      organization: 'Compassion International',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    {
      id: '4',
      name: 'Jessica Martinez',
      role: 'Youth Ministry Leader',
      organization: 'Elevation Church',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg'
    }
  ];

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'organizations':
        return (
          <FlatList
            data={organizations}
            renderItem={({ item }) => <OrganizationCard item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
          />
        );
      case 'jobs':
        return (
          <FlatList
            data={jobs}
            renderItem={({ item }) => <JobCard item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
          />
        );
      case 'events':
        return (
          <FlatList
            data={events}
            renderItem={({ item }) => <EventCard item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
          />
        );
      case 'people':
        return (
          <FlatList
            data={people}
            renderItem={({ item }) => <PersonCard item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeLayout>
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="bg-white px-4 pt-4 pb-2 shadow-sm">
          <Text className="text-2xl font-bold text-gray-800 mb-4">Community</Text>
          
          {/* Top navigation */}
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            className="border-b border-gray-200"
          >
            <TouchableOpacity 
              className={`pb-2 px-3 mr-4 ${activeTab === 'organizations' ? 'border-b-2 border-indigo-600' : ''}`}
              onPress={() => handleTabPress('organizations')}
            >
              <Text className={`${activeTab === 'organizations' ? 'text-indigo-600 font-semibold' : 'text-gray-600'}`}>
                Organizations
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`pb-2 px-3 mr-4 ${activeTab === 'jobs' ? 'border-b-2 border-indigo-600' : ''}`}
              onPress={() => handleTabPress('jobs')}
            >
              <Text className={`${activeTab === 'jobs' ? 'text-indigo-600 font-semibold' : 'text-gray-600'}`}>
                Jobs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`pb-2 px-3 mr-4 ${activeTab === 'events' ? 'border-b-2 border-indigo-600' : ''}`}
              onPress={() => handleTabPress('events')}
            >
              <Text className={`${activeTab === 'events' ? 'text-indigo-600 font-semibold' : 'text-gray-600'}`}>
                Events
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`pb-2 px-3 ${activeTab === 'people' ? 'border-b-2 border-indigo-600' : ''}`}
              onPress={() => handleTabPress('people')}
            >
              <Text className={`${activeTab === 'people' ? 'text-indigo-600 font-semibold' : 'text-gray-600'}`}>
                People
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Main content */}
        {renderContent()}
      </View>
    </SafeLayout>
  );
};

export default CommunityScreen; 