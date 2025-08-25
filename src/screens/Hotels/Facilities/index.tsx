import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {
  AppButton,
  CustomFloatingLabelInput,
  CustomHeader,
  CustomLoader,
  DropHotel,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {CheckBox} from 'react-native-elements';
import {Text} from '@components';
import {RF} from '@theme';
import {PKR} from '@assets';
import {globalStyles, navigate, showToast} from '@services';
import {setHotelInfo} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import {
  dataModal,
  facilitiesData,
  facilitiesData1,
  facilitiesEntire,
} from './data';
import {Alert} from '@utils';

const validationSchema = Yup.object().shape({
  parkingAvailability: Yup.string().required('Parking Availability Required'),
  priceOfParking: Yup.string().when('parkingAvailability', {
    is: 'Yes,Paid',
    then: schema => schema.required('Required'),
    otherwise: schema => schema.notRequired(),
  }),
  language: Yup.string().required('language is Required'),
  facilities: Yup.array().min(1, 'Select at least one facility'),
  propertySurroundings: Yup.array()
    .of(
      Yup.object().shape({
        propertyName: Yup.string(),
        propertyDistance: Yup.string(),
      }),
    )
    .max(3, 'You can add up to 3 properties only')
    .required('Required'),
});

const Facilities = ({route}: any) => {
  const {item, selectedItem} = route.params;
  const theme = useTheme();
  const colors: any = theme.colors;
  const dispatch = useDispatch();
  const {hotelInfo, B2B} = useSelector((state: any) => state?.root?.b2b);
  const lab = B2B?.hotel;
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
  const formik: any = useFormik({
    initialValues: {
      parkingAvailability: '',
      priceOfParking: '',
      language: '',
      facilities: [],
      propertySurroundings: [{propertyName: '', propertyDistance: ''}],
    },
    validationSchema,
    onSubmit: (values: any) => {
      handleNext(values);
      navigate('Amenities', {
        data: values,
        item: item,
        selectedItem: selectedItem,
      });
      Alert.showSuccess('Facilities info saved successfully');
    },
  });

  const onPress = () => {
    formik.validateForm().then((errors: any) => {
      if (Object.keys(errors).length) {
        const firstError: any = Object.values(errors)[0];
        Alert.showError(firstError);
      } else {
        formik.handleSubmit();
      }
    });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Facilities'}
          leftIcon
          titleColor={'#fff'}
          notify
        />

        <ScrollView>
          <View style={styles.container}>
            <Text size={14} SFmedium>
              Parking Availability
            </Text>
            <DropHotel
              name={'Parking availability'}
              data={dataModal}
              setSelectedData={(val: any) =>
                formik.setFieldValue('parkingAvailability', val)
              }
              selectedData={formik.values.parkingAvailability}
            />
            {formik.values.parkingAvailability === 'Yes,Paid' && (
              <CustomFloatingLabelInput
                m_Vertical={RF(8)}
                endIcon={PKR}
                keyboardType="numeric"
                label={'Price for Parking per day'}
                labelClr="rgba(13, 71, 161, 1)"
                value={formik.values.priceOfParking}
                onChangeText={formik.handleChange('priceOfParking')}
                onBlur={formik.handleBlur('priceOfParking')}
              />
            )}
            {formik.touched.priceOfParking && formik.errors.priceOfParking && (
              <Text style={globalStyles.errors}>
                {formik.errors.priceOfParking}
              </Text>
            )}
            <Text
              size={18}
              SFsemiBold
              color={'#0D47A1'}
              style={{marginTop: RF(16)}}>
              Language Spoken
            </Text>

            <CustomFloatingLabelInput
              m_Vertical={RF(8)}
              label={'What language your staff speak'}
              labelClr="rgba(13, 71, 161, 1)"
              value={formik.values.language}
              onChangeText={formik.handleChange('language')}
              onBlur={formik.handleBlur('language')}
            />
            {formik.touched.language && formik.errors.language && (
              <Text style={globalStyles.errors}>{formik.errors.language}</Text>
            )}
            <Text
              size={14}
              SFmedium
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
                data={
                  item === 'Apartments'
                    ? facilitiesData1
                    : selectedItem === 'Homes'
                    ? facilitiesEntire
                    : facilitiesData
                }
                renderItem={({item}: any) => (
                  <View key={item?.id} style={styles.checkboxContainer}>
                    <CheckBox
                      title={item?.label}
                      checked={formik.values.facilities.includes(item?.label)}
                      onPress={() => {
                        if (formik.values.facilities.includes(item?.label)) {
                          formik.setFieldValue(
                            'facilities',
                            formik.values.facilities.filter(
                              (facility: any) => facility !== item?.label,
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
            {formik.values.propertySurroundings.map(
              (property: any, index: any) => (
                <View key={index}>
                  <CustomFloatingLabelInput
                    m_Vertical={RF(8)}
                    label={`Property Name ${index + 1}`}
                    labelClr="rgba(13, 71, 161, 1)"
                    value={property.propertyName}
                    onChangeText={formik.handleChange(
                      `propertySurroundings[${index}].propertyName`,
                    )}
                    onBlur={formik.handleBlur(
                      `propertySurroundings[${index}].propertyName`,
                    )}
                  />

                  <CustomFloatingLabelInput
                    m_Vertical={RF(8)}
                    label={`Property Distance ${index + 1}`}
                    labelClr="rgba(13, 71, 161, 1)"
                    value={property.propertyDistance}
                    onChangeText={formik.handleChange(
                      `propertySurroundings[${index}].propertyDistance`,
                    )}
                    onBlur={formik.handleBlur(
                      `propertySurroundings[${index}].propertyDistance`,
                    )}
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
                              (_: any, i: any) => i !== index,
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
              ),
            )}
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
    </Wrapper>
  );
};

export default Facilities;

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
