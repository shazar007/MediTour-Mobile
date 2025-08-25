import {
  Wrapper,
  HeaderCard,
  PrivacyPolicy,
  UserHeaderContent,
  CustomHeader,
} from '@components';
import React from 'react';
import {LabMenu} from '@assets';
import {useSelector} from 'react-redux';
import {navigationRef} from '@services';
import {useTheme} from '@react-navigation/native';

const PrivacyPolicy_B2B_Pharmacy = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {B2B} = useSelector((state: any) => state.root.b2b);

  const openDrawer = () => {
    navigationRef.current?.goBack();
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Privacy Policy'}
        leftIcon
        titleColor={colors.white}
        notify
      />
      <PrivacyPolicy />
    </Wrapper>
  );
};

export default PrivacyPolicy_B2B_Pharmacy;
