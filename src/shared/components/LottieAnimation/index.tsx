import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';

const LottieAnimation = ({
  visible,
  animation,
}: {
  visible: boolean;
  animation: any;
}) => {
  return (
    <>
      {visible ? (
        <View style={styles.animationView}>
          <LottieView
            source={animation}
            autoPlay
            loop
            style={{width: '100%', height: '100%'}}
          />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  animationView: {
    // alignItems: 'center',
    height: '40%',
    width: '100%',
    // backgroundColor: 'red',
  },
});

export default LottieAnimation;
