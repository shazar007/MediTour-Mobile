import {RF} from '@theme';
import moment from 'moment';
import useStyles from './styles';
import React, {useMemo, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {
  FlatList,
  Image,
  PermissionsAndroid,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {
  CustomHeader,
  CustomLoader,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {useSelector} from 'react-redux';
import RNFetchBlob from 'react-native-blob-util';
import {rv, showToast} from '@services';
import {LabDownload} from '@assets';
const OrderDetails = ({route}: any) => {
  const {item, type} = route.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [loading, setLoading] = useState<boolean>(false);

  const formattedDateTime = useMemo(() => {
    return moment(item.createdAt).format('M/D/YYYY, h:mmA');
  }, [item.createdAt]);

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
        showToast('success', 'File downloaded successfully!', true);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      showToast('error', 'Failed to download file', false);
    } finally {
      setLoading(false);
    }
  }

  const {exchangeRate} = useSelector((state: any) => state.root.user);
  const gatewayName = item?.gatewayName;
  let removeProcessFee = item?.paidByUserAmount - item?.processingFee;
  const price =
    item?.gatewayName === 'stripe' ? removeProcessFee : item?.paidByUserAmount;

  const TotalAmount =
    gatewayName === 'stripe' ? `$ ${price?.toFixed(2)}` : `PKR ${price}`;

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Order Details'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 80}}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text size={16} SFmedium color={colors.primary}>
                Order ID:{' '}
                <Text size={14} SFregular color={colors.primary}>
                  {item?.orderId || item?.requestId}
                </Text>
              </Text>
              <View style={{marginTop: RF(5)}}>
                <Text size={9} color={colors.primary} SFmedium>
                  {formattedDateTime}
                </Text>
                <Text
                  center
                  size={14}
                  color={item?.status == 'pending' ? 'red' : colors.primary}
                  SFmedium>
                  {item?.status}
                </Text>
              </View>
            </View>
            {/* <Image
              source={{uri: item?.vendorId?.logo || item?.pharmacyId?.logo}}
              style={styles.image}
            /> */}
            <Text size={16} SFsemiBold color={colors.primary}>
              Selected items
            </Text>
            <FlatList
              scrollEnabled={false}
              data={item.medicineIds || item?.items}
              keyExtractor={item => item._id}
              renderItem={({item, index}: any) => {
                const price =
                  item?.itemId?.userAmount ||
                  item?.itemId?.actualPrice ||
                  item?.tpPrice ||
                  item?.id?.tpPrice;
                const convertedAmount = exchangeRate * price;
                const multiplyAmount = item?.quantity * convertedAmount;
                const handleAmount =
                  gatewayName === 'stripe'
                    ? `$ ${multiplyAmount?.toFixed(2)}`
                    : `PKR ${price}`;

                return (
                  <View key={index} style={styles.itemContainer}>
                    <View style={styles.itemHeader}>
                      <View style={styles.content}>
                        <Text size={12} SFbold color={colors.primary}>
                          {item?.itemId?.testNameId?.name ||
                            item?.itemId?.generic ||
                            item?.id?.generic}{' '}
                          -{' '}
                          <Text size={9} SFmedium color={colors.primary}>
                            {item?.itemId?.testCode || item?.id?.medCode}
                          </Text>
                        </Text>
                        <Text
                          size={12}
                          SFbold
                          color={colors.primary}
                          style={{marginLeft: RF(16)}}>
                          x{item?.quantity}{' '}
                        </Text>
                        {type === 'pharmacy' ? (
                          <Text size={9} SFmedium color={colors.primary}>
                            pack
                          </Text>
                        ) : null}
                      </View>
                      <Text size={14} SFmedium color={colors.primary}>
                        {handleAmount}
                      </Text>
                    </View>

                    {item?.id?.brand ? (
                      <View style={styles.itemHeader}>
                        <View style={styles.content}>
                          <Text size={12} SFmedium color={colors.primary}>
                            Brand -{' '}
                            <Text size={9} SFmedium color={colors.primary}>
                              {item?.id?.brand}
                            </Text>
                          </Text>
                          <Text
                            size={12}
                            SFmedium
                            color={colors.primary}
                            style={{marginLeft: RF(16)}}>
                            Type -{' '}
                            <Text size={9} SFmedium color={colors.primary}>
                              {item?.id?.productType}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <Text size={12} SFregular color={'#465C67'}>
                        {item?.brand}
                      </Text>
                    )}

                    <Text size={12} SFregular color={'#465C67'}>
                      {item?.itemId?.testDescription}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          {type !== 'pharmacy' && (
            <>
              {item?.results ? (
                <View style={styles.viewpf}>
                  <Text size={14} SFmedium>
                    Download test results
                  </Text>
                  <Pressable
                    onPress={() => downloadAndSaveImage(item?.results)}>
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
                <View style={{marginHorizontal: rv(12)}}>
                  <Text size={16} SFmedium>
                    Test Result not uploaded!
                  </Text>
                </View>
              )}
            </>
          )}
        </ScrollView>
        {loading && <CustomLoader />}
        <View style={{...styles.TotalBill}}>
          <Text size={18} SFmedium color={colors.white}>
            Total Amount
          </Text>
          <Text size={18} SFmedium color={colors.white}>
            {TotalAmount}
          </Text>
        </View>
      </View>
    </Wrapper>
  );
};
export default OrderDetails;
