import React, {useState} from 'react';
import {View, ScrollView, ImageBackground} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AppButton from '../AppButton';
import {RF} from '@theme';
import {Icon14} from '@assets';
import Text from '../text';
import CustomCard from './CustomCard';
const ImagePickers = () => {
  const [selectedImage, setSelectedImage] = useState([]);

  const handleImagePress = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: RF(295),
        height: RF(162),
        cropping: true,
      });

      setSelectedImage([...selectedImage, {uri: image.path}]);
    } catch (error) {}
  };

  return (
    <CustomCard>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text size={16} SFsemiBold color={'#000'}>
          Add Images for portfolio
        </Text>
        <Text size={12} SFregular color={'#000'}>
          (upto 3)
        </Text>
      </View>
      <Text size={10} SFregular style={{marginTop: RF(4)}}>
        for the images the size (1280,720) is recommended
      </Text>
      <AppButton
        onPress={handleImagePress}
        title="Add More"
        textcolor={'#00538F'}
        tintColor={'#00538F'}
        iconTrue={Icon14}
        bgColor={'#F8F8F8'}
        m_Top={RF(24)}
        containerStyle={{borderWidth: 2, borderColor: '#00538F'}}
      />

      <ScrollView>
        {selectedImage.map(({uri, index}: any) => (
          <View
            key={index}
            style={{
              marginTop: RF(8),
              width: RF(295),
              height: RF(162),
              overflow: 'hidden',
            }}>
            <ImageBackground
              source={{uri: uri}}
              resizeMode="contain"
              borderRadius={RF(8)}
              style={{width: '100%', height: '100%'}}
            />
          </View>
        ))}
      </ScrollView>
    </CustomCard>
  );
};

export default ImagePickers;
