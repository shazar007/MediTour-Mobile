import {StyleSheet, TextProps, View} from 'react-native';
import React from 'react';
import {globalStyles} from '@services';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import Text from '../text';
interface Props extends TextProps {
  textone?: any;
  textsecond?: any;
  textthird?: any;
  textforth?: any;
  bgColor?: any;
  textColor?: any;
  BGsec?: any;
  BGthird?: any;
  BGForth?: any;
  Bradius?: any;
}
const Chartlist = (props: Props) => {
  const {
    bgColor,
    textColor,
    BGsec,
    BGthird,
    BGForth,
    textsecond,
    textone,
    textforth,
    textthird,
    Bradius,
  } = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <View style={[globalStyles.columnstart]}>
      <View style={[globalStyles.rowSimple, {marginBottom: 5}]}>
        <View
          style={{
            width: RF(12),
            height: RF(12),
            borderRadius: Bradius,
            backgroundColor: bgColor,
          }}
        />
        <Text size={12} SFmedium color={textColor} style={{marginLeft: 4}}>
          {textone}
        </Text>
      </View>
      <View style={[globalStyles.rowSimple, {marginBottom: 5}]}>
        <View
          style={{
            width: RF(12),
            height: RF(12),
            borderRadius: Bradius,
            backgroundColor: BGsec,
          }}
        />
        <Text size={12} SFmedium color={textColor} style={{marginLeft: 4}}>
          {textsecond}
        </Text>
      </View>
      <View style={[globalStyles.rowSimple, {marginBottom: 5}]}>
        <View
          style={{
            width: RF(12),
            height: RF(12),
            borderRadius: Bradius,
            backgroundColor: BGthird,
          }}
        />
        <Text size={12} SFmedium color={textColor} style={{marginLeft: 4}}>
          {textthird}
        </Text>
      </View>
      <View style={[globalStyles.rowSimple, {marginBottom: 5}]}>
        <View
          style={{
            width: RF(12),
            height: RF(12),
            borderRadius: Bradius,
            backgroundColor: BGForth,
          }}
        />
        <Text size={12} SFmedium color={textColor} style={{marginLeft: 4}}>
          {textforth}
        </Text>
      </View>
    </View>
  );
};

export default Chartlist;
