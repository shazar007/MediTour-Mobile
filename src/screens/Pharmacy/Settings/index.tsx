import {setB2B, setUser} from '@redux';
import React, {useState} from 'react';
import {CustomLoader, Generic_Settings} from '@components';
import {hospitalUpdateProfile, pharmUpdateProfile} from '@services';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const Pharmacy_Settings_B2B = ({navigation}: any) => {
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
    };
    pharmUpdateProfile(params)
      .then((res: any) => {
        dispatch(setB2B(res?.data));
        dispatch(setUser(res?.data?.pharm));
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
        email={B2B?.pharm?.email}
        cardColor={colors?.Hospital}
        phone={B2B?.pharm?.phoneNumber}
        address={B2B?.pharm?.location?.address}
      />
      {loading && <CustomLoader />}
    </>
  );
};

export default Pharmacy_Settings_B2B;
