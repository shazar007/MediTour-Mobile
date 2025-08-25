import {setB2B, setUser} from '@redux';
import React, {useState} from 'react';
import {insuranceUpdateProfile} from '@services';
import {useDispatch, useSelector} from 'react-redux';
import {CustomLoader, Generic_Settings} from '@components';

const Insurance_Settings_B2B = () => {
  const [loading, setLoading] = useState(false);
  const {B2B, settings} = useSelector((state: any) => state.root.b2b);
  const dispatch: any = useDispatch();

  const updateProfile = () => {
    setLoading(true);
    let params = {
      name: settings?.name,
      logo: settings?.logo,
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
    };
    insuranceUpdateProfile(params)
      .then((res: any) => {
        dispatch(setUser(res?.data?.insurance));
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
        email={B2B?.insurance?.email}
        phone={B2B?.insurance?.phoneNumber}
        address={B2B?.insurance?.location?.address}
      />
      {loading && <CustomLoader />}
    </>
  );
};

export default Insurance_Settings_B2B;
