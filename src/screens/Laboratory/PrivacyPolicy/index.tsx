import {Wrapper, PrivacyPolicy, CustomHeader} from '@components';
import React from 'react';

const PrivacyPolicy_B2B = () => {
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

export default PrivacyPolicy_B2B;
