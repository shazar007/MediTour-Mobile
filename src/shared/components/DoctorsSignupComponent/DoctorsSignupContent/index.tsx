import {
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  country,
  crossmap,
  dropIcon,
  gender,
  LabCalender,
  UploadIconFirst,
} from '@assets';
import Text from '../../text';
import LocationComponent from '../../LocationComponent';
import CustomModalize from '../../CustomModalize';
import {Modalize} from 'react-native-modalize';
import {
  checkData,
  checkData2,
  DoctorSignupValidationSchema,
  getAllSpeciality,
  GOOGLE_PLACES_API_KEY,
  margin,
  rs,
  rv,
  showToast,
} from '@services';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch, useSelector} from 'react-redux';
import AppButton from '../../AppButton';
import {useFormik} from 'formik';
import axios from 'axios';
import {BASE_URL} from '@services';
import Geocoder from 'react-native-geocoding';
import {setLabSignUpData, setSpecialities} from '@redux';
import {getColorCode, RF} from '@theme';
import {useTheme} from '@react-navigation/native';

import {
  CheckBox,
  AppTextInput,
  PhoneNumber,
  TermsAndCondition,
  New_Input,
  RNDropDown,
  Date_Picker,
} from '@components';
import useStyles from './styles';
import debounce from 'lodash.debounce';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {customOptions} from '../../constants/constants';
import {Alert} from '@utils';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
interface Props {
  setCurrentStep?: any;
  setLoading?: any;
  speciality?: any;
  setSpecialityTitle?: (text: any) => void;
  specialityTitle?: any;
  setLogo?: any;
  logo?: any;
  setSearch?: any;
  handleSearch?: any;
  indicatorLoader?: any;
  onEndReached?: any;
  onSubmitEditing?: any;
  setAdd?: any;
  add?: any;
  loading?: any;
  add_Specialities?: any;
  checkBoxState?: any;
  setCheckBoxState?: any;
  countries?: any;
}

const DoctorsSignupContent = (props: Props) => {
  const {
    setCurrentStep,
    setLoading,
    setSpecialityTitle,
    specialityTitle,
    setLogo,
    setCheckBoxState,
    add,
    setAdd,
    loading,
    add_Specialities,
    checkBoxState,
    countries,
  } = props;
  Geocoder.init(GOOGLE_PLACES_API_KEY);
  const theme: any = useTheme();
  const colors = theme?.colors;
  const styles = useStyles(colors);
  const {labSignUpData, specialities} = useSelector(
    (state: any) => state?.root?.b2b,
  );
  const [selected, setSelected] = useState(
    labSignUpData?.basicInfo?.values?.doctorType === 'generalPhysician'
      ? 'General Physician'
      : 'Consultant',
  );
  const [extractCountry, setExtractCountry] = useState(
    labSignUpData?.basicInfo?.values?.country,
  );
  const [selectedSpecialities, setSelectedSpecialities] =
    useState<string[]>(specialities);
  const {endPoints} = getColorCode();
  const modalizeRef = useRef<Modalize>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [licenseExpiry, setLicenseExpiry] = useState(
    labSignUpData?.basicInfo?.values?.CNICExpiry || new Date(),
  );
  const [pmdcExpiryy, setPmdcExpiry] = useState(
    labSignUpData?.basicInfo?.values?.pmdcExpiry || new Date(),
  );
  const [calenderType, setCalenderType] = useState('');
  const [indicator, setIndicator] = useState(false);
  const [locationIndicator, setLocationIndicator] = useState(false);

  const [type, setType] = useState('');
  const [city, setCity] = useState('Lahore');

  const [modalType, setModalType] = useState('');

  const dispatch = useDispatch();
  const {userFormData} = useSelector((state: any) => state.root.user);
  const {changeStack} = useSelector((state: any) => state?.root?.shiftStack);

  useEffect(() => {
    console.log('chala.....');
    const check = selectedSpecialities?.map(
      (speciality: any) => speciality?.specialityTitle,
    );
    formik?.setFieldValue('speciality', check);
  }, [selectedSpecialities]);

  const formik: any = useFormik({
    initialValues: {
      name: labSignUpData?.basicInfo?.values?.name || '',
      CNIC: labSignUpData?.basicInfo?.values?.CNIC || '',
      CNICExpiry: labSignUpData?.basicInfo?.values?.CNICExpiry || '',
      CNICImage: labSignUpData?.basicInfo?.values?.CNICImage || '',
      qualifications: labSignUpData?.basicInfo?.values?.qualifications || '',
      speciality: labSignUpData?.basicInfo?.values?.speciality || [''],
      clinicName: labSignUpData?.basicInfo?.values?.clinicName || '',
      phoneWithoutCode:
        labSignUpData?.basicInfo?.values?.phoneWithoutCode || '',

      clinicExperience:
        labSignUpData?.basicInfo?.values?.clinicExperience || '',
      pmdcNumber: labSignUpData?.basicInfo?.values?.pmdcNumber || '',
      pmdcImage: labSignUpData?.basicInfo?.values?.pmdcImage || '',
      pmdcExpiry: labSignUpData?.basicInfo?.values?.pmdcExpiry || '',
      doctorType: labSignUpData?.basicInfo?.values?.doctorType || 'consultant',
      gender: labSignUpData?.basicInfo?.values?.gender || '',
      phoneNumber: labSignUpData?.basicInfo?.values?.phoneNumber || '',
      location: {
        lat: labSignUpData?.basicInfo?.values?.location?.lat || '',
        lng: labSignUpData?.basicInfo?.values?.location?.lng || '',
        address: labSignUpData?.basicInfo?.values?.location?.address || '',
        city: labSignUpData?.basicInfo?.values?.location?.city || '',
      },
      country: labSignUpData?.basicInfo?.values?.country || '',
    },
    validationSchema: DoctorSignupValidationSchema(changeStack),
    onSubmit: (values: any) => {
      handlePress(values);
    },
  });

  const handleFormik = () => {
    formik.handleSubmit();
  };

  const handlePress = (values: any) => {
    if (city || formik?.values?.location?.city) {
      if (checkBoxState) {
        const mergedData = {
          ...labSignUpData,
          ...{basicInfo: {values, type: selected}},
        };
        setLoading(true);
        setTimeout(() => {
          dispatch(setLabSignUpData(mergedData));
          dispatch(setSpecialities(selectedSpecialities));
        }, 500);
        setTimeout(() => {
          setCurrentStep(2);
          setLoading(false);
        }, 1000);
      } else {
        Alert?.showError('Please agree terms and condition');
      }
    } else {
      Alert?.showError('Please select complete address');
    }
  };

  const hadleValue: any =
    calenderType === 'CNICExpiry'
      ? licenseExpiry
      : calenderType === 'pmdcExpiry'
      ? pmdcExpiryy
      : new Date();

  const handleDate = (type: any, selectedDate: any) => {
    formik?.setFieldValue(type, selectedDate);
  };

  // const handleDate = (event: any, selectedDate: any) => {
  //   setModalVisible(false);
  //   const currentDate = selectedDate || '';
  //   // const formattedDate = currentDate.toLocaleDateString('en-GB');
  //   if (event.type === 'set') {
  //     formik?.setFieldValue(calenderType, currentDate);
  //     if (calenderType == 'CNICExpiry') {
  //       setLicenseExpiry(selectedDate);
  //     } else if (calenderType == 'pmdcExpiry') {
  //       setPmdcExpiry(selectedDate);
  //     }
  //   } else {
  //     DateTimePickerAndroid.dismiss;
  //   }
  // };

  const onPressCalender = (type: any) => {
    setModalVisible(true);
    setCalenderType(type);
  };

  const onChange = async (data: any) => {
    modalizeRef?.current?.close();
    setLocationIndicator(true);
    let vals = data?.description.split(/[,|-]/).map((val: any) => val.trim());
    let city = vals[vals?.length - 2];
    setCity(city);
    formik?.setFieldValue('location.city', city);
    formik?.setFieldValue('location.address', data?.description);
    let country = vals[vals?.length - 1]?.trim();
    setExtractCountry(country);

    await Geocoder.from(data?.description)
      .then(json => {
        var locat = json.results[0]?.geometry?.location;
        formik?.setFieldValue('location.lat', locat?.lat);
        formik?.setFieldValue('location.lng', locat?.lng);
      })
      .catch(error => console.warn(error))
      .finally(() => {
        setLocationIndicator(false);
      });
  };

  const openModal = (type: any) => {
    setModalType(type);
    modalizeRef?.current?.open();
  };

  const uploadImage = async (type?: any) => {
    if (indicator) {
      ToastAndroid.showWithGravityAndOffset(
        'Please wait your file is uploading',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50,
      );
    } else {
      try {
        const result = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });

        setType(type);
        setIndicator(true);
        let imageUrl = result[0]?.uri;
        let name = imageUrl.split('/').pop();

        const headers = {
          'Content-Type': 'multipart/form-data',
        };

        const formData = new FormData();
        formData.append('file', {
          uri: imageUrl,
          type: 'image/jpeg',
          name: name,
        });

        axios
          .post(BASE_URL + endPoints, formData, {
            headers: headers,
          })
          .then(response => {
            if (type == 'specialityLogo') {
              setLogo(response?.data?.fileUrl);
            } else {
              formik?.setFieldValue(type, response?.data?.fileUrl);
            }
          })
          .catch(error => {
            if (error?.response?.data?.message == undefined) {
              showToast('error', 'Server error', false);
            }
          })
          .finally(() => {
            setIndicator(false);
          });
        // Process the selected file(s) here
      } catch (error) {
        // Handle the case where the user canceled the picker
        if (DocumentPicker.isCancel(error)) {
          // showToast('error', 'User canceled document picker', false);
        } else {
          // Handle other errors
          console.error('DocumentPicker Error:', error);
        }
      }
    }
  };

  const handleLabExpiryDate = () => {
    formik.setFieldValue(calenderType, licenseExpiry);
  };

  const dropItemSelect = (item: any) => {
    setSelectedSpecialities((prev: any[]) => {
      const isAlreadySelected = prev.some(
        i => i.specialityTitle === item?.specialityTitle,
      );

      if (isAlreadySelected) {
        return prev.filter(i => i.specialityTitle !== item?.specialityTitle);
      } else {
        return [...prev, {specialityTitle: item?.specialityTitle}];
      }
    });
  };

  const onPressCheck = async (title: any) => {
    let formText =
      title?.title === 'General Physician'
        ? 'generalPhysician'
        : title?.title?.toLowerCase();
    setSelected(title?.title);
    formik?.setFieldValue('doctorType', formText);
  };

  const formatText = (text: any) => {
    // Remove non-digit characters
    let cleaned = text.replace(/\D/g, '');

    // Add dashes at appropriate positions
    if (cleaned.length > 5)
      cleaned = cleaned.substring(0, 5) + '-' + cleaned.substring(5);
    if (cleaned.length > 13)
      cleaned = cleaned.substring(0, 13) + '-' + cleaned.substring(13, 14);

    return cleaned;
  };

  const handleChangeText = (text: any) => {
    const formatted = formatText(text);
    formik?.setFieldValue('CNIC', formatted);
  };

  const handleDrop2 = (item: any, type: any) => {
    if (type !== 'country') {
      setSelectDrop(item);
    }
    formik.setFieldValue(type, item);
    setOpen(false);
  };
  const onCloseModal = () => [modalizeRef?.current?.close()];

  const [selectDrop, setSelectDrop] = useState('');
  const [open, setOpen] = useState<any>(false);

  const onOpen = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  let checkLength = formik?.phoneWithoutCode?.length;
  const countryMapping: any = {
    'United Arab Emirates': 'UAE',
    'United States of America': 'USA',
    America: 'USA',
    'United States': 'USA',
    'United Kingdom': 'UK',
    'Great Britain': 'UK',
    Turkey: 'Türkiye',
    PK: 'Pakistan',
  };

  const normalizeCountryName = (country: any) => {
    return countryMapping[country] || country;
  };

  const isCountryIncluded = () => {
    const normalizedFormikCountry = normalizeCountryName(
      formik?.values?.country,
    );

    const normalizedExtractCountry = normalizeCountryName(extractCountry);

    return (
      normalizedFormikCountry === normalizedExtractCountry ||
      formik?.values?.country === normalizedExtractCountry ||
      normalizedFormikCountry === extractCountry
    );
  };

  const result = isCountryIncluded();

  return (
    <KeyboardAwareScrollView
      nestedScrollEnabled={false}
      contentContainerStyle={{paddingBottom: rv(50)}}
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets
      keyboardShouldPersistTaps="handled"
      extraHeight={25}
      enableOnAndroid={true}>
      <View>
        {changeStack !== 'Paramedic staff' && (
          <FlatList
            scrollEnabled={false}
            horizontal
            contentContainerStyle={{
              paddingVertical: 8,
              width: '100%',
            }}
            data={changeStack == 'Doctors' ? checkData : checkData2}
            renderItem={({item}) => (
              <CheckBox
                width={rs(130)}
                colorMid={colors?.primary}
                active
                title={item?.title}
                selected={selected}
                textStyle={{fontSize: 14}}
                onPress={onPressCheck}
              />
            )}
          />
        )}

        <New_Input
          placeholder={'Name'}
          formik={formik?.touched?.name}
          errors={formik?.errors?.name}
          extraStyle={margin.top_8}
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
        />
        <New_Input
          editable={false}
          placeholder={'Email'}
          extraStyle={margin.top_8}
          value={userFormData?.email}
        />

        <PhoneNumber
          type={'box'}
          phValue={formik.values.phoneWithoutCode}
          onChangeText={(text: any) => {
            formik.setFieldValue('phoneWithoutCode', text);
          }}
          onChangeFormattedText={formik.handleChange('phoneNumber')}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            {formik?.errors?.phoneNumber}
          </Text>
        ) : checkLength == 0 ? null : checkLength < 9 ||
          formik?.errors?.phone == '' ? (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            Incomplete phone number
          </Text>
        ) : null}

        {changeStack !== 'Paramedic staff' && (
          <>
            <RNDropDown
              title={selectDrop ? selectDrop : 'Gender'}
              onOpen={onOpen}
              open={open}
              box={'box'}
              iconSource_1={gender}
              dropDownData={customOptions}
              titleStyle={{color: colors.primary}}
              renderDropDownData={(item: any) => (
                <Pressable onPress={() => handleDrop2(item?.title, 'gender')}>
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
          </>
        )}

        <New_Input
          placeholder={'CNIC / Passport Number'}
          formik={formik?.touched?.CNIC}
          errors={formik?.errors?.CNIC}
          extraStyle={margin.top_8}
          value={formik.values.CNIC}
          onChangeText={handleChangeText}
          optionalText
          keyboardType="numeric"
          maxLength={15}
        />

        <Date_Picker
          color={
            formik?.values?.CNICExpiry ? colors.text : 'rgba(125, 125, 125, 1)'
          }
          placeHolder={
            formik?.values?.CNICExpiry
              ? formik?.values?.CNICExpiry
              : 'CNIC / Passport Expiry'
          }
          value={formik?.values?.CNICExpiry}
          onChange={(date: any) => handleDate('CNICExpiry', date)}
        />

        <Pressable onPress={() => uploadImage('CNICImage')}>
          <New_Input
            editable={false}
            maxLength={30}
            endIcon={UploadIconFirst}
            extraStyle={margin.top_8}
            placeholder={'CNIC / Passport Image'}
            formik={formik?.touched?.CNICImage}
            value={formik?.values?.CNICImage}
            onChangeText={handleLabExpiryDate}
            loading={type == 'CNICImage' && indicator}
          />
        </Pressable>

        <New_Input
          extraStyle={margin.top_8}
          placeholder={'Quallification'}
          formik={formik?.touched?.qualifications}
          errors={formik?.errors?.qualifications}
          value={formik?.values?.qualifications}
          onChangeText={formik.handleChange('qualifications')}
        />

        {changeStack !== 'Paramedic staff' && (
          <>
            <Pressable onPress={() => openModal('speciality')}>
              <New_Input
                maxLength={30}
                numberOfLines={1}
                editable={false}
                extraStyle={margin.top_8}
                endIcon={dropIcon}
                placeholder={'Speciality'}
                formik={formik?.touched?.speciality}
                errors={formik?.errors?.speciality}
                value={formik?.values?.speciality.join(',')}
                onChangeText={() =>
                  formik?.setFieldValue('speciality', selectedSpecialities)
                }
              />
            </Pressable>

            <New_Input
              extraStyle={margin.top_8}
              keyboardType={'numeric'}
              placeholder={'Experience in Years'}
              formik={formik?.touched?.clinicExperience}
              value={formik?.values?.clinicExperience}
              errors={formik?.errors?.clinicExperience}
              onChangeText={formik.handleChange('clinicExperience')}
            />
          </>
        )}

        <View
          style={{
            borderRadius: 8,
            overflow: 'hidden',
            marginTop: rv(8),
            backgroundColor: theme?.colors?.inputBack,
          }}>
          <LocationComponent
            setIndicator={setLocationIndicator}
            cross={!locationIndicator}
            loading={locationIndicator}
            placeHolderColor={'rgba(169, 169, 172, 1)'}
            textInputContainer={{
              height: 55,
              borderRadius: 0,
              backgroundColor: 'transparent',
            }}
            title={formik.values.location?.address}
            placeHolder={'Residential Address'}
            onChange={onChange}
            noAutoFocus
          />
        </View>
        {formik.touched.location?.address &&
          formik.errors.location?.address && (
            <Text style={{color: 'red', marginTop: RF(4)}}>
              {formik.errors.location?.address}
            </Text>
          )}

        <RNDropDown
          title={formik?.values?.country || 'Country'}
          onOpen={onOpen}
          open={open}
          box={'box'}
          iconSource_1={country}
          dropDownData={countries}
          titleStyle={{color: colors.primary}}
          renderDropDownData={(item: any) => (
            <Pressable onPress={() => handleDrop2(item, 'country')}>
              <Text
                style={{marginTop: RF(16)}}
                color={colors.primary}
                SFregular>
                {item}
              </Text>
            </Pressable>
          )}
        />
        {formik.touched.country && formik.errors.country && (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            {formik.errors.country}
          </Text>
        )}

        {changeStack !== 'Paramedic staff' && (
          <>
            <New_Input
              extraStyle={margin.top_8}
              placeholder={'PMDC Number'}
              onChangeText={formik.handleChange('pmdcNumber')}
              value={formik.values.pmdcNumber}
              formik={formik?.touched?.pmdcNumber}
              errors={formik?.errors?.pmdcNumber}
            />

            <Pressable onPress={() => uploadImage('pmdcImage')}>
              <New_Input
                extraStyle={margin.top_8}
                maxLength={35}
                editable={false}
                placeholder={'PMDC Image'}
                loading={type == 'pmdcImage' && indicator}
                formik={formik?.touched?.pmdcImage}
                errors={formik?.errors?.pmdcImage}
                value={formik.values.pmdcImage}
                endIcon={UploadIconFirst}
              />
            </Pressable>

            <Date_Picker
              color={
                formik.values.pmdcExpiry
                  ? colors.text
                  : 'rgba(125, 125, 125, 1)'
              }
              placeHolder={
                formik.values.pmdcExpiry
                  ? formik.values.pmdcExpiry
                  : 'PMDC Expiry'
              }
              value={formik.values.pmdcExpiry}
              onChange={(date: any) => handleDate('pmdcExpiry', date)}
            />
          </>
        )}

        <CustomModalize
          ref={modalizeRef}
          height={modalType === 'speciality' ? 750 : 700}>
          {modalType === 'speciality' ? (
            <DropDownContent
              add_Specialities={add_Specialities}
              styles={styles}
              add={add}
              loader={loading}
              selectedSpecialities={selectedSpecialities}
              setSpecialityTitle={setSpecialityTitle}
              specialityTitle={specialityTitle}
              setAdd={setAdd}
              onPress={dropItemSelect}
              onCloseModal={onCloseModal}
              colors={colors}
            />
          ) : (
            <LocationComponent title={''} onChange={onChange} noAutoFocus />
          )}
        </CustomModalize>

        <TermsAndCondition
          checkBoxState={checkBoxState}
          setCheckBoxState={setCheckBoxState}
        />

        <AppButton
          title="NEXT"
          iconTrue={true}
          m_Top={40}
          loading={loading}
          disabled={loading}
          lodingColor={colors?.white}
          onPress={handleFormik}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default DoctorsSignupContent;

const DropDownContent = ({
  //   data,
  add,
  setAdd,
  styles,
  onPress,
  onCloseModal,
  specialityTitle,
  selectedSpecialities,
  add_Specialities,
  setSpecialityTitle,
  loader,
  colors,
}: //   setSearch,
//   onPressAdd,
//   uploadLogo,
//   logo,
//   loading,
//   handleSearch,
//   indicatorLoader,
//   onEndReached,
//   onSubmitEditing,
{
  //   data?: any;
  add?: any;
  setAdd?: any;
  styles?: any;
  onPress: any;
  onCloseModal?: any;
  specialityTitle?: any;
  selectedSpecialities?: any;
  setSpecialityTitle?: any;
  colors?: any;
  //   onPressAdd?: any;
  //   setSearch?: any;
  //   uploadLogo?: any;
  //   logo?: any;
  //   loading?: any;
  //   handleSearch?: any;
  //   indicatorLoader?: any;
  //   onEndReached?: any;
  //   onSubmitEditing?: any;
  loader?: any;
  add_Specialities?: any;
}) => {
  const [search, setSearch] = useState(''); // State to store the search query
  const [speciality, setSpeciality] = useState([]); // State for specialities data
  const [nextPage, setNextPage] = useState(null); // State for pagination
  const [page, setPage] = useState(1); // Pagination state
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [indicatorLoader, setIndicatorLoader] = useState(false); // State for indicator loader

  const toggle_Add = (type: any) => {
    setAdd(!add);
    setSearch('');
    if (type === 'add') {
      setPage(1);
    } else {
      setSpecialityTitle('');
    }
  };

  const handleSearch = debounce((query: any) => {
    setSearch(query);
    fetch_Speciality(query, 1);
  }, 500);

  // Function to fetch specialities
  const fetch_Speciality = (searchQuery: any, pageNumber: any) => {
    let params = {
      search: searchQuery,
      page: pageNumber,
    };
    //

    setLoading(true);
    setIndicatorLoader(true);

    getAllSpeciality(params)
      .then((res: any) => {
        if (res?.data?.nextPage) {
          setNextPage(res?.data?.nextPage);
        }
        if (pageNumber > 1) {
          let newArr = speciality.concat(res?.data?.specialities);
          setSpeciality(newArr);
        } else {
          setSpeciality(res?.data?.specialities);
        }
      })
      .catch((err: any) => {
        showToast('error', err?.response?.data?.message, false);
      })
      .finally(() => {
        setLoading(false);
        setIndicatorLoader(false);
      });
  };

  // Use Effect to trigger initial fetch on mount or page change
  useEffect(() => {
    fetch_Speciality(search, page);
  }, [page]); // Re-fetch when the page changes

  // Handle pagination when the user scrolls to the bottom
  const onEndReached = () => {
    if (nextPage) {
      setPage(nextPage); // Set the next page to fetch more data
    }
  };
  //
  const onSave = () => {
    let item = {
      specialityTitle: specialityTitle,
    };

    if (specialityTitle === '') {
      Alert?.showError('Please enter title');
    } else {
      add_Specialities(() => onPress(item));
    }
  };

  return (
    <View style={{flex: 1}}>
      {add ? (
        <View style={{paddingTop: RF(16)}}>
          {/* Speciality Title Input */}
          {/* <CustomFloatingLabelInput
            m_Top={RF(16)}
            maxLength={35}
            label={'Speciality Title'}
            onChangeText={handleValue}
            value={specialityTitle}
            containerStyle={{
              marginBottom: RF(16),
            }}
          /> */}

          <New_Input
            placeholder={'Speciality Title'}
            extraStyle={margin.top_16}
            maxLength={35}
            onChangeText={setSpecialityTitle}
            value={specialityTitle}
            // style={{
            //   marginBottom: RF(16),
            // }}
          />

          {/* Action Buttons (Cancel & Save) */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: RF(24),
            }}>
            <Pressable
              style={{
                flex: 1,
                height: RF(40),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#e0e0e0',
                borderRadius: RF(8),
              }}
              onPress={() => toggle_Add('cancel')}>
              <Text style={{color: '#333', fontWeight: '500'}}>Cancel</Text>
            </Pressable>

            <Pressable
              style={{
                flex: 1,
                height: RF(40),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors?.primary,
                marginLeft: RF(8),
                borderRadius: RF(8),
              }}
              onPress={onSave}
              disabled={loader || indicatorLoader}>
              {loader ? (
                <ActivityIndicator animating={loader} color="#fff" />
              ) : (
                <Text style={{color: '#fff', fontWeight: '600'}}>Save</Text>
              )}
            </Pressable>
          </View>
        </View>
      ) : (
        <>
          {/* Search Input */}
          <AppTextInput
            zero
            placeholder={'Search'}
            onSubmitEditing={() => handleSearch(search)} // Optional: handle when user submits search (e.g., pressing Enter)
            onChangeText={handleSearch} // Call debounced search function
            containerStyle={{
              marginTop: RF(16),
              marginBottom: RF(12),
              paddingHorizontal: RF(10),
              backgroundColor: '#fff',
              borderRadius: RF(8),
              elevation: 2,
              borderWidth: 0,
              borderBottomWidth: 0,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 6,
            }}
          />

          {/* Add Button */}
          <Pressable
            style={{
              backgroundColor: '#007bff',
              alignItems: 'center',
              height: 50,
              width: 50,
              justifyContent: 'center',
              position: 'absolute',
              bottom: 80,
              zIndex: 1000,
              right: 10,
              borderRadius: RF(100),
            }}
            onPress={() => toggle_Add('add')}>
            <Text size={28} color={'#fff'} style={{bottom: 1}}>
              +
            </Text>
          </Pressable>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FlatList
              numColumns={2}
              style={{marginTop: rv(8)}}
              data={selectedSpecialities}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <Pressable
                    onPress={() => onPress(item)}
                    style={{
                      margin: 5,
                      borderWidth: 0.5,
                      borderColor: 'gray',
                      backgroundColor: 'lightgrey',
                      flexDirection: 'row',
                      borderRadius: 15,
                      paddingLeft: rs(10),
                      overflow: 'hidden',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text size={14}>{item?.specialityTitle}</Text>
                    <Image
                      source={crossmap}
                      style={{
                        height: rv(30),
                        width: rv(30),
                      }}
                    />
                  </Pressable>
                );
              }}
            />
          </ScrollView>

          {/* Speciality List */}
          <FlatList
            style={{
              marginTop: RF(16),
              height: rv(400),
            }}
            contentContainerStyle={{paddingBottom: 50}}
            data={speciality}
            ListEmptyComponent={
              <Text style={{textAlign: 'center', marginTop: RF(20)}}>
                No data Found
              </Text>
            }
            ListFooterComponent={
              <ActivityIndicator
                size={30}
                animating={indicatorLoader}
                style={{marginTop: RF(20)}}
              />
            }
            onEndReached={onEndReached} // Handle pagination on scroll
            nestedScrollEnabled
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}: any) => {
              const isSelected = selectedSpecialities.some(
                (speciality: any) =>
                  speciality.specialityTitle === item?.specialityTitle,
              );
              return (
                <Pressable
                  style={{
                    marginTop: RF(8),
                    height: RF(45),
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd',
                    backgroundColor: isSelected ? colors?.primary : '#fff',
                    paddingHorizontal: RF(12),
                    margin: 1,
                    borderRadius: RF(8),
                    elevation: 2,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.1,
                    shadowRadius: 6,
                  }}
                  onPress={() => onPress(item)}>
                  <Text
                    style={{
                      fontWeight: '500',
                      color: isSelected ? '#fff' : '#000',
                    }}>
                    {item?.specialityTitle}
                  </Text>
                </Pressable>
              );
            }}
          />
          <AppButton
            onPress={onCloseModal}
            title="Done"
            containerStyle={{
              marginTop: rv(16),
              borderRadius: RF(8),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </>
      )}
    </View>
  );
};
