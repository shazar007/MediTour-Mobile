import {setB2B, setUser} from '@redux';
import {getColorCode} from '@theme';
import React, {useState} from 'react';
import {dr_UpdateProfile} from '@services';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {CustomLoader, Generic_Settings} from '@components';

const Doc_Settings_B2B = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);
  const {colorCode, updateProfile} = getColorCode();
  const {B2B, settings} = useSelector((state: any) => state.root.b2b);

  const update_Profile = () => {
    setLoading(true);
    let params = {
      name: settings?.name,
      clinicLogo: settings?.logo,
      facebook: settings?.fb,
      website: settings?.web,
      twitter: settings?.twitter,
      instagram: settings?.insta,
      salesTaxNo: settings?.sales,
      bankName: settings?.bankName,
      password: settings?.password,
      cnicImage: settings?.cnicImage,
      taxFileImage: settings?.taxImg,
      incomeTaxNo: settings?.incomeTax,
      cnicOrPassportNo: settings?.cnicNo,
      accountNumber: settings?.accountNo,
      cnicOrPassportExpiry: settings?.cnicExpiry,
      accountHolderName: settings?.accHolderName,
    };

    dr_UpdateProfile(updateProfile, params)
      .then((res: any) => {
        dispatch(setUser(res?.data?.doctor));
        dispatch(setB2B(res?.data));
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmit = () => {
    update_Profile();
  };

  return (
    <>
      <Generic_Settings
        onUpdate={onSubmit}
        email={B2B?.pharm?.email}
        phone={B2B?.pharm?.phoneNumber}
        address={B2B?.pharm?.location?.address}
      />
      {loading && <CustomLoader />}
    </>
  );
};

export default Doc_Settings_B2B;
