import {Image, View} from 'react-native';
import React from 'react';
import {RF} from '@theme';
import {MultiUser} from '@assets';
import Text from '../text';
const VendorCard = ({backgroundColor, data}: any) => {
  return (
    <View
      style={{
        width: '100%',
        borderRadius: RF(8),
        padding: RF(8),
        justifyContent: 'center',
        alignItems: 'center',
        gap: RF(8),
        backgroundColor: backgroundColor,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: RF(8)}}>
        <View
          style={{
            backgroundColor: '#FF947A',
            width: RF(40),
            height: RF(40),
            borderRadius: RF(32),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={MultiUser}
            style={{
              width: RF(16),
              height: RF(16),
              resizeMode: 'contain',
              tintColor: '#fff',
            }}
          />
        </View>
        <Text size={14} SFmedium color={'#0D47A1'}>
          Total Request
        </Text>
      </View>
      <Text size={20} SFsemiBold color={'#0D47A1'}>
        {data}
      </Text>
    </View>
  );
};

export default VendorCard;
