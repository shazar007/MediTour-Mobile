import {
  View,
  FlatList,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Text,
  EmptyList,
  HeaderCard,
  NearLocation,
  CustomModalize,
  UserSelectModal,
  UserHeaderContent,
  CustomLoader,
  LocationModal,
  CustomHeader,
  CustomFlatTab,
  SearchInput,
  LoginReminder,
} from '@components';
import {RF} from '@theme';
import useStyles from './styles';
import {useSelector} from 'react-redux';
import {padding, navigate, customTab, rs, GAP, PADDING} from '@services';
import {Modalize} from 'react-native-modalize';
import {useTheme} from '@react-navigation/native';
import {filterList, getList} from './functionProps';
import React, {useEffect, useRef, useState} from 'react';

interface Props {
  type?: any;
}
const custom = [
  {
    card1: 'Hotels',
    move: 'UserTravelAndTourism',
  },
  {
    card1: 'Travel Agency',
    move: 'MainHTR',
  },
  {
    card1: 'Rent a Car',
  },
];
const GetNearbyAll = ({type}: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [data, setData] = useState<any>([]);
  const modalizeRef = useRef<Modalize>(null);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState<any>();
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState<any>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState<number | null>(0);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [indicator, setIndicator] = useState(false);
  const {location, user} = useSelector((state: any) => state.root.user);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const [selected, setSelected] = useState('Rent a Car');
  const [showBy, setShowBy] = useState('All');
  const getListParams = {
    type: type,
    searchText: searchText,
    location: location,
    setData: setData,
    setLoading: setLoading,
    setDistance: setDistance,
    showBy: showBy,
    page: page,
    data: data,
    setNextPage: setNextPage,
    setIndicator: setIndicator,
  };

  useEffect(() => {
    setLoading(true);
    getList(getListParams);
  }, [location, showBy]);
  useEffect(() => {
    getList(getListParams);
  }, [page, showBy]);

  const toggleSearch = () => {
    setToggle(true);
  };

  const onOpenModalize = () => {
    modalizeRef.current?.open();
  };

  const onPressPharm = (item: any) => {
    if (user === null) {
      setModalVisible(true);
    } else {
      navigate(type == 'RentCar' ? 'CarList' : 'DetailsScreen', {
        item: item,
        type: type,
      });
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getList(getListParams);
      setRefreshing(false);
    }, 3000);
  };

  const onSubmitEditing = () => {
    getList(getListParams);
  };

  const onChangeText = (val: any) => {
    setSearchText(val);
    if (val == '') {
      getList(getListParams);
    }
  };

  const onEndEditing = () => {
    setTimeout(() => {
      getList(getListParams);
    }, 2000);
  };
  const closeLocationModal = () => {
    modalizeRef.current?.close();
  };

  const filterPharmacy = () => {
    filterList(setLoading, rating, location, distance, setData, modalizeRef);
  };
  const handleDropDown = (item: any) => {
    setSelected(item);
  };

  const handleNextPage = async () => {
    if (nextPage && page < nextPage) {
      setPage(page + 1);
      setIndicator(true);
      setTimeout(() => {
        setIndicator(false);
      }, 2000);
    }
  };
  const handleShowList = (item: any) => {
    setShowBy(item);
    setPage(1);
  };
  return (
    <View style={styles.main}>
      <CustomHeader
        title={type == 'pharmacy' ? 'Pharmacy' : 'Rent A Car'}
        leftIcon
        titleColor={colors.white}
        notify
      />
      <View
        style={{
          backgroundColor: colors.background,
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: colors?.white,
            gap: GAP?._8,
            padding: PADDING._16,
            paddingBottom: rs(8),
            borderBottomWidth: 1,
            elevation: 2,

            borderColor: colors.light_grey,
          }}>
          <SearchInput
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
          />

          {type == 'RentCar' && (
            <CustomFlatTab
              data={customTab}
              initialState={showBy}
              handlePress={handleShowList}
            />
          )}
        </View>

        <FlatList
          data={data}
          contentContainerStyle={{
            paddingBottom: RF(100),
            padding: PADDING?._16,
            gap: rs(16),
          }}
          onEndReachedThreshold={0.5}
          onEndReached={handleNextPage}
          ListFooterComponent={
            indicator ? (
              <ActivityIndicator size="small" color={colors?.primary} />
            ) : null
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
          renderItem={({item}: any) => {
            return (
              <NearLocation
                item={item}
                onPress={onPressPharm}
                uri={type == 'RentCar' ? item?.rentACar?.logo : item?.logo}
                title={type == 'RentCar' ? item?.rentACar?.name : item?.name}
                DescriptionText
                description={
                  type == 'RentCar' ? `${item?.distance} Km away from you` : ''
                }
              />
            );
          }}
        />
      </View>

      {/* </ScrollView> */}
      {modalizeRef && (
        <CustomModalize
          ref={modalizeRef}
          height={toggle == true ? RF(330) : RF(700)}
          childStyle={padding.Horizontal_24}>
          {toggle == true ? (
            <UserSelectModal
              rating={rating}
              onClose={filterPharmacy}
              setDistance={setDistance}
              setRating={setRating}
            />
          ) : (
            <LocationModal onClose={closeLocationModal} />
          )}
        </CustomModalize>
      )}
      <Modal transparent animationType="slide" visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={{flexGrow: 1}}>
            <LoginReminder />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {loading && <CustomLoader />}
    </View>
  );
};

export default GetNearbyAll;

{
  /* <ScrollView
        nestedScrollEnabled={true}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}> */
}
{
  /* {type == 'RentCar' && (
          <View style={{marginTop: RF(16), marginHorizontal: RF(20)}}>
            <CustomFlatTab
              data={custom}
              initialState={selected}
              handlePress={handleDropDown}
              contentContainerStyle={{
                justifyContent: 'space-between',
                width: '100%',
              }}
            />
          </View>
        )} */
}

{
  /* <View style={[styles.row, { marginHorizontal: RF(24), marginTop: RF(16) }]}>
        <Text size={18} SFmedium color={colors.blueText}>
          {distance ? 'Under the Area of ' : 'Near Your Location'}
        </Text>
        {distance && (
          <Text size={18} SFmedium color={colors.blueText}>
            {distance.toString()} Km
          </Text>
        )}
      </View> */
}

{
  /* <HeaderCard
        twoInRow
        plusIcon
        numberOfIcons={'3'}
        toggle={toggle}
        setToggle={setToggle}>
        <UserHeaderContent
          searhIconTrue
          onlySearchIcon={type == 'RentCar' ? false : true}
          toggle={toggle}
          showFilter={type == 'RentCar' ? false : true}
          onPressLocation={onOpenModalize}
          onPress={toggleSearch}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
          onOpenModalize={onOpenModalize}
          onSubmitEditing={onSubmitEditing}
        />
      </HeaderCard> */
}
