import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {TouchableOpacity} from 'react-native';
import CustomFloatingLabelInput from '../floatingLabelInput';
import { showToast } from '@services';

const Generic_List = ({
  mt,
  data,
  index,
  styles,
  setData,
  showNot,
  btnClr,
  handleDone,
  style,
}: {
  mt?: any;
  btnClr?: any;
  showNot?: any;
  styles?: any;
  data?: any;
  index?: any;
  setData?: any;
  handleDone?: any;
  style?: any;
}) => {
  const handleChange = (text: string, index: any) => {
    let clone = JSON.parse(JSON.stringify(data));
    clone[index].value = text;
    setData(clone);
  };
  const onDoneClick = () => {
    const isValid = data.every((d: any) => d.value !== '');
    if (!isValid) {
      showToast('Error', 'Please fill all Fields', false);
      return;
    }
    handleDone(index);
  };
  return (
    <>
      {data?.map((d: any, ind: any) => (
        <CustomFloatingLabelInput
          value={d.value}
          m_Top={mt ? mt : RF(12)}
          bdClr={'black'}
          label={d.title}
          inputClr={'black'}
          padding={RF(4)}
          labelClr={'black'}
          eyeIconClr={'black'}
          tintColorStart={'black'}
          keyboardType={'numeric'}
          placeholderTextColor={'black'}
          onChangeText={(text: any) => handleChange(text, ind)}
        />
      ))}

      {showNot ? null : (
        <TouchableOpacity
          onPress={onDoneClick}
          style={style ? style : styles.press}>
          <Text size={15} color={btnClr ? btnClr : 'white'}>
            Done
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Generic_List;
