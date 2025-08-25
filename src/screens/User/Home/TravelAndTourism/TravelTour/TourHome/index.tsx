import {
  View,
  Image,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  CustomLoader,
  EmptyList,
  HeaderCard,
  Text,
  Wrapper,
  TourFlatlist,
  UserHeaderContent,
  CustomHeader,
} from '@components';
import {RF} from '@theme';
import {
  AddRemovedFev,
  getUpcomingTours,
  globalStyles,
  margin,
  navigate,
  rs,
  showToast,
} from '@services';
import {UserBell, appointment, live} from '@assets';
import moment from 'moment';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {getAllTours, getAllUpcoming} from './TourFunction';
import {useDispatch, useSelector} from 'react-redux';
import {setFavorites, setUser} from '@redux';

const TourHome = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [indicator, setIndicator] = useState(false);

  const [dataUpcoming, setDataUpcoming] = useState<any>([]);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const styles = useStyles(isHorizontal);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state.root.user);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([allTours(), allUpcoming()]);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (page > 1) {
      allUpcoming();
    }
  }, [page]);

  useEffect(() => {
    if (user && user?.favourites) {
      dispatch(setFavorites(user?.favourites));
    }
  }, [user, dispatch]);

  const allTours = () => {
    getAllTours({setLoading, setData});
  };
  const allUpcoming = async () => {
    try {
      const res = await getUpcomingTours(page);
      if (res?.data?.nextPage) {
        setNextPage(res?.data?.nextPage);
      }
      if (page > 1) {
        let newArr = dataUpcoming.concat(res?.data?.upcomingSchedules);
        setDataUpcoming(newArr);
      } else {
        setDataUpcoming(res.data?.upcomingSchedules);
      }
    } catch (error) {
    } finally {
      setIndicator(false);
    }
  };

  const addRemovedFvt = (itemId: any) => {
    setLoading(true);
    const params = {
      type: 'tour',
      itemId: itemId,
    };
    AddRemovedFev(params)
      .then((res: any) => {
        dispatch(setUser(res?.data?.user));
        dispatch(setFavorites(res?.data?.user.favourites));
        showToast('success', res?.data?.message, true);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setTimeout(() => {
      allTours();
      allUpcoming();
      setRefreshing(false);
    }, 100);
  };

  const formatDateRange = (startDate: any, endDate: any) => {
    const start = moment(startDate).format('D MMM');
    const end = moment(endDate).format('D MMM YYYY');
    return `${start} - ${end}`;
  };

  const handleScroll = (event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 5;
    if (isCloseToBottom && !indicator) {
      if (nextPage && page < nextPage) {
        setPage(page + 1);
        setIndicator(true);
      }
    }
  };

  const renderFooter = () => {
    return indicator ? (
      <ActivityIndicator size="large" color={colors?.primary} />
    ) : null;
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <CustomHeader
          title={'Tours'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20, padding: rs(16)}}
          onScroll={handleScroll}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[changeColor, changeColor]}
            />
          }
          scrollEventThrottle={16}>
          {/* <View style={styles.viewStyle}>
              <View style={styles.ViewContainer}>
                <Text size={16} SFsemiBold color={colors.blueText}>
                  Suggestion for you
                </Text>
                {data.length > 0 && isHorizontal && (
                  <TouchableOpacity onPress={() => setIsHorizontal(false)}>
                    <Text size={11} SFmedium color={colors.blueText}>
                      View All
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <FlatList
                horizontal={isHorizontal ? true : false}
                scrollEnabled={isHorizontal ? true : false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={data}
                refreshControl={
                  <RefreshControl
                    enabled={true}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    colors={[changeColor, changeColor]}
                  />
                }
                ListEmptyComponent={
                  <EmptyList
                    height
                    description={
                      loading ? 'Loading.....' : 'No Suggestion Available'
                    }
                  />
                }
                renderItem={({item}) => (
                  <TourFlatlist
                    onPress={() => navigate('TourDetails', {item})}
                    item={item}
                    handleFavoritePress={() => addRemovedFvt(item?._id)}
                    width={isHorizontal ? RF(220) : '100%'}
                  />
                )}
              />
            </View> */}
          <View style={[styles.ViewContainer]}>
            <Text size={16} SFsemiBold color={colors.blueText}>
              Upcoming Schedule
            </Text>
            {/* {dataUpcoming.length > 0 && isHorizontal && (
                <TouchableOpacity onPress={() => setIsHorizontal(false)}>
                  <Text size={11} SFmedium color={colors.blueText}>
                    View All
                  </Text>
                </TouchableOpacity>
              )} */}
          </View>
          {dataUpcoming.length === 0 ? (
            <EmptyList
              height
              description={loading ? 'Loading.....' : 'No Schedule Available'}
            />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.row}>
                {dataUpcoming.map((item: any, index: any) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.CardDesign}
                    onPress={() => navigate('TourDetails', {item})}>
                    <View style={globalStyles.row}>
                      <Image
                        source={{uri: item.images[0]}}
                        style={styles.Image1}
                      />
                      <View style={{flex: 1, marginLeft: RF(8)}}>
                        <View style={globalStyles.row}>
                          <Text size={14} SFmedium color={colors.primary}>
                            {item.packageName}
                          </Text>
                        </View>
                        <View style={[globalStyles.rowSimple, margin.top_24]}>
                          <Image
                            source={appointment}
                            style={styles.appointStyle}
                          />
                          <Text
                            size={12}
                            SFregular
                            color={colors.primary}
                            style={{marginLeft: RF(8)}}>
                            {formatDateRange(item.departDate, item.returnDate)}
                          </Text>
                        </View>
                        <View style={[globalStyles.rowSimple, margin.top_4]}>
                          <Image source={live} style={styles.ImageView} />
                          <Text
                            size={14}
                            SFregular
                            color={colors.primary}
                            style={{marginLeft: RF(8)}}>
                            {item.from}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              {renderFooter()}
            </ScrollView>
          )}
        </ScrollView>
        {loading && <CustomLoader />}
      </View>
    </Wrapper>
  );
};

export default TourHome;
