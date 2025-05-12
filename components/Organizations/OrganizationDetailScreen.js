import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, ScrollView, FlatList, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SafeLayout from '../ui/SafeLayout';
import { Audio } from 'expo-av';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// Get screen width for FlatList items
const { width: screenWidth } = Dimensions.get('window');

// Sample organization website links and additional info
const organizationDetails = {
  '1': {
    website: 'https://www.compassion.com',
    founded: '1952',
    employees: '1,000-5,000',
    description: `Compassion International is a Christian humanitarian aid child sponsorship organization dedicated to the long-term development of children living in poverty around the world. Compassion International, headquartered in Colorado Springs, Colorado, functions in 25 countries such as Bolivia, Colombia, Mexico, Haiti, and Kenya. The organization provides aid to more than 2 million babies, children, and young adults.\n\nCompassion's main program is child sponsorship, in which a child in need is connected with a sponsor who provides financial support on a monthly basis. Through Compassion's program centers, children receive educational, health, social, and spiritual support. Each sponsored child is linked to one sponsor, who receives updates on the child's development through letters and photos.\n\nCompassion delivers its holistic child development model through local churches. Programs include early childhood development for infants and their caregivers, sponsorship programs for school-aged children, and leadership development for qualifying young adults.`
  },
  '2': {
    website: 'https://elevationchurch.org',
    founded: '2006',
    employees: '100-500',
    description: `Elevation Church is a multi-site church led by Pastor Steven Furtick, headquartered in Charlotte, North Carolina. As of 2022, Elevation Church has 20 locations, with the majority in and around the Charlotte area.\n\nElevation Church's services consist of worship and a sermon. The church holds weekend worship services at its different locations. The church also offers eGroups, which are small groups that meet throughout the week. These groups focus on building community, Bible study, and serving others.\n\nElevation Church is known for its worship ministry, Elevation Worship, which has produced numerous popular worship songs that are sung in churches around the world. The church has been recognized for its growth, innovative approach to ministry, and technological integration.`
  },
  '3': {
    website: 'https://www.chick-fil-a.com',
    founded: '1946',
    employees: '10,000+',
    description: `Chick-fil-A is an American fast food restaurant chain founded by S. Truett Cathy, headquartered in College Park, Georgia, and specializing in chicken sandwiches. The company is known for its distinctive corporate culture based on Christian values.\n\nChick-fil-A's business model includes being closed on Sundays, as well as Christian music being played in restaurants. The company's mission statement is "To glorify God by being a faithful steward of all that is entrusted to us and to have a positive influence on all who come into contact with Chick-fil-A."\n\nThe company is known for its customer service, quality food, and commitment to community service. Chick-fil-A restaurants are individually owned and operated by independent Owner-Operators who typically invest time in recruiting and training team members with a focus on creating a positive working environment.`
  }
};

// Sample Moments Data (New)
const momentsByOrganization = {
  '1': [ // Compassion International
    {
      date: new Date().toISOString().split('T')[0], // Today's date
      sections: [
        {
          id: 'intro',
          title: 'Introduction',
          content: [
            { type: 'text', value: 'Welcome to our daily moment of reflection, sponsored by Compassion International.' },
            { type: 'text', value: 'Today, we encourage you to think about the impact of sponsorship.' },
          ],
        },
        {
          id: 'reading',
          title: 'Verse of the Day: Matthew 25:40',
          content: [
            { type: 'text', value: '"The King will reply, \'Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me.\'"' },
            { type: 'audio', source: 'matthew_25_40.mp3', placeholder: '🎧 Listen to Matthew 25:40' },
          ],
        },
        {
          id: 'worship',
          title: 'Reflective Song',
          content: [
            { type: 'text', value: 'Consider listening to "Blessings" by Laura Story.' },
            { type: 'video', source: 'blessings_laura_story.mp4', placeholder: '📺 Watch a reflective music video' },
          ],
        },
        {
          id: 'prayer',
          title: 'Prayer Focus',
          content: [
            { type: 'text', value: 'Pray for children around the world awaiting sponsorship, that they may find hope and support.' },
          ],
        },
        {
          id: 'blessing',
          title: 'Closing Thought',
          content: [
            { type: 'text', value: 'May your heart be moved to action and compassion today.' },
          ],
        },
      ],
    },
    // Add more past moments for org '1' if needed for calendar view later
  ],
  '2': [ // Elevation Church
    {
      date: new Date().toISOString().split('T')[0], // Today's date
      sections: [
        {
          id: 'welcome',
          title: 'Welcome to Today\'s Word - Elevation Church',
          content: [
            { type: 'text', value: 'Pastor Steven Furtick shares a powerful message to start your day.' },
            { type: 'video', source: 'elevation_daily.mp4', placeholder: '▶️ Watch Today\'s Word' },
          ],
        },
        {
          id: 'scripture',
          title: 'Key Scripture: Romans 8:28',
          content: [
            { type: 'text', value: '"And we know that in all things God works for the good of those who love him, who have been called according to his purpose."' },
            { type: 'audio', source: 'romans_8_28.mp3', placeholder: '🎤 Audio Devotional on Romans 8:28' },
          ],
        },
        {
          id: 'reflection',
          title: 'Reflection Point',
          content: [
            { type: 'text', value: 'How can you see God working for your good, even in challenging situations?' },
          ],
        },
      ],
    }
  ],
};

// Sample Locations Data
const organizationLocations = {
  '1': { // Compassion International
    headquarters: {
      name: 'Global Headquarters',
      address: 'Colorado Springs, CO, USA',
      coordinates: { latitude: 38.8339, longitude: -104.8214 }
    },
    mainLocations: [
      { name: 'East Africa Office', address: 'Nairobi, Kenya', coordinates: { latitude: -1.2921, longitude: 36.8219 } },
      { name: 'Asia Region Office', address: 'Manila, Philippines', coordinates: { latitude: 14.5995, longitude: 120.9842 } },
      { name: 'Latin America Office', address: 'Quito, Ecuador', coordinates: { latitude: -0.1807, longitude: -78.4678 } }
    ],
    partnerChurches: [
      { name: 'Faith Community Church', address: 'Lusaka, Zambia', coordinates: { latitude: -15.3875, longitude: 28.3228 } },
      { name: 'Hope Ministries', address: 'San Salvador, El Salvador', coordinates: { latitude: 13.6929, longitude: -89.2182 } },
      { name: 'Grace Baptist Church', address: 'Port-au-Prince, Haiti', coordinates: { latitude: 18.5944, longitude: -72.3074 } }
    ],
    otherLocations: [
      { name: 'Child Development Centre', address: 'Addis Ababa, Ethiopia', coordinates: { latitude: 9.0222, longitude: 38.7468 } },
      { name: 'Community Centre', address: 'Dhaka, Bangladesh', coordinates: { latitude: 23.8103, longitude: 90.4125 } }
    ]
  },
  '2': { // Elevation Church
    headquarters: {
      name: 'Elevation Church Main Campus',
      address: 'Charlotte, NC, USA',
      coordinates: { latitude: 35.2271, longitude: -80.8431 }
    },
    mainLocations: [
      { name: 'Ballantyne Campus', address: 'Charlotte, NC, USA', coordinates: { latitude: 35.0485, longitude: -80.8456 } },
      { name: 'Lake Norman Campus', address: 'Cornelius, NC, USA', coordinates: { latitude: 35.4765, longitude: -80.8898 } },
      { name: 'University City Campus', address: 'Charlotte, NC, USA', coordinates: { latitude: 35.3045, longitude: -80.7457 } }
    ],
    partnerChurches: [
      { name: 'Mosaic Church', address: 'Los Angeles, CA, USA', coordinates: { latitude: 34.0522, longitude: -118.2437 } },
      { name: 'NewSpring Church', address: 'Anderson, SC, USA', coordinates: { latitude: 34.5034, longitude: -82.6501 } }
    ],
    otherLocations: [
      { name: 'Elevation Outreach Centre', address: 'Charlotte, NC, USA', coordinates: { latitude: 35.1995, longitude: -80.8130 } }
    ]
  },
  '3': { // Chick-fil-A
    headquarters: {
      name: 'Chick-fil-A Headquarters',
      address: 'College Park, GA, USA',
      coordinates: { latitude: 33.6518, longitude: -84.4488 }
    },
    mainLocations: [
      { name: 'Truett's original restaurant', address: 'Hapeville, GA, USA', coordinates: { latitude: 33.6614, longitude: -84.4000 } },
      { name: 'Innovation Center', address: 'Atlanta, GA, USA', coordinates: { latitude: 33.7490, longitude: -84.3880 } }
    ],
    partnerChurches: [],
    otherLocations: [
      { name: 'Chick-fil-A Leadership Academy', address: 'Atlanta, GA, USA', coordinates: { latitude: 33.7545, longitude: -84.3900 } }
    ]
  }
};

// Sample Recommended Resources Data
const organizationResources = {
  '1': [ // Compassion International
    {
      id: '101',
      type: 'book',
      title: 'Compassion: A Call to Take Action',
      author: 'Wess Stafford',
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80',
      description: 'A powerful look at how child sponsorship can change lives and communities around the world.',
      link: 'https://www.compassion.com/resources/books'
    },
    {
      id: '102',
      type: 'video',
      title: 'The Journey of Sponsorship',
      author: 'Compassion International',
      coverImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=300&q=80',
      description: 'Follow the journey of a sponsored child and see the impact of sponsorship over time.',
      link: 'https://www.compassion.com/resources/videos'
    },
    {
      id: '103',
      type: 'course',
      title: 'Poverty Alleviation Fundamentals',
      author: 'Compassion Training Team',
      coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=300&q=80',
      description: 'Learn the fundamental principles of effective poverty alleviation and community development.',
      link: 'https://www.compassion.com/resources/courses'
    }
  ],
  '2': [ // Elevation Church
    {
      id: '201',
      type: 'book',
      title: 'Crash the Chatterbox',
      author: 'Steven Furtick',
      coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=300&q=80',
      description: 'Learn to recognize and silence the lies of the enemy and hear God\'s voice above all others.',
      link: 'https://elevationchurch.org/resources/books'
    },
    {
      id: '202',
      type: 'course',
      title: 'Growth Track',
      author: 'Elevation Church',
      coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=300&q=80',
      description: 'Discover your purpose and learn how to make a difference with your life through serving others.',
      link: 'https://elevationchurch.org/resources/courses'
    },
    {
      id: '203',
      type: 'music',
      title: 'Elevation Worship Collection',
      author: 'Elevation Worship',
      coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80',
      description: 'Music from Elevation Worship to inspire your daily devotional time and personal worship.',
      link: 'https://elevationchurch.org/resources/music'
    }
  ],
  '3': [ // Chick-fil-A
    {
      id: '301',
      type: 'book',
      title: 'It\'s Better to Build Boys Than Mend Men',
      author: 'S. Truett Cathy',
      coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=300&q=80',
      description: 'The Chick-fil-A founder shares principles on mentoring and youth development.',
      link: 'https://www.chick-fil-a.com/resources'
    },
    {
      id: '302',
      type: 'course',
      title: 'Business Leadership Principles',
      author: 'Chick-fil-A Leadership Development',
      coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&q=80',
      description: 'Learn the business and leadership principles that have made Chick-fil-A successful.',
      link: 'https://www.chick-fil-a.com/resources/leadership'
    }
  ]
};

// Sample Partner Organizations Data
const organizationPartners = {
  '1': [ // Compassion International
    {
      id: 'p101',
      name: 'World Vision',
      logo: 'https://i.imgur.com/Qrm8Kgb.png',
      banner: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=300&q=80',
      description: 'Partner in global humanitarian efforts to support children and communities.'
    },
    {
      id: 'p102',
      name: 'International Justice Mission',
      logo: 'https://i.imgur.com/7jRNF2G.png',
      banner: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=300&q=80',
      description: 'Collaborating to protect children from trafficking and abuse in vulnerable areas.'
    },
    {
      id: 'p103',
      name: 'Food for the Hungry',
      logo: 'https://i.imgur.com/Jt8wNJr.png',
      banner: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=300&q=80',
      description: 'Working together to address food security in communities with sponsored children.'
    },
    {
      id: 'p104',
      name: 'Tearfund',
      logo: 'https://i.imgur.com/Q7yLT5W.png',
      banner: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=300&q=80',
      description: 'Partnering on disaster response and community development initiatives.'
    }
  ],
  '2': [ // Elevation Church
    {
      id: 'p201',
      name: 'Orange (ReThink Group)',
      logo: 'https://i.imgur.com/XQhYKLh.png',
      banner: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=300&q=80',
      description: 'Curriculum partner for children and youth ministry resources.'
    },
    {
      id: 'p202',
      name: 'VOUS Church',
      logo: 'https://i.imgur.com/gQJdKMT.png',
      banner: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=300&q=80',
      description: 'Partner church for conferences and leadership development.'
    },
    {
      id: 'p203',
      name: 'Proverbs 31 Ministries',
      logo: 'https://i.imgur.com/4Fz9mME.png',
      banner: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=300&q=80',
      description: 'Collaboration on women\'s ministry resources and events.'
    }
  ],
  '3': [ // Chick-fil-A
    {
      id: 'p301',
      name: 'Junior Achievement',
      logo: 'https://i.imgur.com/bZFI8r1.png',
      banner: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=300&q=80',
      description: 'Partnership to provide business education to young people.'
    },
    {
      id: 'p302',
      name: 'WinShape Foundation',
      logo: 'https://i.imgur.com/sDiIQaV.png',
      banner: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=300&q=80',
      description: 'Affiliated foundation focusing on foster care, camps, and marriage programs.'
    },
    {
      id: 'p303',
      name: 'Habitat for Humanity',
      logo: 'https://i.imgur.com/EtgJGqg.png',
      banner: 'https://images.unsplash.com/photo-1582653291997-079b4f452354?auto=format&fit=crop&w=300&q=80',
      description: 'Community service partner for building homes and strengthening communities.'
    }
  ]
};

// New Component: MomentContentItem (Updated for Audio)
const MomentContentItem = ({ item }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function playPauseSound() {
    if (!item.source) {
      setError("No audio source provided.");
      return;
    }
    setError(null); // Clear previous errors

    if (sound) {
      if (isPlaying) {
        try {
          await sound.pauseAsync();
          setIsPlaying(false);
        } catch (e) {
          console.error("Error pausing sound:", e);
          setError("Error pausing sound.");
        }
      } else {
        try {
          await sound.playAsync();
          setIsPlaying(true);
        } catch (e) {
          console.error("Error playing sound:", e);
          setError("Error playing sound.");
        }
      }
    } else {
      setIsLoading(true);
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: item.source }, // Assuming item.source is a valid URI
          { shouldPlay: true }
        );
        setSound(newSound);
        setIsPlaying(true);
        newSound.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
      } catch (e) {
        console.error("Error loading sound:", e);
        setError(`Error loading audio. Please ensure the source is a valid URL. Details: ${e.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const _onPlaybackStatusUpdate = (playbackStatus) => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for unloaded state
      if (playbackStatus.error) {
        console.error(`Encountered a fatal error during playback: ${playbackStatus.error}`);
        setError(`Playback Error: ${playbackStatus.error}`);
        // Relaod UI?
      }
    } else {
      // Update your UI for loaded state
      if (playbackStatus.isPlaying) {
        // Update your UI for playing state
        setIsPlaying(true);
      }
      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop.
        setIsPlaying(false);
        // Optionally, reset sound to be played again from the beginning
        // sound?.setPositionAsync(0);
      }
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  switch (item.type) {
    case 'text':
      return <Text className="text-gray-700 text-base mb-3 leading-relaxed">{item.value}</Text>;
    case 'audio':
      return (
        <View className="my-2">
          <TouchableOpacity 
            className="p-3 bg-indigo-50 rounded-lg flex-row items-center justify-between"
            onPress={playPauseSound}
            disabled={isLoading}
          >
            <View className="flex-row items-center">
              <Ionicons 
                name={isLoading ? "hourglass-outline" : (isPlaying ? "pause-circle-outline" : "play-circle-outline")} 
                size={28} 
                color="#4f46e5" 
              />
              <Text className="text-indigo-600 ml-3 font-semibold">
                {isLoading ? "Loading Audio..." : (item.placeholder || 'Play Audio')}
              </Text>
            </View>
            {isPlaying && <Text className="text-indigo-500 text-xs">Playing...</Text>}
          </TouchableOpacity>
          {error && <Text className="text-red-500 text-xs mt-1 px-1">{error}</Text>}
        </View>
      );
    case 'video':
      return (
        <TouchableOpacity className="p-3 my-2 bg-rose-50 rounded-lg flex-row items-center">
          <Ionicons name="film-outline" size={24} color="#f43f5e" />
          <Text className="text-rose-600 ml-2 font-semibold">{item.placeholder || 'Watch Video'}</Text>
        </TouchableOpacity>
      );
    default:
      return null;
  }
};

// New Component: MomentSectionPage (New)
const MomentSectionPage = ({ section }) => {
  return (
    <View style={{ width: screenWidth - 32 }} className="py-4 px-4">
      <Text className="text-xl font-bold text-gray-800 mb-4">{section.title}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {section.content.map((item, index) => (
          <MomentContentItem key={index} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

// New Component: DailyMomentViewer (New)
const DailyMomentViewer = ({ organizationId }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const todayStr = new Date().toISOString().split('T')[0];
  const organizationMomentsData = momentsByOrganization[organizationId] || [];
  const todayMoment = organizationMomentsData.find(moment => moment.date === todayStr);

  if (!todayMoment || todayMoment.sections.length === 0) {
    return (
      <View className="my-6 p-4 bg-white rounded-lg shadow mx-4">
        <Text className="text-lg font-semibold text-gray-700 mb-2">Today's Moment</Text>
        <Text className="text-gray-600">No moment available for today.</Text>
      </View>
    );
  }

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0 && viewableItems[0].isViewable) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View className="my-6 bg-white rounded-lg shadow overflow-hidden mx-4">
      <Text className="text-xl font-bold text-gray-800 p-4 pb-2">Today's Moment</Text>
      <FlatList
        ref={flatListRef}
        data={todayMoment.sections}
        renderItem={({ item }) => <MomentSectionPage section={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        style={{ height: 350 }} // Adjust height as needed
        contentContainerStyle={{ alignItems: 'flex-start' }}
      />
      <View className="flex-row justify-center items-center py-3">
        {todayMoment.sections.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              activeIndex === index ? 'bg-indigo-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </View>
    </View>
  );
};

// Component for displaying location maps
const LocationsSection = ({ organizationId }) => {
  const [activeMapType, setActiveMapType] = useState('headquarters');
  const locations = organizationLocations[organizationId];
  
  if (!locations) {
    return (
      <View className="my-6 px-4">
        <Text className="text-lg font-bold mb-2">Locations</Text>
        <Text className="text-gray-600">No location information available.</Text>
      </View>
    );
  }
  
  // Determine which locations to show based on active type
  const getLocationsToShow = () => {
    switch (activeMapType) {
      case 'headquarters':
        return locations.headquarters ? [locations.headquarters] : [];
      case 'main':
        return locations.mainLocations || [];
      case 'partners':
        return locations.partnerChurches || [];
      case 'others':
        return locations.otherLocations || [];
      default:
        return [];
    }
  };
  
  const locationsToShow = getLocationsToShow();
  
  // Calculate the region to show all markers
  const getMapRegion = () => {
    if (locationsToShow.length === 0) {
      // Default region if no locations
      return {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 90,
        longitudeDelta: 90
      };
    }
    
    if (locationsToShow.length === 1) {
      // If only one location, center on it with a reasonable zoom
      const location = locationsToShow[0];
      return {
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      };
    }
    
    // Find min/max lat/long to encompass all markers
    let minLat = Number.MAX_VALUE;
    let maxLat = Number.MIN_VALUE;
    let minLng = Number.MAX_VALUE;
    let maxLng = Number.MIN_VALUE;
    
    locationsToShow.forEach(location => {
      const { latitude, longitude } = location.coordinates;
      minLat = Math.min(minLat, latitude);
      maxLat = Math.max(maxLat, latitude);
      minLng = Math.min(minLng, longitude);
      maxLng = Math.max(maxLng, longitude);
    });
    
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;
    
    // Add some padding
    const latDelta = (maxLat - minLat) * 1.5 || 0.1;
    const lngDelta = (maxLng - minLng) * 1.5 || 0.1;
    
    return {
      latitude: centerLat,
      longitude: centerLng,
      latitudeDelta: Math.max(latDelta, 0.1),
      longitudeDelta: Math.max(lngDelta, 0.1)
    };
  };
  
  return (
    <View className="my-6 px-4">
      <Text className="text-lg font-bold mb-2">Locations</Text>
      
      {/* Tab selector for different location types */}
      <View className="flex-row mb-3 bg-gray-100 rounded-lg p-1">
        <TouchableOpacity 
          className={`flex-1 py-2 rounded-md flex items-center ${
            activeMapType === 'headquarters' ? 'bg-white shadow' : ''
          }`}
          onPress={() => setActiveMapType('headquarters')}
        >
          <Text className={activeMapType === 'headquarters' ? 'text-indigo-600 font-medium' : 'text-gray-600'}>
            HQ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`flex-1 py-2 rounded-md flex items-center ${
            activeMapType === 'main' ? 'bg-white shadow' : ''
          }`}
          onPress={() => setActiveMapType('main')}
        >
          <Text className={activeMapType === 'main' ? 'text-indigo-600 font-medium' : 'text-gray-600'}>
            Main
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`flex-1 py-2 rounded-md flex items-center ${
            activeMapType === 'partners' ? 'bg-white shadow' : ''
          }`}
          onPress={() => setActiveMapType('partners')}
        >
          <Text className={activeMapType === 'partners' ? 'text-indigo-600 font-medium' : 'text-gray-600'}>
            Partners
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`flex-1 py-2 rounded-md flex items-center ${
            activeMapType === 'others' ? 'bg-white shadow' : ''
          }`}
          onPress={() => setActiveMapType('others')}
        >
          <Text className={activeMapType === 'others' ? 'text-indigo-600 font-medium' : 'text-gray-600'}>
            Other
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Map */}
      <View className="rounded-lg overflow-hidden h-52 shadow mb-2">
        {locationsToShow.length > 0 ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ width: '100%', height: '100%' }}
            region={getMapRegion()}
            scrollEnabled={true}
            zoomEnabled={true}
          >
            {locationsToShow.map((location, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: location.coordinates.latitude,
                  longitude: location.coordinates.longitude
                }}
                title={location.name}
                description={location.address}
                pinColor={activeMapType === 'headquarters' ? '#4f46e5' : 
                         activeMapType === 'main' ? '#10b981' :
                         activeMapType === 'partners' ? '#f59e0b' : '#6366f1'}
              />
            ))}
          </MapView>
        ) : (
          <View className="flex-1 items-center justify-center bg-gray-100">
            <Text className="text-gray-500">No locations available</Text>
          </View>
        )}
      </View>
      
      {/* Location list */}
      <View className="mt-2">
        {locationsToShow.length > 0 ? (
          locationsToShow.map((location, index) => (
            <View key={index} className="flex-row items-start mb-2 py-2 border-b border-gray-100">
              <Ionicons name="location" size={18} color="#6366f1" style={{ marginTop: 2 }} />
              <View className="ml-2 flex-1">
                <Text className="font-semibold">{location.name}</Text>
                <Text className="text-gray-600 text-sm">{location.address}</Text>
              </View>
              <TouchableOpacity 
                className="bg-gray-100 p-2 rounded-full"
                onPress={() => {
                  const url = `https://www.google.com/maps/search/?api=1&query=${location.coordinates.latitude},${location.coordinates.longitude}`;
                  Linking.openURL(url);
                }}
              >
                <Ionicons name="navigate-outline" size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text className="text-gray-600 italic text-center py-2">
            No {activeMapType === 'headquarters' ? 'headquarters' : 
                activeMapType === 'main' ? 'main locations' :
                activeMapType === 'partners' ? 'partner churches' : 'other locations'} available
          </Text>
        )}
      </View>
    </View>
  );
};

// Component for recommended resources
const RecommendedResourcesSection = ({ organizationId }) => {
  const resources = organizationResources[organizationId] || [];
  
  if (resources.length === 0) {
    return (
      <View className="my-6 px-4">
        <Text className="text-lg font-bold mb-2">Recommended Resources</Text>
        <Text className="text-gray-600">No recommended resources available.</Text>
      </View>
    );
  }
  
  // Get icon based on resource type
  const getResourceIcon = (type) => {
    switch (type) {
      case 'book':
        return 'book-outline';
      case 'video':
        return 'videocam-outline';
      case 'course':
        return 'school-outline';
      case 'music':
        return 'musical-notes-outline';
      default:
        return 'document-text-outline';
    }
  };
  
  // Get background color based on resource type
  const getResourceBgColor = (type) => {
    switch (type) {
      case 'book':
        return 'bg-blue-50';
      case 'video':
        return 'bg-rose-50';
      case 'course':
        return 'bg-amber-50';
      case 'music':
        return 'bg-purple-50';
      default:
        return 'bg-gray-50';
    }
  };
  
  // Get text color based on resource type
  const getResourceTextColor = (type) => {
    switch (type) {
      case 'book':
        return 'text-blue-800';
      case 'video':
        return 'text-rose-800';
      case 'course':
        return 'text-amber-800';
      case 'music':
        return 'text-purple-800';
      default:
        return 'text-gray-800';
    }
  };
  
  // Get icon color based on resource type
  const getResourceIconColor = (type) => {
    switch (type) {
      case 'book':
        return '#1e40af';
      case 'video':
        return '#be123c';
      case 'course':
        return '#b45309';
      case 'music':
        return '#6b21a8';
      default:
        return '#374151';
    }
  };
  
  const handleResourcePress = (resource) => {
    Linking.openURL(resource.link);
  };
  
  return (
    <View className="my-6 px-4">
      <Text className="text-lg font-bold mb-4">Recommended Resources</Text>
      
      {resources.map((resource, index) => (
        <TouchableOpacity
          key={resource.id}
          className="flex-row items-center mb-4 bg-white rounded-lg shadow-sm overflow-hidden"
          onPress={() => handleResourcePress(resource)}
          activeOpacity={0.7}
        >
          <Image 
            source={{ uri: resource.coverImage }}
            className="w-20 h-20"
            resizeMode="cover"
          />
          <View className="flex-1 p-3">
            <View className="flex-row items-center mb-1">
              <View className={`${getResourceBgColor(resource.type)} p-1 rounded-md mr-2`}>
                <Ionicons name={getResourceIcon(resource.type)} size={12} color={getResourceIconColor(resource.type)} />
              </View>
              <Text className={`text-xs font-medium ${getResourceTextColor(resource.type)}`}>
                {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
              </Text>
            </View>
            <Text className="font-bold text-gray-800" numberOfLines={1}>{resource.title}</Text>
            <Text className="text-gray-600 text-xs mb-1">By {resource.author}</Text>
            <Text className="text-gray-600 text-xs" numberOfLines={2}>{resource.description}</Text>
          </View>
          <View className="pr-2">
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </View>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity 
        className="mt-2 bg-indigo-50 py-3 rounded-lg items-center"
        onPress={() => {
          Linking.openURL(resources[0]?.link || '#');
        }}
      >
        <Text className="text-indigo-700 font-semibold">View All Resources</Text>
      </TouchableOpacity>
    </View>
  );
};

// Component for partner organizations
const PartnersSection = ({ organizationId }) => {
  const partners = organizationPartners[organizationId] || [];
  
  if (partners.length === 0) {
    return (
      <View className="my-6 px-4">
        <Text className="text-lg font-bold mb-2">Partners</Text>
        <Text className="text-gray-600">No partner organizations available.</Text>
      </View>
    );
  }
  
  return (
    <View className="my-6 px-4">
      <Text className="text-lg font-bold mb-4">Partners</Text>
      
      <View className="flex-row flex-wrap justify-between">
        {partners.map((partner) => (
          <TouchableOpacity
            key={partner.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden mb-4"
            style={{ width: '48%' }}
            activeOpacity={0.7}
          >
            <View className="relative">
              <Image 
                source={{ uri: partner.banner }}
                className="w-full h-24"
                resizeMode="cover"
              />
              <View className="absolute inset-0 bg-black/20" />
              <View className="absolute top-2 left-2 bg-white rounded-full p-1">
                <Image 
                  source={{ uri: partner.logo }}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
              </View>
            </View>
            <View className="p-2">
              <Text className="font-bold text-sm" numberOfLines={1}>{partner.name}</Text>
              <Text className="text-gray-600 text-xs" numberOfLines={2}>{partner.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity 
        className="mt-2 bg-indigo-50 py-3 rounded-lg items-center"
      >
        <Text className="text-indigo-700 font-semibold">View All Partners</Text>
      </TouchableOpacity>
    </View>
  );
};

const OrganizationDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { organization } = route.params;
  const [isFollowing, setIsFollowing] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  // Get additional details for this organization
  const details = organizationDetails[organization.id] || {
    website: '#',
    founded: 'N/A',
    employees: 'N/A',
    description: 'No detailed description available.'
  };

  const handleWebsitePress = () => {
    Linking.openURL(details.website);
  };

  return (
    <SafeLayout backgroundColor="#f9fafb">
      <ScrollView className="flex-1">
        <View> {/* Added a parent View to wrap content formerly under pt-5 from banner area */}
        {/* Banner and Logo */}
        <View className="relative">
          <Image 
            source={{ uri: organization.banner }} 
            className="w-full h-48"
            resizeMode="cover"
          />
          <View className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
        </View>
        
          <View className="px-4 pt-5"> {/* This container handles spacing for logo/title post-banner*/}
            <View className="flex-row items-start mt-[-65]">
              {logoError ? (
                <View className="w-24 h-24 rounded-lg border-2 border-white bg-indigo-100 items-center justify-center">
                  <Text className="font-bold text-indigo-500 text-2xl">
                    {organization.name.charAt(0)}
                  </Text>
                </View>
              ) : (
            <Image 
              source={{ uri: organization.logo }} 
              className="w-24 h-24 rounded-lg border-2 border-white bg-white"
              resizeMode="contain"
                  onError={() => setLogoError(true)}
            />
              )}
              <View className="flex-1 ml-3 mt-12">
                <Text className="text-2xl font-bold">{organization.name}</Text>
              <Text className="text-gray-600">{organization.type}</Text>
              </View>
            </View>
            </View>
          </View>
          
        {/* Stats row - needs px-4 if it was part of the original px-4 pt-5 container */}
        <View className="flex-row mt-4 mb-4 px-4">
            <View className="flex-1 border-r border-gray-200">
              <Text className="text-center font-bold text-indigo-600">{organization.followers}</Text>
              <Text className="text-center text-gray-600 text-sm">Followers</Text>
            </View>
            <View className="flex-1 border-r border-gray-200">
              <Text className="text-center font-bold text-indigo-600">{details.founded}</Text>
              <Text className="text-center text-gray-600 text-sm">Founded</Text>
            </View>
            <View className="flex-1">
              <Text className="text-center font-bold text-indigo-600">{details.employees}</Text>
              <Text className="text-center text-gray-600 text-sm">Employees</Text>
            </View>
          </View>
          
        {/* Action buttons - needs px-4 */}
        <View className="flex-row mt-2 mb-6 px-4">
            <TouchableOpacity 
              className={`flex-1 py-2 mr-2 rounded-full items-center ${isFollowing ? 'bg-white border border-indigo-600' : 'bg-indigo-600'}`}
              onPress={() => setIsFollowing(!isFollowing)}
            >
              <Text className={`font-semibold ${isFollowing ? 'text-indigo-600' : 'text-white'}`}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="flex-1 py-2 ml-2 rounded-full bg-white border border-gray-300 items-center"
              onPress={handleWebsitePress}
            >
              <Text className="font-semibold text-gray-700">Visit Website</Text>
            </TouchableOpacity>
          </View>
          
        {/* About section - already had px-4 */}
        <View className="mb-6 px-4">
            <Text className="text-lg font-bold mb-2">About</Text>
            <Text className="text-gray-700 leading-6">{details.description}</Text>
          </View>
          
        {/* Daily Moment Viewer - It handles its own internal padding and margins (mx-4 for side margins) */}
        <DailyMomentViewer organizationId={organization.id} />
        
        {/* Locations section */}
        <LocationsSection organizationId={organization.id} />
        
        {/* Recommended Resources section */}
        <RecommendedResourcesSection organizationId={organization.id} />
        
        {/* Partners section */}
        <PartnersSection organizationId={organization.id} />
        
        {/* View Groups Button (New) */}
        <View className="my-6 px-4">
          <TouchableOpacity 
            className="bg-indigo-600 py-3 rounded-lg items-center justify-center shadow-md"
            onPress={() => {
              // Create the params object that will be passed regardless of navigation path
              const groupParams = { 
                organizationId: organization.id, 
                organizationName: organization.name 
              };

              // Check if current navigation state includes a parent with name 'Home'
              // This tells us if we're in the HomeStackNavigator
              const isInHomeStack = navigation.getState().routeNames.includes('HomeFeed') || 
                                   navigation.getState().routes[0]?.name === 'HomeFeed';

              if (isInHomeStack) {
                // If we're in the HomeStackNavigator, we need to switch to the Organizations tab first
                navigation.navigate('Organizations', { 
                  screen: 'GroupList',
                  params: groupParams
                });
              } else {
                // If we're already in the OrganizationsStackNavigator, use direct navigation
                navigation.navigate('GroupList', groupParams);
              }
            }}
          >
            <Text className="text-white font-semibold text-base">View Community Groups</Text>
          </TouchableOpacity>
        </View>
        
        {/* Contact section - already had px-4 */}
        <View className="mb-6 px-4">
            <Text className="text-lg font-bold mb-2">Contact</Text>
            <TouchableOpacity className="flex-row items-center" onPress={handleWebsitePress}>
              <Ionicons name="globe-outline" size={18} color="#6b7280" />
              <Text className="text-indigo-600 ml-2 underline">{details.website}</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </SafeLayout>
  );
};

export default OrganizationDetailScreen; 