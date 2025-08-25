import {
  Text,
  Wrapper,
  EmptyList,
  HeaderCard,
  CustomLoader,
  UserHeaderContent,
  CustomHeader,
} from '@components';
import moment from 'moment';
import {RF, getColorCode} from '@theme';
import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {getNotifications, navigationRef, rs, rv} from '@services';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {mediLogo} from '@assets';
import {useTheme} from '@react-navigation/native';

const Notifications = ({navigation, route}: any) => {
  // const {item} = route?.params;
  const {id_noti, colorCode} = getColorCode();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [indicator, setIndicator] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);

  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const {user} = useSelector((state: any) => state.root.user);

  useEffect(() => {
    fetchNotifications();
  }, [page]);

  const fetchNotifications = () => {
    indicator == false && refreshing == false && setLoading(true);
    let id = id_noti;

    getNotifications(id, page)
      .then((res: any) => {
        if (res?.data?.nextPage) {
          setNextPage(res?.data?.nextPage);
        }
        if (page > 1) {
          let newArr = data.concat(res?.data?.notifications);
          setData(newArr);
        } else {
          setData(res?.data?.notifications);
        }
      })
      .catch(err => {})
      .finally(() => setLoading(false));
  };

  const fetchNextPage = () => {
    if (nextPage && page < nextPage) {
      setPage(page + 1);
      setIndicator(true);
      setTimeout(() => {
        setIndicator(false);
      }, 2000);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const onPress = () => {
    navigationRef.current?.goBack();
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={'Notifications'}
        leftIcon
        titleColor={colors.white}
        notify
      />
      <View style={styles.subContainer}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          style={styles.top}
          renderItem={({item}: any) => {
            const formatRelativeTime = (date: any) => {
              const duration = moment.duration(moment().diff(date));
              if (duration.asMinutes() < 60) {
                return `${Math.floor(duration.asMinutes())}m ago`;
              } else if (duration.asHours() < 24) {
                return `${Math.floor(duration.asHours())}h ago`;
              } else {
                return `${Math.floor(duration.asDays())}d ago`;
              }
            };

            return (
              <View style={styles.view}>
                <View style={styles.row}>
                  <View style={styles.vImg}>
                    {item?.senderId?.doctorImage || item?.senderId?.logo ? (
                      <Image
                        style={styles.img}
                        source={
                          item?.senderModelType === 'Pharmacy'
                            ? mediLogo
                            : {
                                uri:
                                  item?.senderId?.doctorImage ||
                                  item?.senderId?.logo,
                              }
                        }
                      />
                    ) : (
                      <Image style={styles.img} source={mediLogo} />
                    )}
                  </View>

                  <View style={styles.ml}>
                    <Text
                      size={14}
                      numberOfLines={1}
                      style={{
                        width: RF(150),
                        fontWeight: '700',
                        lineHeight: rv(20),
                      }}>
                      {item?.senderId?.name}
                    </Text>
                    <Text
                      size={10}
                      SFregular
                      numberOfLines={2}
                      style={[styles.text, {lineHeight: rv(14)}]}>
                      {item?.message}
                    </Text>
                  </View>
                  <Text
                    size={10}
                    SFregular
                    numberOfLines={1}
                    style={{width: RF(50), marginLeft: RF(5)}}>
                    {formatRelativeTime(item?.createdAt)}
                  </Text>
                </View>
                <View style={styles.line} />
              </View>
            );
          }}
          ListEmptyComponent={!loading ? <EmptyList /> : null}
          ListFooterComponent={
            <ActivityIndicator size={'small'} animating={indicator} />
          }
          onEndReached={fetchNextPage}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[changeColor, changeColor]}
            />
          }
        />
      </View>

      {loading && <CustomLoader />}
    </View>
  );
};

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {flex: 1},
    subContainer: {
      flexGrow: 1,
      paddingHorizontal: rs(16),
      backgroundColor: colors.background,
    },

    row: {flexDirection: 'row'},
    text: {width: RF(190)},
    ml: {marginLeft: RF(10)},
    view: {
      marginVertical: RF(5),
      flex: 1,
    },
    top: {marginTop: RF(20), marginBottom: RF(70)},
    btm: {
      marginBottom: RF(100),
    },
    vImg: {
      borderRadius: RF(100),
      width: RF(48),
      height: RF(48),
      elevation: 2,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    line: {
      height: 1,
      backgroundColor: '#DFD8E2',
      marginTop: RF(10),
    },
    img: {
      width: RF(48),
      height: RF(48),
      borderRadius: RF(100),
    },
  });

export default Notifications;
