import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  FlatList,
  Image,
  TextInput 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SafeLayout from '../ui/SafeLayout';

// Import content components from existing screens
import ExchangeScreen from '../Exchange/ExchangeScreen';

const CommunityScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('exchange');
  const [searchQuery, setSearchQuery] = useState('');

  // This will render the appropriate content based on the active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'store':
        return <StoreTab navigation={navigation} searchQuery={searchQuery} />;
      case 'exchange':
        return <ExchangeTab navigation={navigation} searchQuery={searchQuery} />;
      case 'jobs':
        return <JobsTab navigation={navigation} searchQuery={searchQuery} />;
      case 'events':
        return <EventsTab navigation={navigation} searchQuery={searchQuery} />;
      default:
        return <ExchangeTab navigation={navigation} searchQuery={searchQuery} />;
    }
  };

  return (
    <SafeLayout edges={['top', 'bottom']}>
      <View className="px-4 pt-2 pb-4 flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold">Community</Text>
          <View className="flex-row">
            <TouchableOpacity 
              className="bg-gray-100 p-2 rounded-full mr-2"
              onPress={() => {/* Navigate to notifications */}}
            >
              <Ionicons name="notifications-outline" size={22} color="#4b5563" />
            </TouchableOpacity>
            <TouchableOpacity 
              className="bg-indigo-100 p-2 rounded-full"
              onPress={() => {/* Navigate to profile */}}
            >
              <Ionicons name="person-outline" size={22} color="#6366f1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search bar */}
        <View className="bg-gray-100 rounded-lg flex-row items-center px-3 py-2 mb-4">
          <Ionicons name="search" size={18} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-2 text-base text-gray-800"
            placeholder="Search community..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>

        {/* Tab selector */}
        <View className="flex-row bg-gray-100 rounded-lg p-1 mb-4">
          <TabButton 
            title="Store" 
            icon="storefront-outline"
            isActive={activeTab === 'store'} 
            onPress={() => setActiveTab('store')} 
          />
          <TabButton 
            title="Exchange" 
            icon="swap-horizontal-outline"
            isActive={activeTab === 'exchange'} 
            onPress={() => setActiveTab('exchange')}
          />
          <TabButton 
            title="Jobs" 
            icon="briefcase-outline"
            isActive={activeTab === 'jobs'} 
            onPress={() => setActiveTab('jobs')}
          />
          <TabButton 
            title="Events" 
            icon="calendar-outline"
            isActive={activeTab === 'events'} 
            onPress={() => setActiveTab('events')}
          />
        </View>

        {/* Tab content */}
        <View className="flex-1">
          {renderTabContent()}
        </View>
      </View>
    </SafeLayout>
  );
};

// Tab Button Component
const TabButton = ({ title, icon, isActive, onPress }) => {
  return (
    <TouchableOpacity 
      className={`flex-1 py-2 rounded-md flex-row justify-center items-center ${
        isActive ? 'bg-white shadow-sm' : ''
      }`}
      onPress={onPress}
    >
      <Ionicons 
        name={icon} 
        size={16} 
        color={isActive ? '#6366f1' : '#6b7280'} 
        style={{ marginRight: 4 }}
      />
      <Text className={isActive ? 'text-indigo-600 font-medium' : 'text-gray-600'}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// STORE TAB
const StoreTab = ({ navigation, searchQuery }) => {
  const [products, setProducts] = useState([
    {
      id: '1',
      title: 'Study Bible (ESV)',
      description: 'Leather-bound ESV Study Bible with commentary',
      price: '$39.99',
      image: 'https://images.unsplash.com/photo-1581600140682-79e8d57921b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '2',
      title: 'Faith Journal',
      description: 'Christian prayer and devotional journal',
      price: '$15.99',
      image: 'https://images.unsplash.com/photo-1591522810850-58128c5fb089?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '3',
      title: 'Worship Album',
      description: 'Digital worship album with 12 songs',
      price: '$9.99',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '4',
      title: 'Devotional Book',
      description: '365 daily devotionals for spiritual growth',
      price: '$24.99',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    },
  ]);

  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm overflow-hidden mb-4"
      style={{ width: '48%' }}
      onPress={() => {/* Navigate to product details */}}
    >
      <Image 
        source={{ uri: item.image }} 
        className="w-full h-32"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="font-bold text-base mb-1">{item.title}</Text>
        <Text className="text-gray-600 text-xs mb-2" numberOfLines={2}>{item.description}</Text>
        <Text className="text-indigo-600 font-bold">{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold">Christian Marketplace</Text>
        <TouchableOpacity 
          className="flex-row items-center"
          onPress={() => {/* Navigate to all categories */}}
        >
          <Text className="text-indigo-600 mr-1">Categories</Text>
          <Ionicons name="chevron-forward" size={16} color="#6366f1" />
        </TouchableOpacity>
      </View>

      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center py-8">
          <Ionicons name="search-outline" size={48} color="#d1d5db" />
          <Text className="text-gray-500 mt-2 text-center">
            No products found matching your search.
          </Text>
        </View>
      )}
    </View>
  );
};

// EXCHANGE TAB - Using a simplified version of the original Exchange screen
const ExchangeTab = ({ navigation, searchQuery }) => {
  const [activeExchangeTab, setActiveExchangeTab] = useState('available');

  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold">Community Exchange</Text>
        <TouchableOpacity 
          className="bg-indigo-100 px-3 py-1 rounded-full"
          onPress={() => navigation.navigate('Exchange')}
        >
          <Text className="text-indigo-600 font-medium">Full View</Text>
        </TouchableOpacity>
      </View>

      {/* Toggle tabs: Available / Needed */}
      <View className="flex-row bg-gray-100 rounded-lg p-1 mb-4">
        <TouchableOpacity 
          className={`flex-1 py-2 rounded-md flex-row justify-center items-center ${
            activeExchangeTab === 'available' ? 'bg-white shadow' : ''
          }`}
          onPress={() => setActiveExchangeTab('available')}
        >
          <Ionicons 
            name="cart-outline" 
            size={16} 
            color={activeExchangeTab === 'available' ? '#6366f1' : '#6b7280'}
            style={{ marginRight: 4 }}
          />
          <Text 
            className={activeExchangeTab === 'available' ? 'text-indigo-600 font-medium' : 'text-gray-600'}
          >
            Available
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`flex-1 py-2 rounded-md flex-row justify-center items-center ${
            activeExchangeTab === 'needed' ? 'bg-white shadow' : ''
          }`}
          onPress={() => setActiveExchangeTab('needed')}
        >
          <Ionicons 
            name="hand-left-outline" 
            size={16} 
            color={activeExchangeTab === 'needed' ? '#6366f1' : '#6b7280'}
            style={{ marginRight: 4 }}
          />
          <Text 
            className={activeExchangeTab === 'needed' ? 'text-indigo-600 font-medium' : 'text-gray-600'}
          >
            Needed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Simplified view with a button to see full Exchange screen */}
      <View className="bg-gray-50 p-4 rounded-lg items-center justify-center">
        <Ionicons name="swap-horizontal" size={48} color="#6366f1" />
        <Text className="text-center text-gray-700 mt-2 mb-4">
          Share equipment, venues, and skills with your Christian community
        </Text>
        <TouchableOpacity 
          className="bg-indigo-600 py-3 px-6 rounded-lg"
          onPress={() => navigation.navigate('Exchange')}
        >
          <Text className="text-white font-bold">Go to Community Exchange</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// JOBS TAB
const JobsTab = ({ navigation, searchQuery }) => {
  const [jobs, setJobs] = useState([
    {
      id: '1',
      title: 'Youth Pastor',
      company: 'Faith Community Church',
      location: 'Austin, TX',
      type: 'Full-time',
      postedDate: '3 days ago',
      companyLogo: 'https://i.imgur.com/DfUnLst.png'
    },
    {
      id: '2',
      title: 'Worship Leader',
      company: 'Grace Fellowship',
      location: 'Dallas, TX',
      type: 'Part-time',
      postedDate: '1 week ago',
      companyLogo: 'https://i.imgur.com/JYI3Eoo.png'
    },
    {
      id: '3',
      title: 'Administrative Assistant',
      company: 'Christian School Association',
      location: 'Houston, TX',
      type: 'Full-time',
      postedDate: 'Yesterday',
      companyLogo: 'https://i.imgur.com/OXCJ5Mv.png'
    },
    {
      id: '4',
      title: 'Outreach Coordinator',
      company: 'City Mission',
      location: 'San Antonio, TX',
      type: 'Full-time',
      postedDate: '5 days ago',
      companyLogo: 'https://i.imgur.com/QyTPSSO.png'
    },
  ]);

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderJobItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm p-3 mb-4"
      onPress={() => navigation.navigate('Jobs')}
    >
      <View className="flex-row items-center mb-2">
        <Image 
          source={{ uri: item.companyLogo }} 
          className="w-12 h-12 rounded-md mr-3" 
          resizeMode="contain"
        />
        <View className="flex-1">
          <Text className="font-bold text-base">{item.title}</Text>
          <Text className="text-gray-600">{item.company}</Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={14} color="#6b7280" />
          <Text className="text-gray-600 ml-1">{item.location}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-gray-500 text-xs mr-2">{item.postedDate}</Text>
          <View className="bg-indigo-100 px-2 py-1 rounded-full">
            <Text className="text-indigo-700 text-xs">{item.type}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold">Ministry & Christian Jobs</Text>
        <TouchableOpacity 
          className="flex-row items-center"
          onPress={() => navigation.navigate('Jobs')}
        >
          <Text className="text-indigo-600 mr-1">See All</Text>
          <Ionicons name="chevron-forward" size={16} color="#6366f1" />
        </TouchableOpacity>
      </View>

      {filteredJobs.length > 0 ? (
        <FlatList
          data={filteredJobs}
          renderItem={renderJobItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center py-8">
          <Ionicons name="search-outline" size={48} color="#d1d5db" />
          <Text className="text-gray-500 mt-2 text-center">
            No jobs found matching your search.
          </Text>
        </View>
      )}
    </View>
  );
};

// EVENTS TAB
const EventsTab = ({ navigation, searchQuery }) => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Annual Youth Conference',
      location: 'Hope Center, Dallas TX',
      date: 'Sat, Oct 15 • 9:00 AM',
      organizer: 'Youth For Christ',
      image: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hyaXN0aWFuJTIwY29uZmVyZW5jZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '2',
      title: 'Women\'s Retreat',
      location: 'Lake View Resort, Austin TX',
      date: 'Nov 5-7 • All Day',
      organizer: 'Women of Faith',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tZW4ncyUyMHJldHJlYXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '3',
      title: 'Worship Night',
      location: 'Grace Community Church, Houston TX',
      date: 'Fri, Oct 20 • 7:00 PM',
      organizer: 'Grace Community',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29yc2hpcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '4',
      title: 'Marriage Conference',
      location: 'Faith Fellowship, San Antonio TX',
      date: 'Dec 2-3 • All Day',
      organizer: 'Family Life',
      image: 'https://images.unsplash.com/photo-1529634597503-139d3726fed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFycmlhZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
    },
  ]);

  // Filter events based on search query
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderEventItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm overflow-hidden mb-4"
      onPress={() => navigation.navigate('Events')}
    >
      <Image 
        source={{ uri: item.image }} 
        className="w-full h-36" 
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="font-bold text-base mb-1">{item.title}</Text>
        <View className="flex-row items-center mb-2">
          <Ionicons name="calendar-outline" size={14} color="#6b7280" />
          <Text className="text-gray-600 ml-1">{item.date}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={14} color="#6b7280" />
          <Text className="text-gray-600 ml-1">{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold">Christian Events</Text>
        <TouchableOpacity 
          className="flex-row items-center"
          onPress={() => navigation.navigate('Events')}
        >
          <Text className="text-indigo-600 mr-1">See All</Text>
          <Ionicons name="chevron-forward" size={16} color="#6366f1" />
        </TouchableOpacity>
      </View>

      {filteredEvents.length > 0 ? (
        <FlatList
          data={filteredEvents}
          renderItem={renderEventItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center py-8">
          <Ionicons name="search-outline" size={48} color="#d1d5db" />
          <Text className="text-gray-500 mt-2 text-center">
            No events found matching your search.
          </Text>
        </View>
      )}
    </View>
  );
};

export default CommunityScreen; 