import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import AppButton from '../AppButton';
import {globalStyles} from '@services';
import {Modal, View} from 'react-native';
import {useTheme} from 'react-native-elements';

const DelSave_Modal = ({
  simpleModal,
  setSimpleModal,
  handleDelete,
  title,
}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;

  return (
    <>
      <Modal visible={simpleModal} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: RF(24),
          }}>
          <View
            style={{
              height: 179,
              width: '100%',
              justifyContent: 'center',
              backgroundColor: '#ffff',
              borderRadius: 12,
              padding: RF(20),
            }}>
            <Text center SFbold color={colors?.primary} size={16}>
              Are you sure?
            </Text>
            <Text center SFmedium color={colors?.primary} size={12}>
              You want to delete this "{title}"
            </Text>
            <View
              style={{
                marginTop: RF(24),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <AppButton
                title="No Keep it!"
                width={'35%'}
                height={RF(35)}
                onPress={() => setSimpleModal(false)}
                containerStyle={{backgroundColor: '#006838'}}
              />
              <AppButton
                width={'35%'}
                height={RF(35)}
                title="Yes Delete!"
                onPress={handleDelete}
                containerStyle={{backgroundColor: 'red'}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DelSave_Modal;
