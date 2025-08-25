import {
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import New_Input from '../NewInput';
import {
  GOOGLE_PLACES_API_KEY,
  margin,
  navigate,
  rv,
  SignUpValidationSchema,
} from '@services';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {RF, SCREEN_HEIGHT, SCREEN_WIDTH} from '@theme';
import AppButton from '../AppButton';
import {setUserAge, setUserSignUp} from '@redux';
import {customOptions} from '../constants/constants';
import RNDropDown from '../RnDropDown';
import CheckBox from '@react-native-community/checkbox';
import {Modalize} from 'react-native-modalize';
import {appointment, gender, header} from '@assets';
import Geocoder from 'react-native-geocoding';
import {useTheme} from '@react-navigation/native';
import Text from '../text';
import CustomFloatingLabelInput from '../floatingLabelInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import {differenceInYears} from 'date-fns';
import PhoneNumber from '../phoneNumber';
import CustomModalize from '../CustomModalize';
import LocationComponent from '../LocationComponent';
import auth from '@react-native-firebase/auth';
import UserAgreement from '../ModalComponent/UserAgreement';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Alert} from '@utils';
import Date_Picker from '../AA_New_Components/DatePicker';
const UserBasic = ({
  setCurrentStep,
  dob,
  setDob,
}: {
  setCurrentStep?: any;
  dob?: any;
  setDob?: any;
}) => {
  const {userFormData, fcm_token} = useSelector(
    (state: any) => state.root.user,
  );
  const [date, setDate] = useState(new Date());
  const theme: any = useTheme();
  const [modalOpen, setModal] = useState(false);
  const [verifybutton, setVerifyEror] = useState('');
  const [indicator, setIndicator] = useState(false);
  const [loading, setLoading] = useState(false);

  const [initializing, setInitializing] = useState(true);
  const [visible, setIsVisible] = useState(false);
  const colors: any = theme.colors;
  const [selectDrop, setSelectDrop] = useState('');
  const [open, setOpen] = useState<any>(false);
  const modalizeRef = useRef<Modalize>(null);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const {userAge, userSignup} = useSelector((state: any) => state.root.user);

  const styles: any = useStyles(colors);
  const handleDob = (text: any) => {
    setIsVisible(true);
  };
  Geocoder.init(GOOGLE_PLACES_API_KEY);
  const onAuthStateChanged = (userData: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    dispatch(setUserAge(''));
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const formik: any = useFormik({
    initialValues: {
      name: userSignup?.basicInfo?.values?.name || '',
      email: userSignup?.basicInfo?.values?.eamil || userFormData?.email || '',
      phone: userSignup?.basicInfo?.values?.phone || '',
      phoneWithoutCode: userSignup?.basicInfo?.values?.phoneWithoutCode || '',
      gender: userSignup?.basicInfo?.values?.gender || selectDrop,
      spouseOrGuardianName:
        userSignup?.basicInfo?.values?.spouseOrGuardianName || '',
      bloodGroup: userSignup?.basicInfo?.values?.bloodGroup || '',
      cnicOrPassNo: userSignup?.basicInfo?.values?.cnicOrPassNo || '',
      childCount: userSignup?.basicInfo?.values?.childCount || '',
      qualification: userSignup?.basicInfo?.values?.qualification || '',
      address: userSignup?.basicInfo?.values?.address || '',
      city: userSignup?.basicInfo?.values?.city || '',
      country: userSignup?.basicInfo?.values?.country || '',
      dob: userSignup?.basicInfo?.values?.dob || dob,
      terms: userSignup?.basicInfo?.values?.terms || false,
    },
    validationSchema: SignUpValidationSchema,

    onSubmit: (values: any) => {
      handleSave(values);
    },
  });

  let checkLength = formik?.values?.phoneWithoutCode?.length;

  const handleSave = (values: any) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      handleNext(values);
    }, 3000);
  };

  const handleDropDown = (title: any) => {
    formik.setFieldValue('gender', title);
    setSelectDrop(title);
    setOpen(!open);
  };
  const handleFormik = () => {
    formik?.handleSubmit();
  };
  const handleNext = (values: any) => {
    const mergedData = {
      ...userSignup,
      ...{basicInfo: {values}},
    };
    dispatch(setUserSignUp(mergedData));
    setCurrentStep(1);
  };
  const onOpen = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const onChange = (selectedDate: any) => {
    // setIsVisible(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    const formattedDate = currentDate.toLocaleDateString('en-GB');
    setDob(formattedDate);
    const calculatedAge = differenceInYears(new Date(), currentDate);
    dispatch(setUserAge(calculatedAge.toString()));
    formik.setFieldValue('dob', formattedDate);
  };
  const handlePress = async (data: any) => {
    setIndicator(true);
    let vals = data?.description.split(',');
    let city = vals[vals?.length - 2];
    const country = data.terms[data.terms.length - 1].value;

    formik?.setFieldValue('city', city);
    formik?.setFieldValue('country', country);
    formik?.setFieldValue('address', data?.description);
    await Geocoder.from(data?.description)
      .then(json => {
        var locat = json.results[0]?.geometry?.location;
        formik?.setFieldValue('latitude', locat?.lat);
        formik?.setFieldValue('longitude', locat?.lng);
      })
      .catch(error => console.warn(error))
      .finally(() => {
        setIndicator(false);
      });
  };

  const openPrivacyPolicy = () => {
    const url = 'https://meditour.global/privactpolicys';
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };
  const openCheckBox = (value: any) => {
    setVerifyEror('');
  };

  const handleCross = () => {
    formik.setFieldValue('address', '');
  };

  return (
    <View style={{height: '75%'}}>
      <Text
        center
        size={12}
        SFregular
        color={colors.extraLightText}
        style={margin.top_4}>
        Please add some basic information
      </Text>
      <KeyboardAwareScrollView
        nestedScrollEnabled={false}
        contentContainerStyle={{paddingBottom: rv(100)}}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
        extraHeight={25}
        enableOnAndroid={true}>
        <New_Input
          placeholder={'Full Name'}
          extraStyle={margin.top_8}
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
        />
        {formik.touched.name && formik.errors.name && (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            {formik.errors.name}
          </Text>
        )}
        <New_Input
          placeholder={'Father Name'}
          extraStyle={margin.top_8}
          value={formik.values.spouseOrGuardianName}
          onChangeText={formik.handleChange('spouseOrGuardianName')}
        />
        {formik.touched.spouseOrGuardianName &&
          formik.errors.spouseOrGuardianName && (
            <Text style={{color: 'red', marginTop: RF(4)}}>
              {formik.errors.spouseOrGuardianName}
            </Text>
          )}
        <RNDropDown
          title={formik.values.gender ? formik.values.gender : 'Gender'}
          onOpen={onOpen}
          open={open}
          box={'box'}
          // iconSource_1={gender}
          // containerStyle={[
          //   margin.top_32,
          //   padding.right_8,
          //   { borderColor: colors.primary },
          // ]}
          dropDownData={customOptions}
          titleStyle={{color: colors.primary}}
          renderDropDownData={(item: any) => (
            <Pressable
              onPress={() => handleDropDown(item?.title)}
              style={styles.dropContainer}>
              <Text
                style={{marginTop: RF(16)}}
                color={colors.primary}
                SFregular>
                {item?.title}
              </Text>
            </Pressable>
          )}
        />
        {formik.touched.gender && formik.errors.gender && (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            {formik.errors.gender}
          </Text>
        )}

        {/* New Date Picker */}

        <Date_Picker
          color={formik?.values?.dob ? colors.text : 'rgba(125, 125, 125, 1)'}
          placeHolder={
            formik?.values?.dob ? formik?.values?.dob : 'Select Date of Birth'
          }
          onChange={onChange}
        />
        {formik?.touched?.dob && formik?.errors?.dob && (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            {formik?.errors?.dob}
          </Text>
        )}

        {/* New Date Picker */}

        <New_Input
          placeholder={'Blood Group e.g O+'}
          extraStyle={margin.top_8}
          value={formik.values.bloodGroup}
          onChangeText={formik.handleChange('bloodGroup')}
        />
        {/* {formik.touched.bloodGroup && formik.errors.bloodGroup && (
                <Text style={{ color: 'red', marginTop: RF(4) }}>{formik.errors.bloodGroup}</Text>
            )} */}
        <New_Input
          placeholder={'NIC / Passport'}
          extraStyle={margin.top_8}
          value={formik.values.cnicOrPassNo}
          onChangeText={formik.handleChange('cnicOrPassNo')}
        />
        {formik.touched.cnicOrPassNo && formik.errors.cnicOrPassNo && (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            {formik.errors.cnicOrPassNo}
          </Text>
        )}
        <New_Input
          placeholder={'Children Number (If any)'}
          extraStyle={margin.top_8}
          value={formik.values.childCount}
          keyboardType="numeric"
          onChangeText={formik.handleChange('childCount')}
        />
        {/* {formik.touched.childCount && formik.errors.childCount && (
                <Text style={{ color: 'red', marginTop: RF(4) }}>{formik.errors.childCount}</Text>
            )} */}

        <PhoneNumber
          type={'box'}
          phValue={formik.values.phoneWithoutCode}
          onChangeText={(text: any) => {
            formik.setFieldValue('phoneWithoutCode', text);
          }}
          onChangeFormattedText={formik.handleChange('phone')}
        />
        {formik.touched.phoneWithoutCode && formik.errors.phoneWithoutCode ? (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            {formik?.errors?.phoneWithoutCode}
          </Text>
        ) : checkLength == 0 ? null : checkLength < 9 ||
          formik?.errors?.phone == '' ? (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            Incomplete phone number
          </Text>
        ) : null}
        <New_Input
          placeholder={'Email'}
          extraStyle={margin.top_8}
          value={formik.values.email}
          editable={false}
          onChangeText={formik.handleChange('email')}
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            {formik.errors.email}
          </Text>
        )}
        <New_Input
          placeholder={'Qualification'}
          extraStyle={margin.top_8}
          value={formik.values.qualification}
          onChangeText={formik.handleChange('qualification')}
        />
        {formik.touched.qualification && formik.errors.qualification && (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            {formik.errors.qualification}
          </Text>
        )}
        {/* <CustomFloatingLabelInput
        m_Top={RF(16)}
        type={'box'}
        label={'Residential Address '}
        formik={formik?.touched?.address}
        errors={formik?.errors?.address}
        value={formik.values.address}
        enablePress={openModal}
      /> */}
        {/* <View
          style={{
            borderRadius: 8,
            overflow: 'hidden',
            marginTop: rv(8),
            backgroundColor: theme?.colors?.inputBack,
          }}>
          <LocationComponent
            setIndicator={setIndicator}
            onPressCross={handleCross}
            cross={!indicator}
            loading={indicator}
            placeHolderColor={'rgba(169, 169, 172, 1)'}
            textInputContainer={{
              height: 55,
              borderRadius: 0,
              backgroundColor: 'transparent',
            }}
            title={formik.values.address}
            placeHolder={'Residential Address'}
            onChange={handlePress}
            noAutoFocus
          />
        </View>
        {formik.touched.address && formik.errors.address && (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            {formik.errors.address}
          </Text>
        )} */}
        <New_Input
          placeholder="Address"
          extraStyle={margin.top_8}
          value={formik?.values?.address}
          onChangeText={formik.handleChange('address')}
        />
        {formik.touched.address && formik.errors.address && (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            {formik.errors.address}
          </Text>
        )}

        <New_Input
          placeholder="City"
          extraStyle={margin.top_8}
          // isSecured
          value={formik?.values?.city}
          onChangeText={formik.handleChange('city')}
        />
        {formik.touched.city && formik.errors.city && (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            {formik.errors.city}
          </Text>
        )}
        <New_Input
          placeholder="Country"
          extraStyle={margin.top_8}
          // isSecured
          value={formik?.values?.country}
          onChangeText={formik.handleChange('country')}
        />
        {formik.touched.country && formik.errors.country && (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            {formik.errors.country}
          </Text>
        )}

        <View
          style={{
            flexDirection: 'row',
            marginTop: rv(8),
            alignItems: 'center',
          }}>
          <View
            style={{transform: [{scale: Platform.OS === 'ios' ? 0.7 : 1.1}]}}>
            <CheckBox
              style={{marginRight: 4}}
              boxType={Platform.OS === 'ios' ? 'circle' : 'square'}
              tintColors={{true: colors.primary, false: '#D9D9D9'}}
              // value={toggleCheckBox}
              // onValueChange={newValue => openCheckBox(newValue)}
              value={formik?.values?.terms}
              onValueChange={newValue =>
                formik.setFieldValue('terms', newValue)
              }
            />
          </View>

          <Text size={10} SFregular color={'#000'}>
            I agree to MediTour{' '}
            <Text
              size={10}
              SFregular
              color={'orange'}
              style={{textDecorationLine: 'underline'}}
              onPress={() => setModal(true)}>
              Terms & Conditions{' '}
            </Text>
            and{' '}
            <Text
              size={10}
              onPress={openPrivacyPolicy}
              SFregular
              color={'orange'}
              style={{textDecorationLine: 'underline'}}>
              Privacy Policy
            </Text>
          </Text>
        </View>

        {formik.touched.terms && formik.errors.terms && (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            {formik.errors.terms}
          </Text>
        )}

        {verifybutton ? (
          <Text style={{color: 'red', marginTop: RF(4)}}>{verifybutton}</Text>
        ) : null}

        <Modal
          transparent={true}
          animationType="none"
          visible={modalOpen}
          style={{flex: 1}}>
          <UserAgreement onPress={() => setModal(false)} />
        </Modal>
      </KeyboardAwareScrollView>
      <View
        style={{
          right: 0,
          left: 0,
          bottom: -2,
          gap: 16,
          paddingTop: rv(8),
          position: 'absolute',
          backgroundColor: '#fff',
          zIndex: 1000,
        }}>
        <AppButton
          // m_Top={RF(32)}
          disabled={loading}
          title={loading ? 'loading...' : 'NEXT'}
          onPress={handleFormik}
          textcolor="#fff"
          iconTrue
        />
        <View style={styles.footerView}>
          <Text SFregular size={14} color={colors.extraLightText}>
            Already Signed up?
          </Text>
          <TouchableOpacity onPress={() => navigate('New_Login')}>
            <Text
              SFsemiBold
              size={14}
              color={colors.primary}
              style={{
                marginLeft: 5,
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomModalize ref={modalizeRef} height={700}>
        <View style={{paddingTop: rv(20)}}>
          <LocationComponent title={''} onChange={handlePress} noAutoFocus />
        </View>
      </CustomModalize>
    </View>
  );
};

export default UserBasic;

const useStyles = (colors: any) =>
  StyleSheet.create({
    authContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: rv(8),
    },
    leftIcon: {
      alignItems: 'center',
      marginRight: RF(7),
    },
    icon: {
      width: RF(16),
      height: RF(16),
      tintColor: '#00276D',
    },

    logo: {
      height: rv(96),
      width: rv(100),
      top: rv(16),
      resizeMode: 'contain',
      alignSelf: 'center',
    },
  });
