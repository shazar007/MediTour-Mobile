import {
  Text,
  Wrapper,
  CustomLoader,
  EmptyList,
  CustomHeader,
} from '@components';
import moment from 'moment';
import useStyles from './styles';
import React, {useEffect, useState} from 'react';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {plus} from '@assets';
import {navigate, travelAgencyGetTours} from '@services';
import {FlatList, Image, Pressable, RefreshControl, View} from 'react-native';
import {RF} from '@theme';

const TravelAgencyBooking = ({navigation, route}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [list, setList] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const [isRefreshing, setIsRefreshing] = useState<any>(false);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => {};
    }, []),
  );

  const fetchData = () => {
    travelAgencyGetTours(1)
      .then((res: any) => {
        setList(res?.data?.tours);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setIsRefreshing(false);
      });
  };

  const onAdd = () => {
    navigate('TravelAgency_Add_Edit_Booking', {type: 'Add', data: {}});
  };

  const onOpen = (item: any) => {
    navigate('TravelAgencyBookingDetails', {data: item});
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Tour Plan'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <View style={styles.main}>
        <FlatList
          data={list}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          renderItem={({item}: any) => {
            return (
              <Pressable style={styles.pressable} onPress={() => onOpen(item)}>
                <Image source={{uri: item?.images[0]}} style={styles.img} />
                <View style={styles.ml}>
                  <Text
                    size={14}
                    color={colors?.bluE}
                    SFsemiBold
                    style={{width: 150}}
                    // numberOfLines={1}
                  >
                    {item?.packageName}
                  </Text>
                  <Text size={12} color={colors?.bluE} SFmedium>
                    {moment(item?.createdAt).format('DD-MM-YYYY')}
                  </Text>
                  <Text
                    size={14}
                    color={colors?.bluE}
                    SFmedium
                    numberOfLines={1}
                    style={{width: RF(150)}}>
                    {item?.packageName}
                  </Text>
                </View>
              </Pressable>
            );
          }}
          ListEmptyComponent={() => {
            return <EmptyList />;
          }}
        />

        <Pressable style={styles.btnV} onPress={onAdd}>
          <Image source={plus} style={styles.btn} />
        </Pressable>
      </View>

      {loading && <CustomLoader />}
    </Wrapper>
  );
};
export default TravelAgencyBooking;
