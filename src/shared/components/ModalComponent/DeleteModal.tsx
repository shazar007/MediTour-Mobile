import {Modal, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {cross, crossIcon, Save} from '@assets';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import Text from '../text';
import AppButton from '../AppButton';
import CustomLoader from '../CustomLoader';

interface Props {
  clr?: any;
  Visible?: any;
  cancelPress?: any;
  deletePress?: any;
  loading?: any;
}
const DeleteModal = (props: Props) => {
  const {Visible, cancelPress, deletePress, loading} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <View>
      <Modal
        transparent={true}
        animationType="none"
        visible={Visible}
        style={{flex: 1}}>
        <View style={styles.Container}>
          <View style={styles.Container2}>
            <Text size={16} SFsemiBold color={'red'}>
              Warning!
            </Text>
            <Text size={12} SFlight center>
              This will delete permanently all your data from Meditour Global
              system.You are notified here that this operation cannot be undone!
            </Text>
            <Text size={14} SFbold>
              Delete Account
            </Text>
            <Text size={12} SFlight center>
              Are you sure you want to delete your account permanently?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: RF(16),
                marginTop: RF(16),
              }}>
              <AppButton
                width={RF(115)}
                height={RF(30)}
                title="Cacel"
                onPress={cancelPress}
                b_R={8}
              />
              <AppButton
                width={RF(115)}
                height={RF(30)}
                onPress={deletePress}
                title="Delete"
                bgClr={'red'}
                b_R={8}
              />
            </View>
          </View>
        </View>
        {loading && <CustomLoader />}
      </Modal>
    </View>
  );
};

export default DeleteModal;

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
    alignItems: 'center',
    gap: RF(4),
  },
  text: {
    marginTop: RF(16),
    width: 200,
    fontFamily: 'SF-Pro-Text-Regular ',
  },
});
