import React from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import {
  Wrapper,
  HeaderCard,
  PrivacyPolicy,
  UserHeaderContent,
} from '@components';

const PrivacyPolicy_B2B_Donation = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {lab} = useSelector((state: any) => state.root.b2b);

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <HeaderCard
        home
        numberOfIcons={'2'}
        icon1Clr={colors?.bluE}
        cardColor={colors.Donation}
        // tintColor={colors.bluE}
      >
        <UserHeaderContent
          tintTr={'#fff'}
          ScreenTitle={'Privacy Policy'}
          ColorScreenTitle={colors?.bluE}
        />
      </HeaderCard>
      <PrivacyPolicy />
    </Wrapper>
  );
};

export default PrivacyPolicy_B2B_Donation;
