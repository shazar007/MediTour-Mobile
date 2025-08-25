import {
  Image,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CustomHeader,
  CustomLoader,
  EmptyList,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {RF} from '@theme';
import useStyles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import {favourite, fill_favourite} from '@assets';
import LinearGradient from 'react-native-linear-gradient';
import {RefreshControl} from 'react-native-gesture-handler';
import {AddRemovedFev, getPackages, navigate, showToast} from '@services';
import {setFavorites, setUser} from '@redux';

const UserDonationPak = ({route}: any) => {
  const {item} = route.params;
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const styles = useStyles();
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState<any>(false);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const colors = theme.colors;
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const {user, favorites} = useSelector((state: any) => state.root.user);
  useEffect(() => {
    PackagesCompany();
  }, []);
  useEffect(() => {
    if (user && user.favourites) {
      dispatch(setFavorites(user.favourites));
    }
  }, [user, dispatch]);
  const PackagesCompany = () => {
    setLoading(true);
    let params = {
      criteriaName: item?.criteriaName,
      page: 2,
    };
    getPackages(params)
      .then((res: any) => {
        setData(res?.data?.packages);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };
  const handleItemPress = (item: any) => {
    navigate('PackagesDetails', {item: item});
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      PackagesCompany();
      setRefreshing(false);
    }, 3000);
  };

  const addRemovedFvt = (itemId: any) => {
    setLoading(true);
    const params = {
      type: 'donation',
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

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <CustomHeader
          title={item?.criteriaName}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.Container}>
            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={data}
              refreshControl={
                <RefreshControl
                  enabled
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={[changeColor, changeColor]}
                />
              }
              ListEmptyComponent={
                loading ? null : <EmptyList description={'No data found'} />
              }
              renderItem={({item}) => {
                const isFavorite = favorites?.some(
                  (fav: any) =>
                    fav.itemId === item?._id && fav.favModel === 'donation',
                );
                return (
                  <TouchableOpacity
                    style={{marginTop: RF(16)}}
                    onPress={() => handleItemPress(item)}>
                    <LinearGradient
                      colors={[
                        'rgba(226, 93, 93, 0.37)',
                        'rgba(226, 93, 93, 0)',
                      ]}
                      style={styles.linearGradient}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Text size={18} color={colors.blueText} SFmedium>
                          {item.donationTitle}
                        </Text>
                        {/* <TouchableOpacity
                          onPress={() => addRemovedFvt(item?._id)}>
                          <Image
                            source={isFavorite ? fill_favourite : favourite}
                            style={{
                              width: RF(18),
                              height: RF(18),
                              resizeMode: 'contain',
                            }}
                          />
                        </TouchableOpacity> */}
                      </View>

                      <Image
                        source={{
                          uri:
                            item?.images?.[0] ||
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                        }}
                        style={styles.ImageCard}
                      />
                      <View style={styles.CardStyle}>
                        <View style={styles.ContainerCard}>
                          <Image
                            source={{
                              uri:
                                item?.donationId?.logo ||
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                            }}
                            style={styles.ImageLogo}
                          />
                        </View>
                        <View style={styles.ColumnStyle}>
                          <Text
                            size={16}
                            SFmedium
                            color={colors.blueText}
                            numberOfLines={1}>
                            {item?.donationId?.name}
                          </Text>
                          <Text size={12} SFregular color={colors.blueText}>
                            {item?.description}
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>
        {loading && <CustomLoader />}
      </View>
    </Wrapper>
  );
};

export default UserDonationPak;
