import {View} from 'react-native';
import React, {useState} from 'react';
import {
  AppButton,
  AppTextInput,
  CustomHeader,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import useStyles from './styles';
import {UserIcon, appointment, phone} from '@assets';
import {RF} from '@theme';
import {colors, navigate, rs} from '@services';
const UserInformation = ({route}: any) => {
  const styles = useStyles();
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [age, setAge] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneNoError, setPhoneNoError] = useState('');
  const [ageError, setAgeError] = useState('');
  const {data, type} = route.params;
  const validateFields = () => {
    let isValid = true;
    if (!name.trim()) {
      setNameError('Please enter your name');
      isValid = false;
    } else {
      setNameError('');
    }
    if (!phoneNo.trim()) {
      setPhoneNoError('Please enter your phone number');
      isValid = false;
    } else {
      setPhoneNoError('');
    }
    if (!age.trim()) {
      setAgeError('Please enter your age');
      isValid = false;
    } else {
      setAgeError('');
    }
    return isValid;
  };

  const handleNext = () => {
    if (!validateFields()) return;
    // Here you can store the values entered in inputs into some data structure
    const userData = {
      name: name,
      phoneNo: phoneNo,
      age: age,
      data,
      type,
    };

    navigate('RentalCar', {name, phoneNo, age, data, type});
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <CustomHeader
          title={'Other Person Information'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <View style={{marginHorizontal: rs(16), marginTop: rs(16)}}>
          <View style={{gap: RF(8)}}>
            <AppTextInput
              placeholder={'Name'}
              startIcon={UserIcon}
              B_W={0.5}
              p_Horizontal={RF(10)}
              value={name}
              onChangeText={text => setName(text)}
            />
            {nameError ? (
              <Text size={12} SFregular color={'red'}>
                {nameError}
              </Text>
            ) : null}
            <AppTextInput
              keyboardType="numeric"
              placeholder={'Phone No.'}
              startIcon={phone}
              B_W={0.5}
              p_Horizontal={RF(10)}
              value={phoneNo}
              onChangeText={text => setPhoneNo(text)}
            />
            {phoneNoError ? (
              <Text size={12} SFregular color={'red'}>
                {phoneNoError}
              </Text>
            ) : null}
            <AppTextInput
              keyboardType="numeric"
              placeholder={'Age'}
              startIcon={appointment}
              tintColorStart={'#00276D'}
              B_W={0.5}
              p_Horizontal={RF(10)}
              value={age}
              onChangeText={text => setAge(text)}
            />
            {ageError ? (
              <Text size={12} SFregular color={'red'}>
                {ageError}
              </Text>
            ) : null}
          </View>

          <AppButton
            title={'Next'}
            textcolor={'#fff'}
            m_Top={RF(220)}
            onPress={handleNext}
          />
        </View>
      </View>
    </Wrapper>
  );
};

export default UserInformation;
