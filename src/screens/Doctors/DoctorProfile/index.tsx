import {
  dropIcon,
  EditButton,
  editIcon,
  LabCalender,
  live,
  uploadIcon,
} from '@assets';
import {
  AppButton,
  CustomHeader,
  CustomLoader,
  Text,
  TimeSelection,
  Wrapper,
} from '@components';
import DocumentPicker from 'react-native-document-picker';
import {useTheme} from '@react-navigation/native';
import {
  BASE_URL,
  ENDPOINTS,
  getSpecialtiesDoctor,
  rs,
  rv,
  updatedProfileDoctor,
} from '@services';
import {getColorCode, RF, SCREEN_WIDTH} from '@theme';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import * as Progress from 'react-native-progress';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {View, TextInput, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setB2B, setIsLoggedIn, setUser} from '@redux';
import {Alert} from '@utils';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const DoctorProfile = () => {
  const {B2B} = useSelector((state: any) => state?.root?.b2b);
  const {user} = useSelector((state: any) => state?.root?.user);

  let info: any = B2B?.doctor;
  const {select_UpdateProfile} = getColorCode();
  const [loading, setLoading] = useState(false);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingQualification, setIsEditingQualification] = useState(false);
  const [specialityEdit, setSpecialityEdit] = useState(false);
  const [CertificatEdit, setCertificatEdit] = useState(false);
  const [bankEdit, setBankEdit] = useState(false);
  const [openCertificated, setopenCertificated] = useState(false);
  const [openBank, setOpenBank] = useState(false);
  const [dataSpeciality, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [indicatorLoader, setIndicatorLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [secoundUpload, setsecoundUpload] = useState(null);
  const [isAccordionOpenPersonalInfo, setIsAccordionOpenPersonalInfo] =
    useState(false);
  const [socialEdit, setSocialEdit] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [isAccordionOpenDescription, setIsAccordionOpenDescription] =
    useState(false);

  const [isAccordionOpenSocialInfo, setIsAccordionOpenSocialInfo] =
    useState(false);
  const dispatch: any = useDispatch();
  const [isAccordionOpenQualification, setIsAccordionOpenQualification] =
    useState(false);
  const [updatedFields, setUpdatedFields] = useState<any>({});
  const [specialityOpen, setSpeciality] = useState(false);

  const handleInputChange = (field: any, value: any) => {
    setFormData({...formData, [field]: value});
    setUpdatedFields({...updatedFields, [field]: value});
  };

  const uploadImage = async (section: any) => {
    try {
      const result: any = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      if (section === 'certificates') {
        setIndicatorLoader(true);
      } else if (section === 'uploadImage') {
        setImageLoading(true);
      } else {
        setLoader(true);
      }

      let imageUrl = result[0]?.uri;
      let name = imageUrl.split('/').pop();

      const headers = {
        'Content-Type': 'multipart/form-data',
      };

      const formData = new FormData();
      formData.append('file', {
        uri: imageUrl,
        type: result[0].type,
        name: name,
      });

      axios
        .post(BASE_URL + ENDPOINTS?.RENT_A_CAR_UPLOAD_FILE, formData, {
          headers: headers,
        })
        .then(response => {
          if (section === 'certificates') {
            setUploadedImageUrl(response?.data?.fileUrl);
          } else if (section === 'uploadImage') {
            updatedProfileDoctor(
              {doctorImage: response?.data?.fileUrl},
              select_UpdateProfile,
            )
              .then((res: any) => {
                dispatch(
                  setUser({
                    ...user,
                    doctorImage: response?.data?.fileUrl,
                  }),
                );
              })
              .catch((err: any) => {})
              .finally(() => {
                setImageLoading(false);
              });
          } else {
            setsecoundUpload(response?.data?.fileUrl);
          }
        })
        .catch(error => {
          if (error?.response?.data?.message == undefined) {
            Alert.showError('Server error');
          }
        })
        .finally(() => {
          setIndicatorLoader(false);
          setLoader(false);
        });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
      } else {
        console.error('DocumentPicker Error:', error);
      }
    }
  };

  const [formData, setFormData] = useState({
    name: info?.name || 'Nil',
    phoneNumber: info?.phoneNumber || 'Nil',
    email: info?.email || 'Nil',
    cnicOrPassportNo: info?.cnicOrPassportNo || 'Nil',
    address: info?.location?.address || 'Nil',
    cnicOrPassportExpiry: info?.cnicOrPassportExpiry || 'Nil',
    location: info?.location?.address || 'Nil',
    qualifications: info?.qualifications || 'Nil',
    speciality: info?.speciality.join('') || 'Nil',
    pmdcNumber: info?.pmdcNumber || 'Nil',
    pmdcImage: info?.pmdcImage || 'Nil',
    pmdcExpiry: info?.pmdcExpiry || 'Nil',
    bankName: info?.bankName || 'Nil',
    incomeTaxNo: info?.incomeTaxNo || 'Nil',
    salesTaxNo: info?.salesTaxNo || 'Nil',
    accountHolderName: info?.accountHolderName || 'Nil',
    accountNumber: info?.accountNumber || 'Nil',
    taxFileImage: info?.taxFileImage || 'Nil',
    facebook: info?.facebook || 'Nil',
    youtube: info?.youtube || 'Nil',
    linkedIn: info?.linkedIn || 'Nil',
    instagram: info?.instagram || 'Nil',
    accountTitle: info?.accountTitle || 'Nil',
    about: info?.about || 'Nil',
  });

  const handleSave = (section: string) => {
    if (section === 'personalInfo' && isEditingPersonalInfo) {
      setLoading(true);
      const data = {...updatedFields};
      updatedProfileDoctor(data, select_UpdateProfile)
        .then((res: any) => {
          dispatch(setB2B(res?.data));
          dispatch(setIsLoggedIn(true));
        })
        .catch((err: any) => {})
        .finally(() => {
          setLoading(false);
          setIsEditingPersonalInfo(false);
          setUpdatedFields({});
        });
    } else if (section === 'qualification' && isEditingQualification) {
      setLoading(true);
      const data = {...updatedFields};
      updatedProfileDoctor(data, select_UpdateProfile)
        .then((res: any) => {
          dispatch(setB2B(res?.data));
          dispatch(setIsLoggedIn(true));
        })
        .catch((err: any) => {})
        .finally(() => {
          setLoading(false);
          setIsEditingQualification(false);
          setUpdatedFields({});
        });
    } else if (section === 'specialties' && specialityEdit) {
      if (formData?.speciality === '') {
        Alert.showError('Please select atleast one speciality');
      } else {
        setLoading(true);
        const data = {
          ...updatedFields,
          speciality: formData.speciality.split(', '),
        };
        updatedProfileDoctor(data, select_UpdateProfile)
          .then((res: any) => {
            dispatch(setB2B(res?.data));
            dispatch(setIsLoggedIn(true));
          })
          .catch((err: any) => {})
          .finally(() => {
            setLoading(false);
            setSpecialityEdit(false);
            setUpdatedFields({});
          });
      }
    } else if (section === 'certificates' && CertificatEdit) {
      setLoading(true);
      const data = {
        ...updatedFields,
        pmdcExpiry: formData.pmdcExpiry,
        pmdcImage: uploadedImageUrl || formData.pmdcImage,
        pmdcNumber: formData.pmdcNumber,
      };
      updatedProfileDoctor(data, select_UpdateProfile)
        .then((res: any) => {
          dispatch(setB2B(res?.data));
          dispatch(setIsLoggedIn(true));
          Alert.showSuccess('Certificates updated successfully');
        })
        .catch((err: any) => {
          Alert.showError('Failed to update certificates');
        })
        .finally(() => {
          setLoading(false);
          setCertificatEdit(false);
          setUpdatedFields({});
        });
    } else if (section === 'bankDetails' && bankEdit) {
      setLoading(true);
      const data = {
        ...updatedFields,
        taxFileImage: secoundUpload || formData.taxFileImage,
      };
      updatedProfileDoctor(data, select_UpdateProfile)
        .then((res: any) => {
          dispatch(setB2B(res?.data));
          dispatch(setIsLoggedIn(true));
          Alert.showSuccess('Bank details updated successfully');
        })
        .catch((err: any) => {
          Alert.showError('Failed to update bankDetails');
        })
        .finally(() => {
          setLoading(false);
          setBankEdit(false);
          setUpdatedFields({});
        });
    } else if (section === 'socialInfo' && socialEdit) {
      setLoading(true);
      const data = {
        ...updatedFields,
        facebook: formData.facebook,
        youtube: formData.youtube,
        linkedIn: formData.linkedIn,
        instagram: formData.instagram,
      };
      updatedProfileDoctor(data, select_UpdateProfile)
        .then((res: any) => {
          dispatch(setB2B(res?.data));
          dispatch(setIsLoggedIn(true));
          Alert.showSuccess('Bank details updated successfully');
        })
        .catch((err: any) => {
          Alert.showError('Failed to update bankDetails');
        })
        .finally(() => {
          setLoading(false);
          setBankEdit(false);
          setUpdatedFields({});
        });
    } else if (section === 'about' && descriptionEdit) {
      setLoading(true);
      const data = {
        ...updatedFields,
        about: formData.about,
      };
      updatedProfileDoctor(data, select_UpdateProfile)
        .then((res: any) => {
          dispatch(setB2B(res?.data));
          dispatch(setIsLoggedIn(true));
          Alert.showSuccess('Bank details updated successfully');
        })
        .catch((err: any) => {
          Alert.showError(err?.response?.data?.message);
        })
        .finally(() => {
          setLoading(false);
          setBankEdit(false);
          setUpdatedFields({});
        });
    } else {
      section === 'personalInfo'
        ? setIsEditingPersonalInfo(true)
        : section === 'qualification'
        ? setIsEditingQualification(true)
        : section === 'certificates'
        ? setCertificatEdit(true)
        : section === 'bankDetails'
        ? setBankEdit(true)
        : section === 'socialInfo'
        ? setSocialEdit(true)
        : section === 'about'
        ? setDescriptionEdit(true)
        : setSpecialityEdit(true);
    }
  };
  useEffect(() => {
    !indicatorLoader && setLoading(true);
    getSpecialties();
  }, [page]);

  const fetchNextPage = () => {
    if (nextPage && page < nextPage) {
      setPage(page + 1);
      setIndicatorLoader(true);
    }
  };

  const getSpecialties = () => {
    getSpecialtiesDoctor(page)
      .then((res: any) => {
        if (res?.data?.nextPage) {
          setNextPage(res?.data?.nextPage);
        }
        if (page > 1) {
          let newArr = dataSpeciality.concat(res?.data?.specialities);
          setData(newArr);
        } else {
          setData(res.data.specialities);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setIndicatorLoader(false);
      });
  };
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    const data = {
      ...updatedFields,
      cnicOrPassportExpiry: moment(currentDate).format('DD-MM-YYYY'),
    };
    const data2 = {
      ...formData,
      cnicOrPassportExpiry: moment(currentDate).format('DD-MM-YYYY'),
    };

    setUpdatedFields(data);
    setFormData(data2);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Edit Profile'}
        leftIcon
        titleColor={'#fff'}
        notify
      />

      <KeyboardAwareScrollView
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
        extraHeight={25}
        enableOnAndroid={true}>
        <View
          style={{
            paddingBottom: RF(80),
            marginHorizontal: RF(20),
            marginTop: RF(24),
          }}>
          {/* Personal Info Accordion */}
          <View style={{justifyContent: 'center'}}>
            <View style={styles.MainContainer}>
              {imageLoading ? (
                <ActivityIndicator animating={true} size={50} />
              ) : (
                <Image
                  source={{
                    uri:
                      user?.doctorImage ||
                      user?.logo ||
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                  }}
                  style={styles.ImageView}
                />
              )}
            </View>
            <TouchableOpacity
              style={styles.ContainerEdit}
              onPress={() => uploadImage('uploadImage')}>
              <Image source={EditButton} style={styles.ImageEdit} />
            </TouchableOpacity>
          </View>
          <View>
            <Progress.Bar
              progress={info?.profilePercentage / 100}
              width={RF(250)}
              color="#288018"
              borderWidth={0}
              unfilledColor="#fff"
            />
            <Text
              SFmedium
              center
              size={12}
              style={{position: 'absolute', right: RF(4), top: -8}}>
              {Math.round(info?.profilePercentage)}%
            </Text>
            <Text
              size={9}
              SFregular
              color={'#FF8A02'}
              style={{marginTop: RF(4)}}>
              Complete Your Profile for better business
            </Text>
          </View>
          <View style={{height: RF(8)}} />
          <Section
            title="Personal Info"
            onPressEdit={() => setIsEditingPersonalInfo(true)}
            isOpen={isAccordionOpenPersonalInfo}
            onPress={() =>
              setIsAccordionOpenPersonalInfo(!isAccordionOpenPersonalInfo)
            }>
            {isAccordionOpenPersonalInfo && (
              <>
                <EditableField
                  label="Name"
                  value={formData.name}
                  colors={colors?.bluE}
                  onChangeText={(text: any) => handleInputChange('name', text)}
                  editable={isEditingPersonalInfo}
                />
                <EditableField
                  label="Phone"
                  value={formData.phoneNumber}
                  onChangeText={(text: any) =>
                    handleInputChange('phoneNumber', text)
                  }
                  editable={false}
                />
                <EditableField
                  label="Email"
                  value={formData.email}
                  onChangeText={(text: any) => handleInputChange('email', text)}
                  editable={false}
                />
                <EditableField
                  label="CNIC"
                  value={formData.cnicOrPassportNo}
                  onChangeText={(text: any) =>
                    handleInputChange('cnicOrPassportNo', text)
                  }
                  editable={isEditingPersonalInfo}
                />
                <Pressable
                  disabled={!isEditingPersonalInfo}
                  onPress={showDatepicker}
                  style={{
                    justifyContent: 'center',
                    zIndex: 1000,
                  }}>
                  <EditableField
                    label="CNIC Expiry"
                    value={formData.cnicOrPassportExpiry}
                    // onChangeText={(text: any) =>
                    //   handleInputChange('cnicOrPassportExpiry', text)
                    // }
                    editable={false}
                  />
                  <Image
                    source={LabCalender}
                    style={{
                      tintColor: colors?.primary,
                      width: RF(16),
                      position: 'absolute',
                      right: 0,
                      alignSelf: 'center',
                      height: RF(16),
                      resizeMode: 'contain',
                    }}
                  />
                </Pressable>

                <Text size={16} SFmedium color={colors}>
                  Address
                </Text>
                <View style={styles.viewStyle}>
                  <TextInput
                    placeholder={formData?.location}
                    placeholderTextColor={'#ccc'}
                    editable={false}
                    style={{width: '90%'}}
                  />
                  <Image
                    source={live}
                    style={{
                      width: RF(16),
                      height: RF(16),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <AppButton
                  title={'Save'}
                  bgClr={'#0B7328'}
                  onPress={() => handleSave('personalInfo')}
                  width={RF(163)}
                  height={RF(30)}
                  m_Top={RF(16)}
                />
              </>
            )}
          </Section>
          <Section
            title="About"
            onPressEdit={() => setDescriptionEdit(true)}
            isOpen={isAccordionOpenDescription}
            onPress={() =>
              setIsAccordionOpenDescription(!isAccordionOpenDescription)
            }>
            {isAccordionOpenDescription && (
              <>
                <View style={styles.inputContainer}>
                  <TextInput
                    editable={descriptionEdit}
                    style={[
                      styles.textInput,
                      {color: descriptionEdit ? '#0D47A1' : '#7D7D7D'},
                    ]}
                    placeholder={'Write about us here'}
                    placeholderTextColor="#0D47A1"
                    value={formData.about}
                    onChangeText={(text: any) =>
                      handleInputChange('about', text)
                    }
                    multiline={true}
                    scrollEnabled={true}
                    textAlignVertical="top"
                  />
                </View>
                {/* <EditableField
                  label="Add Description"
                  value={formData.description}
                  onChangeText={(text: any) =>
                    handleInputChange('description', text)
                  }
                  editable={descriptionEdit}
                /> */}
                <AppButton
                  title={'Save'}
                  bgClr={'#0B7328'}
                  onPress={() => handleSave('about')}
                  width={RF(163)}
                  height={RF(30)}
                  m_Top={RF(16)}
                />
              </>
            )}
          </Section>
          <Section
            title="Qualification"
            onPressEdit={() => setIsEditingQualification(true)}
            isOpen={isAccordionOpenQualification}
            onPress={() =>
              setIsAccordionOpenQualification(!isAccordionOpenQualification)
            }>
            {isAccordionOpenQualification && (
              <>
                <EditableField
                  label="Qualifications"
                  value={formData.qualifications}
                  onChangeText={(text: any) =>
                    handleInputChange('qualifications', text)
                  }
                  editable={isEditingQualification}
                />
                <AppButton
                  title={'Save'}
                  bgClr={'#0B7328'}
                  onPress={() => handleSave('qualification')}
                  width={RF(163)}
                  height={RF(30)}
                  m_Top={RF(16)}
                />
              </>
            )}
          </Section>
          <Section
            title="Specialties"
            onPressEdit={() => setSpecialityEdit(true)}
            isOpen={specialityOpen}
            onPress={() => setSpeciality(!specialityOpen)}>
            {specialityOpen && (
              <>
                <DropList
                  FormName={formData?.speciality}
                  FormData={dataSpeciality}
                  styles={styles}
                  onEndReached={fetchNextPage}
                  editable={specialityEdit}
                  ListFooterComponent={
                    <ActivityIndicator
                      animating={indicatorLoader}
                      style={{marginTop: 20}}
                    />
                  }
                  formik={formData.speciality}
                  stateField={(text: any) =>
                    handleInputChange('speciality', text)
                  }
                />

                <AppButton
                  title={'Save'}
                  bgClr={'#0B7328'}
                  onPress={() => handleSave('specialties')}
                  width={RF(163)}
                  height={RF(30)}
                  m_Top={RF(16)}
                />
              </>
            )}
          </Section>
          <Section
            title="Certificates"
            onPressEdit={() => setCertificatEdit(true)}
            isOpen={openCertificated}
            onPress={() => setopenCertificated(!openCertificated)}>
            {openCertificated && (
              <>
                <EditableField
                  label="PMDC Number"
                  value={formData.pmdcNumber}
                  onChangeText={(text: any) =>
                    handleInputChange('pmdcNumber', text)
                  }
                  editable={CertificatEdit}
                />

                <UploadURL
                  handleImg={() => uploadImage('certificates')}
                  indicator={indicatorLoader}
                  editable={CertificatEdit}
                  title={'PMDC Image'}
                  uploadedImageUrl={uploadedImageUrl}
                />
                <TimeSelection
                  modeTrue={'date'}
                  title={'PMDC Expiry'}
                  editable={CertificatEdit}
                  show
                  selectedTime={formData.pmdcExpiry}
                  setTime={(date: any) => handleInputChange('pmdcExpiry', date)}
                />
                <AppButton
                  title={'Save'}
                  bgClr={'#0B7328'}
                  onPress={() => handleSave('certificates')}
                  width={RF(163)}
                  height={RF(30)}
                  m_Top={RF(16)}
                />
              </>
            )}
          </Section>
          <Section
            title="Social Info"
            onPressEdit={() => setSocialEdit(true)}
            isOpen={isAccordionOpenSocialInfo}
            onPress={() =>
              setIsAccordionOpenSocialInfo(!isAccordionOpenSocialInfo)
            }>
            {isAccordionOpenSocialInfo && (
              <>
                <EditableField
                  label="Facebook"
                  value={formData.facebook}
                  onChangeText={(text: any) =>
                    handleInputChange('facebook', text)
                  }
                  editable={socialEdit}
                />
                <EditableField
                  label="Youtube"
                  value={formData.youtube}
                  onChangeText={(text: any) =>
                    handleInputChange('youtube', text)
                  }
                  editable={socialEdit}
                />
                <EditableField
                  label="Instagram"
                  value={formData.instagram}
                  onChangeText={(text: any) =>
                    handleInputChange('instagram', text)
                  }
                  editable={socialEdit}
                />
                <EditableField
                  label="LinkedIn"
                  value={formData.linkedIn}
                  onChangeText={(text: any) =>
                    handleInputChange('linkedIn', text)
                  }
                  editable={socialEdit}
                />
                <AppButton
                  title={'Save'}
                  bgClr={'#0B7328'}
                  onPress={() => handleSave('socialInfo')}
                  width={RF(163)}
                  height={RF(30)}
                  m_Top={RF(16)}
                />
              </>
            )}
          </Section>

          <Section
            title="Bank Details"
            onPressEdit={() => setBankEdit(true)}
            isOpen={openBank}
            onPress={() => setOpenBank(!openBank)}>
            {openBank && (
              <>
                <EditableField
                  label="Bank Name"
                  value={formData.bankName}
                  onChangeText={(text: any) =>
                    handleInputChange('bankName', text)
                  }
                  editable={bankEdit}
                />
                <EditableField
                  label="NTN"
                  value={formData.incomeTaxNo}
                  onChangeText={(text: any) =>
                    handleInputChange('incomeTaxNo', text)
                  }
                  editable={bankEdit}
                />
                <EditableField
                  label="Account Title"
                  value={formData.accountTitle}
                  onChangeText={(text: any) =>
                    handleInputChange('accountTitle', text)
                  }
                  editable={bankEdit}
                />
                <EditableField
                  label="Account Number"
                  value={formData.accountNumber}
                  onChangeText={(text: any) =>
                    handleInputChange('accountNumber', text)
                  }
                  editable={bankEdit}
                />
                <UploadURL
                  handleImg={uploadImage}
                  indicator={loader}
                  editable={bankEdit}
                  title={'Attach Tax File'}
                  uploadedImageUrl={secoundUpload}
                />

                <AppButton
                  title={'Save'}
                  bgClr={'#0B7328'}
                  onPress={() => handleSave('bankDetails')}
                  width={RF(163)}
                  height={RF(30)}
                  m_Top={RF(16)}
                />
              </>
            )}
          </Section>
        </View>
        {loading && <CustomLoader />}
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

const Section = ({
  title,
  children,
  onPressEdit,
  isOpen,
  onPress,
}: {
  title?: any;
  children?: any;
  onPressEdit?: any;
  isOpen?: boolean;
  onPress?: () => void;
}) => (
  <View style={styles.section}>
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text size={14} SFmedium>
        {title}
      </Text>

      {isOpen && (
        <TouchableOpacity onPress={onPressEdit}>
          <Image
            source={editIcon}
            style={{
              width: RF(24),
              height: RF(24),
            }}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
    {children}
  </View>
);

const EditableField = ({
  label,
  value,
  onChangeText,
  editable = false,
  colors,
}: {
  label?: any;
  value?: any;
  onChangeText?: any;
  editable?: boolean;
  colors?: any;
}) => (
  <>
    <Text size={16} SFmedium>
      {label}
    </Text>
    <TextInput
      style={[styles.input, {color: editable ? '#0D47A1' : '#7D7D7D'}]}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
    />
  </>
);
interface Props {
  FormName?: any;
  Name?: any;
  FormData?: any;
  formik: any;
  stateField: any;
  top?: any;
  custom?: any;
  ListFooterComponent?: any;
  onPress?: any;
  styles?: any;
  editable?: any;
  onEndReached?: any;
}
const DropList = (props: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {
    FormName,
    FormData,
    onEndReached,
    styles,
    ListFooterComponent,
    formik,
    stateField,
    editable,
    top,
  } = props;
  const [clicked, setClicked] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set<string>());
  const handleSave = (text: any) => {
    setClicked(!clicked);
  };
  const handleSelect = (text: any) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(text)) {
      newSelection.delete(text);
    } else {
      newSelection.add(text);
    }
    setSelectedItems(newSelection);

    stateField(Array.from(newSelection).join(', '));
  };
  return (
    <>
      <TouchableOpacity
        style={[
          styles.AgeDropDownStyle,
          {pointerEvents: props.editable ? 'auto' : 'none'},
        ]}
        onPress={() => {
          editable ? setClicked(!clicked) : null;
        }}>
        <Text color={editable ? colors.blueText : '#ccc'}>
          {formik === '' ? FormName : formik}
        </Text>
        <Image
          source={dropIcon}
          tintColor={colors.blueText}
          style={styles.dropDownImage}
        />
      </TouchableOpacity>

      {clicked ? (
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 5,
            paddingBottom: RF(16),
          }}>
          <FlatList
            data={FormData}
            scrollEnabled={false}
            onEndReached={onEndReached}
            ListFooterComponent={ListFooterComponent}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.TouchableStyle,
                  {
                    backgroundColor: selectedItems.has(item.specialityTitle)
                      ? '#00276D'
                      : '#fff',
                  },
                ]}
                onPress={() => handleSelect(item.specialityTitle)}>
                <Text
                  SFmedium
                  size={14}
                  color={
                    selectedItems.has(item.specialityTitle)
                      ? '#fff'
                      : colors.blueText
                  }
                  style={{marginHorizontal: 10}}>
                  {item.specialityTitle}
                </Text>
              </TouchableOpacity>
            )}
          />
          <AppButton
            title="Save"
            width={RF(110)}
            height={RF(25)}
            b_R={8}
            onPress={handleSave}
          />
        </View>
      ) : null}
    </>
  );
};
const UploadURL = ({
  handleImg,
  indicator,
  uploadedImageUrl,
  editable,
  title,
}: {
  handleImg?: any;
  indicator?: any;
  title?: any;
  uploadedImageUrl?: any;
  editable?: any;
}) => {
  return (
    <View
      style={{marginTop: RF(8), flexDirection: 'row', alignItems: 'center'}}>
      <Pressable
        onPress={() => (editable ? handleImg('type') : null)}
        style={{
          borderBottomWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: RF(10),
          borderColor: '#ccc',
          width: '100%',
        }}>
        {indicator ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <>
            <Text size={12} color={editable ? '#0D47A1' : '#ccc'}>
              {uploadedImageUrl ? 'Uploaded file' : title}
            </Text>
            <Image
              source={uploadIcon}
              style={{
                width: RF(16),
                height: RF(16),
                resizeMode: 'contain',
              }}
            />
          </>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: RF(8),
    padding: RF(8),
    marginVertical: RF(8),
  },
  progressText: {
    position: 'absolute',
  },
  img: {
    height: RF(16),
    width: RF(16),
    marginRight: RF(20),
    resizeMode: 'contain',
  },
  AgeDropDownStyle: {
    flexDirection: 'row',
    marginVertical: RF(8),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    // paddingBottom: RF(10),
    padding: RF(8),
    width: '100%',
  },
  textInput: {
    height: RF(80),
    paddingTop: 0,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#1a4b8a',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: RF(24),
  },
  ImageEdit: {width: rs(16), height: rv(16), resizeMode: 'contain'},
  ContainerEdit: {
    backgroundColor: '#00276D',
    width: RF(24),
    height: RF(24),
    alignItems: 'center',
    position: 'absolute',
    right: '35%',
    bottom: rv(18),
    zIndex: 1000,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: RF(100),
  },
  MainContainer: {
    width: RF(104),
    height: RF(104),
    borderRadius: RF(100),
    marginBottom: rv(16),
    justifyContent: 'center',
    borderWidth: RF(2),
    borderColor: 'rgba(245, 245, 245, 1)',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  ImageView: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  // fieldLabel: {
  //   fontSize: 16,
  //   // marginBottom: 5,
  //   marginTop: RF(8),
  // },
  viewStyle: {
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  TouchableStyle: {
    width: '100%',
    padding: RF(4),
    zIndex: 10,
  },
  dropDownImage: {
    width: RF(20),
    height: RF(20),
    resizeMode: 'contain',
  },
});

export default DoctorProfile;
