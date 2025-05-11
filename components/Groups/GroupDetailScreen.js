import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import SafeLayout from '../ui/SafeLayout';
import { groupsByOrganization, organizations } from '../../data/sampleData'; // Adjust path as needed
import Ionicons from 'react-native-vector-icons/Ionicons';

// Helper to format date/time for posts
const formatTimestamp = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString(); // Simple locale string, can be made more sophisticated
};

// Component for displaying a single group post
const GroupPostCard = ({ post }) => (
  <View className="bg-gray-50 p-3 rounded-lg mb-3 border border-gray-200">
    <Text className="text-sm text-gray-800 mb-1">{post.text}</Text>
    <Text className="text-xs text-gray-500">Posted by {post.userId} • {formatTimestamp(post.timestamp)}</Text>
  </View>
);

// Component for displaying a digital content item
const DigitalContentItem = ({ item }) => (
  <TouchableOpacity className="bg-indigo-50 p-3 rounded-lg mb-2 flex-row items-center justify-between">
    <View className="flex-row items-center flex-1">
      <Ionicons 
        name={item.type === 'PDF' ? 'document-text-outline' : 'videocam-outline'} 
        size={20} 
        color="#4f46e5" 
      />
      <Text className="text-sm text-indigo-700 ml-2 flex-1" numberOfLines={1}>{item.title}</Text>
    </View>
    <Ionicons name="arrow-down-circle-outline" size={22} color="#6366f1" />
  </TouchableOpacity>
);

// Section Component for Group Detail
const GroupSection = ({ title, iconName, children }) => (
  <View className="bg-white rounded-lg shadow p-4 mb-5">
    <View className="flex-row items-center mb-3">
      <Ionicons name={iconName} size={22} color="#374151" />
      <Text className="text-lg font-semibold text-gray-800 ml-2">{title}</Text>
    </View>
    {children}
  </View>
);

const GroupDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { groupId, organizationId } = route.params;

  const organizationGroups = groupsByOrganization[organizationId] || [];
  const group = organizationGroups.find(g => g.id === groupId);
  const organization = organizations.find(org => org.id === organizationId);

  if (!group || !organization) {
    return (
      <SafeLayout>
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-lg text-red-500">Group or Organization not found.</Text>
        </View>
      </SafeLayout>
    );
  }

  return (
    <SafeLayout>
      <ScrollView className="flex-1">
        {/* Group Header */}
        <View className="relative mb-4">
          <Image 
            source={{ uri: group.coverImage || 'https://via.placeholder.com/400x200' }} 
            className="w-full h-48 bg-gray-300"
            resizeMode="cover"
          />
          <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/50">
            <Text className="text-2xl font-bold text-white">{group.name}</Text>
            <Text className="text-sm text-gray-200">Part of {organization.name}</Text>
          </View>
        </View>

        <View className="px-4">
          {/* Description & Members */}
          <View className="bg-white rounded-lg shadow p-4 mb-5">
            <Text className="text-gray-700 leading-relaxed mb-3">{group.description}</Text>
            <View className="flex-row items-center">
              <Ionicons name="people-outline" size={16} color="#4b5563" />
              <Text className="text-gray-600 ml-1.5">{group.membersCount} members</Text>
            </View>
          </View>

          {/* Discussion Section */}
          <GroupSection title="Group Discussion" iconName="chatbubbles-outline">
            <Text className="text-gray-600 italic mb-2">Join the conversation in our Slack-like group chat with channels, threads, and reactions.</Text>
            <TouchableOpacity 
              className="bg-indigo-500 py-2 px-4 rounded-lg self-start"
              onPress={() => navigation.navigate('GroupDiscussion', { 
                groupId: group.id, 
                organizationId: organization.id,
                groupName: group.name
              })}
            >
              <Text className="text-white font-semibold">Open Chat</Text>
            </TouchableOpacity>
          </GroupSection>

          {/* Admin Posts Section */}
          <GroupSection title="Admin Posts" iconName="megaphone-outline">
            {group.posts && group.posts.length > 0 ? (
              <FlatList
                data={group.posts.filter(p => group.adminIds.includes(p.userId)).slice(0, 3)} // Show recent 3 admin posts
                keyExtractor={item => item.id}
                renderItem={({ item }) => <GroupPostCard post={item} />}
                scrollEnabled={false} // Contained within ScrollView
                ListEmptyComponent={<Text className="text-gray-500 italic">No admin posts yet.</Text>}
              />
            ) : (
              <Text className="text-gray-500 italic">No admin posts available.</Text>
            )}
            {group.posts && group.posts.filter(p => group.adminIds.includes(p.userId)).length > 3 && (
              <TouchableOpacity className="mt-2">
                <Text className="text-indigo-600 font-medium">View all admin posts</Text>
              </TouchableOpacity>
            )}
          </GroupSection>

          {/* Digital Content Section */}
          <GroupSection title="Digital Content" iconName="folder-open-outline">
            {group.digitalContent && group.digitalContent.length > 0 ? (
              <FlatList
                data={group.digitalContent}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <DigitalContentItem item={item} />}
                scrollEnabled={false}
                ListEmptyComponent={<Text className="text-gray-500 italic">No digital content available.</Text>}
              />
            ) : (
              <Text className="text-gray-500 italic">No digital content available for this group.</Text>
            )}
          </GroupSection>

          {/* Virtual Meetings Section */}
          <GroupSection title="Virtual Meetings" iconName="videocam-outline">
            <Text className="text-gray-600 italic mb-2">Start or join group meetings.</Text>
            <TouchableOpacity className="bg-green-500 py-2 px-4 rounded-lg self-start">
              <Text className="text-white font-semibold">Start New Meeting</Text>
            </TouchableOpacity>
          </GroupSection>

        </View>
        <View style={{ height: 20 }} /> { /* Footer padding */}
      </ScrollView>
    </SafeLayout>
  );
};

export default GroupDetailScreen; 