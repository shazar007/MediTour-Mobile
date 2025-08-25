import {RF} from '@theme';
import React from 'react';
import Text from '../text';
import {colors} from '@services';
import {View, StyleSheet, TextProps, Image} from 'react-native';

interface Props extends TextProps {
  wd?: any;
  h?: any;
  label?: any;
  size?: any;
  text?: any;
  title?: any;
  text2?: any;
  bgColor?: any;
  IconTrue?: any;
  headertitle?: any;
  iconH?: any;
  iconWD?: any;
  txtSize?: any;
}

const InsuranceCard = (props: Props) => {
  const {
    bgColor,
    title,
    IconTrue,
    text,
    text2,
    size,
    wd,
    h,
    label,
    iconH,
    iconWD,
    txtSize,
  } = props;
  return (
    <View
      style={[
        styles.card,
        {
          height: h ? h : RF(150),
          width: wd ? wd : RF(165),
          backgroundColor: bgColor,
        },
      ]}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={IconTrue}
          style={[
            styles.icon,
            {
              width: iconWD ? iconWD : RF(40),
              height: iconH ? iconH : RF(40),
            },
          ]}
        />
        <Text
          size={24}
          SFsemiBold
          numberOfLines={1}
          color={colors.primary}
          style={{width: RF(30), marginLeft: 5}}>
          {label}
        </Text>
      </View>
      <Text size={size ? size : 24} SFsemiBold color={colors.primary}>
        {title}
      </Text>
      <Text
        size={txtSize ? txtSize : 16}
        SFmedium
        color={'#425166'}
        numberOfLines={2}>
        {text}
      </Text>
      <Text size={12} SFmedium color={'#4079ED'}>
        {text2}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: RF(16),
    marginLeft: RF(8),
    paddingHorizontal: RF(16),
    paddingVertical: RF(16),
    backgroundColor: '#d4d4d4',
    marginTop: RF(16),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    resizeMode: 'contain',
  },
});

export default InsuranceCard;
