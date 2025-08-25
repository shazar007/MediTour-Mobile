import {Modal, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Save, crossIcon, crossing} from '@assets';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import Text from '../text';

interface Props {
  clr?: any;
  Visible?: any;
  Children?: any;
  title?: any;
  onClose?: () => void;
}
const ShareModal = (props: Props) => {
  const {Visible, title, clr, Children, onClose} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const handleCloseModal = () => {
    if (onClose) onClose();
  };
  return (
    <View>
      <Modal transparent={true} animationType="none" visible={Visible}>
        <View style={styles.Container}>
          <View style={styles.Container2}>
            <TouchableOpacity onPress={handleCloseModal}>
              <Image
                source={crossing}
                style={{
                  width: RF(16),
                  height: RF(16),
                  resizeMode: 'contain',
                  //   backgroundColor: '#4455',
                  alignSelf: 'flex-end',
                  //   position: 'absolute',
                }}
              />
            </TouchableOpacity>

            <Text
              size={18}
              SFmedium
              color={colors.primary}
              style={[
                styles.text,
                {color: clr ? colors.backgroundColor : colors?.blueText},
              ]}
              center>
              {title}
            </Text>
            <View>{Children}</View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ShareModal;

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
    paddingVertical: RF(16),
    borderRadius: RF(12),
    marginHorizontal: RF(16),
    marginVertical: RF(4),
    // alignItems: 'center',
  },
  text: {
    marginVertical: RF(16),
    width: 200,
    fontFamily: 'SF-Pro-Text-Regular ',
  },
});
