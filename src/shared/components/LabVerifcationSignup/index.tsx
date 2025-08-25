import {View} from 'react-native';
import React, {useState} from 'react';
import {getColorCode} from '@theme';
import {useDispatch, useSelector} from 'react-redux';
import {
  labSignup,
  margin,
  navigate,
  signUpVerificationValidationSchema,
} from '@services';
import {useFormik} from 'formik';
import AppButton from '../AppButton';
import SaveModal from '../ModalComponent/SaveModal';
import CustomLoader from '../CustomLoader';
import {useTheme} from '@react-navigation/native';
import {setLabSignUpData} from '@redux';
import New_Input from '../NewInput';
import {Alert} from '@utils';
import {country} from '@assets';

const LabVerifcationSignup = () => {
  const dispatch = useDispatch();
  const theme: any = useTheme();
  const colors = theme?.colors;
  const [saveModal, setSaveModal] = useState(false);
  const [loading, setLoading] = useState<any>(false);
  const {labSignUpData} = useSelector((state: any) => state?.root?.b2b);
  const {changeStack} = useSelector((state: any) => state.root.shiftStack);

  const {key, signUpDetails, docKind} = getColorCode();
  const {userFormData, fcm_token} = useSelector(
    (state: any) => state?.root?.user,
  );
  const LicenseImage: any = key?.licenseImg;
  const LicenseNumber: any = key?.licenseNo;
  const Description: any = key?.description;
  const Emergency: any = key?.emergency;
  const LicenseExpiry: any = key?.licenseExpiry;
  const CNICImage: any = key?.cnicImage;
  const basicInfo = labSignUpData?.basicInfo?.values;
  const socialLinks = labSignUpData?.socialLinks;

  const handleFormik = () => {
    formik?.handleSubmit();
  };

  const check4 =
    changeStack === 'Hotels' || changeStack === 'Travel Agency' ? true : false;

  const handleFirstName =
    changeStack === 'Pharmaceutical' ? 'firstName' : 'ownerFirstName';

  const handlelastName =
    changeStack === 'Pharmaceutical' ? 'lastName' : 'ownerLastName';

  const handleNational =
    changeStack == 'Paramedic staff' ||
    changeStack == 'Pharmacy' ||
    changeStack == 'Pharmaceutical' ||
    changeStack == 'Ambulance' ||
    changeStack == 'Rent A car' ||
    changeStack == 'Insurance' ||
    changeStack == 'Donation'
      ? false
      : changeStack == 'Laboratory'
      ? true
      : true;

  const handleSignUp = async (values?: any) => {
    setLoading(true);
    let params = {
      ...(docKind && {doctorKind: docKind}),
      ...(docKind && {entityType: 'individual'}),
      name: basicInfo?.name,
      ...(basicInfo?.licenseNumber && {
        [LicenseNumber]: basicInfo?.licenseNumber,
      }),

      ...(basicInfo?.expiryDate && {
        [LicenseExpiry]: basicInfo?.expiryDate?.toLocaleDateString('en-GB'),
      }),
      ...(basicInfo?.ownerFirstName && {
        [handleFirstName]: basicInfo?.ownerFirstName,
      }),
      ...(basicInfo?.ownerLastName && {
        [handlelastName]: basicInfo?.ownerLastName,
      }),
      ...(basicInfo?.phoneNumber && {
        phoneNumber: basicInfo?.phoneNumber,
      }),
      ...(basicInfo?.emergencyNumber && {
        [Emergency]: basicInfo?.emergencyNumber,
      }),
      ...(basicInfo?.CNIC && {cnicOrPassportNo: basicInfo?.CNIC}),
      ...(basicInfo?.CNICExpiry && {
        cnicOrPassportExpiry:
          basicInfo?.CNICExpiry?.toLocaleDateString('en-GB'),
      }),

      ...(check4 && {
        experience: basicInfo?.experience,
        features: basicInfo?.features,
        ...(basicInfo?.selection !== 'Individual' && {
          travelCompanyId: basicInfo?.travelCompanyId,
        }),
      }),

      ...(basicInfo?.description && {[Description]: basicInfo?.description}),
      ...(basicInfo?.openTime && {openTime: basicInfo?.openTime}),
      ...(basicInfo?.closeTime && {closeTime: basicInfo?.closeTime}),
      ...(basicInfo?.logo && {logo: basicInfo?.logo}),
      ...(basicInfo?.pmdcExpiry && {
        pmdcExpiry: basicInfo?.pmdcExpiry?.toLocaleDateString('en-GB'),
      }),

      ...(basicInfo?.gender && {gender: basicInfo?.gender}),
      ...(basicInfo?.pmdcImage && {pmdcImage: basicInfo?.pmdcImage}),
      ...(basicInfo?.pmdcNumber && {pmdcNumber: basicInfo?.pmdcNumber}),
      ...(basicInfo?.qualifications && {
        qualifications: basicInfo?.qualifications,
      }),

      ...(key?.speciality && {speciality: basicInfo?.speciality}),
      ...(basicInfo?.clinicName && {clinicName: basicInfo?.clinicName}),
      ...(basicInfo?.doctorType && {doctorType: basicInfo?.doctorType}),

      ...(basicInfo?.clinicExperience && {
        clinicExperience: basicInfo?.clinicExperience,
      }),

      ...(basicInfo?.licenseImage && {
        [LicenseImage]: basicInfo?.licenseImage,
      }),

      ...(basicInfo?.CNICImage && {
        [CNICImage]: basicInfo?.CNICImage,
      }),
      country: basicInfo?.country,

      location: {
        lat: basicInfo?.location?.lat,
        lng: basicInfo?.location?.lng,
        address: basicInfo?.location?.address,
        city: basicInfo?.location?.city,
      },

      //...............social info.......

      ...(socialLinks?.facebook && {facebook: socialLinks?.facebook}),
      ...(socialLinks?.instagram && {instagram: socialLinks?.instagram}),
      ...(socialLinks?.youtube && {youtube: socialLinks?.youtube}),
      ...(socialLinks?.linkedIn && {linkedIn: socialLinks?.linkedIn}),

      // .............................//

      //...............Bank info.......
      ...(handleNational && {
        isNational: basicInfo?.country === 'Pakistan' ? true : false,
      }),
      ...(labSignUpData?.ntn && {ntn: labSignUpData?.ntn}),
      ...(labSignUpData?.bankName && {bankName: labSignUpData?.bankName}),
      ...(labSignUpData?.accountTitle && {
        accountTitle: labSignUpData?.accountTitle,
      }),
      ...(labSignUpData?.accountNumber && {
        accountNumber: labSignUpData?.accountNumber,
      }),
      ...(labSignUpData?.taxFileImage && {
        taxFileImage: labSignUpData?.taxFileImage,
      }),

      // .............................//

      //...............Password info.......

      email: userFormData?.email,
      password: values?.password,
      ...(fcm_token && {fcmToken: fcm_token}),

      // .............................//
    };

    labSignup(params, signUpDetails)
      .then((res: any) => {
        setSaveModal(true);
        dispatch(setLabSignUpData({}));
        setTimeout(() => {
          setSaveModal(false);
          setTimeout(() => {
            navigate('LaboratoryLogin');
          }, 500);
        }, 2000);
      })
      .catch(err => {
        Alert.showError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const formik: any = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpVerificationValidationSchema,
    onSubmit: (values: any) => {
      handleSignUp(values);
    },
  });

  return (
    <View>
      <New_Input
        placeholder="Password"
        extraStyle={margin.top_8}
        isSecured
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        formik={formik?.touched?.password}
        errors={formik?.errors?.password}
      />
      <New_Input
        placeholder="Confirm Password"
        extraStyle={margin.top_8}
        isSecured
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
        formik={formik?.touched?.confirmPassword}
        errors={formik?.errors?.confirmPassword}
      />

      <AppButton
        title="SUBMIT"
        iconTrue={true}
        m_Top={56}
        bgColor={colors.orange}
        onPress={handleFormik}
      />
      <SaveModal
        Visible={saveModal}
        title={'Your data has been Successfully Saved'}
      />

      {loading && <CustomLoader />}
    </View>
  );
};
export default LabVerifcationSignup;
