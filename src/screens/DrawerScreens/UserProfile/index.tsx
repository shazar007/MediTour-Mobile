import {
  FlatList,
  Modal,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppButton,
  CustomFloatingLabelInput,
  CustomHeader,
  CustomLoader,
  DeleteModal,
  LocationInput,
  New_Input,
  PhoneNumber,
  Text,
  Wrapper,
} from '@components';
import useStyles from './styles';
import {Image} from 'react-native-animatable';
import {ArrowLeft, appointment, cross, edit} from '@assets';
import {useDispatch, useSelector} from 'react-redux';
import {
  bankData,
  BASE_URL,
  blockUser,
  colors,
  ENDPOINTS,
  finalValue,
  initialValue,
  margin,
  rs,
  rv,
  showToast,
  socialData,
  updateProfile,
  userData,
} from '@services';
import auth from '@react-native-firebase/auth';
import {setIsLoggedIn, setUser, setUserAge} from '@redux';
import {useTheme} from '@react-navigation/native';
import {useFormik} from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';
import {differenceInYears} from 'date-fns';
import DocumentPicker from 'react-native-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import {Alert} from '@utils';
const UserProfile = ({route}: any) => {
  const {user} = useSelector((state: any) => state.root.user);

  const dispatch: any = useDispatch();
  const styles = useStyles();
  const theme: any = useTheme();
  const colors = theme.colors;
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setEror] = useState('');
  const [showLoader, setshowLoader] = useState(false);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState();
  const [url, setUrl] = useState<any>('');
  const [initializing, setInitializing] = useState(true);
  const [dob, setDob] = useState<any>('');
  const [formattedValue, setFormattedValue] = useState('');
  const [open1, setOpen1] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [items, setItems] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Confidential', value: 'confidential'},
  ]);

  const [formType, setFormType] = useState<
    'basic' | 'social' | 'bank' | 'changePassword'
  >('basic');
  const [Showmodel, setShowModel] = useState(false);
  const onAuthStateChanged = (userData: any) => {
    setUsers(users);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber: any = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);
  const deleteUser = () => {
    setshowLoader(true);
    let data = {
      vendorType: 'Users',
      vendorId: user?._id,
      blocked: true,
    };

    blockUser(data)
      .then((res: any) => {
        dispatch(setIsLoggedIn(false));
      })
      .catch((err: any) => {})
      .finally(() => {
        setshowLoader(false);
      });
  };
  const formik: any = useFormik({
    initialValues: initialValue(user),

    onSubmit: values => {
      handleSaveClick(values);
    },
  });
  const handleSaveClick = (values: any) => {
    if (
      formType === 'changePassword' &&
      (!values.currentPassword ||
        !values.newPassword ||
        !values.confirmPassword)
    ) {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
      return;
    }
    if (values?.newPassword !== values?.confirmPassword) {
      ToastAndroid.show('Passwords do not match', ToastAndroid.LONG);
      return;
    }
    const {countryCode, ...otherValues} = values;
    const hasOtherValue = Object.values(otherValues).some(value => value);
    if (!hasOtherValue) {
      showToast('Error', 'Please enter at least one field', false);
      return;
    }
    setLoading(true);
    let params: any = finalValue(values, url);
    updateProfile(params)
      .then((res: any) => {
        setModalOpen(false);
        Alert.showSuccess(res?.data?.message);
        dispatch(setUser(res?.data?.user));
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data?.message);
        if (formType === 'changePassword') {
          setEror(err?.response?.data?.message);
        } else {
          ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG);
        }
      })
      .finally(() => setLoading(false));
  };

  const [value, setValue] = useState(formik?.values?.gender);
  const handleDob = () => {
    setIsVisible(true);
  };

  const onChange = (event: any, selectedDate: any) => {
    setIsVisible(false);
    if (event.type === 'dismissed') {
      return;
    }
    const currentDate = selectedDate || date;
    setDate(currentDate);
    const formattedDate = currentDate.toLocaleDateString('en-GB');
    setDob(formattedDate);
    const calculatedAge = differenceInYears(new Date(), currentDate);
    dispatch(setUserAge(calculatedAge.toString()));
    formik.setFieldValue('dob', formattedDate);
  };

  const uploadImage = async () => {
    try {
      const result: any = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setLoader(true);

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
          setUrl(response?.data?.fileUrl);
          setLoader(true);
          let params = {
            userImage: response?.data?.fileUrl,
          };

          updateProfile(params)
            .then((res: any) => {
              showToast('Success', 'Profile Updated Successfully', true);
              dispatch(
                setUser({
                  ...user,
                  userImage: response?.data?.fileUrl,
                }),
              );
            })
            .catch((err: any) => {});
        })
        .catch(error => {
          if (error?.response?.data?.message == undefined) {
            showToast('error', 'Server error', false);
          }
        })
        .finally(() => {
          setLoader(false);
        });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        setLoader(false);
      } else {
        console.error('DocumentPicker Error:', error);
        setLoader(false);
      }
    }
  };
  const handleLocationChange = async (newLocation: any) => {
    const labelParts: any = newLocation?.label.split(', ');
    const country = labelParts[labelParts.length - 1];
    formik?.setFieldValue('address', newLocation?.label);
    formik?.setFieldValue('city', newLocation?.city);
    formik?.setFieldValue('country', country);
    const address = newLocation?.label;
    const apiKey = 'AIzaSyBrNjsUsrJ0Mmjhe-WUKDKVaIsMkZ8iQ4A';
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address,
    )}&key=${apiKey}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.status === 'OK') {
        const location = data.results[0].geometry.location;
        formik?.setFieldValue('lat', location.lat);
        formik?.setFieldValue('long', location.lng);
      } else {
        console.error('Geocoding error: ', data.status);
      }
    } catch (error) {
      console.error('Error fetching geocoding data: ', error);
    }
  };
  useEffect(() => {
    if (isModalOpen) {
      formik.resetForm({values: initialValue(user, dob)});
    }
  }, [isModalOpen, user, dob, formattedValue, value]);

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader title={''} leftIcon titleColor={colors.white} notify />

      <View style={styles.MainContainer}>
        <Image
          source={{
            uri:
              user?.userImage ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
          }}
          style={styles.ImageView}
        />
      </View>
      <TouchableOpacity
        onPress={uploadImage}
        style={{
          position: 'absolute',
          top: rv(100),
          right: rv(108),
          backgroundColor: '#fff',
          alignItems: 'center',
          elevation: 2,
          justifyContent: 'center',
          borderRadius: rv(100),
          width: rv(25),
          height: rv(25),
        }}>
        <Image
          source={edit}
          style={{width: rs(16), height: rs(16), resizeMode: 'contain'}}
        />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{paddingBottom: rv(80)}}>
        <Card
          data={userData(user)}
          info={'Basic Info'}
          setFormType={() => setFormType('basic')}
          setModalOpen={setModalOpen}
        />
        <Card
          data={socialData(user)}
          info={'Social Media'}
          setFormType={() => setFormType('social')}
          setModalOpen={setModalOpen}
        />
        <Card
          data={bankData(user)}
          info={'Bank Details'}
          setFormType={() => setFormType('bank')}
          setModalOpen={setModalOpen}
        />
        {/* <View style={styles.bgview}>
          <Text size={16} SFbold color={'#1f1f1fb2'}>
            Change Password
          </Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              setFormType('changePassword');
              setModalOpen(true);
            }}>
            <Image
              source={ArrowLeft}
              style={{width: rs(20), height: rs(20), tintColor: '#000'}}
            />
          </TouchableOpacity>
        </View> */}
      </ScrollView>

      <Modal animationType="fade" transparent={true} visible={isModalOpen}>
        {formType === 'basic' && (
          <ScrollView
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{flexGrow: 1}}>
            <View
              style={{
                flex: 1,
                elevation: 5,
                marginHorizontal: rs(8),
                marginVertical: rv(8),
                backgroundColor: '#fff',
                borderRadius: rs(8),
                padding: rv(12),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text SFbold color={colors.primary} size={18}>
                  Basic Info
                </Text>
                <TouchableOpacity onPress={() => setModalOpen(false)}>
                  <Image
                    source={cross}
                    style={{
                      width: rs(24),
                      height: rv(24),
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <New_Input
                placeholder={'Full Name'}
                extraStyle={margin.top_8}
                value={formik?.values?.fullName}
                onChangeText={formik.handleChange('fullName')}
              />
              <New_Input
                placeholder={'Father Name'}
                extraStyle={margin.top_8}
                value={formik?.values?.fatherName}
                onChangeText={formik.handleChange('fatherName')}
              />
              <View style={styles.inputGroupBasic}>
                <DropDownPicker
                  open={open1}
                  value={formik.values.gender}
                  items={items}
                  setOpen={setOpen1}
                  setValue={callback => {
                    const selectedValue = callback(formik.values.gender);
                    formik.setFieldValue('gender', selectedValue);
                  }}
                  setItems={setItems}
                  placeholder={formik.values.gender || 'Select Gender'}
                  style={styles.wideSelect}
                  placeholderStyle={{color: '#aaa'}}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
              <CustomFloatingLabelInput
                enablePress={handleDob}
                editable={false}
                type={'box'}
                tintColorStart={colors.primary}
                m_Top={rv(8)}
                startIcon={appointment}
                label={'Date of Birth'}
                placeholderTextColor={'red'}
                value={`${formik?.values?.dob}`}
              />
              <New_Input
                placeholder={'Email'}
                extraStyle={margin.top_8}
                value={formik?.values?.email}
                onChangeText={formik.handleChange('email')}
                editable={false}
              />
              <PhoneNumber
                setFormattedValue={setFormattedValue}
                formattedValue={formattedValue}
                phValue={formik.values.phoneNumber}
                type={'box'}
                setValue={formik.handleChange('phoneNumber')}
                handleFomatValue={formik.handleChange('phoneNumber')}
              />
              <New_Input
                placeholder={'NIC/Passport'}
                extraStyle={margin.top_8}
                value={formik?.values?.passport}
                onChangeText={formik.handleChange('passport')}
              />
              <New_Input
                placeholder={'Blood Group *'}
                extraStyle={margin.top_8}
                value={formik?.values?.bloodGroup}
                onChangeText={formik.handleChange('bloodGroup')}
              />
              <New_Input
                placeholder={'Qualification *'}
                extraStyle={margin.top_8}
                value={formik?.values?.qualification}
                onChangeText={formik.handleChange('qualification')}
              />
              <New_Input
                placeholder={'Number of Children'}
                extraStyle={margin.top_8}
                value={formik?.values?.childrenNumber}
                onChangeText={formik.handleChange('childrenNumber')}
              />
              <LocationInput
                placeholder={formik?.values?.address}
                type={'box'}
                setData={handleLocationChange}
                defaultValue={{
                  label:
                    formik?.values?.address || user?.address?.address || '',
                  value: {place_id: null},
                }}
              />
              <New_Input
                placeholder={'City'}
                extraStyle={margin.top_8}
                value={formik?.values?.city}
                onChangeText={formik.handleChange('city')}
              />
              <New_Input
                placeholder={'Country'}
                extraStyle={margin.top_8}
                value={formik?.values?.country}
                onChangeText={formik.handleChange('country')}
              />
              <AppButton
                title="Save"
                m_Top={rv(16)}
                width={rv(180)}
                iconTrue
                onPress={formik.handleSubmit}
              />
            </View>
          </ScrollView>
        )}
        {formType === 'social' && (
          <View
            style={{
              justifyContent: 'center',
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}>
            <View
              style={{
                elevation: 5,
                marginHorizontal: rs(8),
                marginVertical: rv(8),
                backgroundColor: '#fff',
                borderRadius: rs(8),
                padding: rv(12),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text SFbold color={colors.primary} size={18}>
                  Social Details
                </Text>
                <TouchableOpacity onPress={() => setModalOpen(false)}>
                  <Image
                    source={cross}
                    style={{
                      width: rs(24),
                      height: rv(24),
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <New_Input
                placeholder={'Facebook Profile URL (Optional)'}
                extraStyle={margin.top_8}
                value={formik?.values?.facebook}
                onChangeText={formik.handleChange('facebook')}
              />
              <New_Input
                placeholder={'Instagram Profile URL (Optional)'}
                extraStyle={margin.top_8}
                value={formik?.values?.instagram}
                onChangeText={formik.handleChange('instagram')}
              />
              <New_Input
                placeholder={'LinkedIn Profile URL (Optional)'}
                extraStyle={margin.top_8}
                value={formik?.values?.linkedin}
                onChangeText={formik.handleChange('linkedin')}
              />
              <New_Input
                placeholder={'Youtube Profile URL (Optional)'}
                extraStyle={margin.top_8}
                value={formik?.values?.youtube}
                onChangeText={formik.handleChange('youtube')}
              />
              <AppButton
                title="Save"
                m_Top={rv(16)}
                width={rv(180)}
                iconTrue
                onPress={formik.handleSubmit}
              />
            </View>
          </View>
        )}
        {formType === 'bank' && (
          <View
            style={{
              justifyContent: 'center',
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}>
            <View
              style={{
                elevation: 5,
                marginHorizontal: rs(8),
                marginVertical: rv(8),
                backgroundColor: '#fff',
                borderRadius: rs(8),
                padding: rv(12),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text SFbold color={colors.primary} size={18}>
                  Bank Details
                </Text>
                <TouchableOpacity onPress={() => setModalOpen(false)}>
                  <Image
                    source={cross}
                    style={{
                      width: rs(24),
                      height: rv(24),
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <New_Input
                placeholder={'Bank Name (Optional)'}
                extraStyle={margin.top_8}
                value={formik?.values?.bankName}
                onChangeText={formik.handleChange('bankName')}
              />
              <New_Input
                placeholder={'IBAN / ACC Number (Optional)'}
                extraStyle={margin.top_8}
                value={formik?.values?.accountNumber}
                onChangeText={formik.handleChange('accountNumber')}
              />
              <New_Input
                placeholder={'Account Title (Optional)'}
                extraStyle={margin.top_8}
                value={formik?.values?.accountTitle}
                onChangeText={formik.handleChange('accountTitle')}
              />
              <New_Input
                placeholder={'NTN (Optional)'}
                extraStyle={margin.top_8}
                value={formik?.values?.ntn}
                onChangeText={formik.handleChange('ntn')}
              />
              <AppButton
                title="Save"
                m_Top={rv(16)}
                width={rv(180)}
                iconTrue
                onPress={formik.handleSubmit}
              />
            </View>
          </View>
        )}
        {formType === 'changePassword' && (
          <View
            style={{
              justifyContent: 'center',
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}>
            <View
              style={{
                elevation: 5,
                marginHorizontal: rs(8),
                marginVertical: rv(8),
                backgroundColor: '#fff',
                borderRadius: rs(8),
                padding: rv(12),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text SFbold color={colors.primary} size={18}>
                  Change Password
                </Text>
                <TouchableOpacity onPress={() => setModalOpen(false)}>
                  <Image
                    source={cross}
                    style={{
                      width: rs(24),
                      height: rv(24),
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <New_Input
                placeholder={'Current Password *'}
                extraStyle={margin.top_8}
                isSecured
                value={formik?.values?.currentPassword}
                onChangeText={formik.handleChange('currentPassword')}
              />
              <New_Input
                placeholder={'New Password *'}
                isSecured
                extraStyle={margin.top_8}
                value={formik?.values?.newPassword}
                onChangeText={formik.handleChange('newPassword')}
              />
              <New_Input
                placeholder={'Confirm Password *'}
                extraStyle={margin.top_8}
                isSecured
                value={formik?.values?.confirmPassword}
                onChangeText={formik.handleChange('confirmPassword')}
              />
              {error && (
                <Text size={12} color={'red'}>
                  {error}
                </Text>
              )}
              <AppButton
                title="Save"
                m_Top={rv(16)}
                width={rv(180)}
                iconTrue
                onPress={formik.handleSubmit}
              />
            </View>
          </View>
        )}

        {visible && (
          <DateTimePicker
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            maximumDate={new Date()}
            onChange={onChange}
            disabled={true}
            style={{
              backgroundColor: 'red',
              borderColor: 'red',
              borderWidth: 1,
              width: '20%',
            }}
          />
        )}
        {loading && <CustomLoader />}
      </Modal>
      <DeleteModal
        Visible={Showmodel}
        cancelPress={() => setShowModel(false)}
        deletePress={() => deleteUser()}
        loading={showLoader}
      />
      {loader && <CustomLoader />}
    </Wrapper>
  );
};

export default UserProfile;

const Card = ({
  data,
  info,
  setFormType,
  setModalOpen,
}: {
  data?: any;
  info?: any;
  setFormType?: any;
  setModalOpen?: any;
}) => {
  const {user} = useSelector((state: any) => state.root.user);
  const styles = useStyles();

  return (
    <View
      style={{
        justifyContent: 'space-between',
        marginHorizontal: rs(16),
        marginVertical: rv(8),
        padding: rs(10),
        borderRadius: 10,
        elevation: 2,
        backgroundColor: '#fff',

        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text SFbold color={colors.primary} size={18}>
          {info}
        </Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            setModalOpen(true);
            setFormType();
          }}>
          <Text size={12} SFmedium>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={({item}: any) => (
          <View style={{marginTop: rv(4)}}>
            <Text size={14} SFmedium color={'#1f1f1fb2'}>
              {item?.Heading}
            </Text>
            <Text size={18} SFmedium color={'#222222e5'}>
              {item?.title}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
