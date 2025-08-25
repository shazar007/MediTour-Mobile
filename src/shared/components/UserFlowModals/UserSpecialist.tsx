import {Image, Pressable, View} from 'react-native';
import React, {useState} from 'react';
import {dropDownData2, globalStyles, margin} from '@services';
import {useSelector} from 'react-redux';
import {dropIcon} from '@assets';
import {RF} from '@theme';
import Text from '../text';
import Line from '../Line';
import CheckBox from '../CheckBox';
import Specialist from '../CustomDropDown/Specialist';
import {useTheme} from '@react-navigation/native';

const UserSpecialist = () => {
  const [selected, setSelected] = useState('');
  const {selectSpecialist} = useSelector((state: any) => state.root.user);
  const [toggle, setToggle] = useState(false);
  const theme: any = useTheme();
  const colors = theme.colors;
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const selectCheckBox = (title: any) => {
    setSelected(title);
  };
  return (
    <View>
      <Text size={18} SFmedium color={colors.blueText}>
        Specialty
      </Text>
      <Pressable
        style={[globalStyles.row, margin.top_4]}
        onPress={handleToggle}>
        <Text SFmedium color={colors.blueText}>
          {selectSpecialist ? selectSpecialist : 'Dermatologists'}
        </Text>
        <View>
          <Image source={dropIcon} style={{width: RF(16), height: RF(16)}} />
        </View>
      </Pressable>
      <Line />
      {toggle == true ? <Specialist renderList={dropDownData2} /> : null}
      <View style={margin.top_24}>
        <Text size={18} SFmedium color={colors.blueText}>
          Specialty
        </Text>
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
      </View>
    </View>
  );
};

export default UserSpecialist;
