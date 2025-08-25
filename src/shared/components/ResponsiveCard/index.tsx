import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {RF} from '@theme';

interface Props {
  children?: any;
  height?: any;
  width?: any;
  color?: any;
  borderWidth?: any;
  align?: any;
  colum?: any;
  alignStart?: any;
  screen?: () => void;
  navigation?: any;
  mTop?: any;
  contentContainer?: any;
}

const Card = (props: Props) => {
  const {
    children,
    borderWidth,
    height,
    width,
    color,
    align,
    colum,
    alignStart,
    mTop,
    contentContainer,
    screen,
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={screen}
      style={[
        styles.cardContainer,
        contentContainer,

        {
          borderWidth: borderWidth ? borderWidth : null,
          height: height ? height : '100%',
          width: width ? width : '100%',
          backgroundColor: color,
          alignItems: alignStart ? 'flex-start' : 'center' ? 'center' : align,
          flexDirection: colum ? 'column' : 'row',
          marginTop: mTop,
        },
      ]}>
      {children}
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    height: '100%',
    width: '100%',
    paddingLeft: RF(10),
    overflow: 'hidden',
    borderRadius: 16,
    borderColor: '#746CA2',
  },
});
