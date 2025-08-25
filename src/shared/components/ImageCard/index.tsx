import React from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {RF} from '@theme';
import Text from '../text';
import {tick} from '@assets';
import {useTheme} from '@react-navigation/native';

const ImageCard = ({
  img,
  clr,
  onSelect,
  onOpenDetail,
}: {
  img?: any;
  clr?: any;
  onSelect?: any;
  onOpenDetail?: any;
}) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  return (
    <View
      style={[
        styles.vTxt,
        {
          height: RF(160),
        },
      ]}>
      <ImageBackground source={{uri: img}} style={styles.img}>
        <Pressable
          onPress={onSelect}
          style={{
            ...styles.tickBG,
            backgroundColor: clr ? clr : '#fff',
          }}>
          <Image
            source={tick}
            style={[styles.tick, {tintColor: clr ? '#fff' : 'blue'}]}
          />
        </Pressable>
      </ImageBackground>
      <Pressable onPress={onOpenDetail}>
        <Text align belowLine size={16} SFsemiBold color={colors?.bluE}>
          Details
        </Text>
      </Pressable>
    </View>
  );
};

const useStyles = (colors: any) =>
  StyleSheet.create({
    img: {
      width: '100%',
      height: RF(120),
      borderRadius: 10,
      resizeMode: 'contain',
      marginBottom: RF(5),
    },
    vTxt: {
      borderRadius: RF(15),
      marginHorizontal: RF(20),
      backgroundColor: 'white',
      elevation: 2,
      marginBottom: RF(20),
    },
    tickBG: {
      borderRadius: 100,
      width: RF(20),
      height: RF(20),
      resizeMode: 'contain',
      alignSelf: 'flex-end',
      overflow: 'hidden',
      borderWidth: 1,
      top: 10,
      right: 10,
    },
    tick: {
      width: '100%',
      height: '100%',
    },
  });

export default ImageCard;
