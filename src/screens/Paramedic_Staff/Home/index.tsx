import {
  CustomHeader,
  CustomLoader,
  EmptyList,
  Text,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {getallParamedicRequest, paramedicStatus, showToast} from '@services';
import {RF} from '@theme';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import useStyles from './styles';
import moment from 'moment';
import {dropIcon} from '@assets';
import {ActivityIndicator} from 'react-native-paper';

const ParamedicStaff_Home = ({navigation}: any) => {
  const {B2B} = useSelector((state: any) => state?.root?.b2b);
  const styles = useStyles();
  const theme: any = useTheme();
  const color = theme.color;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [open, setOpen] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState<any>('');
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [indicatorLoader, setIndicatorLoader] = useState(false);
  const [indicator, setIndicator] = useState(false);

  // const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  useEffect(() => {
    requestFetch();
  }, []);

  const fetchNextPage = () => {
    if (nextPage && page < nextPage) {
      setPage(page + 1);
      setIndicator(true);
      setTimeout(() => {
        setIndicator(false);
      }, 2000);
    }
  };

  const requestFetch = () => {
    setLoading(true);
    const requestData = {status: 'accepted'};
    getallParamedicRequest(requestData)
      .then((res?: any) => {
        setData(res?.data?.paramedicRequests);
        if (res?.data?.nextPage) {
          setNextPage(res?.data?.nextPage);
        }
        if (page > 1) {
          let newArr = data.concat(res?.data?.paramedicRequests);
          setData(newArr);
        } else {
          setData(res.data.paramedicRequests);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const uploadStatus = (id: any, index: any) => {
    setLoading(true);
    paramedicStatus(id)
      .then((res: any) => {
        requestFetch();
        showToast('Success', 'Status Completed Successfully', true);
        setSelected((prev: any) => ({...prev, [index]: 'Completed'}));
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      requestFetch();
      setRefreshing(false);
    }, 100);
  };
  return (
    <>
      <Wrapper
        statusBarBagColor={'transparent'}
        statusBarStyle={'light-content'}>
        <View style={{flex: 1}}>
          <CustomHeader title={'Requests'} titleColor={'#fff'} notify />
          <FlatList
            data={data}
            contentContainerStyle={{paddingBottom: RF(80)}}
            onEndReached={fetchNextPage}
            ListFooterComponent={
              <ActivityIndicator
                size={'small'}
                animating={indicator}
                color={'red'}
              />
            }
            refreshControl={
              <RefreshControl
                enabled={true}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                // colors={[changeColor, changeColor]}
              />
            }
            ListEmptyComponent={!loading ? <EmptyList /> : null}
            renderItem={({item, index}: any) => (
              <View key={index} style={styles.Container}>
                <View style={styles.rowContent}>
                  <Text size={14} SFmedium color={color?.blueText}>
                    Name
                  </Text>
                  <Text size={12} color={color?.blueText}>
                    {item?.name}
                  </Text>
                </View>
                <View style={styles.rowContent}>
                  <Text size={14} SFmedium color={color?.blueText}>
                    Email
                  </Text>
                  <Text size={12} color={color?.blueText}>
                    {item?.email}
                  </Text>
                </View>
                <View style={styles.rowContent}>
                  <Text size={14} SFmedium color={color?.blueText}>
                    Contact
                  </Text>
                  <Text size={12} color={color?.blueText}>
                    {item?.contact}
                  </Text>
                </View>
                <View style={styles.rowContent}>
                  <Text size={14} SFmedium color={color?.blueText}>
                    Preferred Time
                  </Text>
                  <Text size={12} color={color?.blueText}>
                    {item?.gender}
                  </Text>
                </View>
                <View style={styles.rowContent}>
                  <Text size={14} SFmedium color={color?.blueText}>
                    Preferred Date
                  </Text>
                  <Text size={12} color={color?.blueText}>
                    {moment(item?.preferredDate).format('DD/MM/YYYY')}
                  </Text>
                </View>
                <View style={styles.rowContent}>
                  <Text size={14} SFmedium color={color?.blueText}>
                    Preferred Time
                  </Text>
                  <Text size={12} color={color?.blueText}>
                    {item?.preferredTime}
                  </Text>
                </View>
                <View style={styles.rowContent}>
                  <Text size={14} SFmedium color={color?.blueText}>
                    Schedule
                  </Text>
                  <Text size={12} color={color?.blueText}>
                    {item?.schedule}
                  </Text>
                </View>
                <View style={styles.rowContent}>
                  <Text size={14} SFmedium color={color?.blueText}>
                    Status
                  </Text>
                  <View style={styles.mainView}>
                    <Text size={12} color={color?.blueText}>
                      {selected[index] ? selected[index] : 'Pending'}
                    </Text>
                    <TouchableOpacity
                      key={index}
                      onPress={() => setOpen(open == index ? null : index)}>
                      <Image
                        source={dropIcon}
                        style={{
                          width: RF(16),
                          height: RF(16),
                          resizeMode: 'contain',
                          transform: [
                            {rotate: open === index ? '180deg' : '0deg'},
                          ],
                        }}
                      />
                    </TouchableOpacity>
                  </View>

                  {open === index && (
                    <View style={styles.openView}>
                      <TouchableOpacity
                        style={{
                          borderRadius: RF(4),
                        }}
                        onPress={() => {
                          setOpen(null);
                          uploadStatus(item._id, index);
                        }}>
                        <Text size={12} color={color?.blueText}>
                          Completed
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            )}
          />
        </View>
        {loading && <CustomLoader />}
      </Wrapper>
    </>
  );
};

export default ParamedicStaff_Home;
