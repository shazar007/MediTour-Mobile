import useStyles from './styles';
import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Wrapper,
  HotelGraph,
  RevenueHotel,
  TotalAvailable,
  HotelDashBoard,
  CustomHeader,
  ActivationCard,
} from '@components';
import {Text} from '@components';
import {RF, getColorCode} from '@theme';
import {useTheme} from '@react-navigation/native';
import {
  globalStyles,
  getHotelGrpah,
  getTotalProperty,
  getLatestBookings,
  getReservationDetails,
} from '@services';
import {useSelector} from 'react-redux';

const HotelHome = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {colorCode} = getColorCode();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [graph, SetGraph] = useState([]);
  const [latest, setLatest] = useState([]);
  const styles = useStyles(colors, colorCode);
  const {user} = useSelector((state: any) => state.root.user);

  useEffect(() => {
    reserveHotel();
    totalRoomAvailable();
    latestBooking();
    getGraph();
  }, []);
  const reserveHotel = () => {
    getReservationDetails()
      .then((res: any) => {
        setData(res?.data?.bookings);
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

  const totalRoomAvailable = () => {
    getTotalProperty()
      .then((res: any) => {
        setTotal(res.data);
      })
      .catch((err: any) => {})
      .finally(() => {});
  };
  const latestBooking = () => {
    getLatestBookings()
      .then((res: any) => {
        setLatest(res?.data?.bookings);
      })
      .catch((err: any) => {})
      .finally(() => {});
  };
  const getGraph = () => {
    getHotelGrpah()
      .then((res: any) => {
        SetGraph(res.data.months);
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader title={'Dashboard'} titleColor={colors.white} notify />

        <ScrollView>
          <View style={styles.Container}>
            <View style={globalStyles.row}>
              <Text size={18} SFsemiBold color={colors.primary}>
                Hello {user?.name}
              </Text>
            </View>
            <Text size={14} SFmedium color={colors.Doctor}>
              Welcome Back !
            </Text>
            <RevenueHotel />
            <HotelGraph graphData={graph} />
            <Text
              size={16}
              SFmedium
              color={'#0D47A1'}
              style={{marginTop: RF(24)}}>
              Reservation
            </Text>
            <HotelDashBoard Reservation data={data} />
            <Text
              size={16}
              SFmedium
              color={'#0D47A1'}
              style={{marginTop: RF(24)}}>
              Property Booked
            </Text>
            <TotalAvailable total={total} />
            <Text
              size={16}
              SFmedium
              color={'#0D47A1'}
              style={{marginTop: RF(24)}}>
              Latest Property
            </Text>
            <HotelDashBoard data={latest} />
          </View>
        </ScrollView>
      </View>
      {user?.paidActivation === true ? null : <ActivationCard />}
    </Wrapper>
  );
};
export default HotelHome;
