import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SafeLayout from '../ui/SafeLayout';

// Sample organization website links and additional info
const organizationDetails = {
  '1': {
    website: 'https://www.compassion.com',
    founded: '1952',
    employees: '1,000-5,000',
    description: `Compassion International is a Christian humanitarian aid child sponsorship organization dedicated to the long-term development of children living in poverty around the world. Compassion International, headquartered in Colorado Springs, Colorado, functions in 25 countries such as Bolivia, Colombia, Mexico, Haiti, and Kenya. The organization provides aid to more than 2 million babies, children, and young adults.

Compassion's main program is child sponsorship, in which a child in need is connected with a sponsor who provides financial support on a monthly basis. Through Compassion's program centers, children receive educational, health, social, and spiritual support. Each sponsored child is linked to one sponsor, who receives updates on the child's development through letters and photos.

Compassion delivers its holistic child development model through local churches. Programs include early childhood development for infants and their caregivers, sponsorship programs for school-aged children, and leadership development for qualifying young adults.`
  },
  '2': {
    website: 'https://elevationchurch.org',
    founded: '2006',
    employees: '100-500',
    description: `Elevation Church is a multi-site church led by Pastor Steven Furtick, headquartered in Charlotte, North Carolina. As of 2022, Elevation Church has 20 locations, with the majority in and around the Charlotte area.

Elevation Church's services consist of worship and a sermon. The church holds weekend worship services at its different locations. The church also offers eGroups, which are small groups that meet throughout the week. These groups focus on building community, Bible study, and serving others.

Elevation Church is known for its worship ministry, Elevation Worship, which has produced numerous popular worship songs that are sung in churches around the world. The church has been recognized for its growth, innovative approach to ministry, and technological integration.`
  },
  '3': {
    website: 'https://www.chick-fil-a.com',
    founded: '1946',
    employees: '10,000+',
    description: `Chick-fil-A is an American fast food restaurant chain founded by S. Truett Cathy, headquartered in College Park, Georgia, and specializing in chicken sandwiches. The company is known for its distinctive corporate culture based on Christian values.

Chick-fil-A's business model includes being closed on Sundays, as well as Christian music being played in restaurants. The company's mission statement is "To glorify God by being a faithful steward of all that is entrusted to us and to have a positive influence on all who come into contact with Chick-fil-A."

The company is known for its customer service, quality food, and commitment to community service. Chick-fil-A restaurants are individually owned and operated by independent Owner-Operators who typically invest time in recruiting and training team members with a focus on creating a positive working environment.`
  }
};

const OrganizationDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { organization } = route.params;
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Get additional details for this organization
  const details = organizationDetails[organization.id] || {
    website: '#',
    founded: 'N/A',
    employees: 'N/A',
    description: 'No detailed description available.'
  };

  const handleWebsitePress = () => {
    Linking.openURL(details.website);
  };

  return (
    <SafeLayout backgroundColor="#f9fafb">
      <View className="flex-1">
        {/* Banner and Logo */}
        <View className="relative">
          <Image 
            source={{ uri: organization.banner }} 
            className="w-full h-48"
            resizeMode="cover"
          />
          <View className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
        </View>
        
        <View className="px-4">
          {/* Logo and basic info */}
          <View className="flex-row items-end mt-[-50]">
            <Image 
              source={{ uri: organization.logo }} 
              className="w-24 h-24 rounded-lg border-2 border-white bg-white"
              resizeMode="contain"
            />
            <View className="flex-1 ml-3">
              <Text className="text-2xl font-bold mt-3">{organization.name}</Text>
              <Text className="text-gray-600">{organization.type}</Text>
            </View>
          </View>
          
          {/* Stats row */}
          <View className="flex-row mt-4 mb-4">
            <View className="flex-1 border-r border-gray-200">
              <Text className="text-center font-bold text-indigo-600">{organization.followers}</Text>
              <Text className="text-center text-gray-600 text-sm">Followers</Text>
            </View>
            <View className="flex-1 border-r border-gray-200">
              <Text className="text-center font-bold text-indigo-600">{details.founded}</Text>
              <Text className="text-center text-gray-600 text-sm">Founded</Text>
            </View>
            <View className="flex-1">
              <Text className="text-center font-bold text-indigo-600">{details.employees}</Text>
              <Text className="text-center text-gray-600 text-sm">Employees</Text>
            </View>
          </View>
          
          {/* Action buttons */}
          <View className="flex-row mt-2 mb-6">
            <TouchableOpacity 
              className={`flex-1 py-2 mr-2 rounded-full items-center ${isFollowing ? 'bg-white border border-indigo-600' : 'bg-indigo-600'}`}
              onPress={() => setIsFollowing(!isFollowing)}
            >
              <Text className={`font-semibold ${isFollowing ? 'text-indigo-600' : 'text-white'}`}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="flex-1 py-2 ml-2 rounded-full bg-white border border-gray-300 items-center"
              onPress={handleWebsitePress}
            >
              <Text className="font-semibold text-gray-700">Visit Website</Text>
            </TouchableOpacity>
          </View>
          
          {/* About section */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-2">About</Text>
            <Text className="text-gray-700 leading-6">{details.description}</Text>
          </View>
          
          {/* Location section */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-2">Location</Text>
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={18} color="#6b7280" />
              <Text className="text-gray-700 ml-2">{organization.location}</Text>
            </View>
          </View>
          
          {/* Contact section */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-2">Contact</Text>
            <TouchableOpacity className="flex-row items-center" onPress={handleWebsitePress}>
              <Ionicons name="globe-outline" size={18} color="#6b7280" />
              <Text className="text-indigo-600 ml-2 underline">{details.website}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeLayout>
  );
};

export default OrganizationDetailScreen; 