import {
  Text,
  EmptyList,
  HeaderCard,
  NearLocation,
  CustomLoader,
  CustomModalize,
  UserSelectModal,
  UserHeaderContent,
  LocationModal,
  CustomFlatTab,
  CustomHeader,
  SearchInput,
} from '@components';
import {RF} from '@theme';
import {useSelector} from 'react-redux';
import {Modalize} from 'react-native-modalize';
import {useTheme} from '@react-navigation/native';
import {ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  navigate,
  getFilter_Labs,
  getUser_Laboratory,
  customTab,
  rs,
  rv,
  GAP,
  PADDING,
} from '@services';

const UserLaboratory = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [data, setData] = useState<any>([]);
  const modalizeRef = useRef<Modalize>(null);
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState<any>('');
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState<any>('');
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [showBy, setShowBy] = useState('All');
  const [indicator, setIndicator] = useState(false);
  const {selectedAddress} = useSelector((state: any) => state.root.user);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  useEffect(() => {
    setLoading(true);
    getList();
  }, [selectedAddress, showBy]);

  useEffect(() => {
    getList();
  }, [page, showBy]);

  const getList = () => {
    let params = {
      page: page,
      search: searchText,
      lat: showBy == 'Nearby' ? selectedAddress?.lat : '',
      long: showBy == 'Nearby' ? selectedAddress?.lng : '',
      filter: showBy.toLowerCase(),
    };

    getUser_Laboratory(params)
      .then((res: any) => {
        //
        setDistance('');
        if (res?.data?.nextPage) {
          setNextPage(res?.data?.nextPage);
        }
        if (page > 1) {
          let newArr = data.concat(res?.data?.labs);
          setData(newArr);
        } else {
          setData(res.data.labs);
        }
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPage(1);
      setNextPage(null);
      getList();
      setRefreshing(false);
    }, 3000);
  };
  const toggleSearch = () => {
    setToggle(true);
  };
  const onOpenModalize = () => {
    modalizeRef.current?.open();
  };
  const onCloseModalize = () => {
    setLoading(true);
    let params = {
      minRating: 1,
      lat: selectedAddress.lat,
      long: selectedAddress.lng,
      radius: distance * 1000,
      page: 1,
    };
    getFilter_Labs(params)
      .then((res: any) => {
        setData(res?.data?.labs);
        modalizeRef.current?.close();
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };
  const selectCheckBox = (title: any) => {
    setSelected(title);
  };
  const onPressLab = (item: any) => {
    navigate('DetailsScreen', {item: item, type: 'lab'});
  };
  const onSubmitEditing = () => {
    getList();
  };
  const onChangeText = (val: any) => {
    setSearchText(val);
  };

  const onEndEditing = () => {
    // setTimeout(() => {
    //   getList();
    // }, 2000);
  };

  useEffect(() => {
    if (searchText == '') {
      getList();
    }
  }, [searchText]);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
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
  const handleShowList = (item: any) => {
    setShowBy(item);
    setPage(1);
  };
  return (
    <View style={styles.container}>
      <CustomHeader
        title={'Laboratory'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <View
        style={{
          gap: GAP?._8,
          padding: PADDING._16,
          paddingBottom: rs(8),
        }}>
        <SearchInput
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
        <CustomFlatTab
          data={customTab}
          initialState={showBy}
          handlePress={handleShowList}
        />
      </View>
      <FlatList
        data={data}
        contentContainerStyle={styles?.innerContainer}
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
          return (
            <NearLocation
              item={item}
              uri={item?.logo}
              title={item?.name}
              onPress={onPressLab}
            />
          );
        }}
      />

      <CustomModalize ref={modalizeRef} height={700}>
        <LocationModal onClose={onClose} />
      </CustomModalize>

      {loading && <CustomLoader />}
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    padding: rs(16),
    paddingBottom: RF(120),
    gap: rs(16),
  },
  container: {flex: 1, backgroundColor: '#FAF9F6'},
});

export default UserLaboratory;

//......................../.......\..................
// ....................../..Spare..\.................

{
  /* <CustomModalize
        ref={modalizeRef}
        height={RF(330)}
        childStyle={{paddingHorizontal: 24}}>
        <UserSelectModal
          rating={rating}
          setRating={setRating}
          onClose={onCloseModalize}
          setDistance={setDistance}
          selectCheckBox={selectCheckBox}
        />
      </CustomModalize> */
}

{
  /* {!data && (
            <View style={globalStyles.flexCenter}>
              <Text>No Labs Found</Text>
            </View>
          )} */
}
