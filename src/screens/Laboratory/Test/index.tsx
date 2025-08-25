import {
  View,
  Image,
  FlatList,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Modal,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {
  Wrapper,
  AppButton,
  HeaderCard,
  AppTextInput,
  CustomModalize,
  UserHeaderContent,
  EmptyList,
  CustomHeader,
} from '@components';
import {
  del,
  dropIcon,
  edit2,
  LabBell,
  LabMenu,
  TestLab1,
  LabTestCode,
  LabMediTour,
  LabTestTime,
  LabTestPrice,
  drawer,
  search,
  cross,
} from '@assets';
import {
  margin,
  navigate,
  padding,
  addTest,
  showToast,
  getAllTests,
  LabTestEdit,
  globalStyles,
  LabTestDELETE,
  LabGetTestCategory,
  testInfoValidationSchema,
  getAllTestLab,
  addTestLabortery,
  validationTest,
} from '@services';
import {getColorCode, RF} from '@theme';
import moment from 'moment';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import {Modalize} from 'react-native-modalize';
import {CustomLoader, Text} from '@components';
import {useTheme} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useStyles from './styles';

const LaboratoryTest = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const {colorCode} = getColorCode();
  const modalizeRef = useRef<Modalize>(null);
  const [tasks, setTasks] = useState<any>([]);
  const [testList, setTestList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [editdata, setEditData] = useState<any>(null);
  const [simpleModal, setSimpleModal] = useState<any>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<any>([]);
  const [type, setType] = useState('');
  const [searchDoctorText, setSearchDoctorText] = useState<any>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [scroling, setScrolling] = useState(false);
  const [renderCategories, setRenderCategories] = useState(false);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [indicator, setIndicator] = useState<any>(false);
  const [totalOrders, setTotalOrders] = useState<any>(0);
  const [ShoWTestName, SetTestName] = useState(false);
  useEffect(() => {
    if (type == 'edit') {
      onEditPrevValues();
    } else {
      getAllCategories();
      fetchAllTest();
      getAllDropList();
    }
  }, [type]);
  const getAllDropList = () => {
    setLoading(true);
    let data = {
      search: searchDoctorText,
      page: '',
    };
    getAllTestLab(data)
      .then((res: any) => {
        //
        setData(res?.data?.data);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (refreshing) {
      setLoading(false);
    }
  }, [refreshing]);

  const onEditPrevValues = () => {
    formik.setFieldValue('testName', editdata.testNameId?.name);
    formik.setFieldValue('testDescription', editdata.testDescription);
    formik.setFieldValue('price', editdata.price.toString());
    formik.setFieldValue('meditourPrice', editdata.priceForMeditour.toString());
    formik.setFieldValue('duration', editdata.duration);
  };

  const onOpen = () => {
    setShow(true);
  };

  const handleSave = (values: any) => {
    if (parseFloat(values?.meditourPrice) > parseFloat(values?.price)) {
      showToast('Error', 'Meditour price greater than Price', false);
      return;
    }

    setTasks([...tasks, values]);
    setShow(false);
    _addTest(values);
    formik?.resetForm();
  };
  const onPressTest = (item: any) => {
    navigate('B2BDetailScreen', {item: item});
  };

  const handleFormik = () => {
    formik?.handleSubmit();
  };
  const handleForm = () => {
    form?.handleSubmit();
  };
  const formik: any = useFormik({
    initialValues: {
      price: '',
      testName: '',
      duration: '',
      meditourPrice: '',
      testDescription: '',
      selectId: '',
    },

    validationSchema: testInfoValidationSchema,
    onSubmit: (values: any) => {
      setSearchDoctorText('');
      handleSave(values);
    },
  });
  const form = useFormik({
    initialValues: {
      name: '',
      categoryName: '',
    },

    validationSchema: validationTest,
    onSubmit: (values: any) => {
      handleTest(values);
    },
  });
  const onConfirmTime = async (time: any) => {
    setModalVisible(false);
    const selectedTime = moment(time);
    const formattedTime = selectedTime.format('hh:mm A');
    formik?.setFieldValue('duration', formattedTime);
  };

  const hideTimeModal = () => {
    setModalVisible(false);
  };

  const handleDropDown = () => {
    setRenderCategories(!renderCategories);
  };

  const _addTest = (values: any) => {
    setLoading(true);
    let params = {
      price: values?.price,
      testNameId: values?.selectId,
      duration: values?.duration,
      // categoryName: values?.categoryName,
      priceForMeditour: values?.meditourPrice,
      testDescription: values?.testDescription,
    };
    addTestLabortery(params)
      .then((res: any) => {
        fetchAllTest();
        setShow(false);
        showToast('Success', 'Test Added', true);
      })
      .catch((err: any) => {
        showToast('Error', err?.response?.data?.message, false);
      })
      .finally(() => setLoading(false));
  };

  const fetchNextPage = () => {
    if (nextPage && page < nextPage) {
      setPage(page + 1);
      setIndicator(true);
      fetchAllTest();
    }
  };

  const fetchAllTest = () => {
    setLoading(refreshing ? false : true);
    getAllTests(page)
      .then((res: any) => {
        // setNextPage(res?.data?.nextPage)

        setTotalOrders(res?.data?.totalTests);
        if (page > 1) {
          let newArr = testList.concat(res?.data?.tests);
          setTestList(newArr);
        } else {
          setTestList(res?.data?.tests);
        }
      })
      .catch((err: any) => {
        showToast('Error', err?.response?.message, false);
      })
      .finally(() => {
        setLoading(false);
        setIndicator(false);
      });
  };

  const getAllCategories = () => {
    setLoading(true);
    LabGetTestCategory()
      .then((res: any) => {
        setCategoryList(res?.data?.testCategories);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };
  const CloseModal = () => {
    SetTestName(false);
    form.resetForm();
  };
  const onSelect = (i: any) => {
    form.setFieldValue('categoryName', i.categoryName);
    setRenderCategories(false);
  };
  const handleTest = (values: any) => {
    if (!values.name) {
      showToast('Error', 'Please Add Test Name', false);
      return;
    }
    if (!values.categoryName) {
      showToast('Error', 'Please Add CategoryName', false);
      return;
    }
    setScrolling(true);
    let data = {
      testName: values?.name,
      categoryName: values?.categoryName,
    };
    addTest(data)
      .then((res: any) => {
        //
        form.resetForm();
        SetTestName(!ShoWTestName);
        getAllDropList();
        showToast('Success', 'Add Test SuccessFully', true);
      })
      .catch((err: any) => {
        ToastAndroid.show(
          err?.response?.data?.message || 'Error occurred',
          ToastAndroid.LONG,
        );
      })
      .finally(() => {
        setScrolling(false);
      });
  };

  const onDel = (i: any) => {
    setSimpleModal(true);
    setEditData(i);
  };

  const handleDelete = () => {
    setLoading(true);
    setSimpleModal(false);
    let id = editdata?._id;
    LabTestDELETE(id)
      .then((res: any) => {
        showToast('Success', res?.data?.message, true);
        fetchAllTest();
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const handleRefresh = () => {
    setSearchDoctorText('');
    setRefreshing(true);
    setTimeout(() => {
      fetchAllTest();
      setRefreshing(false);
    }, 2000);
  };
  const onChangeTextSearch = (val: any) => {
    setSearchDoctorText(val);
  };
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const onSubmitEditing = () => {
    getAllDropList();
  };
  useEffect(() => {
    if (searchDoctorText == '') {
      getAllDropList();
    }
  }, [searchDoctorText]);
  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'All Test'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <View style={{...padding.Horizontal_16}}>
          {!show && (
            <View style={padding.Horizontal_16}>
              {testList?.length > 0 && (
                <Text
                  size={16}
                  SFmedium
                  color={colors.blueText}
                  style={{marginVertical: RF(8)}}>
                  Total Test = {totalOrders}
                </Text>
              )}
            </View>
          )}

          <DateTimePickerModal
            mode="time"
            onCancel={hideTimeModal}
            isVisible={modalVisible}
            onConfirm={onConfirmTime}
          />

          {show && (
            <View
              style={{
                backgroundColor: '#fff',
                elevation: 5,
                padding: RF(8),
                marginTop: RF(16),
                borderRadius: RF(8),
              }}>
              <Text
                SFbold
                size={16}
                style={styles.align}
                color={colors.LabOrange}>
                Test Info
              </Text>
              <TouchableOpacity
                onPress={handleClose}
                style={{
                  position: 'absolute',
                  zIndex: 10,
                  right: RF(8),
                  top: RF(8),
                }}>
                <Image
                  source={cross}
                  style={{width: RF(20), height: RF(20), resizeMode: 'contain'}}
                />
              </TouchableOpacity>
              <DropList
                FormName={'Select Test'}
                FormData={data}
                styles={styles}
                onChangeTextSearch={onChangeTextSearch}
                onSubmitEditing={onSubmitEditing}
                value={searchDoctorText}
                top={RF(62)}
                ListEmptyComponent={
                  <EmptyList
                    height={RF(100)}
                    // description={loading ? 'Loading.....' : 'No data found'}
                  />
                }
                formik={formik?.values?.testName}
                stateField={formik}
              />
              {formik?.touched?.testName && formik?.errors?.testName && (
                <Text style={globalStyles.errors}>
                  {formik?.errors?.testName}
                </Text>
              )}
              <View style={{alignSelf: 'flex-end'}}>
                <AppButton
                  title={ShoWTestName ? 'Cancel' : 'Add New'}
                  width={RF(80)}
                  height={RF(20)}
                  b_R={RF(8)}
                  onPress={() => {
                    if (ShoWTestName) {
                      SetTestName(false);
                    } else {
                      SetTestName(true);
                    }
                  }}
                />
              </View>
              <Modal
                animationType="fade"
                transparent={true}
                visible={ShoWTestName}>
                <View style={styles.bgView}>
                  <View style={styles.Container2}>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Text size={14} SFmedium>
                          Custom
                        </Text>
                        <TouchableOpacity onPress={CloseModal}>
                          <Image
                            source={cross}
                            style={{
                              width: RF(20),
                              height: RF(20),
                              resizeMode: 'contain',
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                      <AppTextInput
                        m_Top={16}
                        onChangeText={form.handleChange('name')}
                        formik={form?.touched?.name}
                        errors={form?.errors?.name}
                        value={form.values.name}
                        placeholder="Enter Test Name"
                      />
                      <AppTextInput
                        m_Top={16}
                        onChangeText={form.handleChange('categoryName')}
                        formik={form?.touched?.categoryName}
                        errors={form?.errors?.categoryName}
                        value={form.values.categoryName}
                        placeholder="Category Name"
                        startIcon={LabTestCode}
                        endIcon={dropIcon}
                        editable={false}
                        onPress={handleDropDown}
                      />
                      {renderCategories && (
                        <FlatList
                          data={categoryList}
                          showsVerticalScrollIndicator={false}
                          style={{
                            maxHeight: RF(250),
                            width: '100%',
                            backgroundColor: '#fff',
                            elevation: 5,
                            alignSelf: 'center',
                          }}
                          renderItem={({item}: any) => {
                            return (
                              <TouchableOpacity
                                style={styles.catListView}
                                onPress={() => onSelect(item)}>
                                <Text style={styles.listingText}>
                                  {item?.categoryName}
                                </Text>
                              </TouchableOpacity>
                            );
                          }}
                        />
                      )}
                      <AppButton
                        title="Save"
                        width={RF(60)}
                        disabled={loading}
                        m_Top={RF(16)}
                        onPress={handleForm}
                        height={RF(20)}
                        b_R={RF(8)}
                      />
                    </View>
                  </View>
                </View>
              </Modal>

              <AppTextInput
                onChangeText={formik.handleChange('testDescription')}
                formik={formik?.touched?.testDescription}
                errors={formik?.errors?.testDescription}
                value={formik.values.testDescription}
                m_Top={8}
                placeholder="Test Description"
                startIcon={TestLab1}
              />
              <AppTextInput
                onChangeText={formik.handleChange('price')}
                formik={formik?.touched?.price}
                errors={formik?.errors?.price}
                value={formik.values.price}
                keyboardType="numeric"
                m_Top={8}
                placeholder="Price"
                startIcon={LabTestPrice}
              />

              <AppTextInput
                onChangeText={formik.handleChange('duration')}
                formik={formik?.touched?.duration}
                errors={formik?.errors?.duration}
                value={formik.values.duration}
                m_Top={8}
                placeholder="Duration"
                startIcon={LabTestTime}
              />
              <AppTextInput
                onChangeText={formik.handleChange('meditourPrice')}
                formik={formik?.touched?.meditourPrice}
                errors={formik?.errors?.meditourPrice}
                value={formik.values.meditourPrice}
                keyboardType="numeric"
                m_Top={8}
                placeholder="Price for Meditour"
                startIcon={LabMediTour}
              />
              <AppButton
                title="SAVE"
                // iconTrue
                disabled={loading}
                m_Top={16}
                width={RF(200)}
                height={RF(35)}
                onPress={handleFormik}
              />
            </View>
          )}

          {scroling && <CustomLoader />}
          {/* </View>
          </View>
        </Modal> */}
        </View>
        {!show && (
          <>
            <FlatList
              data={testList}
              onEndReached={fetchNextPage}
              contentContainerStyle={{
                paddingBottom: RF(150),
                paddingHorizontal: RF(24),
              }}
              renderItem={({item}: any) => (
                <RenderTask
                  item={item}
                  onDel={onDel}
                  // onEdit={onEdit}
                  colors={colors}
                  styles={styles}
                  toggleShowAllData={() => onPressTest(item)}
                />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
              ListFooterComponent={
                indicator && (
                  <ActivityIndicator
                    size={'small'}
                    color={'#000'}
                    // animating={indicator}
                  />
                )
              }
            />
            <View style={styles.buttoncon}>
              <AppButton
                onPress={onOpen}
                containerStyle={{backgroundColor: colorCode}}
                title={testList?.length <= 0 ? 'ADD TEST' : 'ADD MORE TEST'}
              />
            </View>
          </>
        )}
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
    </Wrapper>
  );
};

const RenderTask = ({
  item,
  onDel,
  // onEdit,
  styles,
  colors,
  toggleShowAllData,
}: {
  item?: any;
  onDel?: any;
  styles?: any;
  colors?: any;
  // onEdit?: any;
  toggleShowAllData?: any;
}) => {
  return (
    <TouchableOpacity
      onPress={() => toggleShowAllData(item.id)}
      style={styles.CardDesign}>
      <View style={globalStyles.row}>
        <Text size={16} SFmedium color={colors.orange}>
          {item?.testCode}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => onDel(item)}>
            <Image source={del} style={styles.del} />
          </Pressable>
        </View>
      </View>

      <Text
        SFregular
        size={14}
        color={colors.primary}
        style={margin?.Vertical_4}>
        {item?.testNameId?.name}
      </Text>
      <View style={globalStyles?.row}>
        <Text color={colors.primary} size={14} SFregular>
          Price: {item?.price}/-
        </Text>
        <Text color={colors.primary} size={14} SFregular>
          {item?.duration}
        </Text>
      </View>
      <Text color={colors.primary} size={14} SFregular>
        Price For Meditour: {item?.priceForMeditour}/-
      </Text>
      <Text color={colors.primary} size={14} SFregular>
        {item?.testDescription}
      </Text>
      {/* <Text SFregular size={12} color={colors.fadeGray} style={margin?.top_16}>
        {item?.testDescription}
      </Text> */}
    </TouchableOpacity>
  );
};

interface Props {
  FormName?: any;
  Name?: any;
  FormData?: any;
  formik: any;
  stateField: any;
  top?: any;
  custom?: any;
  onPress?: any;
  styles?: any;
  value?: any;
  onSubmitEditing?: any;
  onChangeTextSearch?: any;
  ListEmptyComponent?: any;
}
const DropList = (props: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {
    FormName,
    FormData,
    formik,
    stateField,
    top,
    styles,
    value,
    onSubmitEditing,
    onChangeTextSearch,
    ListEmptyComponent,
  } = props;
  const [clicked, setClicked] = useState(false);

  const handleSelect = (text: any) => {
    stateField.setFieldValue('selectId', text._id);
    stateField.setFieldValue('testName', text.name);
    setClicked(!clicked);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.AgeDropDownStyle}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text size={12} SFregular color={colors.blueText}>
          {formik === '' ? FormName : formik}
        </Text>
        <Image
          source={dropIcon}
          tintColor={colors.blueText}
          style={styles.dropDownImage}
        />
      </TouchableOpacity>

      {clicked ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 10,
            top: top,
            width: '100%',
            backgroundColor: 'white',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            overflow: 'hidden',
            alignSelf: 'center',
            borderBottomLeftRadius: RF(8),
            borderBottomRightRadius: RF(8),
          }}>
          <View style={styles.ContainerDetails}>
            <Image source={search} style={styles.ImageStyles} />
            <TextInput
              style={{width: '80%', marginLeft: RF(8)}}
              placeholder={'Search'}
              placeholderTextColor={'#0D47A1'}
              onChangeText={onChangeTextSearch}
              onSubmitEditing={onSubmitEditing}
              value={value}
            />
          </View>
          <FlatList
            data={FormData}
            style={{maxHeight: RF(250)}}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={ListEmptyComponent}
            renderItem={({item}) => (
              <>
                <TouchableOpacity
                  style={[
                    styles.TouchableStyle,
                    {
                      backgroundColor:
                        formik === item.name ? '#00276D' : '#fff',
                    },
                  ]}
                  onPress={() => handleSelect(item)}>
                  <Text
                    SFmedium
                    size={14}
                    color={formik === item.name ? '#fff' : colors.blueText}
                    style={{marginHorizontal: 10}}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          />
        </View>
      ) : null}
    </>
  );
};

export default LaboratoryTest;
