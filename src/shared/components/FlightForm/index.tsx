import React, {useState} from 'react';
import {View, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import {cal, clock, plus} from '@assets';
import CheckBox from '@react-native-community/checkbox';
import useStyles from './styles';
import {del, edit2} from '@assets';
import Collapsible from 'react-native-collapsible';
import * as Animatable from 'react-native-animatable';
import {amenitiesOptions} from '@services';
import CustomFloatingLabelInput from '../floatingLabelInput';
import Text from '../text';
import {
  ConfirmationModal,
  DatePickerComponent,
  FlightDetail,
  LogoComponent,
} from '@components';
import {RF} from '@theme';
import {format} from 'date-fns';
const FlightForm = ({
  flightType,
  formik,
  returnEditMode,
  handleSubmit,
  setLoading,
  flights,
  setCurrentIndex,
  flightsReturn,
  handleEditFlight,
  formVisible,
  handleDeleteFlight,
  addForm,
  setModalVisible,
  modalVisible,
  showText,
}: {
  flightType?: any;
  formik?: any;
  returnEditMode?: any;
  handleSubmit?: any;
  setLoading?: any;
  flights?: any;
  setCurrentIndex?: any;
  handleEditFlight?: any;
  formVisible?: any;
  handleDeleteFlight?: any;
  addForm?: any;
  setModalVisible?: any;
  modalVisible?: any;
  showText?: any;
  flightsReturn?: any;
}) => {
  const styles = useStyles();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [fileName, setFileName] = useState<string>('');
  const toggleExpanded = (index: any) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
  };
  const handleAmenityChange = (amenity: any, checked: any) => {
    if (checked) {
      formik.setFieldValue('amenities', [...formik.values.amenities, amenity]);
    } else {
      formik.setFieldValue(
        'amenities',
        formik.values.amenities.filter((item: any) => item !== amenity),
      );
    }
  };
  const confirmDeleteFlight = (index: any) => {
    setCurrentIndex(index);
    if (flightsReturn?.length > 0) {
      ToastAndroid.show(
        'Please delete the return flight before deleting the flight.',
        ToastAndroid.SHORT,
      );
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  };
  const formatDate = (date: any) => format(new Date(date), 'yyyy-MM-dd');
  return (
    <>
      {formVisible && (
        <View style={styles.flightDetails}>
          <View style={styles.rowButt}>
            <Text size={16} SFmedium color={'#0D47A1'}>
              {flightType}
            </Text>
          </View>
          <View style={{marginTop: RF(8), gap: RF(4)}}>
            <Text size={14} SFmedium>
              Flight
            </Text>
            <CustomFloatingLabelInput
              label={'Company Name'}
              bdClr={'#0D47A1'}
              value={formik?.values?.companyName}
              onChangeText={(value: any) =>
                formik.setFieldValue('companyName', value)
              }
            />
            <LogoComponent
              setLoading={setLoading}
              fileName={fileName}
              setFileName={setFileName}
              url={formik?.values?.companyLogo}
              setUrl={(value: any) =>
                formik.setFieldValue('companyLogo', value)
              }
            />
            <View style={{gap: RF(4)}}>
              <CustomFloatingLabelInput
                label={'From'}
                bdClr={'#0D47A1'}
                value={formik?.values?.from}
                onChangeText={(value: any) =>
                  formik.setFieldValue('from', value)
                }
              />
              <CustomFloatingLabelInput
                label={'To'}
                bdClr={'#0D47A1'}
                value={formik?.values?.to}
                onChangeText={(value: any) => formik.setFieldValue('to', value)}
              />
              <DatePickerComponent
                title={'Departure Date'}
                modeTrue={'date'}
                source={cal}
                selectedTime={formik.values.departureDate}
                setTime={(date: any) =>
                  formik.setFieldValue('departureDate', formatDate(date))
                }
              />
              <DatePickerComponent
                title={'Departure Time'}
                modeTrue={'time'}
                source={clock}
                selectedTime={formik.values.departureTime}
                setTime={(time: any) =>
                  formik.setFieldValue('departureTime', time)
                }
              />

              <DatePickerComponent
                title={'Arrival Date'}
                modeTrue={'date'}
                source={cal}
                selectedTime={formik.values.arrivalDate}
                setTime={(date: any) =>
                  formik.setFieldValue('arrivalDate', formatDate(date))
                }
              />
              <DatePickerComponent
                title={'Arrival Time'}
                modeTrue={'time'}
                source={clock}
                selectedTime={formik.values.arrivalTime}
                setTime={(time: any) =>
                  formik.setFieldValue('arrivalTime', time)
                }
              />
              <CustomFloatingLabelInput
                label={'Flight No.'}
                bdClr={'#0D47A1'}
                value={formik?.values?.flightNo}
                onChangeText={(value: any) =>
                  formik.setFieldValue('flightNo', value)
                }
              />
              <Text
                size={14}
                SFmedium
                color={'#0E54A3'}
                style={{marginTop: RF(16)}}>
                Flight Amenities
              </Text>
              {amenitiesOptions.map(amenity => (
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    tintColors={{true: '#FF7631', false: '#00276D'}}
                    value={formik.values.amenities.includes(amenity)}
                    onValueChange={(checked: any) =>
                      handleAmenityChange(amenity, checked)
                    }
                  />
                  <Text size={14} SFmedium color={'#0D47A1'}>
                    {amenity}
                  </Text>
                </View>
              ))}
              <CustomFloatingLabelInput
                label={'No. of Handbag'}
                bdClr={'#0D47A1'}
                value={formik.values.noOfHandbag}
                onChangeText={(value: any) =>
                  formik.setFieldValue('noOfHandbag', value)
                }
              />
              <CustomFloatingLabelInput
                label={'Baggage Weight'}
                bdClr={'#0D47A1'}
                value={formik?.values?.baggageWeight}
                onChangeText={(value: any) =>
                  formik.setFieldValue('baggageWeight', value)
                }
              />
              <TouchableOpacity
                style={styles.stayFlight}
                onPress={handleSubmit}>
                <Text color={'#fff'}>
                  {formik.editIndex !== null ? 'Save' : 'Update'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {!formVisible && !returnEditMode && (
        <>
          <View>
            {showText && (
              <Text size={14} SFmedium color={'#0D47A1'}>
                Return Flight
              </Text>
            )}
          </View>
          <Text
            size={16}
            SFmedium
            color={'#0D47A1'}
            style={{paddingBottom: RF(8)}}>
            {flightType}
          </Text>
          {flights.map((flight: any, index: any) => (
            <>
              <View
                key={index}
                style={[
                  styles.container,
                  {marginVertical: flights ? RF(4) : RF(0)},
                ]}>
                <TouchableOpacity
                  onPress={() => toggleExpanded(index)}
                  style={styles.header}>
                  <Text size={14} SFregular color={'#0E54A3'}>
                    {`Flight ${index + 1}`}
                  </Text>
                  <View style={styles.rowStyle}>
                    <TouchableOpacity onPress={() => handleEditFlight(index)}>
                      <Image source={edit2} style={styles.edit} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => confirmDeleteFlight(index)}>
                      <Image source={del} style={styles.del} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
                <Collapsible collapsed={expandedIndex !== index} align="center">
                  <Animatable.View
                    animation={
                      expandedIndex === index ? 'fadeInDown' : undefined
                    }
                    duration={300}
                    style={styles.content}>
                    <FlightDetail flight={flight} fileName={fileName} />
                  </Animatable.View>
                </Collapsible>
              </View>
            </>
          ))}
          {flights.length > 0 && !formVisible && flightType === 'Stay' && (
            <TouchableOpacity style={styles.add} onPress={addForm}>
              <Image
                source={plus}
                tintColor={'#00276D'}
                style={styles.PlusIcon}
              />
              <Text size={14} SFmedium color={'#00276D'}>
                Add More
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}

      <ConfirmationModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onConfirm={handleDeleteFlight}
      />
    </>
  );
};

export default FlightForm;
