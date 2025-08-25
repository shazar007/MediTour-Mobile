import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RF} from '@theme';

const HotelCard = () => {
  return (
    <View style={styles.container}>
      <Text>HotelCard</Text>
    </View>
  );
};

export default HotelCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RF(333),
    borderRadius:RF(16),
  },
});
