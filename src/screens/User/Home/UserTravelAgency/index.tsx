import {View} from 'react-native';
import React, {useState} from 'react';
import {
  CustomHeader,
  HeaderCard,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {UserBell} from '@assets';
import {useSelector} from 'react-redux';
import TopTabs from '../../../../routes/stacks/User/topTabs';
import {useTheme} from '@react-navigation/native';
import {rs} from '@services';

const UserTravelAgency = ({navigation}: any) => {
  const {user} = useSelector((state: any) => state.root.user);
  const theme: any = useTheme();
  const colors = theme?.colors;

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Flight'}
        leftIcon
        titleColor={colors.white}
        notify
      />
      <View style={{flex: 1, gap: rs(16)}}>
        <TopTabs />
      </View>
    </Wrapper>
  );
};

export default UserTravelAgency;
