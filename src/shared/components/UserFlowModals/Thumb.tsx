import {RF} from '@theme';
import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';

const Thumb = ({name}: any) => {
  return (
    <View
      style={{
        width: RF(24),
        height: RF(24),
        padding: 2,
        backgroundColor: '#fff',
      }}>
      <View style={name === 'high' ? styles.rootHigh : styles.rootLow} />
    </View>
  );
};

const styles = StyleSheet.create({
  rootLow: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
    backgroundColor: '#00276D',
  },
  rootHigh: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
    backgroundColor: '#ffffff',
  },
});

export default memo(Thumb);
