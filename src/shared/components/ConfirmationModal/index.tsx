import React from 'react';
import {View, Modal, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {del} from '@assets';
import {RF} from '@theme';
import Text from '../text';
const ConfirmationModal = ({
  visible,
  onCancel,
  onConfirm,
  flightType,
  flightIndex,
}: {
  visible?: any;
  onCancel?: any;
  onConfirm?: any;
  flightType?: any;
  flightIndex?: any;
}) => (
  <Modal visible={visible} transparent={true} animationType="fade">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Image source={del} style={styles.modalIcon} />
        <Text size={16} SFmedium color={'#0D47A1'}>
          Are you sure?
        </Text>
        <Text size={14} SFregular color={'#0D47A1'}>
          You want to delete this "
          {flightType === 'Direct' ? 'Flight' : `Flight ${flightIndex + 1}`}"?
        </Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text size={12} SFmedium color={'#0D47A1'}>
              No, Keep it.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={onConfirm}>
            <Text size={12} SFlight color={'#fff'}>
              Yes, Delete!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    gap: RF(8),
  },
  modalIcon: {
    width: RF(20),
    height: RF(20),
    resizeMode: 'contain',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: RF(8),
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ConfirmationModal;
