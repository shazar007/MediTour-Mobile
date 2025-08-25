import {Linking, Modal, Platform, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {rs, rv} from '@services';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import UserAgreement from '../ModalComponent/UserAgreement';
import {useSelector} from 'react-redux';
import VendorAgreement from '../ModalComponent/VendorAgreement';

const TermsAndCondition = ({
  setCheckBoxState,
  checkBoxState,
}: {
  setCheckBoxState?: any;
  checkBoxState?: any;
}) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [modalOpen, setModal] = useState(false);
  const {changeStack} = useSelector((state: any) => state.root.shiftStack);

  const openPrivacyPolicy = () => {
    const url = 'https://meditour.global/privactpolicys';
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };
  const openCheckBox = (value: any) => {
    setCheckBoxState && setCheckBoxState(value);
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: rv(16),
          alignItems: 'center',
        }}>
        <CheckBox
          boxType={Platform.OS === 'ios' ? 'circle' : 'square'}
          value={checkBoxState}
          tintColors={{true: colors.primary, false: '#D9D9D9'}}
          onValueChange={newValue => openCheckBox(newValue)}
        />
        <Text size={9} SFregular color={'#000'}>
          I agree to MediTour{' '}
          <Text
            size={10}
            SFregular
            color={'orange'}
            style={{textDecorationLine: 'underline'}}
            onPress={() => setModal(true)}>
            Terms & Conditions
          </Text>{' '}
          and{' '}
          <Text
            size={10}
            onPress={openPrivacyPolicy}
            SFregular
            color={'orange'}
            style={{textDecorationLine: 'underline'}}>
            Privacy Policy
          </Text>
        </Text>
      </View>

      <Modal
        transparent={true}
        animationType="none"
        visible={modalOpen}
        style={{flex: 1}}>
        {changeStack == 'user' ? (
          <UserAgreement onPress={() => setModal(false)} />
        ) : (
          <VendorAgreement onPress={() => setModal(false)} />
        )}
      </Modal>
    </View>
  );
};

export default TermsAndCondition;

const styles = StyleSheet.create({});
