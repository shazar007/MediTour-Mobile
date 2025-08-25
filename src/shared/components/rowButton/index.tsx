import React from 'react';
import {RF} from '@theme';
import {globalStyles} from '@services';
import ModalButton from '../ModalButton';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

const RowButton = ({
  onClose,
  title1,
  title2,
  onCancel,
}: {
  title1?: any;
  title2?: any;
  onClose: () => void;
  onCancel: any;
}) => {
  return (
    <View style={[globalStyles.row, styles.extra]}>
      <ModalButton
        bR={RF(16)}
        title={title1}
        onPress={onCancel}
        backgroundColor={'rgba(217, 217, 217, 1)'}
      />
      <TouchableOpacity style={styles.mL}>
        <ModalButton title={title2} bR={RF(16)} onPress={onClose} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  extra: {width: '85%', alignSelf: 'center', marginTop: RF(25)},
  mL: {marginLeft: 20},
});
export default RowButton;
