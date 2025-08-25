import {
  View,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
  Modal,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {
  Wrapper,
  AppButton,
  HeaderCard,
  CustomModalize,
  UserHeaderContent,
  EmptyList,
  CustomFloatingLabelInput,
  CustomHeader,
  ActivationCard,
} from '@components';
import {del, drawer, dropIcon, edit2, LabMenu} from '@assets';
import {
  margin,
  showToast,
  globalStyles,
  addMedicine,
  getAllMedicines,
  PharmMedEdit,
  addMedfoValidationSchema,
  PharmMedDELETE,
  rv,
} from '@services';
import {getColorCode, RF} from '@theme';
import {useFormik} from 'formik';
import {Modalize} from 'react-native-modalize';
import {CustomLoader, Text} from '@components';
import {useTheme} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import useStyles from './styles';
import {mapData} from './map';
import {useDispatch, useSelector} from 'react-redux';
import {setFCMToken, setIsLoggedIn} from '@redux';
const typeData = [
  {id: 1, text: 'Tablet'},
  {id: 2, text: 'Capsule'},
  {id: 3, text: 'Syrup'},
  {id: 4, text: 'injection'},
];
const PharmacyTest = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const {allMed, colorCode} = getColorCode();
  const modalizeRef = useRef<Modalize>(null);
  const [tasks, setTasks] = useState<any>([]);
  const [testList, setTestList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editdata, setEditData] = useState<any>(null);
  const [simpleModal, setSimpleModal] = useState<any>(false);
  const [totalMed, setTotalMed] = useState(0);
  const [type, setType] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [indicator, setIndicator] = useState(false);
  const {user} = useSelector((state: any) => state?.root?.user);
  const {changeStack} = useSelector((state: any) => state?.root?.shiftStack);

  useEffect(() => {
    if (type == 'edit') {
      onEditPrevValues();
    } else {
      // getAllCategories();
      fetchAllMed();
    }
  }, [type, page]);

  const onEditPrevValues = () => {
    formik?.setFieldValue('generic', editdata?.generic);
    formik?.setFieldValue('productType', editdata?.productType);
    formik?.setFieldValue('strength', editdata?.strength);
    formik?.setFieldValue('packSize', editdata?.packSize);
    formik?.setFieldValue('brand', editdata?.brand);
    formik?.setFieldValue('content', editdata?.content);
    formik?.setFieldValue('actualPrice', editdata?.tpPrice);
    formik?.setFieldValue('mrpPrice', editdata?.mrpPrice);
  };

  const onOpen = () => {
    modalizeRef?.current?.open();
  };

  const handleSave = (values: any) => {
    if (type == 'edit') {
      modalizeRef?.current?.close();

      setLoading(true);
      let params = {
        generic: values?.generic,
        brand: values?.brand,
        productType: values?.productType,
        strength: values?.strength,
        packSize: values?.packSize,
        content: values?.content,
        tpPrice: values?.actualPrice,
        mrpPrice: values?.mrpPrice,
      };
      let id = editdata?._id;
      PharmMedEdit(id, params)
        .then((res: any) => {
          fetchAllMed();
          setType('');
          formik?.resetForm();
          showToast('Success', res?.data?.message, true);
        })
        .catch((err: any) => {})
        .finally(() => setLoading(false));
    } else {
      setTasks([...tasks, values]);
      modalizeRef?.current?.close();
      _addTest(values);
      formik?.resetForm();
    }
  };
  const handleFormik = () => {
    formik?.handleSubmit();
  };

  const formik: any = useFormik({
    initialValues: {
      generic: '',
      brand: '',
      productType: '',
      strength: '',
      content: '',
      packSize: '',
      actualPrice: '',
      mrpPrice: '',
    },

    validationSchema: addMedfoValidationSchema,
    onSubmit: (values: any) => {
      handleSave(values);
    },
  });

  const _addTest = (values: any) => {
    setLoading(true);
    let params: any = {
      generic: values?.generic,
      brand: values?.brand,
      productType: values?.productType,
      strength: values?.strength,
      packSize: values?.packSize,
      content: values?.content,
      tpPrice: values?.actualPrice,
      mrpPrice: values?.mrpPrice,
    };
    //
    addMedicine(params)
      .then((res: any) => {
        setPage(1);
        fetchAllMed();
        showToast('Success', 'Your Medicine has been added', true);
      })
      .catch((err: any) => {
        showToast('Error', err?.response?.data?.message, false);
      })
      .finally(() => setLoading(false));
  };

  const fetchAllMed = () => {
    indicator == false && refreshing == false && setLoading(true);
    getAllMedicines(page, allMed)
      .then((res: any) => {
        setTotalMed(res?.data?.totalMeds);
        if (res?.data?.nextPage) {
          setNextPage(res?.data?.nextPage);
        }
        if (page > 1) {
          let newArr = testList.concat(res?.data?.medicines);
          setTestList(newArr);
        } else {
          setTestList(res?.data?.medicines);
        }
        // setTestList(res?.data?.medicines);
      })
      .catch((err: any) => {
        showToast('Error', err?.response?.message, false);
      })
      .finally(() => setLoading(false));
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
    PharmMedDELETE(id)
      .then((res: any) => {
        showToast('Success', res?.data?.message, true);
        fetchAllMed();
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setTimeout(() => {
      fetchAllMed();
      setRefreshing(false);
    }, 100);
  };

  const fetchNextPage = () => {
    if (nextPage && page < nextPage) {
      setPage(page + 1);
      setIndicator(true);
      setTimeout(() => {
        setIndicator(false);
      }, 2000);
    }
  };

  const data = mapData(formik);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setIsLoggedIn(false));
    dispatch(setFCMToken(null))
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader title={'All Medicine'} titleColor={colors.white} notify />
      <Text
        SFmedium
        color={
          (user?.paidActivation === true && '#fff') ||
          (changeStack === 'Pharmaceutical' && '#000')
        }
        onPress={handleLogout}
        style={
          (user?.paidActivation === true && {
            padding: 12,
            borderWidth: 0.5,
            position: 'absolute',
            top: rv(45),
            left: rv(16),
            borderRadius: 10,
            borderColor: '#fff',
          }) ||
          (changeStack === 'Pharmaceutical' && {
            padding: 6,
            elevation: 5,
            backgroundColor: '#fff',
            position: 'absolute',
            top: rv(125),
            left: rv(16),
            zIndex: 1000,
            borderRadius: 10,
          })
        }>
        Log Out
      </Text>

      {/* <HeaderCard
        twoInRow
        icon1={drawer}
        numberOfIcons={'3'}
        userName={false}
        tintColor={'#fff'}
        cardColor={colors.Pharmacy}>
        <UserHeaderContent tintTr={'#fff'} ScreenTitle={'All Medicine'} />
      </HeaderCard> */}
      {testList?.length > 0 && (
        <Text
          size={16}
          SFmedium
          color={colors.blueText}
          style={{margin: RF(16)}}>
          Total Medicine = {totalMed}
        </Text>
      )}
      <FlatList
        data={testList}
        contentContainerStyle={{
          paddingBottom: 150,
          paddingHorizontal: 16,
        }}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        ListFooterComponent={
          <ActivityIndicator size={'small'} animating={indicator} />
        }
        onEndReached={fetchNextPage}
        ListEmptyComponent={<EmptyList />}
        renderItem={({item}: any) => (
          <RenderTask
            code={item?.medCode}
            name={item?.generic}
            item={item}
            onDel={onDel}
            colorCode={colorCode}
            onEdit={onEdit}
            colors={colors}
            styles={styles}
          />
        )}
      />
      <CustomModalize ref={modalizeRef} height={700} modalHeight={700}>
        <View style={{...margin.top_16}}>
          <Text SFbold size={16} style={styles.align} color={colorCode}>
            Add Medicine
          </Text>
          <FlatList
            scrollEnabled={false}
            data={data}
            renderItem={({item}: any) => (
              <>
                <CustomFloatingLabelInput
                  keyboardType={
                    item?.label === 'T.P Price' || item?.label === 'M.R.P Price'
                      ? 'numeric'
                      : 'name-phone-pad'
                  }
                  m_Top={item?.m_Top}
                  maxLength={item?.maxLength}
                  onChangeText={item?.onChangeText}
                  label={item?.label}
                  formik={item?.formik}
                  errors={item.errors}
                  value={item?.value}
                />
              </>
            )}
          />
          <DropList
            FormName={'Select Product Type'}
            FormData={typeData}
            styles={styles}
            formik={formik?.values?.productType}
            stateField={(text: any) =>
              formik?.setFieldValue('productType', text)
            }
          />
          {formik?.touched?.productType && formik?.errors?.productType ? (
            <Text style={{color: 'red'}}>{formik?.errors?.productType}</Text>
          ) : null}
        </View>
        <AppButton
          title="SAVE"
          containerStyle={{backgroundColor: colors?.Pharmacy}}
          // iconTrue
          m_Top={56}
          onPress={handleFormik}
        />
      </CustomModalize>
      <View style={styles.buttoncon}>
        <AppButton
          onPress={onOpen}
          containerStyle={{backgroundColor: colors?.Pharmacy}}
          title={testList?.length <= 0 ? 'Add Medicine' : 'ADD MORE'}
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
      {user?.paidActivation === true ? null : <ActivationCard />}
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
  const medData = [
    {id: 8, title: 'Product Type', value: item?.productType},
    {id: 0, title: 'Generic', value: item?.generic},
    {id: 1, title: 'Strength', value: item?.strength},
    {id: 2, title: 'Content', value: item?.content},
    {id: 3, title: 'Pack Size', value: item?.packSize},
    {id: 4, title: 'T.p Price', value: item?.tpPrice},
    {id: 5, title: 'M.R.P Price', value: item?.mrpPrice},
  ];

  return (
    <TouchableOpacity
      disabled={true}
      onPress={() => toggleShowAllData(item.id)}
      style={{...styles.CardDesign, borderLeftColor: colorCode}}>
      {medData.map(({title, value}: any, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            marginTop: RF(4),
          }}>
          <Text SFbold size={14} color={colors.primary}>
            {title}:{' '}
          </Text>
          <Text
            SFregular
            size={14}
            color={colors.primary}
            numberOfLines={1}
            style={{width: '50%', textAlignVertical: 'bottom'}}>
            {value}
          </Text>
        </View>
      ))}

      <View
        style={{flexDirection: 'row', position: 'absolute', right: 0, top: 15}}>
        <Pressable
          onPress={() => onEdit(item, 'edit')}
          style={{
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={edit2} style={{...styles.img, tintColor: colorCode}} />
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
}
const DropList = (props: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {FormName, FormData, styles, formik, stateField, top} = props;
  const [clicked, setClicked] = useState(false);

  const handleSelect = (text: any) => {
    stateField(text);
    setClicked(!clicked);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.AgeDropDownStyle}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text size={12} SFregular color={'rgba(125, 125, 125, 1)'}>
          {formik === '' ? FormName : formik}
        </Text>
        <Image
          source={dropIcon}
          tintColor={colors.blueText}
          style={styles.dropDownImage}
        />
      </TouchableOpacity>

      {clicked ? (
        <FlatList
          data={FormData}
          scrollEnabled={false}
          style={{
            // position: 'absolute',
            // zIndex: 10,
            // top: top,
            // width: '100%',
            backgroundColor: 'white',
            elevation: 5,
            // bottom: -75,
            // shadowColor: '#000',
            // shadowOffset: {width: 0, height: 2},
            // shadowOpacity: 0.25,
            // shadowRadius: 3.84,
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.TouchableStyle,
                {
                  backgroundColor: formik === item.text ? '#00276D' : '#fff',
                },
              ]}
              onPress={() => handleSelect(item.text)}>
              <Text
                SFmedium
                size={14}
                color={formik === item.text ? '#fff' : colors.blueText}
                style={{marginHorizontal: 10}}>
                {item.text}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : null}
    </>
  );
};

export default PharmacyTest;

// const uploadImage = async (type?: any) => {
//   try {
//     const result = await DocumentPicker.pick({
//       type: [DocumentPicker.types.allFiles],
//     });
//     setIndicator(true);
//     let imageUrl = result[0]?.uri;
//     let name = imageUrl.split('/').pop();

//     const headers = {
//       'Content-Type': 'multipart/form-data',
//     };

//     const formData = new FormData();
//     formData.append('file', {
//       uri: imageUrl,
//       type: 'image/jpeg',
//       name: name,
//     });

//     axios
//       .post(BASE_URL + ENDPOINTS?.PHARM_UPLOAD_FILE, formData, {
//         headers: headers,
//       })
//       .then(response => {
//         formik?.setFieldValue(type, response?.data?.fileUrl);
//       })
//       .catch(error => {
//         if (error?.response?.data?.message == undefined) {
//           showToast('error', 'Server error', false);
//         }
//       })
//       .finally(() => {
//         setIndicator(false);
//       });
//     // Process the selected file(s) here
//   } catch (error) {
//     // Handle the case where the user canceled the picker
//     if (DocumentPicker.isCancel(error)) {
//     } else {
//       // Handle other errors
//       console.error('DocumentPicker Error:', error);
//     }
//   }
// };
