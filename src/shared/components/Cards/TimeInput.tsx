import {TextInput , View} from 'react-native';
import React from 'react';
import Text from '../text';
import { RF } from '@theme';
interface Props {
  title?: any;
  width?: any;
  placeholder?:any;
}
const TimeInput = ({title, width, placeholder}: Props) => {
  return (
    <View style={{marginTop: RF(16), width: width ? width : '45%'}}>
      <Text size={14} SFsemiBold color={'rgba(67, 67, 67, 1)'}>
        {title}
      </Text>
      <View
        style={{
          backgroundColor: 'rgba(248, 248, 248, 1)',
          marginTop: RF(8),
          paddingVertical: RF(8),
          paddingHorizontal: RF(16),
          width: '100%',
          borderRadius: RF(8),
        }}>
        <TextInput
          placeholder={placeholder}
          multiline
          style={{textAlignVertical: 'top'}}
        />
      </View>
    </View>
  );
};

export default TimeInput;

