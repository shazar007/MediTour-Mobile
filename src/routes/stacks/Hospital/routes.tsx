import React from 'react';
import {useSelector} from 'react-redux';
import HospitalmainStack from './mainStack';
import Hospital_Stack from './authStack';
const HospitalRoutes = () => {
  const {isLoggedIn} = useSelector((state: any) => state.root.user);
  return <>{isLoggedIn ? <HospitalmainStack /> : <Hospital_Stack />}</>;
};
export default HospitalRoutes;
