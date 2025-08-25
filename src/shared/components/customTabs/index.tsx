import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {RF} from '@theme';

interface Props {
  title?: any;
  img?: any;
  focused?: any;
  colors?: any;
}

const CustomTabs = (props: Props) => {
  const {title, img, focused, colors} = props;
  return (
    <>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          resizeMode="contain"
          source={img}
          style={[styles.focusedImg, {tintColor: colors.background}]}
        />
      </View>
    </>
  );
};

export default CustomTabs;

const styles = StyleSheet.create({
  focusedImg: {
    height: RF(20),
    width: RF(24),
  },
  unfocusedImg: {
    height: 24,
    width: 24,
  },
  round: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    height: RF(64),
    width: RF(64),
    borderRadius: 40,
  },
});
