import {Image, Modal, StyleSheet, View} from 'react-native';
import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {refer} from '@assets';
import AppButton from '../AppButton';
import {navigate, referDoctorPatient, showToast} from '@services';
import CustomLoader from '../CustomLoader';

interface Props {
  clr?: any;
  Visible?: any;
  children?: any;
  title?: any;
  loading?: any;
  data?: any;
  modalizeRef?: any;
  item?: any;
  selectedDoctor: any;
  setVisible: any;
  setLoading: any;
  type: any;
}
const Referral = (props: Props) => {
  const {
    Visible,
    children,
    data,
    selectedDoctor,
    setVisible,
    setLoading,
    item,
    modalizeRef,
    loading,
    type,
  } = props;
  const submitRefer = () => {
    setLoading(true);
    let params = {
      referType: type,
      patientId: data?.patientId?._id,
      appointmentId: item?._id,
    };
    if (type === 'Doctor') {
      params = {
        ...params,
        doctorId: selectedDoctor?._id,
      };
    } else if (type === 'Hospital') {
      params = {
        ...params,
        hospitalId: selectedDoctor?._id,
      };
    } else {
      params = {
        ...params,
        specialityId: selectedDoctor?._id,
      };
    }

    referDoctorPatient(params)
      .then((res: any) => {
        //
        showToast('Successfully Refer');

        setTimeout(() => {
          setVisible(false);
          modalizeRef.current?.close();
          navigate('DoctorsAppointment');
        }, 3000);
      })
      .catch(err => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const onRefer = () => {
    submitRefer();
  };
  OnClose = () => {
    setVisible(false);
  };
  //
  return (
    <View>
      <Modal
        transparent={true}
        animationType="none"
        visible={Visible}
        style={{flex: 1}}>
        <View style={styles.Container}>
          <View style={styles.Container2}>
            <View
              style={{
                alignSelf: 'center',
              }}>
              <Image
                source={refer}
                style={{width: RF(32), height: RF(32), resizeMode: 'contain'}}
              />
            </View>
            <Text
              size={12}
              SFmedium
              color={'#00276D'}
              center
              style={{marginTop: RF(16)}}>
              Are you sure{' '}
              <Text size={14} SFmedium color={'red'} center>
                {data?.patientId?.name}{' '}
              </Text>{' '}
              refer to{' '}
              <Text size={14} SFmedium color={'red'} center>
                {' '}
                {selectedDoctor?.name
                  ? selectedDoctor?.name
                  : selectedDoctor?.specialityTitle}
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: RF(16),
                marginTop: RF(24),
                alignSelf: 'center',
              }}>
              <AppButton
                width={RF(104)}
                title="No"
                bgClr={'#FB2047'}
                height={RF(40)}
                onPress={OnClose}
                textcolor={'white'}
              />
              <AppButton
                width={RF(104)}
                title="Yes"
                bgClr={'#0B7328'}
                height={RF(40)}
                textcolor={'white'}
                onPress={onRefer}
              />
            </View>
            <View>{children}</View>
          </View>
        </View>
        {loading && <CustomLoader />}
      </Modal>
    </View>
  );
};

export default Referral;
const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(62, 62, 62, 0.4)',
  },
  Container2: {
    backgroundColor: '#fff',
    paddingHorizontal: RF(24),
    paddingVertical: RF(24),
    borderRadius: RF(12),
    marginHorizontal: RF(16),
  },
  DocProfile: {
    width: RF(48),
    height: RF(48),
    borderRadius: RF(32),
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: 'red',
  },
  text: {
    marginTop: RF(16),
    width: 200,
    fontFamily: 'SF-Pro-Text-Regular ',
  },
});
