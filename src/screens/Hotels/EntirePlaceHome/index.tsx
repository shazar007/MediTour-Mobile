import React, {useRef, useState} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {
  AppButton,
  AppTextInput,
  CustomFloatingLabelInput,
  CustomHeader,
  CustomLoader,
  DropHotel,
  Text,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {del, plus, uploadImageUrl} from '@assets';
import useStyles from './styles';
import {
  BASE_URL,
  ENDPOINTS,
  globalStyles,
  navigate,
  showToast,
} from '@services';
import {bedData, homeType} from './data';
import DocumentPicker from 'react-native-document-picker';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {setHotelInfo} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

const EntirePlaceHome = ({route}: any) => {
  const {item, selectedItem} = route.params;
  const [loading, setLoading] = useState(false);
  const modalizeRef: any = useRef(null);
  const [indicator, setIndicator] = useState(false);
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const dispatch = useDispatch();
  const {hotelInfo} = useSelector((state: any) => state?.root?.b2b);

  const handleNext = (values: any, value: any) => {
    setLoading(true);

    const mergedData = {
      ...hotelInfo,
      entirePlace: {
        ...values,
        beds: values.beds,
      },
    };
    dispatch(setHotelInfo(mergedData));
    setTimeout(() => {
      setLoading(false);
      navigate('HomeRoomDetails', {
        entirePlace: mergedData.entirePlace,
        item: item,
        selectedItem: value,
      });
      showToast('Success', 'Hotel info saved successfully', true);
    }, 3000);
  };

  const formik: any = useFormik({
    initialValues: {
      homeType: '',
      homeName: '',
      numberOfBedroom: '',
      numberOfBathroom: '',
      kitchens: '',
      numberOfFloors: '',
      basePricePerNight: '',
      numberOfDiningrooms: '',
      homeSize: '',
      homeImages: [],
      beds: [{availableBeds: '', noOfBeds: ''}],
    },
    validationSchema: Yup.object({
      homeType: Yup.string().required('Home Type is required'),
      homeName: Yup.string().required('Home Name is required'),
      numberOfBedroom: Yup.string().required('Number of bedrooms is required'),
      numberOfBathroom: Yup.string().required(
        'Number of bathrooms is required',
      ),
      kitchens: Yup.string().required('Number of kitchens is required'),
      numberOfFloors: Yup.string().required('Number of floors is required'),
      basePricePerNight: Yup.string().required(
        'Base price per night is required',
      ),
      numberOfDiningrooms: Yup.string().required(
        'Number of dining rooms is required',
      ),
      homeSize: Yup.string().required('Home size is required'),
      homeImages: Yup.array()
        .of(Yup.string())
        .min(1, 'At least one image is required')
        .max(3, 'You can only upload a maximum of three images')
        .required('Home images are required'),
      beds: Yup.array()
        .of(
          Yup.object().shape({
            availableBeds: Yup.string().required('Bed type is required'),
            noOfBeds: Yup.string().required('Number of beds is required'),
          }),
        )
        .min(1, 'At least one bed type is required')
        .max(3, 'You can only add a maximum of three bed types'),
    }),
    onSubmit: (values: any) => {
      handleNext(values, selectedItem);
      modalizeRef.current?.close();
    },
  });

  const uploadImage = async () => {
    if (formik.values.homeImages.length >= 3) {
      showToast('Error', 'Maximum 3 Images', false);
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
          formik.setFieldValue('homeImages', [
            ...formik.values.homeImages,
            response?.data?.fileUrl,
          ]);
        })
        .catch(error => {
          if (error?.response?.data?.message == undefined) {
            showToast('error', 'Server error', false);
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
  const onPressDel = (imageUrl: string) => {
    const updatedImages = formik.values.homeImages.filter(
      (image: string) => image !== imageUrl,
    );
    formik.setFieldValue('homeImages', updatedImages);
  };
  const addBedField = () => {
    if (formik.values.beds.length < 3) {
      formik.setFieldValue('beds', [
        ...formik.values.beds,
        {availableBeds: '', noOfBeds: ''},
      ]);
    } else {
      Alert.alert('You can only add a maximum of three bed types.');
    }
  };

  const handleBedChange = (index: any, field: any, value: any) => {
    const updatedBeds = formik.values.beds.map((bed: any, i: any) =>
      i === index ? {...bed, [field]: value} : bed,
    );
    formik.setFieldValue('beds', updatedBeds);
  };

  const onSave = () => {
    if (!formik.isValid && formik.submitCount > 0) {
      const firstError: any = Object.values(formik.errors)[0];
      showToast('Error', firstError, false);
    } else {
      formik.handleSubmit();
    }
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={
            item === 'A private room'
              ? 'Private room'
              : item === 'Entire place'
              ? 'Entire place'
              : ''
          }
          leftIcon
          titleColor={'#fff'}
          notify
        />

        <ScrollView>
          <View style={styles.TopView}>
            <Text size={18} SFmedium color={'#0D47A1'}>
              {item === 'A private room'
                ? 'Private room'
                : item === 'Entire place'
                ? 'Entire place'
                : ''}
            </Text>
            <DropHotel
              name={
                item === 'A private room'
                  ? 'Room Type'
                  : item === 'Entire place'
                  ? 'Home Type'
                  : ''
              }
              data={homeType}
              selectedData={formik.values.homeType}
              setSelectedData={(value: any) =>
                formik.setFieldValue('homeType', value)
              }
            />
            <CustomFloatingLabelInput
              label={'Custom name'}
              labelClr="rgba(13, 71, 161, 1)"
              value={formik.values.homeName}
              onChangeText={formik.handleChange('homeName')}
              onBlur={formik.handleBlur('homeName')}
            />
            {formik.touched.homeName && formik.errors.homeName && (
              <Text style={globalStyles.errors}>{formik.errors.homeName}</Text>
            )}

            <CustomFloatingLabelInput
              label={'No. of bed rooms'}
              labelClr="rgba(13, 71, 161, 1)"
              keyboardType="numeric"
              value={formik.values.numberOfBedroom}
              onChangeText={formik.handleChange('numberOfBedroom')}
              onBlur={formik.handleBlur('numberOfBedroom')}
            />
            {formik.touched.numberOfBedroom &&
              formik.errors.numberOfBedroom && (
                <Text style={globalStyles.errors}>
                  {formik.errors.numberOfBedroom}
                </Text>
              )}

            <CustomFloatingLabelInput
              label={'No. of dining rooms'}
              labelClr="rgba(13, 71, 161, 1)"
              keyboardType="numeric"
              value={formik.values.numberOfDiningrooms}
              onChangeText={formik.handleChange('numberOfDiningrooms')}
              onBlur={formik.handleBlur('numberOfDiningrooms')}
            />
            {formik.touched.numberOfDiningrooms &&
              formik.errors.numberOfDiningrooms && (
                <Text style={globalStyles.errors}>
                  {formik.errors.numberOfDiningrooms}
                </Text>
              )}

            <CustomFloatingLabelInput
              label={'No. of bathroom'}
              labelClr="rgba(13, 71, 161, 1)"
              keyboardType="numeric"
              value={formik.values.numberOfBathroom}
              onChangeText={formik.handleChange('numberOfBathroom')}
              onBlur={formik.handleBlur('numberOfBathroom')}
            />
            {formik.touched.numberOfBathroom &&
              formik.errors.numberOfBathroom && (
                <Text style={globalStyles.errors}>
                  {formik.errors.numberOfBathroom}
                </Text>
              )}

            <CustomFloatingLabelInput
              label={'How many kitchen'}
              labelClr="rgba(13, 71, 161, 1)"
              keyboardType="numeric"
              value={formik.values.kitchens}
              onChangeText={formik.handleChange('kitchens')}
              onBlur={formik.handleBlur('kitchens')}
            />
            {formik.touched.kitchens && formik.errors.kitchens && (
              <Text style={globalStyles.errors}>{formik.errors.kitchens}</Text>
            )}
            <CustomFloatingLabelInput
              label={'No. of floor'}
              labelClr="rgba(13, 71, 161, 1)"
              keyboardType="numeric"
              value={formik.values.numberOfFloors}
              onChangeText={formik.handleChange('numberOfFloors')}
              onBlur={formik.handleBlur('numberOfFloors')}
            />
            {formik.touched.numberOfFloors && formik.errors.numberOfFloors && (
              <Text style={globalStyles.errors}>
                {formik.errors.numberOfFloors}
              </Text>
            )}
            <Text
              size={16}
              SFmedium
              color={'#0D47A1'}
              style={{marginTop: RF(20)}}>
              Beds
            </Text>
            {formik.values.beds?.map((bed: any, index: any) => (
              <View key={index}>
                <DropHotel
                  name={'Available Beds'}
                  data={bedData}
                  selectedData={bed.availableBeds}
                  setSelectedData={(value: any) =>
                    handleBedChange(index, 'availableBeds', value)
                  }
                />
                {formik.touched.beds?.[0]?.availableBeds &&
                  formik.errors.beds?.[0]?.availableBeds && (
                    <Text style={globalStyles.errors}>
                      {formik.errors.beds?.[0]?.availableBeds}
                    </Text>
                  )}
                <CustomFloatingLabelInput
                  label={'Select the number of beds'}
                  labelClr="rgba(13, 71, 161, 1)"
                  keyboardType="numeric"
                  m_Top={RF(8)}
                  value={bed.noOfBeds}
                  onChangeText={(value: any) =>
                    handleBedChange(index, 'noOfBeds', value)
                  }
                  onBlur={formik.handleBlur(`beds[${index}].noOfBeds`)}
                />
                {formik.touched.beds?.[0]?.noOfBeds &&
                  formik.errors.beds?.[0]?.noOfBeds && (
                    <Text style={globalStyles.errors}>
                      {formik.errors.beds?.[0]?.noOfBeds}
                    </Text>
                  )}
              </View>
            ))}
            {formik.values.beds?.length < 3 && (
              <View style={styles.ViewButton}>
                <TouchableOpacity
                  onPress={addBedField}
                  style={styles.ViewImage}>
                  <Image source={plus} style={styles.Image} />
                </TouchableOpacity>
                <Text size={9} SFregular color={'#FA5400'}>
                  Add another kind of beds
                </Text>
              </View>
            )}

            <Text
              size={16}
              SFmedium
              color={'#0D47A1'}
              style={{marginTop: RF(16)}}>
              Size(optional)
            </Text>
            <AppTextInput
              placeholder={'0 squares meter'}
              p_Horizontal={RF(8)}
              fontSize={RF(12)}
              placeholderTextColor={'#0D47A1'}
              value={formik.values.homeSize}
              onChangeText={formik.handleChange('homeSize')}
              onBlur={formik.handleBlur('homeSize')}
            />
            <Text
              size={16}
              SFmedium
              color={'#0D47A1'}
              style={{marginTop: RF(16)}}>
              Base price per night
            </Text>
            <CustomFloatingLabelInput
              label={'Basic price per night'}
              labelClr="rgba(13, 71, 161, 1)"
              keyboardType="numeric"
              value={formik.values.basePricePerNight}
              onChangeText={formik.handleChange('basePricePerNight')}
              onBlur={formik.handleBlur('basePricePerNight')}
            />
            {formik.touched.basePricePerNight &&
              formik.errors.basePricePerNight && (
                <Text style={globalStyles.errors}>
                  {formik.errors.basePricePerNight}
                </Text>
              )}
            <UploadURL
              fileData={formik.values.homeImages}
              handleImg={uploadImage}
              delPic={onPressDel}
              indicator={indicator}
            />
            {formik.touched.homeImages && formik.errors.homeImages && (
              <Text style={globalStyles.errors}>
                {formik.errors.homeImages}
              </Text>
            )}
            <AppButton
              onPress={onSave}
              title="Save"
              width={RF(180)}
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
              height: RF(60),
              width: RF(60),
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
export default EntirePlaceHome;
