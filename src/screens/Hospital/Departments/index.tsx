import useStyles from './styles';
import React, {useState, useRef, useEffect} from 'react';
import {CustomHeader, CustomLoader, EmptyList, Text} from '@components';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Wrapper, AppButton, AppTextInput, CustomModalize} from '@components';
import {DeptActive, EditButton, UploadIconFirst, del} from '@assets';
import {RF} from '@theme';
import {ScrollView} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useTheme} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import {
  deleteDepartmentB2b,
  getAllDepartments,
  globalStyles,
  hospitalAddDepartment,
  hospitalEditDepartment,
  padding,
  showToast,
} from '@services';
import {Alert} from '@utils';

const HospitalDepartments = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [input1, setInput1] = useState<any>('');
  const [editableLogo, setEditableLogo] = useState(false);
  const modalizeRef = useRef<Modalize>(null);
  const [allDept, setAllDept] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [selectedImage, setSelectedImage] = useState<any>('');
  const [edit, setEdit] = useState<any>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchAllDepartments();
  }, [page]);

  useEffect(() => {
    fetchAllDepartments();
  }, [refreshing]);

  const fetchAllDepartments = () => {
    let data = {
      page: page,
    };
    getAllDepartments(data)
      .then((res: any) => {
        const newDepartments = res?.data?.departments || [];
        if (newDepartments.length > 0) {
          setAllDept((prev: any) => [...prev, ...newDepartments]);
        } else {
          setHasMoreData(false);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const loadMoreDepartments = () => {
    if (hasMoreData && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const onEdit = (item: any) => {
    setEdit(true);
    modalizeRef.current?.open();
    setSelectedItem(item);
  };

  const editDepartments = (dpName: any) => {
    setLoading(true);
    let params = {
      departmentName: dpName,
    };
    let id = selectedItem?._id;
    hospitalEditDepartment(id, params)
      .then((res: any) => {
        setEdit(false);
        modalizeRef.current?.close();
        fetchAllDepartments();
        setInput1('');
        setSelectedImage('');
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setIsSubmitting(false);
      });
  };

  const addDepartments = (data: any) => {
    if (isSubmitting) return;
    if (!input1 || !selectedImage) {
      Alert.showError('Please fill all required fields.');
      setIsSubmitting(false); // Reset submitting state
      return;
    }
    setLoading(true);
    let params = {
      departmentName: data?.input1,
      dapartmentLogo: data?.selectedImage,
    };
    hospitalAddDepartment(params)
      .then((res: any) => {
        fetchAllDepartments(); // Fetch all departments
        modalizeRef.current?.close();
        setInput1(''); // Clear form fields
        setSelectedImage(''); // Clear selected image
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setIsSubmitting(false); // Reset submitting state
      });
  };

  const getAppointment_Req = () => {
    setLoading(true);
    let params = {
      departmentName: '',
      dapartmentLogo: '',
    };
    hospitalAddDepartment(params)
      .then((res: any) => {
        // setRequestData(res.data.recentAppointmentRequests);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const handleImagePicker = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setEditableLogo(true);
      setSelectedImage(result[0]?.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        console.error('Document picker error:', err);
      }
    }
  };

  const handleButtonPress = () => {
    if (isSubmitting) return; // Prevent multiple submissions

    if (!input1 || !selectedImage) {
      showToast('Error', 'Please fill all required fields.', false);
      return;
    }

    setIsSubmitting(true); // Set submitting state to true

    const newData = {input1, selectedImage};

    if (edit) {
      editDepartments(input1);
    } else {
      addDepartments(newData);
    }
  };

  const onClickable = (text: any, type: any) => {
    if (type == 'name') {
      setInput1(text);
      // setSelectedItem({
      //   departmentName: '',
      //   dapartmentLogo: selectedImage,
      //   doctorCount: input3,
      // });
      // setEdit(false);
    }
  };

  const deleteDep = (id: any) => {
    setLoading(true);
    let data = {
      id: id,
    };
    deleteDepartmentB2b(data)
      .then((res: any) => {
        Alert.showSuccess(res?.data?.message);
        fetchAllDepartments();
      })
      .catch((err: any) => {
        Alert.showError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{backgroundColor: '#F5F5F5', flex: 1}}>
        <CustomHeader
          title={'Departments'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        {/* <HeaderCard
          home
          icon1={LabMenu}
          numberOfIcons={'2'}
          onPress={openDrawer}
          tintColor={colors.primary}
          cardColor={colors.Hospital}>
          <UserHeaderContent
            tintColor={colors.primary}
            ScreenTitle={'Departments'}
            ColorScreenTitle={colors.primary}
          />
        </HeaderCard> */}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              enabled={true}
              onRefresh={handleRefresh}
            />
          }>
          <View style={styles.list}>
            <FlatList
              data={allDept}
              renderItem={(i: any, index: any) => {
                return (
                  <TouchableOpacity key={index} style={styles.CardDesign}>
                    <View style={globalStyles.row}>
                      <View style={styles.selectedcard}>
                        <Image
                          style={styles.cardImage}
                          source={{uri: i?.item?.dapartmentLogo}}
                        />
                      </View>
                      <View style={{flex: 1, marginLeft: RF(8)}}>
                        <View style={globalStyles.row}>
                          <Text
                            size={16}
                            SFmedium
                            color={colors.primary}
                            style={styles.cardText}>
                            {i?.item?.departmentName}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: RF(8),
                              alignItems: 'center',
                            }}>
                            <TouchableOpacity onPress={() => onEdit(i?.item)}>
                              <Image
                                source={EditButton}
                                style={{
                                  width: RF(24),
                                  height: RF(24),
                                  tintColor: colors.primary,
                                }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => deleteDep(i?.item?._id)}>
                              <Image
                                source={del}
                                style={{
                                  width: RF(16),
                                  height: RF(16),
                                  tintColor: 'red',
                                  resizeMode: 'contain',
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <Text
                          SFlight
                          size={14}
                          color={colors.primary}
                          style={styles.cardText}>
                          {/* {`${i?.item?.} Doctors Available Today`} */}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={() => <EmptyList />}
              onEndReached={loadMoreDepartments}
              onEndReachedThreshold={0.5}
              ListFooterComponent={() =>
                loading && hasMoreData ? <CustomLoader /> : null
              }
            />
          </View>

          <View style={styles.button}>
            <AppButton
              onPress={onOpen}
              bgClr={colors.Hospital}
              textcolor={colors?.bluE}
              title={allDept?.length < 0 ? 'Add Department' : 'Add More'}
            />
          </View>
        </ScrollView>

        <CustomModalize
          height={500}
          modalHeight={700}
          ref={modalizeRef}
          lineColor={colors.Hospital}>
          <View style={(padding.Vertical_16, padding.bottom_16)}>
            <View style={styles.view}>
              <Text
                SFbold
                size={16}
                style={styles.align}
                color={colors.primary}>
                Add Department
              </Text>

              <AppTextInput
                m_Top={32}
                value={input1}
                m_Vertical={18}
                startIcon={DeptActive}
                placeholder="Department Name"
                tintColorStart={colors?.grey}
                onChangeText={text => onClickable(text, 'name')}
                onSubmitEditing={(text: any) => {
                  // setEdit(true);
                }}
              />
              <AppTextInput
                m_Top={32}
                m_Vertical={18}
                editable={false}
                value={selectedImage}
                startIcon={DeptActive}
                endIcon={UploadIconFirst}
                onPress={handleImagePicker}
                placeholder="Department Logo"
                tintColorStart={colors?.grey}
              />

              {/* <AppTextInput
                m_Top={32}
                value={input3}
                startIcon={DocName}
                tintColorStart={colors}
                placeholder="Available doctors"
                onChangeText={text => onClickable(text, 'dr')}
                onSubmitEditing={(text: any) => {}}
              /> */}
            </View>
            <View style={{marginBottom: RF(60)}}>
              <AppButton
                m_Top={56}
                title={isSubmitting ? 'Saving...' : 'Save'}
                textcolor={colors?.blueText}
                bgClr={colors.Hospital}
                onPress={handleButtonPress}
              />
            </View>
          </View>
        </CustomModalize>
      </View>

      {loading && <CustomLoader />}
    </Wrapper>
  );
};
export default HospitalDepartments;
