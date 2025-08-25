import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  AppButton,
  CustomHeader,
  CustomLoader,
  Text,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {BASE_URL, ENDPOINTS, navigate, showToast} from '@services';
import {useDispatch, useSelector} from 'react-redux';
import {setHotelInfo} from '@redux';
import {del, uploadImageUrl} from '@assets';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

const validationSchema: any = Yup.object().shape({
  images: Yup.array().min(1, 'Upload at least 1 photo').required('Required'),
});

const PropertyPhotos = ({route}: any) => {
  const {item, selectedItem} = route.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const [indicator, setIndicator] = useState(false);
  const dispatch = useDispatch();
  const {hotelInfo, B2B} = useSelector((state: any) => state.root.b2b);
  const [loading, setLoading] = useState(false);
  const lab = B2B?.hotel;

  const handleNext = async (values: any, selected: any) => {
    setLoading(true);
    try {
      const imageUrls = values.images.map((image: any) => image.uri);
      const picture = {
        ...hotelInfo,
        propertyPhotos: imageUrls,
      };
      dispatch(setHotelInfo(picture));
      setTimeout(() => {
        setLoading(false);
        navigate('PoliciesScreen', {item: item, selectedItem: selected});
        showToast('Success', 'PropertyPhotos info saved successfully', true);
      }, 3000);
    } catch (error) {
      console.error('Error during handleNext:', error);
      setLoading(false);
      showToast(
        'Error',
        'An error occurred while saving the information.',
        false,
      );
    }
  };

  const formik: any = useFormik({
    initialValues: {
      images: [],
    },
    validationSchema,
    onSubmit: (values: any) => {
      handleNext(values, selectedItem);
    },
  });

  const uploadImage = async () => {
    try {
      const result: any = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setIndicator(true);
      let imageUrl = result[0]?.uri;
      let name = imageUrl.split('/').pop();

      const headers = {
        'Content-Type': 'multipart/form-data',
      };

      const formData = new FormData();
      formData.append('file', {
        uri: imageUrl,
        type: 'image/jpeg',
        name: name,
      });

      axios
        .post(BASE_URL + ENDPOINTS?.RENT_A_CAR_UPLOAD_FILE, formData, {
          headers: headers,
        })
        .then(response => {
          formik.setFieldValue('images', [
            ...formik.values.images,
            {uri: response?.data?.fileUrl},
          ]);
        })
        .catch(error => {
          if (error?.response?.data?.message == undefined) {
            showToast('Error', 'Server error', false);
          }
        })
        .finally(() => {
          setIndicator(false);
        });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
      } else {
        console.error('DocumentPicker Error:', error);
      }
    }
  };

  const removeImage = (uri: any) => {
    const filteredImages = formik.values.images?.filter(
      (image: any) => image.uri !== uri,
    );
    formik.setFieldValue('images', filteredImages);
  };

  const onPress = () => {
    formik
      .validateForm()
      .then((errors: any) => {
        if (Object.keys(errors).length) {
          const firstError: any = Object.values(errors)[0];
          showToast('Error', firstError, false);
        } else {
          formik.handleSubmit();
        }
      })
      .catch((error: any) => {
        console.error('Validation error:', error);
        showToast('Error', 'An error occurred during validation.', false);
      });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Property Photos'}
          leftIcon
          titleColor={'#fff'}
          notify
        />

        <View style={styles.container}>
          <Text size={14} SFsemiBold>
            Uploaded Images
          </Text>
          {formik.values.images?.length === 0 && (
            <Text
              size={12}
              SFregular
              style={{marginTop: RF(4)}}
              color={'rgba(0, 39, 109, 1)'}>
              we need some photos of your property. we will displays these
              photos on your property page on Meditour Website
            </Text>
          )}
          <UploadURL
            fileData={formik.values.images}
            handleImg={uploadImage}
            indicator={indicator}
            OnRemove={removeImage}
          />

          <View style={{gap: RF(8)}}>
            <Text size={16} SFmedium color={'rgba(0, 39, 109, 1)'}>
              Tips:
            </Text>
            <Text>
              1.{' '}
              <Text size={14} SFmedium color={'rgba(0, 39, 109, 1)'}>
                Find Good Light:
              </Text>{' '}
              Use natural light for soft, even illumination.
            </Text>
            <Text>
              2.{' '}
              <Text size={14} SFmedium color={'rgba(0, 39, 109, 1)'}>
                Compose Well:
              </Text>{' '}
              Apply the rule of thirds and clean backgrounds.
            </Text>
            <Text>
              3.{' '}
              <Text size={14} SFmedium color={'rgba(0, 39, 109, 1)'}>
                Focus on Subject:
              </Text>{' '}
              Capture emotion or a compelling story.
            </Text>
            <Text>
              4.{' '}
              <Text size={14} SFmedium color={'rgba(0, 39, 109, 1)'}>
                Practice and Edit:
              </Text>{' '}
              Keep practicing and use simple edits.
            </Text>
          </View>
          <AppButton
            title="Next"
            width={RF(200)}
            height={RF(40)}
            m_Top={RF(24)}
            onPress={onPress}
          />
        </View>
        {loading && <CustomLoader />}
      </View>
    </Wrapper>
  );
};

const UploadURL = ({
  fileData,
  handleImg,
  indicator,
  OnRemove,
}: {
  fileData?: any;
  handleImg?: any;
  indicator?: any;
  OnRemove?: any;
}) => {
  return (
    <View>
      <FlatList
        horizontal
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        data={fileData}
        renderItem={({item}: any) => (
          <View
            style={{
              height: RF(100),
              width: RF(100),
              borderRadius: 8,
              overflow: 'hidden',
              marginLeft: RF(8),
              borderWidth: 1,
              marginTop: RF(8),
            }}>
            <Image
              style={{height: '100%', width: '100%', resizeMode: 'contain'}}
              source={{uri: item.uri}}
            />
            <TouchableOpacity
              style={{position: 'absolute', right: 8, top: 8}}
              onPress={() => OnRemove(item.uri)}>
              <Image
                source={del}
                style={{width: RF(16), height: RF(16), resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <Pressable onPress={handleImg}>
        {indicator ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <View
            style={{
              marginVertical: RF(16),
              borderWidth: 1,
              borderRadius: RF(12),
              padding: RF(16),
              alignItems: 'center',
              backgroundColor: '#fff',
              borderStyle: 'dashed',
              gap: RF(8),
              borderColor: 'rgba(110, 111, 114, 1)',
            }}>
            <Image
              style={{
                height: RF(24),
                width: RF(24),
                resizeMode: 'contain',
              }}
              source={uploadImageUrl}
            />
            <View>
              <Text size={16} SFregular color={'rgba(0, 39, 109, 1)'}>
                Upload your image here
              </Text>
              <Text center size={14} SFlight color={'rgba(0, 39, 109, 1)'}>
                Upload At Least 1 Photo
              </Text>
            </View>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 16,
    marginBottom: 10,
    color: '#0D47A1',
    fontWeight: 'bold',
  },
  imageList: {
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#FA5400',
    borderRadius: 10,
    padding: 2,
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    marginBottom: 20,
  },
  uploadText: {
    color: '#BDBDBD',
    marginTop: 10,
    fontSize: 16,
  },
  uploadSubText: {
    color: '#BDBDBD',
    marginTop: 5,
    fontSize: 12,
  },

  tipsHeading: {
    fontSize: 16,
    color: '#0D47A1',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tip: {
    fontSize: 14,
    color: '#0D47A1',
    marginBottom: 5,
  },
  tipBold: {
    fontWeight: 'bold',
  },
});

export default PropertyPhotos;
