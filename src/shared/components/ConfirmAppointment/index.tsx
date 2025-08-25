import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import Text from '../text';
import {LAYOUT, RF} from '@theme';
import AppButton from '../AppButton';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  showModal?: any;
  onRequestClose?: any;
  onPress?: any;
  CheckAppointment?: any;
  handleModalContentPress?: any;
}

const ConfirmAppointment = ({
  onPress,
  showModal,
  onRequestClose,
  CheckAppointment,
  handleModalContentPress,
}: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;

  return (
    <View>
      <Modal
        transparent={true}
        visible={showModal}
        animationType="slide"
        onRequestClose={onRequestClose}>
        <TouchableWithoutFeedback onPress={handleModalContentPress}>
          <View style={styles.Container}>
            <LinearGradient
              colors={['rgba(45, 45, 45, 3)', 'rgba(62, 62, 62, 1)']}
              style={styles.Container2}>
              <View>
                <Text
                  size={18}
                  SFmedium
                  color={colors.background}
                  style={styles.text}>
                  Your Appointment has been Scheduled
                </Text>
                <TouchableOpacity onPress={CheckAppointment}>
                  <Text
                    size={22}
                    SFbold
                    color={colors.background}
                    style={styles.textStyle}>
                    VIEW APPOINTMENT
                  </Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <AppButton m_Vertical={24} onPress={onPress} title="CONFIRM" />
    </View>
  );
};

export default ConfirmAppointment;

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#3E3E3E66',
  },
  Container2: {
    width: '90%',
    height: '30%',
    borderRadius: LAYOUT.RADIUS.SelectCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {lineHeight: RF(24), textAlign: 'center'},
  textStyle: {
    marginTop: LAYOUT.MARGIN.VERYHIGH,
    textDecorationLine: 'underline',
  },
});
