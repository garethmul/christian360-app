import React from 'react';
import { View, Text, FlatList, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import EventCard from './EventCard';

export const DUMMY_EVENTS = [
  {
    id: '1',
    title: 'Annual Worship Conference',
    organizer: 'Grace Community Church',
    organizerLogo: 'https://randomuser.me/api/portraits/lego/1.jpg',
    date: 'Oct 15-17, 2023',
    time: '9:00 AM - 5:00 PM',
    location: 'Nashville Convention Center',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29yc2hpcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 'From $99',
    attendees: 325,
    description: 'Join us for our annual three-day worship conference featuring top Christian artists and speakers. This event is designed for worship leaders, musicians, and anyone passionate about worship in the church.',
    speakers: [
      'John Smith - Lead Pastor, Grace Community Church',
      'Sarah Johnson - Worship Leader, Hillsong',
      'Michael Brown - Grammy-winning Christian Artist'
    ],
    schedule: [
      'Day 1: Registration, Opening Ceremony, Worship Night',
      'Day 2: Workshops, Panel Discussions, Concert',
      'Day 3: Specialized Training, Closing Ceremony'
    ],
    media: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29yc2hpcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d29yc2hpcCUyMHRlYW18ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1628613779039-57c17a980846?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y29uZmVyZW5jZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
    ],
    videoUrl: 'https://player.vimeo.com/external/477205263.sd.mp4?s=b93bce8b2b3bde0f26b7480134843130ab247781&profile_id=165&oauth2_token_id=57447761'
  },
  {
    id: '2',
    title: 'Women\'s Bible Study Retreat',
    organizer: 'First Baptist Church',
    organizerLogo: 'https://randomuser.me/api/portraits/lego/2.jpg',
    date: 'Nov 5-7, 2023',
    time: 'All day',
    location: 'Mountain View Retreat Center',
    imageUrl: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmlibGUlMjBzdHVkeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: '$150',
    attendees: 78,
    description: 'This weekend retreat offers women a chance to dive deeper into Scripture, build community, and enjoy rest and relaxation in a beautiful mountain setting with guided Bible studies and worship.',
    speakers: [
      'Elizabeth Davis - Women\'s Ministry Director',
      'Rachel Thompson - Author of "Faith in Action"',
      'Pastor Linda Wilson - First Baptist Church'
    ],
    schedule: [
      'Friday: Check-in, Welcome Dinner, Evening Session',
      'Saturday: Morning Devotion, Bible Study, Free Time, Evening Worship',
      'Sunday: Closing Session, Brunch, Departure'
    ],
    media: [
      'https://images.unsplash.com/photo-1529071753081-86870cb2f024?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmV0cmVhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1476900966873-ab290e38e3f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmlibGUlMjBzdHVkeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1506126944674-00c6c192e0a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW5zJTIwcmV0cmVhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
    ],
    videoUrl: 'https://player.vimeo.com/external/368324844.sd.mp4?s=e01686e8ce603f8833ebd381785a5374a0456ee9&profile_id=164&oauth2_token_id=57447761'
  },
  {
    id: '3',
    title: 'Youth Summer Camp',
    organizer: 'Christian Youth Ministries',
    organizerLogo: 'https://randomuser.me/api/portraits/lego/3.jpg',
    date: 'July 10-17, 2024',
    time: 'All day',
    location: 'Lake Haven Camp',
    imageUrl: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VtbWVyJTIwY2FtcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: '$350',
    attendees: 156,
    description: 'A transformative week-long summer camp for youth grades 6-12 featuring outdoor adventures, spiritual growth, worship, and lasting friendships in a beautiful lakeside setting.',
    speakers: [
      'Pastor Mark Davis - Camp Director',
      'James Wilson - Youth Leader',
      'Sarah Johnson - Worship Leader'
    ],
    schedule: [
      'Day 1: Arrival, Registration, Welcome Campfire',
      'Days 2-6: Morning Devotions, Activities, Evening Worship',
      'Day 7: Closing Ceremony, Departure'
    ],
    media: [
      'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhbXB8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1504457047772-27faf1c00561?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGZpcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3VtbWVyJTIwY2FtcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
    ],
    videoUrl: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=165&oauth2_token_id=57447761'
  },
  {
    id: '4',
    title: 'Christmas Concert',
    organizer: 'Community Gospel Choir',
    organizerLogo: 'https://randomuser.me/api/portraits/lego/4.jpg',
    date: 'Dec 18, 2023',
    time: '7:00 PM - 9:30 PM',
    location: 'City Auditorium',
    imageUrl: 'https://images.unsplash.com/photo-1512990414084-a47f5aefde82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hyaXN0bWFzJTIwY29uY2VydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: '$25',
    attendees: 412,
    description: 'Celebrate the holiday season with our annual Christmas concert featuring traditional carols, contemporary Christmas music, and special performances by our children\'s choir.',
    performers: [
      'Community Gospel Choir',
      'Children\'s Choir',
      'Special Guest: Sarah Davis (Grammy-nominated vocalist)'
    ],
    program: [
      'Part 1: Traditional Christmas Carols',
      'Part 2: Contemporary Christmas Music',
      'Part 3: Children\'s Choir Performance',
      'Grand Finale: Hallelujah Chorus with Full Choir'
    ],
    media: [
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hyaXN0bWFzJTIwY2hvaXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1542823947-9feee70e7285?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2hyaXN0bWFzJTIwY29uY2VydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1481464904474-a575a33b44a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hyaXN0bWFzJTIwY2FuZGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
    ],
    videoUrl: 'https://player.vimeo.com/external/503347261.sd.mp4?s=7e91260f1aa2374caab90fc7b8ab75aadf6a891f&profile_id=165&oauth2_token_id=57447761'
  },
];

const EventsScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1">
        <View className="p-4 bg-white border-b border-gray-200">
          <Text className="text-xl font-bold text-indigo-800 mb-2">Christian360 Events</Text>
          
          {/* Search bar */}
          <View className="flex-row bg-gray-100 rounded-lg p-2 mb-3">
            <TextInput 
              placeholder="Search events..."
              className="flex-1 text-base"
            />
            <TouchableOpacity>
              <Text className="text-indigo-600 font-medium">Search</Text>
            </TouchableOpacity>
          </View>
          
          {/* Filter tabs */}
          <View className="flex-row border-b border-gray-200">
            <TouchableOpacity className="mr-4 pb-2 border-b-2 border-indigo-600">
              <Text className="font-medium text-indigo-600">Upcoming</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mr-4 pb-2">
              <Text className="text-gray-600">This Weekend</Text>
            </TouchableOpacity>
            <TouchableOpacity className="pb-2">
              <Text className="text-gray-600">Online</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <FlatList
          data={DUMMY_EVENTS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EventCard {...item} navigation={navigation} />}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default EventsScreen; 