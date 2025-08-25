import React from 'react';
import {RF} from '@theme';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {check, tick} from '@assets';

interface Props {
  select?: any;
  onSelect?: any;
}
const SelectButton = (props: Props): any => {
  const {select, onSelect} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);

  return (
    <Pressable
      style={[
        styles.view,
        {backgroundColor: select ? colors?.bluE : '#D2CFCE'},
      ]}
      onPress={onSelect}>
      {select && <Image source={check} style={styles.img} />}
    </Pressable>
  );
};
export default SelectButton;

const useStyles = (colors?: any) =>
  StyleSheet.create({
    img: {
      width: RF(13),
      height: RF(13),
      resizeMode: 'contain',
      tintColor: 'white',
    },
    view: {
      height: RF(23),
      width: RF(23),
      borderRadius: 100,
      borderWidth: 1,
      borderColor: colors?.bluE,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
