import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Image,
  Animated,
  Dimensions
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import SafeLayout from '../ui/SafeLayout';
import { findChannel, groupsByOrganization, userProfiles } from '../../data/sampleData';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDEBAR_WIDTH = 70; // Width when collapsed
const SIDEBAR_EXPANDED_WIDTH = 250; // Width when expanded

// Common emoji reactions for quick access
const COMMON_REACTIONS = ['👍', '❤️', '😂', '🎉', '👀', '��', '🔥', '👋'];

// Component for displaying reactions
const MessageReactions = ({ reactions, onAddReaction }) => {
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  
  if (!reactions) reactions = [];
  
  return (
    <View className="flex-row flex-wrap mt-1 items-center">
      {reactions.map((reaction, index) => (
        <TouchableOpacity 
          key={index} 
          className="bg-gray-100 flex-row items-center rounded-full px-2 py-1 mr-2 mb-1"
          onPress={() => onAddReaction && onAddReaction(reaction.emoji)}
        >
          <Text className="mr-1">{reaction.emoji}</Text>
          <Text className="text-xs text-gray-600">{reaction.count}</Text>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity 
        className="bg-gray-100 rounded-full p-1.5 mr-2 mb-1"
        onPress={() => setShowReactionPicker(!showReactionPicker)}
      >
        <Ionicons name="add" size={14} color="#6b7280" />
      </TouchableOpacity>
      
      {/* Emoji Reaction Picker */}
      {showReactionPicker && (
        <View className="absolute bottom-8 left-0 bg-white border border-gray-200 rounded-lg p-2 flex-row flex-wrap shadow-md">
          {COMMON_REACTIONS.map((emoji, index) => (
            <TouchableOpacity 
              key={index} 
              className="p-2"
              onPress={() => {
                onAddReaction && onAddReaction(emoji);
                setShowReactionPicker(false);
              }}
            >
              <Text className="text-xl">{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Component for displaying a message bubble
const MessageBubble = ({ message, isThreaded = false, onThreadPress, onReaction, currentUserId }) => {
  const user = userProfiles[message.userId] || {
    username: message.userId,
    avatarUrl: 'https://via.placeholder.com/40'
  };
  
  const isCurrentUser = message.userId === currentUserId;
  const hasReplies = message.threadReplies && message.threadReplies.length > 0;
  
  const formattedTime = () => {
    const date = new Date(message.timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle adding a reaction
  const handleReaction = (emoji) => {
    if (onReaction) {
      onReaction(message.id, emoji);
    }
  };

  return (
    <View className={`flex-row mb-4 ${isThreaded ? 'pl-8' : ''}`}>
      {!isCurrentUser && (
        <Image 
          source={{ uri: user.avatarUrl }} 
          className="w-8 h-8 rounded-full mr-2 mt-1"
        />
      )}
      
      <View className={`flex-1 ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        {!isThreaded && (
          <View className="flex-row items-center mb-1">
            <Text className="font-semibold text-sm text-gray-900">{user.username}</Text>
            <Text className="text-xs text-gray-500 ml-2">{formattedTime()}</Text>
          </View>
        )}
        
        <View 
          className={`p-3 rounded-lg max-w-[85%] ${
            isCurrentUser 
              ? 'bg-indigo-500 rounded-tr-none' 
              : 'bg-gray-200 rounded-tl-none'
          }`}
        >
          <Text className={isCurrentUser ? 'text-white' : 'text-gray-800'}>
            {message.text}
          </Text>
        </View>
        
        {isThreaded && (
          <Text className="text-xs text-gray-500 mt-1">{formattedTime()}</Text>
        )}
        
        <MessageReactions reactions={message.reactions} onAddReaction={handleReaction} />
        
        {!isThreaded && hasReplies && (
          <TouchableOpacity 
            className="mt-1 flex-row items-center" 
            onPress={() => onThreadPress && onThreadPress(message)}
          >
            <Ionicons name="chatbubble-outline" size={14} color="#6b7280" />
            <Text className="ml-1 text-xs text-indigo-600">
              {message.threadReplies.length} {message.threadReplies.length === 1 ? 'reply' : 'replies'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      {isCurrentUser && !isThreaded && (
        <Image 
          source={{ uri: user.avatarUrl }} 
          className="w-8 h-8 rounded-full ml-2 mt-1"
        />
      )}
    </View>
  );
};

// Component for a channel item in the sidebar
const ChannelItem = ({ channel, isActive, onPress, isExpanded }) => {
  return (
    <TouchableOpacity
      className={`my-1 py-2 px-2 rounded-md ${isActive ? 'bg-indigo-100' : ''}`}
      onPress={() => onPress(channel.id)}
    >
      <View className="flex-row items-center">
        <Text className="text-lg text-gray-500 font-medium">#</Text>
        {isExpanded && (
          <Text 
            className={`ml-1 text-sm ${isActive ? 'text-indigo-700 font-semibold' : 'text-gray-600'}`}
            numberOfLines={1}
          >
            {channel.name}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

// The main group discussion screen component
const GroupDiscussionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { groupId, organizationId } = route.params;
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const sidebarWidth = useRef(new Animated.Value(SIDEBAR_WIDTH)).current;
  
  // Find the group data
  const group = groupsByOrganization[organizationId]?.find(g => g.id === groupId);
  
  // Output debugging information
  console.log('Group data:', JSON.stringify(group?.name));
  console.log('Group channels:', JSON.stringify(group?.channels?.map(c => c.name)));
  
  const currentUserId = group?.currentUserId || 'currentUser123';
  
  // Ensure we get the default channel or the first channel if no default is marked
  const defaultChannel = group?.channels?.find(c => c.isDefault) || group?.channels?.[0];
  const [activeChannelId, setActiveChannelId] = useState(defaultChannel?.id || '');
  
  // Get the active channel
  const activeChannel = group?.channels?.find(c => c.id === activeChannelId);
  console.log('Active channel:', JSON.stringify(activeChannel?.name));
  console.log('Messages count:', activeChannel?.messages?.length);
  
  // Initialize messages state from active channel
  const [messages, setMessages] = useState([]);
  
  // For thread view
  const [selectedThread, setSelectedThread] = useState(null);
  const [threadVisible, setThreadVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  
  // Update messages when active channel changes OR on initial load
  useEffect(() => {
    if (activeChannel && activeChannel.messages) {
      console.log('Setting messages from channel:', activeChannel.name);
      console.log('Messages to set:', activeChannel.messages.length);
      // Ensuring we create a new array so React detects the state change
      setMessages([...activeChannel.messages]);
    } else {
      console.log('No active channel or messages');
      setMessages([]);
    }
  }, [activeChannel]);
  
  useEffect(() => {
    // Update header title with group name
    if (group) {
      navigation.setOptions({ 
        headerTitle: () => (
          <View className="flex-row items-center">
            <Text className="font-bold text-lg">{group.name}</Text>
            {activeChannel && (
              <View className="flex-row items-center ml-2">
                <Text className="text-gray-500 text-xs">|</Text>
                <Text className="text-gray-600 text-sm ml-2">#{activeChannel.name}</Text>
              </View>
            )}
          </View>
        )
      });
    }
  }, [navigation, group, activeChannel]);
  
  // Toggle sidebar expansion
  const toggleSidebar = () => {
    const toValue = sidebarExpanded ? SIDEBAR_WIDTH : SIDEBAR_EXPANDED_WIDTH;
    Animated.spring(sidebarWidth, {
      toValue,
      useNativeDriver: false,
      friction: 8
    }).start();
    setSidebarExpanded(!sidebarExpanded);
  };
  
  // Change the active channel
  const handleChannelChange = (channelId) => {
    console.log('Changing to channel:', channelId);
    setActiveChannelId(channelId);
    if (sidebarExpanded) {
      toggleSidebar(); // Collapse sidebar after selection on smaller screens
    }
    setThreadVisible(false);
    setSelectedThread(null);
  };
  
  // Open thread view for a message
  const handleThreadPress = (message) => {
    setSelectedThread(message);
    setThreadVisible(true);
  };
  
  // Close thread view
  const handleCloseThread = () => {
    setThreadVisible(false);
    setSelectedThread(null);
  };
  
  // Send a new message
  const handleSendMessage = () => {
    if (inputText.trim().length === 0) return;
    
    const newMessage = {
      id: `msg${Date.now()}`,
      userId: currentUserId,
      username: userProfiles[currentUserId]?.username || 'You',
      avatarUrl: userProfiles[currentUserId]?.avatarUrl,
      text: inputText.trim(),
      timestamp: new Date().toISOString(),
      reactions: [],
      threadReplies: [],
    };
    
    if (threadVisible && selectedThread) {
      // Add to thread
      const updatedMessages = messages.map(msg => {
        if (msg.id === selectedThread.id) {
          return {
            ...msg,
            threadReplies: [...(msg.threadReplies || []), newMessage]
          };
        }
        return msg;
      });
      setMessages(updatedMessages);
      
      // Update the selected thread to show the new reply
      setSelectedThread({
        ...selectedThread,
        threadReplies: [...(selectedThread.threadReplies || []), newMessage]
      });
    } else {
      // Add to main channel
      setMessages(prevMessages => [newMessage, ...prevMessages]); // Add to top for inverted FlatList
    }
    
    setInputText('');
  };
  
  // Add a reaction to a message
  const handleReaction = (messageId, emoji) => {
    // Clone current messages to avoid direct state mutation
    const updatedMessages = messages.map(message => {
      if (message.id === messageId) {
        // Check if this emoji reaction already exists
        const existingReactionIndex = message.reactions.findIndex(r => r.emoji === emoji);
        
        if (existingReactionIndex >= 0) {
          // Reaction exists, check if user already added it
          const reaction = message.reactions[existingReactionIndex];
          const userReacted = reaction.userIds.includes(currentUserId);
          
          if (userReacted) {
            // User already reacted, so remove their reaction
            const updatedUserIds = reaction.userIds.filter(id => id !== currentUserId);
            
            if (updatedUserIds.length === 0) {
              // If no users left, remove the reaction entirely
              return {
                ...message,
                reactions: message.reactions.filter(r => r.emoji !== emoji)
              };
            } else {
              // Otherwise update the userIds and count
              const updatedReactions = [...message.reactions];
              updatedReactions[existingReactionIndex] = {
                ...reaction,
                userIds: updatedUserIds,
                count: updatedUserIds.length
              };
              
              return { ...message, reactions: updatedReactions };
            }
          } else {
            // User hasn't reacted yet, add their reaction
            const updatedReactions = [...message.reactions];
            updatedReactions[existingReactionIndex] = {
              ...reaction,
              userIds: [...reaction.userIds, currentUserId],
              count: reaction.userIds.length + 1
            };
            
            return { ...message, reactions: updatedReactions };
          }
        } else {
          // New reaction type
          return {
            ...message,
            reactions: [
              ...message.reactions,
              { emoji, count: 1, userIds: [currentUserId] }
            ]
          };
        }
      }
      
      return message;
    });
    
    setMessages(updatedMessages);
    
    // If we're in thread view, also update the selected thread
    if (threadVisible && selectedThread && messageId === selectedThread.id) {
      const updatedThread = updatedMessages.find(msg => msg.id === messageId);
      if (updatedThread) {
        setSelectedThread(updatedThread);
      }
    }
  };
  
  // Handle reaction in thread replies
  const handleThreadReaction = (messageId, emoji) => {
    if (!selectedThread || !threadVisible) return;
    
    // Clone current selected thread to avoid direct state mutation
    const updatedThreadReplies = selectedThread.threadReplies.map(reply => {
      if (reply.id === messageId) {
        // Similar logic as handleReaction
        const existingReactionIndex = reply.reactions?.findIndex(r => r.emoji === emoji);
        
        if (existingReactionIndex >= 0) {
          // Existing reaction...
          const reaction = reply.reactions[existingReactionIndex];
          const userReacted = reaction.userIds.includes(currentUserId);
          
          if (userReacted) {
            // Remove user's reaction...
            const updatedUserIds = reaction.userIds.filter(id => id !== currentUserId);
            
            if (updatedUserIds.length === 0) {
              return {
                ...reply,
                reactions: reply.reactions.filter(r => r.emoji !== emoji)
              };
            } else {
              const updatedReactions = [...reply.reactions];
              updatedReactions[existingReactionIndex] = {
                ...reaction,
                userIds: updatedUserIds,
                count: updatedUserIds.length
              };
              
              return { ...reply, reactions: updatedReactions };
            }
          } else {
            // Add user's reaction...
            const updatedReactions = [...reply.reactions];
            updatedReactions[existingReactionIndex] = {
              ...reaction,
              userIds: [...reaction.userIds, currentUserId],
              count: reaction.userIds.length + 1
            };
            
            return { ...reply, reactions: updatedReactions };
          }
        } else {
          // New reaction...
          return {
            ...reply,
            reactions: [
              ...(reply.reactions || []),
              { emoji, count: 1, userIds: [currentUserId] }
            ]
          };
        }
      }
      
      return reply;
    });
    
    // Update the selected thread
    const updatedThread = { ...selectedThread, threadReplies: updatedThreadReplies };
    setSelectedThread(updatedThread);
    
    // Also update the thread in the main message list
    const updatedMessages = messages.map(msg => 
      msg.id === selectedThread.id ? updatedThread : msg
    );
    setMessages(updatedMessages);
  };
  
  if (!group) {
    return (
      <SafeLayout scrollable={false} blurSafeAreas={true} blurIntensity="light">
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-lg text-red-500">Group not found.</Text>
        </View>
      </SafeLayout>
    );
  }
  
  if (!activeChannel) {
    return (
      <SafeLayout scrollable={false} blurSafeAreas={true} blurIntensity="light">
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-lg text-red-500">No channels available in this group.</Text>
        </View>
      </SafeLayout>
    );
  }
  
  console.log('Rendering group chat with messages:', messages.length);
  
  // Render each message
  const renderMessageItem = useCallback(({ item }) => {
    console.log('Rendering message:', item.id, item.text.substring(0, 20));
    return (
      <MessageBubble 
        message={item} 
        onThreadPress={handleThreadPress}
        onReaction={handleReaction}
        currentUserId={currentUserId}
      />
    );
  }, [currentUserId, handleThreadPress, handleReaction]);
  
  // Render each thread reply
  const renderThreadItem = useCallback(({ item }) => (
    <MessageBubble 
      message={item} 
      isThreaded={true}
      onReaction={handleThreadReaction}
      currentUserId={currentUserId}
    />
  ), [currentUserId, handleThreadReaction]);
  
  return (
    <SafeLayout scrollable={false} blurSafeAreas={true} blurIntensity="light">
      <View className="flex-1 flex-row">
        {/* Channel Sidebar */}
        <Animated.View style={{ width: sidebarWidth }} className="bg-gray-100 h-full border-r border-gray-200">
          <TouchableOpacity 
            className="p-3 items-center justify-center"
            onPress={toggleSidebar}
          >
            <Ionicons name={sidebarExpanded ? "chevron-back" : "menu-outline"} size={24} color="#6b7280" />
          </TouchableOpacity>
          
          <View className="px-2 mt-2">
            {sidebarExpanded && (
              <Text className="text-xs text-gray-500 uppercase font-semibold px-2 mb-1">Channels</Text>
            )}
            {group.channels.map(channel => (
              <ChannelItem 
                key={channel.id}
                channel={channel}
                isActive={channel.id === activeChannelId && !threadVisible}
                onPress={handleChannelChange}
                isExpanded={sidebarExpanded}
              />
            ))}
          </View>
        </Animated.View>
        
        {/* Main Content Area */}
        <View className="flex-1">
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            className="flex-1"
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
          >
            {!threadVisible ? (
              /* Channel Messages */
              <FlatList
                data={messages}
                renderItem={renderMessageItem}
                keyExtractor={item => item.id}
                inverted // Shows messages from bottom, new messages appear at the bottom
                className="flex-1 px-2"
                contentContainerStyle={{ 
                  flexGrow: 1, 
                  flexDirection: 'column-reverse',
                  paddingTop: 16,
                  paddingBottom: 16
                }}
                ListEmptyComponent={
                  <View className="flex-1 justify-center items-center">
                    <Text className="text-gray-500">No messages yet in #{activeChannel?.name || 'this channel'}.</Text>
                    <Text className="text-gray-500 mt-1">Be the first to start the conversation!</Text>
                  </View>
                }
              />
            ) : (
              /* Thread View */
              <View className="flex-1">
                <View className="flex-row items-center justify-between p-2 bg-gray-100 border-b border-gray-200">
                  <View className="flex-row items-center">
                    <Text className="font-semibold ml-2">Thread</Text>
                  </View>
                  <TouchableOpacity onPress={handleCloseThread} className="p-2">
                    <Ionicons name="close" size={20} color="#6b7280" />
                  </TouchableOpacity>
                </View>
                
                <View className="p-3 border-b border-gray-200 bg-gray-50">
                  <MessageBubble 
                    message={selectedThread} 
                    currentUserId={currentUserId}
                  />
                </View>
                
                <FlatList
                  data={selectedThread?.threadReplies || []}
                  renderItem={renderThreadItem}
                  keyExtractor={item => item.id}
                  className="flex-1 px-2"
                  contentContainerStyle={{ 
                    flexGrow: 1, 
                    paddingTop: 16,
                    paddingBottom: 16
                  }}
                  ListEmptyComponent={
                    <View className="flex-1 justify-center items-center py-8">
                      <Text className="text-gray-500">No replies yet.</Text>
                      <Text className="text-gray-500 mt-1">Start the conversation!</Text>
                    </View>
                  }
                />
              </View>
            )}
            
            {/* Message Input */}
            <View className="flex-row items-center p-2 border-t border-gray-200 bg-white">
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder={threadVisible ? "Reply in thread..." : "Type a message..."}
                className="flex-1 min-h-12 max-h-24 bg-gray-100 rounded-xl px-4 py-2 mr-2"
                multiline
                textAlignVertical="center"
              />
              <TouchableOpacity 
                onPress={handleSendMessage} 
                className={`p-2 rounded-full items-center justify-center w-10 h-10 ${
                  inputText.trim().length > 0 ? 'bg-indigo-500' : 'bg-gray-300'
                }`}
                disabled={inputText.trim().length === 0}
              >
                <Ionicons name="send" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </SafeLayout>
  );
};

export default GroupDiscussionScreen; 