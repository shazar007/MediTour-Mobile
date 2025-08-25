import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {RouteProp, useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  Text,
  Wrapper,
  AppButton,
  CustomLoader,
  CustomHeader,
} from '@components';
import {RF} from '@theme';
import useStyles from './styles';
import {drImg} from '@assets';
import {
  navigate,
  insuranceGETFAMILYTRAVEL,
  insuranceGetAllINSURANCE,
  insuranceGETNDIVIDUALTRAVEL,
  insuranceGetAllINSURANCE_Family,
  insuranceGetAllINSURANCE_Parents,
} from '@services';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      item?: any;
      pckg?: any;
    };
  }>;
}

const MyselfPackage = (props: Props) => {
  const {item, pckg} = props.route?.params;
  const theme = useTheme();
  const colors: any = theme.colors;
  const styles = useStyles(colors);
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {authToken} = useSelector((state: any) => state.root.user);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [indicator, setIndicator] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPackages();
  }, [page]);

  const fetchPackages = async () => {
    let data: any = {page};

    let fetchFunction: any;
    if (pckg === 'Health Myself') {
      fetchFunction = insuranceGetAllINSURANCE;
    } else if (pckg === 'Health Family') {
      fetchFunction = insuranceGetAllINSURANCE_Family;
    } else if (pckg === 'Health Parents') {
      fetchFunction = insuranceGetAllINSURANCE_Parents;
    } else if (pckg.includes('Travel Single Trip')) {
      data.tripType = 'singleTrip';
      fetchFunction = insuranceGETNDIVIDUALTRAVEL;
    } else if (pckg.includes('Travel Multi - Trip')) {
      data.tripType = 'multiTrip';
      fetchFunction = insuranceGETFAMILYTRAVEL;
    }

    try {
      const res = await fetchFunction(data);
      if (res?.data) {
        setNextPage(res.data.nextPage ?? null);
        if (page === 1) {
          setList(res.data.insurances);
        } else {
          setList(prevList => [...prevList, ...res.data.insurances]);
        }
      }
    } catch (err: any) {
    } finally {
      setLoading(false);
      setIndicator(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await fetchPackages();
    setRefreshing(false);
  };

  const fetchNextPage = () => {
    if (nextPage && page < nextPage) {
      setIndicator(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  const TravelPackage = () => {
    navigate(pckg.includes('Travel') ? 'Category_Basic' : 'Category', {pckg});
  };

  const onOpen = (item: any) => {
    navigate('Package_Detail', {item, pckg});
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader title={pckg} leftIcon titleColor={'#fff'} notify />

        <ScrollView
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }>
          <View style={{marginBottom: RF(130), marginTop: RF(10)}}>
            <FlatList
              data={list}
              onEndReached={fetchNextPage}
              onEndReachedThreshold={0.5}
              ListFooterComponent={() =>
                indicator ? <ActivityIndicator size="large" /> : null
              }
              renderItem={({item}: any) => (
                <Pressable style={styles.txt} onPress={() => onOpen(item)}>
                  <Image
                    source={{
                      uri:
                        item?.packageLogo ||
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                    }}
                    style={styles.img}
                  />
                  <View>
                    <Text
                      size={16}
                      color={colors?.bluE}
                      numberOfLines={1}
                      SFmedium
                      style={{width: RF(150)}}>
                      {item?.packageName}
                    </Text>
                    <Text size={14} color={colors?.bluE} SFregular>
                      Hospitalization Limit
                    </Text>
                    {item?.claimPayoutRatio && (
                      <Text size={14} color={colors?.bluE} SFregular>
                        Claim Payout Ratio
                      </Text>
                    )}
                  </View>
                  <View style={{marginTop: RF(20), marginRight: RF(20)}}>
                    <Text size={14} color={colors?.bluE} SFregular>
                      {item?.hospitalizationLimit?.endLimit}
                    </Text>
                    {item?.claimPayoutRatio && (
                      <Text
                        size={14}
                        color={colors?.bluE}
                        SFregular
                        style={{width: RF(80)}}>
                        {item?.claimPayoutRatio}
                      </Text>
                    )}
                  </View>
                </Pressable>
              )}
              ListEmptyComponent={() => (
                <Image
                  source={drImg}
                  style={{
                    width: '100%',
                    height: RF(142),
                    resizeMode: 'contain',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: RF(8),
                  }}
                />
              )}
            />
          </View>
        </ScrollView>
        <View style={styles.view}>
          <AppButton
            size={14}
            onPress={TravelPackage}
            title="Add Insurance Category"
          />
        </View>
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default MyselfPackage;
