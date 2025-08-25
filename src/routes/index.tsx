import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {handleConnectionChange} from '@services';
import {setCheckNetwork, setPrimaryColor} from '@redux';
import MainRoutesHandler from './stacks/mainStacksHandler';
import AuthRoutesHandler from './stacks/authStacksHandler';

const Routes = () => {
  const {changeStack} = useSelector((state: any) => state.root.shiftStack);

  const {isLoggedIn} = useSelector((state: any) => state.root.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (changeStack == 'Doctors') {
      dispatch(setPrimaryColor('red'));
    } else {
      dispatch(setPrimaryColor('#1A3D7C'));
    }
  }, [changeStack]);

  useEffect(() => {
    const unsubscribe = handleConnectionChange((isConnected: any) => {
      dispatch(setCheckNetwork(isConnected));
    });
    return () => {
      unsubscribe();
    };
  });

  return <>{isLoggedIn ? <MainRoutesHandler /> : <AuthRoutesHandler />}</>;
};

export default Routes;
