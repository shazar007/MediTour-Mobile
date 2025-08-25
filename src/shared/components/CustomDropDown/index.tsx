import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {dropIcon} from '@assets';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

interface Props {
  title?: any;
  clicked?: any;
  setClicked?: any;
  clr?: any;
  children?: any;
  open?: any;
  style?: any;
  size?: any;
  bdClr?: any;
}

const CustomDropDown = (props: Props) => {
  const {setClicked, clicked, title, clr, children, open, style, size, bdClr} =
    props;

  return (
    <>
      <TouchableOpacity
        style={[
          clicked ? styles.TouchableOpacityStyle : style,
          {
            borderColor: bdClr ? bdClr : 'rgba(0, 39, 109, 0.5)',
          },
        ]}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <View style={styles.OpenStyles}>
          <Text
            SFsemiBold
            size={size ? size : 14}
            color={clr ? clr : '#00276D'}>
            {title}
          </Text>
          <Image source={dropIcon} style={{width: RF(16), height: RF(16)}} />
        </View>
        {open && children}
      </TouchableOpacity>
    </>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    paddingBottom: RF(10),
  },
  OpenStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: RF(8),
    justifyContent: 'space-between',
  },
});
