import {RF} from '@theme';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

const RailSelected = () => {
  return <View style={styles.root} />;
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: RF(4),
    backgroundColor: '#00276D',
    borderRadius: 2,
  },
});
