import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  PermissionsAndroid,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import {
  CustomHeader,
  CustomLoader,
  EmptyList,
  Text,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {getCompletedOrders, globalStyles, navigate, showToast} from '@services';
import useStyles from './styles';
import moment from 'moment';

const LaboratoryResult = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [data, setData] = useState<any>([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const styles = useStyles(colors);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState<any>(1);
  const [indicator, setIndicator] = useState<any>(false);
  const [endReached, setEndReached] = useState(false);

  useEffect(() => {
    getResult();
  }, [page]);

  useEffect(() => {
    if (endReached === true) {
      getResult();
    }
  }, [endReached]);
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

  const getResult = () => {
    let params = {
      page: page,
    };

    getCompletedOrders(params)
      .then((res: any) => {
        if (res?.data?.nextPage) {
          setNextPage(res?.data?.nextPage);
        }
        if (page > 1) {
          let newArr = data?.concat(res.data.orders);
          setData(newArr);
        } else {
          setData(res.data.orders);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        endReached && setEndReached(false);
        setIndicator(false);
        setLoading(false);
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    getResult();
    setRefreshing(false);
  };

  const fetchNextPage = async () => {
    if (data?.length >= 10) {
      if (nextPage && page < nextPage) {
        setIndicator(true);
        setTimeout(() => {
          setPage(page + 1);
          setEndReached(true);
        }, 1000);
      }
    }
  };
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const toggleShowAllData = (item: any) => {
    navigate('ResultDetails', {
      data: item,
    });
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'All Test Results'}
        leftIcon
        titleColor={colors.white}
        notify
      />
      <FlatList
        contentContainerStyle={{
          marginHorizontal: RF(16),
          marginTop: RF(8),
          paddingBottom: RF(80),
        }}
        data={loading ? null : data}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={loading ? null : <EmptyList />}
        onEndReachedThreshold={0.5}
        onEndReached={fetchNextPage}
        ListFooterComponent={
          indicator ? (
            <ActivityIndicator size="small" color={colors?.primary} />
          ) : null
        }
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        renderItem={({item}: any) => {
          return (
            <TouchableOpacity
              onPress={() => toggleShowAllData(item)}
              style={styles.CardDesign}>
              <View style={globalStyles.row}>
                <Text size={16} SFsemiBold color={colors.orange}>
                  Order ID: {item?.orderId}
                </Text>
                <Text size={14} SFregular color={colors.blueText}>
                  MR No: {item?.MR_NO}
                </Text>
              </View>
              <View style={globalStyles.row}>
                <Text size={12} SFregular color={colors.primary}>
                  Patient Name: {item?.customerName}
                </Text>
                <Text size={14} SFregular color={colors.primary}>
                  {moment(item?.createdAt).format('M/D/YYYY')}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.TouchUpdate}
                onPress={() => downloadAndSaveImage(item?.results)}>
                <Text size={12} SFmedium color={'#fff'}>
                  Download Result
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default LaboratoryResult;
