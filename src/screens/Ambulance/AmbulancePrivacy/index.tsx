import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Wrapper, PrivacyPolicy, CustomHeader} from '@components';

const AmbulancePrivacy = () => {
  const theme: any = useTheme();
  const colors = theme.colors;

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

export default AmbulancePrivacy;
