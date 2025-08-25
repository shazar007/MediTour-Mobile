import useStyles from './styles';
import {LabDownload, pre} from '@assets';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  PermissionsAndroid,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomHeader, CustomLoader, Text} from '@components';
import {RouteProp, useTheme} from '@react-navigation/native';
import {Wrapper} from '@components';
import {RF} from '@theme';
import {navigate} from '@services';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      data?: any;
      detail?: any;
    };
  }>;
}
import RNFetchBlob from 'react-native-blob-util';
import {Alert} from '@utils';
const Hosp_Prescription_Detail = (props: Props) => {
  const {data, detail} = props.route?.params;

  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [loading, setLoading] = useState<any>(false);

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
        Alert.showSuccess('File Downloaded');
      }
    } catch (error) {
      console.error('Error downloading image:', error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex:1}}>
      <CustomHeader title={detail?.name} leftIcon titleColor={'#fff'} notify />
      <ScrollView>
        <View style={{paddingBottom:RF(80)}}>
      <Text size={17} SFmedium style={styles.txt} color={colors?.bluE}>
        Prescription
      </Text>
      <Text
        size={16}
        SFmedium
        style={{marginTop: RF(16), marginHorizontal: RF(20)}}
        color={colors?.orange}>
        Medicine
      </Text>
      <FlatList
        data={data?.ePrescription?.medicines}
        renderItem={(i: any) => {
          return (
            <>
              <Text size={14} style={styles.txt} color={colors?.bluE}>
                {i?.item?.medicineName}
              </Text>
              <Text size={14} style={styles.txt} color={colors?.bluE}>
                {i?.item?.dosage}
              </Text>
            </>
          );
        }}
      />
      <View style={[styles.line, {marginTop: RF(16)}]} />
      <Text size={16} SFmedium style={styles.txt} color={colors?.orange}>
        Test
      </Text>
      <FlatList
        data={data?.ePrescription?.test}
        renderItem={(i: any) => {
          return (
            <>
              <Text size={14} SFmedium style={styles.txt} color={colors?.bluE}>
                {i?.item?.testName}
              </Text>
            </>
          );
        }}
      />
      {data?.ePrescription?.results ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: RF(16),
            marginHorizontal: RF(20),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: RF(4),
            }}>
            <Image
              source={pre}
              style={{
                width: RF(16),
                height: RF(16),
                overflow: 'hidden',
              }}
            />
            <Text>Result.pdf</Text>
          </View>
          <TouchableOpacity
            onPress={() => downloadAndSaveImage(data?.ePrescription?.results)}
            style={{
              backgroundColor: '#00276D',
              width: RF(16),
              height: RF(16),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: RF(4),
            }}>
            <Image
              source={LabDownload}
              style={{
                width: RF(12),
                height: RF(12),
                resizeMode: 'contain',
                tintColor: '#fff',
              }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <Text
          size={14}
          SFmedium
          style={{marginTop: RF(8), marginLeft: RF(16), color: 'red'}}>
          No Test Results are Uploaded
        </Text>
      )}
      <TouchableOpacity
        style={styles.review}
        onPress={() =>
          navigate('PresecriptionDesign', {
            item: data,
          })
        }>
        <Text size={16} SFsemiBold style={{textDecorationLine: 'underline'}}>
          Review Prescription
        </Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};
export default Hosp_Prescription_Detail;
