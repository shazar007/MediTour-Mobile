import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

const HospitalSectionCards = ({
  value,
  label,
  bgClr,
}: {
  value?: any;
  label?: any;
  bgClr?: any;
}) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <View style={[styles.outer, {backgroundColor: bgClr}]}>
      <Text size={16} SFmedium color={colors.background}>
        {value}
      </Text>
      <Text size={9} SFmedium color={colors.background}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    marginVertical: RF(20),
    height: RF(75),
    width: RF(70),
    borderRadius: RF(10),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  inner: {
    height: RF(80),
    justifyContent: 'center',
    paddingHorizontal: RF(48),
    paddingLeft: RF(16),
    paddingVertical: RF(16),
    borderRadius: RF(16),
    elevation: 2,
  },
});

export default HospitalSectionCards;
