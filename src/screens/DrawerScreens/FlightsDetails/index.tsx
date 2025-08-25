import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import {
  BidDetailsComponet,
  CustomHeader,
  CustomLoader,
  EmptyList,
  Text,
} from '@components';
import moment from 'moment';
import {allBidRequest, PADDING, rs} from '@services';

const FlightsDetails = ({route}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {item} = route.params;
  const totalTravelers = item.adult + item.children + item.infant;
  useEffect(() => {
    getAllBid();
  }, []);
  const getAllBid = () => {
    setLoading(true);
    const params = {
      requestId: item?._id,
    };
    allBidRequest(params)
      .then((res: any) => {
        setData(res.data.bidRequests);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title={'Bid Flights'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <ScrollView>
        <View
          style={{
            paddingBottom: RF(60),
          }}>
          <View
            style={[
              styles.content,
              {backgroundColor: data.length >= 1 ? '#FDCB2E' : '#fff'},
            ]}>
            <View style={{gap: RF(8)}}>
              <View>
                <Text
                  size={9}
                  SFregular
                  color={data.length >= 1 ? '#fff' : '#7D7D7D'}>
                  Flight Type
                </Text>
                <Text
                  size={14}
                  SFregular
                  color={data.length >= 1 ? '#00276D' : colors.blueText}>
                  {item?.requestType}
                </Text>
              </View>
              {item?.flights?.map((user: any) => (
                <View style={styles.ViewContent}>
                  <View style={{width: '33%'}}>
                    <Text
                      size={9}
                      SFregular
                      color={data.length >= 1 ? '#fff' : '#7D7D7D'}>
                      From
                    </Text>
                    <Text size={14} SFregular color={colors.blueText}>
                      {user?.from}
                    </Text>
                  </View>
                  <View style={{width: '33%'}}>
                    <Text
                      size={9}
                      SFregular
                      color={data.length >= 1 ? '#fff' : '#7D7D7D'}>
                      To
                    </Text>
                    <Text size={14} SFregular color={colors.blueText}>
                      {user?.to}
                    </Text>
                  </View>
                  <View style={{width: '33%'}}>
                    <Text
                      size={9}
                      SFregular
                      color={data.length >= 1 ? '#fff' : '#7D7D7D'}>
                      Departure
                    </Text>
                    <Text size={14} SFregular color={colors.blueText}>
                      {moment(user?.departure).format('MM-DD-YYYY')}
                    </Text>
                  </View>
                </View>
              ))}

              <View style={styles.viewJs}>
                <View>
                  <Text
                    size={9}
                    SFregular
                    color={data.length >= 1 ? '#fff' : '#7D7D7D'}>
                    Travelers
                  </Text>
                  <Text size={14} SFregular color={colors.blueText}>
                    {totalTravelers}
                  </Text>
                </View>
                <View>
                  <Text
                    size={9}
                    SFregular
                    color={data.length >= 1 ? '#fff' : '#7D7D7D'}>
                    Flight Class
                  </Text>
                  <Text size={14} SFregular color={colors.blueText}>
                    {item?.flightClass}
                  </Text>
                </View>
                {item?.requestType === 'round' && (
                  <View>
                    <Text
                      size={9}
                      SFregular
                      color={data.length >= 1 ? '#fff' : '#7D7D7D'}>
                      Return
                    </Text>
                    <Text size={14} SFregular color={colors.blueText}>
                      {moment(item?.returnFlight).format('MM-DD-YYYY')}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <FlatList
            data={data}
            scrollEnabled={false}
            contentContainerStyle={{padding: rs(16), gap: rs(16)}}
            ListEmptyComponent={
              <EmptyList
                description={loading ? 'Loading.....' : 'No Bid found'}
              />
            }
            renderItem={({item}: any) => (
              <BidDetailsComponet item={item} totalTravelers={totalTravelers} />
            )}
          />
        </View>
      </ScrollView>
      {loading && <CustomLoader />}
    </View>
  );
};

export default FlightsDetails;

const styles = StyleSheet.create({
  content: {
    padding: PADDING?._16,
    margin: rs(16),
    marginBottom: 0,
    borderRadius: RF(16),
    elevation: 5,
  },
  contentView: {
    padding: RF(8),
    borderRadius: RF(16),
    elevation: 5,
    marginHorizontal: RF(4),
    backgroundColor: '#fff',
    marginVertical: RF(8),
  },
  ViewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: RF(8),
  },

  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planeIcon: {
    gap: RF(4),
  },
  DEL: {width: RF(16), height: RF(16), resizeMode: 'contain'},
  viewJs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
