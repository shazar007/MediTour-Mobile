import React, {useEffect} from 'react';

import {CurvedCard, LoginContent} from '@components';
import {navigationRef} from '@services';
import {useDispatch} from 'react-redux';
import {setRouteName} from '@redux';
import {Image, Platform, ScrollView, View} from 'react-native';
import {RF} from '@theme';
import {logo} from '@assets';

const UserLogin = () => {
  const dispatch = useDispatch();
  const route = navigationRef?.current?.getCurrentRoute()?.name;

  useEffect(() => {
    dispatch(setRouteName(route));
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: RF(16),
        paddingTop: Platform.OS === 'ios' ? RF(75) : RF(60),
      }}>
      <Image
        source={logo}
        style={{height: 120, width: 105, alignSelf: 'center', marginBottom: 24}}
        resizeMode="cover"
      />
      <LoginContent />
    </View>
    // <ScrollView>
    //   <CurvedCard loginFalse={true} title={'WELCOME'} backIcon={true}>
    // <LoginContent />
    //   </CurvedCard>
    // </ScrollView>
  );
};

export default UserLogin;
