import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  TextInput,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Modal,
  Alert,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import SafeLayout from '../ui/SafeLayout';

// Sample data for exchange listings
const exchangeListings = [
  {
    id: '1',
    type: 'equipment',
    title: 'Professional PA System',
    description: 'Complete PA system available for church events and conferences. Includes speakers, mixer, and microphones.',
    owner: {
      id: 'user1',
      name: 'Grace Community Church',
      avatar: 'https://i.imgur.com/JYI3Eoo.png', // Church logo
      type: 'organization',
      trustScore: 4.9,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1520170350707-b2da59970118?auto=format&fit=crop&w=500&q=60',
    location: 'Austin, TX',
    distance: '2.3 miles',
    availability: 'Weekends',
    condition: 'Excellent',
    isBookmarked: false
  },
  {
    id: '2',
    type: 'space',
    title: 'Meeting Room (Seats 30)',
    description: 'Meeting room available for Bible studies, small conferences, or community gatherings.',
    owner: {
      id: 'user2',
      name: 'Faithlife Seminary',
      avatar: 'https://i.imgur.com/DfUnLst.png', // Seminary logo
      type: 'organization',
      trustScore: 4.8,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=500&q=60',
    location: 'Dallas, TX',
    distance: '5.1 miles',
    availability: 'Weekday evenings',
    condition: 'Very Good',
    isBookmarked: true
  },
  {
    id: '7',
    type: 'stays',
    title: 'Peaceful Retreat House',
    description: 'Christian-friendly entire house with 3 beds, 2 baths. Includes WiFi, kitchen, and free parking.',
    owner: {
      id: 'user10',
      name: 'Faith Family Retreat Center',
      avatar: 'https://i.imgur.com/UcMR5Lq.png',
      type: 'organization',
      trustScore: 4.8,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    location: 'Nashville, TN',
    distance: '10.2 miles',
    availability: 'Year-round',
    price: '$120/night',
    amenities: ['WiFi', 'Kitchen', 'Free parking'],
    beds: 3,
    baths: 2,
    isBookmarked: false
  },
  {
    id: '8',
    type: 'stays',
    title: 'Riverside Seminary Guest House',
    description: 'Private room near theological seminary with campus access. Breakfast included.',
    owner: {
      id: 'user11',
      name: 'Southern Seminary',
      avatar: 'https://i.imgur.com/DfUnLst.png',
      type: 'organization',
      trustScore: 4.9,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    location: 'Louisville, KY',
    distance: '15.7 miles',
    availability: 'During term time',
    price: '$75/night',
    amenities: ['WiFi', 'Breakfast included', 'Campus access'],
    beds: 1,
    baths: 1,
    isBookmarked: false
  },
  {
    id: '9',
    type: 'stays',
    title: 'Mountain Prayer Retreat',
    description: 'Peaceful cabin with prayer garden and hot tub. Perfect for spiritual retreats.',
    owner: {
      id: 'user12',
      name: 'Mountain Prayer Ministries',
      avatar: 'https://i.imgur.com/QyTPSSO.png',
      type: 'organization',
      trustScore: 4.7,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    location: 'Gatlinburg, TN',
    distance: '25.3 miles',
    availability: 'Weekends and holidays',
    price: '$195/night',
    amenities: ['WiFi', 'Kitchen', 'Hot tub', 'Prayer garden'],
    beds: 4,
    baths: 2,
    isBookmarked: false
  },
  {
    id: '3',
    type: 'skill',
    title: 'Graphic Design Services',
    description: 'Professional graphic design for ministries and Christian events. Can help with logos, posters, social media assets.',
    owner: {
      id: 'user3',
      name: 'Sarah Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      type: 'individual',
      trustScore: 4.7,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=500&q=60',
    location: 'Houston, TX',
    distance: 'Remote',
    availability: 'Weekends and evenings',
    condition: null,
    isBookmarked: false
  },
  {
    id: '4',
    type: 'equipment',
    title: 'Video Recording Equipment',
    description: 'Professional video camera, tripod, and lighting kit available for ministry events and sermon recordings.',
    owner: {
      id: 'user4',
      name: 'David Chen',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      type: 'individual',
      trustScore: 4.6,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1589872307379-0ffdf9829123?auto=format&fit=crop&w=500&q=60',
    location: 'Austin, TX',
    distance: '3.7 miles',
    availability: 'By appointment',
    condition: 'Good',
    isBookmarked: false
  },
  {
    id: '5',
    type: 'space',
    title: 'Conference Hall (Seats 150)',
    description: 'Large conference hall available for Christian conferences, worship nights, or large community events.',
    owner: {
      id: 'user5',
      name: 'Hillside Church',
      avatar: 'https://i.imgur.com/MYDj56O.png', // Church logo
      type: 'organization',
      trustScore: 4.9,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1526041292692-1a9af59bcd33?auto=format&fit=crop&w=500&q=60',
    location: 'Fort Worth, TX',
    distance: '12.5 miles',
    availability: 'Weekends and select weekdays',
    condition: 'Excellent',
    isBookmarked: false
  },
  {
    id: '6',
    type: 'service',
    title: "Children's Ministry Volunteer",
    description: "Experienced children's ministry leader available to help with Sunday school or special events.",
    owner: {
      id: 'user6',
      name: 'Rebecca Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      type: 'individual',
      trustScore: 4.8,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1560541919-eb5c2da6a5a3?auto=format&fit=crop&w=500&q=60',
    location: 'Dallas, TX',
    distance: '4.2 miles',
    availability: 'Sundays and special events',
    condition: null,
    isBookmarked: false
  }
];

// Sample data for needed items
const neededItems = [
  {
    id: 'need1',
    type: 'equipment',
    title: 'Portable Baptismal Pool',
    description: 'Looking to borrow a portable baptismal pool for our outdoor baptism service next month.',
    requester: {
      id: 'user7',
      name: 'New Life Community Church',
      avatar: 'https://i.imgur.com/UcMR5Lq.png',
      type: 'organization',
      trustScore: 4.7,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1563639823304-c6c1dab9d01a?auto=format&fit=crop&w=500&q=60',
    location: 'Houston, TX',
    neededBy: 'July 15, 2023',
    duration: '1 weekend',
    isBookmarked: false
  },
  {
    id: 'need4',
    type: 'stays',
    title: 'Accommodation for Visiting Pastor',
    description: 'Looking for a Christian-friendly home or guest house for our visiting pastor and his wife. Need 2 beds, private bath if possible.',
    requester: {
      id: 'user13',
      name: 'Grace Fellowship Church',
      avatar: 'https://i.imgur.com/JYI3Eoo.png',
      type: 'organization',
      trustScore: 4.8,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1556784344-ad913c73cfc4?auto=format&fit=crop&w=500&q=60',
    location: 'Dallas, TX',
    neededBy: 'August 12-19, 2023',
    duration: '7 days',
    isBookmarked: false
  },
  {
    id: 'need2',
    type: 'space',
    title: 'Outdoor Space for Youth Camp',
    description: 'Looking for an outdoor space with shelter for a 3-day youth camp. Need space for activities and camping.',
    requester: {
      id: 'user8',
      name: 'Youth For Christ',
      avatar: 'https://i.imgur.com/QyTPSSO.png',
      type: 'organization',
      trustScore: 4.9,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?auto=format&fit=crop&w=500&q=60',
    location: 'Austin, TX',
    neededBy: 'August 5-7, 2023',
    duration: '3 days',
    isBookmarked: true
  },
  {
    id: 'need3',
    type: 'equipment',
    title: 'Projector for Conference',
    description: 'Need to borrow a high-quality projector for our women\'s conference. Must be bright enough for a large venue.',
    requester: {
      id: 'user9',
      name: 'Women of Faith',
      avatar: 'https://i.imgur.com/TyzVncb.png',
      type: 'organization',
      trustScore: 4.8,
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=500&q=60',
    location: 'Dallas, TX',
    neededBy: 'June 24-25, 2023',
    duration: '2 days',
    isBookmarked: false
  }
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Items', icon: 'grid-outline' },
  { id: 'equipment', name: 'Equipment', icon: 'hardware-chip-outline' },
  { id: 'space', name: 'Venues', icon: 'business-outline' },
  { id: 'stays', name: 'Stays', icon: 'home-outline' },
  { id: 'skill', name: 'Skills', icon: 'color-palette-outline' },
  { id: 'service', name: 'Services', icon: 'people-outline' }
];

// Trust badge component
const TrustBadge = ({ score, verified }) => {
  // Determine color based on score
  const getBadgeColor = () => {
    if (score >= 4.5) return '#22c55e'; // Green for high trust
    if (score >= 4.0) return '#eab308'; // Yellow for medium trust
    return '#94a3b8'; // Gray for lower trust
  };

  return (
    <View className="flex-row items-center">
      <View className="flex-row bg-white rounded-full px-2 py-1 shadow-sm mr-1">
        <Ionicons name="shield-checkmark" size={14} color={getBadgeColor()} />
        <Text className="text-xs font-semibold ml-1" style={{ color: getBadgeColor() }}>
          {score.toFixed(1)}
        </Text>
      </View>
      {verified && (
        <View className="bg-blue-500 rounded-full px-2 py-1">
          <Ionicons name="checkmark-circle" size={14} color="#fff" />
        </View>
      )}
    </View>
  );
};

// Individual listing card
const ListingCard = ({ item, onPress, onBookmark }) => {
  const [imageError, setImageError] = useState(false);
  
  // Create fallback for card image
  const cardImage = imageError 
    ? `https://via.placeholder.com/300x200/e2e8f0/4b5563?text=${item.type.charAt(0).toUpperCase() + item.type.slice(1)}`
    : item.image;
    
  // Fallback colors based on item type
  const getFallbackColor = () => {
    switch(item.type) {
      case 'equipment': return '#3b82f6'; // blue
      case 'space': return '#8b5cf6';     // purple
      case 'stays': return '#10b981';     // green
      case 'skill': return '#ec4899';     // pink
      case 'service': return '#f59e0b';   // amber
      default: return '#6b7280';          // gray
    }
  };

  // Determine if this is a stay listing
  const isStay = item.type === 'stays';

  return (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm overflow-hidden mb-4 mx-1"
      style={{ width: '48%' }}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View className="relative">
        <Image
          source={{ uri: cardImage }}
          className="w-full h-32"
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
        
        {/* Bookmark button */}
        <TouchableOpacity 
          className="absolute top-2 right-2 bg-black/50 p-1 rounded-full"
          onPress={() => onBookmark(item.id)}
        >
          <Ionicons 
            name={item.isBookmarked ? "bookmark" : "bookmark-outline"} 
            size={16} 
            color={item.isBookmarked ? "#fcd34d" : "#fff"} 
          />
        </TouchableOpacity>
        
        {/* Category badge */}
        <View className="absolute top-2 left-2 bg-black/50 rounded-full px-2 py-1">
          <Text className="text-white text-xs">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Text>
        </View>
        
        {/* Price badge for stays */}
        {isStay && (
          <View className="absolute bottom-2 right-2 bg-emerald-600 rounded-md px-2 py-1">
            <Text className="text-white text-xs font-bold">{item.price}</Text>
          </View>
        )}
      </View>
      
      <View className="p-2">
        <Text className="font-bold text-sm mb-1" numberOfLines={1}>{item.title}</Text>
        
        <View className="flex-row items-center mb-1">
          <View className="w-5 h-5 rounded-full overflow-hidden mr-1">
            <Image 
              source={{ uri: item.owner?.avatar || item.requester?.avatar }}
              className="w-full h-full"
              resizeMode="cover"
              onError={(e) => {
                // If avatar fails to load, change to text-based placeholder
                e.currentTarget.source = {
                  uri: `https://via.placeholder.com/50x50/${getFallbackColor().substring(1)}/ffffff?text=${(item.owner?.name || item.requester?.name).charAt(0)}`
                }
              }}
            />
          </View>
          <Text className="text-xs text-gray-600" numberOfLines={1}>{item.owner?.name || item.requester?.name}</Text>
        </View>
        
        {/* Stay-specific details */}
        {isStay && (
          <View className="mb-1">
            <View className="flex-row items-center">
              <Ionicons name="bed-outline" size={12} color="#6b7280" />
              <Text className="text-xs text-gray-500 ml-1">{item.beds} beds</Text>
              <Text className="text-gray-500 mx-1">•</Text>
              <Ionicons name="water-outline" size={12} color="#6b7280" />
              <Text className="text-xs text-gray-500 ml-1">{item.baths} baths</Text>
            </View>
            {item.amenities && item.amenities.length > 0 && (
              <Text className="text-xs text-gray-500" numberOfLines={1}>
                {item.amenities.slice(0, 2).join(', ')}{item.amenities.length > 2 ? '...' : ''}
              </Text>
            )}
          </View>
        )}
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={12} color="#6b7280" />
            <Text className="text-xs text-gray-500 ml-1">{item.distance || 'Remote'}</Text>
          </View>
          <TrustBadge score={item.owner?.trustScore || item.requester?.trustScore} verified={item.owner?.verified || item.requester?.verified} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Needed item card
const NeededItemCard = ({ item, onPress, onBookmark }) => {
  const [imageError, setImageError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  
  // Create fallback for card image
  const cardImage = imageError 
    ? `https://via.placeholder.com/300x200/e2e8f0/4b5563?text=Needed`
    : item.image;
    
  // Create fallback for avatar image
  const getInitialsAvatar = (name) => {
    return `https://via.placeholder.com/50x50/6366f1/ffffff?text=${name.charAt(0)}`;
  };

  return (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm overflow-hidden mb-4"
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View className="relative">
        <Image
          source={{ uri: cardImage }}
          className="w-full h-24"
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
        
        {/* Bookmark button */}
        <TouchableOpacity 
          className="absolute top-2 right-2 bg-black/50 p-1 rounded-full"
          onPress={() => onBookmark(item.id)}
        >
          <Ionicons 
            name={item.isBookmarked ? "bookmark" : "bookmark-outline"} 
            size={16} 
            color={item.isBookmarked ? "#fcd34d" : "#fff"} 
          />
        </TouchableOpacity>
        
        {/* Urgency badge */}
        <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-3">
          <Text className="text-white text-xs font-medium">Needed by: {item.neededBy}</Text>
        </View>
      </View>
      
      <View className="p-3">
        <View className="flex-row mb-1">
          <View className="flex-row items-center bg-violet-100 rounded-full px-2 py-0.5 mr-2">
            <MaterialCommunityIcons name="calendar-clock" size={12} color="#8b5cf6" />
            <Text className="text-violet-800 text-xs ml-1">{item.duration}</Text>
          </View>
          <View className="flex-row items-center bg-blue-100 rounded-full px-2 py-0.5">
            <Ionicons name="location" size={12} color="#3b82f6" />
            <Text className="text-blue-800 text-xs ml-1">{item.location}</Text>
          </View>
        </View>
        
        <Text className="font-bold text-base mb-1">{item.title}</Text>
        <Text className="text-gray-600 text-xs mb-2" numberOfLines={2}>{item.description}</Text>
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            {item.requester && (
              <>
                <Image 
                  source={{ uri: avatarError ? getInitialsAvatar(item.requester.name) : item.requester.avatar }}
                  className="w-5 h-5 rounded-full mr-1"
                  resizeMode="cover"
                  onError={() => setAvatarError(true)}
                />
                <Text className="text-xs text-gray-600">{item.requester.name}</Text>
              </>
            )}
          </View>
          <TouchableOpacity className="bg-indigo-100 rounded-full py-1 px-3">
            <Text className="text-indigo-600 text-xs font-medium">Can Help</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ExchangeScreen = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('available'); // 'available' or 'needed'
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  // State for exchange listings with bookmarks
  const [availableListings, setAvailableListings] = useState(exchangeListings);
  const [neededItemsList, setNeededItemsList] = useState(neededItems);
  
  // Filter settings
  const [filterSettings, setFilterSettings] = useState({
    maxDistance: 50, // miles
    trustScoreMin: 4.0,
  });

  // Toggle bookmark for an item
  const toggleBookmark = (itemId, isNeeded = false) => {
    if (isNeeded) {
      setNeededItemsList(neededItemsList.map(item => 
        item.id === itemId 
          ? { ...item, isBookmarked: !item.isBookmarked }
          : item
      ));
    } else {
      setAvailableListings(availableListings.map(item => 
        item.id === itemId 
          ? { ...item, isBookmarked: !item.isBookmarked }
          : item
      ));
    }
  };

  // Filter listings based on active category, search query, and filter settings
  const getFilteredListings = () => {
    return availableListings.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.type === activeCategory;
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Distance filtering
      const distanceMatch = item.distance === 'Remote' || 
        parseInt(item.distance) <= filterSettings.maxDistance;
      
      // Trust score filtering
      const trustMatch = item.owner.trustScore >= filterSettings.trustScoreMin;
      
      return matchesCategory && matchesSearch && distanceMatch && trustMatch;
    });
  };

  // Filter needed items
  const getFilteredNeededItems = () => {
    return neededItemsList.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.type === activeCategory;
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  };

  const filteredListings = getFilteredListings();
  const filteredNeededItems = getFilteredNeededItems();

  const handleListingPress = (item) => {
    // Navigate to listing detail
    navigation.navigate('ExchangeDetail', { listingId: item.id });
  };
  
  const handleNeededItemPress = (item) => {
    // In a real app, we would navigate to a dedicated needed item detail screen
    Alert.alert(
      item.title,
      `Contact ${item.requester.name} if you can help them with this need.`,
      [{ text: 'OK' }]
    );
  };
  
  const applyFilters = () => {
    setShowFilterModal(false);
    // Filtering is already applied through the getFilteredListings function
  };

  return (
    <SafeLayout edges={['top', 'bottom']}>
      <View className="px-4 pt-2 pb-4 flex-1">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold">Community Exchange</Text>
          <View className="flex-row">
            <TouchableOpacity 
              className="bg-gray-100 p-2 rounded-full mr-2"
              onPress={() => setShowFilterModal(true)}
            >
              <Ionicons name="options-outline" size={22} color="#4b5563" />
            </TouchableOpacity>
            <TouchableOpacity 
              className="bg-indigo-100 p-2 rounded-full"
              onPress={() => {/* Navigate to add listing */
                Alert.alert('Coming Soon', 'Add new listing functionality will be available soon.');
              }}
            >
              <Ionicons name="add" size={22} color="#6366f1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search bar */}
        <View className="bg-gray-100 rounded-lg flex-row items-center px-3 py-2 mb-4">
          <Ionicons name="search" size={18} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-2 text-base text-gray-800"
            placeholder="Search equipment, venues, skills..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>

        {/* Toggle tabs: Available / Needed */}
        <View className="flex-row bg-gray-100 rounded-lg p-1 mb-4">
          <TouchableOpacity 
            className={`flex-1 py-2 rounded-md flex-row justify-center items-center ${
              activeTab === 'available' ? 'bg-white shadow' : ''
            }`}
            onPress={() => setActiveTab('available')}
          >
            <Ionicons 
              name="cart-outline" 
              size={16} 
              color={activeTab === 'available' ? '#6366f1' : '#6b7280'}
              style={{ marginRight: 4 }}
            />
            <Text 
              className={activeTab === 'available' ? 'text-indigo-600 font-medium' : 'text-gray-600'}
            >
              Available
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-2 rounded-md flex-row justify-center items-center ${
              activeTab === 'needed' ? 'bg-white shadow' : ''
            }`}
            onPress={() => setActiveTab('needed')}
          >
            <Ionicons 
              name="hand-left-outline" 
              size={16} 
              color={activeTab === 'needed' ? '#6366f1' : '#6b7280'}
              style={{ marginRight: 4 }}
            />
            <Text 
              className={activeTab === 'needed' ? 'text-indigo-600 font-medium' : 'text-gray-600'}
            >
              Needed
            </Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              className={`mr-3 px-4 py-2 rounded-full flex-row items-center ${
                activeCategory === category.id 
                  ? 'bg-indigo-100' 
                  : 'bg-gray-100'
              }`}
              onPress={() => setActiveCategory(category.id)}
            >
              <Ionicons 
                name={category.icon} 
                size={16} 
                color={activeCategory === category.id ? '#6366f1' : '#6b7280'} 
              />
              <Text 
                className={`ml-1 font-medium ${
                  activeCategory === category.id 
                    ? 'text-indigo-600' 
                    : 'text-gray-600'
                }`}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Trust message */}
        <View className="bg-blue-50 p-3 rounded-lg mb-4 flex-row items-center">
          <Ionicons name="information-circle" size={20} color="#3b82f6" />
          <Text className="text-blue-800 ml-2 text-sm flex-1">
            Items are shared by trusted members of our Christian community. All members are verified.
          </Text>
        </View>

        {/* Content based on active tab */}
        {activeTab === 'available' ? (
          <>
            {/* Available Items */}
            <Text className="text-lg font-bold mb-3">Available to Borrow</Text>
            {filteredListings.length > 0 ? (
              <FlatList
                key="available-grid"
                data={filteredListings}
                renderItem={({ item }) => (
                  <ListingCard 
                    item={item} 
                    onPress={handleListingPress} 
                    onBookmark={(id) => toggleBookmark(id)}
                  />
                )}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View className="flex-1 items-center justify-center py-8">
                <MaterialCommunityIcons name="emoticon-sad-outline" size={48} color="#d1d5db" />
                <Text className="text-gray-500 mt-2 text-center">
                  No items found matching your criteria.
                </Text>
              </View>
            )}
          </>
        ) : (
          <>
            {/* Needed Items */}
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-bold">Community Needs</Text>
              <TouchableOpacity 
                className="bg-indigo-100 rounded-full py-1 px-3 flex-row items-center"
                onPress={() => {
                  Alert.alert('Coming Soon', 'Post a need functionality will be available soon.');
                }}
              >
                <Ionicons name="add-circle-outline" size={16} color="#6366f1" />
                <Text className="text-indigo-600 text-xs font-medium ml-1">Post a Need</Text>
              </TouchableOpacity>
            </View>
            
            {filteredNeededItems.length > 0 ? (
              <FlatList
                key="needed-list"
                data={filteredNeededItems}
                renderItem={({ item }) => (
                  <NeededItemCard 
                    item={item} 
                    onPress={handleNeededItemPress}
                    onBookmark={(id) => toggleBookmark(id, true)}
                  />
                )}
                keyExtractor={item => item.id}
                numColumns={1}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View className="flex-1 items-center justify-center py-8">
                <MaterialCommunityIcons name="emoticon-happy-outline" size={48} color="#d1d5db" />
                <Text className="text-gray-500 mt-2 text-center">
                  No needs currently posted in this category.
                </Text>
              </View>
            )}
          </>
        )}
      </View>
      
      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-xl p-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold">Filter Options</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            {/* Distance filter */}
            <View className="mb-6">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="font-medium">Maximum Distance</Text>
                <Text>{filterSettings.maxDistance === 50 ? '50+ miles' : `${filterSettings.maxDistance} miles`}</Text>
              </View>
              <Slider
                minimumValue={1}
                maximumValue={50}
                step={1}
                value={filterSettings.maxDistance}
                onValueChange={(value) => setFilterSettings({...filterSettings, maxDistance: value})}
                minimumTrackTintColor="#6366f1"
                maximumTrackTintColor="#e5e7eb"
                thumbTintColor="#6366f1"
              />
              <View className="flex-row justify-between">
                <Text className="text-gray-500 text-xs">1 mile</Text>
                <Text className="text-gray-500 text-xs">50+ miles</Text>
              </View>
            </View>
            
            {/* Trust score filter */}
            <View className="mb-6">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="font-medium">Minimum Trust Score</Text>
                <View className="flex-row items-center">
                  <Ionicons name="shield-checkmark" size={16} color="#22c55e" />
                  <Text className="ml-1">{filterSettings.trustScoreMin.toFixed(1)}+</Text>
                </View>
              </View>
              <Slider
                minimumValue={3.0}
                maximumValue={5.0}
                step={0.1}
                value={filterSettings.trustScoreMin}
                onValueChange={(value) => setFilterSettings({...filterSettings, trustScoreMin: value})}
                minimumTrackTintColor="#6366f1"
                maximumTrackTintColor="#e5e7eb"
                thumbTintColor="#6366f1"
              />
              <View className="flex-row justify-between">
                <Text className="text-gray-500 text-xs">3.0</Text>
                <Text className="text-gray-500 text-xs">5.0</Text>
              </View>
            </View>
            
            {/* Apply button */}
            <TouchableOpacity 
              className="bg-indigo-600 py-3 rounded-lg items-center mt-2"
              onPress={applyFilters}
            >
              <Text className="text-white font-bold">Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeLayout>
  );
};

export default ExchangeScreen; 