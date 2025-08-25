import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {
  AppButton,
  AppTextInput,
  CustomFloatingLabelInput,
  HeaderCard,
  Line,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {
  Email,
  LabCnic,
  UserBell,
  UserIcon,
  YY,
  appointment,
  bankcards,
  userworld,
} from '@assets';
import {RF} from '@theme';
import {colors, globalStyles, margin, navigate, padding} from '@services';
import CheckBox from '@react-native-community/checkbox';

const AddPaymentScreen = ({navigation}: any) => {
  const [ToggleCheckBox, setToggleCheckBox] = useState(false);
  const goBack = () => {
    navigation.goBack();
  };
  //   const AddPayment = () => {
  //     navigate('AddPaymentScreen');
  //   };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1, backgroundColor: '#FAF9F6'}}>
        <HeaderCard
          navigation={navigation}
          onPress={goBack}
          icon2={UserBell}
          plusIcon
          numberOfIcons={'2'}>
          <UserHeaderContent ScreenTitle={'Add Payment'} onlySearchIcon />
        </HeaderCard>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginHorizontal: RF(16), marginTop: RF(16)}}>
            <AppTextInput
              m_Top={RF(20)}
              placeholder={'Bank Name'}
              placeholderTextColor={'grey'}
            />
            <AppTextInput
              m_Top={RF(20)}
              placeholder={'Card Number'}
              placeholderTextColor={'grey'}
              endIcon={bankcards}
              widthEndIcon={RF(108)}
            />
            <AppTextInput
              m_Top={RF(20)}
              placeholder={'Expiry'}
              placeholderTextColor={'grey'}
              endIcon={YY}
              widthEndIcon={RF(48)}
            />

            <AppTextInput
              m_Top={RF(20)}
              placeholder={'CVC'}
              placeholderTextColor={'grey'}
            />
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: RF(8),
            paddingVertical: RF(16),
            bottom: RF(48),
          }}>
          <View style={padding.Horizontal_16}>
            <Text size={14} SFmedium color={colors.primary}>
              PKR 10,123
            </Text>
            <Text size={9} SFregular color={colors.primary}>
              +PKR 900 taxes and fees
            </Text>
            <AppButton
              title="Buy"
              m_Top={24}
              // onPress={AddPayment}
            />
          </View>
        </View>
      </View>
    </Wrapper>
  );
};

export default AddPaymentScreen;

const styles = StyleSheet.create({});
