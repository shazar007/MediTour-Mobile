import React from 'react';
import {Image, View} from 'react-native';
import {RF} from '@theme';
import {useSelector} from 'react-redux';
import {Text} from '@components';

interface Props {
  UserName?: any;
  source?: any;
}
const HelpLine = (props: Props) => {
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const {UserName, source} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        alignItems: 'center',
        marginTop: RF(24),
        backgroundColor: changeColor,
        borderColor: changeColor,
        paddingVertical: RF(16),
        borderRadius: RF(12),
      }}>
      <Image
        source={source}
        tintColor={'#fff'}
        style={{
          width: RF(20),
          height: RF(20),
          resizeMode: 'contain',
          marginLeft: RF(16),
        }}
      />
      <Text size={14} SFregular color={'#fff'} style={{marginLeft: RF(16)}}>
        {UserName}
      </Text>
    </View>
  );
};

export default HelpLine;
