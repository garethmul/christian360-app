import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import PostCard from './PostCard';

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
  },
  {
    id: '4',
    author: {
      name: 'Mark Thompson',
      title: 'Senior Pastor',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    },
    content: "Our church retreat was an incredible time of fellowship and spiritual growth. Here are some highlights from the weekend!",
    media: [
      {
        uri: 'https://images.unsplash.com/photo-1571231144948-39d55317191f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        type: 'image',
        aspectRatio: 16/9
      },
      {
        uri: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        type: 'image',
        aspectRatio: 16/9
      },
      {
        uri: 'https://images.unsplash.com/photo-1525586565371-7b7321857e10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        type: 'image',
        aspectRatio: 16/9
      },
      {
        uri: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        type: 'image',
        aspectRatio: 16/9
      },
      {
        uri: 'https://images.unsplash.com/photo-1523803326055-13483598541f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        type: 'image',
        aspectRatio: 16/9
      }
    ],
    timestamp: '2 days ago',
    likes: 87,
    comments: 14,
    shares: 8,
  },
  {
    id: '5',
    author: {
      name: 'Grace Ministry',
      title: 'Non-profit Organization',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    content: "Watch the highlights from our community outreach program last weekend. So grateful for all the volunteers who made this possible!",
    media: [
      {
        uri: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2h1cmNoJTIwc2VydmljZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        type: 'video',
        aspectRatio: 16/9
      }
    ],
    timestamp: '3 days ago',
    likes: 122,
    comments: 28,
    shares: 34,
  },
  {
    id: '6',
    author: {
      name: 'Michael Brooks',
      title: 'Bible Study Leader',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    },
    content: "Starting a new Bible study series on the Book of Romans this Wednesday. Here's a sneak peek at our study materials and meeting location.",
    media: [
      {
        uri: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmlibGUlMjBzdHVkeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        type: 'image',
        aspectRatio: 4/3
      },
      {
        uri: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2h1cmNoJTIwYnVpbGRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        type: 'image',
        aspectRatio: 16/9
      }
    ],
    timestamp: '4 days ago',
    likes: 45,
    comments: 11,
    shares: 5,
  },
];

const PostsScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  
  const handleCreatePost = () => {
    navigation.navigate('CreatePost');
  };
  
  // Render a post card with navigation
  const renderPostCard = ({ item }) => {
    return <PostCard {...item} navigation={navigation} />;
  };
  
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1">
        <View className="px-4 py-3 bg-white border-b border-gray-200">
          <Text className="text-xl font-bold text-indigo-800">Christian360 Feed</Text>
          <Text className="text-sm text-gray-500 mb-2">Connect with your community</Text>
          
          {/* Search bar */}
          <View className="flex-row bg-gray-100 rounded-lg p-2">
            <TextInput 
              placeholder="Search posts..."
              className="flex-1 text-base"
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Text className="text-indigo-600 font-medium">Clear</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        {/* Create Post Button */}
        <View className="flex-row p-3 bg-white border-b border-gray-200 items-center">
          <View className="w-10 h-10 bg-gray-200 rounded-full mr-3" />
          <TouchableOpacity 
            className="flex-1 bg-gray-100 rounded-full py-2 px-4"
            activeOpacity={0.7}
            onPress={handleCreatePost}
          >
            <Text className="text-gray-500">Share your thoughts or scripture...</Text>
          </TouchableOpacity>
        </View>
        
        {/* Posts List */}
        <FlatList
          data={DUMMY_POSTS}
          keyExtractor={(item) => item.id}
          renderItem={renderPostCard}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default PostsScreen; 