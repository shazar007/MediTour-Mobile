import {heartLoader, loadingAnimation} from '@assets';
import LottieView from 'lottie-react-native';
import {View, StyleSheet, Text, Modal, StatusBar} from 'react-native';
import React from 'react';

const NewLoader = () => {
  return (
    <Modal visible={true} transparent animationType="fade">
      <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.8)" />
      <View style={styles.overlay}>
        <LottieView
          source={heartLoader}
          autoPlay
          loop
          style={{width: '50%', height: '50%'}}
        />
      </View>
    </Modal>
  );
};

export default NewLoader;

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    position: 'absolute',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
