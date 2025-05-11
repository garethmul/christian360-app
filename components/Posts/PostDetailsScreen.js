import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  SafeAreaView 
} from 'react-native';
import PostCard from './PostCard';

// Sample comments data
const SAMPLE_COMMENTS = [
  {
    id: 'c1',
    author: {
      name: 'Michael Brooks',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    },
    content: 'What a powerful verse! This has been a guiding light for me through many trials.',
    timestamp: '1h ago',
    likes: 5,
  },
  {
    id: 'c2',
    author: {
      name: 'Elizabeth Warren',
      avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
    content: 'I love this passage. Jeremiah has some of the most encouraging words in the Bible.',
    timestamp: '2h ago',
    likes: 3,
  },
  {
    id: 'c3',
    author: {
      name: 'David Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    content: 'Our Bible study group is going through Jeremiah this month. Would love to hear more about how this has impacted you!',
    timestamp: '3h ago',
    likes: 7,
  },
];

// Comment component
const Comment = ({ comment }) => {
  return (
    <View className="flex-row py-3 border-b border-gray-100">
      <Image 
        source={{ uri: comment.author.avatar }} 
        className="w-10 h-10 rounded-full mr-3"
      />
      <View className="flex-1">
        <View className="bg-gray-100 rounded-lg p-3">
          <Text className="font-bold text-gray-800">{comment.author.name}</Text>
          <Text className="text-gray-800">{comment.content}</Text>
        </View>
        <View className="flex-row mt-1 items-center">
          <Text className="text-gray-500 text-xs mr-4">{comment.timestamp}</Text>
          <TouchableOpacity>
            <Text className="text-gray-500 text-xs">Like ({comment.likes})</Text>
          </TouchableOpacity>
          <TouchableOpacity className="ml-4">
            <Text className="text-gray-500 text-xs">Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const PostDetailsScreen = ({ route, navigation }) => {
  const [commentText, setCommentText] = useState('');
  const { postId } = route.params;
  
  // In a real app, you would fetch the post by ID
  // For this example, we'll use the first post from DUMMY_POSTS
  const post = {
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
  };
  
  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    
    // In a real app, you would submit the comment to the API
    console.log('Submitting comment:', commentText);
    setCommentText('');
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={90}
      >
        {/* Header */}
        <View className="flex-row items-center p-3 border-b border-gray-200">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
            <Text className="text-indigo-600">Back</Text>
          </TouchableOpacity>
          <Text className="text-lg font-bold flex-1 text-center">Post</Text>
          <View className="w-8" />
        </View>
        
        <FlatList
          data={SAMPLE_COMMENTS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Comment comment={item} />}
          ListHeaderComponent={() => (
            <>
              {/* Post content */}
              <PostCard {...post} />
              
              {/* Comments header */}
              <View className="px-4 py-2 border-t border-b border-gray-200 bg-gray-50">
                <Text className="font-bold text-gray-800">Comments ({SAMPLE_COMMENTS.length})</Text>
              </View>
            </>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
        
        {/* Comment input */}
        <View className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 py-2">
          <View className="flex-row items-center">
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
              className="w-10 h-10 rounded-full mr-3"
            />
            <View className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex-row items-center">
              <TextInput
                placeholder="Write a comment..."
                className="flex-1"
                value={commentText}
                onChangeText={setCommentText}
                multiline
              />
              <TouchableOpacity 
                onPress={handleSubmitComment}
                disabled={!commentText.trim()}
                className={`ml-2 ${!commentText.trim() ? 'opacity-50' : ''}`}
              >
                <Text className="text-indigo-600 font-bold">Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PostDetailsScreen; 