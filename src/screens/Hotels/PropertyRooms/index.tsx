import React, {useState} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {
  AppButton,
  CustomFloatingLabelInput,
  CustomHeader,
  CustomLoader,
  DropHotel,
  Text,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {del, Sqft, uploadImageUrl} from '@assets';
import useStyles from './styles';
import {bedData, breakfastData, roomData} from './data';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {setHotelInfo} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import {BASE_URL, ENDPOINTS, globalStyles, navigate} from '@services';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import {Alert} from '@utils';
const PropertyRooms = ({route}: any) => {
  const {selectedItem} = route.params;
  const styles: any = useStyles();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const [indicator, setIndicator] = useState(false);
  const colors: any = theme.colors;
  const dispatch = useDispatch();
  const {hotelInfo} = useSelector((state: any) => state?.root?.b2b);

  const handleNext = (values: any, val: any) => {
    setLoading(true);

    const mergedData = {
      ...hotelInfo,
      hotelRoom: {...values},
    };
    dispatch(setHotelInfo(mergedData));
    setTimeout(() => {
      setLoading(false);
      navigate('HotelRoomDetails', {
        hotelRoom: mergedData.hotelRoom,
        selectedItem: val,
      });
      Alert.showSuccess('Property info saved successfully');
    }, 3000);
  };

  const formik: any = useFormik({
    initialValues: {
      roomType: '',
      roomName: '',
      // smokingPolicy: '',
      bedKinds: '',
      noOfBeds: '',
      noOfGuestsStay: '',
      roomSize: '',
      breakfast: '',
      pricePerNight: '',
      roomDescription: '',
      roomImages: [],
    },
    validationSchema: Yup.object({
      roomType: Yup.string().required('Room type is required'),
      roomName: Yup.string().required('Custom room name is required'),
      // smokingPolicy: Yup.string().required('Smoking policy is required'),
      bedKinds: Yup.string().required('Bed type is required'),
      noOfBeds: Yup.string().required('Number of beds is required'),
      noOfGuestsStay: Yup.number().required('Total guests is required'),
      roomSize: Yup.string().required('Room size is required'),
      breakfast: Yup.string().required('Breakfast inclusion is required'),
      pricePerNight: Yup.number().required('Price per night is required'),
      roomDescription: Yup.string().required('Room description is required'),
      roomImages: Yup.array()
        .of(Yup.string())
        .min(1, 'At least one image is required')
        .max(3, 'You can only upload a maximum of three images')
        .required('Room images are required'),
    }),
    onSubmit: (values: any) => {
      values.noOfGuestsStay = parseInt(values.noOfGuestsStay, 10);
      values.pricePerNight = parseInt(values.pricePerNight, 10);
      values.priceForMeditour = parseInt(values.priceForMeditour, 10);
      handleNext(values, selectedItem);
    },
  });

  const onSave = () => {
    if (!formik.isValid && formik.submitCount > 0) {
      const firstError: any = Object.values(formik.errors)[0];
      Alert.showError(firstError);
    } else {
      formik.handleSubmit();
    }
  };
  const onPressDel = (imageUrl: string) => {
    const updatedImages = formik.values.roomImages.filter(
      (image: string) => image !== imageUrl,
    );
    formik.setFieldValue('homeImages', updatedImages);
  };
  const uploadImage = async () => {
    if (formik.values.roomImages.length >= 3) {
      Alert.showError('Maximum 3 Images');
      return;
    }
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
          formik.setFieldValue('roomImages', [
            ...formik.values.roomImages,
            response?.data?.fileUrl,
          ]);
        })
        .catch(error => {
          if (error?.response?.data?.message == undefined) {
            Alert.showError('Server error');
          }
        })
        .finally(() => {
          setIndicator(false);
        });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
      } else {
      }
    }
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Rooms & Price'}
          leftIcon
          titleColor={'#fff'}
          notify
        />

        <ScrollView>
          <View
            style={{
              marginHorizontal: RF(16),
              marginVertical: RF(24),
              gap: RF(4),
              paddingBottom: RF(49),
            }}>
            <Text size={18} SFmedium color={'#0D47A1'}>
              Room Details
            </Text>
            <DropHotel
              name={'Room type'}
              data={roomData}
              selectedData={formik.values.roomType}
              setSelectedData={(value: any) =>
                formik.setFieldValue('roomType', value)
              }
            />
            {formik.touched.roomType && formik.errors.roomType && (
              <Text style={globalStyles.errors}>{formik.errors.roomType}</Text>
            )}
            <CustomFloatingLabelInput
              label={'Room Name'}
              labelClr="rgba(13, 71, 161, 1)"
              value={formik.values.roomName}
              onChangeText={formik.handleChange('roomName')}
              onBlur={formik.handleBlur('roomName')}
            />
            {formik.touched.roomName && formik.errors.roomName && (
              <Text style={globalStyles.errors}>{formik.errors.roomName}</Text>
            )}

            <DropHotel
              name={'What kind of beds'}
              data={bedData}
              selectedData={formik.values.bedKinds}
              setSelectedData={(value: any) =>
                formik.setFieldValue('bedKinds', value)
              }
            />
            {formik.touched.bedKinds && formik.errors.bedKinds && (
              <Text style={globalStyles.errors}>{formik.errors.bedKinds}</Text>
            )}
            <CustomFloatingLabelInput
              label={'Number of Beds'}
              labelClr="rgba(13, 71, 161, 1)"
              keyboardType={'numeric'}
              value={formik.values.noOfBeds}
              onChangeText={formik.handleChange('noOfBeds')}
              onBlur={formik.handleBlur('noOfBeds')}
            />
            {formik.touched.noOfBeds && formik.errors.noOfBeds && (
              <Text style={globalStyles.errors}>{formik.errors.noOfBeds}</Text>
            )}

            <CustomFloatingLabelInput
              label={'Total guest can stay in this room'}
              labelClr="rgba(13, 71, 161, 1)"
              keyboardType={'numeric'}
              value={formik.values.noOfGuestsStay}
              onChangeText={formik.handleChange('noOfGuestsStay')}
              onBlur={formik.handleBlur('noOfGuestsStay')}
            />
            {formik.touched.noOfGuestsStay && formik.errors.noOfGuestsStay && (
              <Text style={globalStyles.errors}>
                {formik.errors.noOfGuestsStay}
              </Text>
            )}
            <CustomFloatingLabelInput
              label={'Room size'}
              labelClr="rgba(13, 71, 161, 1)"
              value={formik.values.roomSize}
              onChangeText={formik.handleChange('roomSize')}
              onBlur={formik.handleBlur('roomSize')}
              endIcon={Sqft}
            />
            {formik.touched.roomSize && formik.errors.roomSize && (
              <Text style={globalStyles.errors}>{formik.errors.roomSize}</Text>
            )}
            <DropHotel
              name={'Breakfast included'}
              data={breakfastData}
              selectedData={formik.values.breakfast}
              setSelectedData={(value: any) =>
                formik.setFieldValue('breakfast', value)
              }
            />
            {formik.touched.breakfast && formik.errors.breakfast && (
              <Text style={globalStyles.errors}>{formik.errors.breakfast}</Text>
            )}
            <CustomFloatingLabelInput
              label={'Price per night'}
              labelClr="rgba(13, 71, 161, 1)"
              keyboardType="numeric"
              value={String(formik.values.pricePerNight)}
              onChangeText={formik.handleChange('pricePerNight')}
              onBlur={formik.handleBlur('pricePerNight')}
            />
            {formik.touched.pricePerNight && formik.errors.pricePerNight && (
              <Text style={globalStyles.errors}>
                {formik.errors.pricePerNight}
              </Text>
            )}

            <CustomFloatingLabelInput
              label={'Room Description'}
              labelClr="rgba(13, 71, 161, 1)"
              value={formik.values.roomDescription}
              onChangeText={formik.handleChange('roomDescription')}
              onBlur={formik.handleBlur('roomDescription')}
            />
            {formik.touched.roomDescription &&
              formik.errors.roomDescription && (
                <Text style={globalStyles.errors}>
                  {formik.errors.roomDescription}
                </Text>
              )}
            <UploadURL
              fileData={formik.values.roomImages}
              handleImg={uploadImage}
              indicator={indicator}
              delPic={onPressDel}
            />
            <AppButton
              onPress={onSave}
              title="Save"
              width={RF(200)}
              height={RF(36)}
              b_R={16}
              bgClr={'#3B58B8'}
              m_Top={RF(32)}
            />
            {loading && <CustomLoader />}
          </View>
        </ScrollView>
      </View>
    </Wrapper>
  );
};
const UploadURL = ({
  fileData,
  handleImg,
  indicator,
  delPic,
}: {
  fileData?: any;
  handleImg?: any;
  indicator?: any;
  delPic?: any;
}) => {
  return (
    <View
      style={{marginTop: RF(24), flexDirection: 'row', alignItems: 'center'}}>
      <Pressable onPress={handleImg}>
        {indicator ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <Image
            style={{height: RF(24), width: RF(24), resizeMode: 'contain'}}
            source={uploadImageUrl}
          />
        )}
        <Text style={{marginTop: RF(8)}} size={9}>
          Max 3 Images
        </Text>
      </Pressable>
      <FlatList
        horizontal
        scrollEnabled={false}
        data={fileData}
        renderItem={({item}: any) => (
          <View
            style={{
              height: RF(45),
              width: RF(45),
              borderRadius: 8,
              borderWidth: 1,
              overflow: 'hidden',
              marginHorizontal: RF(8),
            }}>
            <Image
              style={{height: '100%', width: '100%', resizeMode: 'contain'}}
              source={{uri: item}}
            />
            <TouchableOpacity
              onPress={() => delPic(item)}
              style={{
                position: 'absolute',
                zIndex: 10,
                right: RF(4),
                top: RF(4),
              }}>
              <Image
                style={{height: RF(16), width: RF(16), resizeMode: 'contain'}}
                source={del}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
export default PropertyRooms;
