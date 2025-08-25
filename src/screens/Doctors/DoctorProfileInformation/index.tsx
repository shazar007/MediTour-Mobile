import {
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  CustomHeader,
  CustomLoader,
  DeleteModal,
  Text,
  Wrapper,
} from '@components';
import {EditButton, LabDownload, ProfileIcon} from '@assets';
import {RF} from '@theme';
import * as Progress from 'react-native-progress';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {blockUser, navigate, showToast} from '@services';
import RNFetchBlob from 'react-native-blob-util';
import {useTheme} from '@react-navigation/native';
import {setIsLoggedIn} from '@redux';
const DoctorProfileInformation = () => {
  const [Showmodel, setShowModel] = useState(false);
  const [showLoader, setshowLoader] = useState(false);
  const {B2B} = useSelector((state: any) => state?.root?.b2b);
  const {user} = useSelector((state: any) => state?.root?.user);
  let info: any = B2B?.doctor;
  const [loading, setLoading] = useState(false);
  const theme: any = useTheme();
  const dispatch: any = useDispatch();
  const colors = theme.colors;
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
  const deleteUser = () => {
    setshowLoader(true);
    let data = {
      vendorType: 'Doctors',
      vendorId: info?._id,
      blocked: true,
    };
    blockUser(data)
      .then((res: any) => {
        dispatch(setIsLoggedIn(false));
      })
      .catch((err: any) => {})
      .finally(() => {
        setshowLoader(false);
      });
  };
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
  async function download(imageUrl: any) {
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
      <View style={styles.view}>
        <CustomHeader title={'Profile'} leftIcon titleColor={'#fff'} notify />
        <ScrollView>
          <View
            style={{
              marginHorizontal: RF(24),
              marginTop: RF(60),
              paddingBottom: RF(80),
            }}>
            <View
              style={{
                width: '100%',
                backgroundColor: '#F2F2F2',
                elevation: 5,
                padding: RF(12),
                borderRadius: RF(8),
                gap: RF(8),
              }}>
              <View style={{marginTop: RF(40)}}>
                <Text center size={14} SFmedium color={colors.bluE}>
                  {info?.name}
                </Text>
                <Text center size={12} SFmedium color={colors.bluE}>
                  {info?.qualifications}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.ContainerEdit}
                onPress={() => navigate('DoctorProfile')}>
                <Image source={EditButton} style={styles.ImageEdit} />
              </TouchableOpacity>

              <Progress.Bar
                progress={info?.profilePercentage || 10 / 100}
                width={RF(250)}
                color="#288018"
                borderWidth={0}
                unfilledColor="#fff"
                style={styles.progressBar}
              />
              <Text
                SFmedium
                size={12}
                style={{position: 'absolute', right: RF(4), bottom: RF(30)}}>
                {Math.round(info?.profilePercentage || 10)}%
              </Text>
              <Text size={12} SFregular color={'#FF8A02'}>
                Complete Your Profile for better business
              </Text>
            </View>
            <View style={{marginTop: RF(16), gap: RF(4), marginBottom: RF(8)}}>
              <Text size={16} SFsemiBold color={colors.bluE}>
                Personal Info
              </Text>
              <View>
                <Text size={12} SFregular color={colors.bluE}>
                  {info?.name}
                </Text>
                <Text size={12} SFregular color={colors.bluE}>
                  {info?.phoneNumber}
                </Text>
                <Text size={12} SFregular color={colors.bluE}>
                  {info?.email}
                </Text>
              </View>
            </View>
            <View style={{gap: RF(4), marginBottom: RF(8)}}>
              <Text size={16} SFsemiBold color={colors.bluE}>
                Qualification
              </Text>
              <View>
                <Text size={12} SFregular color={colors.bluE}>
                  {info?.qualifications}
                </Text>
              </View>
            </View>
            <View style={{gap: RF(4), marginBottom: RF(8)}}>
              <Text size={16} SFsemiBold color={colors.bluE}>
                Specialties
              </Text>
              <View>
                <Text size={12} SFregular color={colors.bluE}>
                  {info?.speciality.join(' ')}
                </Text>
              </View>
            </View>
            <View style={{gap: RF(4), marginBottom: RF(8)}}>
              <Text size={16} SFsemiBold color={colors.bluE}>
                Certifications
              </Text>
              <View>
                <Text size={12} SFregular color={colors.bluE}>
                  {info?.pmdcNumber}
                </Text>
                <Text size={12} SFregular color={colors.bluE}>
                  {moment(info?.pmdcExpiry).format('MM/DD/YYYY')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text size={12} SFregular color={colors.bluE}>
                    {/* {info?.pmdcImage} */}
                    pmdc.image
                  </Text>
                  <TouchableOpacity
                    onPress={() => downloadAndSaveImage(info?.pmdcImage)}>
                    <Image
                      source={LabDownload}
                      style={{
                        width: RF(16),
                        height: RF(16),
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{gap: RF(4), marginBottom: RF(8)}}>
              <Text size={16} SFsemiBold color={colors.bluE}>
                Bank Details
              </Text>
              <View>
                <Text size={12} SFregular color={colors.bluE}>
                  {info?.bankName}
                </Text>
                <Text size={12} SFregular color={colors.bluE}>
                  {info?.incomeTaxNo}
                </Text>
                <Text size={12} SFregular color={colors.bluE}>
                  {info?.salesTaxNo}
                </Text>

                <Text size={12} SFregular color={colors.bluE}>
                  {info?.accountHolderName}
                </Text>
                <Text size={12} SFregular color={colors.bluE}>
                  {info?.accountNumber}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text size={12} SFregular color={colors.bluE}>
                    {/* {info?.pmdcImage} */}
                    taxfile.image
                  </Text>
                  <TouchableOpacity
                    onPress={() => download(info?.taxFileImage)}>
                    <Image
                      source={LabDownload}
                      style={{
                        width: RF(16),
                        height: RF(16),
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{gap: RF(4), marginBottom: RF(8)}}>
              <Text size={16} SFsemiBold color={colors.bluE}>
                Social Info
              </Text>
              <View>
                <Text size={12} SFregular color={colors.bluE}>
                  {info?.facebook}
                </Text>
                <Text size={12} SFregular color={colors.bluE}>
                  {info?.youtube}
                </Text>
                <Text size={12} SFregular color={colors.bluE}>
                  {info?.instagram}
                </Text>
                <Text size={12} SFregular color={colors.bluE}>
                  {info?.linkedIn}
                </Text>
              </View>
            </View>
            <View style={styles.MainContainer}>
              <Image
                source={{
                  uri:
                    user?.doctorImage ||
                    user?.logo ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                }}
                style={styles.ImageView}
              />
            </View>
          </View>
        </ScrollView>
        <DeleteModal
          Visible={Showmodel}
          cancelPress={() => setShowModel(false)}
          deletePress={() => deleteUser()}
          loading={showLoader}
        />
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default DoctorProfileInformation;

const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    width: RF(104),
    height: RF(104),
    top: RF(-50),
    borderRadius: RF(100),
    borderWidth: RF(2),
    borderColor: 'rgba(245, 245, 245, 1)',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  progressText: {
    position: 'absolute',
  },

  ImageView: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  ContainerEdit: {
    backgroundColor: '#00276D',
    width: RF(32),
    height: RF(32),
    alignItems: 'center',
    position: 'absolute',
    right: 8,
    justifyContent: 'center',
    borderRadius: RF(100),
  },
  progressBar: {},
  ImageEdit: {width: RF(20), height: RF(20), resizeMode: 'contain'},
  view: {flex: 1, backgroundColor: '#fff'},
  MarginTop: {marginHorizontal: RF(24), marginTop: RF(56)},
});
