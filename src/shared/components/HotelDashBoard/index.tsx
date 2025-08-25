import {FlatList, Image, StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import Text from '../text';
import {RF} from '@theme';
import {Right} from '@assets';
import moment from 'moment';

const HotelDashBoard = ({data, Reservation}: any) => {
  const formattedDateTime1 = useMemo(() => {
    return moment(data?.arrivalTime?.from).format('M/YYYY');
  }, [data?.arrivalTime?.from]);
  const formattedDateTime2 = useMemo(() => {
    return moment(data?.arrivalTime?.to).format('M/YYYY');
  }, [data?.arrivalTime?.to]);

  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: RF(16),
              backgroundColor: '#F0EEE1',
              elevation: 5,
              marginHorizontal: RF(2),
              marginVertical: RF(2),
              marginTop: RF(16),
              borderRadius: RF(16),
              justifyContent: 'space-between',
            }}>
            <View
              style={{flexDirection: 'row', alignItems: 'center', gap: RF(16)}}>
              <Image
                source={{
                  uri: item?.userId?.userImage
                    ? item?.userId?.userImage
                    : item?.userImage ||
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                }}
                style={{
                  width: RF(48),
                  height: RF(48),
                  borderRadius: RF(32),
                  resizeMode: 'contain',
                }}
              />
              <View style={{gap: RF(4)}}>
                <Text size={16} SFmedium color={'#00276D'}>
                  {item?.userId?.name ? item?.userId?.name : item?.name}
                </Text>
                <Text size={12} SFregular color={'#00276D'}>
                  {item?.serviceModelType}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: RF(8),
                  }}>
                  <View
                    style={{
                      width: RF(8),
                      height: RF(8),
                      borderRadius: RF(32),
                      backgroundColor: '#00276D',
                    }}
                  />
                  <Text size={12} SFlight>
                    {formattedDateTime1}-{formattedDateTime2}
                  </Text>
                </View>
              </View>
            </View>
            {Reservation && (
              <Image
                source={Right}
                style={{width: RF(20), height: RF(20), resizeMode: 'contain'}}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default HotelDashBoard;

const styles = StyleSheet.create({});
