import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {
  AppButton,
  CheckBox,
  CustomHeader,
  CustomLoader,
  CustomModalize,
  EmptyList,
  HeaderCard,
  Line,
  PropertiesCard,
  Text,
  Wrapper,
} from '@components';
import {map, sortIcon, UserBell} from '@assets';
import {addAllSearchHotel, margin, navigate, rs, rv} from '@services';
import {globalStyle, RF} from '@theme';
import {Modalize} from 'react-native-modalize';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';

const SortCheckBoxData = [
  {id: 1, title: 'Price (High to Low)'},
  {id: 2, title: 'Price (Low to High)'},
];

const ItemDetail = ({navigation, route}: any) => {
  const {
    selectedStartDate,
    selectedEndDate,
    roomValue,
    selected,
    adultValue,
    selectCity,
  } = route.params;
  //
  const modalizeRefer = useRef<Modalize>(null);
  const theme: any = useTheme();
  const colors = theme.colors;
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sortedData, setSortedData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [indicator, setIndicator] = useState(false);

  const {hotelDetail} = useSelector((state: any) => state?.root?.b2b);
  //
  const [openModalCheckbox, setOpenModalCheckbox] = useState<any>('');
  const formattedDate = moment(selectedStartDate).format('ddd, MMM D');
  const formattedDateEnd = moment(selectedEndDate).format('ddd, MMM D');
  const [selectedSortOption, setSelectedSortOption] = useState<string>('');
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const onOpenCheckbox = (text: any) => {
    setOpenModalCheckbox(text);
    text && modalizeRefer.current?.open();
  };

  const onCloseModalize = (text: any) => {
    text && modalizeRefer.current?.close();
  };

  const handleSelect = (item: any) => {
    setSelectedSortOption(item.title);
  };

  useEffect(() => {
    addFilterSearch();
  }, [page]);

  const fetchNextPage = () => {
    if (nextPage && page < nextPage) {
      setPage(page + 1);
      setIndicator(true);
      setTimeout(() => {
        setIndicator(false);
      }, 2000);
    }
  };

  useEffect(() => {
    sortData();
  }, [selectedSortOption, data]);

  const addFilterSearch = () => {
    setLoading(true);
    const paramsData = {
      page: page,
    };
    const params = {
      serviceType: selected.toLowerCase(),
      city: selectCity,
      rooms: roomValue,
      adults: adultValue,
      filters: {
        sort:
          selectedSortOption === 'Price (High to Low)'
            ? 'descending'
            : 'ascending',
      },
    };
    addAllSearchHotel(paramsData, params)
      .then((res: any) => {
        if (res?.data?.nextPage) {
          setNextPage(res?.data?.nextPage);
        }
        if (page > 1) {
          let newArr = data.concat(res?.data?.hotels);
          setData(newArr);
        } else {
          setData(res.data.hotels);
        }

        // setData(res?.data?.hotels);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const sortData = () => {
    let sorted = [...data];

    if (selectedSortOption === 'Price (High to Low)') {
      sorted.sort(
        (a: any, b: any) =>
          b.rooms?.[0].pricePerNight - a.rooms?.[0].pricePerNight,
      );
    } else if (selectedSortOption === 'Price (Low to High)') {
      sorted.sort(
        (a: any, b: any) =>
          a.rooms?.[0].pricePerNight - b.rooms?.[0].pricePerNight,
      );
    }

    setSortedData(sorted);
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      addFilterSearch();
      setRefreshing(false);
    }, 3000);
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.container}>
        <CustomHeader
          title={`${formattedDate}-${formattedDateEnd}`}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <View style={styles.rowSimple}>
          <TouchableOpacity
            onPress={() => onOpenCheckbox('checkboxcontent')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={sortIcon} style={styles.icon} />
            <Text SFregular color={colors?.primary}>
              Sort
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() =>
              navigate('HotelMapScreen', {
                item: sortedData,
                selected: selected,
              })
            }>
            <Image source={map} style={styles.icon} />
            <Text SFregular color={colors?.primary}>
              Map
            </Text>
          </TouchableOpacity>
        </View>
        {/* <ScrollView> */}
        {/* <View style={styles.content}> */}
        <Text
          size={16}
          SFmedium
          color={'#00276D'}
          style={{paddingHorizontal: rs(16)}}>
          Properties {sortedData?.length}{' '}
        </Text>
        <FlatList
          // style={{borderWidth: 1, backgroundColor: 'blue'}}
          contentContainerStyle={{
            padding: rs(16),
            paddingBottom: rv(100),
          }}
          // scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={sortedData}
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
              colors={[changeColor, changeColor]}
            />
          }
          ListEmptyComponent={
            loading ? null : <EmptyList description={'No data found'} />
          }
          renderItem={({item}) => {
            return selected === 'Hotel' ? (
              <>
                <PropertiesCard
                  item={item}
                  name={item?.hotelId?.name}
                  source={{uri: item?.hotelId?.logo}}
                  locationHotel={item?.location?.address}
                  PriceHotel={item?.minRoomPrice}
                  onPress={() =>
                    navigate('HotelDetails', {
                      item: item,
                    })
                  }
                />
              </>
            ) : selected === 'Apartment' ? (
              <>
                <PropertiesCard
                  item={item}
                  name={item?.propertyName}
                  source={{uri: item?.propertyphoto?.[0]}}
                  locationHotel={item?.hotelId?.location?.address}
                  PriceHotel={item?.minApartmentPrice}
                  onPress={() =>
                    navigate('HotelDetails', {
                      item: item,
                    })
                  }
                />
              </>
            ) : (
              <>
                <PropertiesCard
                  item={item}
                  name={item?.propertyName}
                  source={{uri: item?.propertyphoto?.[0]}}
                  locationHotel={`${item?.location?.address}-${item?.location?.city}`}
                  PriceHotel={item?.minHomePrice}
                  onPress={() =>
                    navigate('HotelDetails', {
                      item: item,
                    })
                  }
                />
              </>
            );
          }}
        />
        {/* </View> */}
        {/* </ScrollView> */}

        <CustomModalize ref={modalizeRefer} lineColor={'#2D6977'} height={380}>
          {openModalCheckbox === 'checkboxcontent' && (
            <View>
              <Text size={18} SFmedium color={'#00276D'}>
                Sort By
              </Text>
              <View style={{marginTop: RF(16)}}>
                <FlatList
                  scrollEnabled={false}
                  data={SortCheckBoxData}
                  renderItem={({item}) => (
                    <View>
                      <CheckBox
                        active
                        rowStyle={[globalStyle.row, margin?.bottom_8]}
                        colorMid={'#00276D'}
                        title={item?.title}
                        selected={selectedSortOption}
                        textColor={'#00276D'}
                        onPress={() => handleSelect(item)}
                      />
                      {/* <Line /> */}
                    </View>
                  )}
                />
                <AppButton
                  title="Apply"
                  m_Vertical={RF(32)}
                  onPress={() => {
                    addFilterSearch();
                    onCloseModalize('checkboxcontent');
                  }}
                />
              </View>
            </View>
          )}
        </CustomModalize>
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FAF9F6'},
  // content: {marginHorizontal: rs(16), paddingBottom: RF(80)},
  icon: {
    height: RF(18),
    width: RF(18),
    resizeMode: 'contain',
    marginRight: RF(8),
    tintColor: '#001F57',
  },
  rowSimple: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    margin: rs(16),
  },
});
