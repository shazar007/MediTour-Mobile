import {View} from 'react-native';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {
  AppButton,
  AppTextInput,
  CustomHeader,
  CustomLoader,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import * as Yup from 'yup';
import {addBidRequest, navigate, showToast} from '@services';
import {Alert} from '@utils';
const BidAmbulance = ({route}: any) => {
  const {item} = route.params;
  const theme: any = useTheme();
  const [loading, setLoading] = useState(false);
  const colors = theme.colors;
  const validationSchema = Yup.object().shape({
    ambulanceName: Yup.string().required('Ambulance Name is required'),
    ambulanceNo: Yup.string().required('Ambulance No. is required'),
    price: Yup.number()
      .required('Price is required')
      .typeError('Price must be a number'),
  });
  const formik = useFormik({
    initialValues: {
      ambulanceName: '',
      ambulanceNo: '',
      price: '',
    },
    validationSchema,
    onSubmit: values => {
      setLoading(true);
      let request = {
        requestId: item?._id,
        ambulanceName: values?.ambulanceName,
        ambulanceNo: values?.ambulanceNo,
        price: values?.price,
      };
      addBidRequest(request)
        .then((res: any) => {
          Alert.showSuccess('Bid add Successfully');
          navigate('AmbulanceRequest');
        })
        .catch((err: any) => {
          Alert.showSuccess(err?.response?.data?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });
  const onPress = () => {
    formik.validateForm().then(errors => {
      if (Object.keys(errors).length > 0) {
        const firstError = Object.values(errors)[0];
        showToast('Error', firstError, false);
      } else {
        formik.handleSubmit();
      }
    });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Add Ambulance'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <View style={{marginHorizontal: RF(20), marginVertical: RF(20)}}>
          <AppTextInput
            placeholder={'Ambulance Name'}
            p_Horizontal={RF(8)}
            fontSize={RF(12)}
            placeholderTextColor={'#0D47A1'}
            value={formik.values.ambulanceName}
            onChangeText={formik.handleChange('ambulanceName')}
          />
          <AppTextInput
            placeholder={'Ambulance No.'}
            p_Horizontal={RF(8)}
            fontSize={RF(12)}
            placeholderTextColor={'#0D47A1'}
            value={formik.values.ambulanceNo}
            onChangeText={formik.handleChange('ambulanceNo')}
          />
          <AppTextInput
            placeholder={'Price'}
            p_Horizontal={RF(8)}
            fontSize={RF(12)}
            placeholderTextColor={'#0D47A1'}
            value={formik.values.price}
            keyboardType="numeric"
            onChangeText={formik.handleChange('price')}
          />
          <AppButton
            title="Bid"
            m_Top={RF(32)}
            bgClr={colors.Ambulance}
            onPress={onPress}
          />
        </View>
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default BidAmbulance;
