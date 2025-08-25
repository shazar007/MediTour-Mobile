import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  AppButton,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {
  Amenities,
  CarrierandPolicies,
  colors,
  get_SingleTickets,
  globalStyles,
  navigate,
  padding,
} from '@services';
import {Trip, dropIcon, share, upload, useredit} from '@assets';
import {RF} from '@theme';
import moment from 'moment';
const TravelPackageDetailsMultiWay = ({navigation, route}: any) => {
  const {item, params} = route.params;
  const [data, setData] = useState<any>([]);
  const [amenities, setAmenities] = useState(false);
  const [policy, setPolicy] = useState(false);
  const formattedDateTime1 = useMemo(() => {
    return moment(item?.departDate).format('MMMM Do YYYY');
  }, [item?.departDate]);
  const formatted = useMemo(() => {
    return moment(item?.afterStayarrivalDate).format('MMMM Do YYYY');
  }, [item?.afterStayarrivalDate]);
  const formattedDate = useMemo(() => {
    return moment(item?.beforeStayarrivalDate).format('MMMM Do YYYY');
  }, [item?.beforeStayarrivalDate]);
  const formatte = useMemo(() => {
    return moment(item?.afterStayDepartDate).format('MMMM Do YYYY');
  }, [item?.afterStayDepartDate]);

  const BookingScreen = (item: any, params: any) => {
    navigate('TicketBookingDetail', {item: item, params: params});
  };
  useEffect(() => {
    Tickets_Details();
  }, []);
  const Tickets_Details = () => {
    let params = {
      flightId: item._id,
    };
    get_SingleTickets(params)
      .then((res: any) => {
        setData(res.data.flight.trips);
      })
      .catch((err: any) => {})
      .finally(() => {});
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1, backgroundColor: '#Fff'}}>
        <HeaderCard
          icon2={share}
          tintColor={colors.white}
          icon3={useredit}
          plusIcon
          twoInRow
          numberOfIcons={'3'}>
          <UserHeaderContent
            ScreenTitle={'LHR - SA'}
            DescriptionText
            DescText={'20 Dec, 4 Traveler, Economy '}
          />
        </HeaderCard>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.main}>
            <FlatList
              scrollEnabled={false}
              data={data}
              renderItem={({item}: any) => (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      size={16}
                      SFregular
                      color={colors.primary}>{`${item.from}-${item.to}`}</Text>
                    {/* <Text>{data.flight.totalTime}</Text> */}
                  </View>
                  <Pressable style={styles.PressableView}>
                    <Image
                      source={{uri: item.companyLogo}}
                      style={styles.Image}
                    />
                    <Text
                      size={12}
                      SFregular
                      color={colors.primary}
                      style={{textAlign: 'center'}}>
                      {item.companyName}
                    </Text>
                    <View style={styles.tripContainer}>
                      <View style={styles.tripDetails}>
                        <View style={styles.city}>
                          <Text size={14} SFmedium color={colors.primary}>
                            {item.from.substring(0, 3)}
                          </Text>
                          <Text size={9} SFregular color={colors.primary}>
                            {item.departTime}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.tripDetails2}>
                        <Image source={Trip} style={styles.tripIcon} />
                        <View style={styles.duration}>
                          <Text size={9} SFregular color={colors.primary}>
                            {item.directOrStay}
                          </Text>
                          <Text size={9} SFregular color={colors.primary}>
                            {item?.stayduration}
                          </Text>
                        </View>
                      </View>
                      {item.directOrStay === 'direct' && (
                        <View style={styles.tripDetails}>
                          <View style={styles.city}>
                            <Text size={14} SFmedium color={colors.primary}>
                              {item.to.substring(0, 3)}
                            </Text>
                            <Text size={9} SFregular color={colors.primary}>
                              {item.arrivalTime}
                            </Text>
                          </View>
                        </View>
                      )}
                      {item.directOrStay === 'stay' && (
                        <View style={styles.tripDetails}>
                          <View style={styles.city}>
                            <Text size={14} SFmedium color={colors.primary}>
                              {item.beforeStayto.substring(0, 3)}
                            </Text>
                            <Text size={9} SFregular color={colors.primary}>
                              {item.beforeStayarrivalTime}
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                    {item.directOrStay === 'direct' && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{justifyContent: 'center'}}>
                          <Text size={14} SFmedium color={colors.primary}>
                            {item.from}
                          </Text>
                          <Text size={9} SFregular color={colors.primary}>
                            {formattedDateTime1}
                          </Text>
                        </View>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text size={14} SFmedium color={colors.primary}>
                            {item.to}
                          </Text>
                          <Text size={9} SFregular color={colors.primary}>
                            {formattedDateTime1}
                          </Text>
                        </View>
                      </View>
                    )}
                    {item.directOrStay === 'stay' && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{justifyContent: 'center'}}>
                          <Text size={14} SFmedium color={colors.primary}>
                            {item.from}
                          </Text>
                          <Text size={9} SFregular color={colors.primary}>
                            {formattedDateTime1}
                          </Text>
                        </View>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text size={14} SFmedium color={colors.primary}>
                            {item.beforeStayto}
                          </Text>
                          <Text size={9} SFregular color={colors.primary}>
                            {formattedDate}
                          </Text>
                        </View>
                      </View>
                    )}
                    {item.directOrStay === 'stay' && (
                      <>
                        <View style={styles.dashedline} />
                        <View style={styles.viewStyle}>
                          <View style={styles.width40} />
                          <View style={styles.bg40}>
                            <Text
                              size={9}
                              SFregular
                              color={colors.primary}
                              style={{textAlign: 'center'}}>
                              {item.stayduration}
                            </Text>
                          </View>
                          <View style={styles.left40} />
                        </View>
                        <Image
                          source={{uri: item.companyLogo}}
                          style={styles.Image}
                        />
                        <Text
                          size={12}
                          SFregular
                          color={colors.primary}
                          style={{textAlign: 'center'}}>
                          {item.companyName}
                        </Text>
                        <View style={styles.tripContainer}>
                          <View style={styles.tripDetails}>
                            <View style={styles.city}>
                              <Text size={14} SFmedium color={colors.primary}>
                                {item.afterStayFrom.substring(0, 3)}
                              </Text>
                              <Text size={9} SFregular color={colors.primary}>
                                {item.afterStayDepartTime}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.tripDetails2}>
                            <Image source={Trip} style={styles.tripIcon} />
                            <View style={styles.duration}>
                              <Text size={9} SFregular color={colors.primary}>
                                {item.directOrStay}
                              </Text>
                              <Text size={9} SFregular color={colors.primary}>
                                {item?.stayduration}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.tripDetails}>
                            <View style={styles.city}>
                              <Text size={14} SFmedium color={colors.primary}>
                                {item.afterStayto.substring(0, 3)}
                              </Text>
                              <Text size={9} SFregular color={colors.primary}>
                                {item.afterStayarrivalTime}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{justifyContent: 'center'}}>
                            <Text size={14} SFmedium color={colors.primary}>
                              {item.afterStayFrom}
                            </Text>
                            <Text size={9} SFregular color={colors.primary}>
                              {formatte}
                            </Text>
                          </View>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text size={14} SFmedium color={colors.primary}>
                              {item.afterStayto}
                            </Text>
                            <Text size={9} SFregular color={colors.primary}>
                              {formatted}
                            </Text>
                          </View>
                        </View>
                      </>
                    )}
                  </Pressable>
                </>
              )}
            />

            {/* ................................................... */}

            <View style={styles.selectedContainer}>
              <Text
                size={16}
                SFbold
                color={colors.primary}
                style={{marginTop: RF(16)}}>
                Amenities
              </Text>
              <TouchableOpacity onPress={() => setAmenities(!amenities)}>
                <Image
                  source={amenities ? upload : dropIcon}
                  style={styles.dropIcon}
                />
              </TouchableOpacity>
            </View>
            {amenities &&
              Amenities.map((item, index) => (
                <View key={index}>
                  <Text size={14} SFregular color={colors.primary}>
                    {item.text2}
                  </Text>
                  <Text size={14} SFregular color={colors.primary}>
                    {item.text3}
                  </Text>
                  <Text size={14} SFregular color={colors.primary}>
                    {item.text4}
                  </Text>
                  <Text size={14} SFregular color={colors.primary}>
                    {item.text5}
                  </Text>
                </View>
              ))}

            <View style={styles.selectedContainer}>
              <Text size={16} SFbold color={colors.primary}>
                Carry & Polices
              </Text>
              <TouchableOpacity onPress={() => setPolicy(!policy)}>
                <Image
                  source={policy ? upload : dropIcon}
                  style={styles.dropIcon}
                />
              </TouchableOpacity>
            </View>
            {policy &&
              CarrierandPolicies.map((item, index) => (
                <View key={index}>
                  <View style={[globalStyles.row]}>
                    <Text size={14} SFregular color={colors.primary}>
                      {item.bag_name}
                    </Text>
                    <Text size={14} SFregular color={colors.primary}>
                      {item.bagquantity}
                    </Text>
                  </View>
                  <View style={[globalStyles.row]}>
                    <Text size={14} SFregular color={colors.primary}>
                      {item.weightkg}
                    </Text>
                    <Text size={14} SFregular color={colors.primary}>
                      {item.weight_quantity}
                    </Text>
                  </View>
                  <View style={[globalStyles.row]}>
                    <Text size={14} SFregular color={colors.primary}>
                      {item.cancel}
                    </Text>
                    <Text size={14} SFregular color={colors.primary}>
                      {item.refund}
                    </Text>
                  </View>
                  <View style={globalStyles.row}>
                    <Text size={14} SFregular color={colors.primary}>
                      {item.cancel}
                    </Text>
                    <Text size={14} SFregular color={colors.primary}>
                      {item.refund_days}
                    </Text>
                  </View>
                  <Text size={16} SFregular color={colors.primary}>
                    {item.text2}
                  </Text>
                </View>
              ))}
          </View>
        </ScrollView>
        <View style={styles.button}>
          <View style={[padding.Horizontal_16, padding.Vertical_8]}>
            <Text size={14} SFmedium color={colors.primary}>
              PKR 10,123
            </Text>
            <Text size={9} SFregular color={colors.primary}>
              +PKR 900 taxes and fees
            </Text>
            <AppButton
              title="Buy"
              onPress={() => BookingScreen(item, params)}
              m_Top={16}
            />
          </View>
        </View>
      </View>
    </Wrapper>
  );
};

export default TravelPackageDetailsMultiWay;
const styles = StyleSheet.create({
  selectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: RF(16),
    marginVertical: RF(8),
  },
  dropIcon: {
    width: RF(16),
    height: RF(16),
    resizeMode: 'contain',
    tintColor: '#00276D',
  },
  main: {
    marginTop: RF(16),
    marginHorizontal: RF(16),
    marginBottom: RF(20),
  },
  PressableView: {
    backgroundColor: '#F5F5F5',
    elevation: 0.3,
    padding: RF(16),
    borderRadius: RF(16),
    marginVertical: RF(8),
    // marginHorizontal: RF(16),
  },
  Image: {
    width: RF(32),
    height: RF(32),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  flightavatar: {
    width: RF(150),
    height: RF(26),
    resizeMode: 'contain',
  },
  dashedline: {
    borderWidth: 0.7,
    borderColor: '#396DB2',
    borderStyle: 'dashed',
    top: RF(32),
  },
  viewStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  width40: {
    width: RF(40),
    height: RF(40),
    borderRadius: RF(20),
    right: RF(40),
    backgroundColor: '#fff',
  },
  bg40: {
    backgroundColor: '#fff',
    marginHorizontal: RF(40),
    paddingHorizontal: RF(8),
    paddingVertical: RF(8),
    marginVertical: RF(16),
    borderRadius: RF(8),
  },
  left40: {
    width: RF(40),
    height: RF(40),
    borderRadius: RF(20),
    left: RF(30),
    backgroundColor: '#fff',
  },
  width32: {
    width: RF(32),
    height: RF(32),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  width150: {
    width: RF(150),
    height: RF(32),
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: RF(8),
    paddingVertical: RF(8),
    elevation: 6,
    height: RF(174),
    // bottom: RF(32),
  },
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
