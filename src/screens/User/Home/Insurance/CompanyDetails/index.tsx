import {
  Image,
  Modal,
  PermissionsAndroid,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  AppButton,
  CustomHeader,
  CustomLoader,
  CustomModalize,
  HeaderCard,
  LoginReminder,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {helpLine, phone, telephone} from '@assets';
import useStyles from './styles';
import {RF} from '@theme';
import {useSelector} from 'react-redux';
import HelpLine from './HelpLine';
import {useTheme} from '@react-navigation/native';

import {
  downloadInsurance,
  getInsuranceDetails,
  navigate,
  showToast,
} from '@services';
import {Modalize} from 'react-native-modalize';
import RNFetchBlob from 'react-native-blob-util';
import {setModalVisible} from '@redux';
import {Alert} from '@utils';
const CompanyDetails = ({route}: any) => {
  const {item, type, passanger} = route.params;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const modalizeRef: any = useRef<Modalize>(null);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const {user} = useSelector((state: any) => state.root.user);

  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(changeColor);
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const handlePress = () => {
    onOpen();
  };

  useEffect(() => {
    setLoading(true);
    get_Insurance();
  }, []);

  const get_Insurance = () => {
    setLoading(true);
    let params: any = {
      insuranceId: item?._id,
    };
    if (type === 'family plan') {
      params = {
        ...params,
        type: type,
      };
    }
    if (type === 'individual plan') {
      params = {
        ...params,
        type: type,
      };
    }
    if (type === 'parents plan') {
      params = {
        ...params,
        type: type,
      };
    }
    if (type === 'single trip') {
      params = {
        ...params,
        type: passanger,
      };
    }
    if (type === 'multiple trips') {
      params = {
        ...params,
        type: passanger,
      };
    }

    getInsuranceDetails(params)
      .then((res: any) => {
        setData(res.data.insurance);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
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
  async function downloadAndSaveImage(fileUrl: string) {
    await requestStoragePermission();
    setLoading(true);

    try {
      const {config, fs} = RNFetchBlob;
      const DownloadDir = fs.dirs.DownloadDir;

      const urlParts = fileUrl.split('/');
      const rawFileName = urlParts[urlParts.length - 1].split('?')[0]; // Remove query params
      const fileExtension = rawFileName.split('.').pop();
      const fileName = `file_${Date.now()}.${fileExtension}`;
      const mimeType =
        fileExtension === 'pdf' ? 'application/pdf' : `image/${fileExtension}`;

      const options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: `${DownloadDir}/${fileName}`,
          mime: mimeType,
          mediaScannable: true,
        },
      };

      const res = await config(options).fetch('GET', fileUrl);
      if (res?.data) {
        Alert.showSuccess('File Downloaded as PDF');
      }
    } catch (error) {
      Alert.showError('Failed to download the file.');

      // Alert.alert('Error', 'Failed to download the file.');
    } finally {
      setLoading(false);
    }
  }

  async function downloadFile(fileUrl: string) {
    await requestStoragePermission();
    setLoading(true);

    try {
      const {config, fs} = RNFetchBlob;
      const DownloadDir = fs.dirs.DownloadDir;

      const fileName = `file_${Date.now()}.pdf`;
      const mimeType = 'application/pdf';
      const description = 'Downloading PDF';

      const options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: `${DownloadDir}/${fileName}`,
          description: description,
          mime: mimeType,
          mediaScannable: true,
        },
      };

      const res = await config(options).fetch('GET', fileUrl);
      if (res?.data) {
        Alert.showSuccess('File Downloaded as PDF');
      }
    } catch (error) {
      Alert.showError('Failed to download the file.');

      // Alert.alert('Error', 'Failed to download the file.');
    } finally {
      setLoading(false);
    }
  }

  const check = type == 'remainInsurance' ? item : data;

  //

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <CustomHeader
          title={item.packageName || 'Insurance Details'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.MainView}>
            <View style={styles.Container}>
              <Text size={16} SFsemiBold color={colors.blueText}>
                1-
              </Text>
              <View style={{flexDirection: 'column'}}>
                <Text size={16} SFsemiBold color={colors.blueText}>
                  Medical Benefits
                </Text>
                <View style={{marginTop: RF(8)}}>
                  {(data?.icuCcuLimits || item?.insuranceId?.icuCcuLimits) && (
                    <View>
                      <Text SFbold color={'#00276D'}>
                        ICU/CCU Coverage Limits:
                      </Text>
                      <Text size={14} SFlight color={'#00276D'}>
                        {data?.icuCcuLimits || item?.insuranceId?.icuCcuLimits}
                      </Text>
                    </View>
                  )}

                  {(data?.waitingPeriod ||
                    item?.insuranceId?.waitingPeriod) && (
                    <View>
                      <Text SFbold color={'#00276D'}>
                        Waiting Period:
                      </Text>
                      <Text size={14} SFlight color={'#00276D'}>
                        {data?.waitingPeriod ||
                          item?.insuranceId?.waitingPeriod}
                      </Text>
                    </View>
                  )}

                  {(data?.accidentalEmergencyLimits ||
                    item?.insuranceId?.accidentalEmergencyLimits) && (
                    <View>
                      <Text SFbold color={'#00276D'}>
                        Accidental Emergency Coverage:
                      </Text>
                      <Text size={14} SFlight color={'#00276D'}>
                        {data?.accidentalEmergencyLimits ||
                          item?.insuranceId?.accidentalEmergencyLimits}
                      </Text>
                    </View>
                  )}

                  {(data?.medExpensesHospitalizationCoverage ||
                    item?.insuranceId?.medExpensesHospitalizationCoverage) && (
                    <View>
                      <Text SFbold color={'#00276D'}>
                        Medical Expenses (Hospitalization):
                      </Text>
                      <Text size={14} SFlight color={'#00276D'}>
                        {data?.medExpensesHospitalizationCoverage ||
                          item?.insuranceId?.medExpensesHospitalizationCoverage}
                      </Text>
                    </View>
                  )}

                  {data?.emergencyReturnHomeCoverage && (
                    <View>
                      <Text SFbold color={'#00276D'}>
                        Emergency Return Home Coverage:
                      </Text>
                      <Text size={14} SFlight color={'#00276D'}>
                        {data?.emergencyReturnHomeCoverage}
                      </Text>
                    </View>
                  )}

                  {data?.repatriationCoverage && (
                    <View>
                      <Text SFbold color={'#00276D'}>
                        Repatriation Coverage:
                      </Text>
                      <Text size={14} SFlight color={'#00276D'}>
                        {data?.repatriationCoverage}
                      </Text>
                    </View>
                  )}

                  {data?.adndCoverage && (
                    <View>
                      <Text SFbold color={'#00276D'}>
                        AD&D Coverage:
                      </Text>
                      <Text size={14} SFlight color={'#00276D'}>
                        {data?.adndCoverage}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', gap: RF(8)}}>
              <Text size={16} SFsemiBold color={colors.blueText}>
                2-
              </Text>
              <View style={{flexDirection: 'column'}}>
                <Text size={16} SFsemiBold color={colors.blueText}>
                  Address
                </Text>
                <Text
                  size={14}
                  SFregular
                  color={colors.blueText}
                  style={{marginTop: RF(8)}}>
                  {data?.insuranceId?.location?.address ||
                    item?.insuranceCompanyId?.location?.address}
                </Text>
              </View>
            </View>
            {/* ,,,,,,,,,,,,,,,,,,,,,,,,,,,,-2.................................... ..*/}
            <View style={[styles.Container, {marginTop: RF(12)}]}>
              <Text size={16} SFsemiBold color={'#00276D'}>
                3-
              </Text>
              <View style={{flexDirection: 'column', gap: RF(8)}}>
                <Text size={16} SFsemiBold color={'#00276D'}>
                  Policy Documents
                </Text>
                {item?.insuranceId?.policyDocument ? (
                  <TouchableOpacity
                    onPress={() =>
                      downloadAndSaveImage(item?.insuranceId?.policyDocument)
                    }>
                    <Text
                      size={14}
                      SFregular
                      style={{textDecorationLine: 'underline'}}
                      color={'#00276D'}>
                      Download Policy Document
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => downloadAndSaveImage(item?.policyDocument)}>
                    <Text
                      size={14}
                      SFregular
                      style={{textDecorationLine: 'underline'}}
                      color={'#00276D'}>
                      Download Policy Document
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {/*  . ,,,,,,,,,,,,,,,,,,,,,,,,,,,,.............................-3 */}
            <View style={[styles.Container, {marginTop: RF(12)}]}>
              <Text size={16} SFsemiBold color={'#00276D'}>
                4-
              </Text>
              <View style={{flexDirection: 'column', gap: RF(8), width: '90%'}}>
                <Text size={16} SFsemiBold color={'#00276D'}>
                  More Features
                </Text>
                <Text size={14} SFmedium color={'#00276D'}>
                  {data?.heading || item?.insuranceId?.heading}
                </Text>
                <Text size={14} SFregular color={'#00276D'}>
                  {data?.description || item?.insuranceId?.description}
                </Text>
              </View>
            </View>
            {item?.insuranceFile && (
              <View style={[styles.Container, {marginTop: RF(12)}]}>
                <Text size={16} SFsemiBold color={'#00276D'}>
                  5-
                </Text>
                <View style={{flexDirection: 'column', gap: RF(8)}}>
                  <Text size={16} SFsemiBold color={'#00276D'}>
                    Insurance File
                  </Text>
                  <TouchableOpacity
                    onPress={() => downloadFile(item?.insuranceFile)}>
                    <Text
                      size={14}
                      SFregular
                      style={{textDecorationLine: 'underline'}}
                      color={'#00276D'}>
                      Download Insurance File
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <Text
              size={16}
              SFsemiBold
              color={'#00276D'}
              style={{marginTop: RF(16)}}>
              {type == 'remainInsurance' ? null : 'About'}
            </Text>
            {data?.description && (
              <Text size={14} SFregular color={'#00276D'}>
                {data?.description}
              </Text>
            )}
            {type == 'remainInsurance' ? null : ( // </View> //   {/* <Image/> */} //   <Text>Files</Text> //   }}> //     paddingVertical: 16, //     paddingLeft: RF(8), //     borderStyle: 'dashed', //     borderWidth: 1, //     width: '100%', //   style={{ // <View
              <View>
                <AppButton
                  title="Buy Now"
                  width={'80%'}
                  m_Top={RF(16)}
                  bgClr={changeColor}
                  onPress={
                    user === null
                      ? () => setModalVisible(true)
                      : () =>
                          navigate('BuyInsurance', {
                            item: item,
                            type: type,
                          })
                  }
                />
              </View>
            )}
          </View>
        </ScrollView>
        {loading && <CustomLoader />}
        {/* modalize......... ....................*/}

        <Modal transparent animationType="slide" visible={modalVisible}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={{flexGrow: 1}}>
              <LoginReminder />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <CustomModalize
          ref={modalizeRef}
          height={RF(360)}
          childStyle={{padding: RF(24)}}>
          <View
            style={{
              width: RF(80),
              height: RF(80),
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: RF(16),
            }}>
            <Image
              source={helpLine}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          </View>
          <HelpLine UserName={'+92 1234567'} source={phone} />
          <HelpLine UserName={'+92 1234567'} source={telephone} />
          <View style={{marginTop: RF(24), alignItems: 'center'}}>
            <Text size={14} SFregular color={changeColor}>
              Available 12/7 for your Service
            </Text>
          </View>
        </CustomModalize>
      </View>
    </Wrapper>
  );
};

export default CompanyDetails;
