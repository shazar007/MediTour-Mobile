import {Modal, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {cross, crossIcon, Save} from '@assets';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import Text from '../text';

interface Props {
  clr?: any;
  Visible?: any;
  children?: any;
  title?: any;
  save?: any;
  cross?: any;
  onPress?: any;
}
const SaveModal = (props: Props) => {
  const {Visible, title, clr, children, save, onPress, cross} = props;
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
            {cross && (
              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                onPress={onPress}>
                <Image source={crossIcon} style={{width: RF(16), height: RF(16)}} />
              </TouchableOpacity>
            )}
            {!save && (
              <Image source={Save} style={{width: RF(80), height: RF(80)}} />
            )}
            <Text
              style={[
                styles.text,
                {color: clr ? colors.backgroundColor : colors?.blueText},
              ]}
              center>
              {title}
            </Text>
            <View>{children}</View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SaveModal;

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
    width: 200,
    fontFamily: 'SF-Pro-Text-Regular ',
  },
});
