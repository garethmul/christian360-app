import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, ScrollView, FlatList, Dimensions, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SafeLayout from '../ui/SafeLayout';
import { Audio } from 'expo-av';

// Get screen width for FlatList items
const { width: screenWidth } = Dimensions.get('window');

// Sample organization website links and additional info
const organizationDetails = {
  '1': {
    website: 'https://www.compassion.com',
    founded: '1952',
    employees: '1,000-5,000',
    description: `Compassion International is a Christian humanitarian aid child sponsorship organization dedicated to the long-term development of children living in poverty around the world. Compassion International, headquartered in Colorado Springs, Colorado, functions in 25 countries such as Bolivia, Colombia, Mexico, Haiti, and Kenya. The organization provides aid to more than 2 million babies, children, and young adults.\n\nCompassion's main program is child sponsorship, in which a child in need is connected with a sponsor who provides financial support on a monthly basis. Through Compassion's program centers, children receive educational, health, social, and spiritual support. Each sponsored child is linked to one sponsor, who receives updates on the child's development through letters and photos.\n\nCompassion delivers its holistic child development model through local churches. Programs include early childhood development for infants and their caregivers, sponsorship programs for school-aged children, and leadership development for qualifying young adults.`,
    // Add location data
    locations: {
      offices: [
        { id: '1', name: 'Colorado Springs HQ', address: '12290 Voyager Pkwy, Colorado Springs, CO 80921', coordinates: { latitude: 38.9784, longitude: -104.7994 } },
        { id: '2', name: 'UK Office', address: '43 High Street, Weybridge, KT13 8BB, United Kingdom', coordinates: { latitude: 51.3764, longitude: -0.4589 } }
      ],
      partnerChurches: [
        { id: '3', name: 'Iglesia Evangelica', address: 'Av. Siempre Viva 742, Bogotá, Colombia', coordinates: { latitude: 4.6097, longitude: -74.0817 } },
        { id: '4', name: 'Faith Community Church', address: 'Nairobi, Kenya', coordinates: { latitude: -1.2864, longitude: 36.8172 } }
      ],
      others: [
        { id: '5', name: 'Compassion Child Centre', address: 'Port-au-Prince, Haiti', coordinates: { latitude: 18.5944, longitude: -72.3074 } }
      ]
    },
    // Add recommended resources with verified images
    resources: [
      { id: '1', type: 'book', title: 'Too Small to Ignore', author: 'Dr. Wess Stafford', cover: 'https://m.media-amazon.com/images/I/71D6e4acnVL._SY466_.jpg', link: 'https://www.amazon.com/Too-Small-Ignore-Children-Priority/dp/1400073928' },
      { id: '2', type: 'video', title: 'Compassion Child Sponsorship Tour', thumbnail: 'https://i.ytimg.com/vi/vCdUG7kw0KU/maxresdefault.jpg', duration: '15 min', link: 'https://youtu.be/vCdUG7kw0KU', cover: 'https://i.ytimg.com/vi/vCdUG7kw0KU/maxresdefault.jpg' },
      { id: '3', type: 'pdf', title: 'Poverty Unlocked Guide', pages: '24', cover: 'https://images.squarespace-cdn.com/content/v1/5a8e995f8a02c77ee592d1f2/1589317153310-X04BW05X04L0KPOE61M7/Poverty+Unlocked+small.jpg', link: 'https://www.compassion.com/poverty-unlocked.htm' }
    ],
    // Add partner organizations with verified images
    partners: [
      { id: '1', name: 'World Vision', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/World_Vision_logo.svg/1200px-World_Vision_logo.svg.png', banner: 'https://www.worldvision.ca/WorldVisionCanada/media/our-work/where-we-work-redesign/hero-banner-where-we-work.jpg', type: 'Humanitarian Aid' },
      { id: '2', name: 'Tearfund', logo: 'https://assets.tearfund.org/-/media/tearfund/images/homepage/tearfund-logo-white-padding.png', banner: 'https://www.tearfund.org/-/media/tearfund/images/stories/stories-world-map-d.jpg', type: 'Relief & Development' }
    ]
  },
  '2': {
    website: 'https://elevationchurch.org',
    founded: '2006',
    employees: '100-500',
    description: `Elevation Church is a multi-site church led by Pastor Steven Furtick, headquartered in Charlotte, North Carolina. As of 2022, Elevation Church has 20 locations, with the majority in and around the Charlotte area.\n\nElevation Church's services consist of worship and a sermon. The church holds weekend worship services at its different locations. The church also offers eGroups, which are small groups that meet throughout the week. These groups focus on building community, Bible study, and serving others.\n\nElevation Church is known for its worship ministry, Elevation Worship, which has produced numerous popular worship songs that are sung in churches around the world. The church has been recognized for its growth, innovative approach to ministry, and technological integration.`,
    // Add location data
    locations: {
      offices: [
        { id: '1', name: 'Ballantyne Campus', address: '8835 Blakeney Professional Dr, Charlotte, NC 28277', coordinates: { latitude: 35.0562, longitude: -80.8429 } }
      ],
      partnerChurches: [
        { id: '2', name: 'Lake Norman Campus', address: '8325 Copley Dr, Cornelius, NC 28031', coordinates: { latitude: 35.4816, longitude: -80.8708 } },
        { id: '3', name: 'University City Campus', address: '8105 IBM Dr, Charlotte, NC 28262', coordinates: { latitude: 35.3027, longitude: -80.7500 } }
      ],
      others: [
        { id: '4', name: 'Rock Hill Campus', address: '375 Star Light Dr, Fort Mill, SC 29715', coordinates: { latitude: 35.0068, longitude: -80.9288 } }
      ]
    },
    // Add recommended resources with verified images
    resources: [
      { id: '1', type: 'book', title: 'Sun Stand Still', author: 'Steven Furtick', cover: 'https://m.media-amazon.com/images/I/81qfj6y+w4L._SY466_.jpg', link: 'https://www.amazon.com/Sun-Stand-Still-Impossible-Audacious/dp/1601423225' },
      { id: '2', type: 'video', title: 'Elevation Worship - Graves Into Gardens', thumbnail: 'https://i.ytimg.com/vi/KwX1f2gYKZ4/maxresdefault.jpg', duration: '8 min', link: 'https://youtu.be/KwX1f2gYKZ4', cover: 'https://i.ytimg.com/vi/KwX1f2gYKZ4/maxresdefault.jpg' },
      { id: '3', type: 'sermon', title: 'The Blessing Is In The Battle', duration: '45 min', cover: 'https://scontent-lhr8-1.xx.fbcdn.net/v/t39.30808-6/302261064_618091466322499_8836600401173854252_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=TgWEUIT9XjYAX9NLNrO&_nc_ht=scontent-lhr8-1.xx&oh=00_AfCoxu-i-RQJNeIjL2__ZPOR_nEGsvlOQYUx31I02Oi9eg&oe=655E9D12', link: 'https://elevationchurch.org/sermons/' }
    ],
    // Add partner organizations with verified images
    partners: [
      { id: '1', name: 'Proverbs 31 Ministries', logo: 'https://www.proverbs31.org/images/proverbs31-logo.png', banner: 'https://res.cloudinary.com/dzikdgvxj/image/upload/v1587995413/uploads/product-collections/proverbs31logo.png', type: 'Women\'s Ministry' },
      { id: '2', name: 'Samaritan\'s Purse', logo: 'https://www.samaritanspurse.org/wp-content/uploads/2022/11/Nav-Logo.png', banner: 'https://www.samaritanspurse.org/wp-content/uploads/2019/11/home-1200-OCC-shoebox.jpg', type: 'Humanitarian Aid' }
    ]
  },
  '3': {
    website: 'https://www.chick-fil-a.com',
    founded: '1946',
    employees: '10,000+',
    description: `Chick-fil-A is an American fast food restaurant chain founded by S. Truett Cathy, headquartered in College Park, Georgia, and specializing in chicken sandwiches. The company is known for its distinctive corporate culture based on Christian values.\n\nChick-fil-A's business model includes being closed on Sundays, as well as Christian music being played in restaurants. The company's mission statement is "To glorify God by being a faithful steward of all that is entrusted to us and to have a positive influence on all who come into contact with Chick-fil-A."\n\nThe company is known for its customer service, quality food, and commitment to community service. Chick-fil-A restaurants are individually owned and operated by independent Owner-Operators who typically invest time in recruiting and training team members with a focus on creating a positive working environment.`,
    // Add location data
    locations: {
      offices: [
        { id: '1', name: 'Corporate Headquarters', address: '5200 Buffington Rd, Atlanta, GA 30349', coordinates: { latitude: 33.6289, longitude: -84.4120 } }
      ],
      partnerChurches: [],
      others: [
        { id: '2', name: 'Chick-fil-A Dwarf House', address: '461 N Central Ave, Hapeville, GA 30354', coordinates: { latitude: 33.6612, longitude: -84.4106 } },
        { id: '3', name: 'Truett\'s Luau', address: '600 W Lanier Ave, Fayetteville, GA 30214', coordinates: { latitude: 33.4659, longitude: -84.4712 } }
      ]
    },
    // Add recommended resources with verified images
    resources: [
      { id: '1', type: 'book', title: 'It\'s Better to Build Boys Than Mend Men', author: 'S. Truett Cathy', cover: 'https://m.media-amazon.com/images/I/51mRNQN2tTL._SY466_.jpg', link: 'https://www.amazon.com/Its-Better-Build-Boys-Than/dp/1929619464' },
      { id: '2', type: 'video', title: 'The Chick-fil-A Way', thumbnail: 'https://i.ytimg.com/vi/FqS5oZj9Av4/maxresdefault.jpg', duration: '12 min', link: 'https://youtu.be/FqS5oZj9Av4', cover: 'https://i.ytimg.com/vi/FqS5oZj9Av4/maxresdefault.jpg' },
      { id: '3', type: 'pdf', title: 'Leadership Guide', pages: '32', cover: 'https://fastercapital.com/images/content/Build-better-leadership-with-Chick-fil-A-Leadership-Development-Model.webp', link: 'https://www.chick-fil-a.com/about/leadership' }
    ],
    // Add partner organizations with verified images
    partners: [
      { id: '1', name: 'WinShape Foundation', logo: 'https://winshape.org/wp-content/uploads/2022/04/winshape-camps-logo.svg', banner: 'https://winshape.org/wp-content/uploads/2022/05/winshape-home-hero-desktop.jpg', type: 'Charitable Foundation' },
      { id: '2', name: 'Junior Achievement', logo: 'https://jausa.ja.org/dA/30eb13e686/image/JA_New%20Logo_CMYK.png', banner: 'https://pbs.twimg.com/profile_banners/19767388/1689961814/1500x500', type: 'Youth Development' }
    ]
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

// New component: LocationMapItem - displays a map location
const LocationMapItem = ({ location }) => {
  // Use a more reliable static map service with no API key required
  const googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.coordinates.latitude},${location.coordinates.longitude}&zoom=14&size=400x200&markers=color:red%7C${location.coordinates.latitude},${location.coordinates.longitude}&key=AIzaSyBBLyWj-3FWtCbCXGW3ysEiI2fDfrv2v0Q`;
  
  // Use OpenStreetMap as a fallback without API key
  const openStreetMapUrl = `https://static-maps.yandex.ru/1.x/?ll=${location.coordinates.longitude},${location.coordinates.latitude}&size=400,200&z=14&pt=${location.coordinates.longitude},${location.coordinates.latitude},pm2rdl&l=map`;
  
  const [imageError, setImageError] = useState(false);
  
  // Render a colored placeholder with location name if all map sources fail
  const renderPlaceholder = () => (
    <View className="bg-indigo-50 w-full h-full items-center justify-center">
      <Ionicons name="map-outline" size={32} color="#6366f1" />
      <Text className="text-indigo-600 mt-2 font-medium">{location.name}</Text>
      <Text className="text-gray-500 text-xs mt-1">Map location</Text>
    </View>
  );
  
  return (
    <View className="border border-gray-200 rounded-lg mb-3 overflow-hidden">
      <View className="bg-gray-100 h-36">
        {imageError ? renderPlaceholder() : (
          <Image 
            source={{ uri: openStreetMapUrl }}
            className="w-full h-full"
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        )}
        <View className="absolute top-2 right-2 bg-white p-1 rounded-md shadow-sm">
          <Ionicons name="navigate" size={16} color="#f43f5e" />
        </View>
      </View>
      <View className="p-3">
        <Text className="font-bold text-base">{location.name}</Text>
        <View className="flex-row items-center mt-1">
          <Ionicons name="location-outline" size={14} color="#6b7280" />
          <Text className="text-gray-600 text-sm ml-1">{location.address}</Text>
        </View>
      </View>
    </View>
  );
};

// New component: LocationsSection - displays different types of locations
const LocationsSection = ({ locations }) => {
  const [activeTab, setActiveTab] = useState('offices');
  
  const getActiveLocations = () => {
    switch(activeTab) {
      case 'offices': return locations?.offices || [];
      case 'partners': return locations?.partnerChurches || [];
      case 'others': return locations?.others || [];
      default: return [];
    }
  };
  
  const activeLocations = getActiveLocations();
  
  return (
    <View className="mb-6 px-4">
      <Text className="text-lg font-bold mb-3">Locations</Text>
      
      {/* Tab selector */}
      <View className="flex-row bg-gray-100 rounded-lg p-1 mb-3">
        <TouchableOpacity 
          className={`flex-1 py-2 rounded-md flex-row justify-center items-center ${
            activeTab === 'offices' ? 'bg-white shadow-sm' : ''
          }`}
          onPress={() => setActiveTab('offices')}
        >
          <Ionicons 
            name="business-outline" 
            size={16} 
            color={activeTab === 'offices' ? '#4f46e5' : '#6b7280'} 
            style={{ marginRight: 4 }}
          />
          <Text className={activeTab === 'offices' ? 'text-indigo-600 font-medium' : 'text-gray-600'}>
            Offices
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className={`flex-1 py-2 rounded-md flex-row justify-center items-center ${
            activeTab === 'partners' ? 'bg-white shadow-sm' : ''
          }`}
          onPress={() => setActiveTab('partners')}
        >
          <Ionicons 
            name="people-outline" 
            size={16} 
            color={activeTab === 'partners' ? '#4f46e5' : '#6b7280'} 
            style={{ marginRight: 4 }}
          />
          <Text className={activeTab === 'partners' ? 'text-indigo-600 font-medium' : 'text-gray-600'}>
            Partners
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className={`flex-1 py-2 rounded-md flex-row justify-center items-center ${
            activeTab === 'others' ? 'bg-white shadow-sm' : ''
          }`}
          onPress={() => setActiveTab('others')}
        >
          <Ionicons 
            name="location-outline" 
            size={16} 
            color={activeTab === 'others' ? '#4f46e5' : '#6b7280'} 
            style={{ marginRight: 4 }}
          />
          <Text className={activeTab === 'others' ? 'text-indigo-600 font-medium' : 'text-gray-600'}>
            Others
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Location maps */}
      {activeLocations.length > 0 ? (
        <View>
          {activeLocations.map(location => (
            <LocationMapItem key={location.id} location={location} />
          ))}
        </View>
      ) : (
        <View className="items-center justify-center py-8 bg-gray-50 rounded-lg">
          <Ionicons name="location-outline" size={32} color="#9ca3af" />
          <Text className="text-gray-500 mt-2">No {activeTab} locations available</Text>
        </View>
      )}
    </View>
  );
};

// New component: ResourceCard - displays a recommended resource
const ResourceCard = ({ resource, onPress }) => {
  const [imageError, setImageError] = useState(false);
  
  const getResourceIcon = (type) => {
    switch(type) {
      case 'book': return 'book-outline';
      case 'video': return 'videocam-outline';
      case 'pdf': return 'document-text-outline';
      case 'sermon': return 'mic-outline';
      default: return 'link-outline';
    }
  };
  
  const getDefaultCover = (type) => {
    // Create a colored placeholder based on resource type
    switch(type) {
      case 'book': return 'https://via.placeholder.com/120x180/4f46e5/ffffff?text=Book';
      case 'video': return 'https://via.placeholder.com/120x180/ef4444/ffffff?text=Video';
      case 'pdf': return 'https://via.placeholder.com/120x180/0ea5e9/ffffff?text=PDF';
      case 'sermon': return 'https://via.placeholder.com/120x180/14b8a6/ffffff?text=Sermon';
      default: return 'https://via.placeholder.com/120x180/6b7280/ffffff?text=Resource';
    }
  };
  
  // Instead of showing the image, let's show a styled resource card for better reliability
  return (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm overflow-hidden mb-3"
      onPress={() => onPress(resource)}
      activeOpacity={0.7}
    >
      <View className="flex-row">
        <View className="w-20 h-24 items-center justify-center" style={{
          backgroundColor: resource.type === 'book' ? '#ede9fe' : 
                           resource.type === 'video' ? '#fee2e2' :
                           resource.type === 'pdf' ? '#e0f2fe' :
                           resource.type === 'sermon' ? '#ccfbf1' : '#f3f4f6'
        }}>
          <Ionicons 
            name={getResourceIcon(resource.type)} 
            size={24} 
            color={
              resource.type === 'book' ? '#8b5cf6' : 
              resource.type === 'video' ? '#ef4444' :
              resource.type === 'pdf' ? '#0ea5e9' :
              resource.type === 'sermon' ? '#14b8a6' : '#6b7280'
            } 
          />
        </View>
        <View className="flex-1 p-3">
          <Text className="font-bold">{resource.title}</Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name={getResourceIcon(resource.type)} size={14} color="#6b7280" />
            <Text className="text-gray-600 text-sm ml-1 capitalize">{resource.type}</Text>
            
            {resource.duration && (
              <>
                <Text className="text-gray-400 mx-1">•</Text>
                <Ionicons name="time-outline" size={14} color="#6b7280" />
                <Text className="text-gray-600 text-sm ml-1">{resource.duration}</Text>
              </>
            )}
            
            {resource.pages && (
              <>
                <Text className="text-gray-400 mx-1">•</Text>
                <Ionicons name="document-outline" size={14} color="#6b7280" />
                <Text className="text-gray-600 text-sm ml-1">{resource.pages} pages</Text>
              </>
            )}
          </View>
          
          {resource.author && (
            <Text className="text-gray-700 text-sm mt-1">By {resource.author}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// New component: PartnerCard - displays a partner organization
const PartnerCard = ({ partner, onPress }) => {
  // Let's create a simpler, more reliable card that doesn't rely on external images
  return (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm overflow-hidden mb-3"
      style={{ width: '48%' }}
      onPress={() => onPress(partner)}
      activeOpacity={0.7}
    >
      <View className="bg-indigo-50 h-24 items-center justify-center">
        <View className="w-12 h-12 rounded-full bg-white items-center justify-center">
          <Text className="text-indigo-600 font-bold text-xl">{partner.name.charAt(0)}</Text>
        </View>
      </View>
      <View className="p-2">
        <Text className="font-bold text-center" numberOfLines={1}>{partner.name}</Text>
        <Text className="text-gray-600 text-xs text-center" numberOfLines={1}>{partner.type}</Text>
      </View>
    </TouchableOpacity>
  );
};

// New component: PartnersSection - displays partner organizations
const PartnersSection = ({ partners }) => {
  const navigation = useNavigation();
  
  const handlePartnerPress = (partner) => {
    // In a real app, this would navigate to the partner's detail screen
    // We'll simulate this by showing an alert for now
    Alert.alert(
      partner.name,
      `You would navigate to the details page for ${partner.name}.`,
      [{ text: 'OK' }]
    );
  };
  
  return (
    <View className="mb-6 px-4">
      <Text className="text-lg font-bold mb-3">Partners</Text>
      {partners && partners.length > 0 ? (
        <View className="flex-row flex-wrap justify-between">
          {partners.map(partner => (
            <PartnerCard 
              key={partner.id} 
              partner={partner} 
              onPress={handlePartnerPress}
            />
          ))}
        </View>
      ) : (
        <View className="items-center justify-center py-8 bg-gray-50 rounded-lg">
          <Ionicons name="people-outline" size={32} color="#9ca3af" />
          <Text className="text-gray-500 mt-2">No partners available</Text>
        </View>
      )}
    </View>
  );
};

// New component: ResourcesSection - displays recommended resources
const ResourcesSection = ({ resources }) => {
  const handleResourcePress = (resource) => {
    Linking.openURL(resource.link);
  };
  
  return (
    <View className="mb-6 px-4">
      <Text className="text-lg font-bold mb-3">Recommended Resources</Text>
      {resources && resources.length > 0 ? (
        <View>
          {resources.map(resource => (
            <ResourceCard 
              key={resource.id} 
              resource={resource} 
              onPress={handleResourcePress}
            />
          ))}
        </View>
      ) : (
        <View className="items-center justify-center py-8 bg-gray-50 rounded-lg">
          <Ionicons name="book-outline" size={32} color="#9ca3af" />
          <Text className="text-gray-500 mt-2">No recommended resources available</Text>
        </View>
      )}
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
    description: 'No detailed description available.',
    locations: { offices: [], partnerChurches: [], others: [] },
    resources: [],
    partners: []
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
        
        {/* Locations Section - NEW */}
        <LocationsSection locations={details.locations} />
          
        {/* Daily Moment Viewer - It handles its own internal padding and margins (mx-4 for side margins) */}
        <DailyMomentViewer organizationId={organization.id} />
        
        {/* Recommended Resources Section - NEW */}
        <ResourcesSection resources={details.resources} />
        
        {/* Partner Organizations Section - NEW */}
        <PartnersSection partners={details.partners} />
        
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
        
        {/* Location section - already had px-4 */}
        <View className="mb-6 px-4">
            <Text className="text-lg font-bold mb-2">Location</Text>
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={18} color="#6b7280" />
              <Text className="text-gray-700 ml-2">{organization.location}</Text>
            </View>
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