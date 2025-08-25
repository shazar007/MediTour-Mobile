import {
  StyleSheet,
  View,
  Image,
  TouchableOpacityProps,
  Pressable,
} from 'react-native';
import React from 'react';
import {RF, Typography} from '@theme';
import Text from '../text';
import {next} from '@assets';

interface props extends TouchableOpacityProps {
  imageSource?: any;
  largeHeading?: any;
  TextColor?: any;
  bgColor?: any;
  bottomtrue?: any;
  children?: any;
  heading?: any;
  des?: any;
  headImage_True?: any;
  color?: any;
  activeIndex?: any;
  backgroundTrue?: any;
  animatedButton_true?: any;
  onPress?: () => void;
}
const font = Typography.FONTS.SIZE;
const SwiperContent = (props: props) => {
  const {
    imageSource,
    largeHeading,
    bottomtrue,
    heading,
    des,
    color,
    TextColor,
    animatedButton_true,
    bgColor,
    onPress,
  } = props;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: bgColor ? bgColor : color.background,
        paddingTop: '20%',
      }}>
      <View
        style={{
          marginBottom: bottomtrue ? 0 : RF(20),
        }}>
        {largeHeading ? (
          <Text Edwardian size={36} center color={color.darkText}>
            {heading}
          </Text>
        ) : (
          <Text
            SFbold
            size={36}
            center
            color={TextColor ? TextColor : color.darkText}>
            {heading}
          </Text>
        )}
        {largeHeading ? (
          <Text MTbold size={36} center color={color.darkText}>
            {des}
          </Text>
        ) : (
          <Text
            SFregular
            size={14}
            center
            color={TextColor ? TextColor : color.darkText}
            style={{width: '80%', alignSelf: 'center'}}>
            {des}
          </Text>
        )}
      </View>
      <View style={{height: bottomtrue ? null : RF(390)}}>
        <Image
          style={{
            height: '100%',
            width: '100%',
          }}
          source={imageSource}
          resizeMode={'contain'}
        />
      </View>
      {animatedButton_true && (
        <Pressable
          onPress={onPress}
          style={{
            position: 'absolute',
            alignSelf: 'center',
            bottom: RF(80),
          }}>
          <Image
            source={next}
            resizeMode={'contain'}
            style={{
              height: RF(94),
              width: RF(94),
            }}
          />
        </Pressable>
      )}
    </View>
  );
};

export default SwiperContent;

const styles = StyleSheet.create({
  freeView: {
    width: '80%',
    marginTop: RF(60),
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: RF(98),
    width: '100%',
    alignSelf: 'center',
    marginTop: RF(20),
  },
  flexImage: {height: '100%', width: '100%'},
  text_Container: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: RF(80),
    paddingHorizontal: 20,
  },
  headingFont: {
    fontSize: font.XXXLARGE,
    fontWeight: 'bold',
    marginBottom: RF(10),
  },
  desFont: {
    fontSize: font.XSMALL,
    width: '95%',
    textAlign: 'center',
  },
});
