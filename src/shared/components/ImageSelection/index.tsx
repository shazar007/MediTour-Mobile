import axios from 'axios';
import Text from '../text';
import {setImg} from '@redux';
import React, {useState} from 'react';
import {RF, getColorCode} from '@theme';
import CustomLoader from '../CustomLoader';
import {BASE_URL, showToast} from '@services';
import {del, image, uploadIcon} from '@assets';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import {Image, Pressable, StyleSheet, View} from 'react-native';

const ImageSelection = ({uri, setUri, selectImage}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {endPoints} = getColorCode();
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);
  const {img} = useSelector((state: any) => state.root.b2b);

  const uploadImage = async () => {
    setLoading(true);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      let imageUrl = result[0]?.uri;

      let name = imageUrl.split('/').pop();
      //

      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      const formData = new FormData();
      formData.append('file', {
        name: name,
        uri: imageUrl,
        type: 'image/jpeg',
      });
      axios
        .post(BASE_URL + endPoints, formData, {
          headers: headers,
        })
        .then(response => {
          setUri(response?.data?.fileUrl);
          dispatch(setImg(response?.data?.fileUrl));
        })
        .catch(error => {
          // if (error?.response?.data?.message == undefined) {
          // }
          // showToast('error', 'Server error', false);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        setLoading(false);
      } else {
        console.error('DocumentPicker Error:', error);
        setLoading(false);
      }
    }
  };

  return (
    <>
      {!selectImage && (
        <Pressable style={styles.imgV} onPress={uploadImage}>
          {uri || img ? (
            <Image source={{uri: uri || img}} style={styles._img} />
          ) : (
            <Image source={image} style={styles._img} />
          )}
          <Text size={14} SFregular color={colors?.bluE}>
            {img ? 'Uploaded' : ' Upload your image here, or browse'}
          </Text>
          <Text size={14} SFregular color={colors?.bluE}>
            Supports PNG,JPG,Webp
          </Text>
          {loading && <CustomLoader />}
        </Pressable>
      )}

      {selectImage && (
        <Pressable
          style={[styles.imgV, {height: RF(80)}]}
          onPress={uploadImage}>
          {uri ? (
            <View style={styles.view}>
              <View style={styles.row}>
                <Image source={uploadIcon} style={styles.img} />
                <Text numberOfLines={1} style={styles.txt}>
                  {uri}
                </Text>
              </View>
              <Image source={del} style={styles.img} />
            </View>
          ) : (
            <>
              <Image source={uploadIcon} style={styles.img} />

              <View style={styles.row}>
                <Text size={13} SFregular color={colors?.bluE}>
                  Take photo or{' '}
                </Text>
                <Text size={13} SFregular color={'red'}>
                  choose file{' '}
                </Text>
                <Text size={13} SFregular color={colors?.bluE}>
                  to upload
                </Text>
              </View>
              <Text size={10} SFregular color={colors?.bluE}>
                Select JPEG, Png, or Pdf up to 20MB.
              </Text>
            </>
          )}
          {loading && <CustomLoader />}
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  txt: {
    width: '80%',
    alignSelf: 'center',
    marginLeft: RF(10),
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: RF(20),
  },
  row: {flexDirection: 'row'},
  imgV: {
    width: '100%',
    height: RF(130),
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RF(16),
  },
  _img: {width: RF(56), height: RF(56), resizeMode: 'contain'},
  img: {width: RF(26), height: RF(26), resizeMode: 'contain'},
});

export default ImageSelection;
