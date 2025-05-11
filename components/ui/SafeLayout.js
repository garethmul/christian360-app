import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

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
 * @returns {React.ReactNode}
 */
const SafeLayout = ({
  children,
  backgroundColor = '#f9fafb',
  scrollable = true,
  contentContainerStyle = {},
  edges = ['top'],
  statusBarHidden = false,
  ...props
}) => {
  const insets = useSafeAreaInsets();

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
              paddingBottom: insets.bottom > 0 ? insets.bottom : 0,
              ...contentContainerStyle
            }}
          >
            {children}
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default SafeLayout; 