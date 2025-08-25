import {
  View,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import useStyles from './styles';
import {Wrapper, CustomLoader, CustomHeader, ActivationCard} from '@components';
import {RF} from '@theme';
import moment from 'moment';
import {Text} from '@components';
import {useSelector} from 'react-redux';
import {LabMenu, flightlogo} from '@assets';
import {Modalize} from 'react-native-modalize';
import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {globalStyles, travelAgencyDash, travelAgencyWeekGraph} from '@services';

const TravelAgencyHome = ({navigation}: any) => {
  const lineData = [
    {value: 62},
    {value: 56},
    {value: 12},
    {value: 75},
    {value: 82},
    {value: 8},
    {value: 15},
    {value: 12},
  ];
  const lineData2 = [
    {value: 77},
    {value: 72},
    {value: 45},
    {value: 50},
    {value: 60},
    {value: 70},
    {value: 40},
    {value: 30},
  ];
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const modalizeRef = useRef<Modalize>(null);
  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState<any>();
  const [refreshing, setRefreshing] = useState(false);
  const [graphLoading, setGraphLoading] = useState(false);
  // const {B2B} = useSelector((state: any) => state.root.b2b);
  const {authToken, user} = useSelector((state: any) => state.root.user);
  console.log('🚀 ~ TravelAgencyHome ~ user:', user);
  const [dashboardData, setDashboardData] = useState<any>({});
  const fetchDashData = () => {
    travelAgencyDash()
      .then((res: any) => {
        setDashboardData(res?.data);
      })
      .catch(err => {})
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const fetchWeekGraph = () => {
    setGraphLoading(true);
    travelAgencyWeekGraph()
      .then((res: any) => {
        setGraphData(res?.data);
      })
      .catch((err: any) => {})
      .finally(() => setGraphLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    fetchDashData();
    fetchWeekGraph();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashData();
  };

  return (
    <Wrapper
      bgColor={colors.white}
      statusBarBagColor={'transparent'}
      statusBarStyle={'light-content'}>
      <CustomHeader title={'Dashboard'} titleColor={colors.white} notify />

      <ScrollView
        style={{
          paddingHorizontal: RF(24),
        }}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }>
        <View style={[globalStyles.row, {marginTop: RF(16)}]}>
          <Text size={18} SFsemiBold color={colors.primary}>
            Hello {user?.name}
          </Text>
        </View>

        <Text size={14} SFmedium color={colors.Doctor}>
          Welcome Back !
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: RF(24),
            marginTop: RF(16),
          }}>
          <View
            style={{
              backgroundColor: '#8CB7A3',
              paddingLeft: RF(10),
              width: '48%',
              height: 180,
              borderRadius: 16,
              elevation: 2,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <View
              style={{flexDirection: 'row', alignItems: 'center', gap: RF(8)}}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: RF(8),
                  width: RF(56),
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: RF(8),
                }}>
                <Image
                  source={flightlogo}
                  style={{width: RF(32), height: RF(32)}}
                />
              </View>
              <Text size={16} SFmedium color={colors.primary}>
                Flights
              </Text>
            </View>
            <Text
              size={24}
              SFmedium
              color={colors.primary}
              style={{marginVertical: RF(8)}}>
              {dashboardData?.lastMonthFlightBooking}
            </Text>
            <Text size={14} SFmedium color={colors.primary}>
              Today’s Booked
            </Text>
          </View>
          <View
            style={{
              backgroundColor: colors.primary,
              width: '48%',
              height: 180,
              borderRadius: 16,
              paddingLeft: RF(10),
              elevation: 2,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: RF(8),
              }}>
              <View
                style={{
                  backgroundColor: colors.white,
                  borderRadius: RF(8),
                  width: RF(56),
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: RF(8),
                }}>
                <Image
                  source={flightlogo}
                  style={{width: RF(32), height: RF(32)}}
                />
              </View>
              <Text size={16} SFmedium color={colors.white}>
                Tours
              </Text>
            </View>
            <Text
              size={24}
              SFmedium
              color={colors.white}
              style={{marginVertical: RF(8)}}>
              {dashboardData?.lastMonthTourBooking}
            </Text>
            <Text size={14} SFmedium color={colors.white}>
              Today’s Booked
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#F5F6F8',
            padding: RF(8),
            borderRadius: 8,
            elevation: 2,
          }}>
          <Text size={16} SFbold color={colors.primary}>
            Recent Tour Schedule
          </Text>

          {dashboardData?.recentTourSchedule?.map((s: any, i: any) => (
            <View style={styles.scheduleCard} key={i}>
              <View style={styles.row}>
                <Text size={12} MTsemiBold color={colors.primary}>
                  Start: {moment(s?.tourId?.departDate).format('MM-DD-YYYY')}
                </Text>
                <Text size={12} MTsemiBold color={colors.primary}>
                  End: {moment(s?.tourId?.returnDate).format('MM-DD-YYYY')}
                </Text>
              </View>

              <View style={[styles.row, {marginTop: RF(16)}]}>
                <Text size={9} MTsemiBold color={colors.Doctor}>
                  {s?.tourId?.from}
                </Text>
                <Text size={12} MTsemiBold color={colors.Doctor}>
                  {s?.tourId?.packageDuration}
                </Text>
                <Text size={9} MTsemiBold color={colors.Doctor}>
                  {s?.tourId?.to}
                </Text>
              </View>

              <View style={styles.line} />

              <View style={styles.row}>
                <Text size={10} MTsemiBold color={colors.primary}>
                  Booked Customer
                </Text>
                <Text size={12} MTsemiBold color={colors.primary}>
                  {s?.totalUser}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.chartView}>
          {graphLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Text size={14} SFmedium color={colors.primary}>
              Graph
            </Text>
          )}
          {/* <BarChartComponent
            value1={health}
            // value2={travel}
            title={'Last week Revenue'}
          /> */}
        </View>
      </ScrollView>
      {loading && <CustomLoader />}
      {user?.paidActivation === true ? null : <ActivationCard />}
    </Wrapper>
  );
};
export default TravelAgencyHome;

{
  /* <View
            style={[
              globalStyles.rowSimple,
              {
                borderWidth: 1,
                borderRadius: RF(8),
                paddingHorizontal: RF(8),
                borderColor: colors.primary,
              },
            ]}>
            <Text size={10} SFmedium color={colors.blueText}>
              Overall
            </Text>
            <Image source={dropIcon} style={{width: RF(16), height: RF(16)}} />
          </View> */
}
