import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import SafeLayout from '../ui/SafeLayout';
import { groupsByOrganization, organizations } from '../../data/sampleData'; // Adjust path as needed
import Ionicons from 'react-native-vector-icons/Ionicons';

const GroupCard = ({ group, onPress }) => (
  <TouchableOpacity 
    className="bg-white rounded-lg shadow-md overflow-hidden mb-4 p-4 flex-row items-center"
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Image 
      source={{ uri: group.coverImage || 'https://via.placeholder.com/100' }} 
      className="w-20 h-20 rounded-lg mr-4 bg-gray-200"
      resizeMode="cover"
    />
    <View className="flex-1">
      <Text className="text-lg font-bold text-gray-800 mb-1">{group.name}</Text>
      <Text className="text-sm text-gray-600 mb-1" numberOfLines={2}>{group.description}</Text>
      <View className="flex-row items-center mt-1">
        <Ionicons name="people-outline" size={14} color="#6b7280" />
        <Text className="text-xs text-gray-500 ml-1">{group.membersCount} members</Text>
      </View>
    </View>
    <Ionicons name="chevron-forward-outline" size={22} color="#9ca3af" />
  </TouchableOpacity>
);

const GroupListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Safely access organizationId
  const organizationId = route.params?.organizationId;

  // It's also good practice to get organizationName for the title, 
  // though the error is specifically about organizationId
  const organizationName = route.params?.organizationName;

  // Find the organization; if organizationId is undefined, this will also be undefined
  const organization = organizationId ? organizations.find(org => org.id === organizationId) : undefined;
  const orgGroups = organizationId ? (groupsByOrganization[organizationId] || []) : [];

  const handleGroupPress = (group) => {
    navigation.navigate('GroupDetail', { 
      groupId: group.id, 
      // Ensure organization.id is valid before passing, though if org is undefined, we have bigger issues
      organizationId: organization?.id, 
      groupName: group.name
    });
  };

  if (!organizationId || !organization) { // Check both organizationId and the resolved organization object
    return (
      <SafeLayout>
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-lg text-red-500">Organization data not available.</Text>
          {/* For debugging: <Text>Params: {JSON.stringify(route.params)}</Text> */}
        </View>
      </SafeLayout>
    );
  }

  return (
    <SafeLayout>
      <View className="p-4 flex-1">
        <Text className="text-2xl font-bold mb-1 text-gray-800">Groups at</Text>
        {/* Use organizationName if available, fallback to organization.name */}
        <Text className="text-xl font-semibold mb-5 text-indigo-600">{organizationName || organization.name}</Text>
        
        {orgGroups.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Ionicons name="cube-outline" size={48} color="#d1d5db" />
            <Text className="text-lg text-gray-500 mt-4">No groups found for this organization yet.</Text>
          </View>
        ) : (
          <FlatList
            data={orgGroups}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <GroupCard group={item} onPress={() => handleGroupPress(item)} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeLayout>
  );
};

export default GroupListScreen; 