import {View} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import CheckBox from '../CheckBox';
import Text from '../text';
import {RF} from '@theme';

const FilterContent = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [selected, setSelected] = useState('');
  const selectCheckBox = (title: any) => {
    setSelected(title);
  };
  return (
    <View style={{marginTop: RF(8)}}>
      <Text size={18} SFmedium color={colors.blueText}>
        Service
      </Text>
      <View>
        <CheckBox
          selected={selected}
          colors={colors}
          onPress={selectCheckBox}
          title={'In Clinic / Hospital'}
        />
        <CheckBox
          selected={selected}
          colors={colors}
          onPress={selectCheckBox}
          title={'Audio / Video Consultation'}
        />
        <CheckBox
          selected={selected}
          colors={colors}
          onPress={selectCheckBox}
          title={'In-House'}
        />
      </View>
    </View>
  );
};

export default FilterContent;
