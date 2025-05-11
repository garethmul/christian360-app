import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

// Get screen width for responsive media sizing
const { width } = Dimensions.get('window');

// Media components
const PostImage = ({ uri, aspectRatio = 4/3, onPress }) => (
  <TouchableOpacity 
    activeOpacity={0.9} 
    onPress={onPress}
    className="w-full rounded-md mb-2"
  >
    <Image 
      source={{ uri }} 
      className="w-full rounded-md"
      style={{ height: width / aspectRatio }}
      resizeMode="cover"
    />
  </TouchableOpacity>
);

const PostVideo = ({ thumbnailUri, aspectRatio = 16/9, onPress }) => (
  <TouchableOpacity 
    activeOpacity={0.9} 
    onPress={onPress}
    className="w-full rounded-md mb-2 relative"
  >
    <Image 
      source={{ uri: thumbnailUri }} 
      className="w-full rounded-md"
      style={{ height: width / aspectRatio }}
      resizeMode="cover"
    />
    <View className="absolute inset-0 items-center justify-center">
      <View className="w-16 h-16 bg-black bg-opacity-50 rounded-full items-center justify-center">
        <View className="w-0 h-0 border-l-[18px] border-l-white ml-2 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" />
      </View>
    </View>
  </TouchableOpacity>
);

const MediaGrid = ({ media, onMediaPress }) => {
  // Only show up to 4 items, with a "+X more" indicator if there are more
  const displayMedia = media.slice(0, 4);
  const remainingCount = media.length - 4;
  
  // For 1 item, show full width
  if (media.length === 1) {
    const item = media[0];
    return item.type === 'video' 
      ? <PostVideo thumbnailUri={item.uri} aspectRatio={item.aspectRatio} onPress={() => onMediaPress(0)} /> 
      : <PostImage uri={item.uri} aspectRatio={item.aspectRatio} onPress={() => onMediaPress(0)} />;
  }
  
  // For 2 items, show side by side
  if (media.length === 2) {
    return (
      <View className="flex-row w-full mb-2 gap-1">
        {displayMedia.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            className="flex-1 h-40 overflow-hidden"
            onPress={() => onMediaPress(index)}
            activeOpacity={0.9}
          >
            <Image 
              source={{ uri: item.uri }} 
              className="w-full h-full rounded-md"
              resizeMode="cover"
            />
            {item.type === 'video' && (
              <View className="absolute inset-0 items-center justify-center">
                <View className="w-12 h-12 bg-black bg-opacity-50 rounded-full items-center justify-center">
                  <View className="w-0 h-0 border-l-[10px] border-l-white ml-1 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent" />
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  }
  
  // For 3 or more items
  if (media.length >= 3) {
    return (
      <View className="w-full mb-2">
        {/* First image (large/full width) */}
        <TouchableOpacity
          className="w-full h-48 mb-1"
          onPress={() => onMediaPress(0)}
          activeOpacity={0.9}
        >
          <Image 
            source={{ uri: displayMedia[0].uri }} 
            className="w-full h-full rounded-md"
            resizeMode="cover"
          />
          {displayMedia[0].type === 'video' && (
            <View className="absolute inset-0 items-center justify-center">
              <View className="w-16 h-16 bg-black bg-opacity-50 rounded-full items-center justify-center">
                <View className="w-0 h-0 border-l-[18px] border-l-white ml-2 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent" />
              </View>
            </View>
          )}
        </TouchableOpacity>
        
        {/* Row of smaller images */}
        <View className="flex-row w-full h-28 gap-1">
          {displayMedia.slice(1, 4).map((item, index) => {
            const isLastVisible = index === displayMedia.slice(1, 4).length - 1;
            
            return (
              <TouchableOpacity
                key={index}
                className="flex-1 h-full overflow-hidden relative"
                onPress={() => onMediaPress(index + 1)}
                activeOpacity={0.9}
              >
                <Image 
                  source={{ uri: item.uri }} 
                  className="w-full h-full rounded-md"
                  resizeMode="cover"
                />
                {item.type === 'video' && (
                  <View className="absolute inset-0 items-center justify-center">
                    <View className="w-10 h-10 bg-black bg-opacity-50 rounded-full items-center justify-center">
                      <View className="w-0 h-0 border-l-[8px] border-l-white ml-1 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent" />
                    </View>
                  </View>
                )}
                
                {/* Show "+X more" indicator on the last visible image */}
                {isLastVisible && remainingCount > 0 && (
                  <View className="absolute inset-0 bg-black bg-opacity-60 items-center justify-center rounded-md">
                    <Text className="text-white text-xl font-bold">+{remainingCount} more</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
  
  return null;
};

const PostCard = ({ 
  id,
  author = { 
    name: 'John Doe', 
    title: 'Pastor at Grace Church', 
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg' 
  },
  content = 'This is a sample post content that would appear in the Christian360 app. It could contain scripture, thoughts, or community updates.',
  media = [], // Array of { uri, type: 'image'|'video', aspectRatio }
  timestamp = '2h ago',
  likes = 24,
  comments = 5,
  shares = 2,
  onPress,
  navigation,
}) => {
  
  const handlePostPress = () => {
    if (onPress) {
      onPress();
    } else if (navigation) {
      // Navigate to post details screen if available
      navigation.navigate('PostDetails', { postId: id });
    }
  };
  
  const handleMediaPress = (index) => {
    if (navigation) {
      navigation.navigate('MediaViewer', { media, initialIndex: index });
    }
  };
  
  const handleLike = () => {
    // Implement like functionality
    console.log('Liked post', id);
  };
  
  const handleComment = () => {
    if (navigation) {
      navigation.navigate('PostComments', { postId: id });
    }
  };
  
  const handleShare = () => {
    // Implement share functionality
    console.log('Shared post', id);
  };
  
  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={handlePostPress}
      className="bg-white rounded-lg shadow-sm mb-4 w-full"
    >
      {/* Post Header */}
      <View className="flex-row p-4 items-center border-b border-gray-100">
        <Image 
          source={{ uri: author.avatar }} 
          className="w-12 h-12 rounded-full mr-3"
        />
        <View className="flex-1">
          <Text className="font-bold text-base">{author.name}</Text>
          <Text className="text-gray-500 text-sm">{author.title}</Text>
          <Text className="text-gray-400 text-xs">{timestamp}</Text>
        </View>
      </View>
      
      {/* Post Content */}
      <View className="p-4">
        {/* Text Content */}
        <Text className="text-base leading-6 text-gray-800 mb-3">{content}</Text>
        
        {/* Media Content */}
        {media.length > 0 && <MediaGrid media={media} onMediaPress={handleMediaPress} />}
      </View>
      
      {/* Post Stats */}
      <View className="flex-row justify-between p-2 px-4 border-t border-gray-100">
        <Text className="text-gray-500 text-xs">{likes} likes • {comments} comments • {shares} shares</Text>
      </View>
      
      {/* Post Actions */}
      <View className="flex-row justify-around p-2 border-t border-gray-100">
        <TouchableOpacity 
          className="flex-row items-center"
          onPress={handleLike}
        >
          <Text className="text-gray-600 font-medium">Like</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-row items-center"
          onPress={handleComment}
        >
          <Text className="text-gray-600 font-medium">Comment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-row items-center"
          onPress={handleShare}
        >
          <Text className="text-gray-600 font-medium">Share</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard; 