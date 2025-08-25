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
import {FlatList, RefreshControl, View} from 'react-native';
import useStyles from './styles';
import moment from 'moment';
import {useSelector} from 'react-redux';

const ParamedicStaffRequest = ({navigation}: any) => {
  const styles = useStyles();
  const theme: any = useTheme();
  const color = theme.color;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);
  const {changeColor} = useSelector((state: any) => state?.root?.shiftStack);
  useEffect(() => {
    requestFetch();
  }, []);

  const requestFetch = () => {
    setLoading(true);
    let data = {
      status: 'completed',
    };
    getallParamedicRequest(data)
      .then((res?: any) => {
        setData(res?.data?.paramedicRequests);
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
          <CustomHeader
            title={'Completed Requests'}
            titleColor={'#fff'}
            notify
          />
          <FlatList
            data={data}
            scrollEnabled={true}
            refreshControl={
              <RefreshControl
                enabled={true}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[changeColor, changeColor]}
              />
            }
            contentContainerStyle={{paddingBottom: RF(80)}}
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
                    {moment(item?.preferredDate).format('hh:mm A')}
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

                  <Text size={12} color={color?.blueText}>
                    {item?.status}
                  </Text>
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

export default ParamedicStaffRequest;
