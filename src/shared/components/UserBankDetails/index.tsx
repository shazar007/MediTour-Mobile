import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import New_Input from '../NewInput';
import {margin} from '@services';
import {useFormik} from 'formik';
import AppButton from '../AppButton';
import {RF, SCREEN_HEIGHT} from '@theme';
import {useDispatch, useSelector} from 'react-redux';
import {setUserSignUp} from '@redux';

const UserBankDetails = ({setCurrentStep}: {setCurrentStep?: any}) => {
  const {userSignup} = useSelector((state: any) => state.root.user);
  const dispatch = useDispatch();
  const formik: any = useFormik({
    initialValues: {
      bankName: userSignup?.bankdetails?.bankName || '',
      accountHolderName: userSignup?.bankdetails?.accountHolderName || '',
      accountNumber: userSignup?.bankdetails?.accountNumber || '',
      ntnNo: userSignup?.bankdetails?.ntnNo || '',
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
      ...{bankdetails: values},
    };
    dispatch(setUserSignUp(mergedData));
    setCurrentStep(3);
  };

  return (
    <ScrollView>
      <View style={{marginTop: RF(32), height: SCREEN_HEIGHT / 1.53}}>
        <New_Input
          placeholder="Bank Name (Optional)"
          extraStyle={margin.top_8}
          value={formik.values.bankName}
          onChangeText={formik.handleChange('bankName')}
        />
        <New_Input
          placeholder="IBAN / ACC Number (Optional)"
          extraStyle={margin.top_8}
          value={formik.values.accountNumber}
          onChangeText={formik.handleChange('accountNumber')}
        />
        <New_Input
          placeholder="Account Title (Optional)"
          extraStyle={margin.top_8}
          value={formik.values.accountHolderName}
          onChangeText={formik.handleChange('accountHolderName')}
        />
        <New_Input
          placeholder="NTN (Optional)"
          extraStyle={margin.top_8}
          value={formik.values.ntnNo}
          onChangeText={formik.handleChange('ntnNo')}
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
    </ScrollView>
  );
};

export default UserBankDetails;

const styles = StyleSheet.create({});
