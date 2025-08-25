import React from 'react';
import Text from '../text';
import {RF} from '@theme';
import {globalStyles} from '@services';
import {StyleSheet, View} from 'react-native';

const DotText = ({
  title,
  value,
  clr,
}: {
  title?: any;
  value?: any;
  clr?: any;
}) => {
  return (
    <View style={[globalStyles.rowSimple, {marginBottom: 5, width: RF(100)}]}>
      <View style={[styles.inner, {backgroundColor: clr}]} />
      <Text
        size={11}
        SFmedium
        color={clr}
        style={{marginLeft: RF(5), width: RF(110)}}>
        {title}
      </Text>
      <Text size={11} SFmedium color={clr} style={styles.mL} numberOfLines={1}>
        {value}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mL: {marginLeft: 5, width: RF(30)},
  inner: {
    width: RF(8),
    height: RF(8),
    borderRadius: RF(4),
  },
});

export default DotText;
