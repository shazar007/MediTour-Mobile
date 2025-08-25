import {StyleSheet} from 'react-native';
import React from 'react';
import {ComingSoon, HeaderCard, Wrapper} from '@components';
import {useSelector} from 'react-redux';

const Messages = () => {
  const {user} = useSelector((state: any) => state.root.user);

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <HeaderCard
        plusIcon
        twoInRow
        numberOfIcons={'2'}
        title={'Hi ' + user?.name}
      />
      <ComingSoon />
    </Wrapper>
  );
};

export default Messages;

const styles = StyleSheet.create({});

// import {ImageBackground, StyleSheet, View} from 'react-native';
// import React from 'react';
// import {ComingSoon, HeaderCard, Wrapper} from '@components';
// import {useSelector} from 'react-redux';
// import {
//   circle,
//   comingSoon,
//   comingSoon2,
//   rect1,
//   rect2,
//   rect3,
//   rect4,
// } from '@assets';
// import {Image} from 'react-native-animatable';
// import {RF, SCREEN_HEIGHT, SCREEN_WIDTH} from '@theme';

// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
// } from 'react-native-reanimated';
// import * as Animatable from 'react-native-animatable';
// import {Gesture, GestureDetector} from 'react-native-gesture-handler';
// const Messages = () => {
//   const {user, fcm_token} = useSelector((state: any) => state.root.user);
//   const isPressed = useSharedValue(false);
//   const offset = useSharedValue({x: 0, y: 0});
//   const animatedStyles = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {translateX: offset.value.x},
//         {translateY: offset.value.y},
//         {scale: withSpring(isPressed.value ? 1.2 : 1)},
//       ],
//       backgroundColor: isPressed.value ? 'red' : 'blue',
//     };
//   });

//   const start = useSharedValue({x: 0, y: 0});
//   const gesture = Gesture.Pan()
//     .onBegin(() => {
//       isPressed.value = true;
//     })
//     .onUpdate(e => {
//       offset.value = {
//         x: e.translationX + start.value.x,
//         y: e.translationY + start.value.y,
//       };
//     })
//     .onEnd(() => {
//       start.value = {
//         x: offset.value.x,
//         y: offset.value.y,
//       };
//     })
//     .onFinalize(() => {
//       isPressed.value = false;
//     });
//   // ...

//   return (
//     <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
//       <HeaderCard
//         plusIcon
//         twoInRow
//         numberOfIcons={'2'}
//         title={'Hi ' + user?.name}
//       />
//       <GestureDetector gesture={gesture}>
//         <Animated.View style={[styles.ball, animatedStyles]} />
//       </GestureDetector>
//       {/* <ComingSoon /> */}
//     </Wrapper>
//   );
// };

// export default Messages;

// const styles = StyleSheet.create({
//   fullLength: {
//     height: '100%',
//     width: '100%',
//     resizeMode: 'contain',
//   },
//   rect_1: {
//     height: RF(35),
//     width: RF(35),
//     top: SCREEN_HEIGHT / 9,
//     position: 'absolute',
//     zIndex: 1,
//   },
//   rect_2: {
//     height: RF(35),
//     width: RF(35),
//     top: SCREEN_HEIGHT / 14,
//     right: 0,
//     position: 'absolute',
//     zIndex: 1,
//   },
//   rect_3: {
//     height: RF(35),
//     width: RF(35),
//     top: SCREEN_HEIGHT / 3,
//     left: SCREEN_WIDTH / 3.2,
//     right: 0,
//     position: 'absolute',
//     zIndex: 1,
//   },
//   rect_4: {
//     height: RF(35),
//     width: RF(35),
//     top: SCREEN_HEIGHT / 3.1,
//     left: SCREEN_WIDTH / 1.9,
//     position: 'absolute',
//     zIndex: 1,
//   },
//   circle: {
//     height: RF(50),
//     width: RF(50),
//     top: SCREEN_HEIGHT / 3.5,
//     left: SCREEN_WIDTH / 55,
//     position: 'absolute',
//     zIndex: 1,
//   },
//   centerImg: {height: '50%', width: '80%'},
//   backImg: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: RF(24),
//   },
//   ball: {
//     width: 100,
//     height: 100,
//     borderRadius: 100,
//     backgroundColor: 'blue',
//     alignSelf: 'center',
//   },
// });
