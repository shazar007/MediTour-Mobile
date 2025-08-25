import React from 'react';
import {useTheme} from '@react-navigation/native';
import {CustomHeader, PrivacyPolicy, Wrapper} from '@components';

const PrivacyPolicy_B2B_Insurance = () => {
  const theme: any = useTheme();
  const colors = theme.colors;

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Privacy Policy'}
        leftIcon
        titleColor={'#fff'}
        notify
      />
      <PrivacyPolicy />
    </Wrapper>
  );
};

export default PrivacyPolicy_B2B_Insurance;
