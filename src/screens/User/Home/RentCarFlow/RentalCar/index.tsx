import React, {useRef, useState} from 'react';
import {View, Switch, FlatList, Modal} from 'react-native';
import {
  Text,
  AppButton,
  Wrapper,
  HeaderCard,
  UserHeaderContent,
  LocationComponent,
  AppTextInput,
  CustomModalize,
  CheckBox,
  CheckButton,
  CustomHeader,
} from '@components';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {navigate, rs, showToast} from '@services';
import {Modalize} from 'react-native-modalize';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {genericData_props} from './data';
import {RF} from '@theme';
import {Alert} from '@utils';

const RentalCar = ({route}: any) => {
  const {data, type} = route.params;
  const {name, phoneNo, age} = route.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles();
  const [isEnabled, setIsEnabled] = useState(false);
  const [locType, setLocType] = useState('');
  const [pickupDate, setPickupDate] = useState<any>(
    'Pickup Date & Time' || new Date(),
  );
  const [dropOffDate, setDropOffDate] = useState<any>(
    'Drop-off Date & Time' || new Date(),
  );
  const [dateTimeType, setDateTimeType] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [selected, setSelected] = useState('');
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const calculateDays = () => {
    const start = moment(pickupDate).toISOString();
    const end = moment(dropOffDate).toISOString();
    return moment(end).diff(moment(start), 'days') + 1;
  };

  const calculate_amountPerDay = calculateDays() * data?.actualPricePerDay;
  const openLocation = (type: any) => {
    setModalVisible(true);
    setLocType(type);
  };

  const openDateTimePicker = (type: any) => {
    setDateTimePickerVisible(true);
    setDateTimeType(type);
  };

  const onChangeLocation = (data: any) => {
    let vals = data?.description
      .split(',')
      .map((item: any) => item.trim())
      .join(', ');

    if (locType == 'PickupLocation') {
      setPickupLocation(vals);
    } else {
      setDropoffLocation(vals);
    }
    setModalVisible(false);
  };

  const handleDateConfirm = async (date: any) => {
    if (dateTimeType == 'pickUpDateTime') {
      setPickupDate(date);
    } else {
      setDropOffDate(date);
    }
    setDateTimePickerVisible(false);
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisible(false);
  };

  //

  const handleContinue = () => {
    if (
      pickupLocation == '' ||
      pickupDate === 'Pickup Date & Time' ||
      (!isEnabled && dropoffLocation === '') ||
      dropOffDate === 'Drop-off Date & Time'
    ) {
      Alert.showError('Please fill all fields');
    } else if (pickupDate === dropOffDate) {
      Alert.showError('pickup and drop off date must be different');
    } else if (selected === '') {
      Alert.showError('will you prefer a driver');
    } else if (dropOffDate < pickupDate) {
      Alert.showError('dropofDate must be greater');
    } else {
      let pickDate = moment(pickupDate).format('MM/DD/YYYY,hh:mm A');
      let dropDate = moment(dropOffDate).format('MM/DD/YYYY,hh:mm A');
      const newData = {
        name,
        phoneNo,
        age,
        data,
        calculate_amountPerDay,
        pickupLocation,
        isEnabled,
        dropoffLocation: isEnabled ? pickupLocation : dropoffLocation,
        pickDate,
        dropDate,
        type,
        selected,
      };
      navigate('PaymentDetails', newData);
    }
  };

  const handleCheckbox = (type: any) => {
    setSelected(type);
  };

  const handleGeneric = {
    pickupLocation,
    pickupDate: pickupDate || moment(pickupDate).format('DD/MM/YYYY, hh:mm A'),
    dropoffLocation,
    dropOffDate:
      dropOffDate || moment(dropOffDate).format('DD/MM/YYYY, hh:mm A'),
    openLocation,
    openDateTimePicker,
  };

  const filteredData = genericData_props(handleGeneric).filter(
    (item: any, index: number) => !(isEnabled && index === 2),
  );

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Car Rental Details'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <View style={styles.Container}>
        <Text size={14} SFmedium color={colors.primary}>
          Return to same location
        </Text>
        <Switch
          style={{transform: [{scaleX: 1.1}, {scaleY: 1.1}]}}
          trackColor={{false: '#767577', true: '#00276D'}}
          thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsEnabled(!isEnabled)}
          value={isEnabled}
        />
      </View>

      <FlatList
        style={{marginHorizontal: rs(16)}}
        data={filteredData}
        renderItem={({item}: any) => {
          return (
            <AppTextInput
              editable={item?.editable}
              value={item?.value}
              placeholder={item?.placeholder}
              startIcon={item?.startIcon}
              AllPress={item?.AllPress}
            />
          );
        }}
        ListFooterComponent={
          <View style={{marginTop: 20}}>
            <Text SFbold size={14}>
              Need a Driver?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 24,
                marginTop: 10,
              }}>
              <CheckButton
                title={'Yes'}
                selected={selected}
                onPress={() => handleCheckbox('Yes')}
              />
              <CheckButton
                title={'No'}
                selected={selected}
                onPress={() => handleCheckbox('No')}
              />
            </View>

            <AppButton
              title={'Continue'}
              onPress={handleContinue}
              m_Top={RF(40)}
            />
          </View>
        }
      />

      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            padding: rs(16),
            flex: 1,
          }}>
          <LocationComponent
            title={''}
            onChange={onChangeLocation}
            noAutoFocus
            disable
          />
        </View>
      </Modal>

      {/* <CustomModalize ref={modalizeRef} height={700}> */}

      {/* </CustomModalize> */}

      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={hideDateTimePicker}
      />
    </Wrapper>
  );
};

export default RentalCar;
