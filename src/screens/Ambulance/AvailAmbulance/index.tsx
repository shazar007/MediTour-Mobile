import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  AppButton,
  CustomHeader,
  CustomLoader,
  Text,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import moment from 'moment';
import {getAmbulanceBidDetails, navigate} from '@services';

const AvailAmbulance = ({route}: any) => {
  const {item} = route.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const [loading, setLoading] = useState<any>(false);
  const formattedDate = moment(item.createdAt).format('MM-DD-YYYY');
  const formattedTime = moment(item.createdAt).format('hh:mm A');
  const [data, setData] = useState<any>([]);
  const getBid = () => {
    setLoading(true);
    let params = {
      requestId: item?._id,
    };
    getAmbulanceBidDetails(params)
      .then((res: any) => {
        setData(res?.data?.bid);
      })
      .catch(err => {})
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (item?.bidSent === true) {
      getBid();
    }
  }, []);
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Request Details'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ViewContent}>
          <TouchableOpacity style={styles.TouchView}>
            <View style={styles.ViewContainer}>
              <Text size={12} SFlight color={'#0E54A3'}>
                {formattedDate}
              </Text>
              <Text size={12} SFlight color={'#0E54A3'}>
                {formattedTime}
              </Text>
            </View>
            <Text size={12} SFregular color={'#0E54A3'}>
              Name
            </Text>
            <Text size={14} SFregular color={'#7D7D7D'}>
              {item.userId.name}
            </Text>
            {/* <Text size={12} SFregular color={'#0E54A3'}>
              Email
            </Text>
            <Text size={14} SFregular color={'#7D7D7D'}>
              {item.userId.email}
            </Text> */}
            <Text size={12} SFregular color={'#0E54A3'}>
              Pickup
            </Text>
            <Text size={14} SFregular color={'#7D7D7D'}>
              {item.pickUp.address}, {item.pickUp.city}
            </Text>
            <Text size={12} SFregular color={'#0E54A3'}>
              Drop off
            </Text>
            <Text size={14} SFregular color={'#7D7D7D'}>
              {item.dropOff.address}, {item.dropOff.city}
            </Text>
          </TouchableOpacity>
          {item?.bidSent === false && (
            <AppButton
              title="Add Ambulance"
              m_Top={RF(32)}
              bgClr={colors.Ambulance}
              onPress={() => navigate('BidAmbulance', {item: item})}
            />
          )}
          {item?.bidSent === true && (
            <View
              style={{
                padding: RF(12),
                backgroundColor: '#fff',
                borderRadius: RF(8),
                marginTop: RF(16),
                elevation: 5,
              }}>
              <Text size={16} SFmedium color={'#00276D'}>
                Bid Details
              </Text>
              <View style={{marginTop: RF(8), gap: RF(4)}}>
                <Text size={14} SFmedium color={'#00276D'}>
                  Ambulance Name
                </Text>
                <Text size={12} SFlight color={'#00276D'}>
                  {data?.ambulanceName}
                </Text>
              </View>
              <View style={{marginTop: RF(8), gap: RF(4)}}>
                <Text size={14} SFmedium color={'#00276D'}>
                  No
                </Text>
                <Text size={12} SFlight color={'#00276D'}>
                  {data?.ambulanceNo}
                </Text>
              </View>
              <View style={{marginTop: RF(8), gap: RF(4)}}>
                <Text size={14} SFmedium color={'#00276D'}>
                  Price
                </Text>
                <Text size={12} SFlight color={'#00276D'}>
                  {data?.price}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default AvailAmbulance;

const styles = StyleSheet.create({
  ViewContent: {
    paddingHorizontal: RF(20),
    paddingBottom: RF(72),
    paddingVertical: RF(20),
  },
  TouchView: {
    backgroundColor: '#fff',
    elevation: 2,
    padding: RF(8),
    borderRadius: RF(8),
    gap: RF(4),
  },
  ViewContainer: {flexDirection: 'row', alignItems: 'center', gap: RF(8)},
});
