import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Switch,
  Platform,
  Animated,
  PanResponder,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TimePicker from 'react-native-wheel-time-picker';

// Re-use the sample data from MomentStories
const sampleMoments = [
  {
    id: 'moment1',
    title: 'Morning Prayer',
    time: '07:00',
    user: {
      id: 'user1',
      name: 'Emma Taylor',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    enabled: true,
    category: 'prayer'
  },
  {
    id: 'moment2',
    title: 'Daily Verse',
    time: '12:00',
    user: {
      id: 'user2',
      name: 'Daily Light',
      avatar: 'https://i.imgur.com/NE0e3Dt.png'
    },
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    enabled: true,
    category: 'scripture'
  },
  {
    id: 'moment3',
    title: 'Evening Reflection',
    time: '19:30',
    user: {
      id: 'user3',
      name: 'Pastor David',
      avatar: 'https://randomuser.me/api/portraits/men/85.jpg'
    },
    image: 'https://images.unsplash.com/photo-1510137200597-2c01abeff42a?auto=format&fit=crop&w=500&q=60',
    viewed: true,
    enabled: true,
    category: 'reflection'
  },
  {
    id: 'moment4',
    title: 'Night Devotion',
    time: '21:45',
    user: {
      id: 'user4',
      name: 'Peace & Rest',
      avatar: 'https://i.imgur.com/H4PnCGh.png'
    },
    image: 'https://images.unsplash.com/photo-1488866022504-f2584929ca5f?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    enabled: true,
    category: 'devotion'
  },
  {
    id: 'moment5',
    title: 'World Prayer',
    time: '16:00',
    user: {
      id: 'user5',
      name: 'Global Mission',
      avatar: 'https://i.imgur.com/4QgRC0A.png'
    },
    image: 'https://images.unsplash.com/photo-1589483233147-8c6e2fb175a5?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    enabled: false,
    category: 'prayer'
  }
];

// Available categories for moments
const categories = [
  { id: 'prayer', name: 'Prayer', color: '#6366f1', icon: 'praying-hands' }, // Indigo
  { id: 'scripture', name: 'Scripture', color: '#8b5cf6', icon: 'book-bible' }, // Purple
  { id: 'devotion', name: 'Devotion', color: '#ec4899', icon: 'candle' }, // Pink
  { id: 'reflection', name: 'Reflection', color: '#10b981', icon: 'lightbulb-on' }, // Green
  { id: 'praise', name: 'Praise', color: '#f59e0b', icon: 'music' }, // Amber
  { id: 'meditation', name: 'Meditation', color: '#3b82f6', icon: 'meditation' }, // Blue
];

// Helper to get icon for category
const getCategoryIcon = (categoryId) => {
  const category = categories.find(c => c.id === categoryId);
  return category?.icon || 'help-circle-outline';
};

// Helper to get color for category
const getCategoryColor = (categoryId) => {
  const category = categories.find(c => c.id === categoryId);
  return category?.color || '#6b7280';
};

// Time slots for the daily schedule
const timeSlots = [
  { id: 'morning', name: 'Morning', startTime: '06:00', endTime: '10:00' },
  { id: 'midday', name: 'Midday', startTime: '10:00', endTime: '14:00' },
  { id: 'afternoon', name: 'Afternoon', startTime: '14:00', endTime: '18:00' },
  { id: 'evening', name: 'Evening', startTime: '18:00', endTime: '22:00' },
  { id: 'night', name: 'Night', startTime: '22:00', endTime: '06:00' },
];

// Get time slot for a given time
const getTimeSlot = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  const timeValue = hours * 60 + minutes;
  
  for (const slot of timeSlots) {
    const [startHours, startMinutes] = slot.startTime.split(':').map(Number);
    const [endHours, endMinutes] = slot.endTime.split(':').map(Number);
    
    const startValue = startHours * 60 + startMinutes;
    let endValue = endHours * 60 + endMinutes;
    
    // Handle cases where end time is on the next day
    if (endValue < startValue) {
      endValue += 24 * 60;
      
      // Adjust timeValue for comparison (add 24 hours if it's before the start time)
      const adjustedTimeValue = timeValue < startValue ? timeValue + 24 * 60 : timeValue;
      
      if (adjustedTimeValue >= startValue && adjustedTimeValue < endValue) {
        return slot;
      }
    } else {
      // Normal case
      if (timeValue >= startValue && timeValue < endValue) {
        return slot;
      }
    }
  }
  
  return timeSlots[0]; // Default to morning if no match found
};

// Helper to format time as HH:MM
const formatTime = (hours, minutes) => {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// Draggable moment card component
const MomentCard = ({ moment, onTimeChange, onToggle, isActive, onDrag, dragProps }) => {
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [hours, setHours] = useState(parseInt(moment.time.split(':')[0]));
  const [minutes, setMinutes] = useState(parseInt(moment.time.split(':')[1]));
  
  // Fallback image
  const getFallbackImage = () => {
    return `https://via.placeholder.com/100x100/${getCategoryColor(moment.category).replace('#', '')}/ffffff?text=${moment.title.substring(0, 1)}`;
  };
  
  // Time picker handlers
  const handleTimeConfirm = () => {
    const newTime = formatTime(hours, minutes);
    onTimeChange(moment.id, newTime);
    setTimePickerVisible(false);
  };
  
  return (
    <Animated.View 
      {...dragProps}
      className="mb-4"
    >
      <TouchableOpacity
        className={`bg-white rounded-lg border shadow-sm overflow-hidden mb-1 ${
          isActive ? 'border-indigo-500' : 'border-gray-200'
        }`}
        onPress={() => setTimePickerVisible(true)}
        activeOpacity={0.7}
      >
        <View className="flex-row">
          <Image
            source={{ uri: imageError ? getFallbackImage() : moment.image }}
            className="w-16 h-full"
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
          
          <View className="flex-1 p-2">
            <View className="flex-row justify-between items-start mb-1">
              <View className="flex-row items-center">
                <View 
                  className="w-5 h-5 rounded-full items-center justify-center mr-1"
                  style={{ backgroundColor: getCategoryColor(moment.category) }}
                >
                  <MaterialIcons name={getCategoryIcon(moment.category)} size={12} color="#fff" />
                </View>
                <Text className="font-bold">{moment.title}</Text>
              </View>
              <Switch
                value={moment.enabled}
                onValueChange={(value) => onToggle(moment.id, value)}
                trackColor={{ false: '#d1d5db', true: '#c7d2fe' }}
                thumbColor={moment.enabled ? '#6366f1' : '#f4f4f5'}
              />
            </View>
            
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Image 
                  source={{ uri: moment.user.avatar }}
                  className="w-4 h-4 rounded-full mr-1"
                  resizeMode="cover"
                />
                <Text className="text-xs text-gray-500">{moment.user.name}</Text>
              </View>
              
              <TouchableOpacity 
                className="flex-row items-center bg-indigo-50 px-2 py-1 rounded"
                onPress={() => setTimePickerVisible(true)}
              >
                <Ionicons name="time-outline" size={14} color="#6366f1" />
                <Text className="text-xs text-indigo-600 font-semibold ml-1">{moment.time}</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            className="w-8 items-center justify-center bg-gray-100"
            onPressIn={() => onDrag(moment.id)}
          >
            <MaterialIcons name="drag-handle" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      
      {/* Time picker modal */}
      {timePickerVisible && (
        <View className="bg-white rounded-lg shadow-lg p-4 mb-2">
          <Text className="text-lg font-bold text-center mb-4">Set Time for {moment.title}</Text>
          
          <View className="items-center">
            <TimePicker
              containerStyle={{ height: 180 }}
              itemHeight={40}
              textStyle={{ fontSize: 18 }}
              value={{ hours, minutes }}
              onChange={(newHours, newMinutes) => {
                setHours(newHours);
                setMinutes(newMinutes);
              }}
              use12Hours={false}
            />
          </View>
          
          <View className="flex-row justify-end mt-4">
            <TouchableOpacity
              className="bg-gray-200 px-4 py-2 rounded-lg mr-2"
              onPress={() => setTimePickerVisible(false)}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-indigo-600 px-4 py-2 rounded-lg"
              onPress={handleTimeConfirm}
            >
              <Text className="text-white font-semibold">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Animated.View>
  );
};

// Time slot component to visually organize the schedule
const TimeSlotSection = ({ slot, moments, onTimeChange, onToggle, activeMoment, onDrag }) => {
  // Helper to check if a moment is in this time slot
  const isMomentInSlot = (moment) => {
    const timeSlot = getTimeSlot(moment.time);
    return timeSlot.id === slot.id;
  };
  
  // Filter moments for this time slot
  const slotMoments = moments.filter(isMomentInSlot);
  
  // Determine gradient colors based on time of day
  const getSlotGradient = () => {
    switch(slot.id) {
      case 'morning': return ['#fef3c7', '#fef9c3']; // Light yellow
      case 'midday': return ['#e0f2fe', '#cffafe']; // Light blue
      case 'afternoon': return ['#dcfce7', '#d1fae5']; // Light green
      case 'evening': return ['#ddd6fe', '#e0e7ff']; // Light purple
      case 'night': return ['#e0e7ff', '#dbeafe']; // Light indigo
      default: return ['#f9fafb', '#f3f4f6']; // Light gray
    }
  };
  
  return (
    <View className="mb-6">
      <View className="flex-row items-center bg-gray-100 rounded-t-lg px-3 py-2">
        <Ionicons
          name={
            slot.id === 'morning' ? 'sunny-outline' :
            slot.id === 'midday' ? 'sunny-outline' :
            slot.id === 'afternoon' ? 'partly-sunny-outline' :
            slot.id === 'evening' ? 'moon-outline' :
            'cloudy-night-outline'
          }
          size={18}
          color="#6b7280"
          style={{ marginRight: 6 }}
        />
        <Text className="font-semibold text-gray-700">{slot.name}</Text>
        <Text className="text-xs text-gray-500 ml-2">
          {slot.startTime} - {slot.endTime}
        </Text>
      </View>
      
      <View 
        className="bg-white border border-gray-200 rounded-b-lg p-2"
        style={{ minHeight: 80 }}
      >
        {slotMoments.length > 0 ? (
          slotMoments.map(moment => (
            <MomentCard
              key={moment.id}
              moment={moment}
              onTimeChange={onTimeChange}
              onToggle={onToggle}
              isActive={activeMoment === moment.id}
              onDrag={onDrag}
              dragProps={{}}
            />
          ))
        ) : (
          <View className="flex-1 items-center justify-center py-4">
            <Text className="text-gray-400 text-sm">No moments scheduled</Text>
            <Text className="text-gray-400 text-xs">Drag moments here</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const MomentArrangeScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [moments, setMoments] = useState(sampleMoments);
  const [activeMoment, setActiveMoment] = useState(null);
  const [activeTab, setActiveTab] = useState('schedule'); // 'schedule' or 'discover'
  
  // Handle time change for a moment
  const handleTimeChange = (momentId, newTime) => {
    setMoments(moments.map(moment => 
      moment.id === momentId ? { ...moment, time: newTime } : moment
    ));
  };
  
  // Toggle moment enabled state
  const handleToggle = (momentId, enabled) => {
    setMoments(moments.map(moment => 
      moment.id === momentId ? { ...moment, enabled } : moment
    ));
  };
  
  // Handle drag start for a moment
  const handleDragStart = (momentId) => {
    setActiveMoment(momentId);
  };
  
  // Handle saving the arrangement
  const handleSave = () => {
    // In a real app, this would save to a backend or local storage
    console.log('Saving arrangement:', moments);
    navigation.goBack();
  };
  
  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Arrange Moments</Text>
        <TouchableOpacity onPress={handleSave} className="bg-indigo-600 px-3 py-1 rounded">
          <Text className="text-white font-medium">Save</Text>
        </TouchableOpacity>
      </View>
      
      {/* Tabs */}
      <View className="flex-row border-b border-gray-200">
        <TouchableOpacity
          className={`flex-1 py-3 ${activeTab === 'schedule' ? 'border-b-2 border-indigo-600' : ''}`}
          onPress={() => setActiveTab('schedule')}
        >
          <Text className={`text-center font-medium ${activeTab === 'schedule' ? 'text-indigo-600' : 'text-gray-500'}`}>
            Your Schedule
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 ${activeTab === 'discover' ? 'border-b-2 border-indigo-600' : ''}`}
          onPress={() => setActiveTab('discover')}
        >
          <Text className={`text-center font-medium ${activeTab === 'discover' ? 'text-indigo-600' : 'text-gray-500'}`}>
            Discover More
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'schedule' ? (
        <ScrollView className="flex-1 p-4">
          {/* Daily schedule section */}
          <Text className="text-lg font-bold mb-2">Daily Schedule</Text>
          <Text className="text-gray-600 mb-4">
            Arrange your moments by time of day. Drag moments to reorder or tap to set specific times.
          </Text>
          
          {/* Time slots */}
          {timeSlots.map(slot => (
            <TimeSlotSection
              key={slot.id}
              slot={slot}
              moments={moments}
              onTimeChange={handleTimeChange}
              onToggle={handleToggle}
              activeMoment={activeMoment}
              onDrag={handleDragStart}
            />
          ))}
          
          <View className="h-20" />
        </ScrollView>
      ) : (
        <ScrollView className="flex-1 p-4">
          <Text className="text-lg font-bold mb-2">Discover New Moments</Text>
          <Text className="text-gray-600 mb-4">
            Explore and add new content to your daily spiritual journey.
          </Text>
          
          {/* Categories */}
          <View className="flex-row flex-wrap mb-4">
            {categories.map(category => (
              <TouchableOpacity 
                key={category.id}
                className="bg-white border border-gray-200 rounded-full px-3 py-1 mr-2 mb-2 flex-row items-center"
                style={{ borderColor: category.color }}
              >
                <MaterialIcons name={category.icon} size={16} color={category.color} />
                <Text className="ml-1 font-medium" style={{ color: category.color }}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Featured moments */}
          <Text className="font-semibold text-gray-700 mb-2">Featured Content</Text>
          <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <Text className="text-lg font-bold">30 Days of Prayer</Text>
            <Text className="text-gray-600 mb-2">A guided journey through intentional prayer</Text>
            <TouchableOpacity className="bg-indigo-600 rounded-lg py-2 items-center">
              <Text className="text-white font-semibold">Add to Your Schedule</Text>
            </TouchableOpacity>
          </View>
          
          <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <Text className="text-lg font-bold">Scripture for Anxiety</Text>
            <Text className="text-gray-600 mb-2">Daily verses to combat worry and fear</Text>
            <TouchableOpacity className="bg-indigo-600 rounded-lg py-2 items-center">
              <Text className="text-white font-semibold">Add to Your Schedule</Text>
            </TouchableOpacity>
          </View>
          
          <View className="h-20" />
        </ScrollView>
      )}
    </View>
  );
};

export default MomentArrangeScreen; 