import {Image, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import Text from '../text';
import {fill, notFill} from '@assets';
import {RF} from '@theme';

interface Props {
  title?: any;
  title2?: any;
  selected?: any;
  setSelected?: any;
  onPress?: any;
  style?: any;
}
const CheckButton = (props: Props) => {
  const {selected, title, setSelected, onPress, style} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const isSelected = selected == title;

  return (
    <Pressable style={[styles.view, style]} onPress={onPress}>
      <Image source={isSelected ? fill : notFill} style={styles.img} />
      <Text size={14} SFregular style={{marginHorizontal: RF(5)}}>
        {title}
      </Text>
    </Pressable>
  );
};

const useStyles = (colors: any) =>
  StyleSheet.create({
    img: {
      width: RF(20),
      height: RF(20),
      resizeMode: 'contain',
    },
    view: {flexDirection: 'row', alignItems: 'center'},
  });

export default CheckButton;
