import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Calendar,
  CustomLoader,
  EmptyList,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {colors, get_OrmFlight, navigate} from '@services';
import {Trip, share, useredit} from '@assets';
import {RF} from '@theme';
const TravelPackageMultiWayDetail = ({route}: any) => {
  const {params, response} = route.params;
  const {
    flightType,
    adult,
    children,
    infant,
    departDate,
    category,
    from,
    to,
    flights,
    arrivalDate,
  } = params;
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const Packagesdetails = (item: any, params: any) => {
    navigate('TravelPackageDetailsMultiWay', {item: item, params: params});
  };
  useEffect(() => {
    getFlightSearch();
  }, []);
  const getFlightSearch = () => {
    setLoading(true);
    let params = {
      class: category,
      flightType: flightType,
      adult: adult,
      children: children,
      infant: infant,
    };

    if (response === 'oneWay') {
      params = {
        from: from,
        to: to,
        departDate: departDate,
        ...params,
      };
    } else if (response === 'multi') {
      params = {
        ...params,
        from: from,
        to: to,
        flights: flights,
      };
    } else if (response === 'round') {
      params = {
        ...params,
        from: from,
        to: to,
        departDate: departDate,
        arrivalDate: arrivalDate,
      };
    }
    get_OrmFlight(params)
      .then((res: any) => {
        setData(res?.data?.flights);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <HeaderCard
          icon2={share}
          tintColor={colors.white}
          icon3={useredit}
          plusIcon
          twoInRow
          numberOfIcons={'3'}>
          <UserHeaderContent
            DescText={`${departDate},${category}`}
            ScreenTitle={`${from.substring(0, 3)}-${to.substring(0, 3)}`}
          />
        </HeaderCard>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingBottom: RF(80), marginTop: RF(24)}}>
            <FlatList
              scrollEnabled={false}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={
                loading ? null : <EmptyList description={'No data found'} />
              }
              renderItem={({item}) => (
                <Pressable
                  onPress={() => Packagesdetails(item, params)}
                  style={styles.cardView}>
                  {item?.actualPrice && (
                    <Text
                      size={14}
                      SFmedium
                      color={colors.primary}
                      style={{marginTop: RF(8)}}>
                      PKR {item?.actualPrice}
                    </Text>
                  )}
                  {item.trips.map(trip => (
                    <View style={styles.tripContainer}>
                      <View style={styles.tripDetails}>
                        <Image
                          style={styles.logo}
                          source={{uri: trip.companyLogo}}
                        />
                        <View style={styles.city}>
                          <Text size={14} SFmedium color={colors.primary}>
                            {trip.from.substring(0, 3)}
                          </Text>
                          <Text size={9} SFregular color={colors.primary}>
                            {trip.departTime}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.tripDetails2}>
                        <Image source={Trip} style={styles.tripIcon} />
                        <View style={styles.duration}>
                          <Text size={9} SFregular color={colors.primary}>
                            {trip.directOrStay}
                          </Text>
                          <Text size={9} SFregular color={colors.primary}>
                            {trip?.stayduration}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.tripDetails}>
                        <View style={styles.city}>
                          <Text size={14} SFmedium color={colors.primary}>
                            {trip.to.substring(0, 3)}
                          </Text>
                          <Text size={9} SFregular color={colors.primary}>
                            {trip.arrivalTime}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </Pressable>
              )}
            />
          </View>
        </ScrollView>
        {loading && <CustomLoader />}
      </View>
    </Wrapper>
  );
};
export default TravelPackageMultiWayDetail;
const styles = StyleSheet.create({
  cardView: {
    backgroundColor: '#F5F5F5',
    elevation: 1,
    padding: RF(8),
    marginVertical: RF(8),
    borderRadius: RF(16),
    marginHorizontal: RF(24),
  },
  tripContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: RF(8),
  },
  tripDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RF(8),
  },
  tripDetails2: {
    alignItems: 'center',
    gap: RF(8),
  },
  logo: {
    width: RF(24),
    height: RF(20),
    resizeMode: 'contain',
    borderRadius: RF(4),
  },
  city: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  tripIcon: {
    width: RF(16),
    height: RF(16),
    resizeMode: 'contain',
  },
  duration: {
    borderTopWidth: 1,
    borderColor: '#00276D',
    width: RF(120),
    borderStyle: 'dotted',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: RF(2),
  },
});
