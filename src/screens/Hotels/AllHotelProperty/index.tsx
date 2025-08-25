import {
  AppButton,
  CustomFlatTab,
  CustomHeader,
  CustomLoader,
  EmptyList,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {
  getAllBNB,
  getAllHomesHotel,
  getAllHotelApart,
  navigate,
  rv,
} from '@services';
import {RF} from '@theme';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useSelector} from 'react-redux';

const HotelCard = ({
  name,
  source,
  location,
  handleNext,
}: {
  item?: any;
  name?: any;
  source?: any;
  location?: any;
  handleNext?: any;
}) => (
  <TouchableOpacity style={styles.card} onPress={handleNext}>
    <Image
      source={{
        uri:
          source ||
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
      }}
      style={styles.image}
    />
    <View style={styles.ContentDetails}>
      <Text style={styles.hotelName} size={14} SFmedium color={'#00276D'}>
        {name}
      </Text>
    </View>
    <Text size={14} SFmedium color={'#00276D'} style={styles.hotelAddress}>
      {location}
    </Text>
  </TouchableOpacity>
);

const drOptions = [
  {
    title: 'B&B',
  },
  {
    title: 'Apartment',
  },
  {
    title: 'Home',
  },
];

const AllHotelProperty = () => {
  const [data, setData] = useState<any>([]);
  const {B2B} = useSelector((state: any) => state.root.b2b);
  const lab = B2B?.hotel;
  const [response, setResponse] = useState('B&B');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (response == 'B&B') {
      getAllBnb();
    } else if (response == 'Apartment') {
      getApart();
    } else if (response == 'Home') {
      getAllHomes();
    }
  }, [response]);

  const getAllBnb = (pageNumber = 1) => {
    setLoading(true);
    let params = {
      page: pageNumber,
    };
    getAllBNB(params)
      .then((res: any) => {
        setData((prevData: any) =>
          pageNumber === 1 ? res.data.bnbs : [...prevData, ...res.data.bnbs],
        );
        setPage(pageNumber);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setIsLoadingMore(false);
      });
  };

  const getApart = (pageNumber = 1) => {
    setLoading(true);
    const params = {
      page: pageNumber,
    };
    getAllHotelApart(params)
      .then((res: any) => {
        setData((prevData: any) =>
          pageNumber === 1
            ? res.data.appartments
            : [...prevData, ...res.data.appartments],
        );
        setPage(pageNumber);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setIsLoadingMore(false);
      });
  };

  const getAllHomes = (pageNumber = 1) => {
    setLoading(true);
    const params = {
      page: pageNumber,
    };
    getAllHomesHotel(params)
      .then((res: any) => {
        setData((prevData: any) =>
          pageNumber === 1 ? res.data.homes : [...prevData, ...res.data.homes],
        );
        setPage(pageNumber);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setIsLoadingMore(false);
      });
  };

  const handleItemPress = (item: any) => {
    setResponse(item.title);
    setPage(1);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      if (response == 'B&B') {
        getAllBnb(1);
      } else if (response == 'Apartment') {
        getApart(1);
      } else if (response == 'Home') {
        getAllHomes(1);
      }
      setRefreshing(false);
    }, 100);
  };

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      if (response == 'B&B') {
        getAllBnb(nextPage);
      } else if (response == 'Apartment') {
        getApart(nextPage);
      } else if (response == 'Home') {
        getAllHomes(nextPage);
      }
    }
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader title={response} leftIcon titleColor={'#fff'} notify />
        <View style={{paddingLeft: rv(16), marginTop: rv(8)}}>
          <CustomFlatTab
            data={drOptions}
            initialState={response}
            handlePress={handleItemPress}
          />
        </View>

        {/* <HeaderCard
          numberOfIcons={'2'}
          notify
          cardColor={'#0D47A1'}
          title={`Hi ${lab?.ownerFirstName}`}>
          <UserHeaderContent
            options={drOptions}
            drop
            selected={response}
            ScreenTitle={response}
            handleDropDown={handleItemPress}
          />
        </HeaderCard> */}

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: RF(20),
            marginHorizontal: RF(20),
            marginTop: RF(16),
          }}
          data={data}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
          ListEmptyComponent={
            <EmptyList
              description={loading ? 'Loading.....' : 'No data found'}
            />
          }
          renderItem={({item}) => (
            <HotelCard
              item={item}
              source={
                response === 'B&B'
                  ? item?.bnb?.propertyphoto?.[0]
                  : item?.propertyphoto?.[0]
              }
              name={
                response === 'B&B'
                  ? item?.bnb?.rooms?.[0]?.roomName
                  : item?.propertyName
              }
              location={
                response === 'B&B'
                  ? item?.bnb?.hotelId?.location?.address
                  : item?.location?.address
              }
              handleNext={() =>
                navigate('SinglePropertyDetails', {
                  item: item,
                  response: response,
                })
              }
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
        <View
          style={{
            position: 'absolute',
            zIndex: 100,
            bottom: 30,
            width: RF(150),
            right: 0,
          }}>
          <AppButton title="Add More" onPress={() => navigate('PropertyBnb')} />
        </View>
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

const styles: any = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  Details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: RF(120),
    borderRadius: RF(8),
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  hotelName: {
    width: RF(150),
  },
  hotelInfo: {
    fontSize: 14,
  },
  hotelAddress: {
    color: '#666',
  },
  ContentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default AllHotelProperty;
