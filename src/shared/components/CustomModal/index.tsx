import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

interface Props {
  children?: any;
}

const CustomModal = (props: Props) => {
  const {children} = props;
  const {modalVisible} = useSelector((state: any) => state.root.modal);
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        {children}
      </Modal>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
