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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

// Import Exchange screens
import ExchangeScreen from './components/Exchange/ExchangeScreen';
import ExchangeDetailScreen from './components/Exchange/ExchangeDetailScreen';
import NeededItemDetailScreen from './components/Exchange/NeededItemDetailScreen';
import PostNeededItemScreen from './components/Exchange/PostNeededItemScreen';

// Import Moments screens
import MomentViewer from './components/Moments/MomentViewer';
import MomentArrangeScreen from './components/Moments/MomentArrangeScreen';
import MomentCreationScreen from './components/Moments/MomentCreationScreen';

// Import new top-level screens
import CommunityScreen from './components/Community/CommunityScreen';
import MarketplaceScreen from './components/Marketplace/MarketplaceScreen';
import LibraryScreen from './components/Library/LibraryScreen';

// Create navigators
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const CommunityStack = createStackNavigator();
const MarketplaceStack = createStackNavigator();
const LibraryStack = createStackNavigator();

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
      name="PostDetails" 
      component={PostDetailsScreen} 
      options={{ 
        headerShown: false,
      }}
    />
    <HomeStack.Screen
      name="EventDetails" 
      component={EventDetailsScreen} 
      options={{ 
        headerShown: false,
      }}
    />
    <HomeStack.Screen
      name="JobDetails" 
      component={JobDetailsScreen} 
      options={{ 
        headerShown: false,
      }}
    />
  </HomeStack.Navigator>
);

// Community Stack Navigator
const CommunityStackNavigator = () => (
  <CommunityStack.Navigator>
    <CommunityStack.Screen 
      name="CommunityHome" 
      component={CommunityScreen} 
      options={{ headerShown: false }}
    />
    <CommunityStack.Screen
      name="Organizations"
      component={OrganizationsScreen}
      options={{ 
        headerTitle: "Organizations",
        headerBackTitleVisible: false
      }}
    />
    <CommunityStack.Screen
      name="OrganizationDetail"
      component={OrganizationDetailScreen}
      options={{ 
        headerTitle: "",
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerTintColor: "#fff"
      }}
    />
    <CommunityStack.Screen
      name="JobDetails" 
      component={JobDetailsScreen} 
      options={{ 
        headerShown: false,
      }}
    />
    <CommunityStack.Screen
      name="EventDetails" 
      component={EventDetailsScreen} 
      options={{ 
        headerShown: false,
      }}
    />
    <CommunityStack.Screen 
      name="GroupList"
      component={GroupListScreen}
      options={({ route }) => ({ 
        headerTitle: "Groups",
        headerBackTitleVisible: false,
      })}
    />
    <CommunityStack.Screen 
      name="GroupDetail"
      component={GroupDetailScreen}
      options={({ route }) => ({ 
        headerTitle: route.params?.groupName || "Group Details",
        headerBackTitleVisible: false,
      })}
    />
    <CommunityStack.Screen
      name="GroupDiscussion"
      component={GroupDiscussionScreen}
      options={({ route }) => ({ 
        headerTitle: route.params?.groupName || "Chat",
        headerBackTitleVisible: false,
      })}
    />
  </CommunityStack.Navigator>
);

// Marketplace Stack Navigator
const MarketplaceStackNavigator = () => (
  <MarketplaceStack.Navigator>
    <MarketplaceStack.Screen 
      name="MarketplaceHome" 
      component={MarketplaceScreen} 
      options={{ headerShown: false }}
    />
    <MarketplaceStack.Screen 
      name="ExchangeDetail" 
      component={ExchangeDetailScreen} 
      options={{ 
        headerShown: false,
      }}
    />
    <MarketplaceStack.Screen 
      name="NeededItemDetail" 
      component={NeededItemDetailScreen} 
      options={{ 
        headerShown: false,
      }}
    />
    <MarketplaceStack.Screen 
      name="PostNeededItem" 
      component={PostNeededItemScreen} 
      options={{ 
        headerShown: false,
      }}
    />
    <MarketplaceStack.Screen 
      name="CreateListing" 
      component={PostNeededItemScreen} // Reuse this screen for now, can be replaced with a dedicated one later
      options={{ 
        headerShown: false,
      }}
    />
  </MarketplaceStack.Navigator>
);

// Library Stack Navigator
const LibraryStackNavigator = () => (
  <LibraryStack.Navigator>
    <LibraryStack.Screen 
      name="LibraryHome" 
      component={LibraryScreen} 
      options={{ headerShown: false }}
    />
    {/* Add more screens for Bible reader, book reader, etc. here */}
  </LibraryStack.Navigator>
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
                paddingBottom: 0, 
                height: 55,
                // Ensures tab bar doesn't overlap with home indicator
                paddingVertical: 3,
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
                } else if (route.name === 'Community') {
                  iconName = focused ? 'people' : 'people-outline';
                } else if (route.name === 'Marketplace') {
                  iconName = focused ? 'storefront' : 'storefront-outline';
                } else if (route.name === 'Library') {
                  return <MaterialCommunityIcons 
                            name={focused ? 'bookshelf' : 'bookshelf'} 
                            size={size} 
                            color={color} 
                         />;
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Community" component={CommunityStackNavigator} />
            <Tab.Screen name="Marketplace" component={MarketplaceStackNavigator} />
            <Tab.Screen name="Library" component={LibraryStackNavigator} />
          </Tab.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
