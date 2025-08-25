import {setB2B, setUser} from '@redux';
import React, {useState} from 'react';
import {CustomLoader, Generic_Settings} from '@components';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {hotelUpdateProfile} from '@services';

const Hotel_Settings_B2B = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);
  const {settings, user} = useSelector((state: any) => state.root.b2b);

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
      password: settings?.password,
      taxFileImage: settings?.taxImg,
      // cnicImage: settings?.cnicImage,
      // emergencyNo: settings?.emergencyNo,r
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
    hotelUpdateProfile(params)
      .then((res: any) => {
        dispatch(setUser(res?.data?.hotel));
        dispatch(setB2B(res?.data));
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
        navigation={navigation}
        email={user?.email}
        cardColor={colors?.Hospital}
        phone={user?.phoneNumber}
        address={user?.location?.address}
      />
      {loading && <CustomLoader />}
    </>
  );
};

export default Hotel_Settings_B2B;
