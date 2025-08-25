import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Text} from '@components';

import {UploadIconFirst} from '@assets';
import {RF} from '@theme';
import {colors} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedFiles} from '@redux';

interface ImgPickerProps {
  style?: any;
  placeholder?: string;
  source?: any;
  tintColor?: any;
  tintColorstart?: any;
  onChageText?: any;
}
const FilePicker: React.FC<ImgPickerProps> = ({
  style,
  placeholder = 'Select files',
  source,
  tintColor,
  tintColorstart,
  onChageText,
}) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder);
  const {selectedFiles} = useSelector(
    (state: any) => state?.root?.vendorAuthentication,
  );
  const dispatch = useDispatch();

  const uploadImage = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      dispatch(setSelectedFiles(result[0].uri));
      // setCurrentPlaceholder(result[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
      }
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View>
        <View style={styles.row}>
          <Image
            style={styles.icon}
            source={source}
            resizeMode="contain"
            tintColor={tintColorstart}
          />
          <View style={{width: '76%'}}>
            <Text numberOfLines={1} style={[styles.text]}>
              {selectedFiles || 'Lab Logo'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={uploadImage}
            activeOpacity={0.7}>
            <Image
              style={styles.imageIcon}
              source={UploadIconFirst}
              tintColor={tintColor}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default FilePicker;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#00276D',
    marginTop: RF(32),
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#7d7d7d',
    fontSize: 16,
    marginLeft: 5,
    // backgroundColor: 'black',
  },
  button: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    width: 24,
    height: 24,
  },
  image: {
    width: 50,
    height: 50,
  },
  icon: {
    width: RF(16),
    height: RF(16),
    marginRight: RF(10),
  },
});
