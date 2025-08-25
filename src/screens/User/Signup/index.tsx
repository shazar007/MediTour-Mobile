import {CurvedCard, SignupContent} from '@components';
import {User} from '@assets';
import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';

const UserSignup = () => {
  useEffect(() => {
    const backAction = () => true;
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    // <CurvedCard source={User} title={'SIGNUP'}>
    <SignupContent />
    // </CurvedCard>
  );
};

export default UserSignup;
