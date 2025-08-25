import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
interface Props {
  children: any;
  styles?: StyleProp<ViewStyle>;
}
const BottomStack = (props: Props) => {
  const {children, styles} = props;
  return (
    <View
      style={[
        styles,
        {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
        },
      ]}>
      {children}
    </View>
  );
};

export default BottomStack;
