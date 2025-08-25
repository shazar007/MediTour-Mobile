import {StyleSheet, TouchableOpacityProps, View} from 'react-native';
import Text from '../text';
import React from 'react';
import {Image} from 'react-native';
import {RF} from '@theme';
import {colors} from '@services';
interface Props extends TouchableOpacityProps {
  source?: any;
  text?: any;
  icon?: any;
  imageStyle?: any;
  imageStyle2?: any;
}

const DataComponent = (props: Props) => {
  const {source, text, icon, imageStyle, imageStyle2, ...otherProps} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: RF(8),
      }}>
      <Image source={source} style={imageStyle2} {...otherProps} />
      <Text
        size={16}
        color={'#fff'}
        SFmedium
        style={{marginHorizontal: RF(16)}}>
        {text}
      </Text>
      <Image source={icon} style={imageStyle} {...otherProps} />
    </View>
  );
};

export default DataComponent;

const styles = StyleSheet.create({});
