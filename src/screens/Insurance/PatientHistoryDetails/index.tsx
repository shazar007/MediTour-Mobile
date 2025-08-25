import {
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppButton,
  CustomHeader,
  CustomLoader,
  Text,
  Wrapper,
} from '@components';
import {getColorCode, RF} from '@theme';
import {
  accepetInsurance,
  getPatientHistory,
  navigate,
  onSelectImage,
  showToast,
} from '@services';
import {del, LabDownload, uploadIcon} from '@assets';
import RNFetchBlob from 'react-native-blob-util';
const PatientHistoryDetails = ({route}: any) => {
  const {item} = route.params;
  const [url, setUrl] = useState<any>('');
  const {endPoints} = getColorCode();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const fetchDetails = () => {
    const data = {
      requestId: item?._id,
    };
    getPatientHistory(data)
      .then((res: any) => {
        setData(res?.data?.request);
      })
      .catch((err: any) => {})
      .finally(() => {});
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
  async function downloadAndSaveImage(imageUrl: any) {
    await requestStoragePermission();
    setLoading(true);
    try {
      const {config, fs} = RNFetchBlob;
      const DownloadDir = fs.dirs.LegacyPictureDir;

      const options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: `${DownloadDir}/image_${Date.now()}.jpg`,
          description: 'Downloading image',
          mime: 'image/jpeg',
          mediaScannable: true,
        },
      };

      const res = await config(options).fetch('GET', imageUrl);
      if (res?.data) {
        showToast('success', 'File Downloaded', true);
      }
    } catch (error) {
      console.error('Error downloading image:', error);
    } finally {
      setLoading(false);
    }
  }
  const onUploadImage = async () => {
    onSelectImage(endPoints, setUrl, setLoading);
  };
  const deleteFile = () => {
    setUrl(null);
  };
  const acceptData = () => {
    if (!url) {
      showToast('Error', 'Please Upload Insured Person File', false);
    } else {
      setLoading(true);
      let params = {
        requestId: item?._id,
        insuranceFile: url,
      };
      accepetInsurance(params)
        .then((res: any) => {
          showToast('Success', 'Share SuccessFully', true);
          navigate('RequestInsurance');
        })
        .catch((err: any) => {})
        .finally(() => {});
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Request Details'}
          leftIcon
          titleColor={'#fff'}
          notify
        />

        <ScrollView>
          <View style={{paddingBottom: RF(100)}}>
            <View
              style={{
                borderRadius: RF(16),
                padding: RF(8),
                backgroundColor: '#fff',
                elevation: 5,
                marginTop: RF(8),
                marginHorizontal: RF(16),
              }}>
              <Text size={16} SFmedium color={'#0D47A1'}>
                User
              </Text>
              <Text size={14} SFregular color={'#0D47A1'}>
                {data?.userId?.name}
              </Text>
              <Text size={16} SFmedium color={'#0D47A1'}>
                MR No:
              </Text>
              <Text size={14} SFregular color={'#0D47A1'}>
                {data?.userId?.mrNo}
              </Text>
              <Text size={16} SFmedium color={'#0D47A1'}>
                Phone No:
              </Text>
              <Text size={14} SFregular color={'#0D47A1'}>
                {data?.userId?.phone}
              </Text>
              <Text size={16} SFmedium color={'#0D47A1'}>
                Location:
              </Text>
              <Text size={14} SFregular color={'#0D47A1'}>
                {`${data?.location?.address} ,${data?.location?.city}`}
              </Text>
              <Text size={16} SFmedium color={'#0D47A1'}>
                ID Card Number:
              </Text>
              <Text size={14} SFregular color={'#0D47A1'}>
                {data?.cnic}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text size={16} SFmedium color={'#0D47A1'}>
                  ID Card File:
                </Text>
                <TouchableOpacity
                  onPress={() => downloadAndSaveImage(item?.cnicFile)}>
                  <Image
                    source={LabDownload}
                    tintColor={'#00276D'}
                    style={{width: RF(20), height: RF(20)}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                borderRadius: RF(16),
                padding: RF(8),
                backgroundColor: '#fff',
                elevation: 5,
                marginTop: RF(16),
                marginHorizontal: RF(16),
              }}>
              <Text size={16} SFmedium color={'#0D47A1'}>
                Package Details
              </Text>
              <Text size={14} SFregular color={'#0E54A3'}>
                Package Name:
              </Text>
              <Text size={14} SFregular color={'#7D7D7D'}>
                {data?.insuranceId?.packageName}
              </Text>
              <Text size={14} SFregular color={'#0E54A3'}>
                Package Description:
              </Text>
              <Text size={14} SFregular color={'#7D7D7D'}>
                {data?.insuranceId?.description}
              </Text>
              <Text size={14} SFregular color={'#0E54A3'}>
                Medical Benefits
              </Text>
              <Text size={14} SFregular color={'#7D7D7D'}>
                {data?.insuranceId?.icuCcuLimits ||
                  data?.insuranceId?.medicineDeliveryCoverage ||
                  data?.insuranceId?.medExpensesHospitalizationCoverage ||
                  'Fallback text if all are undefined'}
              </Text>
              <Text size={14} SFregular color={'#7D7D7D'}>
                {data?.insuranceId?.accidentalEmergencyLimits
                  ? data?.insuranceId?.accidentalEmergencyLimits
                  : data?.insuranceId?.emergencyReturnHomeCoverage}
              </Text>
              <Text size={14} SFregular color={'#7D7D7D'}>
                {data?.insuranceId?.ambulanceCoverage
                  ? data?.insuranceId?.ambulanceCoverage
                  : data?.insuranceId?.repatriationCoverage}
              </Text>
              <Text size={14} SFregular color={'#7D7D7D'}>
                {data?.insuranceId?.specializedInvestigationCoverage
                  ? data?.insuranceId?.specializedInvestigationCoverage
                  : data?.insuranceId?.returnOfDependentChildrenCoverage}
              </Text>
              <Text size={14} SFregular color={'#7D7D7D'}>
                {data?.insuranceId?.waitingPeriod
                  ? data?.insuranceId?.waitingPeriod
                  : data?.insuranceId?.adndCoverage
                  ? data?.insuranceId?.adndCoverage
                  : data?.insuranceId?.repatriationIllnessInjuryCoverage}
              </Text>
              {data?.insuranceId?.maternity && (
                <Text size={14} SFregular color={'#7D7D7D'}>
                  {data?.insuranceId?.maternity}
                </Text>
              )}
              <Text size={14} SFregular color={'#0E54A3'}>
                More Features
              </Text>
              <Text size={14} SFregular color={'#7D7D7D'}>
                {data?.insuranceId?.heading}
              </Text>
              <Text size={14} SFregular color={'#0E54A3'}>
                Address
              </Text>
              <Text size={14} SFregular color={'#7D7D7D'}>
                {`${data?.insuranceCompanyId?.location?.address} ,${data?.insuranceCompanyId?.location?.city}`}
              </Text>
              <Text size={14} SFregular color={'#0E54A3'}>
                Per Year
              </Text>
              <Text size={14} SFregular color={'#7D7D7D'}>
                {data?.amount}
              </Text>
            </View>
            {!url && (
              <View
                style={{
                  borderRadius: RF(16),
                  padding: RF(8),
                  backgroundColor: '#fff',
                  elevation: 5,
                  marginTop: RF(16),
                  marginHorizontal: RF(16),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text size={14} SFmedium color={'#0E54A3'}>
                    Insured Person File
                  </Text>
                  <TouchableOpacity onPress={onUploadImage}>
                    <Image
                      source={uploadIcon}
                      tintColor={'#00276D'}
                      style={{width: RF(20), height: RF(20)}}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: RF(8)}}>
                  <Text>To proceed, please upload file of relevant person</Text>
                </View>
              </View>
            )}
            {url ? (
              <View style={{marginHorizontal: RF(24)}}>
                <View style={styles.File_S}>
                  <Text> Insured Person File Uploaded</Text>
                  <TouchableOpacity
                    onPress={deleteFile}
                    hitSlop={styles.hitSlop}>
                    <Image source={del} style={styles.crossStyle} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            <AppButton
              title="Share"
              width={RF(200)}
              onPress={acceptData}
              bgClr={'#006838'}
              height={RF(35)}
              m_Top={RF(16)}
            />
          </View>
        </ScrollView>
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default PatientHistoryDetails;

const styles = StyleSheet.create({
  hitSlop: {
    top: RF(8),
    right: RF(8),
    left: RF(8),
    bottom: RF(8),
  },
  crossStyle: {
    width: RF(20),
    height: RF(20),
    resizeMode: 'contain',
    tintColor: 'red',
  },
  File_S: {
    backgroundColor: '#F6F7F9',
    borderRadius: RF(8),
    width: '100%',
    overflow: 'hidden',
    marginTop: RF(8),
    padding: RF(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#0D47A1',
  },
  contentView: {
    width: '100%',
    height: '100%',
  },
});
