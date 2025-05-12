import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SafeLayout from '../ui/SafeLayout';
import MomentStories from '../Moments/MomentStories';
import PostCard from '../Posts/PostCard';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const HALF_CARD_WIDTH = (width / 2) - CARD_MARGIN - 16; // Account for padding

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

// Event card with image across the top
const EventCard = ({ event, isHalfWidth = false, onPress }) => {
  return (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm overflow-hidden mb-4"
      style={isHalfWidth ? { width: HALF_CARD_WIDTH, height: 180 } : {}}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: event.image }}
        className="w-full h-36"
        resizeMode="cover"
      />
      <View className="p-3 flex-1 justify-between">
        <Text className="font-bold mb-1" numberOfLines={1}>{event.title}</Text>
        <View>
          <View className="flex-row items-center mb-1">
            <Ionicons name="location-outline" size={14} color="#6b7280" />
            <Text className="text-gray-500 text-xs ml-1" numberOfLines={1}>{event.location}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={14} color="#6b7280" />
            <Text className="text-gray-500 text-xs ml-1">{event.date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Job card with employer logo
const JobCard = ({ job, isHalfWidth = false, onPress }) => {
  return (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm p-3 mb-4"
      style={isHalfWidth ? { width: HALF_CARD_WIDTH, height: 180 } : {}}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-1 justify-between">
        <View>
          <View className="flex-row items-center mb-2">
            <Image 
              source={{ uri: job.companyLogo }}
              className="w-10 h-10 rounded-md mr-3 bg-gray-50"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="font-bold" numberOfLines={1}>{job.title}</Text>
              <Text className="text-gray-600 text-xs">{job.company}</Text>
            </View>
          </View>
        </View>
        <View>
          <View className="flex-row items-center mb-1">
            <Ionicons name="location-outline" size={12} color="#6b7280" />
            <Text className="text-gray-500 text-xs ml-1" numberOfLines={1}>{job.location}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="briefcase-outline" size={12} color="#6b7280" />
            <Text className="text-gray-500 text-xs ml-1">{job.type}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Organization card with logo and description
const OrganizationCard = ({ organization, isHalfWidth = false, onPress }) => {
  return (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm p-3 mb-4"
      style={isHalfWidth ? { width: HALF_CARD_WIDTH, height: 130 } : {}}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-1 justify-between">
        <View>
          <View className="flex-row items-center mb-2">
            <Image 
              source={{ uri: organization.logo }}
              className="w-12 h-12 rounded mr-3 bg-white"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="font-bold" numberOfLines={1}>{organization.name}</Text>
              <Text className="text-gray-500 text-xs">{organization.type}</Text>
            </View>
          </View>
          <Text className="text-gray-600 text-xs" numberOfLines={2}>{organization.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Accommodation card with featured image and details
const AccommodationCard = ({ accommodation, isHalfWidth = false, onPress }) => {
  return (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm overflow-hidden mb-4"
      style={isHalfWidth ? { width: HALF_CARD_WIDTH, height: 130 } : {}}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: accommodation.image }}
        className="w-full h-20"
        resizeMode="cover"
      />
      <View className="p-2 flex-1 justify-between">
        <Text className="font-bold" numberOfLines={1}>{accommodation.title}</Text>
        <View>
          <Text className="text-gray-600 text-xs" numberOfLines={1}>{accommodation.description}</Text>
          <View className="flex-row items-center justify-between mt-1">
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={12} color="#6b7280" />
              <Text className="text-gray-500 text-xs ml-1">{accommodation.location}</Text>
            </View>
            <Text className="text-green-600 font-bold text-xs">{accommodation.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Partner Organization card with logo overlapping banner image
const PartnerOrganizationCard = ({ organization, onPress }) => {
  const [bannerError, setBannerError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  // Get fallback banner based on organization type
  const getFallbackBanner = () => {
    const color = organization.type === 'Technology' ? '3b82f6' : 'ec4899';
    return `https://via.placeholder.com/400x150/${color}/ffffff?text=${organization.type}`;
  };
  
  // Get fallback logo with organization initial
  const getFallbackLogo = () => {
    return `https://via.placeholder.com/100x100/6366f1/ffffff?text=${organization.name.charAt(0)}`;
  };
  
  return (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm overflow-hidden mb-4"
      style={{ width: '48%', height: 160 }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <ImageBackground 
        source={{ uri: bannerError ? getFallbackBanner() : organization.banner }}
        className="w-full h-24"
        resizeMode="cover"
        onError={() => setBannerError(true)}
      >
        <View className="absolute -bottom-8 left-3 bg-white p-1 rounded-lg shadow-md">
          <Image 
            source={{ uri: logoError ? getFallbackLogo() : organization.logo }}
            className="w-16 h-16 rounded-md"
            resizeMode="contain"
            onError={() => setLogoError(true)}
          />
        </View>
        <View className="absolute right-2 bottom-2 bg-black/20 px-2 py-1 rounded">
          <Text className="text-white text-xs font-medium">{organization.type}</Text>
        </View>
      </ImageBackground>
      <View className="mt-10 px-3 pb-2">
        <Text className="font-bold text-sm" numberOfLines={1}>{organization.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Exchange item card
const ExchangeCard = ({ item, onPress }) => {
  const [imageError, setImageError] = useState(false);
  
  // Get fallback image based on type
  const getFallbackImage = () => {
    const color = item.type === 'Equipment' ? '3b82f6' : '8b5cf6';
    return `https://via.placeholder.com/300x150/${color}/ffffff?text=${item.type}`;
  };
  
  return (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm overflow-hidden mb-4"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row">
        <Image 
          source={{ uri: imageError ? getFallbackImage() : item.image }}
          className="w-24 h-full"
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
        <View className="p-3 flex-1">
          <View className="flex-row justify-between items-start mb-1">
            <Text className="font-bold text-base flex-1 mr-2" numberOfLines={1}>{item.title}</Text>
            <View className="bg-indigo-100 px-2 py-0.5 rounded-full">
              <Text className="text-indigo-800 text-xs">{item.type}</Text>
            </View>
          </View>
          <Text className="text-gray-600 text-xs mb-1">{item.owner}</Text>
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={12} color="#6b7280" />
              <Text className="text-gray-500 text-xs ml-1">{item.distance}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="shield-checkmark" size={14} color="#22c55e" />
              <Text className="text-green-700 text-xs font-semibold ml-0.5">{item.trustScore.toFixed(1)}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [hasNotifications, setHasNotifications] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Sample data
  const events = [
    {
      id: '1',
      title: 'Annual Youth Conference',
      location: 'Hope Center, Dallas TX',
      date: 'Sat, Oct 15 • 9:00 AM',
      image: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hyaXN0aWFuJTIwY29uZmVyZW5jZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '2',
      title: 'Women\'s Retreat',
      location: 'Lake View Resort, Austin TX',
      date: 'Nov 5-7 • All Day',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tZW4ncyUyMHJldHJlYXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
    }
  ];
  
  const jobs = [
    {
      id: '1',
      title: 'Youth Pastor',
      company: 'Faith Community Church',
      location: 'Austin, TX',
      type: 'Full-time',
      companyLogo: 'https://i.imgur.com/DfUnLst.png'
    },
    {
      id: '2',
      title: 'Worship Leader',
      company: 'Grace Fellowship',
      location: 'Dallas, TX',
      type: 'Part-time',
      companyLogo: 'https://i.imgur.com/JYI3Eoo.png'
    }
  ];
  
  const organizations = [
    {
      id: '1',
      name: 'Home for Good',
      type: 'Adoption & Fostering Charity',
      description: 'Finding a home for every child who needs one through fostering and adoption.',
      logo: 'https://cdn.brandfetch.io/homeforgood.org.uk/w/400/h/400?c=1idFkiTx5HBFaBeItgg'
    },
    {
      id: '2',
      name: 'World Vision',
      type: 'International Aid & Development',
      description: 'A Christian humanitarian organisation dedicated to working with children, families and their communities.',
      logo: 'https://i.imgur.com/4QgRC0A.png'
    }
  ];
  
  const accommodations = [
    {
      id: '1',
      title: 'Christian Homestay',
      description: 'Family-friendly environment near campus',
      location: 'Nashville, TN',
      price: '$750/month',
      image: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvbWVzdGF5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '2',
      title: 'Seminary Housing',
      description: 'Walking distance to campus facilities',
      location: 'Fort Worth, TX',
      price: '$850/month',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGRvcm18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
    }
  ];

  // Add after the accommodations array
  const partnerOrganizations = [
    {
      id: '1',
      name: 'Faithlife Corporation',
      type: 'Technology',
      logo: 'https://i.imgur.com/AxNL7Jx.png',
      banner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '2',
      name: 'Christian Publishing',
      type: 'Media',
      logo: 'https://i.imgur.com/v5KbKCh.png',
      banner: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&w=500&q=60'
    }
  ];

  // Add this after the organizations array in the HomeScreen component
  const exchangeItems = [
    {
      id: '1',
      title: 'Professional PA System',
      type: 'Equipment',
      owner: 'Grace Community Church',
      distance: '2.3 miles',
      trustScore: 4.9,
      image: 'https://images.unsplash.com/photo-1520170350707-b2da59970118?auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '2',
      title: 'Meeting Room (Seats 30)',
      type: 'Venue',
      owner: 'Faithlife Seminary',
      distance: '5.1 miles',
      trustScore: 4.8,
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=500&q=60'
    }
  ];

  // Add the dummy posts from PostsScreen
  const DUMMY_POSTS = [
    {
      id: '1',
      author: {
        name: 'Sarah Johnson',
        title: 'Youth Pastor at Hope Community Church',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      },
      content: '"For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future." - Jeremiah 29:11\n\nThis verse has been guiding me through some challenging times this week. What scripture speaks to you during difficult moments?',
      media: [],
      timestamp: '3h ago',
      likes: 56,
      comments: 12,
      shares: 5,
    },
    {
      id: '2',
      author: {
        name: 'David Wilson',
        title: 'Worship Leader',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      },
      content: 'Our worship team is looking for a keyboard player to join us for Sunday services. If you have experience and a heart for worship, please reach out! We rehearse on Thursday evenings.',
      media: [
        {
          uri: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d29yc2hpcCUyMHRlYW18ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
          type: 'image',
          aspectRatio: 16/9
        }
      ],
      timestamp: '5h ago',
      likes: 28,
      comments: 8,
      shares: 3,
    }
  ];

  return (
    <SafeLayout backgroundColor="#f9fafb" edges={['top', 'bottom']}>
      <View className="flex-1 bg-gray-50">
        {/* Header with logo and user profile */}
        <View className="bg-white px-4 py-3 flex-row justify-between items-center border-b border-gray-200">
          <View className="flex-row items-center">
            <Image 
              source={require('../../assets/logo.png')} // Placeholder
              style={{ width: 120, height: 30 }}
              // Replace with actual logo
              className="mr-2"
              resizeMode="contain"
            />
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => navigation.navigate('Notifications')}
              className="mr-4 relative"
            >
              <Ionicons name="notifications-outline" size={24} color="#4f46e5" />
              <View className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setShowUserMenu(!showUserMenu)}
              className="relative"
            >
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                className="w-8 h-8 rounded-full"
              />
              <View className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border border-white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main content */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="p-4">
            {/* Moments */}
            <MomentStories />
            
            {/* Quick access cards */}
            <View className="flex-row flex-wrap justify-between mt-2 mb-6">
              <QuickAccessCard 
                title="Daily Verse" 
                icon={<Ionicons name="book-outline" size={18} color="#fff" />}
                color="#6366f1"
                onPress={() => navigation.navigate('MomentViewer', { momentId: 'daily' })}
              />
              <QuickAccessCard 
                title="Prayer Requests" 
                icon={<Ionicons name="heart-outline" size={18} color="#fff" />}
                color="#ec4899"
                onPress={() => {/* Navigate to prayer requests */}}
              />
              <QuickAccessCard 
                title="My Groups" 
                icon={<Ionicons name="people-outline" size={18} color="#fff" />}
                color="#8b5cf6"
                onPress={() => navigation.navigate('Groups')}
              />
              <QuickAccessCard 
                title="Nearby Events" 
                icon={<Ionicons name="calendar-outline" size={18} color="#fff" />}
                color="#f97316"
                onPress={() => navigation.navigate('Events')}
              />
            </View>
            
            {/* Organizations */}
            <SectionCard
              title="Organizations"
              icon={<Ionicons name="business-outline" size={18} color="#fff" />}
              color="#3b82f6"
              onPress={() => navigation.navigate('Organizations')}
            >
              <View className="flex-row flex-wrap justify-between">
                {organizations.slice(0, 2).map((org, index) => (
                  <OrganizationCard 
                    key={org.id} 
                    organization={org} 
                    isHalfWidth={true}
                    onPress={() => navigation.navigate('OrganizationDetail', { organization: org })}
                  />
                ))}
              </View>
            </SectionCard>
            
            {/* Events */}
            <SectionCard
              title="Upcoming Events"
              icon={<Ionicons name="calendar-outline" size={18} color="#fff" />}
              color="#10b981"
              onPress={() => navigation.navigate('Events')}
            >
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                className="space-x-4"
              >
                {events.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    isHalfWidth={false} 
                    onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}
                  />
                ))}
              </ScrollView>
            </SectionCard>
            
            {/* Jobs */}
            <SectionCard
              title="Recent Jobs"
              icon={<Ionicons name="briefcase-outline" size={18} color="#fff" />}
              color="#f59e0b"
              onPress={() => navigation.navigate('Jobs')}
            >
              <View className="flex-row flex-wrap justify-between">
                {jobs.slice(0, 2).map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    isHalfWidth={true}
                    onPress={() => navigation.navigate('JobDetails', { jobId: job.id })}
                  />
                ))}
              </View>
            </SectionCard>
            
            {/* Community Exchange */}
            <SectionCard
              title="Community Exchange"
              icon={<Ionicons name="swap-horizontal-outline" size={18} color="#fff" />}
              color="#8b5cf6"
              onPress={() => navigation.navigate('Marketplace')}
            >
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                className="space-x-4"
              >
                {exchangeItems.map((item) => (
                  <ExchangeCard 
                    key={item.id} 
                    item={item} 
                    onPress={() => navigation.navigate('ExchangeDetail', { listingId: item.id })}
                  />
                ))}
              </ScrollView>
            </SectionCard>
            
            {/* Partner Organizations */}
            <SectionCard
              title="Partner Organizations"
              icon={<Ionicons name="people-circle-outline" size={18} color="#fff" />}
              color="#ec4899"
              onPress={() => navigation.navigate('PartnerOrganizations')}
            >
              <View className="flex-row flex-wrap justify-between">
                {partnerOrganizations.map((org) => (
                  <PartnerOrganizationCard 
                    key={org.id} 
                    organization={org}
                    onPress={() => {/* Navigate to partner detail */}}
                  />
                ))}
              </View>
            </SectionCard>
            
            {/* Christian360 Feed */}
            <SectionCard
              title="Christian360 Feed"
              icon={<Ionicons name="newspaper-outline" size={18} color="#fff" />}
              color="#4f46e5"
              onPress={() => {/* Navigate to full feed */}}
            >
              <View className="mb-2">
                {/* Create Post Button */}
                <TouchableOpacity 
                  className="flex-row p-3 bg-white rounded-lg shadow-sm items-center mb-4"
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('CreatePost')}
                >
                  <Image 
                    source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <View className="flex-1 bg-gray-100 rounded-full py-2 px-4">
                    <Text className="text-gray-500">Share your thoughts or scripture...</Text>
                  </View>
                </TouchableOpacity>
                
                {/* Posts */}
                {DUMMY_POSTS.map((post) => (
                  <View key={post.id} className="mb-4">
                    <PostCard {...post} navigation={navigation} />
                  </View>
                ))}
                
                {/* View More Button */}
                <TouchableOpacity 
                  className="bg-indigo-50 py-3 rounded-lg items-center"
                  onPress={() => navigation.navigate('Posts')}
                >
                  <Text className="text-indigo-700 font-semibold">View More Posts</Text>
                </TouchableOpacity>
              </View>
            </SectionCard>
          </View>
        </ScrollView>
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