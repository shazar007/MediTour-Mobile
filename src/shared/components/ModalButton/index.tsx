import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {useSelector} from 'react-redux';
import {View, StyleProp, TextStyle, ViewProps, Pressable} from 'react-native';

interface Props extends ViewProps {
  title?: string;
  height?: any;
  width?: any;
  m_Vertical?: any;
  textColor?: any;
  backgroundColor?: any;
  style?: StyleProp<TextStyle>;
  bR?: any;
  onPress?: any;
}

const ModalButton = (props: Props) => {
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const {title, height, width, backgroundColor, bR, onPress, ...otherProps} =
    props;

  return (
    <Pressable
      {...otherProps}
      style={{
        height: height ? height : RF(42),
        width: width ? width : RF(120),
        borderRadius: bR ? bR : RF(50),
        backgroundColor: backgroundColor ? backgroundColor : changeColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}>
      <Text size={14} SFmedium color={backgroundColor ? '#214380' : '#fff'}>
        {title}
      </Text>
    </Pressable>
  );
};

export default ModalButton;
