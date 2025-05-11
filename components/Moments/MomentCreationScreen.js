import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Switch,
  Image,
  FlatList,
  Modal,
  StyleSheet,
  Alert,
  Keyboard
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Sample data for moment lists (in a real app, this would come from storage/backend)
const initialLists = [
  {
    id: 'list1',
    title: 'Family Prayers',
    description: 'Daily prayers for my family members',
    icon: 'people',
    color: '#6366f1',
    customIcon: null,
    useCustomIcon: false,
    displayMode: 'all', // 'all', 'rotate', 'random'
    displayCount: 1, // How many moments to display in rotate or random mode
    frequency: 'daily', // 'daily', 'weekdays', 'weekends', 'custom'
    days: [true, true, true, true, true, true, true], // Sunday to Saturday
    timeSlot: 'morning',
    moments: [
      {
        id: 'family1',
        title: 'For My Spouse',
        content: 'Lord, bless my spouse today with strength and wisdom...',
        type: 'prayer'
      },
      {
        id: 'family2',
        title: 'For My Children',
        content: 'Heavenly Father, watch over my children and guide their steps...',
        type: 'prayer'
      },
    ]
  },
  {
    id: 'list2',
    title: 'Scripture Memory',
    description: 'Verses to memorise and meditate on',
    icon: 'book',
    color: '#8b5cf6',
    customIcon: null,
    useCustomIcon: false,
    displayMode: 'rotate',
    displayCount: 1, // How many moments to display in rotate mode
    frequency: 'weekdays',
    days: [false, true, true, true, true, true, false],
    timeSlot: 'evening',
    moments: [
      {
        id: 'verse1',
        title: 'Philippians 4:8',
        content: 'Finally, brothers and sisters, whatever is true, whatever is noble...',
        type: 'verse'
      },
      {
        id: 'verse2',
        title: 'Psalm 23:1',
        content: 'The Lord is my shepherd, I lack nothing.',
        type: 'verse'
      },
    ]
  }
];

// Time slots for selecting when moments should appear
const timeSlots = [
  { id: 'morning', title: 'Morning', icon: 'sunny-outline', color: '#ff9500'},
  { id: 'midday', title: 'Midday', icon: 'sunny', color: '#ffcd00' },
  { id: 'evening', title: 'Evening', icon: 'partly-sunny-outline', color: '#8b5cf6' },
  { id: 'night', title: 'Night', icon: 'moon-outline', color: '#3b82f6' }
];

// Frequency options
const frequencyOptions = [
  { id: 'daily', title: 'Every Day' },
  { id: 'weekdays', title: 'Weekdays Only' },
  { id: 'weekends', title: 'Weekends Only' },
  { id: 'custom', title: 'Custom Days' }
];

// Display mode options
const displayModeOptions = [
  { id: 'all', title: 'Show All Daily', description: 'Display all moments in this list every day' },
  { id: 'rotate', title: 'Rotate Through List', description: 'Show one moment per day, cycling through the list' },
  { id: 'random', title: 'Random Selection', description: 'Show random moments from this list each day' }
];

// Types of moments
const momentTypes = [
  { id: 'prayer', title: 'Prayer', icon: 'praying-hands', color: '#6366f1' },
  { id: 'verse', title: 'Scripture', icon: 'book-bible', color: '#8b5cf6' },
  { id: 'reflection', title: 'Reflection', icon: 'lightbulb-on', color: '#10b981' },
  { id: 'gratitude', title: 'Gratitude', icon: 'heart', color: '#ec4899' },
  { id: 'meditation', title: 'Meditation', icon: 'meditation', color: '#3b82f6' }
];

// Day of week labels
const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Sample Christian Ministries data for the directory
const christianMinistries = [
  {
    id: 'ministry1',
    name: 'Daily Bread Ministries',
    logo: 'https://i.imgur.com/nDcX5Cs.png',
    description: 'Providing daily devotionals and scripture readings for spiritual growth',
    verified: true,
    resources: [
      {
        id: 'resource1',
        title: 'Our Daily Bread',
        type: 'devotional',
        frequency: 'daily',
        description: 'Short, daily readings with scripture and reflection questions',
        preview: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=500&q=60',
      },
      {
        id: 'resource2',
        title: 'Scripture Memory Programme',
        type: 'memory',
        frequency: 'weekly',
        description: 'Weekly scripture passages for memorisation with study notes',
        preview: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=500&q=60',
      }
    ]
  },
  {
    id: 'ministry2',
    name: 'Prayer Connect International',
    logo: 'https://i.imgur.com/H4PnCGh.png',
    description: 'Uniting Christians in prayer for global issues and personal growth',
    verified: true,
    resources: [
      {
        id: 'resource3',
        title: 'Global Prayer Diary',
        type: 'prayer',
        frequency: 'daily',
        description: 'Daily prayer points focused on global missions and unreached peoples',
        preview: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=500&q=60',
      },
      {
        id: 'resource4',
        title: 'Prayer Prompts',
        type: 'prayer',
        frequency: 'daily',
        description: 'Thematic prayer prompts to deepen your personal prayer life',
        preview: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=500&q=60',
      }
    ]
  },
  {
    id: 'ministry3',
    name: 'Hope & Faith Media',
    logo: 'https://i.imgur.com/LyV6Ckd.png',
    description: 'Digital Christian content for modern believers',
    verified: true,
    resources: [
      {
        id: 'resource5',
        title: 'Faith for Today',
        type: 'devotional',
        frequency: 'daily',
        description: 'Contemporary devotionals connecting scripture to everyday life',
        preview: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=500&q=60',
      },
      {
        id: 'resource6',
        title: 'Sermon Notes',
        type: 'study',
        frequency: 'weekly',
        description: 'Weekly study notes from popular sermons and Christian teachers',
        preview: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=500&q=60',
      }
    ]
  },
  {
    id: 'ministry4',
    name: 'Scripture Union',
    logo: 'https://i.imgur.com/NE0e3Dt.png',
    description: 'Biblical resources for all ages focused on scripture engagement',
    verified: true,
    resources: [
      {
        id: 'resource7',
        title: 'Daily Encounter',
        type: 'devotional',
        frequency: 'daily',
        description: 'Short scripture readings with reflection for busy people',
        preview: 'https://images.unsplash.com/photo-1501686637-b7aa9c48a882?auto=format&fit=crop&w=500&q=60',
      },
      {
        id: 'resource8',
        title: 'Word Alive',
        type: 'study',
        frequency: 'daily',
        description: 'In-depth Bible study notes for serious students of scripture',
        preview: 'https://images.unsplash.com/photo-1501686637-b7aa9c48a882?auto=format&fit=crop&w=500&q=60',
      }
    ]
  },
  {
    id: 'ministry5',
    name: 'World Prayer Network',
    logo: 'https://i.imgur.com/4QgRC0A.png',
    description: 'Focused on prayer for global missions and persecuted Christians',
    verified: true,
    resources: [
      {
        id: 'resource9',
        title: 'Persecution Watch',
        type: 'prayer',
        frequency: 'daily',
        description: 'Daily prayer focus for persecuted Christians around the world',
        preview: 'https://images.unsplash.com/photo-1589483233147-8c6e2fb175a5?auto=format&fit=crop&w=500&q=60',
      }
    ]
  }
];

// Main component for managing moment lists
const MomentCreationScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [lists, setLists] = useState(initialLists);
  const [showNewListModal, setShowNewListModal] = useState(false);
  const [showMomentModal, setShowMomentModal] = useState(false);
  const [showListSettingsModal, setShowListSettingsModal] = useState(false);
  const [currentList, setCurrentList] = useState(null);
  const [newMoment, setNewMoment] = useState({
    title: '',
    content: '',
    type: 'prayer'
  });
  const [newList, setNewList] = useState({
    title: '',
    description: '',
    icon: 'people',
    color: '#6366f1',
    customIcon: null,
    useCustomIcon: false,
    displayMode: 'all',
    displayCount: 1,
    frequency: 'daily',
    days: [true, true, true, true, true, true, true],
    timeSlot: 'morning',
    moments: []
  });

  const [showDirectoryModal, setShowDirectoryModal] = useState(false);
  const [selectedMinistry, setSelectedMinistry] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);

  // Handle creating a new list
  const handleCreateList = () => {
    if (!newList.title.trim()) {
      Alert.alert('Required Field', 'Please enter a title for your moment list.');
      return;
    }

    const listId = `list-${Date.now()}`;
    const createdList = {
      ...newList,
      id: listId,
    };

    setLists([...lists, createdList]);
    setNewList({
      title: '',
      description: '',
      icon: 'people',
      color: '#6366f1',
      customIcon: null,
      useCustomIcon: false,
      displayMode: 'all',
      displayCount: 1,
      frequency: 'daily',
      days: [true, true, true, true, true, true, true],
      timeSlot: 'morning',
      moments: []
    });
    setShowNewListModal(false);
  };

  // Handle creating a new moment
  const handleCreateMoment = () => {
    if (!newMoment.title.trim() || !newMoment.content.trim()) {
      Alert.alert('Required Fields', 'Please enter both a title and content for your moment.');
      return;
    }

    if (!currentList) {
      Alert.alert('Error', 'No list selected.');
      return;
    }

    const momentId = `moment-${Date.now()}`;
    const moment = {
      ...newMoment,
      id: momentId
    };

    // Update the current list with the new moment
    const updatedLists = lists.map(list =>
      list.id === currentList.id
        ? { ...list, moments: [...list.moments, moment] }
        : list
    );

    setLists(updatedLists);
    setNewMoment({
      title: '',
      content: '',
      type: 'prayer'
    });
    setShowMomentModal(false);
  };

  // Handle list settings update
  const handleUpdateListSettings = () => {
    if (!currentList) {
      Alert.alert('Error', 'No list selected.');
      return;
    }

    const updatedLists = lists.map(list =>
      list.id === currentList.id ? currentList : list
    );

    setLists(updatedLists);
    setShowListSettingsModal(false);
  };

  // Toggle a day in custom frequency mode
  const toggleDay = (index) => {
    if (!currentList) return;
    
    const updatedDays = [...currentList.days];
    updatedDays[index] = !updatedDays[index];
    
    setCurrentList({
      ...currentList,
      days: updatedDays
    });
  };

  // Delete a moment from a list
  const deleteMoment = (listId, momentId) => {
    Alert.alert(
      'Delete Moment',
      'Are you sure you want to delete this moment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedLists = lists.map(list =>
              list.id === listId
                ? { ...list, moments: list.moments.filter(moment => moment.id !== momentId) }
                : list
            );
            setLists(updatedLists);
          }
        }
      ]
    );
  };

  // Delete an entire list
  const deleteList = (listId) => {
    Alert.alert(
      'Delete List',
      'Are you sure you want to delete this list and all its moments?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setLists(lists.filter(list => list.id !== listId));
          }
        }
      ]
    );
  };

  // Function to pick an image for a new list
  const pickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission needed", "Please grant permission to access your photo library");
        return;
      }
      
      // Launch the image picker
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setNewList({
          ...newList,
          customIcon: result.assets[0].uri,
          useCustomIcon: true
        });
      }
    } catch (error) {
      console.log("Error picking image:", error);
      Alert.alert("Error", "There was a problem selecting the image");
    }
  };
  
  // Function to take a photo for a new list
  const takePhoto = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission needed", "Please grant permission to access your camera");
        return;
      }
      
      // Launch the camera
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setNewList({
          ...newList,
          customIcon: result.assets[0].uri,
          useCustomIcon: true
        });
      }
    } catch (error) {
      console.log("Error taking photo:", error);
      Alert.alert("Error", "There was a problem capturing the photo");
    }
  };

  // Function to pick an image for an existing list
  const pickImageForList = async () => {
    if (!currentList) return;
    
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission needed", "Please grant permission to access your photo library");
        return;
      }
      
      // Launch the image picker
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setCurrentList({
          ...currentList,
          customIcon: result.assets[0].uri,
          useCustomIcon: true
        });
      }
    } catch (error) {
      console.log("Error picking image:", error);
      Alert.alert("Error", "There was a problem selecting the image");
    }
  };
  
  // Function to take a photo for an existing list
  const takePhotoForList = async () => {
    if (!currentList) return;
    
    try {
      // Request permission
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission needed", "Please grant permission to access your camera");
        return;
      }
      
      // Launch the camera
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setCurrentList({
          ...currentList,
          customIcon: result.assets[0].uri,
          useCustomIcon: true
        });
      }
    } catch (error) {
      console.log("Error taking photo:", error);
      Alert.alert("Error", "There was a problem capturing the photo");
    }
  };

  // Function to subscribe to a ministry resource
  const subscribeToResource = (ministry, resource) => {
    // Create a new list from the selected resource
    const newListData = {
      title: resource.title,
      description: `From ${ministry.name}: ${resource.description}`,
      icon: 'book',
      color: '#6366f1',
      customIcon: null,
      useCustomIcon: false,
      displayMode: 'all',
      displayCount: 1,
      frequency: 'daily',
      days: [true, true, true, true, true, true, true],
      timeSlot: 'morning',
      moments: [],
      source: {
        ministryId: ministry.id,
        ministryName: ministry.name,
        resourceId: resource.id,
        resourceTitle: resource.title
      }
    };
    
    const listId = `list-${Date.now()}`;
    const createdList = {
      ...newListData,
      id: listId,
    };
    
    setLists([...lists, createdList]);
    
    // Close the directory modal
    setShowDirectoryModal(false);
    setSelectedMinistry(null);
    setSelectedResource(null);
    
    // Show success message
    Alert.alert(
      'Subscribed Successfully',
      `You have subscribed to ${resource.title} from ${ministry.name}. New content will be added to your moments regularly.`,
      [{ text: 'OK' }]
    );
  };

  // Render each list item
  const renderListItem = ({ item }) => {
    return (
      <View className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
        <View className="flex-row items-center p-4 border-b border-gray-100">
          {item.useCustomIcon && item.customIcon ? (
            <View className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <Image 
                source={{ uri: item.customIcon }} 
                className="w-full h-full" 
                resizeMode="cover"
              />
            </View>
          ) : (
            <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: item.color }}>
              <Ionicons name={item.icon} size={20} color="#fff" />
            </View>
          )}
          <View className="flex-1">
            <Text className="font-bold text-lg">{item.title}</Text>
            <Text className="text-gray-500 text-xs">{item.description}</Text>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity 
              className="mr-4"
              onPress={() => {
                setCurrentList(item);
                setShowListSettingsModal(true);
              }}
            >
              <Ionicons name="settings-outline" size={22} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteList(item.id)}>
              <Ionicons name="trash-outline" size={22} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View className="p-3">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-medium">Moments ({item.moments.length})</Text>
            <TouchableOpacity 
              className="bg-indigo-50 px-2 py-1 rounded-full flex-row items-center"
              onPress={() => {
                setCurrentList(item);
                setShowMomentModal(true);
              }}
            >
              <Ionicons name="add" size={16} color="#6366f1" />
              <Text className="text-indigo-600 text-xs ml-1">Add Moment</Text>
            </TouchableOpacity>
          </View>
          
          {item.moments.length > 0 ? (
            item.moments.map(moment => (
              <View 
                key={moment.id} 
                className="bg-gray-50 rounded-md p-3 mb-2 flex-row items-center"
              >
                <View 
                  className="w-8 h-8 rounded-full items-center justify-center mr-2"
                  style={{ backgroundColor: momentTypes.find(t => t.id === moment.type)?.color || '#6b7280' }}
                >
                  <MaterialCommunityIcons 
                    name={momentTypes.find(t => t.id === moment.type)?.icon || 'help-circle'} 
                    size={16} 
                    color="#fff" 
                  />
                </View>
                <View className="flex-1">
                  <Text className="font-medium">{moment.title}</Text>
                  <Text className="text-gray-500 text-xs" numberOfLines={1}>{moment.content}</Text>
                </View>
                <TouchableOpacity onPress={() => deleteMoment(item.id, moment.id)}>
                  <Ionicons name="close-circle-outline" size={22} color="#6b7280" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View className="bg-gray-50 rounded-md p-4 items-center">
              <Text className="text-gray-400">No moments added yet</Text>
            </View>
          )}
        </View>
        
        <View className="bg-gray-50 p-3 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Ionicons name={timeSlots.find(t => t.id === item.timeSlot)?.icon || 'time-outline'} size={16} color="#6b7280" />
            <Text className="text-gray-500 text-xs ml-1">
              {timeSlots.find(t => t.id === item.timeSlot)?.title || 'Morning'}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={16} color="#6b7280" />
            <Text className="text-gray-500 text-xs ml-1">
              {frequencyOptions.find(f => f.id === item.frequency)?.title || 'Every Day'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // Render the new list modal
  const renderNewListModal = () => {
    return (
      <Modal
        visible={showNewListModal}
        animationType="slide"
        transparent={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <TouchableOpacity onPress={() => setShowNewListModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
              <Text className="text-xl font-bold">Create New List</Text>
              <TouchableOpacity 
                className="bg-indigo-600 px-3 py-1 rounded-lg"
                onPress={handleCreateList}
              >
                <Text className="text-white font-medium">Create</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              className="flex-1 px-4" 
              keyboardShouldPersistTaps="handled"
            >
              {/* List title and description */}
              <View className="mb-4">
                <Text className="font-medium mb-2">List Title *</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3 bg-white"
                  placeholder="e.g., Family Prayers"
                  value={newList.title}
                  onChangeText={(text) => setNewList({ ...newList, title: text })}
                />
              </View>
              
              <View className="mb-4">
                <Text className="font-medium mb-2">Description (Optional)</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3 bg-white"
                  placeholder="A short description of this list"
                  value={newList.description}
                  onChangeText={(text) => setNewList({ ...newList, description: text })}
                  multiline
                />
              </View>
              
              {/* Icon and color selection */}
              <View className="mb-4">
                <Text className="font-medium mb-2">Icon & Color</Text>
                
                {/* Custom image or default icons */}
                <View className="flex-row flex-wrap items-center">
                  {/* Custom icon display (if selected) */}
                  {newList.useCustomIcon && newList.customIcon && (
                    <View className="relative m-1">
                      <TouchableOpacity
                        className={`w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500`}
                        onPress={() => setNewList({ ...newList, useCustomIcon: false })}
                      >
                        <Image 
                          source={{ uri: newList.customIcon }} 
                          className="w-full h-full" 
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="absolute top-0 right-0 bg-gray-800/70 rounded-full p-1"
                        onPress={() => setNewList({ ...newList, customIcon: null, useCustomIcon: false })}
                      >
                        <Ionicons name="close" size={12} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  )}
                  
                  {/* Default icons */}
                  {!newList.useCustomIcon && ['people', 'heart', 'book', 'star', 'pray'].map(icon => (
                    <TouchableOpacity
                      key={icon}
                      className={`m-1 w-12 h-12 rounded-full items-center justify-center ${newList.icon === icon && !newList.useCustomIcon ? 'border-2 border-indigo-500' : ''}`}
                      style={{ backgroundColor: newList.color }}
                      onPress={() => setNewList({ ...newList, icon, useCustomIcon: false })}
                    >
                      <Ionicons name={icon} size={24} color="#fff" />
                    </TouchableOpacity>
                  ))}
                  
                  {/* Camera option */}
                  <TouchableOpacity
                    className="m-1 w-12 h-12 rounded-full items-center justify-center bg-gray-200"
                    onPress={takePhoto}
                  >
                    <Ionicons name="camera" size={24} color="#6b7280" />
                  </TouchableOpacity>
                  
                  {/* Photo library option */}
                  <TouchableOpacity
                    className="m-1 w-12 h-12 rounded-full items-center justify-center bg-gray-200"
                    onPress={pickImage}
                  >
                    <Ionicons name="image" size={24} color="#6b7280" />
                  </TouchableOpacity>
                </View>
                
                {/* Color selection */}
                <View className="flex-row flex-wrap mt-3">
                  {['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#3b82f6', '#f59e0b'].map(color => (
                    <TouchableOpacity
                      key={color}
                      className={`m-1 w-10 h-10 rounded-full items-center justify-center ${newList.color === color ? 'border-2 border-gray-800' : ''}`}
                      style={{ backgroundColor: color }}
                      onPress={() => setNewList({ ...newList, color })}
                    />
                  ))}
                </View>
              </View>
              
              {/* Time slot selection */}
              <View className="mb-4">
                <Text className="font-medium mb-2">When to Display</Text>
                <View className="flex-row flex-wrap">
                  {timeSlots.map(slot => (
                    <TouchableOpacity
                      key={slot.id}
                      className={`flex-row items-center bg-gray-50 rounded-full px-3 py-2 m-1 ${newList.timeSlot === slot.id ? 'bg-indigo-100 border border-indigo-300' : ''}`}
                      onPress={() => setNewList({ ...newList, timeSlot: slot.id })}
                    >
                      <Ionicons name={slot.icon} size={16} color={slot.color} />
                      <Text className="ml-1 text-gray-700">{slot.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              {/* Display mode selection */}
              <View className="mb-4">
                <Text className="font-medium mb-2">Display Mode</Text>
                {displayModeOptions.map(mode => (
                  <View key={mode.id}>
                    <TouchableOpacity
                      className={`flex-row items-center p-3 rounded-lg ${mode.id !== 'all' ? 'mb-1' : 'mb-2'} ${newList.displayMode === mode.id ? 'bg-indigo-50 border border-indigo-200' : 'bg-gray-50'}`}
                      onPress={() => setNewList({ ...newList, displayMode: mode.id })}
                    >
                      <View className="flex-1">
                        <Text className="font-medium">{mode.title}</Text>
                        <Text className="text-gray-500 text-xs">{mode.description}</Text>
                      </View>
                      {newList.displayMode === mode.id && (
                        <Ionicons name="checkmark-circle" size={24} color="#6366f1" />
                      )}
                    </TouchableOpacity>
                    
                    {/* Number picker for rotate and random modes */}
                    {newList.displayMode === mode.id && (mode.id === 'rotate' || mode.id === 'random') && (
                      <View className="bg-indigo-50 p-3 rounded-b-lg mb-2 flex-row items-center">
                        <Text className="flex-1 text-gray-700">Number of moments to display:</Text>
                        <View className="flex-row items-center border border-indigo-200 rounded-lg bg-white">
                          <TouchableOpacity
                            className="p-2"
                            onPress={() => setNewList(prev => ({ 
                              ...prev, 
                              displayCount: Math.max(1, prev.displayCount - 1) 
                            }))}
                            disabled={newList.displayCount <= 1}
                          >
                            <Ionicons 
                              name="remove" 
                              size={18} 
                              color={newList.displayCount <= 1 ? "#d1d5db" : "#6366f1"} 
                            />
                          </TouchableOpacity>
                          <Text className="px-2 font-bold text-gray-800 min-w-[30px] text-center">
                            {newList.displayCount}
                          </Text>
                          <TouchableOpacity
                            className="p-2"
                            onPress={() => setNewList(prev => ({ 
                              ...prev, 
                              displayCount: prev.displayCount + 1 
                            }))}
                          >
                            <Ionicons name="add" size={18} color="#6366f1" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                ))}
              </View>
              
              {/* Frequency selection */}
              <View className="mb-4">
                <Text className="font-medium mb-2">On Which Days</Text>
                <View className="flex-row flex-wrap mb-2">
                  {frequencyOptions.map(option => (
                    <TouchableOpacity
                      key={option.id}
                      className={`flex-row items-center bg-gray-50 rounded-full px-3 py-2 m-1 ${newList.frequency === option.id ? 'bg-indigo-100 border border-indigo-300' : ''}`}
                      onPress={() => setNewList({ ...newList, frequency: option.id })}
                    >
                      <Text className="text-gray-700">{option.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                
                {newList.frequency === 'custom' && (
                  <View className="flex-row justify-evenly bg-gray-50 p-3 rounded-lg">
                    {dayLabels.map((day, index) => (
                      <TouchableOpacity
                        key={index}
                        className={`w-10 h-10 rounded-full items-center justify-center ${newList.days[index] ? 'bg-indigo-600' : 'bg-gray-200'}`}
                        onPress={() => {
                          const updatedDays = [...newList.days];
                          updatedDays[index] = !updatedDays[index];
                          setNewList({ ...newList, days: updatedDays });
                        }}
                      >
                        <Text className={`font-medium ${newList.days[index] ? 'text-white' : 'text-gray-500'}`}>{day}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </ScrollView>
            {/* Add padding at the bottom for keyboard */}
            <View style={{ height: 30 }} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  // Render the new moment modal
  const renderMomentModal = () => {
    return (
      <Modal
        visible={showMomentModal}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View 
            className="bg-white rounded-t-xl" 
            style={{ paddingBottom: insets.bottom }}
          >
            <View className="p-4 border-b border-gray-200">
              <Text className="text-xl font-bold text-center">Add New Moment</Text>
              {currentList && (
                <Text className="text-center text-gray-500">to {currentList.title}</Text>
              )}
            </View>
            
            <View className="p-4">
              {/* Moment title */}
              <View className="mb-4">
                <Text className="font-medium mb-2">Moment Title *</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3 bg-white"
                  placeholder="e.g., Prayer for Guidance"
                  value={newMoment.title}
                  onChangeText={(text) => setNewMoment({ ...newMoment, title: text })}
                />
              </View>
              
              {/* Moment type */}
              <View className="mb-4">
                <Text className="font-medium mb-2">Moment Type</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {momentTypes.map(type => (
                    <TouchableOpacity
                      key={type.id}
                      className={`flex-row items-center rounded-full px-3 py-2 mr-2 ${newMoment.type === type.id ? 'bg-opacity-20' : 'bg-gray-50'}`}
                      style={{ backgroundColor: newMoment.type === type.id ? `${type.color}30` : undefined }}
                      onPress={() => setNewMoment({ ...newMoment, type: type.id })}
                    >
                      <MaterialCommunityIcons name={type.icon} size={16} color={type.color} />
                      <Text className="ml-1 text-gray-700">{type.title}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              
              {/* Moment content */}
              <View className="mb-4">
                <Text className="font-medium mb-2">Content *</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3 bg-white min-h-[150px]"
                  placeholder="Enter your moment content here..."
                  value={newMoment.content}
                  onChangeText={(text) => setNewMoment({ ...newMoment, content: text })}
                  multiline
                  textAlignVertical="top"
                />
              </View>
            </View>
            
            <View className="p-4 flex-row justify-end border-t border-gray-200">
              <TouchableOpacity 
                className="bg-gray-200 px-4 py-2 rounded-lg mr-2"
                onPress={() => setShowMomentModal(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="bg-indigo-600 px-4 py-2 rounded-lg"
                onPress={handleCreateMoment}
              >
                <Text className="text-white font-semibold">Add Moment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // Render the list settings modal
  const renderListSettingsModal = () => {
    if (!currentList) return null;
    
    return (
      <Modal
        visible={showListSettingsModal}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View 
            className="bg-white rounded-t-xl" 
            style={{ paddingBottom: insets.bottom }}
          >
            <View className="p-4 border-b border-gray-200">
              <Text className="text-xl font-bold text-center">List Settings</Text>
              <Text className="text-center text-gray-500">{currentList.title}</Text>
            </View>
            
            <ScrollView className="p-4 max-h-[500px]">
              {/* List title and description */}
              <View className="mb-4">
                <Text className="font-medium mb-2">List Title</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3 bg-white"
                  value={currentList.title}
                  onChangeText={(text) => setCurrentList({ ...currentList, title: text })}
                />
              </View>
              
              <View className="mb-4">
                <Text className="font-medium mb-2">Description</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3 bg-white"
                  value={currentList.description}
                  onChangeText={(text) => setCurrentList({ ...currentList, description: text })}
                  multiline
                />
              </View>
              
              {/* Icon and color selection */}
              <View className="mb-4">
                <Text className="font-medium mb-2">Icon & Color</Text>
                
                {/* Custom image or default icons */}
                <View className="flex-row flex-wrap items-center">
                  {/* Custom icon display (if selected) */}
                  {currentList.useCustomIcon && currentList.customIcon && (
                    <View className="relative m-1">
                      <TouchableOpacity
                        className={`w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500`}
                        onPress={() => setCurrentList({ ...currentList, useCustomIcon: false })}
                      >
                        <Image 
                          source={{ uri: currentList.customIcon }} 
                          className="w-full h-full" 
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="absolute top-0 right-0 bg-gray-800/70 rounded-full p-1"
                        onPress={() => setCurrentList({ ...currentList, customIcon: null, useCustomIcon: false })}
                      >
                        <Ionicons name="close" size={12} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  )}
                  
                  {/* Default icons */}
                  {!currentList.useCustomIcon && ['people', 'heart', 'book', 'star', 'pray'].map(icon => (
                    <TouchableOpacity
                      key={icon}
                      className={`m-1 w-12 h-12 rounded-full items-center justify-center ${currentList.icon === icon ? 'border-2 border-indigo-500' : ''}`}
                      style={{ backgroundColor: currentList.color }}
                      onPress={() => setCurrentList({ ...currentList, icon, useCustomIcon: false })}
                    >
                      <Ionicons name={icon} size={24} color="#fff" />
                    </TouchableOpacity>
                  ))}
                  
                  {/* Camera option */}
                  <TouchableOpacity
                    className="m-1 w-12 h-12 rounded-full items-center justify-center bg-gray-200"
                    onPress={takePhotoForList}
                  >
                    <Ionicons name="camera" size={24} color="#6b7280" />
                  </TouchableOpacity>
                  
                  {/* Photo library option */}
                  <TouchableOpacity
                    className="m-1 w-12 h-12 rounded-full items-center justify-center bg-gray-200"
                    onPress={pickImageForList}
                  >
                    <Ionicons name="image" size={24} color="#6b7280" />
                  </TouchableOpacity>
                </View>
                
                {/* Color selection */}
                <View className="flex-row flex-wrap mt-3">
                  {['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#3b82f6', '#f59e0b'].map(color => (
                    <TouchableOpacity
                      key={color}
                      className={`m-1 w-10 h-10 rounded-full items-center justify-center ${currentList.color === color ? 'border-2 border-gray-800' : ''}`}
                      style={{ backgroundColor: color }}
                      onPress={() => setCurrentList({ ...currentList, color })}
                    />
                  ))}
                </View>
              </View>
              
              {/* Time slot selection */}
              <View className="mb-4">
                <Text className="font-medium mb-2">When to Display</Text>
                <View className="flex-row flex-wrap">
                  {timeSlots.map(slot => (
                    <TouchableOpacity
                      key={slot.id}
                      className={`flex-row items-center bg-gray-50 rounded-full px-3 py-2 m-1 ${currentList.timeSlot === slot.id ? 'bg-indigo-100 border border-indigo-300' : ''}`}
                      onPress={() => setCurrentList({ ...currentList, timeSlot: slot.id })}
                    >
                      <Ionicons name={slot.icon} size={16} color={slot.color} />
                      <Text className="ml-1 text-gray-700">{slot.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              {/* Display mode selection */}
              <View className="mb-4">
                <Text className="font-medium mb-2">Display Mode</Text>
                {displayModeOptions.map(mode => (
                  <View key={mode.id}>
                    <TouchableOpacity
                      className={`flex-row items-center p-3 rounded-lg ${mode.id !== 'all' ? 'mb-1' : 'mb-2'} ${currentList.displayMode === mode.id ? 'bg-indigo-50 border border-indigo-200' : 'bg-gray-50'}`}
                      onPress={() => setCurrentList({ ...currentList, displayMode: mode.id })}
                    >
                      <View className="flex-1">
                        <Text className="font-medium">{mode.title}</Text>
                        <Text className="text-gray-500 text-xs">{mode.description}</Text>
                      </View>
                      {currentList.displayMode === mode.id && (
                        <Ionicons name="checkmark-circle" size={24} color="#6366f1" />
                      )}
                    </TouchableOpacity>
                    
                    {/* Number picker for rotate and random modes */}
                    {currentList.displayMode === mode.id && (mode.id === 'rotate' || mode.id === 'random') && (
                      <View className="bg-indigo-50 p-3 rounded-b-lg mb-2 flex-row items-center">
                        <Text className="flex-1 text-gray-700">Number of moments to display:</Text>
                        <View className="flex-row items-center border border-indigo-200 rounded-lg bg-white">
                          <TouchableOpacity
                            className="p-2"
                            onPress={() => setCurrentList(prev => ({ 
                              ...prev, 
                              displayCount: Math.max(1, prev.displayCount - 1) 
                            }))}
                            disabled={currentList.displayCount <= 1}
                          >
                            <Ionicons 
                              name="remove" 
                              size={18} 
                              color={currentList.displayCount <= 1 ? "#d1d5db" : "#6366f1"} 
                            />
                          </TouchableOpacity>
                          <Text className="px-2 font-bold text-gray-800 min-w-[30px] text-center">
                            {currentList.displayCount}
                          </Text>
                          <TouchableOpacity
                            className="p-2"
                            onPress={() => setCurrentList(prev => ({ 
                              ...prev, 
                              displayCount: prev.displayCount + 1 
                            }))}
                          >
                            <Ionicons name="add" size={18} color="#6366f1" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                ))}
              </View>
              
              {/* Frequency selection */}
              <View className="mb-4">
                <Text className="font-medium mb-2">On Which Days</Text>
                <View className="flex-row flex-wrap mb-2">
                  {frequencyOptions.map(option => (
                    <TouchableOpacity
                      key={option.id}
                      className={`flex-row items-center bg-gray-50 rounded-full px-3 py-2 m-1 ${currentList.frequency === option.id ? 'bg-indigo-100 border border-indigo-300' : ''}`}
                      onPress={() => setCurrentList({ ...currentList, frequency: option.id })}
                    >
                      <Text className="text-gray-700">{option.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                
                {currentList.frequency === 'custom' && (
                  <View className="flex-row justify-evenly bg-gray-50 p-3 rounded-lg">
                    {dayLabels.map((day, index) => (
                      <TouchableOpacity
                        key={index}
                        className={`w-10 h-10 rounded-full items-center justify-center ${currentList.days[index] ? 'bg-indigo-600' : 'bg-gray-200'}`}
                        onPress={() => toggleDay(index)}
                      >
                        <Text className={`font-medium ${currentList.days[index] ? 'text-white' : 'text-gray-500'}`}>{day}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </ScrollView>
            
            <View className="p-4 flex-row justify-end border-t border-gray-200">
              <TouchableOpacity 
                className="bg-gray-200 px-4 py-2 rounded-lg mr-2"
                onPress={() => setShowListSettingsModal(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="bg-indigo-600 px-4 py-2 rounded-lg"
                onPress={handleUpdateListSettings}
              >
                <Text className="text-white font-semibold">Save Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // Render the Christian ministries directory modal
  const renderDirectoryModal = () => {
    return (
      <Modal
        visible={showDirectoryModal}
        animationType="slide"
        transparent={false}
      >
        <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <TouchableOpacity 
              onPress={() => {
                setShowDirectoryModal(false);
                setSelectedMinistry(null);
                setSelectedResource(null);
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text className="text-xl font-bold">
              {selectedMinistry ? selectedMinistry.name : 'Christian Ministries Directory'}
            </Text>
            <View style={{ width: 24 }} />
          </View>
          
          <ScrollView className="flex-1">
            {!selectedMinistry ? (
              // Show list of ministries
              <View className="p-4">
                <Text className="text-gray-700 mb-6">
                  Discover and subscribe to daily devotionals, prayer guides, and spiritual content from trusted Christian ministries.
                </Text>
                
                {christianMinistries.map(ministry => (
                  <TouchableOpacity
                    key={ministry.id}
                    className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden"
                    onPress={() => setSelectedMinistry(ministry)}
                  >
                    <View className="flex-row p-4">
                      <Image 
                        source={{ uri: ministry.logo }} 
                        className="w-16 h-16 rounded-lg"
                        resizeMode="cover"
                      />
                      <View className="flex-1 ml-3 justify-center">
                        <View className="flex-row items-center">
                          <Text className="font-bold text-lg">{ministry.name}</Text>
                          {ministry.verified && (
                            <Ionicons name="checkmark-circle" size={16} color="#3b82f6" className="ml-1" />
                          )}
                        </View>
                        <Text className="text-gray-600 text-sm">{ministry.description}</Text>
                        <Text className="text-indigo-600 text-xs mt-1">
                          {ministry.resources.length} resource{ministry.resources.length !== 1 ? 's' : ''}
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              // Show ministry resources
              <View className="p-4">
                <View className="flex-row mb-6">
                  <Image 
                    source={{ uri: selectedMinistry.logo }} 
                    className="w-16 h-16 rounded-lg"
                    resizeMode="cover"
                  />
                  <View className="flex-1 ml-3 justify-center">
                    <View className="flex-row items-center">
                      <Text className="font-bold text-lg">{selectedMinistry.name}</Text>
                      {selectedMinistry.verified && (
                        <Ionicons name="checkmark-circle" size={16} color="#3b82f6" className="ml-1" />
                      )}
                    </View>
                    <Text className="text-gray-600 text-sm">{selectedMinistry.description}</Text>
                  </View>
                </View>
                
                <Text className="font-bold text-lg mb-3">Available Resources</Text>
                
                {selectedMinistry.resources.map(resource => (
                  <View 
                    key={resource.id} 
                    className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden"
                  >
                    <Image 
                      source={{ uri: resource.preview }} 
                      className="w-full h-40"
                      resizeMode="cover"
                    />
                    <View className="p-4">
                      <View className="flex-row justify-between items-start">
                        <Text className="font-bold text-lg">{resource.title}</Text>
                        <View className="bg-blue-100 px-2 py-1 rounded-full">
                          <Text className="text-blue-800 text-xs">{resource.frequency}</Text>
                        </View>
                      </View>
                      <Text className="text-gray-600 my-2">{resource.description}</Text>
                      <View className="flex-row">
                        <TouchableOpacity
                          className="bg-indigo-600 px-4 py-2 rounded-lg flex-1"
                          onPress={() => subscribeToResource(selectedMinistry, resource)}
                        >
                          <Text className="text-white font-semibold text-center">Subscribe</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    );
  };

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row justify-between items-center p-4 border-b border-gray-200 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">My Moments</Text>
        <View className="flex-row">
          <TouchableOpacity 
            className="mr-3"
            onPress={() => setShowDirectoryModal(true)}
          >
            <Ionicons name="compass" size={24} color="#3b82f6" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowNewListModal(true)}>
            <Ionicons name="add-circle" size={24} color="#6366f1" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Main content */}
      {lists.length > 0 ? (
        <FlatList
          data={lists}
          renderItem={renderListItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16 }}
        />
      ) : (
        <View className="flex-1 justify-center items-center p-4">
          <View className="w-20 h-20 rounded-full bg-indigo-100 items-center justify-center mb-4">
            <Ionicons name="book-outline" size={40} color="#6366f1" />
          </View>
          <Text className="text-lg font-bold text-center mb-2">No Moment Lists Yet</Text>
          <Text className="text-gray-500 text-center mb-4">
            Create your first moment list to add custom prayers, scripture, and reflections
          </Text>
          <TouchableOpacity
            className="bg-indigo-600 px-4 py-3 rounded-lg mb-3"
            onPress={() => setShowNewListModal(true)}
          >
            <Text className="text-white font-semibold">Create Your First List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-50 px-4 py-3 rounded-lg flex-row items-center"
            onPress={() => setShowDirectoryModal(true)}
          >
            <Ionicons name="search" size={18} color="#3b82f6" />
            <Text className="text-blue-700 font-medium ml-2">Discover Christian Ministry Content</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Modals */}
      {renderNewListModal()}
      {renderMomentModal()}
      {renderListSettingsModal()}
      {renderDirectoryModal()}
    </View>
  );
};

export default MomentCreationScreen; 