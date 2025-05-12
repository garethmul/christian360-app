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

// Add this dummy posts data before the HomeScreen component
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
  },
  {
    id: '3',
    author: {
      name: 'Rachel Adams',
      title: 'Christian Author',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    },
    content: "Just finished my latest book \"Walking in Faith\" and it's now available for pre-order! Thank you to everyone who supported me on this journey. #ChristianLiterature #NewBook",
    media: [
      {
        uri: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        type: 'image',
        aspectRatio: 3/4
      }
    ],
    timestamp: 'Yesterday',
    likes: 142,
    comments: 37,
    shares: 24,
  }
];

// Create a new component for the Christian Feed section
const ChristianFeedSection = ({ navigation }) => {
  const [showAll, setShowAll] = useState(false);
  
  // Display only first 2 posts unless "Show All" is clicked
  const displayPosts = showAll ? DUMMY_POSTS : DUMMY_POSTS.slice(0, 2);
  
  const handleCreatePost = () => {
    navigation.navigate('CreatePost');
  };
  
  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View className="w-8 h-8 rounded-full items-center justify-center mr-2 bg-indigo-600">
            <Ionicons name="newspaper" size={18} color="#fff" />
          </View>
          <Text className="text-lg font-bold">Christian360 Feed</Text>
        </View>
        <TouchableOpacity 
          onPress={() => setShowAll(!showAll)} 
          className="flex-row items-center"
        >
          <Text className="text-indigo-600 mr-1">{showAll ? 'Show Less' : 'See All'}</Text>
          <MaterialCommunityIcons name={showAll ? "chevron-up" : "chevron-right"} size={20} color="#6366f1" />
        </TouchableOpacity>
      </View>
      
      {/* Create Post Button */}
      <TouchableOpacity 
        className="bg-white rounded-lg shadow-sm p-3 mb-4 flex-row items-center"
        activeOpacity={0.7}
        onPress={handleCreatePost}
      >
        <Image 
          source={{ uri: 'https://randomuser.me/api/portraits/women/43.jpg' }}
          className="w-10 h-10 rounded-full mr-3"
        />
        <View className="bg-gray-100 flex-1 py-2 px-4 rounded-full">
          <Text className="text-gray-500">Share your thoughts or scripture...</Text>
        </View>
      </TouchableOpacity>
      
      {/* Posts List */}
      {displayPosts.map(post => (
        <PostCard 
          key={post.id} 
          {...post} 
          navigation={navigation} 
        />
      ))}
      
      {/* Show All Button (only if not already showing all) */}
      {!showAll && DUMMY_POSTS.length > 2 && (
        <TouchableOpacity 
          className="bg-indigo-50 py-3 rounded-lg items-center mt-2" 
          onPress={() => setShowAll(true)}
        >
          <Text className="text-indigo-600 font-semibold">View More Posts</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [hasNotifications, setHasNotifications] = useState(true);

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

  return (
    <SafeLayout backgroundColor="#f9fafb" edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-4">
          {/* Header with Avatar and Notification Bell */}
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-2xl font-bold">Welcome to Christian360</Text>
              <Text className="text-gray-600">Your Christian community hub</Text>
            </View>
            <View className="flex-row items-center">
              {/* Notification Bell */}
              <TouchableOpacity 
                className="mr-3 p-2" 
                onPress={() => navigation.navigate('More')}
              >
                <Ionicons name="notifications-outline" size={24} color="#4b5563" />
                {hasNotifications && (
                  <View className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                )}
              </TouchableOpacity>
              
              {/* User Avatar */}
              <TouchableOpacity 
                className="relative" 
                onPress={() => navigation.navigate('More', { screen: 'Settings' })}
              >
                <Image 
                  source={{ uri: 'https://randomuser.me/api/portraits/women/43.jpg' }} 
                  className="w-10 h-10 rounded-full border-2 border-indigo-100" 
                />
                {hasNotifications && (
                  <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Moments Stories */}
          <MomentStories />

          {/* Posts Section - Full Width */}
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

          {/* Organizations Section - Full Width */}
          <SectionCard 
            title="Christian Organizations" 
            icon={<Ionicons name="business-outline" size={18} color="#fff" />}
            color="#8b5cf6"
            onPress={() => navigation.navigate('Organizations')}
          >
            <View className="mb-3">
              <Text className="text-gray-600">Connect with Christian charities and ministries doing incredible work around the world</Text>
            </View>
            <OrganizationCard 
              key={organizations[0].id}
              organization={organizations[0]} 
              onPress={() => navigation.navigate('Organizations')}
            />
            <TouchableOpacity 
              className="bg-indigo-50 py-2 rounded-lg items-center mt-2" 
              onPress={() => navigation.navigate('Organizations')}
            >
              <Text className="text-indigo-600 font-semibold">Explore All Organizations</Text>
            </TouchableOpacity>
          </SectionCard>

          {/* Events Section - Full Width with Card */}
          <SectionCard 
            title="Upcoming Events" 
            icon={<Ionicons name="calendar-outline" size={18} color="#fff" />}
            color="#ec4899"
            onPress={() => navigation.navigate('Events')}
          >
            <EventCard 
              event={events[0]} 
              onPress={() => navigation.navigate('Events')}
            />
          </SectionCard>

          {/* Jobs Section - Full Width with Card */}
          <SectionCard 
            title="Featured Jobs" 
            icon={<Ionicons name="briefcase-outline" size={18} color="#fff" />}
            color="#3b82f6"
            onPress={() => navigation.navigate('Jobs')}
          >
            <JobCard 
              job={jobs[0]} 
              onPress={() => navigation.navigate('Jobs')}
            />
          </SectionCard>

          {/* Half-width Sections */}
          <Text className="text-xl font-bold mb-4">Explore More</Text>

          {/* Half-width Cards in a Flex Row */}
          <View className="flex-row flex-wrap justify-between">
            {/* Events - Half Width */}
            <View style={{ width: HALF_CARD_WIDTH }}>
              <View className="flex-row items-center mb-2">
                <View className="w-6 h-6 rounded-full items-center justify-center mr-1" style={{ backgroundColor: '#ec4899' }}>
                  <Ionicons name="calendar-outline" size={12} color="#fff" />
                </View>
                <Text className="text-sm font-bold">More Events</Text>
              </View>
              <EventCard 
                event={events[1]} 
                isHalfWidth 
                onPress={() => navigation.navigate('Events')}
              />
            </View>

            {/* Jobs - Half Width */}
            <View style={{ width: HALF_CARD_WIDTH }}>
              <View className="flex-row items-center mb-2">
                <View className="w-6 h-6 rounded-full items-center justify-center mr-1" style={{ backgroundColor: '#3b82f6' }}>
                  <Ionicons name="briefcase-outline" size={12} color="#fff" />
                </View>
                <Text className="text-sm font-bold">More Jobs</Text>
              </View>
              <JobCard 
                job={jobs[1]} 
                isHalfWidth 
                onPress={() => navigation.navigate('Jobs')}
              />
            </View>

            {/* Organizations - Half Width */}
            <View style={{ width: HALF_CARD_WIDTH }}>
              <View className="flex-row items-center mb-2">
                <View className="w-6 h-6 rounded-full items-center justify-center mr-1" style={{ backgroundColor: '#8b5cf6' }}>
                  <Ionicons name="business-outline" size={12} color="#fff" />
                </View>
                <Text className="text-sm font-bold">Organizations</Text>
              </View>
              <OrganizationCard 
                organization={organizations[1]} 
                isHalfWidth 
                onPress={() => navigation.navigate('Organizations')}
              />
            </View>

            {/* Accommodation - Half Width */}
            <View style={{ width: HALF_CARD_WIDTH }}>
              <View className="flex-row items-center mb-2">
                <View className="w-6 h-6 rounded-full items-center justify-center mr-1" style={{ backgroundColor: '#10b981' }}>
                  <Ionicons name="home-outline" size={12} color="#fff" />
                </View>
                <Text className="text-sm font-bold">Accommodations</Text>
              </View>
              <AccommodationCard 
                accommodation={accommodations[1]} 
                isHalfWidth 
                onPress={() => navigation.navigate('Stays')}
              />
            </View>
          </View>

          {/* Community Exchange Section */}
          <SectionCard 
            title="Community Exchange" 
            icon={<Ionicons name="swap-horizontal-outline" size={18} color="#fff" />}
            color="#4f46e5"
            onPress={() => navigation.navigate('Exchange')}
          >
            <View className="mb-2">
              <Text className="text-gray-600">Borrow equipment, venues, and services from trusted members</Text>
            </View>
            {exchangeItems.map(item => (
              <ExchangeCard 
                key={item.id}
                item={item} 
                onPress={() => navigation.navigate('Exchange')}
              />
            ))}
            <TouchableOpacity 
              className="bg-indigo-50 py-2 rounded-lg items-center" 
              onPress={() => navigation.navigate('Exchange')}
            >
              <Text className="text-indigo-600 font-semibold">View Community Exchange</Text>
            </TouchableOpacity>
          </SectionCard>

          {/* Quick Access Sections */}
          <Text className="text-xl font-bold my-4">Quick Access</Text>
          <View className="flex-row flex-wrap justify-between">
            <QuickAccessCard 
              title="Groups" 
              icon={<Ionicons name="people-outline" size={24} color="#8b5cf6" />}
              color="#8b5cf6"
              onPress={() => navigation.navigate('More', { screen: 'Groups' })}
            />
            <QuickAccessCard 
              title="Reading" 
              icon={<Ionicons name="book-outline" size={24} color="#f59e0b" />}
              color="#f59e0b"
              onPress={() => navigation.navigate('More', { screen: 'RecommendedReading' })}
            />
          </View>

          {/* Partner Organizations Section */}
          <Text className="text-xl font-bold mb-3">Partner Organizations</Text>
          <View className="flex-row flex-wrap justify-between mb-4">
            {partnerOrganizations.map(organization => (
              <PartnerOrganizationCard
                key={organization.id}
                organization={organization}
                onPress={() => navigation.navigate('More', { screen: 'PartnerOrganizations' })}
              />
            ))}
          </View>

          {/* Add the Christian Feed section at the very end */}
          <ChristianFeedSection navigation={navigation} />
          
        </View>
      </ScrollView>
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