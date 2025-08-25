import {
  View,
  Text,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useDrawerProgress} from '@react-navigation/drawer';

const DrawerSceneWrapper = ({children, openDrawer}: any) => {
  const progress = useDrawerProgress();
  const {width} = useWindowDimensions();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {perspective: 1000},
      {
        scale: interpolate(progress.value, [0, 1], [1, 0.8], 'clamp'),
      },
      {
        rotateY: `${interpolate(progress.value, [0, 1], [0, -10], 'clamp')}deg`,
      },
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [0, width - 100],
          'clamp',
        ),
      },
    ],
    borderRadius: interpolate(progress.value, [0, 1], [0, 20], 'clamp'),
    overflow: 'hidden',
    zIndex: openDrawer ? 1 : 2,
    opacity: openDrawer
      ? interpolate(progress.value, [0, 1], [1, 0], 'clamp')
      : 1,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

export default DrawerSceneWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    position: 'absolute',
    // borderWidth:1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});
