import React from 'react';
import { View, Text, FlatList, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import JobCard from './JobCard';

export const DUMMY_JOBS = [
  {
    id: '1',
    title: 'Worship Pastor',
    company: 'Grace Community Church',
    logoUrl: 'https://randomuser.me/api/portraits/lego/1.jpg',
    location: 'Nashville, TN',
    salary: '$45,000 - $60,000',
    type: 'Full-time',
    postedDate: '3 days ago',
    description: 'Leading worship services and coordinating music ministry. Must have experience in modern worship styles and team leadership.',
    companyDescription: 'Grace Community Church is a vibrant, growing congregation of over 2,000 members dedicated to authentic worship and community outreach.',
    requirements: [
      'Bachelor\'s degree in Music, Worship Arts, or related field',
      'Minimum 3 years experience leading worship in a church setting',
      'Proficiency in piano or guitar',
      'Experience managing volunteer musicians and vocalists',
      'Strong understanding of contemporary worship music'
    ],
    responsibilities: [
      'Plan and lead weekly worship services',
      'Recruit, train, and schedule worship team members',
      'Coordinate with pastoral team for service planning',
      'Manage worship arts budget',
      'Develop special music for holiday services'
    ],
    companyMedia: [
      'https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: '2',
    title: 'Youth Minister',
    company: 'First Baptist Church',
    logoUrl: 'https://randomuser.me/api/portraits/lego/2.jpg',
    location: 'Atlanta, GA',
    salary: '$40,000 - $50,000',
    type: 'Full-time',
    postedDate: '1 week ago',
    description: 'Develop and lead youth ministry programs for grades 6-12. Seeking someone passionate about mentoring teens in their faith journey.',
    companyDescription: 'First Baptist Church is a historic church in downtown Atlanta with a focus on strong biblical teaching and community involvement.',
    requirements: [
      'Bachelor\'s degree in Youth Ministry, Christian Education, or related field',
      'Experience working with middle and high school students',
      'Strong communication and organizational skills',
      'Passion for youth discipleship',
      'Ability to work evenings and weekends as needed'
    ],
    responsibilities: [
      'Plan and implement weekly youth programs',
      'Organize youth retreats and mission trips',
      'Mentor and disciple youth leaders',
      'Communicate regularly with parents',
      'Work with pastoral team on youth integration into church life'
    ],
    companyMedia: [
      'https://images.unsplash.com/photo-1560174038-594f9af23fba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: '3',
    title: 'Communications Director',
    company: 'Hillsong Church',
    logoUrl: 'https://randomuser.me/api/portraits/lego/3.jpg',
    location: 'Remote',
    salary: '$55,000 - $70,000',
    type: 'Full-time',
    postedDate: '2 days ago',
    description: 'Manage all church communications including social media, newsletter, website content, and service announcements.',
    companyDescription: 'Hillsong Church is a global church with a local focus. Known for innovative worship and dynamic community engagement.',
    requirements: [
      'Degree in Communications, Marketing, or related field',
      'Minimum 5 years experience in communications role',
      'Proficiency with social media platforms and content management systems',
      'Strong writing and editing skills',
      'Experience with graphic design software'
    ],
    responsibilities: [
      'Develop and implement church-wide communications strategy',
      'Manage website and social media accounts',
      'Create weekly newsletters and email campaigns',
      'Work with ministry leaders to promote events',
      'Develop branding and promotional materials'
    ],
    companyMedia: [
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511468102004-c3501d76ffe3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: '4',
    title: 'Christian Counselor',
    company: 'Faith Counseling Center',
    logoUrl: 'https://randomuser.me/api/portraits/lego/4.jpg',
    location: 'Dallas, TX',
    salary: '$60,000 - $80,000',
    type: 'Part-time',
    postedDate: '5 days ago',
    description: 'Provide faith-based counseling services to individuals and families. Must have appropriate credentials and experience.',
    companyDescription: 'Faith Counseling Center offers Christ-centered counseling services to individuals, couples, and families with an emphasis on spiritual and emotional wellbeing.',
    requirements: [
      'Master\'s degree in Counseling, Psychology, or related field',
      'Current counseling license in the state of Texas',
      'Minimum 3 years of clinical experience',
      'Training in faith-integrated counseling approaches',
      'Strong understanding of biblical principles'
    ],
    responsibilities: [
      'Provide individual, couple, and family counseling sessions',
      'Maintain accurate and confidential client records',
      'Develop treatment plans consistent with Christian values',
      'Participate in regular supervision and continuing education',
      'Collaborate with local churches and Christian organizations'
    ],
    companyMedia: [
      'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1537093534023-70f570cc9092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ]
  },
];

const JobsScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1">
        <View className="p-4 bg-white border-b border-gray-200">
          <Text className="text-xl font-bold text-indigo-800 mb-2">Christian360 Jobs</Text>
          
          {/* Search bar */}
          <View className="flex-row bg-gray-100 rounded-lg p-2 mb-2">
            <TextInput 
              placeholder="Search jobs..."
              className="flex-1 text-base"
            />
            <TouchableOpacity>
              <Text className="text-indigo-600 font-medium">Search</Text>
            </TouchableOpacity>
          </View>
          
          {/* Filters */}
          <View className="flex-row mt-2">
            <TouchableOpacity className="bg-gray-200 rounded-full px-3 py-1 mr-2">
              <Text className="text-sm">Full-time</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-200 rounded-full px-3 py-1 mr-2">
              <Text className="text-sm">Part-time</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-200 rounded-full px-3 py-1">
              <Text className="text-sm">Remote</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <FlatList
          data={DUMMY_JOBS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <JobCard {...item} navigation={navigation} />}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default JobsScreen; 