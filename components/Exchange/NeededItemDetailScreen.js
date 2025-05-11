import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  StyleSheet
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SafeLayout from '../ui/SafeLayout';

// Sample needed item data - in a real app, this would be fetched based on ID
const neededItems = [
  {
    id: 'need1',
    type: 'equipment',
    title: 'Portable Baptismal Pool',
    description: 'We are looking to borrow a portable baptismal pool for our outdoor baptism service next month. We are expecting to baptize around 15 people and need a portable solution that can be set up in our church parking lot. We have volunteers to help with setup and takedown. We can pick up and return the pool, and we will ensure it is properly cleaned and dried before return.',
    requester: {
      id: 'user7',
      name: 'New Life Community Church',
      avatar: 'https://i.imgur.com/UcMR5Lq.png',
      type: 'organization',
      trustScore: 4.7,
      verified: true,
      joinedDate: 'Mar 2019',
      bio: 'We are a growing community church focused on reaching out to our local area. We believe in sharing resources with other churches to further God\'s kingdom together.',
      contactEmail: 'contact@newlifecc.org',
      contactPhone: '(512) 555-7890'
    },
    images: [
      'https://images.unsplash.com/photo-1563639823304-c6c1dab9d01a?auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1567613217787-a3eba378e10a?auto=format&fit=crop&w=500&q=60'
    ],
    location: 'Houston, TX',
    distance: '12.3 miles',
    neededBy: 'July 15, 2023',
    duration: '1 weekend (July 15-16)',
    isUrgent: false,
    requirements: {
      size: 'Large enough for 1-2 people at a time',
      setup: 'Need to be able to set up outdoors',
      transportation: 'We can pick up and return'
    },
    isBookmarked: false
  }
];

// Trust badge component
const TrustBadge = ({ score, verified }) => {
  // Determine color based on score
  const getBadgeColor = () => {
    if (score >= 4.5) return '#22c55e'; // Green for high trust
    if (score >= 4.0) return '#eab308'; // Yellow for medium trust
    return '#94a3b8'; // Gray for lower trust
  };

  return (
    <View className="flex-row items-center">
      <View className="flex-row bg-white rounded-full px-2 py-1 shadow-sm mr-1">
        <Ionicons name="shield-checkmark" size={14} color={getBadgeColor()} />
        <Text className="text-xs font-semibold ml-1" style={{ color: getBadgeColor() }}>
          {score.toFixed(1)}
        </Text>
      </View>
      {verified && (
        <View className="bg-blue-500 rounded-full px-2 py-1">
          <Ionicons name="checkmark-circle" size={14} color="#fff" />
        </View>
      )}
    </View>
  );
};

const NeededItemDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const [showContactModal, setShowContactModal] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [mainImageError, setMainImageError] = useState(false);
  const [requesterImageError, setRequesterImageError] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // In a real app, we would fetch this data based on ID
  // const { neededItemId } = route.params;
  // For this demo, we're using the first item in our sample data
  const item = neededItems[0];
  
  // Helper functions for handling image errors
  const getDefaultImage = (type) => {
    return `https://via.placeholder.com/500x300/e2e8f0/4b5563?text=${type.charAt(0).toUpperCase() + type.slice(1)}`;
  };
  
  const getInitialsAvatar = (name, color = '#6366f1') => {
    const colorHex = color.replace('#', '');
    const initial = name.charAt(0).toUpperCase();
    return `https://via.placeholder.com/100x100/${colorHex}/ffffff?text=${initial}`;
  };
  
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    Alert.alert(
      isBookmarked ? 'Removed from Bookmarks' : 'Added to Bookmarks',
      isBookmarked ? 'This needed item has been removed from your bookmarks.' : 'This needed item has been added to your bookmarks. You can find it in your profile.'
    );
  };
  
  const handleSendMessage = () => {
    // In a real app, this would send the message to the requester
    console.log('Message sent:', message);
    Alert.alert(
      'Message Sent',
      `Your message has been sent to ${item.requester.name}. They will contact you soon.`,
      [{ text: 'OK', onPress: () => {
        setMessage('');
        setShowContactModal(false);
      }}]
    );
  };
  
  if (!item) {
    return (
      <SafeLayout edges={['top', 'bottom']}>
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-red-500 text-lg">Item not found</Text>
        </View>
      </SafeLayout>
    );
  }

  return (
    <SafeLayout edges={['top', 'bottom']}>
      <ScrollView className="flex-1">
        {/* Header Image */}
        <View className="relative">
          <Image
            source={{ 
              uri: mainImageError 
                ? getDefaultImage(item.type) 
                : item.images[selectedImageIndex] 
            }}
            className="w-full h-56"
            resizeMode="cover"
            onError={() => setMainImageError(true)}
          />
          
          {/* Back button */}
          <TouchableOpacity 
            className="absolute top-4 left-4 bg-black/30 p-2 rounded-full"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          
          {/* Bookmark button */}
          <TouchableOpacity 
            className="absolute top-4 right-14 bg-black/30 p-2 rounded-full"
            onPress={handleBookmarkToggle}
          >
            <Ionicons 
              name={isBookmarked ? "bookmark" : "bookmark-outline"} 
              size={22} 
              color={isBookmarked ? "#fcd34d" : "#fff"} 
            />
          </TouchableOpacity>
          
          {/* Share button */}
          <TouchableOpacity 
            className="absolute top-4 right-4 bg-black/30 p-2 rounded-full"
            onPress={() => {
              /* Share functionality would go here */
              Alert.alert('Share', 'Sharing functionality would be implemented here');
            }}
          >
            <Ionicons name="share-outline" size={22} color="#fff" />
          </TouchableOpacity>
          
          {/* Image pagination */}
          {item.images.length > 1 && (
            <View className="absolute bottom-4 w-full flex-row justify-center">
              {item.images.map((_, index) => (
                <TouchableOpacity 
                  key={index}
                  className={`mx-1 h-2 w-2 rounded-full ${
                    selectedImageIndex === index ? 'bg-white' : 'bg-white/50'
                  }`}
                  onPress={() => {
                    setSelectedImageIndex(index);
                    setMainImageError(false); // Reset error state when changing images
                  }}
                />
              ))}
            </View>
          )}
          
          {/* Type badge */}
          <View className="absolute top-4 right-[100px] bg-black/50 rounded-full px-3 py-1">
            <Text className="text-white text-xs">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Text>
          </View>
          
          {/* Needed by banner */}
          <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-3 px-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-white font-bold">Needed by: {item.neededBy}</Text>
              {item.isUrgent && (
                <View className="bg-red-500 px-2 py-1 rounded-full">
                  <Text className="text-white text-xs font-bold">URGENT</Text>
                </View>
              )}
            </View>
            <Text className="text-white text-sm">{item.duration}</Text>
          </View>
        </View>
        
        <View className="p-4">
          {/* Title and location */}
          <View className="mb-4">
            <Text className="text-2xl font-bold">{item.title}</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="location-outline" size={16} color="#6b7280" />
              <Text className="text-gray-600 ml-1">{item.location} • {item.distance}</Text>
            </View>
          </View>
          
          {/* Requester info */}
          <View className="bg-gray-50 p-3 rounded-lg mb-4">
            <View className="flex-row items-center">
              <Image 
                source={{ 
                  uri: requesterImageError
                    ? getInitialsAvatar(item.requester.name)
                    : item.requester.avatar
                }}
                className="w-12 h-12 rounded-full"
                resizeMode="cover"
                onError={() => setRequesterImageError(true)}
              />
              <View className="ml-3 flex-1">
                <View className="flex-row items-center">
                  <Text className="font-bold">{item.requester.name}</Text>
                  {item.requester.verified && (
                    <Ionicons name="checkmark-circle" size={16} color="#3b82f6" className="ml-1" />
                  )}
                </View>
                <View className="flex-row items-center justify-between mt-1">
                  <Text className="text-gray-600 text-xs">Member since {item.requester.joinedDate}</Text>
                  <TrustBadge score={item.requester.trustScore} verified={item.requester.verified} />
                </View>
              </View>
            </View>
            <Text className="text-gray-700 mt-2">{item.requester.bio}</Text>
          </View>
          
          {/* Description */}
          <View className="mb-4">
            <Text className="text-lg font-bold mb-2">Description</Text>
            <Text className="text-gray-700">{item.description}</Text>
          </View>
          
          {/* Requirements */}
          <View className="mb-4">
            <Text className="text-lg font-bold mb-2">Requirements</Text>
            <View className="bg-gray-50 rounded-lg p-3">
              {Object.entries(item.requirements).map(([key, value]) => (
                <View key={key} className="flex-row items-start mb-2 last:mb-0">
                  <Ionicons name="checkmark-circle" size={18} color="#10b981" style={{ marginTop: 1 }} />
                  <View className="ml-2 flex-1">
                    <Text className="text-gray-800 font-medium capitalize">{key}</Text>
                    <Text className="text-gray-600">{value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          
          {/* Timeline */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-2">Timeline</Text>
            <View className="bg-blue-50 p-3 rounded-lg">
              <View className="flex-row items-center mb-2">
                <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center">
                  <Ionicons name="calendar-outline" size={16} color="#3b82f6" />
                </View>
                <View className="ml-2 flex-1">
                  <Text className="text-blue-800 font-medium">Needed by</Text>
                  <Text className="text-gray-600">{item.neededBy}</Text>
                </View>
              </View>
              <View className="flex-row items-center">
                <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center">
                  <Ionicons name="time-outline" size={16} color="#3b82f6" />
                </View>
                <View className="ml-2 flex-1">
                  <Text className="text-blue-800 font-medium">Duration</Text>
                  <Text className="text-gray-600">{item.duration}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Fixed action button */}
      <View className="border-t border-gray-200 p-4 bg-white">
        <TouchableOpacity 
          className="bg-indigo-600 py-3 rounded-lg items-center"
          onPress={() => setShowContactModal(true)}
        >
          <Text className="text-white font-bold">I Can Help</Text>
        </TouchableOpacity>
      </View>
      
      {/* Contact Modal */}
      <Modal
        visible={showContactModal}
        transparent={true}
        animationType="slide"
      >
        <View className="flex-1 justify-end bg-black/50">
          <View 
            className="bg-white rounded-t-xl p-4" 
            style={{ paddingBottom: Math.max(insets.bottom, 16) }}
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold">Contact {item.requester.name}</Text>
              <TouchableOpacity onPress={() => setShowContactModal(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            <Text className="mb-2 font-medium">Your Message</Text>
            <TextInput
              className="bg-gray-100 rounded-lg p-3 h-32 text-gray-800"
              placeholder="Introduce yourself and explain how you can help..."
              multiline
              value={message}
              onChangeText={setMessage}
              textAlignVertical="top"
            />
            
            <View className="bg-blue-50 p-3 rounded-lg my-4">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={18} color="#3b82f6" style={{ marginTop: 1 }} />
                <Text className="text-gray-800 text-sm ml-2 flex-1">
                  Your contact information will be shared with {item.requester.name} when you send this message.
                </Text>
              </View>
            </View>
            
            <TouchableOpacity 
              className={`py-3 rounded-lg items-center ${
                message.trim().length > 10 ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
              onPress={handleSendMessage}
              disabled={message.trim().length <= 10}
            >
              <Text className={message.trim().length > 10 ? 'text-white font-bold' : 'text-gray-500 font-bold'}>
                Send Message
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeLayout>
  );
};

export default NeededItemDetailScreen; 