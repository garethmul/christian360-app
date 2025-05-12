import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import our custom screens
import HomeScreen from './components/Home/HomeScreen';
import PostsScreen from './components/Posts/PostsScreen';
import CreatePostScreen from './components/Posts/CreatePostScreen';
import PostDetailsScreen from './components/Posts/PostDetailsScreen';
import JobsScreen from './components/Jobs/JobsScreen';
import JobDetailsScreen from './components/Jobs/JobDetailsScreen';
import EventsScreen from './components/Events/EventsScreen';
import EventDetailsScreen from './components/Events/EventDetailsScreen';
import AccommodationScreen from './components/Accommodation/AccommodationScreen';
import MoreScreen from './components/MoreScreen';
import OrganizationsScreen from './components/Organizations/OrganizationsScreen';
import OrganizationDetailScreen from './components/Organizations/OrganizationDetailScreen';
import GroupListScreen from './components/Groups/GroupListScreen';
import GroupDetailScreen from './components/Groups/GroupDetailScreen';
import GroupDiscussionScreen from './components/Groups/GroupDiscussionScreen';

// Import screens for "More" tab
import GroupsScreen from './components/Groups/GroupsScreen';
import RecommendedReadingScreen from './components/RecommendedReading/RecommendedReadingScreen';
import DigitalProductsScreen from './components/DigitalProducts/DigitalProductsScreen';
import PartnerOrganizationsScreen from './components/PartnerOrganizations/PartnerOrganizationsScreen';
import LocationsScreen from './components/Locations/LocationsScreen';

// Add these imports
import ExchangeScreen from './components/Exchange/ExchangeScreen';
import ExchangeDetailScreen from './components/Exchange/ExchangeDetailScreen';
import NeededItemDetailScreen from './components/Exchange/NeededItemDetailScreen';
import PostNeededItemScreen from './components/Exchange/PostNeededItemScreen';

// Add these imports for Moments
import MomentViewer from './components/Moments/MomentViewer';
import MomentArrangeScreen from './components/Moments/MomentArrangeScreen';
import MomentCreationScreen from './components/Moments/MomentCreationScreen';

// Add this import for the new CommunityScreen
import CommunityScreen from './components/Community/CommunityScreen';

// Create navigators
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const PostsStack = createStackNavigator();
const JobsStack = createStackNavigator();
const EventsStack = createStackNavigator();
const MoreStack = createStackNavigator();
const OrganizationsStack = createStackNavigator();

// Home Stack Navigator
const HomeStackNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen 
      name="HomeFeed" 
      component={HomeScreen} 
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name="Organizations"
      component={OrganizationsScreen}
      options={{ 
        headerTitle: "Organizations",
        headerBackTitleVisible: false
      }}
    />
    <HomeStack.Screen
      name="OrganizationDetail"
      component={OrganizationDetailScreen}
      options={{ 
        headerTitle: "",
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerTintColor: "#fff"
      }}
    />
    <HomeStack.Screen 
      name="MomentViewer" 
      component={MomentViewer} 
      options={{ 
        headerShown: false,
        presentation: 'fullScreenModal'
      }}
    />
    <HomeStack.Screen 
      name="MomentArrange" 
      component={MomentArrangeScreen} 
      options={{ 
        headerShown: false,
        presentation: 'modal'
      }}
    />
    <HomeStack.Screen 
      name="MomentCreation" 
      component={MomentCreationScreen} 
      options={{ 
        headerShown: false,
        presentation: 'modal'
      }}
    />
    <HomeStack.Screen 
      name="CreatePost" 
      component={CreatePostScreen} 
      options={{ 
        headerShown: false,
        presentation: 'modal',
      }}
    />
    <HomeStack.Screen 
      name="PostDetails" 
      component={PostDetailsScreen} 
      options={{ 
        headerShown: false,
      }}
    />
  </HomeStack.Navigator>
);

// Organizations Stack Navigator
const OrganizationsStackNavigator = () => (
  <OrganizationsStack.Navigator>
    <OrganizationsStack.Screen 
      name="OrganizationsHome" 
      component={OrganizationsScreen} 
      options={{ 
        headerTitle: "Organizations",
        headerBackTitleVisible: false
      }}
    />
    <OrganizationsStack.Screen
      name="OrganizationDetail"
      component={OrganizationDetailScreen}
      options={{ 
        headerTitle: "",
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerTintColor: "#fff"
      }}
    />
    <OrganizationsStack.Screen 
      name="GroupList"
      component={GroupListScreen}
      options={({ route }) => ({ 
        headerTitle: "Groups",
        headerBackTitleVisible: false,
      })}
    />
    <OrganizationsStack.Screen 
      name="GroupDetail"
      component={GroupDetailScreen}
      options={({ route }) => ({ 
        headerTitle: route.params?.groupName || "Group Details",
        headerBackTitleVisible: false,
      })}
    />
    <OrganizationsStack.Screen
      name="GroupDiscussion"
      component={GroupDiscussionScreen}
      options={({ route }) => ({ 
        headerTitle: route.params?.groupName || "Chat",
        headerBackTitleVisible: false,
      })}
    />
  </OrganizationsStack.Navigator>
);

// Posts Stack Navigator
const PostsStackNavigator = () => (
  <PostsStack.Navigator>
    <PostsStack.Screen 
      name="PostsFeed" 
      component={PostsScreen} 
      options={{ headerShown: false }}
    />
    <PostsStack.Screen 
      name="CreatePost" 
      component={CreatePostScreen} 
      options={{ 
        headerShown: false,
        presentation: 'modal',
      }}
    />
    <PostsStack.Screen 
      name="PostDetails" 
      component={PostDetailsScreen} 
      options={{ 
        headerShown: false,
      }}
    />
  </PostsStack.Navigator>
);

// Jobs Stack Navigator
const JobsStackNavigator = () => (
  <JobsStack.Navigator>
    <JobsStack.Screen 
      name="JobsFeed" 
      component={JobsScreen} 
      options={{ headerShown: false }}
    />
    <JobsStack.Screen 
      name="JobDetails" 
      component={JobDetailsScreen} 
      options={{ 
        headerShown: false,
      }}
    />
  </JobsStack.Navigator>
);

// Events Stack Navigator
const EventsStackNavigator = () => (
  <EventsStack.Navigator>
    <EventsStack.Screen 
      name="EventsFeed" 
      component={EventsScreen} 
      options={{ headerShown: false }}
    />
    <EventsStack.Screen 
      name="EventDetails" 
      component={EventDetailsScreen} 
      options={{ 
        headerShown: false,
      }}
    />
  </EventsStack.Navigator>
);

// More Stack Navigator
const MoreStackNavigator = () => (
  <MoreStack.Navigator>
    <MoreStack.Screen 
      name="MoreHome" 
      component={MoreScreen} 
      options={{ headerShown: false }}
    />
    <MoreStack.Screen
      name="Organizations"
      component={OrganizationsScreen}
      options={{ headerShown: true, title: 'Organizations' }}
    />
    <MoreStack.Screen
      name="Groups"
      component={GroupsScreen}
      options={{ headerShown: true, title: 'Groups' }}
    />
    <MoreStack.Screen
      name="RecommendedReading"
      component={RecommendedReadingScreen}
      options={{ headerShown: true, title: 'Recommended Reading' }}
    />
    <MoreStack.Screen
      name="DigitalProducts"
      component={DigitalProductsScreen}
      options={{ headerShown: true, title: 'Digital Products' }}
    />
    <MoreStack.Screen
      name="PartnerOrganizations"
      component={PartnerOrganizationsScreen}
      options={{ headerShown: true, title: 'Partner Organizations' }}
    />
    <MoreStack.Screen
      name="Locations"
      component={LocationsScreen}
      options={{ headerShown: true, title: 'Locations' }}
    />
  </MoreStack.Navigator>
);

// Exchange Stack Navigator
const ExchangeStack = createStackNavigator();

const ExchangeStackNavigator = () => (
  <ExchangeStack.Navigator>
    <ExchangeStack.Screen 
      name="ExchangeHome" 
      component={ExchangeScreen} 
      options={{ headerShown: false }}
    />
    <ExchangeStack.Screen 
      name="ExchangeDetail" 
      component={ExchangeDetailScreen} 
      options={{ 
        headerShown: false,
      }}
    />
    <ExchangeStack.Screen 
      name="NeededItemDetail" 
      component={NeededItemDetailScreen} 
      options={{ 
        headerShown: false,
      }}
    />
    <ExchangeStack.Screen 
      name="PostNeededItem" 
      component={PostNeededItemScreen} 
      options={{ 
        headerShown: false,
      }}
    />
  </ExchangeStack.Navigator>
);

// Create a Community Stack Navigator
const CommunityStack = createStackNavigator();

const CommunityStackNavigator = () => (
  <CommunityStack.Navigator>
    <CommunityStack.Screen 
      name="CommunityHome" 
      component={CommunityScreen} 
      options={{ headerShown: false }}
    />
  </CommunityStack.Navigator>
);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: '#6366f1',
              tabBarInactiveTintColor: '#9ca3af',
              tabBarStyle: { 
                paddingBottom: 8, 
                height: 65,
                // Ensures tab bar doesn't overlap with home indicator
                paddingVertical: 5,
                backgroundColor: '#ffffff',
                borderTopWidth: 1,
                borderTopColor: '#f3f4f6',
                elevation: 8,
                shadowOpacity: 0.1,
                shadowRadius: 4
              },
              tabBarItemStyle: {
                paddingTop: 0,
                marginTop: -2,
              },
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '500',
                paddingBottom: 3,
                marginTop: -2
              },
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Jobs') {
                  iconName = focused ? 'briefcase' : 'briefcase-outline';
                } else if (route.name === 'Events') {
                  iconName = focused ? 'calendar' : 'calendar-outline';
                } else if (route.name === 'Organizations') {
                  iconName = focused ? 'business' : 'business-outline';
                } else if (route.name === 'Community') {
                  iconName = focused ? 'people' : 'people-outline';
                } else if (route.name === 'More') {
                  iconName = focused ? 'menu' : 'menu-outline';
                } else if (route.name === 'Exchange') {
                  iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Community" component={CommunityStackNavigator} />
            <Tab.Screen name="Jobs" component={JobsStackNavigator} />
            <Tab.Screen name="Events" component={EventsStackNavigator} />
            <Tab.Screen name="Organizations" component={OrganizationsStackNavigator} />
            <Tab.Screen name="Exchange" component={ExchangeStackNavigator} />
            <Tab.Screen name="More" component={MoreStackNavigator} />
          </Tab.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
