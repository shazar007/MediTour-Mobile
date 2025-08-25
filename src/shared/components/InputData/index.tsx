import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {ArrowLeft} from '@assets';
import {rs} from '@services';
interface Props {
  UserName?: any;
  style?: any;
  source?: any;
  width?: any;
  margin_L?: any;
  padding_H?: any;
  height?: any;
  color?: any;
  LeftIcon?: any;
  size?: any;
  borderColor?: any;
  onPress?: any;
  bw_zero?: any;
  mTop_Zero?: any;
  testStyle?: any;
}
const InputData = (props: Props) => {
  const {
    UserName,
    LeftIcon,
    source,
    padding_H,
    color,
    size,
    width,
    height,
    style,
    borderColor,
    margin_L,
    onPress,
    bw_zero,
    mTop_Zero,
    testStyle,
  } = props;
  return (
    <Pressable
      style={[
        styles.MainContainer,
        style,
        {
          marginTop: mTop_Zero ? 0 : rs(16),
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: RF(8),
          borderBottomWidth: bw_zero ? 0 : 0.5,
          paddingHorizontal: padding_H,
          borderColor: borderColor ? borderColor : 'rgba(26, 61, 124, 1)',
        },
      ]}
      onPress={onPress}>
      <View style={styles.RowView}>
        <Image
          source={source}
          tintColor={'rgba(26, 61, 124, 1)'}
          style={[
            styles.ImageView,
            {
              width: width ? width : RF(16),
              height: height ? height : RF(16),
              marginLeft: margin_L,
            },
          ]}
        />
        <Text
          size={size ? size : 14}
          SFregular
          color={color ? color : 'rgba(0, 39, 109, 1)'}
          style={[{marginLeft: RF(16)}, testStyle]}>
          {UserName}
        </Text>
      </View>
      {LeftIcon && <Image source={ArrowLeft} style={styles.imgLeft} />}
    </Pressable>
  );
};

export default InputData;

const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingBottom: RF(8),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  RowView: {flexDirection: 'row', alignItems: 'center'},
  ImageView: {
    resizeMode: 'contain',
  },
  imgLeft: {
    width: RF(16),
    height: RF(16),
    resizeMode: 'contain',
    tintColor: '#00276D',
  },
});
