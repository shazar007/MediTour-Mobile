import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import moment from 'moment';
import RowButton from '../rowButton';
import {useSelector} from 'react-redux';
import CustomRating from '../CustomRating';
import {useTheme} from '@react-navigation/native';
import {Modal, StyleSheet, View, TextInput} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';

interface Props {
  clr?: any;
  title?: any;
  visible?: any;
  onSubmit?: any;
  rating?: any;
  lab?: any;
  onChangeText?: any;
  value?: any;
  onSubmitRating?: any;
  onCancel?: any;
}
const StarModal = (props: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const currentTime = moment().format('LT');
  const {
    visible,
    title,
    clr,
    onChangeText,
    onSubmit,
    rating,
    lab,
    value,
    onSubmitRating,
    onCancel,
  } = props;
  const {user} = useSelector((state: any) => state.root.user);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  return (
    <View>
      <Modal
        style={styles.modal}
        visible={visible}
        transparent={true}
        animationType="none">
        <View style={styles.container}>
          <View style={styles.container2}>
            <Text color={changeColor} size={22} SFsemiBold align>
              How many stars would you give to them?
            </Text>
            <Text
              align
              size={12}
              SFsemiBold
              color={colors?.gray}
              style={styles.mt}>
              {user?.name} delivered your Test Report from{' '}
              {lab?.labFirstName + lab?.labLastName} , today at {currentTime}
            </Text>
            <AirbnbRating
              size={32}
              showRating={false}
              selectedColor={changeColor}
              onFinishRating={onSubmitRating}
              defaultRating={rating ? rating : 0}
            />

            <TextInput
              value={value}
              onChangeText={onChangeText}
              placeholder="Write your feedback"
              placeholderTextColor={colors?.blueText}
              style={[
                styles.input,
                {
                  color: colors?.blueText,
                  borderBottomColor: colors?.blueText,
                },
              ]}
              maxLength={300}
            />

            <Text color={colors?.gray} size={9} style={styles.txt}>
              0/300
            </Text>
            <RowButton
              title1={'CANCEL'}
              title2={'SUBMIT'}
              onClose={onSubmit}
              onCancel={onCancel}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StarModal;

const styles = StyleSheet.create({
  modal: {flex: 1},
  mt: {marginTop: RF(20), marginBottom: RF(15)},
  txt: {alignSelf: 'flex-end', marginTop: RF(5)},
  input: {
    width: RF(250),
    fontSize: RF(14),
    fontWeight: '400',
    borderBottomWidth: 1,
    marginTop: RF(5),
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(62, 62, 62, 0.4)',
  },
  container2: {
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
