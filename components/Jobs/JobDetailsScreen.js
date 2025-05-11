import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList
} from 'react-native';
import { DUMMY_JOBS } from './JobsScreen';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const JobDetailsScreen = ({ route, navigation }) => {
  const { jobId } = route.params;
  const job = DUMMY_JOBS.find(job => job.id === jobId);
  const [bookmarked, setBookmarked] = useState(false);
  
  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };
  
  if (!job) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Job not found</Text>
        <TouchableOpacity 
          className="mt-4 bg-indigo-600 px-4 py-2 rounded-md"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  
  const renderMediaItem = ({ item }) => (
    <Image 
      source={{ uri: item }} 
      style={{ 
        width: width - 32, 
        height: 200, 
        borderRadius: 8,
        marginRight: 16,
      }} 
      resizeMode="cover" 
    />
  );
  
  const renderListItem = (item, index) => (
    <View key={index} className="flex-row mb-2">
      <View className="h-2 w-2 bg-indigo-600 rounded-full mt-2 mr-2" />
      <Text className="text-gray-800 flex-1">{item}</Text>
    </View>
  );
  
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-indigo-900 p-6">
          <View className="flex-row justify-between mb-4">
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
            >
              <Text className="text-white">← Back to Jobs</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={toggleBookmark}
              className="h-8 w-8 items-center justify-center"
            >
              {bookmarked ? (
                <Ionicons name="bookmark" size={24} color="#ffffff" />
              ) : (
                <Ionicons name="bookmark-outline" size={24} color="#ffffff" />
              )}
            </TouchableOpacity>
          </View>
          
          <View className="flex-row mb-4">
            <Image 
              source={{ uri: job.logoUrl }} 
              className="w-20 h-20 rounded-xl bg-white p-1"
            />
            <View className="ml-4 flex-1">
              <Text className="text-2xl font-bold text-white">{job.title}</Text>
              <Text className="text-lg text-indigo-200">{job.company}</Text>
              <Text className="text-indigo-300">{job.location}</Text>
            </View>
          </View>
          
          <View className="flex-row">
            <View className="bg-indigo-800 rounded-full px-3 py-1 mr-2">
              <Text className="text-white">{job.type}</Text>
            </View>
            <View className="bg-indigo-800 rounded-full px-3 py-1">
              <Text className="text-white">{job.salary}</Text>
            </View>
          </View>
        </View>
        
        {/* Job Description */}
        <View className="bg-white p-6 mb-3">
          <Text className="text-xl font-bold text-gray-800 mb-3">Job Description</Text>
          <Text className="text-gray-600 leading-6 mb-6">{job.description}</Text>
          
          <TouchableOpacity className="bg-indigo-600 py-3 rounded-lg items-center">
            <Text className="text-white font-bold text-lg">Apply Now</Text>
          </TouchableOpacity>
        </View>
        
        {/* Requirements */}
        <View className="bg-white p-6 mb-3">
          <Text className="text-xl font-bold text-gray-800 mb-3">Requirements</Text>
          <View>
            {job.requirements.map(renderListItem)}
          </View>
        </View>
        
        {/* Responsibilities */}
        <View className="bg-white p-6 mb-3">
          <Text className="text-xl font-bold text-gray-800 mb-3">Responsibilities</Text>
          <View>
            {job.responsibilities.map(renderListItem)}
          </View>
        </View>
        
        {/* About Company */}
        <View className="bg-white p-6 mb-3">
          <Text className="text-xl font-bold text-gray-800 mb-3">About {job.company}</Text>
          <Text className="text-gray-600 leading-6 mb-4">{job.companyDescription}</Text>
          
          {/* Company Media */}
          <Text className="text-lg font-semibold text-gray-800 mb-3">Company Highlights</Text>
          <FlatList
            data={job.companyMedia}
            renderItem={renderMediaItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
            snapToInterval={width - 16}
            decelerationRate="fast"
            contentContainerStyle={{ paddingRight: 16 }}
          />
        </View>
        
        {/* Similar Jobs */}
        <View className="bg-white p-6 mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-3">Similar Jobs</Text>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-semibold text-gray-800">More jobs at {job.company}</Text>
              <Text className="text-gray-500">View all openings</Text>
            </View>
            <TouchableOpacity className="bg-indigo-100 p-2 rounded-lg">
              <Text className="text-indigo-800">See All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetailsScreen; 