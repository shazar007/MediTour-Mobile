import {
  Alert,
  FlatList,
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  AppButton,
  CardComponent,
  CheckBox,
  CustomAccordion,
  CustomHeader,
  CustomLoader,
  CustomModalize,
  HeaderCard,
  Line,
  LinearComponent,
  MedicineDetail,
  NearAvailable,
  SquareCards,
  Text,
  UpComingTab,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {RF, SCREEN_WIDTH} from '@theme';
import {Document, Grouping, LabDownload, crossIcon, paper} from '@assets';
import {useTheme} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import {
  Preception_Details,
  add_File,
  getReferralDoctor,
  getUser_Laboratory,
  margin,
  navigate,
  saveUploadResulsUser,
  showToast,
  rs,
} from '@services';
import {useDispatch, useSelector} from 'react-redux';
import {getFileIcon} from './ImageSelect';
import RNFetchBlob from 'react-native-blob-util';
import {Modalize} from 'react-native-modalize';
import {Pressable} from 'react-native';
import {setAmount, setStripeObj} from '@redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
const dataInfo = [
  {id: 1, title: 'Visit'},
  {id: 2, title: 'Home Samle'},
];
const PreceptionDetails = ({route}: any) => {
  const {item} = route.params;
  const [error, setError] = useState<any>('');
  const theme: any = useTheme();
  const [loading, setLoading] = useState(false);
  const colors = theme.colors;
  const [data, setData] = useState<any>([]);
  const [refer, setRefer] = useState<any>([]);
  const modalizeRef = useRef<Modalize>(null);
  const [filterlab, setFilterLabs] = useState<any>([]);
  const [selected, setSelected] = useState();
  const [testData, setTestData] = useState<any>([]);
  const [resultData, setResult] = useState<any>([]);
  const [SelectCircle, setSelectCircle] = useState();
  const [selectedPreference, setSelectedPreference] = useState('Visit');
  const [prescription, setPrescription] = useState<any>([]);
  const [labData, setLabData] = useState<any>([]);
  const [labReports, setLabReports] = useState<any>([]);
  const [selectedCards, setSelectedCards] = useState<any>(null);
  const dispatch = useDispatch();
  const {selectedAddress} = useSelector((state: any) => state.root.user);
  const [file, setFile] = useState<any>(null);
  useEffect(() => {
    const loadFileFromStorage = async () => {
      const storedFile = await AsyncStorage.getItem('uploadedFile');
      if (storedFile) {
        setFile(JSON.parse(storedFile));
      }
    };

    loadFileFromStorage();
  }, []);

  const handelSelectYes = (item: any) => {
    setSelected(item.title);
  };
  const handleItem = (item: any) => {
    setSelectCircle(item.title);
  };
  const fileIcons = {
    pdf: Document,
    document: paper,
  };
  const deleteFile = async () => {
    setFile(null);
    await AsyncStorage.removeItem('uploadedFile');
  };

  const selectFile = async () => {
    try {
      const res: any = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setFile(res);
      await AsyncStorage.setItem('uploadedFile', JSON.stringify(res));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        console.error('Error while picking file:', err);
      }
    }
  };
  useEffect(() => {
    getPatientData();
    getLab();
    referralDoctor();
  }, []);
  const getPatientData = () => {
    setLoading(true);
    let params = {
      appointmentId: item._id,
    };

    Preception_Details(params)
      .then((res: any) => {
        setPrescription(
          res?.data?.patientAppointments?.ePrescription?.medicines,
        );
        setLabReports(res?.data?.orders);
        setFilterLabs(res?.data?.filteredLabs);
        setTestData(res?.data?.patientAppointments?.ePrescription?.test);
        setData(res?.data?.patientAppointments?.history);
        setResult(res?.data?.patientAppointments?.ePrescription);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const getLab = () => {
    setLoading(true);
    let params = {
      page: 1,
      lat: selectedAddress?.lat,
      long: selectedAddress?.lng,
      search: '',
    };

    getUser_Laboratory(params)
      .then((res: any) => {
        setLabData(res?.data?.labs);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };
  const Submit_File = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: file[0]?.uri,
        type: file[0]?.type,
        name: file[0]?.name,
      });
      const response = await add_File(formData).then((res: any) => {
        //
        saveTest(item._id, res?.data?.fileUrl);
      });
      setLoading(false);
      // Alert.alert(
      //   'File Submitted',
      //   'Your file has been submitted successfully!',
      //   [
      //     {
      //       text: 'OK',
      //     },
      //   ],
      //   {cancelable: false},
      // );
    } catch (error) {
      setLoading(false);
      console.error('Error uploading file:', error);
      Alert.alert(
        'Error',
        'There was an error submitting the file. Please try again later.',
        [
          {
            text: 'OK',
          },
        ],
        {cancelable: false},
      );
    }
  };
  const saveTest = (id: any, url: any) => {
    let params = {
      resultUrl: url,
    };
    //
    saveUploadResulsUser(id, params)
      .then((res: any) => {
        showToast('succes', res?.data?.message, true);
      })
      .catch((err: any) => {
        showToast('error', err?.response?.data?.message, false);
      })
      .finally(() => {});
  };
  const OnOpen = () => {
    modalizeRef.current?.open();
  };
  const referralDoctor = () => {
    let params = {
      appointmentId: item._id,
    };
    getReferralDoctor(params)
      .then((res: any) => {
        setRefer(res?.data?.referrals?.[0]);
      })
      .catch((err: any) => {})
      .finally(() => {});
  };
  const navigateDetail = () => {
    modalizeRef.current?.close();
    if (refer?.referType === 'Doctor') {
      navigate('UserDoctorDetails', {
        item: refer?.doctorId,
        type: 'doctor',
        doctorType: 'doctor',
      });
    } else if (refer?.referType === 'Hospital') {
      navigate('HospitalDetails', {item: refer?.hospitalId});
    } else {
      navigate('SymptomsDoctor', {item: refer?.specialityId});
    }
  };
  const totalPrice = prescription?.reduce(
    (sum: any, item: any) => sum + item?.medicineId?.tpPrice,
    0,
  );

  //

  // const payment = () => {
  //   dispatch(
  //     setStripeObj({
  //       cart: prescription,
  //     }),
  //   );
  //   dispatch(setAmount(totalPrice));
  //   navigate('StripeAlFalah', {
  //     type: 'presecription',
  //     actualAmount: totalPrice,
  //   });
  // };

  const payment = () => {
    if (SelectCircle === 'Yes' && selected === 'Yes') {
      if (selectedCards) {
        if (!selectedPreference) {
          showToast(
            'Error',
            'Please select your preference before proceeding.',
            false,
          );
          return;
        }
        const testPrice = selectedCards.totalUserAmount;
        const sum = testPrice + totalPrice;
        dispatch(setAmount(sum));
        const combinedData = {
          medicines: prescription,
          selectedCards,
          totalPrice,
          data: item,
          selectedPreference,
          prescription: 'bothTest',
        };

        dispatch(setStripeObj(combinedData));
        navigate('StripeAlFalah', {
          type: 'labTestPharmacy',
          actualAmount: sum,
        });
      } else {
        setError('Please select a laboratory');
      }
    } else if (SelectCircle === 'Yes') {
      if (selectedCards) {
        const testPrice = selectedCards.totalUserAmount;
        const combinedData = {
          selectedCards,
          selectedPreference,
          prescription: 'labtest',
          appointmentId: item?._id,
        };
        dispatch(setStripeObj(combinedData));
        navigate('StripeAlFalah', {
          type: 'labTestPharmacy',
          actualAmount: testPrice,
        });
      } else {
        setError('Please select a laboratory');
      }
    } else if (selected === 'Yes') {
      const combinedData = {
        medicines: prescription,
        totalPrice,
        data: item,
        prescription: 'medicine',
      };
      dispatch(setStripeObj(combinedData));

      navigate('StripeAlFalah', {
        type: 'labTestPharmacy',
        actualAmount: totalPrice,
      });
    } else {
      setError('Please select a service to proceed');
    }
  };

  async function requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to save photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  async function downloadAndSaveImage(fileUrl: any) {
    await requestStoragePermission();
    setLoading(true);
    try {
      const {config, fs} = RNFetchBlob;
      const DownloadDir = fs.dirs.LegacyPictureDir;

      // Determine file extension and mime type
      const fileExtension = fileUrl
        .split('?')[0]
        .split('.')
        .pop()
        .toLowerCase();
      let mimeType = '';
      let fileExtensionWithDot = '';

      if (fileExtension === 'pdf') {
        mimeType = 'application/pdf';
        fileExtensionWithDot = '.pdf';
      } else {
        mimeType = 'image/jpeg';
        fileExtensionWithDot = '.jpg';
      }

      const options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: `${DownloadDir}/file_${Date.now()}${fileExtensionWithDot}`,
          description: 'Downloading file',
          mime: mimeType,
          mediaScannable: true,
        },
      };

      const res = await config(options).fetch('GET', fileUrl);
      if (res?.data) {
        showToast('success', 'File Downloaded', true);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setLoading(false);
    }
  }
  const handleSelectedCard = (item: any) => {
    setError('');
    setSelectedCards(item);
  };
  const handleView = (item: any) => {
    setSelectedPreference(item.title);
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <CustomHeader
          title={'Prescription'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <ScrollView nestedScrollEnabled={true}>
          <View style={{paddingBottom: RF(80)}}>
            <View style={{margin: rs(16)}}>
              <UpComingTab item={item} />
              {prescription?.length > 0 && (
                <>
                  {data?.symptoms && (
                    <MedicineDetail data={data?.symptoms} title={'Symptoms'} />
                  )}

                  <MedicineDetail data={prescription} title={'Medicine'} />

                  <LinearComponent
                    Title="Do you want to Buy medicine on Discount?"
                    select={selected}
                    handelSelectYes={handelSelectYes}
                    downLoadText={'Export Medicine Details'}
                    Sources={Grouping}
                    Colors={[
                      'rgba(220, 233, 238, 1)',
                      'rgba(255, 255, 255, 0)',
                      'rgba(64, 134, 161, 1)',
                    ]}
                  />
                </>
              )}
            </View>
            {selected === 'Yes' && prescription && (
              <View style={styles?.viewContent}>
                <FlatList
                  data={prescription}
                  scrollEnabled={false}
                  contentContainerStyle={{
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                  renderItem={({item}) => (
                    <View style={{marginBottom: RF(16)}}>
                      <Text size={14} SFmedium color={'#00276D'}>
                        Name:{' '}
                        <Text size={12} SFlight color={'#00276D'}>
                          {item?.medicineName}
                        </Text>{' '}
                      </Text>
                      <Text size={14} SFmedium color={'#00276D'}>
                        Days:{' '}
                        <Text size={12} SFlight color={'#00276D'}>
                          {item?.days}
                        </Text>{' '}
                      </Text>
                      <Text size={14} SFmedium color={'#00276D'}>
                        Generic:
                        <Text size={12} SFlight color={'#00276D'}>
                          {' '}
                          {item?.medicineId?.generic}
                        </Text>
                      </Text>
                      <Text size={14} SFmedium color={'#00276D'}>
                        Quantity:
                        <Text size={12} SFlight color={'#00276D'}>
                          {' '}
                          {item?.quantity}
                        </Text>
                      </Text>
                      <Text size={14} SFmedium color={'#00276D'}>
                        Price:
                        <Text size={12} SFlight color={'#00276D'}>
                          {' '}
                          {item?.medicineId?.tpPrice}/-
                        </Text>
                      </Text>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
                <Text style={{fontSize: RF(14), fontWeight: 'bold'}}>
                  {`Total Price ${totalPrice}/-`}
                </Text>
                {/* <TouchableOpacity style={styles.touchView} onPress={payment}>
                  <Text>Checkout</Text>
                </TouchableOpacity> */}
              </View>
            )}
            <View style={{marginTop: RF(16), marginHorizontal: RF(24)}}>
              {testData?.length > 0 ? (
                <>
                  <Text size={16} SFsemiBold color={colors.blueText}>
                    Test
                  </Text>
                  <FlatList
                    data={testData}
                    // horizontal
                    contentContainerStyle={{gap: RF(4), marginTop: RF(8)}}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                      <>
                        <Text
                          size={12}
                          SFregular
                          color={colors.blueText}
                          // style={{marginTop: RF(8)}}
                        >
                          {item?.testName}
                        </Text>
                      </>
                    )}
                  />

                  {resultData?.results ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: RF(16),
                        gap: RF(16),
                        borderRadius: RF(8),
                        borderWidth: 1,
                        padding: 8,
                        borderColor: colors.blueText,
                        borderStyle: 'dashed',
                        justifyContent: 'space-between',
                      }}>
                      <Text size={12} SFmedium>
                        Download Lab Test
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          downloadAndSaveImage(resultData?.results)
                        }>
                        <Image
                          source={LabDownload}
                          style={{
                            width: RF(24),
                            height: RF(24),
                            tintColor: colors.blueText,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <Text size={12} SFmedium style={{marginTop: RF(16)}}>
                      No Test Uploaded
                    </Text>
                  )}
                  <LinearComponent
                    select={SelectCircle}
                    handelSelectYes={handleItem}
                    downLoadText={'Export Test Details'}
                  />
                </>
              ) : null}

              {SelectCircle === 'No' && (
                <>
                  {!file && (
                    <TouchableOpacity
                      style={styles.UpLoad_S}
                      onPress={selectFile}>
                      <Image source={paper} style={styles.Upload_Image} />
                      <View style={styles.Gap_styles}>
                        <Text size={12} SFmedium color={colors.blueText}>
                          choose file to upload
                        </Text>
                        <Text size={12} SFregular color={colors.blueText}>
                          Select zip,image,pdf or ms.word
                        </Text>
                        <Text size={9} SFregular color={colors.blueText}>
                          File Size 10 MB
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}

                  {file ? (
                    <View>
                      <View style={styles.File_S}>
                        <View style={styles.ImageShow}>
                          <Image
                            source={getFileIcon(file[0], fileIcons)}
                            style={styles.contentView}
                          />
                        </View>
                        <View style={styles.MarginStyles}>
                          <View style={styles.RowStyle}>
                            <Text
                              size={12}
                              SFmedium
                              color={colors.blueText}
                              style={{width: RF(210)}}>
                              {file[0]?.name}
                            </Text>
                            <TouchableOpacity
                              onPress={deleteFile}
                              hitSlop={styles.hitSlop}>
                              <Image
                                source={crossIcon}
                                style={styles.crossStyle}
                              />
                            </TouchableOpacity>
                          </View>
                          <Text size={11} SFregular color={colors.blueText}>
                            {(file[0].size / 1024).toFixed(2)} KB
                          </Text>
                        </View>
                      </View>
                      <AppButton
                        title="Submit File"
                        onPress={Submit_File}
                        m_Top={RF(24)}
                      />
                    </View>
                  ) : null}
                </>
              )}
            </View>
            {SelectCircle === 'Yes' && (
              <>
                {filterlab.length === 0 ? (
                  <Text
                    style={{
                      color: 'red',
                      textAlign: 'center',
                      marginVertical: RF(10),
                    }}>
                    Laboratory not found
                  </Text>
                ) : (
                  <>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={filterlab}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          style={[
                            styles.Lab_S,
                            {
                              borderWidth: selectedCards === item ? 1 : 0,
                              borderColor: 'red',
                            },
                          ]}
                          onPress={() => handleSelectedCard(item)}>
                          <Image
                            source={{
                              uri:
                                item?.logo ||
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                            }}
                            style={styles.Chugtai_S}
                          />
                          <View style={styles.Margin_S}>
                            <Text
                              size={12}
                              style={{width: RF(150)}}
                              SFregular
                              color={colors.blueText}>
                              {item.name}
                            </Text>
                            <Text
                              size={12}
                              style={{width: RF(150)}}
                              SFregular
                              color={colors.blueText}>
                              Test Cost {item?.totalUserAmount}/-
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                    {error && <Text color={'red'}>{error}</Text>}
                    <View style={styles.ViewContainer}>
                      <FlatList
                        data={dataInfo}
                        scrollEnabled={false}
                        contentContainerStyle={{
                          width: '100%',
                          gap: RF(8),
                        }}
                        renderItem={({item}) => (
                          <CheckBox
                            title={item.title}
                            width={'80%'}
                            selected={selectedPreference}
                            onPress={() => handleView(item)}
                            c_b={'#00276D'}
                            colorMid={'#00276D'}
                            textColor={'#00276D'}
                            active={'rgba(245, 245, 245, 1)'}
                          />
                        )}
                      />
                    </View>
                  </>
                )}
              </>
            )}
            {(SelectCircle === 'Yes' || selected === 'Yes') && (
              <TouchableOpacity style={styles.touchView} onPress={payment}>
                <Text>Checkout</Text>
              </TouchableOpacity>
            )}
            {refer?.doctorId || refer?.hospitalId || refer?.specialityId ? (
              <AppButton
                title="Show Referral"
                width={RF(100)}
                height={RF(30)}
                m_Top={RF(32)}
                onPress={OnOpen}
              />
            ) : null}
            <TouchableOpacity
              style={styles.review}
              onPress={() =>
                navigate('FormatDesign', {
                  item: item,
                  prescription: prescription,
                  testData: testData,
                  data: data,
                })
              }>
              <Text
                size={14}
                SFsemiBold
                alignEnd
                style={{textDecorationLine: 'underline'}}>
                Preview Prescription
              </Text>
            </TouchableOpacity>
            <Text size={16} SFsemiBold style={margin.left_16}>
              Lab Reports
            </Text>
            <ScrollView
              horizontal
              scrollEnabled={true}
              contentContainerStyle={{
                borderWidth: 1,
                borderColor: 'red',
                padding: rs(16),
              }}
              showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  gap: rs(16),
                }}>
                {labReports?.map((i: any) => (
                  <View
                    style={{
                      padding: rs(8),
                      backgroundColor: '#fff',
                      borderRadius: 8,
                      elevation: 2,
                      width: SCREEN_WIDTH / 2,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text>{moment(i?.createdAt).format('DD/MM/YYYY')}</Text>
                      <Text size={10} color={'green'}>
                        {moment(i?.createdAt).format('hh:mm A')}
                      </Text>
                    </View>

                    <Text
                      size={10}
                      onPress={() => downloadAndSaveImage(i?.results)}
                      color={'#fff'}
                      style={{
                        paddingVertical: rs(8),
                        backgroundColor: colors?.primary,
                        paddingHorizontal: rs(12),
                        borderRadius: 12,
                      }}>
                      Download
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
        {loading && <CustomLoader />}
        <CustomModalize ref={modalizeRef}>
          {refer?.referType === 'Doctor' ? (
            <CardComponent
              Size={9}
              showValues
              RatingTrue
              item={refer?.doctorId}
              isVerify
              name={refer?.doctorId?.name}
              style={styles.card}
              color={colors.blueText}
              title2={refer?.doctorId?.speciality}
              title3={refer?.doctorId?.qualifications}
              logo={{
                uri:
                  refer?.doctorId?.logo ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
              }}
              onPress={navigateDetail}
            />
          ) : refer?.referType === 'Hospital' ? (
            <CardComponent
              showImg
              Size={10}
              isVerify
              showValues
              item={refer?.hospitalId}
              noRating
              showLocation
              logo={{uri: refer?.hospitalId?.logo}}
              color={colors.LightText}
              title3={refer?.hospitalId?.location?.address}
              onPress={navigateDetail}
            />
          ) : (
            <Pressable onPress={navigateDetail} style={styles.mainView}>
              <View style={styles.cardContainer}>
                <Image
                  source={{
                    uri:
                      refer?.specialityId?.specialityLogo ||
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                  }}
                  style={styles.icon}
                />
                <Text
                  SFmedium
                  color={'rgba(0, 39, 109, 1)'}
                  style={margin.top_8}>
                  {refer?.specialityId?.specialityTitle}
                </Text>
              </View>
            </Pressable>
          )}
        </CustomModalize>
      </View>
    </Wrapper>
  );
};

export default PreceptionDetails;

const styles = StyleSheet.create({
  ViewContainer: {
    marginTop: RF(8),
    marginHorizontal: RF(24),
  },
  review: {
    gap: RF(8),
    marginTop: RF(16),
    marginHorizontal: RF(20),
  },
  Margin_S: {marginLeft: RF(8), marginTop: RF(8)},
  UpLoad_S: {
    borderWidth: 1,
    borderStyle: 'dashed',
    height: RF(149),
    borderRadius: RF(16),
    marginTop: RF(16),
    borderColor: '#00276D',
    padding: RF(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowView: {width: '100%', height: '100%', resizeMode: 'contain'},
  viewS: {
    width: RF(48),
    height: RF(48),
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: RF(32),
    overflow: 'hidden',
  },
  Chugtai_S: {
    width: RF(64),
    height: RF(60),
    resizeMode: 'contain',
    borderRadius: RF(16),
  },
  mainView: {
    width: '100%',
    alignItems: 'center',
    marginTop: RF(8),
    marginRight: RF(8),
  },
  cardContainer: {
    width: '100%',
    borderRadius: RF(16),
    flexDirection: 'row',
    gap: RF(16),
    padding: RF(16),
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: '#fff',
  },
  touchView: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RF(16),
    width: RF(150),
    alignSelf: 'center',
    height: RF(40),
    marginVertical: RF(24),
  },
  viewContent: {
    marginHorizontal: RF(20),
    backgroundColor: '#DEEEF78F',
    width: '88%',
    borderRadius: RF(8),
    padding: RF(8),
    marginVertical: RF(8),
  },
  icon: {
    height: RF(38),
    width: RF(39.32),
    resizeMode: 'contain',
    borderRadius: RF(32),
    elevation: 5,
  },
  card: {justifyContent: 'center'},
  custom: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: RF(8),
    padding: RF(8),
    elevation: 5,
    marginTop: RF(8),
    flexDirection: 'row',
    gap: RF(16),
  },
  Lab_S: {
    width: RF(218),
    height: RF(64),
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: RF(16),
    marginVertical: RF(8),
    marginHorizontal: RF(1),
    marginTop: RF(16),
    marginLeft: RF(23),
    elevation: 5,
    overflow: 'hidden',
  },
  Cam_S: {width: RF(16), height: RF(16), resizeMode: 'contain'},
  Upload_Image: {width: RF(22), height: RF(26), resizeMode: 'contain'},
  Gap_styles: {gap: RF(4), alignItems: 'center', marginTop: RF(16)},
  File_S: {
    flexDirection: 'row',
    height: RF(74),
    backgroundColor: '#F6F7F9',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: RF(12),
    paddingVertical: RF(12),
    marginTop: RF(8),
    borderRadius: RF(16),
  },
  ImageShow: {
    width: RF(32),
    height: RF(32),
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RF(6),
  },
  contentView: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  crossStyle: {
    width: RF(16),
    height: RF(16),
    tintColor: '#00276D',
  },
  RowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hitSlop: {
    top: RF(8),
    right: RF(8),
    left: RF(8),
    bottom: RF(8),
  },
  MarginStyles: {
    marginLeft: RF(8),
    gap: RF(4),
  },
});
