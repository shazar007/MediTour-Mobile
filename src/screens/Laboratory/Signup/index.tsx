import {BackHandler} from 'react-native';
import {
  CurvedCard,
  DoctorsSignupContent,
  LabSignupBankDetails,
  LabSignupContent,
  LabSignupSocial,
  LabVerifcationSignup,
  VerifyEmail,
} from '@components';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {
  add_Speciality,
  getAllCountries,
  getAllSpeciality,
  getVendorBGImageSource,
  navigationRef,
  showToast,
} from '@services';
import useStyles from './styles';
import {useSelector} from 'react-redux';
import {Alert} from '@utils';
const LaboratorySignup = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [speciality, setSpeciality] = useState([]);
  const [specialityTitle, setSpecialityTitle] = useState('');
  const [logo, setLogo] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [indicatorLoader, setIndicatorLoader] = useState(false);
  const [checkBoxState, setCheckBoxState] = useState(false);
  const [add, setAdd] = useState(false);
  const [countries, setCountries] = useState<any>([]);

  const {changeStack} = useSelector((state: any) => state?.root?.shiftStack);

  const onPressBack = () => {
    if (currentStep === 0) {
      if (modalVisible) {
        setModalVisible(false);
      } else {
        navigationRef?.current?.goBack();
      }
    } else {
      setCurrentStep(prevStep => Math.max(prevStep - 1, 0));
    }
  };

  useEffect(() => {
    const backAction = () => true;
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (changeStack !== 'Pharmaceutical' && currentStep === 1) {
      currentStep === 1 && setLoading(true);
      fetch_Speciality();
    }
    getAllCountries()
      .then((res: any) => {
        setCountries(res?.data?.countries);
      })
      .catch((err: any) => {
        console.log('🚀 ~ useEffect ~ err:', err);
      });
  }, [page]);

  const add_Specialities = (functionItem: any) => {
    setLoading(true);
    let params = {
      specialityTitle: specialityTitle,
    };
    add_Speciality(params)
      .then((res: any) => {
        setAdd(!add);
        setPage(1);
        functionItem();
      })
      .catch((err: any) => {
        showToast('error', err?.response?.data?.message, false);
      })
      .finally(() => {
        setSpecialityTitle('');
        setLoading(false);
      });
  };

  const fetch_Speciality = () => {
    let params = {
      search: search,
      page: page,
    };

    getAllSpeciality(params)
      .then((res: any) => {
        if (res?.data?.nextPage) {
          setNextPage(res?.data?.nextPage);
        }
        if (page > 1) {
          let newArr = speciality.concat(res?.data?.specialities);
          setSpeciality(newArr);
        } else {
          setSpeciality(res?.data?.specialities);
        }
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
        setIndicatorLoader(false);
      });
  };

  const handleSearch = (value: any) => {
    setSearch(value);
  };

  const fetchNextPage = () => {
    if (nextPage && page < nextPage) {
      setPage(page + 1);
      setIndicatorLoader(true);
    }
  };

  const onSubmitEditing = () => {
    setPage(1);
    fetch_Speciality();
  };
  const source = getVendorBGImageSource(changeStack);
  return (
    <CurvedCard
      source={source}
      backIcon={true}
      onPressBack={onPressBack}
      title={
        currentStep == 0
          ? 'VERIFICATION'
          : currentStep == 1
          ? 'BASIC INFO '
          : currentStep == 2
          ? 'SOCIAL INFO'
          : currentStep == 3
          ? 'BANK INFO  '
          : 'PASSWORD INFO'
      }>
      {currentStep == 0 && (
        <VerifyEmail
          setCurrentStep={setCurrentStep}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}

      {currentStep == 1 &&
        (changeStack === 'Laboratory' ||
        changeStack === 'Pharmacy' ||
        changeStack === 'Insurance' ||
        changeStack === 'Donation' ||
        changeStack === 'Rent A car' ||
        changeStack === 'Travel Agency' ||
        changeStack === 'Ambulance' ||
        changeStack === 'Hotels' ||
        changeStack === 'Hospital' ||
        changeStack === 'Pharmaceutical' ? (
          <LabSignupContent
            setCurrentStep={setCurrentStep}
            setLoading={setLoading}
            loading={loading}
            checkBoxState={checkBoxState}
            setCheckBoxState={setCheckBoxState}
            countries={countries}
          />
        ) : (
          <DoctorsSignupContent
            add_Specialities={add_Specialities}
            setCurrentStep={setCurrentStep}
            checkBoxState={checkBoxState}
            setCheckBoxState={setCheckBoxState}
            setLoading={setLoading}
            setSpecialityTitle={setSpecialityTitle}
            setLogo={setLogo}
            logo={logo}
            setAdd={setAdd}
            setSearch={setSearch}
            add={add}
            specialityTitle={specialityTitle}
            speciality={speciality}
            handleSearch={handleSearch}
            onEndReached={fetchNextPage}
            indicatorLoader={indicatorLoader}
            onSubmitEditing={onSubmitEditing}
            loading={loading}
            countries={countries}
          />
        ))}

      {currentStep === 2 && (
        <LabSignupSocial
          setCurrentStep={setCurrentStep}
          setLoading={setLoading}
          loading={loading}
        />
      )}

      {currentStep === 3 && (
        <LabSignupBankDetails
          setCurrentStep={setCurrentStep}
          setLoading={setLoading}
          loading={loading}
        />
      )}

      {currentStep == 4 && <LabVerifcationSignup />}
    </CurvedCard>
  );
};

export default LaboratorySignup;
