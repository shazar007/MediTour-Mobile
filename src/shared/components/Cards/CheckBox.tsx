import {TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {check} from '@assets';
import {RF} from '@theme';
import Text from '../text';

const CustomCheckbox = ({value, onValueChange}: any) => {
  return (
    <TouchableOpacity onPress={() => onValueChange(!value)}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            width: RF(20),
            height: RF(20),
            borderWidth: RF(1),
            borderColor: 'rgba(0, 83, 143, 1)',
            borderRadius: RF(5),
            marginRight: RF(8),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: value ? 'rgba(0, 83, 143, 1)' : '#fff',
          }}>
          {value && (
            <Image
              source={check}
              tintColor={'#fff'}
              style={{width: RF(20), height: RF(20)}}
            />
          )}
        </View>
        <Text size={14} SFregular>
          Yes, I understand and agree to the Terms of Service.
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default CustomCheckbox;
