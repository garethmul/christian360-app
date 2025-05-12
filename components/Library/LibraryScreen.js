import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  FlatList, 
  Image,
  TextInput,
  RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SafeLayout from '../ui/SafeLayout';

const LibraryScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('bible');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate data refreshing
    setTimeout(() => setRefreshing(false), 1500);
  };

  // Bible translations data
  const bibleTranslations = [
    {
      id: 'kjv',
      name: 'King James Version',
      abbr: 'KJV',
      year: '1611',
      publisher: 'Cambridge University Press',
      image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=300&q=80',
      description: 'The King James Version (KJV), also known as the Authorized Version, is an English translation of the Bible commissioned by James VI and I in 1604 and published in 1611.',
      downloaded: true,
      lastRead: new Date(2023, 5, 15)
    },
    {
      id: 'niv',
      name: 'New International Version',
      abbr: 'NIV',
      year: '1978',
      publisher: 'Biblica',
      image: 'https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&w=300&q=80',
      description: 'The New International Version (NIV) is an English translation of the Bible that was first published in 1978. The NIV was created to produce a modern, readable translation that was faithful to the original texts.',
      downloaded: true,
      lastRead: new Date(2023, 6, 1)
    },
    {
      id: 'esv',
      name: 'English Standard Version',
      abbr: 'ESV',
      year: '2001',
      publisher: 'Crossway',
      image: 'https://images.unsplash.com/photo-1576670162369-669fd5aeaa70?auto=format&fit=crop&w=300&q=80',
      description: 'The English Standard Version (ESV) is an English translation of the Bible that was published in 2001. It was created to be a readable, literal translation of the Bible that captures the meaning of the original texts.',
      downloaded: false,
      lastRead: null
    },
    {
      id: 'nlt',
      name: 'New Living Translation',
      abbr: 'NLT',
      year: '1996',
      publisher: 'Tyndale House',
      image: 'https://images.unsplash.com/photo-1506355683710-bd071c0a5828?auto=format&fit=crop&w=300&q=80',
      description: 'The New Living Translation (NLT) is an English translation of the Bible that was first published in 1996. It uses dynamic equivalence to translate the original texts into modern English.',
      downloaded: true,
      lastRead: new Date(2023, 4, 20)
    }
  ];

  // User library content data
  const libraryContent = [
    {
      id: 'book1',
      title: 'Purpose Driven Life',
      author: 'Rick Warren',
      type: 'book',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80',
      purchaseDate: new Date(2023, 2, 15),
      progress: 0.65,
      lastOpened: new Date(2023, 6, 5)
    },
    {
      id: 'book2',
      title: 'Mere Christianity',
      author: 'C.S. Lewis',
      type: 'book',
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&q=80',
      purchaseDate: new Date(2023, 1, 10),
      progress: 1.0,
      lastOpened: new Date(2023, 3, 20)
    },
    {
      id: 'course1',
      title: 'Spiritual Leadership',
      author: 'Dallas Theological Seminary',
      type: 'course',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=300&q=80',
      purchaseDate: new Date(2023, 4, 5),
      progress: 0.3,
      lastOpened: new Date(2023, 6, 10)
    },
    {
      id: 'music1',
      title: 'Elevation Worship Collection',
      author: 'Elevation Worship',
      type: 'music',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80',
      purchaseDate: new Date(2023, 3, 25),
      progress: null,
      lastOpened: new Date(2023, 5, 30)
    },
    {
      id: 'devotional1',
      title: 'Morning and Evening',
      author: 'Charles Spurgeon',
      type: 'devotional',
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=300&q=80',
      purchaseDate: new Date(2023, 0, 5),
      progress: null,
      lastOpened: new Date(2023, 6, 12)
    }
  ];

  // Recent Reading Data
  const recentReading = [
    {
      id: 'recent1',
      title: 'Psalm 23',
      reference: 'Psalm 23:1-6',
      version: 'NIV',
      date: new Date(2023, 6, 12)
    },
    {
      id: 'recent2',
      title: 'The Beatitudes',
      reference: 'Matthew 5:1-12',
      version: 'KJV',
      date: new Date(2023, 6, 10)
    },
    {
      id: 'recent3',
      title: 'Fruit of the Spirit',
      reference: 'Galatians 5:22-23',
      version: 'NLT',
      date: new Date(2023, 6, 8)
    }
  ];

  // Format date to relative time
  const formatRelativeDate = (date) => {
    if (!date) return '';
    
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  // Get icon for library content type
  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'book': return 'book-outline';
      case 'course': return 'school-outline';
      case 'music': return 'musical-notes-outline';
      case 'devotional': return 'heart-outline';
      default: return 'document-text-outline';
    }
  };

  // Get color for library content type
  const getContentTypeColor = (type) => {
    switch (type) {
      case 'book': return '#3b82f6'; // blue
      case 'course': return '#f59e0b'; // amber
      case 'music': return '#8b5cf6'; // purple
      case 'devotional': return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  };

  // Bible translation card
  const BibleTranslationCard = ({ item }) => (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm overflow-hidden mb-4"
      onPress={() => {/* Navigate to Bible reader */}}
    >
      <View className="flex-row">
        <Image 
          source={{ uri: item.image }}
          className="w-24 h-full"
          resizeMode="cover"
        />
        <View className="p-3 flex-1">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-2">
              <Text className="font-bold text-lg">{item.name}</Text>
              <Text className="text-gray-600">{item.abbr} · {item.year}</Text>
            </View>
            {item.downloaded && (
              <Ionicons name="cloud-done-outline" size={20} color="#22c55e" />
            )}
          </View>
          
          <Text className="text-gray-700 text-sm mt-1" numberOfLines={2}>
            {item.description}
          </Text>
          
          <View className="flex-row justify-between mt-2 items-center">
            <Text className="text-gray-500 text-xs">
              {item.lastRead ? `Last read ${formatRelativeDate(item.lastRead)}` : 'Not read yet'}
            </Text>
            <TouchableOpacity 
              className={`px-3 py-1 rounded-full ${item.downloaded ? 'bg-gray-100' : 'bg-indigo-100'}`}
            >
              <Text className={`text-xs font-medium ${item.downloaded ? 'text-gray-700' : 'text-indigo-700'}`}>
                {item.downloaded ? 'Read' : 'Download'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Library content card
  const LibraryContentCard = ({ item }) => (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm overflow-hidden mb-4 mr-3"
      style={{ width: 160 }}
      onPress={() => {/* Navigate to content */}}
    >
      <Image 
        source={{ uri: item.image }}
        className="w-full h-96"
        resizeMode="cover"
        style={{ height: 160 }}
      />
      {item.progress !== null && (
        <View className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <View 
            className="h-full bg-indigo-600" 
            style={{ width: `${item.progress * 100}%` }} 
          />
        </View>
      )}
      <View className="p-2">
        <View className="flex-row items-center mb-1">
          <Ionicons 
            name={getContentTypeIcon(item.type)} 
            size={14} 
            color={getContentTypeColor(item.type)} 
          />
          <Text className="text-xs text-gray-600 ml-1 capitalize">
            {item.type}
          </Text>
        </View>
        <Text className="font-bold" numberOfLines={1}>{item.title}</Text>
        <Text className="text-gray-600 text-xs" numberOfLines={1}>
          {item.author}
        </Text>
        <Text className="text-gray-500 text-xs mt-1">
          Last opened {formatRelativeDate(item.lastOpened)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Recent Reading Item
  const RecentReadingItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-indigo-50 rounded-lg p-3 mr-3"
      style={{ width: 200 }}
      onPress={() => {/* Navigate to passage */}}
    >
      <View className="flex-row justify-between mb-1">
        <Text className="font-bold text-indigo-900">{item.title}</Text>
        <View className="bg-indigo-100 rounded-md px-2">
          <Text className="text-xs text-indigo-800 font-medium">{item.version}</Text>
        </View>
      </View>
      <Text className="text-indigo-700">{item.reference}</Text>
      <Text className="text-indigo-600 text-xs mt-2">
        Read {formatRelativeDate(item.date)}
      </Text>
    </TouchableOpacity>
  );

  // Recent Reading Section
  const RecentReadingSection = () => (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-3 px-4">
        <Text className="text-lg font-bold">Recently Read</Text>
        <TouchableOpacity>
          <Text className="text-indigo-600">See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
      >
        {recentReading.map(item => (
          <RecentReadingItem key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );

  // Library Content Section
  const LibraryContentSection = () => (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-3 px-4">
        <Text className="text-lg font-bold">My Library</Text>
        <TouchableOpacity>
          <Text className="text-indigo-600">See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
      >
        {libraryContent.map(item => (
          <LibraryContentCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );

  // Bible Tab Content
  const renderBibleContent = () => (
    <FlatList
      data={bibleTranslations}
      renderItem={({ item }) => <BibleTranslationCard item={item} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <>
          <RecentReadingSection />
          
          <View className="bg-white rounded-lg shadow-sm p-4 mx-4 mb-4">
            <Text className="font-bold text-lg mb-2">Daily Verse</Text>
            <Text className="text-gray-800 mb-2 italic">
              "For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."
            </Text>
            <Text className="text-gray-600 text-right">Jeremiah 29:11 (NIV)</Text>
          </View>
        </>
      }
      contentContainerStyle={{ padding: 16, paddingTop: 8 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );

  // Library Tab Content
  const renderLibraryContent = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <LibraryContentSection />
      
      <View className="mb-6 px-4">
        <Text className="text-lg font-bold mb-3">Categories</Text>
        <View className="flex-row flex-wrap">
          {['Books', 'Courses', 'Music', 'Devotionals', 'Sermons', 'Podcasts'].map((category, index) => (
            <TouchableOpacity 
              key={index}
              className="bg-white rounded-lg px-4 py-3 mr-2 mb-2 shadow-sm"
            >
              <Text>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View className="mb-6 px-4">
        <Text className="text-lg font-bold mb-3">Recently Purchased</Text>
        {libraryContent
          .sort((a, b) => b.purchaseDate - a.purchaseDate)
          .slice(0, 3)
          .map(item => (
            <TouchableOpacity 
              key={item.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden mb-3 flex-row"
              onPress={() => {/* Navigate to content */}}
            >
              <Image 
                source={{ uri: item.image }}
                className="w-16 h-16"
                resizeMode="cover"
              />
              <View className="p-2 flex-1">
                <Text className="font-bold" numberOfLines={1}>{item.title}</Text>
                <Text className="text-gray-600 text-xs">{item.author}</Text>
                <View className="flex-row items-center mt-1">
                  <Ionicons 
                    name={getContentTypeIcon(item.type)} 
                    size={12} 
                    color={getContentTypeColor(item.type)} 
                  />
                  <Text className="text-xs text-gray-500 ml-1 capitalize mr-2">
                    {item.type}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    Purchased {formatRelativeDate(item.purchaseDate)}
                  </Text>
                </View>
              </View>
              <View className="p-2 justify-center">
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
    </ScrollView>
  );

  return (
    <SafeLayout>
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="bg-white px-4 pt-4 pb-2 shadow-sm">
          <Text className="text-2xl font-bold text-gray-800 mb-4">My Library</Text>
          
          {/* Search bar */}
          <View className="bg-gray-100 rounded-lg flex-row items-center px-3 py-2 mb-4">
            <Ionicons name="search" size={18} color="#9ca3af" />
            <TextInput
              className="flex-1 ml-2 text-base text-gray-800"
              placeholder="Search Bible, books, courses..."
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
          <View className="flex-row bg-gray-100 rounded-lg p-1">
            <TouchableOpacity 
              className={`flex-1 py-2 rounded-md flex-row justify-center items-center ${
                activeTab === 'bible' ? 'bg-white shadow' : ''
              }`}
              onPress={() => setActiveTab('bible')}
            >
              <MaterialCommunityIcons 
                name="bible" 
                size={16} 
                color={activeTab === 'bible' ? '#6366f1' : '#6b7280'}
                style={{ marginRight: 4 }}
              />
              <Text 
                className={activeTab === 'bible' ? 'text-indigo-600 font-medium' : 'text-gray-600'}
              >
                Bible
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`flex-1 py-2 rounded-md flex-row justify-center items-center ${
                activeTab === 'library' ? 'bg-white shadow' : ''
              }`}
              onPress={() => setActiveTab('library')}
            >
              <Ionicons 
                name="library" 
                size={16} 
                color={activeTab === 'library' ? '#6366f1' : '#6b7280'}
                style={{ marginRight: 4 }}
              />
              <Text 
                className={activeTab === 'library' ? 'text-indigo-600 font-medium' : 'text-gray-600'}
              >
                My Content
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Main content based on active tab */}
        {activeTab === 'bible' ? renderBibleContent() : renderLibraryContent()}
      </View>
    </SafeLayout>
  );
};

export default LibraryScreen; 