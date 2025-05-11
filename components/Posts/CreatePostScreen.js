import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { Button } from '../ui';

const MediaItem = ({ uri, type, onRemove, index }) => {
  return (
    <View className="relative mr-2 mb-2">
      <Image 
        source={{ uri }} 
        className="w-28 h-28 rounded-md"
      />
      {type === 'video' && (
        <View className="absolute inset-0 items-center justify-center">
          <View className="w-10 h-10 bg-black bg-opacity-50 rounded-full items-center justify-center">
            <View className="w-0 h-0 border-l-[10px] border-l-white ml-1 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent" />
          </View>
        </View>
      )}
      <TouchableOpacity 
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full items-center justify-center"
        onPress={() => onRemove(index)}
      >
        <Text className="text-white font-bold">×</Text>
      </TouchableOpacity>
    </View>
  );
};

const CreatePostScreen = ({ navigation, route }) => {
  const [postText, setPostText] = useState('');
  const [media, setMedia] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  
  const handleAddPhoto = () => {
    // Mock adding a photo - would use image picker in real app
    const newMedia = {
      uri: 'https://images.unsplash.com/photo-1493825042426-2b617d0f14fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNodXJjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      type: 'image',
      aspectRatio: 16/9
    };
    setMedia([...media, newMedia]);
  };
  
  const handleAddVideo = () => {
    // Mock adding a video - would use video picker in real app
    const newMedia = {
      uri: 'https://images.unsplash.com/photo-1614223481233-c744ff91d79b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29yc2hpcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      type: 'video',
      aspectRatio: 16/9
    };
    setMedia([...media, newMedia]);
  };
  
  const handleRemoveMedia = (index) => {
    const updatedMedia = [...media];
    updatedMedia.splice(index, 1);
    setMedia(updatedMedia);
  };
  
  const handlePost = () => {
    if (!postText.trim() && media.length === 0) {
      return;
    }
    
    setIsPosting(true);
    
    // Simulate posting delay
    setTimeout(() => {
      setIsPosting(false);
      navigation.goBack();
    }, 1000);
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-gray-600">Cancel</Text>
          </TouchableOpacity>
          <Text className="text-lg font-bold">Create Post</Text>
          <Button 
            onPress={handlePost}
            disabled={(!postText.trim() && media.length === 0) || isPosting}
            size="sm"
          >
            {isPosting ? 'Posting...' : 'Post'}
          </Button>
        </View>
        
        {/* Post Content */}
        <ScrollView className="flex-1 p-4">
          <TextInput
            placeholder="Share your thoughts or scripture..."
            multiline
            className="text-lg leading-6 text-gray-800 min-h-[120px]"
            value={postText}
            onChangeText={setPostText}
            autoFocus
          />
          
          {/* Media Preview */}
          {media.length > 0 && (
            <View className="mt-4">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row flex-wrap">
                  {media.map((item, index) => (
                    <MediaItem 
                      key={index}
                      uri={item.uri}
                      type={item.type}
                      index={index}
                      onRemove={handleRemoveMedia}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
        </ScrollView>
        
        {/* Media Actions */}
        <View className="flex-row justify-around p-3 border-t border-gray-200">
          <TouchableOpacity 
            className="flex-row items-center" 
            onPress={handleAddPhoto}
          >
            <Text className="text-indigo-600 font-medium">Add Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-row items-center"
            onPress={handleAddVideo}
          >
            <Text className="text-indigo-600 font-medium">Add Video</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-indigo-600 font-medium">Add Scripture</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreatePostScreen; 