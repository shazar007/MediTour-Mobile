import React from 'react';
import {useSelector} from 'react-redux';
import UserAuthStack from './authStack';
import UserMainStack from './mainStack';

const UserRoutes = () => {
  const {isLoggedIn} = useSelector((state: any) => state.root.user);

  return <>{isLoggedIn ? <UserMainStack /> : <UserAuthStack />}</>;
};

export default UserRoutes;
