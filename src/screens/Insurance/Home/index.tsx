import useStyles from './styles';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Text,
  Wrapper,
  LineCharts,
  InsuranceCard,
  CustomLoader,
  CustomHeader,
  ActivationCard,
} from '@components';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Icon, Iconthree, Icontwo, LabMenu} from '@assets';
import {
  globalStyles,
  insuranceDashDetails,
  insuranceMonthsGraph,
} from '@services';
import {RF} from '@theme';
import moment from 'moment';
import {BarChartComponent} from '@components';
import {useSelector} from 'react-redux';

const InsuranceHome = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [data, setData] = useState<any>();
  const [travel, setTravel] = useState<any>();
  const [health, setHealth] = useState<any>();
  const [label, setLabel] = useState<any>([]);
  const [graph, setGraph] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const {user} = useSelector((state: any) => state.root.user);

  useEffect(() => {
    fetchDetails();
    fetchGraph();
  }, []);

  const fetchDetails = () => {
    setLoading(true);
    insuranceDashDetails()
      .then((res: any) => {
        setData(res?.data);
        setHealth(res?.data?.healthPayments);
        setTravel(res?.data?.travelPayments);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const fetchGraph = () => {
    setLoading(true);
    insuranceMonthsGraph()
      .then((res: any) => {
        const labels = res?.data?.map((item: any) =>
          moment(item?.month).format('MMM'),
        );
        const values = res?.data?.map((item: any) => item?.previousCustomers);
        setGraph(values);
        setLabel(labels);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader title={'Dashboard'} titleColor={colors.white} notify />

      {/* <HeaderCard
        home
        notify
        twoInRow
        icon1={LabMenu}
        numberOfIcons={'3'}
        onPress={openDrawer}
        tintColor={'#fff'}
        >
        <UserHeaderContent
          ScreenTitle={'Dashboard'}
        />
      </HeaderCard> */}
      <ScrollView style={{flex: 1}}>
        <View style={{flexDirection: 'row', marginHorizontal: RF(10)}}>
          <InsuranceCard
            text={'+8% from last week'}
            size={12}
            h={RF(100)}
            wd={RF(109)}
            IconTrue={Icon}
            bgColor={'#FFE2E5'}
            title={'Today REQ'}
            label={data?.todayRequestCount}
            iconWD={RF(30)}
            iconH={RF(30)}
            txtSize={10}
          />
          <InsuranceCard
            size={12}
            h={RF(100)}
            wd={RF(95)}
            txtSize={10}
            iconH={RF(30)}
            iconWD={RF(30)}
            title={'Total CUS'}
            bgColor={'#FFF4DE'}
            IconTrue={Iconthree}
            text={'+5% from last week'}
            label={data?.todayCustomerCount}
          />
          <InsuranceCard
            label={data?.totalRevenue}
            size={12}
            text={'+12% from last week'}
            title={'Total REV'}
            IconTrue={Icontwo}
            bgColor={'#DCFCE7'}
            h={RF(100)}
            wd={RF(95)}
            iconWD={RF(30)}
            txtSize={10}
            iconH={RF(30)}
          />
        </View>

        {graph.length > 0 && (
          <LineCharts data={graph} label={label} title={'Customer'} />
        )}

        <View style={styles.view}>
          <BarChartComponent
            value1={health}
            value2={travel}
            title={'Last week Revenue'}
            title1={data?.totalRevenue}
          />
        </View>

        <View
          style={[
            globalStyles.rowSimple,
            {
              marginHorizontal: RF(24),
              justifyContent: 'space-around',
              marginTop: RF(12),
            },
          ]}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', gap: RF(6)}}>
            <View
              style={{
                backgroundColor: '#0095FF',
                width: RF(16),
                height: RF(16),
                borderRadius: RF(8),
              }}
            />
            <Text size={14} color={colors.primary} SFmedium>
              Health
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', gap: RF(6)}}>
            <View
              style={{
                backgroundColor: '#07E098',
                width: RF(16),
                height: RF(16),
                borderRadius: RF(8),
              }}
            />
            <Text size={14} color={colors.primary} SFmedium>
              Travel
            </Text>
          </View>
        </View>
        <View
          style={[
            globalStyles.rowSimple,
            {
              marginHorizontal: RF(24),
              justifyContent: 'space-around',
            },
          ]}>
          <Text size={14} SFregular color={colors.primary}>
            {data?.totalHealthPayments}
          </Text>
          <Text size={14} SFregular color={colors.primary}>
            {data?.totalTravelPayments}
          </Text>
        </View>

        <View style={{height: 100, marginBottom: 100}} />
      </ScrollView>
      {loading && <CustomLoader />}
      {user?.paidActivation === true ? null : <ActivationCard />}
    </Wrapper>
  );
};

export default InsuranceHome;

const styles = StyleSheet.create({});
