import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {
  AppButton,
  AppTextInput,
  CustomHeader,
  CustomLoader,
  DropHotel,
  HeaderCard,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {CheckBox} from 'react-native-elements';
import {Text} from '@components';
import {RF} from '@theme';
import {PKR} from '@assets';
import {navigate} from '@services';
import Toast from 'react-native-toast-message';
import {setHotelInfo} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import {dataModal, facilitiesEntire} from './data';

const validationSchema = Yup.object().shape({
  isParkingAvailable: Yup.string().required('Required'),
  priceOfParking: Yup.string().when('parkingAvailability', {
    is: 'Yes,Paid',
    then: schema => schema.required('Required'),
    otherwise: schema => schema.notRequired(),
  }),
  privateParking: Yup.string().required('privateParking Required'),
  siteParking: Yup.string().required('Onsite Required'),
  facilities: Yup.array().min(1, 'Select at least one facility'),
  reservation: Yup.string().required('reservation Required'),
  language: Yup.string().required('language Required'),
  propertySurroundings: Yup.array()
    .of(
      Yup.object().shape({
        propertyName: Yup.string().required('propertyName Required'),
        propertyDistance: Yup.string().required('propertyDistance Required'),
      }),
    )
    .max(3, 'You can add up to 3 properties only')
    .required('propertySurroundings Required'),
});

const HomeFacilities = ({route}: any) => {
  const {selectedItem} = route.params;
  const theme = useTheme();
  const colors = theme.colors;
  const dispatch = useDispatch();
  const {hotelInfo} = useSelector((state: any) => state?.root?.b2b);
  const [loading, setLoading] = useState(false);
  const handleNext = (values: any) => {
    setLoading(true);
    const merging = {
      ...hotelInfo,
      ...{Facilities: values},
    };
    dispatch(setHotelInfo(merging));
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const formik = useFormik({
    initialValues: {
      privateParking: '',
      isParkingAvailable: '',
      priceOfParking: '',
      siteParking: '',
      facilities: [],
      language: '',
      reservation: '',
      propertySurroundings: [{propertyName: '', propertyDistance: ''}],
    },
    validationSchema,
    onSubmit: values => {
      handleNext(values);
      navigate('Amenities', {data: values, selectedItem: selectedItem});
    },
  });

  const showToast = message => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message,
      position: 'bottom',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
    });
  };

  const onPress = () => {
    formik.validateForm().then(errors => {
      if (Object.keys(errors).length) {
        const firstError = Object.values(errors)[0];
        showToast(firstError);
      } else {
        formik.handleSubmit();
      }
    });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Facilities & Services'}
          leftIcon
          titleColor={'#fff'}
          notify
        />

        <ScrollView>
          <View style={styles.container}>
            <DropHotel
              name={'isParkingAvailable'}
              data={dataModal}
              setSelectedData={val =>
                formik.setFieldValue('isParkingAvailable', val)
              }
              selectedData={formik.values.isParkingAvailable}
            />

            {formik.values.isParkingAvailable === 'Yes,Paid' && (
              <AppTextInput
                placeholder={'Price for Parking per day'}
                p_Horizontal={RF(8)}
                fontSize={RF(12)}
                placeholderTextColor={'#0D47A1'}
                value={formik.values.priceOfParking}
                onChangeText={formik.handleChange('priceOfParking')}
                onBlur={formik.handleBlur('priceOfParking')}
                endIcon={PKR}
                padding_H={RF(8)}
              />
            )}
            <Text
              size={18}
              SFsemiBold
              color={'#0D47A1'}
              style={{marginTop: RF(16)}}>
              Language Spoken
            </Text>
            <AppTextInput
              placeholder={'What language your staff speak'}
              p_Horizontal={RF(8)}
              fontSize={RF(12)}
              m_Top={RF(8)}
              placeholderTextColor={'#0D47A1'}
              value={formik.values.language}
              onChangeText={formik.handleChange('language')}
              onBlur={formik.handleBlur('language')}
              padding_H={RF(8)}
              errorMessage={
                formik.touched.language && formik.errors.language
                  ? formik.errors.language
                  : ''
              }
            />
            <Text
              size={14}
              SFregular
              color={'#0D47A1'}
              style={{marginVertical: RF(10)}}>
              Facility that are popular with guests?
            </Text>
            <View style={styles.row}>
              <FlatList
                scrollEnabled={false}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  width: '100%',
                }}
                data={facilitiesEntire}
                renderItem={({item}) => (
                  <View key={item?.id} style={styles.checkboxContainer}>
                    <CheckBox
                      title={item?.label}
                      checked={formik.values.facilities.includes(item?.label)}
                      onPress={() => {
                        if (formik.values.facilities.includes(item?.label)) {
                          formik.setFieldValue(
                            'facilities',
                            formik.values.facilities.filter(
                              facility => facility !== item?.label,
                            ),
                          );
                        } else {
                          formik.setFieldValue('facilities', [
                            ...formik.values.facilities,
                            item?.label,
                          ]);
                        }
                      }}
                      containerStyle={styles.checkbox}
                      textStyle={styles.checkboxText}
                    />
                  </View>
                )}
              />
            </View>
            <Text size={20} SFmedium color={'#0D47A1'}>
              Property surroundings
            </Text>
            {formik.values.propertySurroundings.map((property, index) => (
              <View key={index}>
                <AppTextInput
                  placeholder={`Property Name ${index + 1}`}
                  p_Horizontal={RF(8)}
                  fontSize={RF(12)}
                  placeholderTextColor={'#0D47A1'}
                  value={property.propertyName}
                  onChangeText={formik.handleChange(
                    `propertySurroundings[${index}].propertyName`,
                  )}
                  onBlur={formik.handleBlur(
                    `propertySurroundings[${index}].propertyName`,
                  )}
                  errorMessage={
                    formik.touched.propertySurroundings &&
                    formik.errors.propertySurroundings &&
                    formik.touched.propertySurroundings[index]?.propertyName &&
                    formik.errors.propertySurroundings[index]?.propertyName
                      ? formik.errors.propertySurroundings[index].propertyName
                      : ''
                  }
                />
                <AppTextInput
                  placeholder={`Property Distance ${index + 1}`}
                  p_Horizontal={RF(8)}
                  fontSize={RF(12)}
                  placeholderTextColor={'#0D47A1'}
                  value={property.propertyDistance}
                  onChangeText={formik.handleChange(
                    `propertySurroundings[${index}].propertyDistance`,
                  )}
                  onBlur={formik.handleBlur(
                    `propertySurroundings[${index}].propertyDistance`,
                  )}
                  errorMessage={
                    formik.touched.propertySurroundings &&
                    formik.errors.propertySurroundings &&
                    formik.touched.propertySurroundings[index]
                      ?.propertyDistance &&
                    formik.errors.propertySurroundings[index]?.propertyDistance
                      ? formik.errors.propertySurroundings[index]
                          .propertyDistance
                      : ''
                  }
                />
                <View style={{alignSelf: 'flex-end'}}>
                  {index > 0 && (
                    <AppButton
                      width={RF(110)}
                      height={RF(25)}
                      m_Top={RF(16)}
                      b_R={RF(8)}
                      title="Remove"
                      onPress={() => {
                        const newSurroundings =
                          formik.values.propertySurroundings.filter(
                            (_, i) => i !== index,
                          );
                        formik.setFieldValue(
                          'propertySurroundings',
                          newSurroundings,
                        );
                      }}
                    />
                  )}
                </View>
              </View>
            ))}
            <View style={{alignSelf: 'flex-end'}}>
              {formik.values.propertySurroundings.length < 3 && (
                <AppButton
                  width={RF(140)}
                  height={RF(25)}
                  m_Top={RF(16)}
                  b_R={RF(8)}
                  title="Add another Property"
                  onPress={() =>
                    formik.setFieldValue('propertySurroundings', [
                      ...formik.values.propertySurroundings,
                      {propertyName: '', propertyDistance: ''},
                    ])
                  }
                />
              )}
            </View>
            <AppButton title="Next" m_Top={RF(32)} onPress={onPress} />
          </View>
        </ScrollView>
        {loading && <CustomLoader />}
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </Wrapper>
  );
};

export default HomeFacilities;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: RF(16),
    paddingBottom: RF(30),
  },
  heading: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: RF(8),
  },
  row: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  checkboxContainer: {
    width: '50%',
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxText: {
    fontSize: 14,
  },
});
