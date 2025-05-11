import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SafeLayout from '../ui/SafeLayout';

// Sample data for partner organizations
const partnerOrganizations = [
  {
    id: '1',
    name: 'Compassion International',
    type: 'Child Sponsorship Ministry',
    tagline: "Releasing children from poverty in Jesus' name",
    banner: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hpbGRyZW4lMjBhZnJpY2F8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/Compassion_International_Logo.svg/320px-Compassion_International_Logo.svg.png',
    followers: '2.3M',
    location: 'Colorado Springs, CO',
    about: 'Compassion International is a child-sponsorship organization that aims to release children from economic, physical, social, and spiritual poverty.',
  },
  {
    id: '2',
    name: 'Living Water International',
    type: 'Clean Water Initiatives',
    tagline: "Providing clean water and living water",
    banner: 'https://images.unsplash.com/photo-1526485856375-9110812fbf35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    logo: 'https://i.imgur.com/nTX7HQ1.png',
    followers: '1.2M',
    location: 'Stafford, TX',
    about: 'Providing access to clean water and spreading the gospel to communities in need around the world.',
  },
  {
    id: '3',
    name: 'Habitat for Humanity',
    type: 'Housing Ministry',
    tagline: "Building homes, communities and hope",
    banner: 'https://images.unsplash.com/photo-1591588582259-e675bd2e6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Habitat_for_Humanity_logo.svg/320px-Habitat_for_Humanity_logo.svg.png',
    followers: '3.4M',
    location: 'Atlanta, GA',
    about: 'Building strength, stability and self-reliance through shelter with a Christian foundation.',
  },
  {
    id: '4',
    name: 'Hobby Lobby',
    type: 'Arts and Crafts Retailer',
    tagline: "Making creativity and home décor accessible",
    banner: 'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Hobby_Lobby_store_logo.png/220px-Hobby_Lobby_store_logo.png',
    followers: '2.2M',
    location: 'Oklahoma City, OK',
    about: 'A Christian-owned arts and crafts retailer committed to honouring the Lord through operation that is consistent with Biblical principles.',
  },
  {
    id: '5',
    name: 'Chick-fil-A',
    type: 'Restaurant Chain',
    tagline: "Food with a purpose",
    banner: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Chick-fil-A_Logo.svg/220px-Chick-fil-A_Logo.svg.png',
    followers: '5.1M',
    location: 'Atlanta, GA',
    about: 'A family-owned restaurant chain known for its original chicken sandwich and Christian values, including being closed on Sundays.',
  },
];

const OrganizationCard = ({ organization }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <View className="bg-white rounded-lg overflow-hidden mb-4 shadow-sm">
      {/* Banner image */}
      <Image 
        source={{ uri: organization.banner }} 
        className="w-full h-32"
        resizeMode="cover"
      />
      
      {/* Logo and basic info */}
      <View className="px-4 pt-5 pb-4">
        <View className="flex-row items-start mt-[-55]">
          {/* Logo with fallback */}
          {logoError ? (
            <View className="w-20 h-20 rounded-lg border-2 border-white bg-indigo-100 items-center justify-center">
              <Text className="font-bold text-indigo-500 text-lg">
                {organization.name.charAt(0)}
              </Text>
            </View>
          ) : (
          <Image 
            source={{ uri: organization.logo }} 
            className="w-20 h-20 rounded-lg border-2 border-white bg-white"
            resizeMode="contain"
            onError={() => setLogoError(true)}
          />
          )}
          
          <View className="flex-1 ml-3 mt-8">
            <Text className="text-lg font-bold">{organization.name}</Text>
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
            onPress={() => setIsFollowing(!isFollowing)}
          >
            <Text className={`font-semibold ${isFollowing ? 'text-indigo-600' : 'text-white'}`}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 rounded-full py-2 bg-white border border-gray-300 items-center ml-2"
          >
            <Text className="font-semibold text-gray-700">Visit Website</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const PartnerOrganizationsScreen = () => {
  const renderHeader = () => (
    <View className="mb-4">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-2xl font-bold">Partner Organizations</Text>
        <TouchableOpacity className="p-2">
          <Ionicons name="search-outline" size={24} color="#4b5563" />
        </TouchableOpacity>
      </View>
      <Text className="text-gray-600 mb-4">Connect with Christian ministries and organizations in our network.</Text>
    </View>
  );

  return (
    <SafeLayout backgroundColor="#f9fafb">
      <FlatList
        data={partnerOrganizations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <OrganizationCard organization={item} />}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeLayout>
  );
};

export default PartnerOrganizationsScreen; 