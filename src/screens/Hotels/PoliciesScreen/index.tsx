import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Switch, ScrollView} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {
  Wrapper,
  AppButton,
  DropHotel,
  Text,
  DatePickerComponent,
  CustomFloatingLabelInput,
  SaveModal,
  CustomLoader,
  CustomHeader,
} from '@components';
import {useSelector} from 'react-redux';
import {
  AddHomeHotel,
  addApartmentAll,
  addBnbHotel,
  navigate,
  showToast,
} from '@services';
import {RF} from '@theme';
import {cancelData, selectionData} from './data';
import {clock} from '@assets';
import {Alert} from '@utils';

const PoliciesScreen = ({route}: any) => {
  const {selectedItem, item} = route.params;
  const [visible, setVisible] = useState(false);
  const {hotelInfo} = useSelector((state: any) => state.root.b2b);
  const [petsChargesApply, setPetsChargesApply] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik: any = useFormik({
    initialValues: {
      chargesPets: '',
      petsAllowed: null,
      accidentalBookingPolicy: false,
      advanceCancelfreeofCharge: '',
      petsFree: '',
      checkInFrom: '',
      checkInTo: '',
      checkOutFrom: '',
      checkOutTo: '',
      minimumStay: '',
    },
    validationSchema: Yup.object().shape({
      accidentalBookingPolicy: Yup.boolean().required(
        'Accidental Booking Policy is required',
      ),
      advanceCancelfreeofCharge: Yup.string().required(
        'Advance Cancel Free of Charge is required',
      ),
      chargesPets: Yup.string().when('petsFree', {
        is: 'No',
        then: (schema: any) => schema.required('Charges for Pets are required'),
      } as any),

      petsAllowed: Yup.string().required('Pets Allowed is required'),
      petsFree: Yup.string().when('petsAllowed', {
        is: true,
        then: (schema: any) => schema.required('Pets Free field is required'),
      } as any),
      checkInFrom: Yup.string().required('Check In From is required'),
      checkInTo: Yup.string().required('Check In To is required'),
      checkOutFrom: Yup.string().required('Check Out From is required'),
      checkOutTo: Yup.string().required('Check Out To is required'),
      minimumStay: Yup.string().required('Minimum Stay is required'),
    }),

    onSubmit: (values: any) => {
      values.petsAllowed = values.petsAllowed === true ? 'Yes' : 'No';
      setLoading(true);
      let mappedData = {
        ...hotelInfo.Facilities,
        propertyphoto: hotelInfo.propertyPhotos,
        advanceCancelfreeofCharge: '1 day before arrival',
        accidentalBookingPolicy: values.accidentalBookingPolicy,
        minimumStay: values.minimumStay,
        policies: {
          checkInFrom: values.checkInFrom,
          checkInTo: values.checkInTo,
          checkOutFrom: values.checkOutFrom,
          checkOutTo: values.checkOutTo,
        },
        pets: values.petsAllowed,
        chargesOfPets: values.chargesPets,
      };
      if (values.petsAllowed === true) {
        mappedData.stayOfPets = values.petsFree;
      }
      if (selectedItem === 'Hotels, B&Bs & More') {
        mappedData = {
          ...mappedData,
          ...hotelInfo?.object,
          rooms: [{...hotelInfo.hotelRoom}],

          ...hotelInfo?.Ame,
        };
        addBnbHotel(mappedData)
          .then(res => {
            setVisible(true);
            setTimeout(() => {
              setVisible(false);
              navigate('PropertyBnb');
            }, 2000);
          })
          .catch(err => {
            Alert.showError(err?.response?.data?.message);
            setLoading(false);
          });
      } else if (item === 'Apartments') {
        mappedData = {
          ...mappedData,
          ...hotelInfo?.object,
          amenities: hotelInfo?.Ame?.amenities,
          apartments: [
            {
              ...hotelInfo.apartment,
            },
          ],
        };
        addApartmentAll(mappedData)
          .then(res => {
            setVisible(true);
            setTimeout(() => {
              setVisible(false);
              navigate('PropertyBnb');
            }, 2000);
          })
          .catch(err => {
            setLoading(false);
            Alert.showError(err?.response?.data?.message);
          });
      } else {
        mappedData = {
          ...mappedData,
          ...hotelInfo?.object,
          ...hotelInfo.entirePlace,
          amenities: hotelInfo?.Ame?.amenities,
        };
        AddHomeHotel(mappedData)
          .then(res => {
            setVisible(true);
            setTimeout(() => {
              setVisible(false);
              navigate('PropertyBnb');
            }, 2000);
          })
          .catch(err => {
            setLoading(false);
            Alert.showError(err?.response?.data?.message);
          });
      }
    },
  });

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader title={'Policies'} leftIcon titleColor={'#fff'} notify />
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.heading}>Policies</Text>
            <Text style={styles.subHeading}>
              Specify some basic policies. Do you allow children or pets? How
              flexible are you with cancellation?
            </Text>
            <Text style={styles.label}>
              How many days in advance can guests cancel free of charge?
            </Text>
            <DropHotel
              name={'One day before arrival'}
              data={cancelData}
              setSelectedData={(value: any) =>
                formik.setFieldValue('advanceCancelfreeofCharge', value)
              }
              selectedData={formik.values.advanceCancelfreeofCharge}
            />
            {formik.touched.advanceCancelfreeofCharge &&
              formik.errors.advanceCancelfreeofCharge && (
                <Text style={styles.errorText}>
                  {formik.errors.advanceCancelfreeofCharge}
                </Text>
              )}
            <View style={styles.policyContainer}>
              <Text color={'#00276D'} style={{fontSize: RF(16)}}>
                Accidental Booking Policy
              </Text>
              <Switch
                value={formik.values.accidentalBookingPolicy}
                onValueChange={(value: any) =>
                  formik.setFieldValue('accidentalBookingPolicy', value)
                }
              />
              {formik.touched.accidentalBookingPolicy &&
              formik.errors.accidentalBookingPolicy ? (
                <Text style={styles.errorText}>
                  {formik.errors.accidentalBookingPolicy}
                </Text>
              ) : null}
            </View>
            <Text style={styles.heading}>Check-in/Check-out Policies</Text>
            <View style={styles.pickerContainer}>
              <DatePickerComponent
                title={'Check-in from'}
                modeTrue={'time'}
                source={clock}
                selectedTime={formik.values.checkInFrom}
                setTime={(time: any) =>
                  formik.setFieldValue('checkInFrom', time)
                }
              />
              <DatePickerComponent
                title={'Check in to'}
                modeTrue={'time'}
                source={clock}
                selectedTime={formik.values.checkInTo}
                setTime={(time: any) => formik.setFieldValue('checkInTo', time)}
              />
              <DatePickerComponent
                title={'Check out from'}
                modeTrue={'time'}
                source={clock}
                selectedTime={formik.values.checkOutFrom}
                setTime={(time: any) =>
                  formik.setFieldValue('checkOutFrom', time)
                }
              />
              <DatePickerComponent
                title={'Check out to'}
                modeTrue={'time'}
                source={clock}
                selectedTime={formik.values.checkOutTo}
                setTime={(time: any) =>
                  formik.setFieldValue('checkOutTo', time)
                }
              />
            </View>

            <Text style={styles.heading}>Pets</Text>
            <Text style={styles.label}>
              Some guests like to travel with their furry friends, indicate if
              you allow pets and if any charges apply.
            </Text>
            <View style={styles.checkBoxContainer}>
              <CheckBox
                title="Yes"
                checked={formik.values.petsAllowed === true}
                onPress={() => formik.setFieldValue('petsAllowed', true)}
                containerStyle={styles.checkBox}
              />
              <CheckBox
                title="No"
                checked={formik.values.petsAllowed === false}
                onPress={() => {
                  formik.setFieldValue('petsAllowed', false);
                  formik.setFieldValue('petsFree', '');
                  formik.setFieldValue('chargesPets', '');
                  setPetsChargesApply(false);
                }}
                containerStyle={styles.checkBox}
              />
            </View>
            {formik.touched.petsAllowed && formik.errors.petsAllowed && (
              <Text style={styles.errorText}>{formik.errors.petsAllowed}</Text>
            )}

            {formik.values.petsAllowed && (
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Pets can stay for free</Text>
                <DropHotel
                  name={'Select option'}
                  data={selectionData}
                  setSelectedData={(itemValue: any) => {
                    formik.setFieldValue('petsFree', itemValue);
                    setPetsChargesApply(itemValue === 'No');
                  }}
                  selectedData={formik.values.petsFree}
                />
              </View>
            )}
            {formik.touched.petsFree && formik.errors.petsFree && (
              <Text style={styles.errorText}>{formik.errors.petsFree}</Text>
            )}

            {petsChargesApply && (
              <TextInput
                style={styles.input}
                placeholder="Charges"
                keyboardType="numeric"
                value={formik.values.chargesPets}
                onChangeText={formik.handleChange('chargesPets')}
                onBlur={formik.handleBlur('chargesPets')}
              />
            )}
            {formik.touched.chargesPets && formik.errors.chargesPets && (
              <Text style={styles.errorText}>{formik.errors.chargesPets}</Text>
            )}

            <View>
              <Text color={'#0D47A1'} size={18}>
                Minimum stay
              </Text>
              <Text style={{marginTop: RF(8)}}>
                Do you require a minimum stay for your guest
              </Text>
            </View>
            <CustomFloatingLabelInput
              label={'Minimum Stay'}
              labelClr="rgba(13, 71, 161, 1)"
              value={formik.values.minimumStay}
              onChangeText={formik.handleChange('minimumStay')}
            />
            {formik.touched.minimumStay && formik.errors.minimumStay && (
              <Text style={styles.errorText}>{formik.errors.minimumStay}</Text>
            )}
            <AppButton
              title="Submit"
              onPress={formik.handleSubmit}
              m_Top={RF(16)}
            />
          </View>
        </ScrollView>
        {loading && <CustomLoader />}
      </View>
      {visible && (
        <SaveModal
          Visible={visible}
          title={
            'Congratulations, its time to relax and put your feet up as you have completed your registration'
          }
        />
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    color: '#0D47A1',
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 14,
    marginBottom: 20,
    color: '#0D47A1',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#0D47A1',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    textAlign: 'right',
    color: '#0D47A1',
    marginBottom: 20,
  },
  policyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: RF(16),
  },
  policyLabel: {
    fontSize: 16,
    color: '#0D47A1',
  },
  pickerContainer: {
    marginBottom: 20,
    marginTop: RF(8),
  },
  pickerLabel: {
    fontSize: 16,
    color: '#0D47A1',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
    marginRight: 20,
  },
  datePickerLabel: {
    fontSize: 16,
    color: '#0D47A1',
    marginBottom: 5,
  },
  datePickerValue: {
    fontSize: 14,
    color: '#0D47A1',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
});

export default PoliciesScreen;
