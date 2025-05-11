import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  Switch,
  Alert,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SafeLayout from '../ui/SafeLayout';

// Categories for items
const categories = [
  { id: 'equipment', name: 'Equipment', icon: 'hardware-chip-outline' },
  { id: 'space', name: 'Venue', icon: 'business-outline' },
  { id: 'skill', name: 'Skill', icon: 'color-palette-outline' },
  { id: 'service', name: 'Service', icon: 'people-outline' }
];

const PostNeededItemScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'equipment', // Default category
    images: [],
    neededBy: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Default to 2 weeks from now
    duration: '',
    location: '',
    isUrgent: false,
    requirements: {
      size: '',
      setup: '',
      transportation: ''
    }
  });
  
  // UI state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentReqField, setCurrentReqField] = useState('');
  
  // Format date function
  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  // Handle image picker
  const pickImage = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photo library to upload images.');
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    
    if (!result.cancelled && result.assets && result.assets[0].uri) {
      // Add the image to the array
      setFormData({
        ...formData,
        images: [...formData.images, result.assets[0].uri]
      });
    }
  };
  
  // Remove image
  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages
    });
  };
  
  // Handle date change
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    
    if (selectedDate) {
      setFormData({
        ...formData,
        neededBy: selectedDate
      });
    }
  };
  
  // Update a requirement field
  const updateRequirement = (field, value) => {
    setFormData({
      ...formData,
      requirements: {
        ...formData.requirements,
        [field]: value
      }
    });
  };
  
  // Validate the form
  const validateForm = () => {
    if (!formData.title.trim()) {
      Alert.alert('Required Field', 'Please enter a title for your needed item.');
      return false;
    }
    
    if (!formData.description.trim()) {
      Alert.alert('Required Field', 'Please provide a description of what you need.');
      return false;
    }
    
    if (!formData.duration.trim()) {
      Alert.alert('Required Field', 'Please specify how long you need the item for.');
      return false;
    }
    
    if (!formData.location.trim()) {
      Alert.alert('Required Field', 'Please provide your location.');
      return false;
    }
    
    return true;
  };
  
  // Submit the form
  const handleSubmit = () => {
    if (!validateForm()) return;
    
    // In a real app, this would send the data to the backend
    console.log('Submitting form data:', formData);
    
    // Show success message and navigate back
    Alert.alert(
      'Posted Successfully',
      'Your needed item has been posted. Others can now see it and offer to help.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };
  
  return (
    <SafeLayout edges={['top', 'bottom']}>
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-bold">Post a Need</Text>
          <TouchableOpacity 
            className="bg-indigo-600 px-3 py-1 rounded-lg"
            onPress={handleSubmit}
          >
            <Text className="text-white font-medium">Post</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView className="flex-1 p-4">
          {/* Title */}
          <View className="mb-4">
            <Text className="font-medium mb-2">What do you need? *</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-white"
              placeholder="e.g., Sound Equipment for Christmas Concert"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />
          </View>
          
          {/* Category selection */}
          <View className="mb-4">
            <Text className="font-medium mb-2">Category *</Text>
            <View className="flex-row flex-wrap">
              {categories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  className={`flex-row items-center mr-3 mb-2 px-3 py-2 rounded-full ${
                    formData.type === category.id ? 'bg-indigo-100 border border-indigo-300' : 'bg-gray-100'
                  }`}
                  onPress={() => setFormData({ ...formData, type: category.id })}
                >
                  <Ionicons 
                    name={category.icon} 
                    size={16} 
                    color={formData.type === category.id ? '#6366f1' : '#6b7280'} 
                  />
                  <Text 
                    className={`ml-1 ${
                      formData.type === category.id ? 'text-indigo-700' : 'text-gray-700'
                    }`}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Images */}
          <View className="mb-4">
            <Text className="font-medium mb-2">Images</Text>
            <View className="flex-row flex-wrap">
              {formData.images.map((uri, index) => (
                <View key={index} className="w-24 h-24 m-1 relative">
                  <Image source={{ uri }} className="w-full h-full rounded-md" />
                  <TouchableOpacity 
                    className="absolute top-1 right-1 bg-black/50 rounded-full p-1"
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons name="close" size={14} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
              
              <TouchableOpacity 
                className="w-24 h-24 m-1 border-2 border-dashed border-gray-300 rounded-md items-center justify-center"
                onPress={pickImage}
              >
                <Ionicons name="add" size={24} color="#6b7280" />
                <Text className="text-xs text-gray-500 mt-1">Add Image</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Description */}
          <View className="mb-4">
            <Text className="font-medium mb-2">Description *</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-white min-h-[120px]"
              placeholder="Describe what you need, what it's for, and any specific requirements..."
              multiline
              textAlignVertical="top"
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
            />
          </View>
          
          {/* Timing */}
          <View className="mb-4">
            <Text className="font-medium mb-2">Timing</Text>
            <View className="bg-gray-50 rounded-lg p-3">
              {/* Needed By Date */}
              <TouchableOpacity 
                className="flex-row items-center justify-between py-2 border-b border-gray-200"
                onPress={() => setShowDatePicker(true)}
              >
                <Text className="text-gray-700">Needed By</Text>
                <View className="flex-row items-center">
                  <Text>{formatDate(formData.neededBy)}</Text>
                  <Ionicons name="calendar-outline" size={16} color="#6b7280" className="ml-1" />
                </View>
              </TouchableOpacity>
              
              {/* Duration */}
              <View className="py-2">
                <Text className="text-gray-700 mb-1">For How Long *</Text>
                <TextInput
                  className="border border-gray-300 rounded-md p-2 bg-white"
                  placeholder="e.g., 1 weekend, 3 days, 2 weeks"
                  value={formData.duration}
                  onChangeText={(text) => setFormData({ ...formData, duration: text })}
                />
              </View>
            </View>
          </View>
          
          {/* Location */}
          <View className="mb-4">
            <Text className="font-medium mb-2">Location *</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-white"
              placeholder="e.g., Austin, TX"
              value={formData.location}
              onChangeText={(text) => setFormData({ ...formData, location: text })}
            />
          </View>
          
          {/* Requirements */}
          <View className="mb-4">
            <Text className="font-medium mb-2">Specific Requirements</Text>
            <View className="bg-gray-50 rounded-lg p-3">
              {/* Size/Specifications */}
              <View className="py-2 border-b border-gray-200">
                <Text className="text-gray-700 mb-1">Size/Specifications</Text>
                <TextInput
                  className="border border-gray-300 rounded-md p-2 bg-white"
                  placeholder="e.g., Large enough for 50 people"
                  value={formData.requirements.size}
                  onChangeText={(text) => updateRequirement('size', text)}
                />
              </View>
              
              {/* Setup Needs */}
              <View className="py-2 border-b border-gray-200">
                <Text className="text-gray-700 mb-1">Setup Needs</Text>
                <TextInput
                  className="border border-gray-300 rounded-md p-2 bg-white"
                  placeholder="e.g., Need to use outdoors"
                  value={formData.requirements.setup}
                  onChangeText={(text) => updateRequirement('setup', text)}
                />
              </View>
              
              {/* Transportation */}
              <View className="py-2">
                <Text className="text-gray-700 mb-1">Transportation</Text>
                <TextInput
                  className="border border-gray-300 rounded-md p-2 bg-white"
                  placeholder="e.g., We can pick up and return"
                  value={formData.requirements.transportation}
                  onChangeText={(text) => updateRequirement('transportation', text)}
                />
              </View>
            </View>
          </View>
          
          {/* Urgency Switch */}
          <View className="mb-6 flex-row justify-between items-center">
            <View>
              <Text className="font-medium">Mark as Urgent</Text>
              <Text className="text-gray-500 text-xs">Urgent needs are highlighted</Text>
            </View>
            <Switch
              value={formData.isUrgent}
              onValueChange={(value) => setFormData({ ...formData, isUrgent: value })}
              trackColor={{ false: '#d1d5db', true: '#c7d2fe' }}
              thumbColor={formData.isUrgent ? '#6366f1' : '#f4f4f5'}
            />
          </View>
          
          {/* Legal Notice */}
          <View className="bg-yellow-50 p-3 rounded-lg mb-6">
            <Text className="text-gray-800 text-sm">
              By posting this need, you agree to our community guidelines and that your contact information will be shared with members who offer to help.
            </Text>
          </View>
        </ScrollView>
        
        {/* Date Picker Modal */}
        {showDatePicker && (
          <DateTimePicker
            value={formData.neededBy}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}
      </View>
    </SafeLayout>
  );
};

export default PostNeededItemScreen; 