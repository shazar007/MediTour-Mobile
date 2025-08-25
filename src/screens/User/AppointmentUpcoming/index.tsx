import {View, ScrollView, StyleSheet, RefreshControl} from 'react-native';
import {
  Wrapper,
  HeaderCard,
  MeditourButton,
  UserHeaderContent,
  UpComingTab,
  CustomLoader,
  EmptyList,
  Text,
  SwapCards,
  CustomHeader,
} from '@components';
import {RF} from '@theme';
import React, {useCallback, useEffect, useState} from 'react';
import {navigate, getUpcoming_Doctor, GetAll_Records, rs} from '@services';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {Det, drawer, prescription} from '@assets';
import {useFocusEffect, useTheme} from '@react-navigation/native';

const AppointmentUpcoming = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [selected, setSelected] = useState<string>('Upcoming');
  const [data, setData] = useState<any>([]);
  const [records, setRecords] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      if (selected === 'Upcoming') {
        UpcomingDoctor(1);
      } else {
        RecordDoctor(1);
      }

      // Cleanup function (if needed)
      return () => {};
    }, [selected]), // Keep dependencies to avoid stale values
  );

  const UpcomingDoctor = (pageNumber = 1) => {
    if (!hasMoreData && pageNumber > 1) return;

    let params = {
      page: pageNumber,
    };
    getUpcoming_Doctor(params)
      .then((res: any) => {
        const newAppointments = res?.data?.latestAppointments || [];
        setData((prevData: any) =>
          pageNumber === 1
            ? newAppointments
            : [...prevData, ...newAppointments],
        );

        if (newAppointments.length === 0 || newAppointments.length < 10) {
          setHasMoreData(false);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setPage(pageNumber);
      });
  };

  const RecordDoctor = (pageNumber = 1) => {
    if (!hasMoreData && pageNumber > 1) return;

    let params = {
      page: pageNumber,
    };
    GetAll_Records(params)
      .then((res: any) => {
        const newRecords = res?.data?.latestRecords || [];
        setRecords((prevRecords: any) =>
          pageNumber === 1 ? newRecords : [...prevRecords, ...newRecords],
        );

        if (newRecords.length === 0 || newRecords.length < 10) {
          setHasMoreData(false);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setPage(pageNumber);
      });
  };

  const handlePress = (item: any) => {
    setSelected(item);
    setPage(1);
    setHasMoreData(true);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      if (selected == 'Upcoming') {
        UpcomingDoctor(1);
      }
      if (selected == 'Record') {
        RecordDoctor(1);
      }
      setRefreshing(false);
    }, 3000);
  };

  const onClick = (item: any) => {
    if (selected == 'Upcoming') {
      navigate('AppointmentDetails', {item: item});
    } else {
      navigate('PreceptionDetails', {item: item});
    }
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1, backgroundColor: colors?.background}}>
        <CustomHeader
          title={'Appointment'}
          leftIcon={'back'}
          titleColor={colors.white}
          notify
        />

        <ScrollView
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[changeColor, changeColor]}
            />
          }>
          <View
            style={{
              paddingBottom: RF(120),
            }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              contentContainerStyle={{padding: rs(16), gap: rs(16)}}
              data={
                selected == 'Upcoming'
                  ? data
                  : selected == 'Record'
                  ? records
                  : []
              }
              ListEmptyComponent={
                loading ? null : <EmptyList description={'No data found'} />
              }
              renderItem={({item}: any) => (
                <>
                  <UpComingTab
                    item={item}
                    RowTrue
                    selected={selected}
                    onPress={() => onClick(item)}
                    imageBtn={
                      selected == 'Upcoming'
                        ? Det
                        : selected == 'Record'
                        ? prescription
                        : null
                    }
                    title={
                      selected == 'Upcoming'
                        ? 'Details'
                        : selected == 'Record'
                        ? 'Prescription'
                        : ''
                    }
                  />
                  {selected == 'Upcoming' && item?.isPaidFull == false && (
                    <Text color={'rgba(234, 2, 52, 1)'}>
                      The remaining amount is pending for confirmation.
                    </Text>
                  )}
                </>
              )}
              onEndReached={() => {
                if (selected === 'Upcoming') {
                  UpcomingDoctor(page + 1);
                } else {
                  RecordDoctor(page + 1);
                }
              }}
              onEndReachedThreshold={0.5}
            />

            {loading && <CustomLoader />}
          </View>
        </ScrollView>
        <SwapCards
          card1={'Upcoming'}
          card2={'Record'}
          initialState={selected}
          activeTextColor={'#fff'}
          activeColor={changeColor}
          handlePress={handlePress}
          inActiveTextColor={changeColor}
        />
      </View>
    </Wrapper>
  );
};

export default AppointmentUpcoming;

const styles = StyleSheet.create({
  meditourButton: {
    position: 'absolute',
    top: RF(180),
    left: 0,
    right: 0,
    zIndex: 1,
    marginHorizontal: RF(24),
  },
});
