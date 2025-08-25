import {View} from 'react-native';
import React from 'react';
import { RF } from '@theme';
interface Props {
    children?:any;
}
const CustomCard = ({children}:Props) => {
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: RF(16),
        paddingVertical: RF(16),
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginTop: RF(16),
        elevation:4,
      }}>
      {children}
    </View>
  );
};

export default CustomCard;
