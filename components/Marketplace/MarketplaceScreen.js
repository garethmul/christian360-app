import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  RefreshControl,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SafeLayout from '../ui/SafeLayout';

// Import Exchange components
import { ListingCard, NeededItemCard } from '../Exchange/ExchangeScreen';

const MarketplaceScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('exchange');
  const [searchQuery, setSearchQuery] = useState('');
  const [exchangeSubTab, setExchangeSubTab] = useState('available');
  const [storeSubTab, setStoreSubTab] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate data refreshing
    setTimeout(() => setRefreshing(false), 1500);
  };

  // Sample data for exchange listings (borrowed from ExchangeScreen)
  const exchangeListings = [
    {
      id: '1',
      type: 'equipment',
      title: 'Professional PA System',
      description: 'Complete PA system available for church events and conferences. Includes speakers, mixer, and microphones.',
      owner: {
        id: 'user1',
        name: 'Grace Community Church',
        avatar: 'https://i.imgur.com/JYI3Eoo.png',
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
        avatar: 'https://i.imgur.com/DfUnLst.png',
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
      image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=60',
      location: 'Nashville, TN',
      distance: '10.2 miles',
      availability: 'Year-round',
      price: '$120/night',
      amenities: ['WiFi', 'Kitchen', 'Free parking'],
      beds: 3,
      baths: 2,
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
    }
  ];

  // Sample data for store products
  const storeProducts = [
    {
      id: 'product1',
      name: 'Daily Devotional Guide',
      author: 'John Peterson',
      price: '$12.99',
      category: 'books',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=60',
      rating: 4.8,
      reviewCount: 124
    },
    {
      id: 'product2',
      name: 'Worship Leader Collection',
      author: 'Elevation Worship',
      price: '$24.99',
      category: 'music',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=60',
      rating: 4.9,
      reviewCount: 235
    },
    {
      id: 'product3',
      name: 'Biblical Leadership Course',
      author: 'Grace Seminary',
      price: '$49.99',
      category: 'courses',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=60',
      rating: 4.7,
      reviewCount: 87
    },
    {
      id: 'product4',
      name: 'Family Devotional App',
      author: 'Christian Apps Inc.',
      price: '$3.99',
      category: 'apps',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=60',
      rating: 4.6,
      reviewCount: 312
    }
  ];

  // Product Card component for the Store
  const ProductCard = ({ item }) => {
    // Category-specific styles
    const getCategoryColor = () => {
      switch (item.category) {
        case 'books': return { bg: 'bg-blue-50', text: 'text-blue-700' };
        case 'music': return { bg: 'bg-purple-50', text: 'text-purple-700' };
        case 'courses': return { bg: 'bg-amber-50', text: 'text-amber-700' };
        case 'apps': return { bg: 'bg-green-50', text: 'text-green-700' };
        default: return { bg: 'bg-gray-50', text: 'text-gray-700' };
      }
    };

    const categoryStyle = getCategoryColor();

    return (
      <TouchableOpacity
        className="bg-white rounded-lg shadow-sm overflow-hidden mb-4"
        style={{ width: '48%' }}
        onPress={() => {/* Navigate to product detail */}}
      >
        <Image
          source={{ uri: item.image }}
          className="w-full h-32"
          resizeMode="cover"
        />
        <View className="p-2">
          <View className={`${categoryStyle.bg} self-start rounded-full px-2 py-0.5 mb-1`}>
            <Text className={`${categoryStyle.text} text-xs`}>
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </Text>
          </View>
          <Text className="font-bold" numberOfLines={1}>{item.name}</Text>
          <Text className="text-gray-600 text-xs mb-1">By {item.author}</Text>
          
          <View className="flex-row items-center mt-1">
            <View className="flex-row">
              {[...Array(5)].map((_, index) => (
                <Ionicons
                  key={index}
                  name={index + 1 <= Math.floor(item.rating) ? "star" : index + 0.5 <= item.rating ? "star-half" : "star-outline"}
                  size={12}
                  color="#f59e0b"
                />
              ))}
            </View>
            <Text className="text-gray-500 text-xs ml-1">({item.reviewCount})</Text>
          </View>
          
          <View className="flex-row items-center justify-between mt-2">
            <Text className="font-bold text-indigo-700">{item.price}</Text>
            <TouchableOpacity className="bg-indigo-100 rounded-full p-1">
              <Ionicons name="cart-outline" size={16} color="#4f46e5" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Render Exchange content
  const renderExchangeContent = () => {
    if (exchangeSubTab === 'available') {
      return (
        <FlatList
          data={exchangeListings}
          renderItem={({ item }) => (
            <ListingCard
              item={item}
              onPress={() => navigation.navigate('ExchangeDetail', { listingId: item.id })}
              onBookmark={() => {/* Handle bookmark */}}
            />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      );
    } else {
      return (
        <FlatList
          data={neededItems}
          renderItem={({ item }) => (
            <NeededItemCard
              item={item}
              onPress={() => navigation.navigate('NeededItemDetail', { itemId: item.id })}
              onBookmark={() => {/* Handle bookmark */}}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      );
    }
  };

  // Store category filters
  const storeCategories = [
    { id: 'all', name: 'All' },
    { id: 'books', name: 'Books' },
    { id: 'music', name: 'Music' },
    { id: 'courses', name: 'Courses' },
    { id: 'apps', name: 'Apps' }
  ];

  // Filtered store products
  const getFilteredProducts = () => {
    if (storeSubTab === 'all') {
      return storeProducts;
    }
    return storeProducts.filter(product => product.category === storeSubTab);
  };

  // Render Store content
  const renderStoreContent = () => {
    const filteredProducts = getFilteredProducts();
    
    return (
      <View className="flex-1">
        {/* Store category tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="bg-white py-2 px-4"
        >
          {storeCategories.map(category => (
            <TouchableOpacity
              key={category.id}
              className={`mr-3 px-3 py-1 rounded-full ${storeSubTab === category.id ? 'bg-indigo-100' : 'bg-gray-100'}`}
              onPress={() => setStoreSubTab(category.id)}
            >
              <Text className={storeSubTab === category.id ? 'text-indigo-700 font-medium' : 'text-gray-600'}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductCard item={item} />}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>
    );
  };

  return (
    <SafeLayout>
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="bg-white px-4 pt-4 pb-2 shadow-sm">
          <Text className="text-2xl font-bold text-gray-800 mb-4">Marketplace</Text>
          
          {/* Search bar */}
          <View className="bg-gray-100 rounded-lg flex-row items-center px-3 py-2 mb-4">
            <Ionicons name="search" size={18} color="#9ca3af" />
            <TextInput
              className="flex-1 ml-2 text-base text-gray-800"
              placeholder="Search marketplace..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== '' && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>
          
          {/* Main tabs */}
          <View className="flex-row bg-gray-100 rounded-lg p-1 mb-2">
            <TouchableOpacity 
              className={`flex-1 py-2 rounded-md flex-row justify-center items-center ${
                activeTab === 'exchange' ? 'bg-white shadow' : ''
              }`}
              onPress={() => setActiveTab('exchange')}
            >
              <Ionicons 
                name="swap-horizontal" 
                size={16} 
                color={activeTab === 'exchange' ? '#6366f1' : '#6b7280'}
                style={{ marginRight: 4 }}
              />
              <Text 
                className={activeTab === 'exchange' ? 'text-indigo-600 font-medium' : 'text-gray-600'}
              >
                Community Exchange
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`flex-1 py-2 rounded-md flex-row justify-center items-center ${
                activeTab === 'store' ? 'bg-white shadow' : ''
              }`}
              onPress={() => setActiveTab('store')}
            >
              <Ionicons 
                name="cart" 
                size={16} 
                color={activeTab === 'store' ? '#6366f1' : '#6b7280'}
                style={{ marginRight: 4 }}
              />
              <Text 
                className={activeTab === 'store' ? 'text-indigo-600 font-medium' : 'text-gray-600'}
              >
                Store
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Exchange sub-tabs */}
          {activeTab === 'exchange' && (
            <View className="flex-row bg-gray-100 rounded-lg p-1">
              <TouchableOpacity 
                className={`flex-1 py-2 rounded-md flex-row justify-center items-center ${
                  exchangeSubTab === 'available' ? 'bg-white shadow' : ''
                }`}
                onPress={() => setExchangeSubTab('available')}
              >
                <Ionicons 
                  name="cart-outline" 
                  size={16} 
                  color={exchangeSubTab === 'available' ? '#6366f1' : '#6b7280'}
                  style={{ marginRight: 4 }}
                />
                <Text 
                  className={exchangeSubTab === 'available' ? 'text-indigo-600 font-medium' : 'text-gray-600'}
                >
                  Available
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`flex-1 py-2 rounded-md flex-row justify-center items-center ${
                  exchangeSubTab === 'needed' ? 'bg-white shadow' : ''
                }`}
                onPress={() => setExchangeSubTab('needed')}
              >
                <Ionicons 
                  name="hand-left-outline" 
                  size={16} 
                  color={exchangeSubTab === 'needed' ? '#6366f1' : '#6b7280'}
                  style={{ marginRight: 4 }}
                />
                <Text 
                  className={exchangeSubTab === 'needed' ? 'text-indigo-600 font-medium' : 'text-gray-600'}
                >
                  Needed
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        {/* Main content based on active tab */}
        {activeTab === 'exchange' ? renderExchangeContent() : renderStoreContent()}

        {/* Floating action button */}
        <TouchableOpacity
          className="absolute bottom-4 right-4 bg-indigo-600 w-14 h-14 rounded-full items-center justify-center shadow-md"
          onPress={() => {
            if (activeTab === 'exchange') {
              if (exchangeSubTab === 'available') {
                // Navigate to create listing
                navigation.navigate('CreateListing');
              } else {
                // Navigate to post needed item
                navigation.navigate('PostNeededItem');
              }
            } else {
              // Navigate to shopping cart
              navigation.navigate('ShoppingCart');
            }
          }}
        >
          <Ionicons
            name={
              activeTab === 'exchange'
                ? (exchangeSubTab === 'available' ? 'add' : 'hand-left')
                : 'cart'
            }
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </SafeLayout>
  );
};

export default MarketplaceScreen; 