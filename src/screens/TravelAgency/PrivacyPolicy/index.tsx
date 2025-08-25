import React from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import {
  Wrapper,
  HeaderCard,
  PrivacyPolicy,
  UserHeaderContent,
  CustomHeader,
} from '@components';

const PrivacyPolicy_B2B_TravelAgency = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {lab} = useSelector((state: any) => state.root.b2b);

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

export default PrivacyPolicy_B2B_TravelAgency;
