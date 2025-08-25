import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import New_Input from '../NewInput';
import {margin} from '@services';
import {useFormik} from 'formik';
import AppButton from '../AppButton';
import {RF, SCREEN_HEIGHT} from '@theme';
import {useDispatch, useSelector} from 'react-redux';
import {setUserSignUp} from '@redux';

const UserSignUpSocial = ({setCurrentStep}: {setCurrentStep?: any}) => {
  const {userSignup} = useSelector((state: any) => state.root.user);
  const dispatch = useDispatch();
  const formik: any = useFormik({
    initialValues: {
      facebook: userSignup?.socialLinks?.facebook || '',
      instagram: userSignup?.socialLinks?.instagram || '',
      linkedIn: userSignup?.socialLinks?.linkedIn || '',
      youtube: userSignup?.socialLinks?.youtube || '',
    },
    onSubmit: (values: any) => {
      handleUser(values);
    },
  });
  const handleFormik = () => {
    formik.handleSubmit();
  };
  const handleUser = async (values: any) => {
    const mergedData = {
      ...userSignup,
      ...{socialLinks: values},
    };
    dispatch(setUserSignUp(mergedData));
    setCurrentStep(2);
  };

  return (
    <View style={{marginTop: RF(32), height: SCREEN_HEIGHT / 1.53}}>
      <New_Input
        placeholder="Facebook (Optional)"
        extraStyle={margin.top_8}
        value={formik.values.facebook}
        onChangeText={formik.handleChange('facebook')}
      />
      <New_Input
        placeholder="Instagram (Optional)"
        extraStyle={margin.top_8}
        value={formik.values.instagram}
        onChangeText={formik.handleChange('instagram')}
      />
      <New_Input
        placeholder="LinkedIn (Optional)"
        extraStyle={margin.top_8}
        value={formik.values.linkedIn}
        onChangeText={formik.handleChange('linkedIn')}
      />
      <New_Input
        placeholder="YouTube (Optional)"
        extraStyle={margin.top_8}
        value={formik.values.youtube}
        onChangeText={formik.handleChange('youtube')}
      />
      <AppButton
        containerStyle={{position: 'absolute', bottom: 0}}
        m_Top={RF(32)}
        title="NEXT"
        onPress={handleFormik}
        textcolor="#fff"
        iconTrue
      />
    </View>
  );
};

export default UserSignUpSocial;

const styles = StyleSheet.create({});
