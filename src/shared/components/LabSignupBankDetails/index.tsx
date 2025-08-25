import {
  View,
  TouchableOpacityProps,
  ToastAndroid,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {getColorCode, RF} from '@theme';
import {LabCalender, UploadIconFirst} from '@assets';
import DocumentPicker from 'react-native-document-picker';
import {useFormik} from 'formik';
import {
  bankDetailsValidationSchema,
  BASE_URL,
  labSignup,
  margin,
  rv,
  showToast,
} from '@services';
import AppButton from '../AppButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  setLabSignUpData,
  setSpecialities,
  setUser,
  setUserSignUp,
} from '@redux';
import axios from 'axios';
import CustomFloatingLabelInput from '../floatingLabelInput';
import New_Input from '../NewInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface Props extends TouchableOpacityProps {
  setCurrentStep?: any;
  setLoading?: any;
  loading?: any;
  type?: any;
}

const LabSignupBankDetails = (props: Props) => {
  const {setCurrentStep, setLoading, loading, type} = props;
  const {key, signUpDetails, endPoints, docKind} = getColorCode();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const {fcm_token} = useSelector((state: any) => state?.root?.user);
  const {labSignUpData, specialities} = useSelector(
    (state: any) => state?.root?.b2b,
  );

  const handleFormik = () => {
    formik.handleSubmit();
  };

  const uploadImage = async (type?: any) => {
    if (uploading) {
      ToastAndroid.showWithGravityAndOffset(
        'Please wait your file is uploading',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50,
      );
    } else {
      try {
        const result = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });
        setUploading(true);
        let imageUrl = result[0]?.uri;
        let name = imageUrl.split('/').pop();

        const headers = {
          'Content-Type': 'multipart/form-data',
        };

        const formData = new FormData();
        formData.append('file', {
          uri: imageUrl,
          type: 'image/jpeg',
          name: name,
        });

        axios
          .post(BASE_URL + endPoints, formData, {
            headers: headers,
          })
          .then(response => {
            formik?.setFieldValue(type, response?.data?.fileUrl);
          })
          .catch(error => {})
          .finally(() => {
            setUploading(false);
          });
        // Process the selected file(s) here
      } catch (error) {
        // Handle the case where the user canceled the picker
        if (DocumentPicker.isCancel(error)) {
        } else {
          // Handle other errors
          console.error('DocumentPicker Error:', error);
        }
      }
    }
  };

  //

  const handlePress = async (values: any) => {
    const mergedData = {
      ...labSignUpData,
      ...{
        ntn: values?.incomeTaxNo,
        bankName: values?.bankName,
        accountNumber: values?.accountNumber,
        taxFileImage: values?.certificate,
        accountTitle: values.accountTitle,
      },
    };
    dispatch(setLabSignUpData(mergedData));
    setCurrentStep(4);
  };

  const formik: any = useFormik({
    initialValues: {
      incomeTaxNo: labSignUpData?.ntn || '',
      // salesTaxNo: '',
      certificate: labSignUpData?.taxFileImage || '',
      bankName: labSignUpData?.bankName || '',
      accountNumber: labSignUpData?.accountNumber || '',
      accountTitle: labSignUpData?.accountTitle || '',
    },

    // validationSchema: bankDetailsValidationSchema,

    onSubmit: (values: any) => {
      handlePress(values);
    },
  });

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      extraHeight={25}
      style={{flexGrow: 1}}
      contentContainerStyle={{paddingBottom: 50}}
      enableOnAndroid={true}>
      <New_Input
        optionalText
        placeholder={'Bank Name'}
        extraStyle={margin.top_8}
        onChangeText={formik?.handleChange('bankName')}
        formik={formik?.touched?.bankName}
        errors={formik?.errors?.bankName}
        value={formik.values.bankName}
      />

      <New_Input
        optionalText
        placeholder={'Account Title'}
        extraStyle={margin.top_8}
        onChangeText={formik?.handleChange('accountTitle')}
        formik={formik?.touched?.accountTitle}
        errors={formik?.errors?.accountTitle}
        value={formik.values.accountTitle}
      />

      <New_Input
        optionalText
        placeholder={'Account Number'}
        extraStyle={margin.top_8}
        onChangeText={formik?.handleChange('accountNumber')}
        formik={formik?.touched?.accountNumber}
        errors={formik?.errors?.accountNumber}
        value={formik.values.accountNumber}
      />

      <New_Input
        optionalText
        placeholder={'NTN'}
        maxLength={13}
        extraStyle={margin.top_8}
        onChangeText={formik?.handleChange('incomeTaxNo')}
        formik={formik?.touched?.incomeTaxNo}
        // errors={formik?.errors?.incomeTaxNo}
        value={formik.values.incomeTaxNo}
      />

      <Pressable onPress={() => uploadImage('certificate')}>
        <New_Input
          editable={false}
          keyboardType="number-pad"
          placeholder={'Tax File Image'}
          maxLength={30}
          extraStyle={margin.top_8}
          onChangeText={formik?.handleChange('certificate')}
          formik={formik?.touched?.certificate}
          // errors={formik?.errors?.incomeTaxNo}
          value={formik.values.certificate}
          endIcon={UploadIconFirst}
          loading={uploading}
        />
      </Pressable>

      {/* <CustomFloatingLabelInput
        m_Top={RF(16)}
        label="Account Holder Name"
        onChangeText={formik.handleChange('accountHolderName')}
        formik={formik?.touched?.accountHolderName}
        endIcon
        optionalText
        // errors={formik?.errors?.accountHolderName}
        value={formik.values.accountHolderName}
      /> */}
      <AppButton
        title="NEXT"
        iconTrue={true}
        m_Top={50}
        loading={loading}
        disabled={uploading}
        lodingColor={'#fff'}
        onPress={handleFormik}
      />
    </KeyboardAwareScrollView>
  );
};

export default LabSignupBankDetails;

{
  /* <CustomAccordion
        style={{
          marginVertical: 0,
        }}
        data={SECTIONS} // please dnt remove data
        setActiveSections={setActiveSections}
        activeSections={activeSections}
        renderHead={() => (
          <>
            <AppTextInput
              p_Horizontal={'0'}
              editable={false}
              formik={formik?.touched?.bankName}
              errors={formik?.errors?.bankName}
              value={formik.values.bankName}
              m_Top={16}
              placeholder="Bank Name"
            />
          </>
        )}
        renderindex1={() => (
          <>
            <FlatList
              scrollEnabled={false}
              data={bankData}
              renderItem={({item}) => {
                return (
                  <>
                    <Text
                      onPress={() => handleBankName(item)}
                      style={margin?.top_16}
                      SFmedium>
                      {item}
                    </Text>
                  </>
                );
              }}
            />
          </>
        )}
      /> */
}
