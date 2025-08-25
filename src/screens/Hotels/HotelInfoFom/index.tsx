import {Image, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {
  AppButton,
  CustomFloatingLabelInput,
  CustomHeader,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {RF} from '@theme';
import {live} from '@assets';
import StarRating from './StarRating';
import {useDispatch, useSelector} from 'react-redux';
import {setHotelInfo} from '@redux';
import {
  globalStyles,
  GOOGLE_PLACES_API_KEY,
  navigate,
  rv,
  showToast,
} from '@services';
import {CheckBox} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export const numberData = [
  {id: 1, text: '1'},
  {id: 2, text: '2'},
  {id: 3, text: '3'},
  {id: 4, text: '4'},
  {id: 5, text: '5'},
  {id: 6, text: '6'},
  {id: 7, text: '7'},
  {id: 8, text: '8'},
  {id: 9, text: '9'},
  {id: 10, text: '10'},
];

const HotelInfoForm = ({route}: any) => {
  const {item, selectedItem} = route.params;
  const theme = useTheme();
  const colors = theme.colors;
  const {B2B} = useSelector((state: any) => state.root.b2b);
  const dispatch = useDispatch();
  const lab = B2B?.hotel;
  const validationSchema = Yup.object().shape({
    propertyName: Yup.string().required('Property Name is required'),
    customName: Yup.string().required('Your Name is required'),
    contactNumber: Yup.string().required('Phone Number is required'),
    alternativeContactNo: Yup.string(),
    starRating:
      selectedItem === 'Hotels, B&Bs & More'
        ? Yup.string().required('Star Rating is required')
        : Yup.string(),
    postCode: Yup.string().required('Post Code is required'),
    companyName: Yup.string().when('multipleApartments', {
      is: true,
      then: (schema: any) => schema.required('Company Name is required'),
    }),
    channelManagerName: Yup.string().when('useChannelManager', {
      is: true,
      then: (schema: any) =>
        schema.required("Channel Manager's Name is required"),
    }),
    multipleApartments:
      item === 'Apartments'
        ? Yup.boolean().required('Multiple Apartments field is required')
        : Yup.boolean(),
    useChannelManager:
      item === 'Apartments'
        ? Yup.boolean().required('Use Channel Manager field is required')
        : Yup.boolean(),
    selectCity: Yup.object().nullable().required('Address is required'),
  });

  const formik: any = useFormik({
    initialValues: {
      contactNumber: '',
      alternativeContactNo: '',
      propertyName: '',
      customName: '',
      starRating: '',
      postCode: '',
      companyName: '',
      channelManagerName: '',
      multipleApartments: false,
      useChannelManager: false,
      selectCity: null,
    },
    validationSchema,
    onSubmit: (values: any) => {
      let object: any = {
        propertyName: values.propertyName,
        customName: values.customName,
        contactNumber: values.contactNumber,
        alternativeContactNo: values.alternativeContactNo,
        postCode: values.postCode,
        location: {
          lng: values?.selectCity.geometry.location.lng,
          lat: values?.selectCity.geometry.location.lat,
          address: values?.selectCity.formatted_address,
          city: values?.selectCity.name,
        },
      };
      if (selectedItem === 'Hotels, B&Bs & More') {
        object = {
          ...object,
          category: item?.name?.toLowerCase(),
          starRating: values.starRating,
        };
      }
      if (selectedItem === 'Homes') {
        object = {
          ...object,
          guestBook: item?.toLowerCase(),
          partOfCompany: values.multipleApartments ? 'Yes' : 'No',
          nameOfCompany: values.multipleApartments ? values.companyName : '',
          channelManager: values.useChannelManager
            ? 'I use a channel manager'
            : "I don't use a channel manager",
          nameOfManager: values.useChannelManager
            ? values.channelManagerName
            : '',
        };
      }
      if (item === 'Apartments') {
        object = {
          ...object,
          partOfCompany: values.multipleApartments ? 'Yes' : 'No',
          nameOfCompany: values.multipleApartments ? values.companyName : '',
          channelManager: values.useChannelManager
            ? 'I use a channel manager'
            : "I don't use a channel manager",
          nameOfManager: values.useChannelManager
            ? values.channelManagerName
            : '',
        };
      }

      dispatch(setHotelInfo({object}));
      if (item === 'Apartments') {
        navigate('ApartmentFields', {
          object: object,
          item: item,
        });
      } else if (selectedItem === 'Homes') {
        navigate('EntirePlaceHome', {
          item: item,
          selectedItem: selectedItem,
        });
      } else {
        navigate('PropertyRooms', {object: object, selectedItem: selectedItem});
      }
      showToast('Success', 'Basic info saved successfully', true);
    },
  });

  const onPress = () => {
    if (!formik.isValid && formik.submitCount > 0) {
      const firstError: any = Object.values(formik.errors)[0];
      showToast('Error', firstError, false);
    } else {
      formik.handleSubmit();
    }
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={
            item === 'Apartments'
              ? 'Apartments'
              : item === 'A private room'
              ? 'A private room'
              : item === 'Entire place'
              ? 'Entire place'
              : 'B&B'
          }
          leftIcon
          titleColor={'#fff'}
          notify
        />

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{paddingBottom: rv(80)}}>
          <View
            style={{marginHorizontal: RF(24), marginTop: RF(24), gap: RF(8)}}>
            <CustomFloatingLabelInput
              label={'Your Property Name'}
              labelClr="rgba(13, 71, 161, 1)"
              value={formik.values.propertyName}
              onChangeText={formik.handleChange('propertyName')}
            />
            {formik.touched.propertyName && formik.errors.propertyName && (
              <Text style={globalStyles.errors}>
                {formik.errors.propertyName}
              </Text>
            )}
            {selectedItem === 'Hotels, B&Bs & More' && (
              <StarRating
                name={'Star Rating'}
                top={RF(92)}
                selectedData={formik.values.starRating}
                setSelectedData={(value: any) =>
                  formik.setFieldValue('starRating', value)
                }
              />
            )}
            <CustomFloatingLabelInput
              label={'Enter Your Name'}
              labelClr="rgba(13, 71, 161, 1)"
              value={formik.values.customName}
              onChangeText={formik.handleChange('customName')}
            />
            {formik.touched.customName && formik.errors.customName && (
              <Text style={globalStyles.errors}>
                {formik.errors.customName}
              </Text>
            )}

            <CustomFloatingLabelInput
              label={'Enter Your Phone'}
              labelClr="rgba(13, 71, 161, 1)"
              keyboardType="phone-pad"
              value={formik.values.contactNumber}
              onChangeText={formik.handleChange('contactNumber')}
            />
            {formik.touched.contactNumber && formik.errors.contactNumber && (
              <Text style={globalStyles.errors}>
                {formik.errors.contactNumber}
              </Text>
            )}

            <CustomFloatingLabelInput
              label={'Alternative Contact No.'}
              labelClr="rgba(13, 71, 161, 1)"
              keyboardType="phone-pad"
              value={formik.values.alternativeContactNo}
              onChangeText={formik.handleChange('alternativeContactNo')}
            />
            <CustomFloatingLabelInput
              label={'Post Code'}
              labelClr="rgba(13, 71, 161, 1)"
              keyboardType="phone-pad"
              value={formik.values.postCode}
              onChangeText={formik.handleChange('postCode')}
            />
            {formik.touched.postCode && formik.errors.postCode && (
              <Text style={globalStyles.errors}>{formik.errors.postCode}</Text>
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#C4C4C4',
              }}>
              <View style={styles.leftIcon}>
                <Image source={live} style={styles.icon} />
              </View>
              <GooglePlacesAutocomplete
                placeholder="Address"
                disableScroll
                onPress={(data, details = null) => {
                  if (details) {
                    formik.setFieldValue('selectCity', details);
                  } else {
                    console.error('Error fetching details:', data);
                  }
                }}
                textInputProps={{
                  placeholderTextColor: '#7D7D7D',
                }}
                fetchDetails={true}
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: 'en',
                }}
                styles={{
                  container: {
                    padding: 0,
                    paddingBottom: 0,
                    paddingVertical: 0,
                    paddingTop: 0,
                  },
                }}
              />
            </View>
            {formik.touched.selectCity && formik.errors.selectCity && (
              <Text style={globalStyles.errors}>
                {formik.errors.selectCity}
              </Text>
            )}

            {(item === 'Apartments' || selectedItem === 'Homes') && (
              <View style={{marginTop: RF(16)}}>
                <Text style={styles.label}>
                  Do you own multiple apartments or are you part of a property
                  management company or a group?
                </Text>
                <View style={styles.checkBoxContainer}>
                  <CheckBox
                    title="Yes"
                    checked={formik.values.multipleApartments}
                    onPress={() =>
                      formik.setFieldValue('multipleApartments', true)
                    }
                    containerStyle={styles.checkBox}
                    checkedColor={colors.primary}
                  />
                  <CheckBox
                    title="No"
                    checked={!formik.values.multipleApartments}
                    onPress={() =>
                      formik.setFieldValue('multipleApartments', false)
                    }
                    containerStyle={styles.checkBox}
                    checkedColor={colors.primary}
                  />
                </View>
                {formik.values.multipleApartments && (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Name of company, or Group"
                      value={formik.values.companyName}
                      onChangeText={formik.handleChange('companyName')}
                      onBlur={formik.handleBlur('companyName')}
                    />
                    {formik.touched.companyName &&
                      formik.errors.companyName && (
                        <Text style={globalStyles.errors}>
                          {formik.errors.companyName}
                        </Text>
                      )}
                  </>
                )}
                <Text style={styles.label}>Do you use a channel manager?</Text>
                <View style={styles.checkBoxContainer}>
                  <CheckBox
                    title="I use a channel manager"
                    checked={formik.values.useChannelManager}
                    onPress={() =>
                      formik.setFieldValue('useChannelManager', true)
                    }
                    containerStyle={styles.checkBox}
                    checkedColor={colors.primary}
                  />
                  <CheckBox
                    title="I don't use a channel manager"
                    checked={!formik.values.useChannelManager}
                    onPress={() =>
                      formik.setFieldValue('useChannelManager', false)
                    }
                    containerStyle={styles.checkBox}
                    checkedColor={colors.primary}
                  />
                </View>
                {formik.values.useChannelManager && (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Channel Manager's Name (Optional)"
                      value={formik.values.channelManagerName}
                      onChangeText={formik.handleChange('channelManagerName')}
                      onBlur={formik.handleBlur('channelManagerName')}
                    />
                    {formik.touched.channelManagerName &&
                      formik.errors.channelManagerName && (
                        <Text style={globalStyles.errors}>
                          {formik.errors.channelManagerName}
                        </Text>
                      )}
                  </>
                )}
              </View>
            )}
            <View style={{marginVertical: RF(16)}}>
              <AppButton
                onPress={onPress}
                title="Next"
                width={RF(180)}
                height={RF(40)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Wrapper>
  );
};

export default HotelInfoForm;

const styles = StyleSheet.create({
  label: {
    fontSize: RF(14),
    color: '#0D47A1',
    marginBottom: RF(8),
  },
  checkBoxContainer: {
    marginTop: RF(8),
    gap: RF(16),
    marginBottom: RF(16),
  },
  icon: {
    width: RF(16),
    height: RF(16),
    tintColor: '#00276D',
  },
  leftIcon: {
    alignItems: 'center',
    marginRight: RF(7),
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
    marginRight: RF(20),
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: RF(8),
    padding: RF(10),
    marginBottom: RF(20),
    color: '#0D47A1',
  },
});
