import {Modal, StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {Save} from '@assets';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import Text from '../text';
import AppButton from '../AppButton';

interface Props {
  Visible?: any;
  onclose?:any;
}
const PortfolioModal = (props: Props) => {
  const {Visible, onclose} = props;
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
            <Image source={Save} style={{width: RF(80), height: RF(80)}} />
            <Text size={20} SFmedium>
              Congratulation
            </Text>
            <Text style={[styles.text, {color: colors.backgroundColor}]}>
              Your workplace is successfully completed and click on publish to
              give your services.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: RF(16),
              }}>
              <AppButton
                title="go back"
                width={RF(119)}
                height={RF(40)}
                bgColor={'#fff'}
                textcolor={'#434343'}
                onPress={onclose}
                containerStyle={{borderRadius: RF(8),borderWidth:1,}}
              />
              <AppButton
                title="Publish"
                width={RF(119)}
                height={RF(40)}
                containerStyle={{marginLeft: RF(8), borderRadius: RF(8)}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PortfolioModal;

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
  },
  text: {
    marginTop: RF(16),
    textAlign: 'center',
    justifyContent:'center',
    alignItems:'center',
    fontFamily: 'SF-Pro-Text-Regular ',
  },
});
