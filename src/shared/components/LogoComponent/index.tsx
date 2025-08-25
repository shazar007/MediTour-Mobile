import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Text from '../text';
import {add_File} from '@services';
import {del, paper} from '@assets';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
const LogoComponent = ({
  setLoading,
  url,
  setUrl,
  fileName,
  setFileName,
}: any) => {
  const theme: any = useTheme();
  const colors = theme?.colors;

  const deleteFile = () => {
    setUrl(null);
    setFileName('');
  };
  const onUploadImage = () => {
    setLoading(true);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        const formData = new FormData();
        let name = image.path.split('/').pop();
        formData.append('file', {
          uri: image.path,
          type: image.mime,
          name: name,
        });
        add_File(formData)
          .then(response => {
            setUrl(response.data.fileUrl);
            setFileName(name);
          })
          .catch(err => {
            console.error(err);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(error => {
        // Handle cancellation or any error

        setLoading(false);
      });
  };
  return (
    <View style={{marginTop: RF(8)}}>
      <Text size={12} SFmedium color={'#7D7D7D'}>
        Company logo
      </Text>
      {!url && (
        <TouchableOpacity style={styles.UpLoad_S} onPress={onUploadImage}>
          <Image source={paper} style={styles.Upload_Image} />
          <View style={styles.Gap_styles}>
            <Text size={12} SFmedium color={colors.blueText}>
              Add Company logo
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {url ? (
        <View style={styles.File_S}>
          <Text size={12} SFlight color={'#00276D'} style={{width: RF(140)}}>
            {fileName}
          </Text>
          <TouchableOpacity onPress={deleteFile}>
            <Image source={del} style={styles.crossStyle} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default LogoComponent;

const styles = StyleSheet.create({
  Upload_Image: {
    width: RF(18),
    height: RF(18),
    resizeMode: 'contain',
    tintColor: '#00276D',
  },

  crossStyle: {
    width: RF(16),
    height: RF(16),
    resizeMode: 'contain',
    tintColor: 'red',
  },
  Gap_styles: {marginLeft: RF(8)},
  contentView: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  UpLoad_S: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: RF(8),
    borderColor: '#00276D',
    padding: RF(8),
    marginVertical: RF(10),

    alignItems: 'center',
    flexDirection: 'row',
  },
  File_S: {
    flexDirection: 'row',
    height: RF(50),
    backgroundColor: '#F6F7F9',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RF(8),
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#00276D',
    marginTop: RF(10),
    borderRadius: RF(8),
  },
});
