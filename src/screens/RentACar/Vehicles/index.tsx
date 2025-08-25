import {
  View,
  Modal,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import {
  Wrapper,
  AppButton,
  EmptyList,
  CustomModalize,
  CustomFloatingLabelInput,
  CustomHeader,
} from '@components';
import {del, dropIcon, edit2, uploadImageUrl} from '@assets';
import {
  margin,
  navigate,
  padding,
  showToast,
  BASE_URL,
  ENDPOINTS,
  addVehicle,
  editVehicle,
  globalStyles,
  deleteVehicle,
  getAllVehicles,
  addVehicleValidationSchema,
} from '@services';
import axios from 'axios';
import {useFormik} from 'formik';
import useStyles from './styles';
import {getColorCode, RF} from '@theme';
import {Modalize} from 'react-native-modalize';
import {CustomLoader, Text} from '@components';
import {useTheme} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import DocumentPicker from 'react-native-document-picker';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import {Alert} from '@utils';
const Vehicles = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const modalizeRef = useRef<Modalize>(null);
  const [tasks, setTasks] = useState<any>([]);
  const [vehicleList, setVehicleList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [editdata, setEditData] = useState<any>(null);
  const [simpleModal, setSimpleModal] = useState<any>(false);
  const [indicator, setIndicator] = useState(false);
  const [type, setType] = useState('');
  const [renderCategories, setRenderCategories] = useState(false);
  const {colorCode} = getColorCode();
  const [refreshing, setRefreshing] = useState(false);
  const [datePicker, setDatePicker] = useState(false);

  const [date, setDate] = useState<any>('');

  const [uploadFile, setUploadFile] = useState<any>([]);
  const [uri, setUri] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const categories = ['SUV', 'Sedan', 'HatchBack', 'Truck'];

  useEffect(() => {
    if (type == 'edit') {
      onEditPrevValues();
    } else {
      setLoading(true);
      fetchAllVehicle();
    }
  }, [type]);

  const uploadImage = async (type?: any) => {
    try {
      if (uploadFile?.length >= 5) {
        showToast('error', 'You can upload a maximum of 5 images', false);
        return;
      }
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
          formik?.setFieldValue(type, response?.data?.fileUrl);
          setUploadFile((prevUrls: any) => [
            ...prevUrls,
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
      // PsetIndicatorrocess the selected file(s) here
      setUri((prevUrls: any) => [...prevUrls, result]);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
      } else {
      }
    }
  };
  const onEditPrevValues = () => {
    formik?.setFieldValue('vehicleType', editdata?.vehicleType);
    formik?.setFieldValue('vehicleName', editdata?.vehicleName);
    formik?.setFieldValue('vehicleModel', editdata?.vehicleModel);
    formik?.setFieldValue('vehicleYear', editdata?.vehicleYear);
    formik?.setFieldValue('vehicleColor', editdata?.vehicleColour);
    formik?.setFieldValue('vehicleId', editdata?.vehicleVinNo);
    formik?.setFieldValue('vehicleRegNumber', editdata?.vehicleRegisterationNo);
    formik?.setFieldValue('vehicleRegDate', editdata?.vehicleRegisterationDate);
    formik?.setFieldValue('vehicleActualPrice', editdata?.actualPricePerDay);
    setDate(editdata?.vehicleRegisterationDate); // Update local date state
    setUploadFile(editdata?.vehicleImages || []);
  };

  const onOpen = () => {
    formik?.resetForm();
    setUploadFile([]);
    setDate('');
    modalizeRef?.current?.open();
  };
  const handleSave = (values: any) => {
    if (type == 'edit') {
      modalizeRef?.current?.close();
      setLoading(true);
      let params = {
        vehicleType: values?.vehicleType,
        vehicleImages: uploadFile,
        vehicleName: values?.vehicleName,
        vehicleModel: values?.vehicleModel,
        vehicleYear: values?.vehicleYear,
        vehicleColour: values?.vehicleColor,
        vehicleVinNo: values?.vehicleId,
        vehicleRegisterationNo: date,
        vehicleRegisterationDate: values?.vehicleRegDate,
        actualPricePerDay: values?.vehicleActualPrice,
        // meditourPricePerHour: values?.meditourPrice,
      };
      let id = editdata?._id;
      editVehicle(id, params)
        .then((res: any) => {
          fetchAllVehicle();
          // setType('');
          showToast('Success', res?.data?.message, true);
        })
        .catch((err: any) => {})
        .finally(() => setLoading(false));
    } else if (uploadFile == undefined) {
      showToast('error', 'Please Select Images', false);
    } else {
      setTasks([...tasks, values]);
      _addvehicle(values);
    }
  };
  const handleFormik = () => {
    formik?.handleSubmit();
  };

  const formik = useFormik({
    initialValues: {
      vehicleType: '',
      vehicleName: '',
      vehicleModel: '',
      vehicleYear: '',
      vehicleColor: '',
      vehicleId: '',
      vehicleRegNumber: '',
      vehicleActualPrice: '',
      // meditourPrice: '',
    },

    validationSchema: addVehicleValidationSchema,
    onSubmit: (values: any) => {
      handleSave(values);
    },
  });

  const handleDropDown = () => {
    setRenderCategories(!renderCategories);
  };

  const _addvehicle = (values: any) => {
    if (date === '') {
      showToast('error', 'Please Select Date', false);
    } else if (!uploadFile || uploadFile.length === 0) {
      showToast(
        'error',
        'Please upload at least one image of the vehicle',
        false,
      );
      return;
    } else {
      setLoading(true);
      let params = {
        vehicleType: values?.vehicleType,
        vehicleImages: uploadFile,
        vehicleName: values?.vehicleName,
        vehicleModel: values?.vehicleModel,
        vehicleYear: values?.vehicleYear,
        vehicleColour: values?.vehicleColor,
        vehicleVinNo: values?.vehicleId,
        vehicleRegisterationNo: values?.vehicleRegNumber,
        vehicleRegisterationDate: date,
        actualPricePerDay: values?.vehicleActualPrice,
        // meditourPricePerHour: values?.meditourPrice,
      };
      //

      addVehicle(params)
        .then((res: any) => {
          modalizeRef?.current?.close();
          fetchAllVehicle();
          Alert.showSuccess('Your Vehicle has been added');
          formik?.resetForm();
        })
        .catch((err: any) => {
          Alert.showSuccess(err?.response?.data?.message);
        })
        .finally(() => setLoading(false));
    }
  };

  const fetchAllVehicle = (pageNumber = 1) => {
    if (pageNumber === 1) {
      setLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    getAllVehicles(pageNumber)
      .then((res: any) => {
        if (pageNumber === 1) {
          setVehicleList(res?.data?.vehicles);
        } else {
          setVehicleList((prevVehicles: any) => [
            ...prevVehicles,
            ...res?.data?.vehicles,
          ]);
        }

        if (res?.data?.vehicles.length === 0) {
          setHasMoreData(false);
        }
      })
      .catch((err: any) => {
        Alert.showSuccess(err?.response?.data?.message);
      })
      .finally(() => {
        if (pageNumber === 1) {
          setLoading(false);
        } else {
          setIsLoadingMore(false);
        }
        setRefreshing(false);
      });
  };

  const onSelect = (i: any) => {
    formik.setFieldValue('vehicleType', i);
    setRenderCategories(false);
  };

  const onEdit = (i: any, typ: any) => {
    setType(typ);
    setEditData(i);
    setLoading(true);
    setTimeout(() => {
      modalizeRef?.current?.open();
      setLoading(false);
    }, 2000);
  };

  const onDel = (i: any) => {
    setSimpleModal(true);
    setEditData(i);
  };

  const handleDelete = () => {
    setLoading(true);
    setSimpleModal(false);

    let id = editdata?._id;
    deleteVehicle(id)
      .then((res: any) => {
        Alert.showSuccess(res?.data?.message);
        fetchAllVehicle();
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  const onPressCard = (item: any) => {
    navigate('VehicleDetail', {item});
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setHasMoreData(true);
    fetchAllVehicle(1);
  };

  const handleDate = (event: any, selectedDate: any) => {
    setDatePicker(false);
    DateTimePickerAndroid.dismiss;
    const currentDate = selectedDate || date;
    const formattedDate = currentDate.toLocaleDateString('en-GB');
    if (event?.type === 'dismissed') {
      setDate(date);
      return;
    }
    setDate(formattedDate);
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.main}>
        <CustomHeader
          title={'Vehicles'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <View style={{...padding.Horizontal_24, flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={vehicleList}
            contentContainerStyle={{paddingBottom: 150}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            ListEmptyComponent={() => {
              return <>{!loading && <EmptyList />}</>;
            }}
            onEndReached={() => {
              if (hasMoreData && !isLoadingMore) {
                setPage(prevPage => prevPage + 1);
                fetchAllVehicle(page + 1);
              }
            }}
            ListFooterComponent={() => {
              return isLoadingMore && hasMoreData ? (
                <ActivityIndicator size="large" color={colors.primary} />
              ) : null;
            }}
            onEndReachedThreshold={0.5}
            renderItem={({item}: any) => (
              <RenderTask
                code={item?.vehicleModel}
                name={item?.vehicleName}
                item={item}
                onDel={onDel}
                colorCode={colorCode}
                onEdit={onEdit}
                colors={colors}
                styles={styles}
                toggleShowAllData={() => onPressCard(item)}
              />
            )}
          />
          <CustomModalize ref={modalizeRef} height={700}>
            <View style={{...margin.top_16}}>
              <Text SFbold size={16} style={styles.align} color={colorCode}>
                Vehicle Details
              </Text>
              <CustomFloatingLabelInput
                editable={false}
                formik={formik?.touched?.vehicleType}
                endIcon={dropIcon}
                errors={formik?.errors?.vehicleType}
                value={formik.values.vehicleType}
                m_Top={32}
                label="Vehicle Type"
                enablePress={handleDropDown}
              />

              {renderCategories && (
                <FlatList
                  scrollEnabled={false}
                  data={categories}
                  renderItem={({item}: any) => {
                    return (
                      <TouchableOpacity
                        style={styles.catListView}
                        onPress={() => onSelect(item)}>
                        <Text style={styles.listingText}>{item}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              )}

              {/* )} */}

              <CustomFloatingLabelInput
                onChangeText={formik.handleChange('vehicleName')}
                formik={formik?.touched?.vehicleName}
                errors={formik?.errors?.vehicleName}
                value={formik.values.vehicleName}
                m_Top={16}
                label="Vehicle Name"
              />
              <CustomFloatingLabelInput
                m_Top={RF(16)}
                maxLength={35}
                onChangeText={formik.handleChange('vehicleModel')}
                label={'Vehicle Model'}
                formik={formik?.touched?.vehicleModel}
                errors={formik?.errors?.vehicleModel}
                value={formik.values.vehicleModel}
              />

              <CustomFloatingLabelInput
                onChangeText={formik.handleChange('vehicleYear')}
                formik={formik?.touched?.vehicleYear}
                errors={formik?.errors?.vehicleYear}
                value={formik.values.vehicleYear}
                m_Top={32}
                label="Vehicle Year"
              />
              <CustomFloatingLabelInput
                onChangeText={formik.handleChange('vehicleColor')}
                formik={formik?.touched?.vehicleColor}
                errors={formik?.errors?.vehicleColor}
                value={formik.values.vehicleColor}
                m_Top={16}
                label="Vehicle Color"
              />
              <CustomFloatingLabelInput
                onChangeText={formik.handleChange('vehicleId')}
                formik={formik?.touched?.vehicleId}
                errors={formik?.errors?.vehicleId}
                value={formik.values.vehicleId}
                m_Top={16}
                label="Vehicle ID No."
              />
              <CustomFloatingLabelInput
                onChangeText={formik.handleChange('vehicleRegNumber')}
                formik={formik?.touched?.vehicleRegNumber}
                errors={formik?.errors?.vehicleRegNumber}
                value={formik.values.vehicleRegNumber}
                m_Top={16}
                label="Registration Number"
              />
              <CustomFloatingLabelInput
                value={date || ''}
                enablePress={() => setDatePicker(!datePicker)}
                m_Top={16}
                label="Registation Date"
              />
              <CustomFloatingLabelInput
                onChangeText={formik.handleChange('vehicleActualPrice')}
                formik={formik?.touched?.vehicleActualPrice}
                errors={formik?.errors?.vehicleActualPrice}
                value={formik.values.vehicleActualPrice}
                m_Top={16}
                // keyboardType={'numeric'}
                // loading={type == 'logo' && indicator}
                // endIcon={UploadIconFirst}
                label="Per Day Rent"
                // maxLength={35}
                // enablePress={() => uploadImage('medicineImage')}
              />
            </View>

            <UploadURL
              fileData={uploadFile}
              setUploadFile={setUploadFile}
              handleImg={() => uploadImage('vehicleImages')}
              indicator={indicator}
            />

            <AppButton
              title="SAVE"
              // iconTrue
              m_Top={56}
              onPress={handleFormik}
            />
          </CustomModalize>
        </View>

        <View style={styles.buttoncon}>
          <AppButton
            onPress={onOpen}
            bgColor={colors.orange}
            title={'ADD MORE'}
          />
        </View>
        {loading && <CustomLoader />}
        <Modal visible={simpleModal} transparent>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.6)',
              justifyContent: 'center',
              alignItems: 'center',
              padding: RF(24),
            }}>
            <View
              style={{
                height: 179,
                width: '100%',
                justifyContent: 'center',
                backgroundColor: '#ffff',
                borderRadius: 12,
                padding: RF(20),
              }}>
              <Text center SFmedium color={colors?.primary}>
                Are you sure to delete test record
              </Text>
              <View style={{...globalStyles?.row, marginTop: RF(24)}}>
                <AppButton
                  title="No"
                  width={'45%'}
                  onPress={() => setSimpleModal(false)}
                  containerStyle={{backgroundColor: '#006838'}}
                />
                <AppButton
                  title="Yes"
                  width={'45%'}
                  onPress={handleDelete}
                  containerStyle={{backgroundColor: colors?.orange}}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
      {datePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          maximumDate={new Date()}
          onChange={handleDate}
          disabled={false}
        />
      )}
    </Wrapper>
  );
};

const RenderTask = ({
  item,
  onDel,
  onEdit,
  styles,
  colors,
  toggleShowAllData,
  code,
  name,
  colorCode,
}: {
  item?: any;
  onDel?: any;
  styles?: any;
  colors?: any;
  onEdit?: any;
  toggleShowAllData?: any;
  code?: any;
  name?: any;
  colorCode?: any;
}) => {
  return (
    <TouchableOpacity
      onPress={() => toggleShowAllData(item.id)}
      style={{...styles.CardDesign, borderLeftColor: colorCode}}>
      <View style={globalStyles.row}>
        <Text size={16} SFmedium color={colorCode}>
          {code ? code : item?.testCode}
        </Text>
        <View style={globalStyles.rowSimple}>
          <Pressable
            onPress={() => onEdit(item, 'edit')}
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={edit2}
              style={{...styles.img, tintColor: colorCode}}
            />
          </Pressable>
          <Pressable
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => onDel(item)}>
            <Image source={del} style={{...styles.del, tintColor: colorCode}} />
          </Pressable>
        </View>
      </View>

      <View style={globalStyles?.row}>
        <Text
          SFregular
          size={14}
          color={colors.primary}
          style={margin?.Vertical_4}>
          {name ? name : item?.testName}
        </Text>
        {item?.potency ||
          (item?.vehicleYear && (
            <Text
              SFregular
              size={14}
              color={colors.primary}
              style={margin?.Vertical_4}>
              {item?.potency || item?.vehicleYear}
            </Text>
          ))}
      </View>
      <View style={globalStyles?.row}>
        <Text color={colors.primary} size={14} SFmedium>
          Price: ${' '}
          {item?.price ||
            item?.actualPrice ||
            item?.actualPricePerHour ||
            item?.actualPricePerDay}
          /-
        </Text>
        <Text color={colors.primary} size={14} SFregular>
          {item?.duration || item?.medicineType || item?.vehicleRegisterationNo}
        </Text>
      </View>

      <Text SFregular size={12} color={colors.fadeGray} style={margin?.top_16}>
        {item?.testDescription || item?.medicineBrand || item?.vehicleVinNo}
      </Text>
    </TouchableOpacity>
  );
};

const UploadURL = ({
  fileData,
  handleImg,
  indicator,
  setUploadFile,
}: {
  fileData?: any;
  handleImg?: any;
  indicator?: any;
  setUploadFile?: any;
}) => {
  const handleDelete = (index: number) => {
    if (setUploadFile) {
      const updatedData = fileData?.filter((_: any, i: any) => i !== index);
      setUploadFile(updatedData || []);
    }
  };
  return (
    <View style={{marginTop: RF(24), flexDirection: 'row'}}>
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
          Max five Images
        </Text>
      </Pressable>
      <FlatList
        horizontal
        scrollEnabled={false}
        data={fileData}
        renderItem={({item, index}: any) => {
          //

          return (
            <View
              style={{
                height: RF(45),
                width: RF(45),
                borderRadius: 8,
                overflow: 'hidden',
                marginLeft: RF(8),
              }}>
              <ImageBackground
                style={{height: '100%', width: '100%'}}
                source={{uri: item}}>
                <TouchableOpacity onPress={() => handleDelete(index)}>
                  <Image
                    source={del}
                    style={{
                      width: RF(12),
                      height: RF(12),
                      resizeMode: 'contain',
                      alignSelf: 'flex-end',
                      right: RF(4),
                      top: RF(4),
                    }}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Vehicles;
