import {
  View,
  Image,
  FlatList,
  Pressable,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {RF} from '@theme';
import React, {useEffect, useState} from 'react';
import {
  margin,
  navigate,
  globalStyles,
  Favorite_RentACar,
  getAll_CarsDetails,
  GetAllRentACarReview_Rating,
  AddRemovedFev,
  showToast,
  rs,
} from '@services';
import {
  Text,
  Wrapper,
  EmptyList,
  HeaderCard,
  CarFlatList,
  CustomLoader,
  UserHeaderContent,
  CustomHeader,
} from '@components';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {
  backIcon,
  UserBell,
  location,
  fill_favourite,
  Heart_Outlined,
} from '@assets';
import {setFavorites, setUser} from '@redux';
import {AirbnbRating} from 'react-native-ratings';
import {useDispatch, useSelector} from 'react-redux';

const CarList = ({navigation, route}: any) => {
  const {item} = route.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles('');
  const dispatch: any = useDispatch();
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const {favorites, user} = useSelector((state: any) => state.root.user);
  const ratingCompleted = (rating: any) => {};
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState<any>([]);
  const [cars, setCars] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [allCars, setAllCars] = useState<any>([]);
  const [ratings, setRatings] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [totalRating, setTotalRating] = useState<any>([]);
  const [favRentACar, setFavRentACar] = useState(false);
  const [isHorizontalCars, setIsHorizontalCars] = useState(true);
  useEffect(() => {
    if (user && user.favourites) {
      dispatch(setFavorites(user.favourites));
    }
  }, [user, dispatch]);
  useEffect(() => {
    setLoading(true);
    getTopRentalCars_Details();
    getReviewRent();
  }, []);

  const getTopRentalCars_Details = () => {
    let params = {
      id: item?.rentACar?._id,
    };
    getAll_CarsDetails(params)
      .then((res: any) => {
        setData([res?.data?.rentACar]);
        setTotalRating(res?.data);
        setAllCars(res?.data?.topRentalVehicles);
        setCars(res?.data?.allVehicles);
        let result = user?.favouriteRentACar?.includes(
          res?.data?.rentACar?._id,
        );
        if (result) {
          setFavRentACar(true);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const getReviewRent = () => {
    let params = {
      vendorId: item?.rentACar?._id,
    };
    GetAllRentACarReview_Rating(params)
      .then((res: any) => {
        setRatings(res?.data?.reviewsWithTimeAgo);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const onFavorite_RentACar = () => {
    setLoading(true);
    const params = {
      type: 'rent a car',
      itemId: item?.rentACar?._id,
    };
    AddRemovedFev(params)
      .then((res: any) => {
        dispatch(setUser(res?.data?.user));
        dispatch(setFavorites(res?.data?.user.favourites));
        showToast('success', res?.data?.message, true);
      })
      .catch((err: any) => {
        showToast('Error', err, true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  const handleOpen = () => {
    setIsHorizontal(false);
    navigate('ExpandedCars', {
      allCars: allCars,
      rentACarName: item?.rentACar.name,
    });
  };

  const handleOpenCars = () => {
    setIsHorizontalCars(false);
    navigate('AllCars', {cars: cars, rentACarName: item?.rentACar?.name});
  };

  const handleOpenReviews = () => {
    navigate('Reviews', {
      ratings: ratings,
      rentACarName: item?.rentACar.name,
      AvrgRating: item?.averageRating ? item?.averageRating : 0,
      AverageCount: totalRating?.ratingCount,
    });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'dark-content'}>
      <CustomHeader
        title={item?.rentACar?.name}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: RF(16),
            marginBottom: RF(77),
            paddingHorizontal: rs(16),
          }}>
          <FlatList
            data={data}
            scrollEnabled={false}
            refreshControl={
              <RefreshControl
                enabled={true}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[changeColor, changeColor]}
              />
            }
            renderItem={({item}: any) => {
              const isFavorite = favorites?.some(
                (fav: any) =>
                  fav.itemId === item?._id && fav.favModel === 'rent a car',
              );
              return (
                <TouchableOpacity
                  style={{
                    borderRadius: 8,
                    borderWidth: 0.5,
                    padding: rs(8),
                  }}>
                  <View style={globalStyles.row}>
                    <Image
                      source={{uri: item?.logo}}
                      style={{
                        width: RF(78),
                        height: RF(75),
                        resizeMode: 'contain',
                      }}
                    />
                    <View style={{flex: 1}}>
                      <View style={globalStyles.row}>
                        <Text size={12} SFmedium color={colors.primary}>
                          {item?.name}
                        </Text>
                        <Pressable onPress={onFavorite_RentACar}>
                          <Image
                            source={
                              isFavorite ? fill_favourite : Heart_Outlined
                            }
                            style={{
                              width: RF(16),
                              height: RF(16),
                              tintColor: changeColor,
                            }}
                          />
                        </Pressable>
                      </View>
                      <View style={globalStyles.rowSimple}>
                        <Image
                          source={location}
                          style={{
                            width: RF(16),
                            height: RF(16),
                            marginLeft: RF(-2),
                            tintColor: colors.primary,
                          }}
                        />
                        <Text size={11} SFregular color={colors.primary}>
                          {item?.location?.address}
                        </Text>
                      </View>
                      <View style={[globalStyles.row, margin.top_4]}>
                        <AirbnbRating
                          size={15}
                          isDisabled={true}
                          showRating={false}
                          selectedColor={changeColor}
                          onFinishRating={ratingCompleted}
                          defaultRating={
                            item?.averageRating ? item?.averageRating : 0
                          }
                        />
                        <Text
                          size={12}
                          SFregular
                          color={'#7d7d7d'}
                          style={margin.left_16}>
                          {item?.averageRating ? item?.averageRating : 0}
                        </Text>
                        <Text size={10} SFregular color={colors.primary}>
                          {`(${totalRating?.ratingCount} reviews)`}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text
                    size={12}
                    SFlight
                    color={colors.primary}
                    style={{marginLeft: RF(8), marginTop: RF(8)}}>
                    {item?.description}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <View>
            <View style={styles.ViewContainer}>
              <Text size={18} SFsemiBold color={colors.blueText}>
                Top Rental Cars
              </Text>
              {/* {isHorizontal && ( */}
              <TouchableOpacity onPress={handleOpen}>
                <Text size={12} SFregular color={colors.blueText}>
                  View All
                </Text>
              </TouchableOpacity>
              {/* )} */}
            </View>
            <View style={{marginLeft: rs(-15), marginRight: -30}}>
              <FlatList
                horizontal={true}
                // scrollEnabled={isHorizontal ? true : false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: RF(16)}}
                data={allCars}
                refreshControl={
                  <RefreshControl
                    enabled={true}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    colors={[changeColor, changeColor]}
                  />
                }
                ListEmptyComponent={
                  data || allCars ? null : (
                    <EmptyList description={'No data found'} />
                  )
                }
                renderItem={({item}) => (
                  <CarFlatList
                    onPress={() => navigate('CarDetails', {item: item})}
                    item={item}
                    width={RF(207)}
                    Bgclr={'#EBFAFC'}
                  />
                )}
              />
            </View>
          </View>
          <View>
            <View style={styles.ViewContainer}>
              <Text size={18} SFsemiBold color={colors.blueText}>
                All Cars
              </Text>
              {/* {isHorizontalCars && ( */}
              <TouchableOpacity onPress={handleOpenCars}>
                <Text size={12} SFregular color={colors.blueText}>
                  View All
                </Text>
              </TouchableOpacity>
              {/* )} */}
            </View>
            <View style={{marginLeft: rs(-15), marginRight: -30}}>
              <FlatList
                horizontal={true}
                // scrollEnabled={isHorizontalCars ? true : false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: RF(16)}}
                data={cars}
                renderItem={({item}) => {
                  return (
                    <CarFlatList
                      onPress={() => navigate('CarDetails', {item: item})}
                      item={item}
                      width={RF(200)}
                      Bgclr={'#fff'}
                    />
                  );
                }}
              />
            </View>
          </View>
          <View style={[globalStyles.row, margin.top_8]}>
            <Text size={18} color={colors.blueText} SFsemiBold>
              Reviews
            </Text>
            <TouchableOpacity onPress={handleOpenReviews}>
              <Text size={14} color={colors.blueText} SFregular>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            scrollEnabled={false}
            data={ratings}
            renderItem={({item}) => (
              <View
                style={{
                  elevation: 0.4,
                  borderRadius: RF(8),
                  marginVertical: RF(4),
                  marginHorizontal: RF(2),
                  backgroundColor: '#fff',
                }}>
                <View style={{marginHorizontal: RF(16), marginVertical: RF(8)}}>
                  <Text size={14} SFmedium color={colors.primary}>
                    {item?.userName}
                  </Text>
                  <Text size={12} SFregular color={colors.primary}>
                    {item?.timeAgo}
                  </Text>
                  <Text size={12} SFlight color={colors.primary}>
                    {item?.review}
                  </Text>
                  <View
                    style={[
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: RF(4),
                        gap: RF(41),
                      },
                    ]}>
                    <AirbnbRating
                      size={24}
                      showRating={false}
                      isDisabled={true}
                      selectedColor={changeColor}
                      onFinishRating={ratingCompleted}
                      defaultRating={item?.rating ? item?.rating : 0}
                    />
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};
export default CarList;
