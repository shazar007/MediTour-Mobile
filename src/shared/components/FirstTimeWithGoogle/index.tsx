import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {privacy} from '@assets';
import {navigate, rs, rv} from '@services';

const FirstTimeWithGoogle = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const handleSetPassword = () => {
    setModalVisible(false);
    navigate('ChangePassword');
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.backdrop}>
        <Animatable.View
          animation="zoomIn"
          duration={500}
          style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Icon name="x" size={24} color="#999999" />
          </TouchableOpacity>

          <Image source={privacy} style={styles.iconStyle} />

          <Text style={styles.title}>Your Account is might be at Risk</Text>

          <Text style={styles.message}>
            Please set a password to secure your account.
          </Text>

          <TouchableOpacity
            onPress={handleSetPassword}
            style={{alignSelf: 'stretch'}}>
            <LinearGradient
              colors={['#0066CC', '#005BB5']}
              style={styles.button}>
              <Text style={styles.buttonText}>Set Password</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </Modal>
  );
};

export default FirstTimeWithGoogle;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: rs(20),
    padding: rs(20),
    alignItems: 'center',
    elevation: 10,
  },
  iconStyle: {
    width: rs(80),
    height: rv(80),
    marginBottom: 16,
    tintColor: 'red',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: rv(24),
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#0066CC',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: 'stretch',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
});
