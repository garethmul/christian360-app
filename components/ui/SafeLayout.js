import React from 'react';
import { View, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

/**
 * A reusable safe layout component for all screens
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to render inside the layout
 * @param {string} props.backgroundColor - The background color of the layout
 * @param {boolean} props.scrollable - Whether the content should be scrollable
 * @param {Object} props.contentContainerStyle - The style of the content container
 * @param {Array} props.edges - Which edges to apply safe area insets to
 * @param {boolean} props.statusBarHidden - Whether to hide the status bar
 * @param {boolean} props.blurSafeAreas - Whether to apply blur effect to safe areas
 * @param {string} props.blurIntensity - Intensity of the blur effect ('light', 'dark', or 'default')
 * @returns {React.ReactNode}
 */
const SafeLayout = ({
  children,
  backgroundColor = '#f9fafb',
  scrollable = true,
  contentContainerStyle = {},
  edges = ['bottom'],
  statusBarHidden = false,
  blurSafeAreas = true,
  blurIntensity = 'light',
  ...props
}) => {
  const insets = useSafeAreaInsets();

  // Create blurred safe area components when needed
  const renderTopSafeArea = () => {
    if (!edges.includes('top') || insets.top === 0) return null;
    
    return blurSafeAreas ? (
      <BlurView
        intensity={70}
        tint={blurIntensity}
        style={[
          styles.blurredSafeArea,
          {
            height: insets.top,
            top: 0,
            left: 0,
            right: 0,
            position: 'absolute',
            zIndex: 100,
          }
        ]}
      />
    ) : (
      <View
        style={{
          height: insets.top,
          backgroundColor,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      />
    );
  };
  
  const renderBottomSafeArea = () => {
    if (!edges.includes('bottom') || insets.bottom === 0) return null;
    
    // Don't render bottom blur if we're scrollable, as the contentContainerStyle padding already handles this
    if (scrollable) return null;
    
    return blurSafeAreas ? (
      <BlurView
        intensity={70}
        tint={blurIntensity}
        style={[
          styles.blurredSafeArea,
          {
            height: insets.bottom,
            bottom: 0,
            left: 0,
            right: 0,
            position: 'absolute',
            zIndex: 100,
          }
        ]}
      />
    ) : (
      <View
        style={{
          height: insets.bottom,
          backgroundColor,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      />
    );
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
        hidden={statusBarHidden}
      />
      <SafeAreaView
        style={{ flex: 1, backgroundColor }}
        edges={edges}
        {...props}
      >
        {scrollable ? (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingBottom: insets.bottom > 0 ? insets.bottom : 16,
              paddingTop: edges.includes('top') && insets.top > 0 && !blurSafeAreas ? insets.top : 0,
              ...contentContainerStyle
            }}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              paddingBottom: edges.includes('bottom') && insets.bottom > 0 && !blurSafeAreas ? insets.bottom : 0,
              paddingTop: edges.includes('top') && insets.top > 0 && !blurSafeAreas ? insets.top : 0,
              ...contentContainerStyle
            }}
          >
            {children}
          </View>
        )}
        
        {/* Render blurred safe areas if enabled */}
        {blurSafeAreas && renderTopSafeArea()}
        {blurSafeAreas && renderBottomSafeArea()}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  blurredSafeArea: {
    overflow: 'hidden',
  },
});

export default SafeLayout; 