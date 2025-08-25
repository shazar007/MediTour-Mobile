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
  CustomFloatingLabelInput,
  CustomHeader,
  CustomLoader,
  DropHotel,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import DocumentPicker from 'react-native-document-picker';
import {del, PKR, plus, uploadImageUrl} from '@assets';
import useStyles from './styles';
import {
  BASE_URL,
  ENDPOINTS,
  globalStyles,
  navigate,
  showToast,
} from '@services';
import {apartmentData, bedData, breakfastData} from './data';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {setHotelInfo} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

const ApartmentFields = ({route}: any) => {
  const {item} = route.params;
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const styles: any = useStyles(colors);
  const [indicator, setIndicator] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalizeRef = useRef<any>(null);
  const dispatch = useDispatch();
  const {hotelInfo} = useSelector((state: any) => state.root.b2b);
  const handleNext = (values: any) => {
    setLoading(true);
    const apartment = {
      ...values,
      beds: values.beds,
    };
    const mergedData = {
      ...hotelInfo,
      apartment,
    };
    dispatch(setHotelInfo(mergedData));
    setTimeout(() => {
      setLoading(false);
      navigate('RoomDetail', {
        item: item,
      });
      showToast('Success', 'Apartment info saved successfully', true);
    }, 3000);
  };
  const onPressDel = (imageUrl: string) => {
    const updatedImages = formik.values.appartmentImages.filter(
      (image: string) => image !== imageUrl,
    );
    formik.setFieldValue('appartmentImages', updatedImages);
  };
  const formik: any = useFormik({
    initialValues: {
      appartmentNo: '',
      appartmentName: '',
      numberOfBedroom: '',
      numberOfBathroom: '',
      kitchens: '',
      totalStayingGuests: '',
      numberOfSofaBed: '',
      basePricePerNight: '',
      numberOfDiningrooms: '',
      breakfast: '',
      appartmentSize: '',
      appartmentImages: [],
      beds: [{availableBeds: '', noOfBeds: ''}],
    },
    validationSchema: Yup.object({
      appartmentNo: Yup.string().required('Required'),
      appartmentName: Yup.string().required('Required'),
      numberOfBedroom: Yup.string().required('Required'),
      numberOfBathroom: Yup.string().required('Required'),
      kitchens: Yup.string().required('Required'),
      totalStayingGuests: Yup.string().required('Required'),
      numberOfSofaBed: Yup.string().required('Required'),
      basePricePerNight: Yup.string().required('Required'),
      numberOfDiningrooms: Yup.string().required('Required'),
      breakfast: Yup.string().required('Required'),
      appartmentSize: Yup.string().required('Required'),
      appartmentImages: Yup.array()
        .of(Yup.string())
        .min(1, 'At least one image is required')
        .max(3, 'You can only upload a maximum of three images')
        .required('Apartment images are required'),
      beds: Yup.array()
        .of(
          Yup.object().shape({
            availableBeds: Yup.string().required('Required'),
            noOfBeds: Yup.string().required('Required'),
          }),
        )
        .min(1, 'At least one bed type is required')
        .max(3, 'You can only add a maximum of three bed types'),
    }),
    onSubmit: (values: any) => {
      handleNext(values);
      modalizeRef.current?.close();
    },
  });

  const uploadImage = async () => {
    if (formik.values.appartmentImages.length >= 3) {
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
          formik.setFieldValue('appartmentImages', [
            ...formik.values.appartmentImages,
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
        console.error('DocumentPicker Error:', error);
      }
    }
  };

  const addBedField = () => {
    if (formik.values.beds.length < 3) {
      formik.setFieldValue('beds', [
        ...formik.values.beds,
        {
          availableBeds: '',
          noOfBeds: '',
        },
      ]);
    } else {
      Alert?.alert('You can only add a maximum of three bed types.');
    }
  };

  const handleBedChange = (index: any, field: any, value: any) => {
    const updatedBeds = formik.values.beds.map((bed: any, i: any) =>
      i === index ? {...bed, [field]: value} : bed,
    );
    formik.setFieldValue('beds', updatedBeds);
  };

  const onSave = () => {
    formik.handleSubmit();
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Apartment Rooms'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <ScrollView>
          <View
            style={{
              marginHorizontal: RF(24),
              marginVertical: RF(24),
              paddingBottom: RF(30),
              gap: RF(4),
            }}>
            <Text size={18} SFmedium color={'#0D47A1'}>
              Apartments
            </Text>
            <CustomFloatingLabelInput
              label={'Apartment No.'}
              labelClr="rgba(13, 71, 161, 1)"
              keyboardType="numeric"
              value={formik.values.appartmentNo}
              onChangeText={formik.handleChange('appartmentNo')}
              onBlur={formik.handleBlur('appartmentNo')}
            />
            {formik.touched.appartmentNo && formik.errors.appartmentNo && (
              <Text style={globalStyles.errors}>
                {formik.errors.appartmentNo}
              </Text>
            )}
            <CustomFloatingLabelInput
              label={'Custom name'}
              labelClr="rgba(13, 71, 161, 1)"
              value={formik.values.appartmentName}
              onChangeText={formik.handleChange('appartmentName')}
              onBlur={formik.handleBlur('appartmentName')}
            />
            {formik.touched.appartmentName && formik.errors.appartmentName && (
              <Text style={globalStyles.errors}>
                {formik.errors.appartmentName}
              </Text>
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
              label={'No of kitchen'}
              labelClr="rgba(13, 71, 161, 1)"
              keyboardType="numeric"
              value={formik.values.kitchens}
              onChangeText={formik.handleChange('kitchens')}
              onBlur={formik.handleBlur('kitchens')}
            />
            {formik.touched.kitchens && formik.errors.kitchens && (
              <Text style={globalStyles.errors}>{formik.errors.kitchens}</Text>
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
            <CustomFloatingLabelInput
              m_Vertical={RF(8)}
              label={'Total guest can stay in this apartment'}
              labelClr="rgba(13, 71, 161, 1)"
              keyboardType="numeric"
              value={formik.values.totalStayingGuests}
              onChangeText={formik.handleChange('totalStayingGuests')}
              onBlur={formik.handleBlur('totalStayingGuests')}
            />
            {formik.touched.totalStayingGuests &&
              formik.errors.totalStayingGuests && (
                <Text style={globalStyles.errors}>
                  {formik.errors.totalStayingGuests}
                </Text>
              )}
            <DropHotel
              name={'Breakfast include'}
              data={breakfastData}
              selectedData={formik.values.breakfast}
              setSelectedData={(value: any) =>
                formik.setFieldValue('breakfast', value)
              }
            />
            {formik.touched.breakfast && formik.errors.breakfast && (
              <Text style={globalStyles.errors}>{formik.errors.breakfast}</Text>
            )}
            <Text
              size={18}
              SFmedium
              color={'#0D47A1'}
              style={{marginTop: RF(20)}}>
              Common space 1
            </Text>
            <CustomFloatingLabelInput
              label={'No. of sofa beds in this room'}
              labelClr="rgba(13, 71, 161, 1)"
              keyboardType="numeric"
              value={formik.values.numberOfSofaBed}
              onChangeText={formik.handleChange('numberOfSofaBed')}
              onBlur={formik.handleBlur('numberOfSofaBed')}
            />
            {formik.touched.numberOfSofaBed &&
              formik.errors.numberOfSofaBed && (
                <Text style={globalStyles.errors}>
                  {formik.errors.numberOfSofaBed}
                </Text>
              )}

            <Text
              size={16}
              SFmedium
              color={'#0D47A1'}
              style={{marginTop: RF(16)}}>
              Apartment Size(optional)
            </Text>
            <CustomFloatingLabelInput
              m_Vertical={RF(8)}
              label={'Squares meter'}
              keyboardType="numeric"
              labelClr="rgba(13, 71, 161, 1)"
              value={formik.values.appartmentSize}
              onChangeText={formik.handleChange('appartmentSize')}
              onBlur={formik.handleBlur('appartmentSize')}
            />
            {formik.touched.appartmentSize && formik.errors.appartmentSize && (
              <Text style={globalStyles.errors}>
                {formik.errors.appartmentSize}
              </Text>
            )}
            <Text
              size={16}
              SFmedium
              color={'#0D47A1'}
              style={{marginTop: RF(16)}}>
              Base price per night
            </Text>
            <CustomFloatingLabelInput
              m_Vertical={RF(8)}
              endIcon={PKR}
              keyboardType="numeric"
              label={'Basic price per night'}
              labelClr="rgba(13, 71, 161, 1)"
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
              fileData={formik.values.appartmentImages}
              handleImg={uploadImage}
              indicator={indicator}
              delPic={onPressDel}
            />
            {formik.touched.appartmentImages &&
              formik.errors.appartmentImages && (
                <Text style={globalStyles.errors}>
                  {formik.errors.appartmentImages}
                </Text>
              )}
            <AppButton
              onPress={onSave}
              title="Save"
              width={RF(200)}
              height={RF(36)}
              b_R={16}
              // bgClr={'#006838'}
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
              style={{height: '100%', width: '100%', resizeMode: 'cover'}}
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

export default ApartmentFields;
