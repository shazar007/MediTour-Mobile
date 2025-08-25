import {heartLoader} from '@assets';
import {useTheme} from '@react-navigation/native';
import {getColorCode, SCREEN_HEIGHT} from '@theme';
import LottieView from 'lottie-react-native';
import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Modal,
} from 'react-native';

interface LoaderProps {
  bottom?: any;
  color?: any;
  loading?: any;
  source?: any;
  loopFalse?: any;
}
const CustomLoader = (props: Partial<LoaderProps>) => {
  const {color, loading, source, loopFalse} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const {colorCode} = getColorCode();
  return (
    // <View style={[styles.loading]}>
    //   <ActivityIndicator
    //     {...props}
    //     size="large"
    //     color={color ? color : colors?.primary}
    //   />
    // </View>

    <Modal visible={loading} transparent animationType="fade">
      <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.7)" />
      <View style={styles.overlay}>
        <LottieView
          source={source ? source : heartLoader}
          autoPlay
          loop={loopFalse ? false : true}
          style={{width: '50%', height: '50%'}}
        />
      </View>
    </Modal>
  );
};
export default CustomLoader;
const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_HEIGHT,
  },
  overlay: {
    width: '100%',
    position: 'absolute',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
