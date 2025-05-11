import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
  Platform,
  FlatList,
  Alert
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Video } from 'expo-av';
import DateTimePicker from '@react-native-community/datetimepicker';
import SafeLayout from '../ui/SafeLayout';

// Sample data - in a real app, we would fetch this based on ID
const exchangeListings = [
  {
    id: '1',
    type: 'equipment',
    title: 'Professional PA System',
    description: 'Complete PA system available for church events and conferences. Includes speakers, mixer, and microphones. This system is perfect for indoor and outdoor events with up to 200 people. The system is well-maintained and in excellent condition. Includes 2 powered speakers, a 12-channel mixer, 4 wireless microphones, and all necessary cables.',
    owner: {
      id: 'user1',
      name: 'Grace Community Church',
      avatar: 'https://i.imgur.com/JYI3Eoo.png', // Church logo
      type: 'organization',
      trustScore: 4.9,
      verified: true,
      joinedDate: 'Jan 2018',
      bio: 'We are a community church committed to serving the Austin area. We love to share our resources with other ministries.',
      contactEmail: 'resources@gracecommunity.org'
    },
    // Enhanced with both images and videos
    media: [
      { type: 'image', uri: 'https://images.unsplash.com/photo-1520170350707-b2da59970118?auto=format&fit=crop&w=500&q=60' },
      { type: 'image', uri: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=500&q=60' },
      { type: 'image', uri: 'https://images.unsplash.com/photo-1571756028778-7a3e3a2bc0dd?auto=format&fit=crop&w=500&q=60' },
      { type: 'video', uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', thumbnail: 'https://i.imgur.com/RP3L1tS.jpg' }
    ],
    images: [
      'https://images.unsplash.com/photo-1520170350707-b2da59970118?auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1571756028778-7a3e3a2bc0dd?auto=format&fit=crop&w=500&q=60'
    ],
    location: 'Austin, TX',
    distance: '2.3 miles',
    availability: 'Weekends',
    condition: 'Excellent',
    guidelines: 'Must pick up and return in person. Please reserve at least 1 week in advance. Borrower is responsible for any damage.',
    requiredTrustScore: 4.0,
    // Additional details
    deposit: {
      required: true,
      amount: '$200',
      description: 'Refundable upon return in same condition'
    },
    idRequired: true,
    maxBorrowDuration: 7, // days
    charity: {
      name: 'Austin Youth Outreach',
      description: 'We appreciate donations to this charity when borrowing our equipment.',
      website: 'www.austinyouthoutreach.org'
    },
    reviews: [
      {
        id: 'rev1',
        userId: 'user7',
        username: 'Faith Baptist Church',
        avatar: 'https://i.imgur.com/OXCJ5Mv.png', // Church logo
        rating: 5,
        comment: 'Excellent PA system, worked perfectly for our youth event. Very easy pickup and return process.',
        date: '2 months ago'
      },
      {
        id: 'rev2',
        userId: 'user8',
        username: 'John Miller',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        rating: 5,
        comment: 'Used this for our men\'s retreat. Great sound quality and very well maintained equipment.',
        date: '4 months ago'
      },
      {
        id: 'rev3',
        userId: 'user9',
        username: 'Hope Christian School',
        avatar: 'https://i.imgur.com/tKcVMqt.png',
        rating: 4,
        comment: 'Very good equipment, just needed a bit more guidance on setup. Owner was very helpful when we called.',
        date: '5 months ago'
      }
    ]
  }
];

// Trust badge component (same as in ExchangeScreen)
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

// Media Gallery Item component
const MediaGalleryItem = ({ item, onPress, index, currentIndex }) => {
  const [error, setError] = useState(false);
  const videoRef = useRef(null);
  
  const getDefaultImage = () => {
    return `https://via.placeholder.com/500x300/e2e8f0/4b5563?text=Media`;
  };
  
  const isActive = index === currentIndex;
  
  // Pause video when not active - with safety checks
  React.useEffect(() => {
    if (item.type === 'video' && videoRef.current) {
      try {
        if (!isActive && videoRef.current.pauseAsync) {
          videoRef.current.pauseAsync();
        } else if (isActive && videoRef.current.playAsync) {
          videoRef.current.playAsync();
        }
      } catch (error) {
        console.log('Video control error:', error);
      }
    }
  }, [isActive, item?.type]);
  
  if (item.type === 'video') {
    return (
      <TouchableOpacity 
        className="relative w-full h-56 bg-black"
        onPress={() => onPress(index)}
        activeOpacity={0.9}
        style={{ width: Dimensions.get('window').width }}
      >
        <Video
          ref={videoRef}
          source={{ uri: item.uri }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          useNativeControls={isActive}
          isLooping
          shouldPlay={isActive}
          onError={(error) => console.log('Video error:', error)}
        />
        {!isActive && (
          <View className="absolute inset-0 items-center justify-center bg-black/30">
            <Ionicons name="play-circle" size={50} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
    );
  }
  
  return (
    <TouchableOpacity 
      onPress={() => onPress(index)}
      activeOpacity={0.9}
      style={{ width: Dimensions.get('window').width }}
    >
      <Image
        source={{ 
          uri: error ? getDefaultImage() : item.uri 
        }}
        className="w-full h-56"
        resizeMode="cover"
        onError={() => setError(true)}
      />
    </TouchableOpacity>
  );
};

const ExchangeDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [mainImageError, setMainImageError] = useState(false);
  const [ownerImageError, setOwnerImageError] = useState(false);
  const [reviewImageErrors, setReviewImageErrors] = useState({});
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showDurationPicker, setShowDurationPicker] = useState(false);
  
  // Borrowing request form state
  const [borrowDates, setBorrowDates] = useState({
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default to 1 week
  });
  const [datePickerMode, setDatePickerMode] = useState('start'); // 'start' or 'end'
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // In a real app, we would fetch this data based on ID
  // const { listingId } = route.params;
  // For this demo, we're using the first item in our sample data
  const listing = exchangeListings[0];
  
  // Add more helper functions for handling image errors
  const getDefaultImage = (type) => {
    return `https://via.placeholder.com/500x300/e2e8f0/4b5563?text=${type.charAt(0).toUpperCase() + type.slice(1)}`;
  };
  
  const getInitialsAvatar = (name, color = '#6366f1') => {
    const colorHex = color.replace('#', '');
    const initial = name.charAt(0).toUpperCase();
    return `https://via.placeholder.com/100x100/${colorHex}/ffffff?text=${initial}`;
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    Alert.alert(
      isBookmarked ? 'Removed from Bookmarks' : 'Added to Bookmarks',
      isBookmarked ? 'This item has been removed from your bookmarks.' : 'This item has been added to your bookmarks. You can find it in your profile.'
    );
  };
  
  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (selectedDate) {
      if (datePickerMode === 'start') {
        // Ensure end date is not before start date
        const newEndDate = borrowDates.endDate < selectedDate 
          ? new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000) // Next day
          : borrowDates.endDate;
          
        setBorrowDates({
          startDate: selectedDate,
          endDate: newEndDate
        });
      } else {
        setBorrowDates({
          ...borrowDates,
          endDate: selectedDate
        });
      }
    }
  };
  
  const showDatePickerModal = (mode) => {
    setDatePickerMode(mode);
    setShowDatePicker(true);
  };
  
  if (!listing) {
    return (
      <SafeLayout edges={['top', 'bottom']}>
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-red-500 text-lg">Listing not found</Text>
        </View>
      </SafeLayout>
    );
  }

  const handleSubmitRequest = () => {
    // In a real app, this would submit the request to the API
    console.log('Request submitted:', {
      message: requestMessage,
      dates: borrowDates
    });
    setShowRequestModal(false);
    setRequestMessage('');
    // Show success message or navigate back
    Alert.alert(
      'Request Submitted',
      'Your request has been sent to the owner. You will be notified when they respond.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeLayout edges={['top', 'bottom']}>
      {/* Enhanced Media Gallery - Moved outside ScrollView */}
      <View style={{ height: 224 }} className="relative">
        <FlatList
          data={listing.media}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <MediaGalleryItem 
              item={item} 
              index={index}
              currentIndex={selectedMediaIndex}
              onPress={setSelectedMediaIndex}
            />
          )}
          onMomentumScrollEnd={(e) => {
            const newIndex = Math.floor(
              e.nativeEvent.contentOffset.x / Dimensions.get('window').width
            );
            setSelectedMediaIndex(newIndex);
          }}
          keyExtractor={(_, index) => `media-${index}`}
          getItemLayout={(_, index) => ({
            length: Dimensions.get('window').width,
            offset: Dimensions.get('window').width * index,
            index,
          })}
          initialScrollIndex={0}
          scrollEventThrottle={16}
          decelerationRate="fast"
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
        <View className="absolute bottom-4 w-full flex-row justify-center">
          {listing.media.map((_, index) => (
            <TouchableOpacity 
              key={index}
              className={`mx-1 h-2 w-2 rounded-full ${
                selectedMediaIndex === index ? 'bg-white' : 'bg-white/50'
              }`}
              onPress={() => {
                setSelectedMediaIndex(index);
              }}
            />
          ))}
        </View>
        
        {/* Type badge */}
        <View className="absolute top-12 right-4 bg-black/50 rounded-full px-3 py-1">
          <Text className="text-white text-xs">{listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}</Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Title and availability */}
          <View className="mb-4">
            <View className="flex-row justify-between items-start">
              <Text className="text-2xl font-bold flex-1 mr-2">{listing.title}</Text>
              <View className="bg-green-100 px-3 py-1 rounded-full">
                <Text className="text-green-800 text-xs font-medium">Available</Text>
              </View>
            </View>
            <View className="flex-row items-center mt-1">
              <Ionicons name="location-outline" size={16} color="#6b7280" />
              <Text className="text-gray-600 ml-1">{listing.location} • {listing.distance}</Text>
            </View>
          </View>
          
          {/* Owner info */}
          <View className="bg-gray-50 p-3 rounded-lg mb-4">
            <View className="flex-row items-center">
              <Image 
                source={{ 
                  uri: ownerImageError
                    ? getInitialsAvatar(listing.owner.name)
                    : listing.owner.avatar
                }}
                className="w-12 h-12 rounded-full"
                resizeMode="cover"
                onError={() => setOwnerImageError(true)}
              />
              <View className="ml-3 flex-1">
                <View className="flex-row items-center">
                  <Text className="font-bold">{listing.owner.name}</Text>
                  {listing.owner.verified && (
                    <Ionicons name="checkmark-circle" size={16} color="#3b82f6" className="ml-1" />
                  )}
                </View>
                <View className="flex-row items-center justify-between mt-1">
                  <Text className="text-gray-600 text-xs">Member since {listing.owner.joinedDate}</Text>
                  <TrustBadge score={listing.owner.trustScore} verified={listing.owner.verified} />
                </View>
              </View>
            </View>
            <Text className="text-gray-700 mt-2">{listing.owner.bio}</Text>
            
            <TouchableOpacity className="bg-gray-200 py-2 rounded-lg items-center mt-3">
              <Text className="text-gray-800 font-medium">Contact Owner</Text>
            </TouchableOpacity>
          </View>
          
          {/* Description */}
          <View className="mb-4">
            <Text className="text-lg font-bold mb-2">Description</Text>
            <Text className="text-gray-700">{listing.description}</Text>
          </View>
          
          {/* Details */}
          <View className="mb-4">
            <Text className="text-lg font-bold mb-2">Details</Text>
            <View className="bg-gray-50 rounded-lg p-3">
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Condition</Text>
                <Text className="font-medium">{listing.condition}</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Availability</Text>
                <Text className="font-medium">{listing.availability}</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Maximum Borrowing Time</Text>
                <Text className="font-medium">{listing.maxBorrowDuration} days</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Deposit Required</Text>
                <Text className="font-medium">{listing.deposit.required ? listing.deposit.amount : 'No'}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">ID Required</Text>
                <Text className="font-medium">{listing.idRequired ? 'Yes' : 'No'}</Text>
              </View>
            </View>
          </View>
          
          {/* Guidelines */}
          <View className="mb-4">
            <Text className="text-lg font-bold mb-2">Borrowing Guidelines</Text>
            <View className="bg-yellow-50 p-3 rounded-lg">
              <Text className="text-gray-800">{listing.guidelines}</Text>
            </View>
          </View>
          
          {/* Charity information */}
          {listing.charity && (
            <View className="mb-4">
              <Text className="text-lg font-bold mb-2">Nominated Charity</Text>
              <View className="bg-blue-50 p-3 rounded-lg">
                <Text className="font-bold text-blue-800">{listing.charity.name}</Text>
                <Text className="text-gray-800 mb-2">{listing.charity.description}</Text>
                <TouchableOpacity className="bg-blue-100 py-2 rounded-lg items-center mt-1">
                  <Text className="text-blue-800 font-medium">Learn More About This Charity</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          
          {/* Reviews */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-bold">Reviews</Text>
              <TouchableOpacity>
                <Text className="text-indigo-600">See All</Text>
              </TouchableOpacity>
            </View>
            {listing.reviews.map(review => (
              <View key={review.id} className="mb-3 pb-3 border-b border-gray-100">
                <View className="flex-row items-center mb-1">
                  <Image 
                    source={{ 
                      uri: reviewImageErrors[review.id]
                        ? getInitialsAvatar(review.username, '#64748b')
                        : review.avatar
                    }}
                    className="w-8 h-8 rounded-full mr-2"
                    onError={() => setReviewImageErrors(prev => ({...prev, [review.id]: true}))}
                  />
                  <View className="flex-1">
                    <Text className="font-medium">{review.username}</Text>
                    <View className="flex-row items-center">
                      {[...Array(5)].map((_, i) => (
                        <Ionicons 
                          key={i}
                          name={i < review.rating ? "star" : "star-outline"} 
                          size={12} 
                          color={i < review.rating ? "#f59e0b" : "#d1d5db"}
                          style={{ marginRight: 2 }}
                        />
                      ))}
                      <Text className="text-gray-500 text-xs ml-1">{review.date}</Text>
                    </View>
                  </View>
                </View>
                <Text className="text-gray-700">{review.comment}</Text>
              </View>
            ))}
            <TouchableOpacity className="bg-gray-100 py-3 rounded-lg items-center mt-1">
              <Text className="text-gray-800 font-medium">See All Reviews</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      {/* Fixed action button */}
      <View className="border-t border-gray-200 p-4 bg-white">
        <TouchableOpacity 
          className="bg-indigo-600 py-3 rounded-lg items-center"
          onPress={() => setShowRequestModal(true)}
        >
          <Text className="text-white font-bold">Request to Borrow</Text>
        </TouchableOpacity>
      </View>
      
      {/* Enhanced Request Modal with Duration Picker */}
      <Modal
        visible={showRequestModal}
        transparent={true}
        animationType="slide"
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-xl p-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold">Request to Borrow</Text>
              <TouchableOpacity onPress={() => setShowRequestModal(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            {/* Borrowing dates */}
            <Text className="mb-2 font-medium">When do you need it?</Text>
            <View className="bg-gray-100 rounded-lg mb-4">
              <View className="flex-row border-b border-gray-200">
                <TouchableOpacity 
                  className="flex-1 p-3 flex-row items-center"
                  onPress={() => showDatePickerModal('start')}
                >
                  <Ionicons name="calendar-outline" size={18} color="#6b7280" />
                  <View className="ml-2">
                    <Text className="text-xs text-gray-500">Start Date</Text>
                    <Text className="font-medium">{formatDate(borrowDates.startDate)}</Text>
                  </View>
                </TouchableOpacity>
                <View className="w-px bg-gray-200" />
                <TouchableOpacity 
                  className="flex-1 p-3 flex-row items-center"
                  onPress={() => showDatePickerModal('end')}
                >
                  <Ionicons name="calendar-outline" size={18} color="#6b7280" />
                  <View className="ml-2">
                    <Text className="text-xs text-gray-500">End Date</Text>
                    <Text className="font-medium">{formatDate(borrowDates.endDate)}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              
              {/* Duration info */}
              <View className="p-3 flex-row items-center justify-between">
                <Text className="text-gray-500">Duration:</Text>
                <Text className="font-medium">
                  {Math.ceil((borrowDates.endDate - borrowDates.startDate) / (1000 * 60 * 60 * 24))} days
                </Text>
              </View>
            </View>
            
            {showDatePicker && (
              <DateTimePicker
                value={datePickerMode === 'start' ? borrowDates.startDate : borrowDates.endDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                minimumDate={datePickerMode === 'start' ? new Date() : borrowDates.startDate}
                maximumDate={
                  datePickerMode === 'start' 
                    ? new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 days from now 
                    : new Date(borrowDates.startDate.getTime() + listing.maxBorrowDuration * 24 * 60 * 60 * 1000)
                }
              />
            )}
            
            <Text className="mb-2 font-medium">Message to the owner</Text>
            <TextInput
              className="bg-gray-100 rounded-lg p-3 h-32 text-gray-800"
              placeholder="Introduce yourself and explain why you'd like to borrow this item..."
              multiline
              value={requestMessage}
              onChangeText={setRequestMessage}
              textAlignVertical="top"
            />
            
            {/* Requirements */}
            <View className="my-4">
              <Text className="font-medium mb-2">Requirements for Borrowing</Text>
              <View className="bg-yellow-50 p-3 rounded-lg">
                <View className="flex-row items-center mb-2">
                  <Ionicons name={listing.idRequired ? "checkmark-circle" : "close-circle"} size={18} color={listing.idRequired ? "#22c55e" : "#6b7280"} />
                  <Text className="text-gray-800 ml-2">ID Required: {listing.idRequired ? 'Yes' : 'No'}</Text>
                </View>
                <View className="flex-row items-start">
                  <Ionicons name={listing.deposit.required ? "checkmark-circle" : "close-circle"} size={18} color={listing.deposit.required ? "#22c55e" : "#6b7280"} style={{ marginTop: 1 }} />
                  <View className="ml-2 flex-1">
                    <Text className="text-gray-800">Deposit: {listing.deposit.required ? listing.deposit.amount : 'None'}</Text>
                    {listing.deposit.required && (
                      <Text className="text-gray-600 text-xs">{listing.deposit.description}</Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
            
            <View className="bg-indigo-50 p-3 rounded-lg mb-4">
              <Text className="text-gray-800 text-sm">
                By submitting this request, you agree to the borrowing guidelines and to treat the item with care.
                {listing.charity && ` Consider a donation to ${listing.charity.name} when borrowing.`}
              </Text>
            </View>
            
            <TouchableOpacity 
              className={`py-3 rounded-lg items-center ${
                requestMessage.trim().length > 10 ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
              onPress={handleSubmitRequest}
              disabled={requestMessage.trim().length <= 10}
            >
              <Text className={requestMessage.trim().length > 10 ? 'text-white font-bold' : 'text-gray-500 font-bold'}>
                Submit Request
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeLayout>
  );
};

export default ExchangeDetailScreen; 