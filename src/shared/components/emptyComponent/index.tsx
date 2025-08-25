import React from 'react';
import {RF, SCREEN_HEIGHT} from '@theme';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import LottieAnimation from '../LottieAnimation';
import {NoDataAnimation} from '@assets';

const EmptyList = ({
  title,
  description,
  titleStyles,
  height,
  desStyles,
  style,
}: {
  titleStyles?: any;
  desStyles?: any;
  title?: any;
  description?: any;
  height?: any;
  style?: any;
}) => {
  const myTheme: any = useTheme();
  const styles = useStyles(myTheme.colors);

  return (
    <View
      style={[
        styles.container ? styles.container : style,
        {height: height ? height : SCREEN_HEIGHT / 1.7},
      ]}>
      {/* <Text style={[styles.title, titleStyles]}>{title}</Text> */}

      {description ? (
        <Text style={[styles.description, desStyles]}>{description}</Text>
      ) : (
        <LottieAnimation visible={true} animation={NoDataAnimation} />
      )}
    </View>
  );
};
export default EmptyList;

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: 'gray',
      fontWeight: '100',
      fontSize: RF(10),
    },
    description: {
      color: 'gray',
      // fontWeight: '100',
      fontSize: RF(14),
    },
  });
