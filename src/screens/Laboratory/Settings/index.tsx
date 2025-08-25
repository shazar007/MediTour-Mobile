import {setB2B, setUser} from '@redux';
import React, {useState} from 'react';
import {labUpdateProfile} from '@services';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {CustomLoader, Generic_Settings} from '@components';

const Lab_Settings_B2B = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);
  const {B2B, settings} = useSelector((state: any) => state.root.b2b);

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
      labLicenseNumber: settings?.licenseNo,
      labLicenseImage: settings?.licenseImg,
      licenseExpiry: settings?.licenseExpiry,
      cnicOrPassportExpiry: settings?.cnicExpiry,
      accountHolderName: settings?.accHolderName,
      availability: settings?.status ? settings?.status : null,
      // openTime: '',
      // closeTime: '',
      // confirmPassword: settings?.confirmPassword,
    };
    labUpdateProfile(params)
      .then((res: any) => {
        dispatch(setUser(res?.data?.lab));
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
        email={B2B?.lab?.email}
        phone={B2B?.lab?.phoneNumber}
        address={B2B?.lab?.location?.address}
      />
      {loading && <CustomLoader />}
    </>
  );
};

export default Lab_Settings_B2B;
