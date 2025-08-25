import {
  Wrapper,
  HeaderCard,
  PrivacyPolicy,
  UserHeaderContent,
} from '@components';
import React from 'react';
import {LabMenu} from '@assets';
import {useSelector} from 'react-redux';
import {navigationRef} from '@services';
import {useTheme} from '@react-navigation/native';

const PrivacyPolicy_B2B_Physiologist = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {B2B} = useSelector((state: any) => state.root.b2b);

  const openDrawer = () => {
    navigationRef.current?.goBack();
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <HeaderCard
        home
        icon1={LabMenu}
        icon1Clr={'white'}
        numberOfIcons={'2'}
        onPress={openDrawer}
        cardColor={colors.Hospital}
        tintColor={colors.background}>
        <UserHeaderContent tintTr={'white'} ScreenTitle={'Privacy Policy'} />
      </HeaderCard>
      <PrivacyPolicy />
    </Wrapper>
  );
};

export default PrivacyPolicy_B2B_Physiologist;
