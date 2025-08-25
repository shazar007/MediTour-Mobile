import React from 'react';
import {RF} from '@theme';
import CustomFloatingLabelInput from '../floatingLabelInput';

const Custom_Imput_Component = ({
  mt,
  type,
  label,
  value,
  endIcon,
  editable,
  onPressEnd,
  handleChange,
  keyboardType,
}: {
  mt?: any;
  type?: any;
  value?: any;
  label?: any;
  endIcon?: any;
  editable?: any;
  keyboardType?:any;
  onPressEnd?: any;
  handleChange?: any;
}) => {
  return (
    <CustomFloatingLabelInput
      value={value}
      label={label}
      endIcon={endIcon}
      bdClr={'#7D7D7D'}
      inputClr={'black'}
      editable={editable}
      labelClr={'#7D7D7D'}
      eyeIconClr={'black'}
      onPressEnd={onPressEnd}
      m_Top={mt ? mt : RF(32)}
      tintColorStart={'black'}
      keyboardType={keyboardType}
      placeholderTextColor={'#7D7D7D'}
      onChangeText={(text: any) => handleChange(text, type)}
    />
  );
};

export default Custom_Imput_Component;
