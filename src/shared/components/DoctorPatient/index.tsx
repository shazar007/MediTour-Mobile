// import {ZegoSendCallInvitationButton} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {Alert, Image, Linking, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../text';
import Line from '../Line';
import {RF} from '@theme';
import {clock, vendorCalender} from '@assets';
import moment from 'moment';
import WebView from 'react-native-webview';
import {useSelector} from 'react-redux';
const DoctorPatient = ({data}: {data?: any}) => {
  function calculateAge(dateOfBirthString: string) {
    if (!dateOfBirthString) return 'Date of birth not provided';
    const [day, month, year] = dateOfBirthString.split('/').map(Number);
    const dateOfBirth = new Date(year, month - 1, day);
    const ageDate = new Date(Date.now() - dateOfBirth.getTime());
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  }
  const {user} = useSelector((state: any) => state?.root?.user);
  const goToLink = async () => {
    const url = `https://meditour.global/Meeting/Room?patientId=${data?._id}&doctorName=${user?.name}&callerName=${data?.patientId?.name}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.TopView}>
      {/* <View style={{alignItems: 'center'}}>
        <Text size={16} SFsemiBold color={'#0D47A1'}>
          {data?.doctorId?.name}
        </Text>
        <Text size={12} SFregular color={'#92929D'}>
          {data?.doctorId?.doctorType}
        </Text>
        <Text size={12} SFregular color={'#0D47A1'}>
          {data?.doctorId?.qualifications}
        </Text>
      </View> */}
      <Text size={14} SFmedium center color={'#0D47A1'}>
        Appointment Details
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.View}>
          <Image source={vendorCalender} style={styles.Calender} />
          <Text size={14} SFmedium color={'#0D47A1'}>
            {moment(data?.appointmentDateAndTime).format('MM/DD/YYYY')}
          </Text>
        </View>
        <View style={styles.ViewImageDe}>
          <Image source={clock} style={styles.ClockImage} />
          <Text size={14} SFmedium color={'#0D47A1'}>
            {moment(data?.appointmentDateAndTime).format('h:mmA')}
          </Text>
        </View>
      </View>
      <Text center size={16} SFmedium color={'#0D47A1'}>
        {data?.appointmentType}
      </Text>
      <Line colors={'rgba(146, 146, 157, 0.56)'} mt={RF(16)} />
      <View style={{alignItems: 'center', marginTop: RF(16)}}>
        <Text size={16} SFmedium color={'#0D47A1'}>
          Patient Name
        </Text>
        <Text size={12} SFregular color={'#0D47A1'}>
          {data?.patientId?.name}
        </Text>
      </View>
      <View style={styles.ViewCom}>
        <View style={styles.AgeView}>
          <Text size={12} SFregular color={'#0D47A1'}>
            Age:
            <Text size={12} SFregular color={'#0D47A1'}>
              {calculateAge(data?.patientId?.dateOfBirth)}
            </Text>
          </Text>
        </View>
        <View style={styles.TsxGender}>
          <Text size={12} SFregular color={'#0D47A1'}>
            Gender:
            <Text size={12} SFregular color={'#0D47A1'}>
              {data?.patientId?.gender}
            </Text>
          </Text>
        </View>
      </View>
      {data?.appointmentType === 'video' && (
        <Pressable style={styles.vStyle} onPress={goToLink}>
          <Text>Video</Text>
          {/* <ZegoSendCallInvitationButton
            invitees={[
              {
                userID: data?.patientId?.phone,
                userName: data?.patientId?.name,
              },
            ]}
            isVideoCall={true}
            resourceID={'zego_uikit_call'}
          /> */}
        </Pressable>
      )}
    </View>
  );
};

export default DoctorPatient;

const styles = StyleSheet.create({
  TopView: {
    marginHorizontal: RF(24),
    marginTop: RF(24),
    backgroundColor: 'rgba(255, 255, 255, 1)',
    elevation: 2,
    borderRadius: RF(8),
    padding: RF(8),
  },
  TsxGender: {
    flexDirection: 'row',
    gap: RF(10),
    alignItems: 'center',
  },
  Calender: {
    width: RF(12),
    height: RF(12),
    resizeMode: 'contain',
  },
  vStyle: {
    width: RF(54),
    height: RF(40),
    elevation: 1,
    backgroundColor: '#fff',
    borderRadius: RF(8),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: RF(16),
  },
  View: {
    flexDirection: 'row',
    gap: RF(10),
    alignItems: 'center',
  },
  ViewImageDe: {
    flexDirection: 'row',
    gap: RF(10),
    alignItems: 'center',
  },
  ClockImage: {
    width: RF(12),
    height: RF(12),
    resizeMode: 'contain',
  },
  AgeView: {
    flexDirection: 'row',
    gap: RF(10),
    alignItems: 'center',
  },
  ViewCom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RF(8),
  },
});
