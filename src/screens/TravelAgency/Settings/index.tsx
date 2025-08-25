import {setB2B, setUser} from '@redux';
import React, {useState} from 'react';
import {donationUpdateProfile, travelAgency_UpdateProfile} from '@services';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {CustomLoader, Generic_Settings} from '@components';

const TravelAgency_Settings_B2B = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch: any = useDispatch();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const {B2B, settings} = useSelector((state: any) => state.root.b2b);
  const {authToken} = useSelector((state: any) => state.root.user);

  const updateProfile = () => {
    setLoading(true);
    let params = {
      name: settings?.name,
      logo: settings?.logo,
      // facebook: settings?.fb,
      website: settings?.web,
      twitter: settings?.twitter,
      instagram: settings?.insta,
      salesTaxNo: settings?.sales,
      bankName: settings?.bankName,
      currentPassword: settings?.password,
      password: settings?.confirmPassword,
      cnicImage: settings?.cnicImage,
      taxFileImage: settings?.taxImg,
      ownerLastName: settings?.lname,
      ownerFirstName: settings?.fname,
      incomeTaxNo: settings?.incomeTax,
      cnicOrPassportNo: settings?.cnicNo,
      accountNumber: settings?.accountNo,
      cnicOrPassportExpiry: settings?.cnicExpiry,
      accountHolderName: settings?.accHolderName,

      // companyEmergencyNo: settings?.emergencyNo,
      // companyLicenseNo: settings?.licenseNo,
      // companyLicenseExpiry: settings?.licenseExpiry,
      // location: B2B?.donation?.location?.address,
      // description: '',
      // hospitalLicenseImage: settings?.licenseImg,
      // availability: settings?.status ? settings?.status : null,
      // openTime: '',
      // closeTime: '',
      // confirmPassword: settings?.confirmPassword,

      //....hospital....//
      // registrationImage: 'registration_image_url',
      // hospitalRegNo: 'Hospital Registration Number',
      // registrationExpiry: '2024-12-31',
      // fcmToken: 'fcm_token_here',
    };
    travelAgency_UpdateProfile(params)
      .then((res: any) => {
        dispatch(setB2B(res?.data));
        dispatch(setUser(res?.data?.travelAgency));
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const onSubmit = () => {
    updateProfile();
  };

  return (
    <>
      <Generic_Settings
        onUpdate={onSubmit}
        icon1Clr={'white'}
        navigation={navigation}
        hederTxtClr={'white'}
        cardColor={colors?.bluE}
        email={B2B?.travelAgency?.email}
        phone={B2B?.travelAgency?.phoneNumber}
        address={B2B?.travelAgency?.location?.address}
      />
      {loading && <CustomLoader />}
    </>
  );
};

export default TravelAgency_Settings_B2B;
