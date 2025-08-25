import {Image, Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import {RF} from '@theme';

interface Props {
  source?: any;
  tintColor?: any;
  backgroundColor?: any;
  height?: any;
  width?: any;
  containerSize?: any;
  mtop?: any;
}

const CustomIcon = (props: Props) => {
  const {
    source,
    tintColor,
    backgroundColor,
    height,
    width,
    containerSize,
    mtop,
  } = props;
  let adjustSize = containerSize == 'medium' ? true : false;
  let ios = Platform.OS === 'ios';
  return (
    <View
      style={{
        backgroundColor: backgroundColor ? backgroundColor : '#fff',
        height: height ? height : adjustSize ? RF(24) : ios ? RF(32) : RF(36),
        width: width ? width : adjustSize ? RF(24) : ios ? RF(32) : RF(36),
        borderRadius: adjustSize ? 8 : 12,
        padding: adjustSize ? 5 : 10,
        marginTop: mtop,
      }}>
      <Image source={source} style={[styles.icon, {tintColor: tintColor}]} />
    </View>
  );
};

export default CustomIcon;

const styles = StyleSheet.create({
  icon: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
