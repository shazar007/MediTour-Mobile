import {Modal, StyleSheet,  TouchableOpacity, View} from 'react-native';
import React from 'react';
import { RF } from '@theme';
import Text from '../text';

const RejectedModal = ({
  onCancel,
  declineRequest,
  visible,
  onRequestClose,
}: {
  onCancel?: any;
  declineRequest?: any;
  visible?: any;
  onRequestClose?: any;
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onRequestClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text size={12} SFregular color={'#00276D'}>
            Are you sure?
          </Text>
          <Text size={12} SFregular color={'#00276D'}>
            You want to delete this "Request"
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text size={12} SFregular color={'#00276D'}>
                No. Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={declineRequest}>
              <Text size={12} SFregular color={'#fff'}>
                Yes, Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RejectedModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: RF(20),
    borderRadius: RF(10),
    alignItems: 'center',
    width: '80%',
    gap: RF(8),
  },
  modalTitle: {
    fontSize: RF(18),
    fontWeight: 'bold',
    marginBottom: RF(10),
  },
  modalMessage: {
    fontSize: RF(14),
    color: '#7D7D7D',
    marginBottom: RF(20),
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: RF(10),
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
    padding: RF(10),
    borderRadius: RF(5),
  },
  cancelButtonText: {
    color: '#000',
  },
  deleteButton: {
    backgroundColor: '#D2092D',
    padding: RF(10),
    borderRadius: RF(5),
  },
});
