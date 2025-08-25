import {View, TouchableOpacityProps, TextInput, Pressable} from 'react-native';

import React, {useEffect, useRef, useState} from 'react';
import {clock2, country, UploadIconFirst} from '@assets';
import Text from '../text';
import useStyles from './styles';
import LocationComponent from '../LocationComponent';
import CustomModalize from '../CustomModalize';
import {Modalize} from 'react-native-modalize';
import {
  B2BValidationSchema,
  gethotelCompany,
  globalStyles,
  GOOGLE_PLACES_API_KEY,
  margin,
  rs,
  rv,
} from '@services';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch, useSelector} from 'react-redux';
import AppButton from '../AppButton';
import {useFormik} from 'formik';
import axios from 'axios';
import {BASE_URL} from '@services';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Geocoder from 'react-native-geocoding';
import {setLabSignUpData} from '@redux';
import {getColorCode, RF, SCREEN_WIDTH} from '@theme';
import {useTheme} from '@react-navigation/native';
import PhoneNumber from '../phoneNumber';
import TermsAndCondition from '../TermsAndCondition';
import New_Input from '../NewInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Alert} from '@utils';
import RNDropDown from '../RnDropDown';
import CheckBox from '../CheckBox';

import Date_Picker from '../AA_New_Components/DatePicker';
interface Props extends TouchableOpacityProps {
  setCurrentStep?: any;
  loading?: any;
  setLoading?: any;
  checkBoxState?: any;
  setCheckBoxState?: any;
  countries?: any;
}

const hotelFeatures = [
  {id: 1, title: 'Room Service'},
  {id: 2, title: 'Restaurant'},
  {id: 3, title: 'Internet'},
  {id: 4, title: 'Parking'},
  {id: 5, title: 'Outdoor'},
  {id: 6, title: 'Activities'},
];
const travelAgencyFeatures = [
  {id: 1, title: 'Flight Bookings'},
  {id: 2, title: 'Packages'},
  {id: 3, title: 'Interpreter'},
  {id: 4, title: 'Visa & Passport'},
  {id: 5, title: 'Currency Exchange'},
  {id: 6, title: 'Insurance'},
];

const LabSignupContent = (props: Props) => {
  Geocoder.init(GOOGLE_PLACES_API_KEY);
  const theme: any = useTheme();
  const colors = theme?.colors;
  const styles = useStyles(colors);

  const {placeHolder, endPoints} = getColorCode();

  const {
    setCurrentStep,
    loading,
    setLoading,
    setCheckBoxState,
    checkBoxState,
    countries,
  } = props;
  const modalizeRef = useRef<Modalize>(null);
  const {labSignUpData} = useSelector((state: any) => state?.root?.b2b);

  const [calenderType, setCalenderType] = useState('');

  const [uploading, setUploading] = useState(false);
  const [type, setType] = useState('');
  const [timeModal, setTimeModal] = useState(false);
  const [city, setCity] = useState('');
  const [indicator, setIndicator] = useState(false);

  const dispatch = useDispatch();
  const {changeStack} = useSelector((state: any) => state?.root?.shiftStack);
  const {userFormData} = useSelector((state: any) => state?.root?.user);
  const [extractCountry, setExtractCountry] = useState(
    labSignUpData?.basicInfo?.values?.country,
  );

  const [checkboxValue, setCheckboxValue] = useState(
    labSignUpData?.basicInfo?.values?.selection || '',
  );

  const basicInfo = labSignUpData?.basicInfo?.values;
  const check =
    changeStack == 'Laboratory' ||
    changeStack == 'Pharmacy' ||
    changeStack == 'Hospital'
      ? true
      : false;

  const check2 =
    changeStack === 'Laboratory' || changeStack === 'Pharmacy' ? true : false;

  const check3 = changeStack === 'Pharmaceutical' ? false : true;
  const check4 =
    changeStack === 'Hotels' || changeStack === 'Travel Agency' ? true : false;

  const handleFormik = () => {
    formik.handleSubmit();
  };

  const formik: any = useFormik({
    initialValues: {
      name: basicInfo?.name || '',
      logo: basicInfo?.logo || '',
      ownerFirstName: basicInfo?.ownerFirstName || '',
      ownerLastName: basicInfo?.ownerLastName || '',
      phoneNumber: basicInfo?.phoneNumber || '',
      emergencyNumber: basicInfo?.emergencyNumber || '',
      licenseNumber: basicInfo?.licenseNumber || '',
      phoneWithoutCode: basicInfo?.phoneWithoutCode || '',
      phoneWithoutCode_2: basicInfo?.phoneWithoutCode_2 || '',

      ...(check3 && {
        expiryDate: basicInfo?.expiryDate || '',
        licenseImage: basicInfo?.licenseImage || '',
        ...(check && {openTime: basicInfo?.openTime || ''}),
        ...(check && {closeTime: basicInfo?.closeTime || ''}),
        CNIC: basicInfo?.CNIC || '',
        CNICExpiry: basicInfo?.CNICExpiry || '',
        CNICImage: basicInfo?.CNICImage || '',
        ...(check2 && {
          description: basicInfo?.description || '',
        }),
      }),

      ...(check4 && {
        experience: basicInfo?.experience || '',
        features: basicInfo?.features || [],
        travelCompanyId: basicInfo?.travelCompanyId || '',
        company: basicInfo?.company || '',
        selection: basicInfo?.selection || '',
      }),

      country: basicInfo?.country || '',
      location: {
        lat: basicInfo?.location?.lat || '',
        lng: basicInfo?.location?.lng || '',
        address: basicInfo?.location?.address || '',
        city: basicInfo?.location?.city || '',
      },
    },

    validationSchema: B2BValidationSchema(changeStack),
    onSubmit: (values: any) => {
      if (
        (changeStack === 'Hotels' || changeStack === 'Travel Agency') &&
        checkboxValue === ''
      ) {
        Alert.showError('Please Individual/Attach with Company');
      } else {
        handlePress(values);
      }
    },
  });

  const handleCheckBoxChange = (title: any) => {
    setCheckboxValue(title?.title);
    formik?.setFieldValue('selection', title?.title);
    if (title?.title === 'Individual') {
      console.log('chala........');
      formik?.setFieldValue('travelCompanyId', '');
      formik?.setFieldValue('company', '');
    }
  };

  const handlePress = (values: any) => {
    if (
      checkboxValue !== 'Individual' &&
      formik?.values?.travelCompanyId === ''
    ) {
      Alert.showError('Please Select Company');
    } else {
      if (city || formik?.values?.location?.city) {
        if (checkBoxState) {
          const mergedData = {
            ...labSignUpData,
            ...{basicInfo: {values}},
          };
          dispatch(setLabSignUpData(mergedData));
          setCurrentStep(2);
        } else {
          Alert.showError('Please agree terms and condition');
        }
      } else {
        Alert.showError('Please select complete address');
      }
    }
  };

  const handleDate = (type: any, selectedDate: any) => {
    formik?.setFieldValue(type, selectedDate);
  };

  const onChange = async (data: any) => {
    modalizeRef?.current?.close();
    let vals = data?.description.split(',');
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
      .finally(() => {});
  };

  const uploadImage = async (type?: any) => {
    if (uploading) {
      Alert.showError('Please wait your file is uploading');
    } else {
      try {
        const result = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });

        setType(type);
        setUploading(true);
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
            formik?.setFieldValue(type, response?.data?.fileUrl);
          })
          .catch(error => {})
          .finally(() => {
            setUploading(false);
          });
      } catch (error) {
        if (DocumentPicker.isCancel(error)) {
        } else {
          // Handle other errors
          console.error('DocumentPicker Error:', error);
        }
      }
    }
  };

  /............................Handle Time Funtion ................../;

  const onPressClock = (type: any) => {
    setTimeModal(true);
    setCalenderType(type);
  };

  const onConfirmTime = async (time: any) => {
    setTimeModal(false);
    const selectedTime = moment(time);
    const formattedTime = selectedTime.format('hh:mm A');
    formik?.setFieldValue(calenderType, formattedTime);
  };

  const hideTimeModal = () => {
    setTimeModal(false);
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

  function renderDatePicker() {
    return (
      <>
        {/* <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                margin: 20,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                padding: 35,
                width: '100%',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <DatePicker
                mode={'calendar'}
                selected={
                  calenderType === 'expiryDate' ? startedDate : licenseExpiry
                }
                onSelectedChange={(date: any) => onSelectDate(date)}
                options={{
                  // backgroundColor: colors.primary,
                  textHeaderColor: colors.primary,
                  textDefaultColor: colors.primary,
                  selectedTextColor: '#FFF',
                  mainColor: colors.primary,
                  textSecondaryColor: colors.primary,
                  borderColor: 'rgba(122,146,165,0.1)',
                }}
              />
              <TouchableOpacity onPress={closeModal}>
                <Text SFmedium color={colors.primary} size={16}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
        <DateTimePickerModal
          isVisible={timeModal}
          mode="time"
          onConfirm={onConfirmTime}
          onCancel={hideTimeModal}
        />
      </>
    );
  }

  let checkLength = formik?.phoneWithoutCode?.length;
  let checkLength_2 = formik?.emergencyNumber?.length;
  const [open, setOpen] = useState<any>(false);
  const [open2, setOpen2] = useState<any>(false);
  const [open3, setOpen3] = useState<any>(false);

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    gethotelCompany()
      .then((res: any) => {
        // console.log(res?.data?.data, '..data');
        setData(res?.data?.data);
      })
      .catch((err: any) => {
        console.log(err, '...eror');
      })
      .finally(() => {});
  };

  const handleDrop2 = (item: any, type: any) => {
    setOpen(false);
    formik.setFieldValue(type, item);
  };

  const handleDrop3 = (title: any) => {
    const features = formik.values.features.includes(title)
      ? formik.values.features.filter((feature: any) => feature !== title)
      : [...formik.values.features, title];

    formik.setFieldValue('features', features);
  };

  const handleDrop4 = (id: any, name: any) => {
    setOpen3(false);
    formik?.setFieldValue('travelCompanyId', id);
    formik?.setFieldValue('company', name);
  };

  const onOpen = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const onOpen2 = () => {
    if (!open2) {
      setOpen2(true);
    } else {
      setOpen2(false);
    }
  };

  const onOpen3 = () => {
    if (!open3) {
      setOpen3(true);
    } else {
      setOpen3(false);
    }
  };

  const featureData =
    changeStack === 'Travel Agency' ? travelAgencyFeatures : hotelFeatures;

  return (
    <KeyboardAwareScrollView
      nestedScrollEnabled={false}
      contentContainerStyle={{paddingBottom: rv(70)}}
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets
      keyboardShouldPersistTaps="handled"
      extraHeight={25}
      enableOnAndroid={true}>
      <View>
        {renderDatePicker()}
        <New_Input
          placeholder={placeHolder?.name}
          formik={formik?.touched?.name}
          errors={formik?.errors?.name}
          extraStyle={margin.top_16}
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
        />

        <New_Input
          editable={false}
          placeholder={'Email'}
          extraStyle={margin.top_8}
          value={userFormData?.email}
          onChangeText={formik.handleChange('email')}
        />

        <PhoneNumber
          type={'box'}
          phValue={formik.values.phoneWithoutCode}
          onChangeText={(text: any) => {
            formik.setFieldValue('phoneWithoutCode', text);
          }}
          onChangeFormattedText={formik.handleChange('phoneNumber')}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            {formik?.errors?.phoneNumber}
          </Text>
        )}

        <PhoneNumber
          type={'box'}
          phValue={formik.values.phoneWithoutCode_2}
          onChangeText={(text: any) => {
            formik.setFieldValue('phoneWithoutCode_2', text);
          }}
          onChangeFormattedText={formik.handleChange('emergencyNumber')}
        />
        {formik.touched.emergencyNumber && formik.errors.emergencyNumber ? (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            {formik?.errors?.emergencyNumber}
          </Text>
        ) : checkLength_2 == 0 ? null : checkLength_2 < 9 ||
          formik?.errors?.emergencyNumber == '' ? (
          <Text style={{color: 'red', marginTop: RF(4)}}>
            Incomplete phone number
          </Text>
        ) : null}

        <Pressable onPress={() => uploadImage('logo')}>
          <New_Input
            editable={false}
            extraStyle={margin.top_8}
            maxLength={30}
            placeholder={placeHolder?.logo}
            formik={formik?.touched?.logo}
            errors={formik?.errors?.logo}
            value={formik.values.logo}
            endIcon={UploadIconFirst}
            loading={type == 'logo' && uploading}
          />
        </Pressable>

        <New_Input
          placeholder={'Owner First Name'}
          extraStyle={margin.top_8}
          onChangeText={formik?.handleChange('ownerFirstName')}
          formik={formik?.touched?.ownerFirstName}
          errors={formik?.errors?.ownerFirstName}
          value={formik.values.ownerFirstName}
        />

        <New_Input
          placeholder={'Owner Last Name'}
          extraStyle={margin.top_8}
          onChangeText={formik?.handleChange('ownerLastName')}
          formik={formik?.touched?.ownerLastName}
          errors={formik?.errors?.ownerLastName}
          value={formik.values.ownerLastName}
        />

        <View
          style={{
            borderRadius: 8,
            overflow: 'hidden',
            marginTop: rv(8),
            backgroundColor: theme?.colors?.inputBack,
          }}>
          <LocationComponent
            setIndicator={setIndicator}
            cross={!indicator}
            loading={indicator}
            placeHolderColor={'rgba(169, 169, 172, 1)'}
            textInputContainer={{
              height: 55,
              borderRadius: 0,
              backgroundColor: 'transparent',
            }}
            title={formik.values.location?.address}
            placeHolder={placeHolder?.address}
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
          dropIconStyle={{transform: [{rotate: open ? '180deg' : '0deg'}]}}
          onOpen={onOpen}
          open={open}
          box={'box'}
          iconSource_1={country}
          dropDownData={
            changeStack === 'Pharmacy' ||
            changeStack === 'Pharmaceutical' ||
            changeStack === 'Insurance' ||
            changeStack === 'Donation' ||
            changeStack === 'Rent A car' ||
            changeStack === 'Ambulance' ||
            changeStack === 'Laboratory'
              ? ['Pakistan']
              : countries
          }
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

        {check4 && (
          <>
            <New_Input
              placeholder={'Experience'}
              keyboardType="numeric"
              extraStyle={margin.top_8}
              formik={formik?.touched?.experience}
              errors={formik?.errors?.experience}
              value={formik.values.experience}
              onChangeText={formik.handleChange('experience')}
            />
            <RNDropDown
              title={formik?.values?.features?.join(', ') || 'Features'}
              dropIconStyle={{transform: [{rotate: open2 ? '180deg' : '0deg'}]}}
              onOpen={onOpen2}
              open={open2}
              box={'box'}
              dropDownData={featureData}
              titleStyle={{
                color:
                  formik?.values?.features?.length > 0
                    ? colors.primary
                    : 'rgba(169, 169, 172, 1)',
                width: '95%',
              }}
              lines={1}
              renderDropDownData={(item: any) => (
                <Pressable onPress={() => handleDrop3(item?.title)}>
                  <Text
                    style={{marginTop: RF(16)}}
                    color={colors.primary}
                    SFregular>
                    {item?.title}
                  </Text>
                </Pressable>
              )}
            />
            {formik.touched.features && formik.errors.features && (
              <Text style={{color: 'red', marginTop: RF(4)}}>
                {formik.errors?.features}
              </Text>
            )}
          </>
        )}

        {check3 && (
          <>
            <New_Input
              placeholder={placeHolder?.licenseNo}
              extraStyle={margin.top_8}
              formik={formik?.touched?.licenseNumber}
              errors={formik?.errors?.licenseNumber}
              value={formik.values.licenseNumber}
              onChangeText={formik.handleChange('licenseNumber')}
            />

            <Pressable onPress={() => uploadImage('licenseImage')}>
              <New_Input
                maxLength={30}
                editable={false}
                placeholder={
                  placeHolder?.licenseImage
                    ? placeHolder?.licenseImage
                    : 'License Image'
                }
                extraStyle={margin.top_8}
                formik={formik?.touched?.licenseImage}
                errors={formik?.errors?.licenseImage}
                value={formik?.values.licenseImage}
                endIcon={UploadIconFirst}
                loading={type == 'licenseImage' && uploading}
              />
            </Pressable>

            <Date_Picker
              color={
                formik.values.expiryDate
                  ? colors.text
                  : 'rgba(125, 125, 125, 1)'
              }
              placeHolder={
                formik.values.expiryDate
                  ? formik.values.expiryDate
                  : 'Select license expiry date'
              }
              value={formik.values.expiryDate}
              onChange={(date: any) => handleDate('expiryDate', date)}
            />

            <New_Input
              autoFocus={false}
              extraStyle={margin.top_8}
              placeholder={'CNIC / Passport Number'}
              value={formik?.values?.CNIC}
              formik={formik?.touched?.CNIC}
              onChangeText={handleChangeText}
              maxLength={15}
              keyboardType="numeric"
            />

            <Pressable onPress={() => uploadImage('CNICImage')}>
              <New_Input
                editable={false}
                extraStyle={margin.top_8}
                endIcon={UploadIconFirst}
                //  loading={type == 'CNICImage' && uploading}
                placeholder={'CNIC / Passport Image'}
                formik={formik?.touched?.CNICImage}
                // errors={formik?.errors?.CNICImage}
                value={formik?.values?.CNICImage}
                maxLength={25}
              />
            </Pressable>

            <Date_Picker
              color={
                formik.values.CNICExpiry
                  ? colors.text
                  : 'rgba(125, 125, 125, 1)'
              }
              placeHolder={
                formik.values.CNICExpiry
                  ? formik.values.CNICExpiry
                  : 'CNIC / Passport Expiry'
              }
              value={formik.values.CNICExpiry}
              onChange={(date: any) => handleDate('CNICExpiry', date)}
            />
          </>
        )}

        {check && (
          <>
            <Pressable onPress={() => onPressClock('openTime')}>
              <New_Input
                editable={false}
                value={formik.values.openTime}
                extraStyle={margin.top_8}
                placeholder={placeHolder?.openTime}
                endIcon={clock2}
                formik={formik?.touched?.openTime}
                errors={formik?.errors?.openTime}
              />
            </Pressable>

            <Pressable onPress={() => onPressClock('closeTime')}>
              <New_Input
                editable={false}
                value={formik.values.closeTime}
                extraStyle={margin.top_8}
                placeholder={placeHolder?.closeTime}
                endIcon={clock2}
                formik={formik?.touched?.closeTime}
                errors={formik?.errors?.closeTime}
              />
            </Pressable>
          </>
        )}

        {check2 && (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder={placeHolder?.description}
                placeholderTextColor="#6c757d"
                value={formik.values.description}
                onChangeText={formik.handleChange('description')}
                multiline={true}
                scrollEnabled={true}
                textAlignVertical="top"
              />
            </View>
            {formik?.touched?.description && formik?.errors?.description && (
              <Text style={globalStyles.errors}>
                {formik?.errors?.description}
              </Text>
            )}
          </>
        )}

        {check4 && (
          <>
            <RNDropDown
              disabled={checkboxValue !== 'Individual' ? false : true}
              mainContainerStyle={{
                backgroundColor:
                  checkboxValue !== 'Individual'
                    ? '#EDF1F3'
                    : 'rgba(169, 169, 172, 0.1)',
                borderColor:
                  checkboxValue !== 'Individual' &&
                  formik?.values?.travelCompanyId === ''
                    ? 'red'
                    : '#EDF1F3',
                borderWidth:
                  checkboxValue !== 'Individual' &&
                  formik?.values?.travelCompanyId === ''
                    ? 1
                    : 0,
              }}
              title={formik?.values?.company || 'Select Company'}
              dropIconStyle={{transform: [{rotate: open3 ? '180deg' : '0deg'}]}}
              flatListStyle={{
                height: rv(300),
                marginTop: rv(8),
              }}
              onOpen={onOpen3}
              open={open3}
              box={'box'}
              dropDownData={data}
              titleStyle={{
                color: formik?.values?.travelCompanyId
                  ? colors.primary
                  : 'rgba(169, 169, 172, 1)',
                width: '95%',
              }}
              lines={1}
              renderDropDownData={(item: any) => (
                <Pressable
                  style={{
                    marginTop: rv(8),
                    paddingVertical: rv(8),
                    paddingLeft: rs(8),
                    backgroundColor:
                      formik?.values?.travelCompanyId === item?._id
                        ? colors?.primary
                        : 'transparent',
                  }}
                  onPress={() =>
                    handleDrop4(item?._id, item?.accountHolderName)
                  }>
                  <Text
                    color={
                      formik?.values?.travelCompanyId === item?._id
                        ? '#fff'
                        : colors?.primary
                    }
                    SFregular>
                    {item?.accountHolderName}
                  </Text>
                </Pressable>
              )}
            />
            {checkboxValue === 'Attach with Company' && (
              <Text color={'red'} style={{marginVertical: rv(8)}}>
                All MediTour payments will be processed through this company.
                Are you sure you want to continue?
              </Text>
            )}

            {['Individual', 'Attach with Company']?.map(
              (item: any, index: any) => (
                <View
                  key={index}
                  style={{
                    marginBottom: rv(12),
                    marginTop:
                      (index === 0 && checkboxValue === 'Individual') ||
                      (index === 0 && checkboxValue === '')
                        ? rv(16)
                        : 0,
                  }}>
                  <CheckBox
                    title={item}
                    width={'50%'}
                    onPress={handleCheckBoxChange}
                    selected={checkboxValue}
                    textStyle={{fontSize: 14}}
                    colorMid={colors?.primary}
                  />
                </View>
              ),
            )}
          </>
        )}

        <TermsAndCondition
          checkBoxState={checkBoxState}
          setCheckBoxState={setCheckBoxState}
        />

        {/* <Dropdown /> */}
        <CustomModalize ref={modalizeRef} height={700}>
          <LocationComponent title={''} onChange={onChange} noAutoFocus />
        </CustomModalize>
        <AppButton
          title="NEXT"
          iconTrue={true}
          loading={loading}
          disabled={loading}
          lodingColor={colors?.white}
          m_Top={56}
          onPress={handleFormik}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
export default LabSignupContent;
