import {StyleSheet, TextProps, View} from 'react-native';
import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
interface Props extends TextProps {
  bgcolor?: any;
  BGcolor?: any;
  bgColor?: any;
  backColor?: any;
}

const Doctorgraphlisting = (props: Props) => {
  const {bgColor, backColor, BGcolor, bgcolor, style} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: RF(16),
      }}>
      <Text size={16} SFmedium style={{color: bgColor}}>
        Total Users
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: RF(8),
        }}>
        <View
          style={{
            width: RF(6),
            height: RF(6),
            borderRadius: RF(8),
            marginLeft: RF(2),
            backgroundColor: backColor,
          }}
        />
        <Text
          size={12}
          SFmedium
          style={{marginHorizontal: RF(4), color: BGcolor}}>
          Current Week
        </Text>
        <View
          style={{
            width: RF(6),
            height: RF(6),
            borderRadius: RF(8),
            marginLeft: RF(2),
            backgroundColor: backColor,
          }}
        />
        <Text
          size={12}
          SFmedium
          style={{marginHorizontal: RF(4), color: bgcolor}}>
          Previous Week
        </Text>
      </View>
    </View>
  );
};

export default Doctorgraphlisting;
