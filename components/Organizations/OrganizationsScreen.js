import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SafeLayout from '../ui/SafeLayout';

// Sample data for organizations
const organizations = [
  {
    id: '1',
    name: 'Compassion International',
    type: 'Nonprofit Organization',
    tagline: "Releasing children from poverty in Jesus' name",
    banner: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hpbGRyZW4lMjBhZnJpY2F8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/Compassion_International_Logo.svg/320px-Compassion_International_Logo.svg.png',
    followers: '2.3M',
    location: 'Colorado Springs, CO',
    about: 'Compassion International is a child-sponsorship organization that aims to release children from economic, physical, social, and spiritual poverty.',
    category: 'Charity'
  },
  {
    id: '2',
    name: 'Elevation Church',
    type: 'Religious Organization',
    tagline: 'Worship, community, and life transformation',
    banner: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxldmF0ZWR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Elevation_Church_Logo.png/220px-Elevation_Church_Logo.png',
    followers: '1.7M',
    location: 'Charlotte, NC',
    about: 'Elevation Church is a multi-site church pastored by Steven Furtick, with locations across the US and growing global reach through online services.',
    category: 'Church'
  },
  {
    id: '3',
    name: 'Chick-fil-A',
    type: 'Restaurant',
    tagline: 'Food with a purpose',
    banner: 'https://images.unsplash.com/photo-1606149059549-db8ac4b4114c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpY2slMjBmaWwlMjBhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Chick-fil-A_Logo.svg/220px-Chick-fil-A_Logo.svg.png',
    followers: '5.1M',
    location: 'Atlanta, GA',
    about: 'Chick-fil-A is a family-owned and privately held restaurant company founded in 1967 by S. Truett Cathy, known for their Christian values and closed-on-Sunday policy.',
    category: 'Business'
  },
  {
    id: '4',
    name: 'World Vision',
    type: 'Nonprofit Organization',
    tagline: 'Building a better world for children',
    banner: 'https://images.unsplash.com/photo-1537655780520-1e392ead81f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29ybGQlMjB2aXNpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/World_Vision_logo.svg/220px-World_Vision_logo.svg.png',
    followers: '3.4M',
    location: 'Federal Way, WA',
    about: 'World Vision is a Christian humanitarian organization dedicated to working with children, families, and their communities to tackle the causes of poverty and injustice.',
    category: 'Charity'
  },
  {
    id: '5',
    name: 'Hillsong Church',
    type: 'Religious Organization',
    tagline: 'Welcome home',
    banner: 'https://images.unsplash.com/photo-1574169207511-e21a21c8075a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d29yc2hpcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Hillsong_Church_logo.svg/220px-Hillsong_Church_logo.svg.png',
    followers: '4.8M',
    location: 'Sydney, Australia',
    about: 'Hillsong Church is a charismatic Christian megachurch and global movement founded by Brian Houston and his wife Bobbie in 1983, known for their worship music.',
    category: 'Church'
  },
  {
    id: '6',
    name: 'Hobby Lobby',
    type: 'Retail Company',
    tagline: 'Making creativity and home décor accessible',
    banner: 'https://images.unsplash.com/photo-1583172037821-08dabf48f44f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG9iYnl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Hobby_Lobby_store_logo.png/220px-Hobby_Lobby_store_logo.png',
    followers: '2.2M',
    location: 'Oklahoma City, OK',
    about: 'Hobby Lobby is an American retail chain of arts and crafts stores founded by David Green that has been known for their Christian ownership and values.',
    category: 'Business'
  },
];

// Filter categories for the organization list
const categories = [
  { id: 'all', name: 'All' },
  { id: 'charity', name: 'Charities' },
  { id: 'church', name: 'Churches' },
  { id: 'business', name: 'Businesses' },
];

const OrganizationCard = ({ organization, onPress }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <TouchableOpacity 
      className="bg-white rounded-lg overflow-hidden mb-4 shadow-sm"
      activeOpacity={0.7}
      onPress={onPress}
    >
      {/* Banner image */}
      <Image 
        source={{ uri: organization.banner }} 
        className="w-full h-32"
        resizeMode="cover"
      />
      
      {/* Logo and basic info */}
      <View className="px-4 pt-0 pb-4">
        <View className="flex-row items-end mt-[-40]">
          <Image 
            source={{ uri: organization.logo }} 
            className="w-20 h-20 rounded-lg border-2 border-white bg-white"
            resizeMode="contain"
          />
          <View className="flex-1 ml-3 mb-1">
            <Text className="text-lg font-bold mt-2">{organization.name}</Text>
            <Text className="text-gray-600 text-sm">{organization.type}</Text>
          </View>
        </View>
        
        {/* Tagline */}
        <Text className="text-gray-800 mt-2">{organization.tagline}</Text>
        
        {/* Location and followers */}
        <View className="flex-row items-center mt-2">
          <Ionicons name="location-outline" size={14} color="#6b7280" />
          <Text className="text-gray-500 text-sm ml-1">{organization.location}</Text>
          <Text className="text-gray-500 text-sm mx-2">•</Text>
          <Ionicons name="people-outline" size={14} color="#6b7280" />
          <Text className="text-gray-500 text-sm ml-1">{organization.followers} followers</Text>
        </View>
        
        {/* About text (truncated) */}
        <Text className="text-gray-700 my-3 text-sm" numberOfLines={2}>
          {organization.about}
        </Text>
        
        {/* Action buttons */}
        <View className="flex-row mt-2">
          <TouchableOpacity 
            className={`flex-1 rounded-full py-2 mr-2 items-center ${isFollowing ? 'bg-white border border-indigo-600' : 'bg-indigo-600'}`}
            onPress={(e) => {
              e.stopPropagation(); // Prevent triggering the card press
              setIsFollowing(!isFollowing);
            }}
          >
            <Text className={`font-semibold ${isFollowing ? 'text-indigo-600' : 'text-white'}`}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 rounded-full py-2 bg-white border border-gray-300 items-center ml-2"
            onPress={(e) => {
              e.stopPropagation(); // Prevent triggering the card press
              onPress();
            }}
          >
            <Text className="font-semibold text-gray-700">View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FilterButton = ({ isSelected, label, onPress }) => (
  <TouchableOpacity 
    className={`px-4 py-2 rounded-full mr-2 ${isSelected ? 'bg-indigo-600' : 'bg-gray-200'}`}
    onPress={onPress}
  >
    <Text className={`font-medium ${isSelected ? 'text-white' : 'text-gray-700'}`}>{label}</Text>
  </TouchableOpacity>
);

const OrganizationsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigation = useNavigation();
  
  const filteredOrganizations = organizations.filter(org => 
    selectedCategory === 'all' || org.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  const handleOrganizationPress = (organization) => {
    navigation.navigate('OrganizationDetail', { organization });
  };

  return (
    <SafeLayout backgroundColor="#f9fafb">
      <View className="px-4 pt-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold">Organizations</Text>
          <TouchableOpacity className="p-2">
            <Ionicons name="search-outline" size={24} color="#4b5563" />
          </TouchableOpacity>
        </View>
        
        {/* Filter row */}
        <ScrollableFilters 
          categories={categories} 
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
        
        {/* Organizations list */}
        <FlatList
          data={filteredOrganizations}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <OrganizationCard 
              organization={item} 
              onPress={() => handleOrganizationPress(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 20 }} />}
          scrollEnabled={false} // Disable scroll since we're using SafeLayout's ScrollView
        />
      </View>
    </SafeLayout>
  );
};

const ScrollableFilters = ({ categories, selectedCategory, onSelect }) => {
  return (
    <View className="flex-row mb-4">
      {categories.map(category => (
        <FilterButton 
          key={category.id}
          label={category.name}
          isSelected={selectedCategory === category.id}
          onPress={() => onSelect(category.id)}
        />
      ))}
    </View>
  );
};

export default OrganizationsScreen; 