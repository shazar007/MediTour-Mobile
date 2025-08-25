import {RF} from '@theme';
import {
  Text,
  Wrapper,
  AppButton,
  CustomLoader,
  Custom_Imput_Component,
  CustomHeader,
} from '@components';
import useStyles from './styles';
import {View} from 'react-native';
import React, {useState} from 'react';
import {setHealth, setTravel} from '@redux';
import {
  _gender,
  navigate,
  showToast,
  navigationRef,
  insuranceAddHealth_Family,
  insuranceAddHealth_Parents,
  insuranceAddHealth_Individual,
  insuranceAddTravel_Individual,
  insuranceADDFAMILYTRAVEL,
} from '@services';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp, useTheme} from '@react-navigation/native';
import {Alert} from '@utils';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      item?: any;
      pckg?: any;
    };
  }>;
}

const Category_Price = (props: Props, navigation: any) => {
  const {item, pckg} = props.route?.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const dispatch: any = useDispatch();
  const [actual, setActual] = useState<any>();
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [meditour, setMeditour] = useState<any>();
  const {health, travel} = useSelector((state: any) => state.root.b2b);
  const handleChange = (text: string, type: any) => {
    if (type == 'act') {
      setActual(text);
    } else if (type == 'dur') {
      setDuration(text);
    }
  };
  const onSubmit = (type: any) => {
    if (!actual || !duration) {
      showToast('Error', 'Please fill Field.', false);
      return;
    }
    if (
      pckg == 'Travel Single Trip Individual' ||
      pckg == 'Travel Single Trip Family' ||
      pckg == 'Travel Multi - Trip Family' ||
      pckg == 'Travel Multi - Trip Individual'
    ) {
      dispatch(
        setTravel({
          ...travel,
          duration: duration,
          actualPrice: actual,
        }),
      );
    } else {
      dispatch(
        setHealth({
          ...health,
          duration: duration,
          actualPrice: actual,
        }),
      );
    }
    if (pckg == 'Health Myself') {
      add_Insurance_MySelf();
    } else if (pckg == 'Health Family') {
      add_Insurance_Family();
    } else if (
      pckg == 'Travel Single Trip Individual' ||
      pckg == 'Travel Multi - Trip Individual'
    ) {
      add_Insurance_Travel_Individual();
    } else if (
      pckg == 'Travel Single Trip Family' ||
      pckg == 'Travel Multi - Trip Family'
    ) {
      add_Insurance_Travel_Family();
    } else if (pckg == 'Health Parents') {
      add_Insurance_Parents();
    }
  };
  const add_Insurance_MySelf = () => {
    setLoading(true);
    let params = {
      ageCriteria: {
        endAge: health?.endAge,
        startAge: health?.startAge,
      },
      hospitalizationLimit: {
        endLimit: health?.endLimit,
        startLimit: health?.startLimit,
      },
      laboratories: health?.labs,
      hospitals: health?.hospitals,
      gender: health?.gender,
      packageDescription: health?.pkgDesc,
      packageName: health?.packgName,
      packageLogo: health?.packgLogo,
      icuCcuLimits: health?.icuCcuLimits,
      claimPayoutRatio: health?.claimRatio,
      hospitalizationPerPerson: health?.person,
      dailyRoomAndBoardLimit: health?.DailyRoom_limit,
      accidentalEmergencyLimits: health?.accidentalEmergencyLimits,
      specializedInvestigationCoverage:
        health?.specializedInvestigationCoverage,
      perYear: duration,
      actualPrice: actual,
      maternity: health?.maternity,
      heading: health?.moreheading,
      description: health?.moreDesc,
      claimProcess: health?.claimLogo,
      policyDocument: health?.policyLogo,
      waitingPeriod: health?.waitingPeriod,
      ambulanceCoverage: health?.ambulanceCoverage,
    };
    insuranceAddHealth_Individual(params)
      .then((res: any) => {
        Alert.showSuccess('Insurance Added successful');
        navigate('InsurancePlan');
        dispatch(setHealth({}));
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };
  const add_Insurance_Family = () => {
    setLoading(true);
    let params = {
      packageDescription: health?.pkgDesc,
      yourAgeCriteria: {
        endAge: health?.endAge,
        startAge: health?.startAge,
      },
      spouseAgeCriteria: {
        endAge: health?.spouseEndAge,
        startAge: health?.spouseStartAge,
      },
      kidsAge: {
        endAge: health?.kidEndAge,
        startAge: health?.kidStartAge,
      },
      hospitalizationLimit: {
        endLimit: health?.endLimit,
        startLimit: health?.startLimit,
      },
      laboratories: health?.labs,
      hospitals: health?.hospitals,
      packageName: health?.packgName,
      packageLogo: health?.packgLogo,
      icuCcuLimits: health?.icuCcuLimits,
      claimPayoutRatio: health?.claimRatio,
      hospitalizationPerPerson: health?.person,
      dailyRoomAndBoardLimit: health?.DailyRoom_limit,
      accidentalEmergencyLimits: health?.accidentalEmergencyLimits,
      perYear: duration,
      actualPrice: actual,
      heading: health?.moreheading,
      description: health?.moreDesc,
      claimProcess: health?.claimLogo,
      policyDocument: health?.policyLogo,
      waitingPeriod: health?.waitingPeriod,
      ambulanceCoverage: health?.ambulanceCoverage,
    };
    insuranceAddHealth_Family(params)
      .then((res: any) => {
        showToast('Success', 'Insurance Added successful', true);
        navigate('InsurancePlan');
        dispatch(setHealth({}));
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };
  const add_Insurance_Parents = () => {
    setLoading(true);
    let params = {
      ageCriteria: {
        endAge: health?.endAge,
        startAge: health?.startAge,
      },
      hospitalizationLimit: {
        endLimit: health?.endLimit,
        startLimit: health?.startLimit,
      },
      packageDescription: health?.pkgDesc,
      laboratories: health?.labs,
      hospitals: health?.hospitals,
      packageName: health?.packgName,
      packageLogo: health?.packgLogo,
      icuCcuLimits: health?.icuCcuLimits,
      claimPayoutRatio: health?.claimRatio,
      hospitalizationPerPerson: health?.person,
      dailyRoomAndBoardLimit: health?.DailyRoom_limit,
      accidentalEmergencyLimits: health?.accidentalEmergencyLimits,
      specializedInvestigationCoverage:
        health?.specializedInvestigationCoverage,
      perYear: duration,
      actualPrice: actual,
      // meditourPrice: meditour,
      maternity: health?.maternity,
      heading: health?.moreheading,
      description: health?.moreDesc,
      claimProcess: health?.claimLogo,
      policyDocument: health?.policyLogo,
      waitingPeriod: health?.waitingPeriod,
      ambulanceCoverage: health?.ambulanceCoverage,
    };
    insuranceAddHealth_Parents(params)
      .then((res: any) => {
        showToast('Success', 'Insurance Added successful', true);
        navigate('InsurancePlan');
        dispatch(setHealth({}));
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };
  const add_Insurance_Travel_Individual = () => {
    setLoading(true);
    let params = {
      perYear: duration,
      actualPrice: actual,
      // meditourPrice: meditour,
      tripType: travel?.tripType,
      baggageLoss: travel?.baggageLoss,
      flightDelay: travel?.flightDelay,
      passportLoss: travel?.passportLoss,
      packageLogo: travel?.packgLogo,
      packageName: travel?.packgName,
      policyDocument: travel?.policyDocument,
      medicalCover: travel?.medicalCover,
      coveringUpto: travel?.coveringUpto,
      packageDescription: travel?.pkgDesc,
      packageCategory: travel?.packageCategory,
      countrySelection: travel?.countrySelection,
      luggageArrivalDelay: travel?.luggageArrivalDelay,
      emergencyReturnHomeCoverage: travel?.emergencyReturnHomeCoverage,
      medExpensesHospitalizationCoverage:
        travel?.medExpensesHospitalizationCoverage,
      medicineDeliveryCoverage: travel?.obj?.medicineDeliveryCoverage,
      repatriationCoverage: travel?.obj?.repatriationCoverage,
      returnOfDependentChildrenCoverage:
        travel?.obj?.returnOfDependentChildrenCoverage,
      repatriationIllnessInjuryCoverage:
        travel?.obj?.repatriationIllnessInjuryCoverage,
    };
    insuranceAddTravel_Individual(params)
      .then((res: any) => {
        showToast('Success', 'Insurance Added successful', true);
        navigate('InsurancePlan');
        dispatch(setTravel({}));
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };
  const add_Insurance_Travel_Family = () => {
    setLoading(true);
    let params = {
      perYear: duration,
      actualPrice: actual,
      // meditourPrice: meditour,
      tripType: travel?.tripType,
      baggageLoss: travel?.baggageLoss,
      flightDelay: travel?.flightDelay,
      passportLoss: travel?.passportLoss,
      packageLogo: travel?.packgLogo,
      packageName: travel?.packgName,
      policyDocument: travel?.policyDocument,
      medicalCover: travel?.medicalCover,
      coveringUpto: travel?.coveringUpto,
      packageDescription: travel?.pkgDesc,
      packageCategory: travel?.packageCategory,
      countrySelection: travel?.countrySelection,
      luggageArrivalDelay: travel?.luggageArrivalDelay,
      emergencyReturnHomeCoverage: travel?.emergencyReturnHomeCoverage,
      medExpensesHospitalizationCoverage:
        travel?.medExpensesHospitalizationCoverage,
      repatriationCoverage: travel?.obj?.repatriationCoverage,
      adndCoverage: 'Accidental Death and Dismemberment Coverage',
      tripCancellation: 'Up to USD 5,000',
      travelStayOverOneFamMember: 'Up to 7 days',
    };
    insuranceADDFAMILYTRAVEL(params)
      .then((res: any) => {
        showToast('Success', 'Insurance Added successful', true);
        navigate('InsurancePlan');
        dispatch(setTravel({}));
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader title={pckg} leftIcon titleColor={'#fff'} notify />

      <View style={{marginHorizontal: RF(20), marginTop: RF(20)}}>
        <Text size={18} SFmedium color={colors?.bluE}>
          Price
        </Text>
        <Custom_Imput_Component
          type={'actual'}
          value={actual}
          mt={RF(8)}
          label={'Actual Price'}
          keyboardType={'numeric'}
          handleChange={(text: any) => handleChange(text, 'act')}
        />
        {/* <Custom_Imput_Component
          value={meditour}
          type={'meditour'}
          label={'Meditour Price'}
          handleChange={(text: any) => handleChange(text, 'med')}
        /> */}
        <Custom_Imput_Component
          value={duration}
          type={'duration'}
          mt={RF(16)}
          label={'Duration'}
          handleChange={(text: any) => handleChange(text, 'dur')}
        />
      </View>

      <View style={styles.view}>
        <AppButton
          size={14}
          title="Submit"
          onPress={onSubmit}
          textcolor={'white'}
        />
      </View>

      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default Category_Price;
