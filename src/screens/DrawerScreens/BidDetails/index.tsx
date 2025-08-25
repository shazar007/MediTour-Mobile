import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppButton,
  CustomHeader,
  CustomLoader,
  EmptyList,
  FlightUnique,
  HeaderCard,
  RejectedModal,
  Text,
  UserHeaderContent,
} from '@components';
import {
  allBidDetailsRequest,
  flightDecline,
  navigate,
  showToast,
} from '@services';
import {RF} from '@theme';
import useStyles from './styles';
import {LabDownload} from '@assets';
import {useTheme} from '@react-navigation/native';
import {Platform, PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import {useDispatch, useSelector} from 'react-redux';
import ImageView from 'react-native-image-viewing';
import {Alert} from '@utils';

const BidDetails = ({route}: any) => {
  const {item, totalTravelers, type} = route.params;
  const theme: any = useTheme();
  const colors = theme?.colors;
  const dispatch: any = useDispatch();
  const [valueData, setValueData] = useState<any>({});
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPoliciesVisible, setIsPoliciesVisible] = useState(false);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const [visible, setIsVisible] = useState(false);
  const styles = useStyles();
  useEffect(() => {
    if (type !== 'booking') {
      bidRequestDetails();
    }
  }, []);

  const bidRequestDetails = () => {
    setLoading(true);
    let data = {
      bidId: item?._id,
    };
    allBidDetailsRequest(data)
      .then((res: any) => {
        setValueData(res?.data?.bidRequest);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const declineRequest = () => {
    setLoading(true);
    let params = {
      requestId: selectedRequestId,
    };
    flightDecline(params)
      .then((res: any) => {
        setValueData({
          ...valueData,
          flightDetails: valueData.flightDetails.filter(
            (item: any) => item._id !== selectedRequestId,
          ),
        });
        if (res?.data?.auth === true) {
          Alert.showSuccess('Decline Successfully');
          navigate('Request');
        }
        setModalVisible(false);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const openModal = (requestId: any) => {
    setSelectedRequestId(requestId);
    setModalVisible(true);
  };

  const continueClick = () => {
    navigate('TravelerIdentity', {
      totalTravelers: totalTravelers,
      item: item,
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

  async function downloadAndSaveImage(fileUrl: any) {
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
          description: 'Downloading file...',
          mime: mimeType,
          mediaScannable: true,
        },
      };

      const res = await config(options).fetch('GET', fileUrl);

      if (res?.data) {
        Alert.showSuccess('File downloaded successfully!');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      Alert.showError('Failed to download file');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title={'Bid Flights'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <ScrollView>
        {valueData?.flightDetails || item?.bidRequestId?.flightDetails ? (
          <View style={styles.ViewDetails}>
            <FlightUnique
              valueData={
                valueData?.flightDetails || item?.bidRequestId?.flightDetails
              }
              value={valueData}
              stay={valueData?.stayDurations}
            />
            {valueData?.returnFlights?.length > 0 ||
              (item?.bidRequestId?.returnFlights?.length > 0 && (
                <View style={{marginTop: RF(16), gap: RF(8)}}>
                  <Text size={16} SFmedium color={'#00276D'}>
                    Return Flight Bid
                  </Text>
                  <FlightUnique
                    valueData={
                      valueData?.returnFlights ||
                      item?.bidRequestId?.returnFlights
                    }
                    stay={
                      valueData?.returnStayDurations ||
                      item?.bidRequestId?.returnFlights
                    }
                    value={valueData || item?.bidRequestId}
                  />
                </View>
              ))}
            <View style={{marginTop: RF(16)}}>
              <TouchableOpacity
                onPress={() => setIsPoliciesVisible(!isPoliciesVisible)}
                style={styles.ViewSearch}>
                <Text size={16} SFmedium>
                  Carry & Policies
                </Text>
                {isPoliciesVisible && (
                  <View style={{gap: RF(4), marginTop: RF(8)}}>
                    <Text size={12} SFregular>
                      Cancellation Duration
                    </Text>
                    <Text size={12} SFlight>
                      {valueData?.flightPolicies?.cancelationDuration ||
                        item?.bidRequestId?.flightPolicies?.cancelationDuration}
                    </Text>
                    <Text size={12} SFregular>
                      Cancellation Deduction
                    </Text>
                    <Text size={12} SFlight>
                      {valueData?.flightPolicies?.cancelationDeduction ||
                        item?.bidRequestId?.flightPolicies
                          ?.cancelationDeduction}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            {/* ....................Decline&&Accept..................... */}

            {type == 'booking' ? (
              <>
                <Text size={16} SFsemiBold style={{marginTop: RF(16)}}>
                  E-Ticket File
                </Text>
                {item?.eTicket ? (
                  <View
                    style={{
                      width: '100%',
                      paddingHorizontal: RF(16),
                      paddingVertical: RF(5),
                      borderWidth: 1,
                      borderStyle: 'dashed',
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'rgba(227, 235, 237, 1)',
                      borderRadius: 8,
                      marginTop: RF(8),
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{width: '60%'}} numberOfLines={1}>
                      {item?.eTicket}
                    </Text>
                    {/* <Pressable
                      onPress={() => setIsVisible(true)}
                      style={{
                        borderWidth: 1,
                        padding: RF(5),
                        paddingVertical: 2,
                        borderRadius: 5,
                        borderColor: colors?.primary,
                      }}>
                      <Text>View</Text>
                    </Pressable> */}
                    <Pressable
                      onPress={() => downloadAndSaveImage(item?.eTicket)}>
                      <Image
                        source={LabDownload}
                        style={{
                          height: RF(20),
                          width: RF(20),
                          resizeMode: 'contain',
                          tintColor: colors?.primary,
                        }}
                      />
                    </Pressable>
                  </View>
                ) : (
                  <Text>No E-ticket found</Text>
                )}
              </>
            ) : (
              <>
                {!isAccepted && (
                  <>
                    <View style={styles.TravelersStyles}>
                      <Text size={16} SFmedium>
                        Total Price for Traveler
                      </Text>
                      <Text size={14} SFmedium>
                        PKR {valueData?.ticketPrice}
                      </Text>
                    </View>

                    <View style={styles.ViewRow}>
                      <TouchableOpacity
                        style={styles.TouchableStyle}
                        onPress={() => openModal(item._id)}>
                        <Text size={12} color={'#D2092D'} SFregular>
                          Decline
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.TouchStyle}
                        onPress={() => setIsAccepted(true)}>
                        <Text size={12} color={'#fff'} SFregular>
                          Accept
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
                {isAccepted && (
                  <>
                    <View style={styles.Gap}>
                      <Text size={18} SFmedium color={'#00276D'}>
                        PKR {valueData?.ticketPrice}
                      </Text>
                      <Text size={18} SFmedium color={'#00276D'}>
                        .{totalTravelers} Traveler
                      </Text>
                    </View>

                    <AppButton
                      title="Continue"
                      textcolor={'#fff'}
                      bgClr={changeColor}
                      m_Top={RF(24)}
                      onPress={continueClick}
                    />
                  </>
                )}
              </>
            )}
            {item?.eTicket && (
              <ImageView
                images={[{uri: item?.eTicket}]}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
              />
            )}

            {loading && <CustomLoader />}
          </View>
        ) : (
          <EmptyList description={'No Bid Found'} />
        )}
      </ScrollView>

      <RejectedModal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        declineRequest={declineRequest}
      />
    </View>
  );
};

export default BidDetails;
