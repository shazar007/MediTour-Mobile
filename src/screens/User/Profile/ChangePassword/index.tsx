import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  AppButton,
  CustomHeader,
  CustomLoader,
  New_Input,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {
  AddPassword,
  changePassword_Schema,
  globalStyles,
  margin,
  navigate,
  navigationRef,
  rv,
  updateProfile,
} from '@services';
import {useFormik} from 'formik';
import {passwordMap} from './props';
import {useDispatch, useSelector} from 'react-redux';
import {Alert} from '@utils';
import {setUser} from '@redux';

const ChangePassword = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const {user} = useSelector((state: any) => state?.root?.user);

  const formik: any = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: changePassword_Schema,

    onSubmit: (values: any) => {
      handleSaveClick(values);
    },
  });

  const handleSaveClick = (values: any) => {
    let params = {
      currentPassword: values?.currentPassword,
      password: values?.newPassword,
    };
    setLoading(true);
    updateProfile(params)
      .then((res: any) => {
        Alert.showSuccess(res?.data?.message);
        dispatch(setUser(res?.data?.user));
        navigationRef?.current?.goBack();
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  const handleSetup = () => {
    if (passwordValue === '') {
      Alert?.showError('Please enter password');
    } else if (!/[^a-zA-Z0-9]/.test(passwordValue)) {
      Alert?.showError('Password must contain at least one lowercase letter');
    } else {
      setLoading(true);
      let params = {
        email: user?.email,
        password: passwordValue,
      };
      AddPassword(params)
        .then((res: any) => {
          Alert?.showSuccess(res?.data?.message);
          dispatch(setUser(res?.data?.user));
          navigate('UserHome');
        })
        .catch((err: any) => {
          console.log('🚀 ~ handleSetup ~ err:', err?.response);
          return;
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Change Password'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <View style={styles?.container}>
        {user?.loginMethod && !user?.password ? (
          <SetPassword
            email={user?.email}
            setPasswordValue={setPasswordValue}
            passwordValue={passwordValue}
          />
        ) : (
          passwordMap(formik)?.map((item: any, index: any) => (
            <View key={index}>
              <New_Input
                placeholder={item?.placeholder}
                extraStyle={margin.top_8}
                isSecured
                value={item?.value}
                onChangeText={item?.onChangeText}
              />
              {item?.touched && item?.error && (
                <Text style={globalStyles.errors}>{item?.error}</Text>
              )}
            </View>
          ))
        )}
      </View>
      {user?.loginMethod && !user?.password ? (
        <AppButton
          title="Set Up"
          m_Top={rv(16)}
          iconTrue
          onPress={() => handleSetup()}
        />
      ) : (
        <AppButton
          title="Save"
          m_Top={rv(16)}
          iconTrue
          onPress={formik.handleSubmit}
        />
      )}
      <CustomLoader loading={loading} />
    </Wrapper>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    padding: rv(16),
  },
});

const SetPassword = ({email, passwordValue, setPasswordValue}: any) => {
  return (
    <>
      <New_Input
        editable={false}
        placeholder={'Email'}
        extraStyle={margin.top_8}
        value={email}
      />

      <New_Input
        placeholder={'Password'}
        extraStyle={margin.top_8}
        isSecured
        value={passwordValue}
        onChangeText={(v: any) => setPasswordValue(v)}
      />
    </>
  );
};
