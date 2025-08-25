import {RF} from '@theme';
import React from 'react';
import Text from '../text';
import {View, StyleSheet, TextProps} from 'react-native';

interface Props extends TextProps {
  count?: any;
  bgColor?: any;
  IconTrue?: any;
  percentage?: any;
  headertitle?: any;
}

const LabDashboardCard = (props: Props) => {
  const {bgColor, count, percentage} = props;
  return (
    <View
      style={[
        styles.view,
        {
          backgroundColor: bgColor,
        },
      ]}>
      <Text>{count}</Text>
      <Text>{percentage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: RF(73),
    height: RF(74),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
});

export default LabDashboardCard;
