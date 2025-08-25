import {getColorCode} from '@theme';
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {login, navigate} from '@services';
import {
  setAuthToken,
  setB2B,
  setChangeStack,
  setIsLoggedIn,
  setLabSignUpData,
  setSpecialities,
  setUser,
} from '@redux';
import {CurvedCard, CustomLoader, LabLoginContent} from '@components';
import {getVendorBGImageSource} from '@services';
import {Alert} from '@utils';

const LaboratoryLogin = () => {
  const {B2Blogin, docKind} = getColorCode();
  const dispatch: any = useDispatch();
  const {fcm_token, checkNetwork} = useSelector(
    (state: any) => state.root.user,
  );
  const [loading, setLoading] = useState(false);
  const {changeStack} = useSelector((state: any) => state.root.shiftStack);
  const source = getVendorBGImageSource(changeStack);

  const onLoginButtonPressed = (values: any) => {
    if (checkNetwork == true) {
      setLoading(true);

      let params = {
        email: values.email,
        ...(fcm_token && {fcmToken: fcm_token}),
        password: values.password,
        ...(docKind && {doctorKind: docKind}),
      };

      login(params, B2Blogin)
        .then((res: any) => {
          if (res?.status == 200) {
            if (changeStack == 'Travel Agency') {
              dispatch(setUser(res?.data?.travelAgency));
            } else if (changeStack == 'Insurance') {
              dispatch(setUser(res?.data?.insurance));
            } else if (changeStack == 'Donation') {
              dispatch(setUser(res?.data?.donation));
            } else if (changeStack == 'Rent A car') {
              dispatch(setUser(res?.data?.rentCar));
            } else if (changeStack == 'Hotels') {
              dispatch(setUser(res?.data?.hotel));
            } else if (changeStack == 'Doctors') {
              dispatch(setUser(res?.data?.doctor));
            } else if (changeStack == 'Hospital') {
              dispatch(setUser(res?.data?.hospital));
            } else if (changeStack == 'Laboratory') {
              dispatch(setUser(res?.data?.lab));
            } else if (changeStack == 'Ambulance') {
              dispatch(setUser(res?.data?.ambulance));
            } else if (changeStack == 'Pharmacy') {
              dispatch(setUser(res?.data?.pharm));
            } else if (changeStack == 'Pharmaceutical') {
              dispatch(setUser(res?.data?.pharmacuetical));
            } else if (
              changeStack == 'Psychologist' ||
              changeStack == 'Paramedic staff' ||
              changeStack == 'Nutritionist' ||
              changeStack == 'Physiotherapist'
            ) {
              dispatch(setUser(res?.data?.doctor));
            } else {
              dispatch(setB2B(res?.data));
            }
            dispatch(setB2B(res?.data));
            dispatch(setIsLoggedIn(true));
            dispatch(setAuthToken(res?.data?.token));
            Alert.showSuccess('Login Successful');
          }
        })
        .catch((err: any) => {
          Alert.showError(err?.response?.data?.message);
        })
        .finally(() => setLoading(false));
    } else {
      Alert.showError('Invalid Passwords');
    }
  };
  const forgot = () => {
    navigate('UserForgotPassword');
  };
  const signup = () => {
    navigate('LaboratorySignup');
  };

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        dispatch(setLabSignUpData({}));
        dispatch(setSpecialities([]));
      });
      return () => {};
    }, []),
  );
  const handleback = () => {
    dispatch(setChangeStack(''));
  };
  return (
    <CurvedCard
      title={'SIGN IN'}
      source={source}
      resizeMode={'cover'}
      onPressBack={handleback}
      backIcon={true}>
      <LabLoginContent
        onLoginButtonPressed={onLoginButtonPressed}
        OnpressSignup={signup}
        onPressForgot={forgot}
      />
      {loading && <CustomLoader />}
    </CurvedCard>
  );
};

export default LaboratoryLogin;
