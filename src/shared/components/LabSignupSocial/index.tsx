import {View, TouchableOpacityProps, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {LabFacebook, LabInsta, LabTwitter, LabWeb} from '@assets';
import AppTextInput from '../AppTextInput';
import AppButton from '../AppButton';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {setLabSignUpData, setUserSignUp} from '@redux';
import CustomLoader from '../CustomLoader';
import {useTheme} from '@react-navigation/native';
import CustomFloatingLabelInput from '../floatingLabelInput';
import {RF} from '@theme';
import {margin, rv} from '@services';
import New_Input from '../NewInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface Props extends TouchableOpacityProps {
  setCurrentStep?: any;
  setLoading?: any;
  loading?: any;
  type?: any;
}

const LabSignupSocial = (props: Props) => {
  const dispatch = useDispatch();
  const {setCurrentStep, setLoading, loading, type} = props;
  const {labSignUpData} = useSelector((state: any) => state?.root?.b2b);
  const {userSignup} = useSelector((state: any) => state?.root?.user);
  const handleNext = (values: any) => {
    const mergedData = {
      ...labSignUpData,
      ...{socialLinks: values},
    };
    dispatch(setLabSignUpData(mergedData));
    setCurrentStep(3);
  };

  const handleFormik = () => {
    formik.handleSubmit();
  };

  const formik: any = useFormik({
    initialValues: {
      facebook: labSignUpData?.socialLinks?.facebook || '',
      instagram: labSignUpData?.socialLinks?.instagram || '',
      youtube: labSignUpData?.socialLinks?.youtube || '',
      linkedIn: labSignUpData?.socialLinks?.linkedIn || '',
    },
    onSubmit: (values: any) => {
      handleNext(values);
    },
  });

  return (
    <KeyboardAwareScrollView
      // contentContainerStyle={{paddingBottom: rv(100)}}
      showsVerticalScrollIndicator={false}
      extraHeight={25}
      // contentContainerStyle={{paddingBottom: rv(50)}}
      enableOnAndroid={true}>
      <New_Input
        optionalText
        placeholder={'Facebook'}
        extraStyle={margin.top_8}
        onChangeText={formik?.handleChange('facebook')}
        formik={formik?.touched?.facebook}
        errors={formik?.errors?.facebook}
        value={formik.values.facebook}
      />
      <New_Input
        optionalText
        placeholder={'Instagram'}
        extraStyle={margin.top_8}
        onChangeText={formik?.handleChange('instagram')}
        formik={formik?.touched?.instagram}
        errors={formik?.errors?.instagram}
        value={formik.values.instagram}
      />

      <New_Input
        optionalText
        placeholder={'Youtube'}
        extraStyle={margin.top_8}
        onChangeText={formik?.handleChange('youtube')}
        formik={formik?.touched?.youtube}
        errors={formik?.errors?.youtube}
        value={formik.values.youtube}
      />
      <New_Input
        optionalText
        placeholder={'linkedIn'}
        extraStyle={margin.top_8}
        onChangeText={formik?.handleChange('linkedIn')}
        formik={formik?.touched?.linkedIn}
        errors={formik?.errors?.linkedIn}
        value={formik.values.linkedIn}
      />

      <AppButton
        title="NEXT"
        iconTrue={true}
        loading={loading}
        lodingColor={'#ffff'}
        m_Top={56}
        onPress={handleFormik}
      />
    </KeyboardAwareScrollView>
  );
};
export default LabSignupSocial;
