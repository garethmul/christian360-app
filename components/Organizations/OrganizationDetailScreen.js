import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, ScrollView, FlatList, Dimensions } from 'react-native';
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