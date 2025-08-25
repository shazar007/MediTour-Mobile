import React from 'react';
import {useSelector} from 'react-redux';
import LaboratoryAuthStack from './Laboratory/authStack';
import UserAuthStack from './User/authStack';

const AuthRoutesHandler = () => {
  const {changeStack} = useSelector((state: any) => state?.root?.shiftStack);

  if (changeStack) {
    if (changeStack === 'User') return <UserAuthStack />;
    else return <LaboratoryAuthStack />;
  } else {
    return <UserAuthStack />;
  }
};

export default AuthRoutesHandler;
