import {setB2B, setUser} from '@redux';
import React, {useState} from 'react';
import {Generic_Settings} from '@components';
import {hospitalUpdateProfile} from '@services';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const Psychologist_Settings_B2B = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);
  const {user} = useSelector((state: any) => state.root.user);
  const {settings} = useSelector((state: any) => state.root.b2b);

  const updateProfile = () => {
    setLoading(true);
    let params = {
      name: settings?.name,
      logo: settings?.logo,
      facebook: settings?.fb,
      website: settings?.web,
      twitter: settings?.twitter,
      instagram: settings?.insta,
      salesTaxNo: settings?.sales,
      bankName: settings?.bankName,
      password: settings?.password,
      cnicImage: settings?.cnicImage,
      taxFileImage: settings?.taxImg,
      ownerLastName: settings?.lname,
      ownerFirstName: settings?.fname,
      incomeTaxNo: settings?.incomeTax,
      emergencyNo: settings?.emergencyNo,
      cnicOrPassportNo: settings?.cnicNo,
      accountNumber: settings?.accountNo,
      cnicOrPassportExpiry: settings?.cnicExpiry,
      accountHolderName: settings?.accHolderName,
      // licenseExpiry: settings?.licenseExpiry,
      // hospitalLicenseNumber: settings?.licenseNo,
      // hospitalLicenseImage: settings?.licenseImg,
      // availability: settings?.status ? settings?.status : null,
      // openTime: '',
      // closeTime: '',
      // confirmPassword: settings?.confirmPassword,
      //....hospital....//
      // registrationImage: 'registration_image_url',
      // hospitalRegNo: 'Hospital Registration Number',
      // registrationExpiry: '2024-12-31',
      // location: {
      //   lat: 31.4433,
      //   lng: 74.2597,
      //   address: 'Hospital Address',
      //   city: 'Lahore',
      // },
      // fcmToken: 'fcm_token_here',
    };
    hospitalUpdateProfile(params)
      .then((res: any) => {
        dispatch(setUser(res?.data));
        dispatch(setB2B(res?.data));
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const onSubmit = () => {
    updateProfile();
  };

  return (
    <Generic_Settings
      onUpdate={onSubmit}
      email={user?.email}
      phone={user?.phoneNumber}
      address={user?.location?.address}
    />
  );
};

export default Psychologist_Settings_B2B;
