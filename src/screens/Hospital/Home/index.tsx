import {
  Wrapper,
  AppButton,
  HeaderCard,
  ImageColumCard,
  HospitalProgressCard,
  HospitalSectionCards,
  CustomLoader,
  Text,
  ActivationCard,
} from '@components';
import {RF} from '@theme';
import useStyles from './styles';
import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {
  hospitaldashobardGetCounts,
  hospitalGetAllAppointmentRequest,
  hospitalGetTodayAppointmentRequest,
  hospitaldashobardAppointmentStats,
} from '@services';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {LabBell, LabMenu} from '@assets';
import LinearGradient from 'react-native-linear-gradient';

const HospitalHome = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [data, setData] = useState<any>({});
  const [type, setType] = useState('request');
  const [loading, setLoading] = useState<any>(false);
  const [cardsData, setCardsData] = useState<any>({});
  const [todayData, setTodayData] = useState<any>([]);
  const [requestData, setRequestData] = useState<any>([]);
  const {B2B} = useSelector((state: any) => state.root.b2b);
  const {user} = useSelector((state: any) => state.root.user);

  useEffect(() => {
    getStats();
    getCounts();
    getTodayAppointment();
    getAppointment_Req();
  }, []);

  const getStats = () => {
    setLoading(true);
    hospitaldashobardAppointmentStats()
      .then((res: any) => {
        setData(res?.data);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const getCounts = () => {
    setLoading(true);
    hospitaldashobardGetCounts()
      .then((res: any) => {
        setCardsData(res?.data);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const getTodayAppointment = () => {
    setLoading(true);
    hospitalGetTodayAppointmentRequest()
      .then((res: any) => {
        setTodayData(res?.data?.appointments);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const getAppointment_Req = () => {
    setLoading(true);
    hospitalGetAllAppointmentRequest()
      .then((res: any) => {
        setRequestData(res?.data?.recentAppointmentRequests);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const renderItem = ({item}: any) => (
    <ImageColumCard
      label={item?.patientId?.name}
      imageSource={{uri: item?.patientId?.userImage}}
      date={moment(item?.patientId?.updatedAt).format('DD/MM/YY')}
    />
  );

  const onClick = (type: any) => {
    if (type == 'request') {
      setType('request');
    } else if (type == 'today') {
      setType('today');
    }
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <LinearGradient colors={['#a8e9ff', '#a8e9ff']} style={styles.linear}>
        <View style={{bottom: 16}}>
          <HeaderCard
            home
            notify
            plusIcon
            icon1={LabMenu}
            icon2={LabBell}
            twoInRow={true}
            numberOfIcons={'3'}
            onPress={openDrawer}
            cardColor={'transparent'}
            tintColor={colors.primary}
            icon3={{uri: B2B?.hospital?.logo}}
          />
        </View>

        <HospitalProgressCard
          video={data?.percentageVideo ? data?.percentageVideo : '0'}
          totalSession={
            data?.percentageVideo ? data?.percentageTotalSessions : '0'
          }
        />

        <View style={styles.row}>
          <HospitalSectionCards
            label={'Total Patient'}
            bgClr={colors.Donationcard}
            value={cardsData?.totalPatients}
          />
          <HospitalSectionCards
            label={'New Patient'}
            bgClr={colors.dimPurple}
            value={cardsData?.newPatientsCount}
          />
          <HospitalSectionCards
            label={'Total Doctor'}
            bgClr={colors.fadeYellow}
            value={cardsData?.totalDoctors}
          />
          <HospitalSectionCards
            value={1100}
            bgClr={colors._gray}
            label={'Total Income'}
          />
        </View>

        <View style={styles.btn}>
          <AppButton
            bold
            size={12}
            width={RF(150)}
            height={RF(32)}
            bgClr={'white'}
            title="Appointment Request"
            onPress={() => onClick('request')}
            textcolor={type == 'request' ? colors?.bluE : colors?.greey}
          />
          <AppButton
            bold
            size={12}
            height={RF(32)}
            width={RF(150)}
            bgClr={'white'}
            title="Today Appointment"
            onPress={() => onClick('today')}
            textcolor={type == 'today' ? colors?.bluE : colors?.greey}
          />
        </View>

        <View style={styles.list}>
          <FlatList
            scrollEnabled={true}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 200}}
            keyExtractor={(item, index) => index.toString()}
            data={type == 'request' ? requestData : todayData}
            ListEmptyComponent={() => {
              return (
                <View style={styles.empty}>
                  <Text size={16} align>
                    No data Found!
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </LinearGradient>
      {loading && <CustomLoader />}
      {user?.paidActivation === true ? null : <ActivationCard />}
    </Wrapper>
  );
};
export default HospitalHome;
