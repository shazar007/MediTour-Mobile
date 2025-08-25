import {setB2B, setUser} from '@redux';
import React, {useState} from 'react';
import {donationUpdateProfile} from '@services';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {CustomLoader, Generic_Settings} from '@components';

const Donation_Settings_B2B = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch: any = useDispatch();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const {B2B, settings} = useSelector((state: any) => state.root.b2b);

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
      companyLicenseNo: settings?.licenseNo,
      companyEmergencyNo: settings?.emergencyNo,
      cnicOrPassportExpiry: settings?.cnicExpiry,
      accountHolderName: settings?.accHolderName,
      companyLicenseExpiry: settings?.licenseExpiry,

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
    donationUpdateProfile(params)
      .then((res: any) => {
        dispatch(setB2B(res?.data));
        dispatch(setUser(res?.data?.donation));
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
        icon1Clr={colors?.bluE}
        navigation={navigation}
        hederTxtClr={colors?.bluE}
        cardColor={colors?.Donation}
        email={B2B?.donation?.email}
        phone={B2B?.donation?.phoneNumber}
        address={B2B?.donation?.location?.address}
      />
      {loading && <CustomLoader />}
    </>
  );
};

export default Donation_Settings_B2B;
