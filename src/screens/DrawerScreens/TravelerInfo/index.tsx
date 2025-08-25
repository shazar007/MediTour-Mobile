import {StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import {
  AppButton,
  CustomHeader,
  CustomModalize,
  HeaderCard,
  InputData,
  LocationModal,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {LabCalender, UserIcon, circum, live, phone} from '@assets';
import {RF} from '@theme';
import {useDispatch, useSelector} from 'react-redux';
import {acceptFlightBid, navigate, rs, showToast} from '@services';
import {differenceInYears} from 'date-fns';
import {setAmount, setStripeObj} from '@redux';
import {useTheme} from 'react-native-paper';

const TravelerInfo = ({route}: any) => {
  const {item, totalTravelers, travelers} = route.params;
  const modalizeRef: any = useRef(null);
  const dispatch: any = useDispatch();
  const theme: any = useTheme();
  const colors = theme.colors;
  const {user, selectedAddress, userAge} = useSelector(
    (state: any) => state.root.user,
  );
  const onSelectLocation = () => {
    // onOpen();
  };

  const dateOfBirh = user?.dateOfBirth;

  const calculatedAge = differenceInYears(new Date(), dateOfBirh);

  const transformTravellers = (travellers: any) => {
    return travellers.map((traveler: any) => ({
      name: traveler.name,
      passportNo: traveler.passportNo,
      visaFile: traveler.visaFile.uri,
      passportFile: traveler.passportFile.uri,
    }));
  };
  const transformedTravellers = transformTravellers(travelers);

  const onClose = () => {
    modalizeRef.current?.close();
  };
  const sendDetails = () => {
    let data = {
      bidRequestId: item?._id,
    };
    let params = {
      name: user?.name,
      email: user?.email,
      address: user?.address?.address,
      travellers: transformedTravellers,
      age: calculatedAge?.toString(),
      phone: user?.phone,
      totalAmount: item?.ticketPrice,
    };
    dispatch(setAmount(item?.ticketPrice));
    dispatch(setStripeObj({data: data, params: params, item: item}));
    navigate('StripeAlFalah', {
      type: 'flights',
      actualAmount: item?.ticketPrice,
      travelers: travelers,
    });
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader title={'Booking'} leftIcon titleColor={'#fff'} notify />

      <View style={styles.TopView}>
        <InputData UserName={user?.name} source={UserIcon} />
        <InputData UserName={user?.email} source={circum} />
        <InputData UserName={userAge + ' years old'} source={LabCalender} />
        <InputData
          source={live}
          width={RF(20)}
          height={RF(20)}
          style={{width: '100%', paddingRight: 20}}
          onPress={onSelectLocation}
          UserName={selectedAddress?.address}
        />
        <InputData UserName={user?.phone} source={phone} />
        <AppButton
          title="Continue"
          onPress={() => sendDetails()}
          m_Top={RF(32)}
        />
      </View>
      <CustomModalize ref={modalizeRef} height={700}>
        <LocationModal onClose={onClose} />
      </CustomModalize>
    </Wrapper>
  );
};

export default TravelerInfo;

const styles = StyleSheet.create({
  TopView: {
    margin: rs(16),
    paddingBottom: RF(40),
  },
});
