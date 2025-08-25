import {LabDownload, del, paper} from '@assets';
import {
  AppButton,
  CustomHeader,
  CustomLoader,
  HeaderCard,
  Text,
  TravelerInformation,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF, getColorCode} from '@theme';
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import useStyles from './styles';
import {
  fetchTravel,
  navigate,
  onSelectImage,
  pushTicket_To,
  showToast,
} from '@services';
import RNFetchBlob from 'react-native-blob-util';
const TravelerForm = ({route}: any) => {
  const {details} = route.params;
  const [url, setUrl] = useState<any>('');
  const {endPoints} = getColorCode();
  const [travelers, setTraveler] = useState([]);
  //

  const deleteFile = () => {
    setUrl(null);
  };
  const theme: any = useTheme();
  const [loading, setLoading] = useState(false);
  const colors = theme.colors;
  const styles: any = useStyles();

  const Submit_File = async () => {
    if (!url) {
      showToast('Error', 'Please upload a ticket before sharing.', false);
      return;
    }
    setLoading(true);
    try {
      let data = {
        bidRequestId: details?.bidIds?.[0]?._id,
      };
      let params = {
        eTicket: url,
      };
      const response = await pushTicket_To(data, params);
      setLoading(false);
      Alert.alert(
        'File Submitted',
        'Your file has been submitted successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigate('TravelAgencyRequests'),
          },
        ],
        {cancelable: false},
      );
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

  const onUploadImage = async () => {
    onSelectImage(endPoints, setUrl, setLoading);
  };
  useEffect(() => {
    funGetTravels();
  }, []);
  const funGetTravels = () => {
    const data = {
      bidRequestId: details?.vendorBidId,
    };
    fetchTravel(data)
      .then((res: any) => {
        //
        setTraveler(res?.data?.travellers);
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

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <CustomHeader
          title={'Ticket Requests'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <ScrollView style={styles.container}>
          <View style={{paddingBottom: RF(110), marginTop: RF(20)}}>
            <>
              <View style={{marginHorizontal: RF(20), gap: RF(4)}}>
                <Text size={16} SFsemiBold color={'#0E54A3'}>
                  E-Ticket
                </Text>
                <Text size={12} SFregular color={'#7D7D7D'}>
                  To proceed, please upload tickets of all Passenger.{' '}
                </Text>
              </View>
              {!url && (
                <TouchableOpacity
                  style={styles.UpLoad_S}
                  onPress={onUploadImage}>
                  <Image source={paper} style={styles.Upload_Image} />
                  <View style={styles.Gap_styles}>
                    <Text size={12} SFmedium color={colors.blueText}>
                      <Text color={'#FF7631'}>Choose file</Text> to upload
                    </Text>
                    <Text size={9} SFlight color={'#00276D'}>
                      Select jpeg, png, or pdf up to 20MB.
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              {url ? (
                <View style={{marginHorizontal: RF(24)}}>
                  <View style={styles.File_S}>
                    <Image source={{uri: url}} style={styles.contentView} />

                    <TouchableOpacity
                      onPress={deleteFile}
                      style={{position: 'absolute', right: 10, top: RF(8)}}
                      hitSlop={styles.hitSlop}>
                      <Image source={del} style={styles.crossStyle} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </>
            <View style={styles.travelerInfo}>
              <Text size={16} SFmedium color={'#0E54A3'}>
                Traveler Information
              </Text>

              {travelers.map((traveler: any, index: any) => (
                <TravelerInformation
                  traveler={traveler}
                  index={index}
                  onPressVise={() => downloadAndSaveImage(traveler.visaFile)}
                  onPressPass={() =>
                    downloadAndSaveImage(traveler.passportFile)
                  }
                />
              ))}
            </View>
            <AppButton
              title="Share"
              onPress={Submit_File}
              m_Top={RF(24)}
              bgClr={'#006838'}
            />
          </View>
          {loading && <CustomLoader />}
        </ScrollView>
      </View>
    </Wrapper>
  );
};

export default TravelerForm;
