import React from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import {CustomHeader, Wrapper} from '@components';

const HelpCenter_Donation = () => {
  const theme: any = useTheme();
  const colors = theme.colors;

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Help Center'}
        leftIcon
        titleColor={colors.white}
        notify
      />
    </Wrapper>
  );
};

export default HelpCenter_Donation;
