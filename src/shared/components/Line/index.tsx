import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RF} from '@theme';

interface Props {
  colors?: any;
  mt?: any;
}

const Line = (props: Props) => {
  const {colors, mt} = props;
  return (
    <View
      style={{
        height: 0.7,
        backgroundColor: colors ? colors : 'red',
        marginTop: mt ? mt : RF(8),
      }}></View>
  );
};

export default Line;

const styles = StyleSheet.create({});
