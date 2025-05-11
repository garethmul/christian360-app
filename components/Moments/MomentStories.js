import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  Animated,
  StyleSheet,
  Easing
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const STORY_SIZE = 74;
const STORY_BORDER_WIDTH = 3;

// Updated sample data for moments, organized by time of day
const sampleMoments = [
  // Morning moments
  {
    id: 'moment1',
    title: 'Morning Prayer',
    time: '07:00',
    timeSlot: 'morning',
    user: {
      id: 'user1',
      name: 'Emma Taylor',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'verse', text: 'Psalm 5:3', content: 'In the morning, Lord, you hear my voice; in the morning I lay my requests before you and wait expectantly.' },
      { type: 'prayer', content: 'Lord, as I begin this day, guide my thoughts and actions...' },
      { type: 'reflection', content: 'How can I be more intentional about starting my day with God?' }
    ]
  },
  {
    id: 'morning2',
    title: 'Morning Devotion',
    time: '08:30',
    timeSlot: 'morning',
    user: {
      id: 'user6',
      name: 'Michael Reed',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
    },
    image: 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'verse', text: 'Lamentations 3:22-23', content: 'Because of the Lord\'s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.' },
      { type: 'prayer', content: 'Thank you Lord for your new mercies this morning...' }
    ]
  },
  {
    id: 'morning3',
    title: 'Daily Devotional',
    time: '06:45',
    timeSlot: 'morning',
    user: {
      id: 'ucb1',
      name: 'UCB Word For Today',
      avatar: 'https://cdn.brandfetch.io/ucb.co.uk/w/400/h/400?c=1idFkiTx5HBFaBeItgg'
    },
    image: 'https://images.unsplash.com/photo-1505455184862-554165e5f6ba?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'verse', text: 'Proverbs 3:5-6', content: 'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.' },
      { type: 'reflection', content: 'How often do we try to figure everything out on our own instead of trusting God?' },
      { type: 'prayer', content: 'Lord, help me to trust you completely today, even when I don\'t understand.' }
    ]
  },
  {
    id: 'morning4',
    title: 'Morning Reflection',
    time: '07:30',
    timeSlot: 'morning',
    user: {
      id: 'alpha1',
      name: 'Alpha',
      avatar: 'https://cdn.brandfetch.io/alpha.org/w/400/h/400?c=1idFkiTx5HBFaBeItgg'
    },
    image: 'https://images.unsplash.com/photo-1506252374453-ef91506312de?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'question', content: 'Who is Jesus to you today?' },
      { type: 'reflection', content: 'Take a moment to consider how your relationship with Jesus affects your daily life.' },
      { type: 'prayer', content: 'Jesus, help me to know you more deeply today.' }
    ]
  },
  {
    id: 'morning5',
    title: 'Prayer for Refugees',
    time: '08:15',
    timeSlot: 'morning',
    user: {
      id: 'sanctuary1',
      name: 'Sanctuary Foundation',
      avatar: 'https://cdn.brandfetch.io/sanctuaryfoundation.org.uk/w/400/h/400?c=1idFkiTx5HBFaBeItgg'
    },
    image: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'verse', text: 'Leviticus 19:34', content: 'The foreigner residing among you must be treated as your native-born. Love them as yourself, for you were foreigners in Egypt. I am the LORD your God.' },
      { type: 'prayer', content: 'Lord, we pray for those seeking refuge and safety. Give them hope and provision.' },
      { type: 'action', content: 'Consider one way you might support refugees in your community this week.' }
    ]
  },
  
  // Midday moments
  {
    id: 'moment2',
    title: 'Daily Verse',
    time: '12:00',
    timeSlot: 'midday',
    user: {
      id: 'user2',
      name: 'Daily Light',
      avatar: 'https://i.imgur.com/NE0e3Dt.png'
    },
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'verse', text: 'Philippians 4:13', content: 'I can do all things through Christ who strengthens me.' },
      { type: 'explanation', content: 'This verse reminds us that our strength comes not from ourselves but from Christ.' },
      { type: 'application', content: 'What challenge are you facing today that you need Christ\'s strength for?' }
    ]
  },
  {
    id: 'midday2',
    title: 'Lunch Break Reflection',
    time: '13:15',
    timeSlot: 'midday',
    user: {
      id: 'user7',
      name: 'Grace & Truth',
      avatar: 'https://i.imgur.com/LyV6Ckd.png'
    },
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'verse', text: 'Psalm 34:8', content: 'Taste and see that the Lord is good; blessed is the one who takes refuge in him.' },
      { type: 'reflection', content: 'How has God shown His goodness to you today?' }
    ]
  },
  {
    id: 'midday3',
    title: 'Fight Against Trafficking',
    time: '12:30',
    timeSlot: 'midday',
    user: {
      id: 'hopeforjustice1',
      name: 'Hope for Justice',
      avatar: 'https://cdn.brandfetch.io/hopeforjustice.org.uk/w/400/h/400?c=1idFkiTx5HBFaBeItgg'
    },
    image: 'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'info', content: 'Human trafficking affects millions worldwide. Today, pray for freedom and justice.' },
      { type: 'verse', text: 'Isaiah 1:17', content: 'Learn to do right; seek justice. Defend the oppressed.' },
      { type: 'prayer', content: 'Lord, break the chains of modern slavery and bring justice to the oppressed.' }
    ]
  },
  {
    id: 'midday4',
    title: 'Christian Aid Prayer',
    time: '13:45',
    timeSlot: 'midday',
    user: {
      id: 'christianaid1',
      name: 'Christian Aid',
      avatar: 'https://cdn.brandfetch.io/christianaid.org.uk/w/400/h/400?c=1idFkiTx5HBFaBeItgg'
    },
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbafc3ceb?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'focus', content: 'Today we pray for communities affected by poverty and climate change.' },
      { type: 'verse', text: 'Matthew 25:35', content: 'For I was hungry and you gave me something to eat, I was thirsty and you gave me something to drink, I was a stranger and you invited me in.' },
      { type: 'prayer', content: 'Father, move us to action on behalf of those suffering from poverty and injustice.' }
    ]
  },
  {
    id: 'midday5',
    title: 'Faith News Update',
    time: '11:30',
    timeSlot: 'midday',
    user: {
      id: 'premier1',
      name: 'Premier Christian News',
      avatar: 'https://cdn.brandfetch.io/premier.org.uk/w/400/h/400?c=1idFkiTx5HBFaBeItgg'
    },
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'news', content: 'Stories of faith from around the world that inspire and encourage.' },
      { type: 'prayer', content: 'Lord, we pray for the global church and those facing persecution.' },
      { type: 'reflection', content: 'How might these stories of faith encourage you in your own journey?' }
    ]
  },
  
  // Evening moments
  {
    id: 'moment3',
    title: 'Evening Reflection',
    time: '19:30',
    timeSlot: 'evening',
    user: {
      id: 'user3',
      name: 'Pastor David',
      avatar: 'https://randomuser.me/api/portraits/men/85.jpg'
    },
    image: 'https://images.unsplash.com/photo-1510137200597-2c01abeff42a?auto=format&fit=crop&w=500&q=60',
    viewed: true,
    content: [
      { type: 'question', content: 'How did you see God working in your life today?' },
      { type: 'meditation', content: 'Take a moment to reflect on the blessings of today...' },
      { type: 'prayer', content: 'Lord, thank you for your presence in my life today...' }
    ]
  },
  {
    id: 'evening2',
    title: 'Sunset Prayer',
    time: '20:15',
    timeSlot: 'evening',
    user: {
      id: 'user8',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'prayer', content: 'As the day comes to a close, I lift my heart to you...' },
      { type: 'gratitude', content: 'Three things I\'m grateful for today...' }
    ]
  },
  {
    id: 'evening3',
    title: 'Home For Good Devotional',
    time: '18:45',
    timeSlot: 'evening',
    user: {
      id: 'homeforgood1',
      name: 'Home For Good',
      avatar: 'https://cdn.brandfetch.io/homeforgood.org.uk/w/400/h/400?c=1idFkiTx5HBFaBeItgg'
    },
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'verse', text: 'Psalm 68:6', content: 'God sets the lonely in families.' },
      { type: 'reflection', content: 'Consider how we can welcome the vulnerable into our families and communities.' },
      { type: 'prayer', content: 'Lord, we pray for children waiting for homes and for families opening their hearts.' }
    ]
  },
  {
    id: 'evening4',
    title: 'Spring Harvest Worship',
    time: '19:00',
    timeSlot: 'evening',
    user: {
      id: 'springharvest1',
      name: 'Spring Harvest',
      avatar: 'https://cdn.brandfetch.io/springharvest.org/w/400/h/400?c=1idFkiTx5HBFaBeItgg'
    },
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'worship', content: 'Take time to worship with today\'s featured song: "Great Is Your Faithfulness"' },
      { type: 'verse', text: 'Psalm 150:6', content: 'Let everything that has breath praise the LORD. Praise the LORD.' },
      { type: 'prayer', content: 'Lord, receive my worship as I lift my voice to you in praise.' }
    ]
  },
  {
    id: 'evening5',
    title: 'Salvation Army Prayer',
    time: '18:15',
    timeSlot: 'evening',
    user: {
      id: 'salvationarmy1',
      name: 'Salvation Army',
      avatar: 'https://cdn.brandfetch.io/salvationarmy.org/w/400/h/400?c=1idFkiTx5HBFaBeItgg'
    },
    image: 'https://images.unsplash.com/photo-1469571486292-b53601012a8a?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'verse', text: 'Matthew 25:40', content: 'The King will reply, "Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me."' },
      { type: 'prayer', content: 'Lord, help us to serve others as we would serve you.' },
      { type: 'action', content: 'Consider donating time or resources to help those in need in your community.' }
    ]
  },
  
  // Night moments
  {
    id: 'moment4',
    title: 'Night Devotion',
    time: '21:45',
    timeSlot: 'night',
    user: {
      id: 'user4',
      name: 'Peace & Rest',
      avatar: 'https://i.imgur.com/H4PnCGh.png'
    },
    image: 'https://images.unsplash.com/photo-1488866022504-f2584929ca5f?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'verse', text: 'Psalm 4:8', content: 'In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.' },
      { type: 'gratitude', content: 'List three things you\'re thankful for today...' },
      { type: 'prayer', content: 'Lord, as I close this day...' }
    ]
  },
  {
    id: 'night2',
    title: 'Bedtime Scripture',
    time: '22:30',
    timeSlot: 'night',
    user: {
      id: 'user9',
      name: 'Night Light',
      avatar: 'https://i.imgur.com/PQhZBKD.png'
    },
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'verse', text: 'Psalm 91:1-2', content: 'Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, "He is my refuge and my fortress, my God, in whom I trust."' },
      { type: 'meditation', content: 'Rest in God\'s protection as you prepare for sleep...' }
    ]
  },
  {
    id: 'night3',
    title: 'Night Prayer',
    time: '21:15',
    timeSlot: 'night',
    user: {
      id: 'premier2',
      name: 'Premier Praise',
      avatar: 'https://cdn.brandfetch.io/premier.org.uk/w/400/h/400?c=1idFkiTx5HBFaBeItgg'
    },
    image: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'verse', text: 'Psalm 63:6', content: 'On my bed I remember you; I think of you through the watches of the night.' },
      { type: 'prayer', content: 'Lord, as the day ends, I surrender my thoughts, worries, and hopes to you.' },
      { type: 'worship', content: 'End your day with a moment of worship and praise.' }
    ]
  },
  {
    id: 'night4',
    title: 'Alpha Night Reflection',
    time: '22:00',
    timeSlot: 'night',
    user: {
      id: 'alpha2',
      name: 'Alpha',
      avatar: 'https://cdn.brandfetch.io/alpha.org/w/400/h/400?c=1idFkiTx5HBFaBeItgg'
    },
    image: 'https://images.unsplash.com/photo-1475070929565-c985b496cb9f?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'question', content: 'Where did you notice God\'s presence today?' },
      { type: 'verse', text: 'Matthew 11:28', content: 'Come to me, all you who are weary and burdened, and I will give you rest.' },
      { type: 'prayer', content: 'Jesus, I come to you with today\'s burdens. Grant me your perfect rest.' }
    ]
  },
  {
    id: 'night5',
    title: 'UCB Night Devotional',
    time: '23:00',
    timeSlot: 'night',
    user: {
      id: 'ucb2',
      name: 'UCB',
      avatar: 'https://cdn.brandfetch.io/ucb.co.uk/w/400/h/400?c=1idFkiTx5HBFaBeItgg'
    },
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'verse', text: 'Philippians 4:7', content: 'And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.' },
      { type: 'prayer', content: 'Lord, let your peace guard my heart and mind as I rest tonight.' },
      { type: 'meditation', content: 'Breathe deeply and allow God\'s peace to fill you as you prepare for sleep.' }
    ]
  },
  
  // Other moments
  {
    id: 'moment5',
    title: 'World Prayer',
    time: '16:00',
    timeSlot: 'afternoon',
    user: {
      id: 'user5',
      name: 'Global Mission',
      avatar: 'https://i.imgur.com/4QgRC0A.png'
    },
    image: 'https://images.unsplash.com/photo-1589483233147-8c6e2fb175a5?auto=format&fit=crop&w=500&q=60',
    viewed: false,
    content: [
      { type: 'focus', content: 'Today we pray for Christian communities in Northern Africa' },
      { type: 'info', content: 'Many believers in this region face persecution and limited resources...' },
      { type: 'prayer', content: 'Lord, strengthen and protect your people in Northern Africa...' }
    ]
  }
];

// Time slots configuration with their visual styles
const timeSlots = [
  { 
    id: 'morning', 
    title: 'Morning', 
    icon: 'sunny-outline',
    gradientColors: ['#ff9500', '#ff6a00']  // Orange gradient
  },
  { 
    id: 'midday', 
    title: 'Midday', 
    icon: 'sunny',
    gradientColors: ['#ffcd00', '#ff9500']  // Yellow gradient
  },
  { 
    id: 'evening', 
    title: 'Evening', 
    icon: 'partly-sunny-outline',
    gradientColors: ['#8b5cf6', '#6366f1']  // Purple to indigo gradient
  },
  { 
    id: 'night', 
    title: 'Night', 
    icon: 'moon-outline',
    gradientColors: ['#3b82f6', '#1e40af']  // Blue gradient
  },
];

// Time slot story bubble component with cross-fade animation
const TimeSlotStoryBubble = ({ timeSlot, moments, onPress, animationIndex, totalSlots }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [preloadIndex, setPreloadIndex] = useState(0); // Will be set correctly in useEffect
  const [imageErrors, setImageErrors] = useState({});
  
  // Animated values for opacity of the active (current) and preload (next) images.
  const activeOpacity = useRef(new Animated.Value(1)).current; 
  const preloadOpacity = useRef(new Animated.Value(0)).current;
  const ringAnimation = useRef(new Animated.Value(0)).current;
  
  // Ref to manage the timeout for the animation loop (4-second display, then transition).
  const animationLoopTimeoutRef = useRef(null); 
  // Ref to track if a fade transition is currently in progress to prevent overlaps.
  const isAnimatingTransition = useRef(false);

  // Ref to hold the latest version of the transition function to avoid stale closures in setTimeout.
  const performTransitionRef = useRef(null);
  
  const timeSlotData = timeSlots.find(slot => slot.id === timeSlot.id);
  const timeSlotMoments = moments.filter(moment => moment.timeSlot === timeSlot.id);
  
  // If there's only one moment (or none), render it statically without animation.
  if (timeSlotMoments.length <= 1) {
    if (timeSlotMoments.length === 1) {
      const singleMoment = timeSlotMoments[0];
      // Simplified fallback for single static moment
      const getSingleFallbackAvatar = (user) => {
        if (!user || !user.name) return 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=?';
        const initial = user.name.charAt(0);
        const color = timeSlotData.gradientColors[0].replace('#', '');
        return `https://via.placeholder.com/150/${color}/ffffff?text=${initial}`;
      };
      return (
        <TouchableOpacity 
          className="items-center mb-1" 
          style={{ width: STORY_SIZE + 6 }}
          onPress={() => onPress(singleMoment)}
          activeOpacity={0.7}
        >
          <View className="items-center justify-center">
            <View style={styles.storyRing}> {/* Static ring, can be styled further if needed */}
               <LinearGradient
                colors={timeSlotData.gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBorder} // Uses new STORY_SIZE for correct border visibility
              />
            </View>
            {/* Icon for the static bubble */}
            <View className="absolute top-0 left-0 z-[30]">
              <View 
                className="w-6 h-6 rounded-full items-center justify-center shadow-sm border border-white"
                style={{ backgroundColor: timeSlotData.gradientColors[0] }}
              >
                <Ionicons name={timeSlotData.icon} size={14} color="#fff" />
              </View>
            </View>
            {/* Static avatar image */}
            <View style={{ position: 'absolute', width: STORY_SIZE, height: STORY_SIZE }}>
              <View style={{ ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                <View style={{ backgroundColor: 'white', borderRadius: 32, padding: 2 }}>
                  <Image
                    source={{ 
                      uri: imageErrors[singleMoment.user.id] 
                        ? getSingleFallbackAvatar(singleMoment.user) 
                        : singleMoment.user.avatar 
                    }}
                    style={{ width: 64, height: 64, borderRadius: 32 }}
                    onError={() => setImageErrors(prev => ({...prev, [singleMoment.user.id]: true}))}
                  />
                </View>
              </View>
            </View>
            {/* Active time slot indicator can also be added here if logic permits */}
          </View>
          <View className="mt-1 h-10">
            <Text className="text-xs text-center font-medium" numberOfLines={1}>
              {timeSlotData.title}
            </Text>
            <Text className="text-[10px] text-gray-500 text-center">
              {singleMoment.time}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return null; // No moments to display
  }
  
  // Current moment to display based on activeIndex
  const currentMoment = timeSlotMoments[activeIndex];
  // Next moment to preload and fade in, based on preloadIndex
  const nextMomentToLoad = timeSlotMoments[preloadIndex];
  
  // Fallback avatar generation for dynamic avatars
  const getFallbackAvatar = (momentUser) => {
    if (!momentUser || !momentUser.name) return 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=?'; // Generic fallback
    const initial = momentUser.name.charAt(0);
    const color = timeSlotData.gradientColors[0].replace('#', '');
    return `https://via.placeholder.com/150/${color}/ffffff?text=${initial}`;
  };
  
  // Handle image loading errors
  const handleImageError = (id) => {
    setImageErrors(prev => ({...prev, [id]: true}));
  };

  /**
   * Core logic for the cross-fade animation between avatars.
   * This function is memoized with useCallback and its latest version is stored in performTransitionRef
   * to be called by setTimeout, preventing stale closures.
   */
  const transitionLogic = useCallback(() => {
    // Do not proceed if an animation is already in progress or if there aren't enough moments to cycle.
    if (isAnimatingTransition.current || timeSlotMoments.length <= 1) return;
    isAnimatingTransition.current = true; // Lock to prevent concurrent animations.

    // Perform a parallel animation: fade out the active image and fade in the preload image.
    Animated.parallel([
      Animated.timing(activeOpacity, { toValue: 0, duration: 1200, useNativeDriver: true }), // Active fades out
      Animated.timing(preloadOpacity, { toValue: 1, duration: 1200, useNativeDriver: true }), // Preload fades in
    ]).start(({ finished }) => {
      // This callback executes once the parallel animation completes.
      if (finished) {
        // Determine the new indices for the next cycle.
        const newActive = preloadIndex; // The image that just faded in becomes the new active one.
        const newPreload = (preloadIndex + 1) % timeSlotMoments.length; // Calculate the next image to preload.

        // Update the state to reflect the new active and preload images.
        setActiveIndex(newActive);
        setPreloadIndex(newPreload);

        /**
         * CRITICAL STEP for preventing visual glitches:
         * Reset opacity values *after* React has processed the state update for indices.
         * requestAnimationFrame ensures this happens in the next frame, after the component tree
         * has been updated with new image sources for the active and preload slots.
         */
        requestAnimationFrame(() => {
          activeOpacity.setValue(1);  // The new active image (which was in preloadOpacity slot) is now fully visible.
          preloadOpacity.setValue(0); // The preloadOpacity slot is reset to transparent, ready for the next image.
          
          isAnimatingTransition.current = false; // Release the animation lock.
          
          // Schedule the next transition using the ref to the latest transitionLogic function.
          // This ensures the loop continues with up-to-date state and props.
          if (performTransitionRef.current) {
            animationLoopTimeoutRef.current = setTimeout(performTransitionRef.current, 4000); // 4-second display time
          }
        });
      } else {
        // If the animation didn't finish (e.g., component unmounted mid-transition),
        // ensure the animation lock is released.
        isAnimatingTransition.current = false; 
      }
    });
  }, [
    activeOpacity,    // Animated.Value ref for current image's opacity
    preloadOpacity,   // Animated.Value ref for next image's opacity
    preloadIndex,     // Current index of the image that is preloading/fading in
    timeSlotMoments.length, // Length of moments to correctly calculate modulo for looping
    setActiveIndex,   // State setter for active image index
    setPreloadIndex   // State setter for preload image index
  ]);

  // Keep performTransitionRef.current pointing to the latest version of transitionLogic.
  // This is crucial for the setTimeout in the animation loop to call the correct function instance.
  useEffect(() => {
    performTransitionRef.current = transitionLogic;
  }, [transitionLogic]);

  // Ring animation: This is controlled by the parent component's animationIndex prop
  // to animate rings sequentially rather than all at once.
  useEffect(() => {
    if (animationIndex === undefined) return; // Don't animate if not this bubble's turn.
    Animated.timing(ringAnimation, {
      toValue: 1, // Animate to full effect (e.g., full rotation or scale)
      duration: 1800,
      useNativeDriver: false // Rotation and scale often require useNativeDriver: false
    }).start(() => {
      ringAnimation.setValue(0); // Reset animation value for the next cycle.
    });
  }, [animationIndex, ringAnimation]);

  /**
   * Initializes and manages the avatar cross-fade animation cycle.
   * This useEffect hook runs primarily when the number of moments changes or on initial mount.
   * It sets up the initial state for animations and starts the first transition.
   */
  useEffect(() => {
    if (timeSlotMoments.length <= 1) return; // No animation needed for 0 or 1 moment.

    // Initial setup for indices and opacities.
    setActiveIndex(0); // Start with the first moment as active.
    setPreloadIndex(1 % timeSlotMoments.length); // Set the second moment (or first if only one) as preload.
    activeOpacity.setValue(1);    // Active image starts fully visible.
    preloadOpacity.setValue(0);   // Preload image starts fully transparent.
    isAnimatingTransition.current = false; // Ensure animation lock is initially false.

    // Clear any existing timeout to prevent multiple loops if this effect re-runs.
    clearTimeout(animationLoopTimeoutRef.current);

    // Start the first transition after an initial delay (e.g., 5 seconds).
    animationLoopTimeoutRef.current = setTimeout(() => {
      if (performTransitionRef.current) {
        performTransitionRef.current(); // Call the transition logic via the ref.
      }
    }, 5000);

    // Cleanup function: This runs when the component unmounts or before the effect re-runs.
    return () => {
      clearTimeout(animationLoopTimeoutRef.current); // Clear the animation loop timeout.
      isAnimatingTransition.current = false; // Reset animation lock.
      activeOpacity.stopAnimation(); // Stop any ongoing opacity animations.
      preloadOpacity.stopAnimation();
      // Optionally reset opacities to a known default state, though re-mount will re-initialize.
      activeOpacity.setValue(1); 
      preloadOpacity.setValue(0);
    };
  }, [timeSlotMoments.length]); // IMPORTANT: Dependency array is minimal to control re-runs precisely.
                               // activeOpacity & preloadOpacity are stable refs and don't need to be deps here.
                               // performTransitionRef ensures the latest logic is used without being a direct dep causing re-runs.

  // Interpolations for the ring animation (rotation and scale)
  const gradientRotation = ringAnimation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const gradientScale = ringAnimation.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1.1, 1] });
  
  // Function to check if the current time slot is active based on the current hour.
  const isTimeSlotActive = () => {
    const currentHour = new Date().getHours();
    if (timeSlot.id === 'morning' && currentHour >= 5 && currentHour < 11) return true;
    if (timeSlot.id === 'midday' && currentHour >= 11 && currentHour < 16) return true;
    if (timeSlot.id === 'evening' && currentHour >= 16 && currentHour < 21) return true;
    if (timeSlot.id === 'night' && (currentHour >= 21 || currentHour < 5)) return true;
    return false;
  };
  
  // Safety check: Ensure moments are available before trying to render them, 
  // especially during the initial render or if props change unexpectedly.
  if (!currentMoment || !nextMomentToLoad) {
    return null;
  }

  return (
    <TouchableOpacity 
      className="items-center mb-1" 
      style={{ width: STORY_SIZE + 6 }} // Adjusted width due to new STORY_SIZE
      onPress={() => onPress(currentMoment)}
      activeOpacity={0.7}
    >
      <View className="items-center justify-center">
        <Animated.View
          style={[
            styles.storyRing,
            { transform: [{ rotate: gradientRotation }, { scale: gradientScale }] }
          ]}
        >
          <LinearGradient
            colors={timeSlotData.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBorder} // Uses new STORY_SIZE for correct border visibility
          />
        </Animated.View>

        {/* Time slot icon badge - ensure it has a high zIndex if needed */}
        <View className="absolute top-0 left-0 z-[30]">
          <View 
            className="w-6 h-6 rounded-full items-center justify-center shadow-sm border border-white"
            style={{ backgroundColor: timeSlotData.gradientColors[0] }}
          >
            <Ionicons name={timeSlotData.icon} size={14} color="#fff" />
          </View>
        </View>

        {/* Avatar container - holds the two animating image views */}
        <View style={{ 
          position: 'absolute', 
          width: STORY_SIZE, // Uses new STORY_SIZE for correct layout with border
          height: STORY_SIZE,
        }}>
          {/* Preload/Next Image (Fades In) - Renders on top during its fade-in phase */}
          {nextMomentToLoad && (
            <Animated.View style={{ 
              ...StyleSheet.absoluteFillObject, // Takes full space of parent View
              opacity: preloadOpacity,         // Controlled by its Animated.Value
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 20, // Higher zIndex to ensure it's on top when fading in
            }}>
              <View style={{ backgroundColor: 'white', borderRadius: 32, padding: 2 }}>
                <Image
                  source={{ 
                    uri: imageErrors[nextMomentToLoad.user.id] 
                      ? getFallbackAvatar(nextMomentToLoad.user) 
                      : nextMomentToLoad.user.avatar 
                  }}
                  style={{ width: 64, height: 64, borderRadius: 32 }}
                  onError={() => handleImageError(nextMomentToLoad.user.id)}
                />
              </View>
            </Animated.View>
          )}
          
          {/* Active/Current Image (Fades Out) */}
          {currentMoment && (
            <Animated.View style={{ 
              ...StyleSheet.absoluteFillObject, // Takes full space of parent View
              opacity: activeOpacity,          // Controlled by its Animated.Value
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10, // Lower zIndex, will be beneath the preload image as it fades in
            }}>
              <View style={{ backgroundColor: 'white', borderRadius: 32, padding: 2 }}>
                <Image
                  source={{ 
                    uri: imageErrors[currentMoment.user.id] 
                      ? getFallbackAvatar(currentMoment.user) 
                      : currentMoment.user.avatar 
                  }}
                  style={{ width: 64, height: 64, borderRadius: 32 }}
                  onError={() => handleImageError(currentMoment.user.id)}
                />
              </View>
            </Animated.View>
          )}
        </View>

        {/* Indicator for currently active time slot */}
        {isTimeSlotActive() && (
          <View className="absolute bottom-0 right-0 bg-indigo-600 rounded-full w-5 h-5 items-center justify-center border-2 border-white z-[30]">
            <Ionicons name="time" size={10} color="#fff" />
          </View>
        )}
      </View>
      
      {/* Text labels for Time Slot Title and Moment Time */}
      <View className="mt-1 h-10">
        <Text className="text-xs text-center font-medium" numberOfLines={1}>
          {timeSlotData.title}
        </Text>
        <Text className="text-[10px] text-gray-500 text-center">
          {currentMoment.time} {/* Display time of the currently visible moment */}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const MomentStories = () => {
  const navigation = useNavigation();
  const [animationCycle, setAnimationCycle] = useState(0);
  const { width: screenWidth } = Dimensions.get('window');
  
  // Group moments by time slot
  const getTimeSlotMoments = () => {
    return timeSlots.map(slot => ({
      ...slot,
      moments: sampleMoments.filter(moment => moment.timeSlot === slot.id)
    }));
  };
  
  const timeSlotsMoments = getTimeSlotMoments();
  
  // Sequential animation controller for the rings
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setAnimationCycle(prev => (prev + 1) % timeSlots.length);
    }, 2500);
    const resetInterval = setInterval(() => {
      setAnimationCycle(0);
    }, (timeSlots.length + 1) * 2500);
    return () => {
      clearInterval(cycleInterval);
      clearInterval(resetInterval);
    };
  }, []);
  
  const handleStoryPress = (moment) => {
    navigation.navigate('MomentViewer', { momentId: moment.id });
  };

  const handleArrangePress = () => {
    navigation.navigate('MomentArrange');
  };

  const handleCreatePress = () => {
    navigation.navigate('MomentCreation');
  };

  return (
    <View className="mb-4 bg-indigo-50 rounded-lg overflow-hidden"> 
      <LinearGradient
        colors={['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.05)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
      
      <View className="flex-row justify-between items-center px-4 pt-3 pb-2">
        <Text className="text-lg font-bold text-gray-800">Today's Moments</Text>
        <View className="flex-row">
          <TouchableOpacity 
            className="flex-row items-center bg-white px-2 py-1 rounded-full mr-2" 
            onPress={handleCreatePress}
          >
            <Ionicons name="add" size={16} color="#6366f1" />
            <Text className="text-indigo-600 ml-1 font-medium">Create</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-row items-center bg-white px-2 py-1 rounded-full" 
            onPress={handleArrangePress}
          >
            <Ionicons name="calendar-outline" size={16} color="#6366f1" />
            <Text className="text-indigo-600 ml-1 font-medium">Arrange</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Container for the story bubbles, now with reduced bottom padding */}
      <View 
        className="flex-row justify-around items-center px-4 pb-1" // Reduced to pb-1
      >
        {timeSlots.map((timeSlot, index) => (
          <TimeSlotStoryBubble
            key={timeSlot.id}
            timeSlot={timeSlot}
            moments={sampleMoments} // Pass all moments; filtering happens inside bubble
            onPress={handleStoryPress}
            animationIndex={animationCycle === index ? index : undefined}
            totalSlots={timeSlots.length}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  storyRing: {
    width: STORY_SIZE + STORY_BORDER_WIDTH * 2, // e.g., 74 + 3*2 = 80
    height: STORY_SIZE + STORY_BORDER_WIDTH * 2, // 80
    borderRadius: (STORY_SIZE + STORY_BORDER_WIDTH * 2) / 2, // 40
    padding: STORY_BORDER_WIDTH, // Structural padding, e.g., 3
    // The content area within this padding will be STORY_SIZE (e.g., 74) wide.
  },
  gradientBorder: {
    width: '100%', // Fills the content area of storyRing
    height: '100%',
    borderRadius: STORY_SIZE / 2, // Makes the gradient a circle of STORY_SIZE diameter (e.g., 74/2 = 37 radius)
  }
});

export default MomentStories; 