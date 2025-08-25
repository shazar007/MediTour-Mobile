import useStyles from './styles';
import {View, ImageBackground, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  Wrapper,
  Chartlist,
  HeaderCard,
  CustomLoader,
  LabDashboardCard,
  ActivationCard,
} from '@components';
import {RF} from '@theme';
import moment from 'moment';
import {setChangeColor, setIsLoggedIn} from '@redux';
import {Modalize} from 'react-native-modalize';
import {BarChart} from 'react-native-gifted-charts';
import {useDispatch, useSelector} from 'react-redux';
import {DonutChart} from 'react-native-circular-chart';
import {LabBell, LabMenu, LaboratoryBackground} from '@assets';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {
  LabGRAPH,
  Lab_Dashboard_Details,
  globalStyles,
  showToast,
  PharmGRAPH,
  Pharm_Dashboard_Details,
  margin,
} from '@services';

const PharmacyHome = ({navigation}: any) => {
  const modalizeRef = useRef<Modalize>(null);
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch = useDispatch();
  const styles = useStyles(colors);
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [donutData, setDonutData] = useState<any>([]);
  const [graphDetail, setGraphDetail] = useState<any>({});
  const {B2B} = useSelector((state: any) => state.root.b2b);
  const {authToken, user} = useSelector((state: any) => state.root.user);
  console.log('🚀 ~ PharmacyHome ~ user:', user);

  const lab = B2B?.pharm;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setChangeColor(colors.Pharmacy));
    }, []),
  );

  useEffect(() => {
    fetchGraph();
    fetchDahboard();
  }, []);
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const fetchGraph = () => {
    setLoading(true);
    PharmGRAPH()
      .then((res: any) => {
        let updatedData = res?.data?.currentWeekData?.map(
          (item: any) => (
            setLabel(item?.ordersCount),
            {
              value: item?.ordersCount,
              label: moment(item?.date).format('ddd'),
              frontColor: colors.LabOrange,
            }
          ),
        );
        setData(updatedData);
      })
      .catch((err: any) => {
        showToast(
          'error',
          `${err.response?.data?.message} (Re-Login required)`,
          false,
        );
      })
      .finally(() => setLoading(false));
  };

  const fetchDahboard = () => {
    setLoading(true);
    Pharm_Dashboard_Details(lab?._id)
      .then((res: any) => {
        setGraphDetail(res.data);
        let updatedData = [
          // {
          //   name: 'Total Test',
          //   value: res?.data?.totalTests,
          //   color: colors.LabOrange,
          // },
          {
            name: 'New Order',
            value: res?.data?.todayOrdersCount,
            color: colors.LabBlue,
          },
          {
            name: 'Pending Order',
            value: res?.data?.pendingYesOrdersCount,
            color: colors.LabOrange,
          },
          {
            name: 'Complete Test',
            value: res?.data?.completeTodayOrdersCount,
            color: colors.LabYellow,
          },
          {
            name: 'Total Payment',
            value: 35,
            // value: res?.data?.totalTests,
            color: colors.primary,
          },
        ];
        setDonutData(updatedData);
      })
      .catch((err: any) => {
        if (err?.response?.status == 500) {
          // dispatch(setIsLoggedIn(false));
          // showToast('Failed', 'Session expired', false);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'dark-content'}>
      <ImageBackground source={LaboratoryBackground} style={styles.Background}>
        <View style={{bottom: RF(16)}}>
          <HeaderCard
            // plusIcon
            twoInRow
            icon1={LabMenu}
            // icon2={LabBell}
            numberOfIcons={'3'}
            onPress={openDrawer}
            // icon3={{
            //   uri: lab?.logo,
            // }}
            // notify
            // home
            clr={'black'}
            cardColor={'transparent'}
            tintColor={colors.primary}
          />
        </View>
        <View style={styles.maincontainer}>
          <Text size={14} SFlight color={colors.blueText}>
            Welcome,
          </Text>
          <View style={globalStyles.row}>
            <Text size={16} SFsemiBold color={colors.blueText}>
              {lab?.name}
            </Text>
          </View>
          <View style={[globalStyles.row]}>
            {donutData.length <= 0 ? (
              <></>
            ) : (
              <DonutChart
                type="round"
                startAngle={0}
                endAngle={360}
                data={donutData}
                radius={RF(75)}
                strokeWidth={RF(16)}
                animationType="slide"
                containerWidth={RF(180)}
                containerHeight={105 * 2.2}
              />
            )}
            <Chartlist
              Bradius={RF(8)}
              textone={'New Order'}
              BGForth={colors.LabBlue}
              BGsec={colors.LabOrange}
              bgColor={colors.primary}
              BGthird={colors.LabYellow}
              textColor={colors.primary}
              textforth={'Total Payment'}
              textsecond={'Pending Order'}
              textthird={'Complete Test '}
            />
          </View>

          <View style={styles.view}>
            <LabDashboardCard
              bgColor={'#b2cded'}
              count={graphDetail?.todayOrdersCount}
              percentage={graphDetail?.newOrdersPercentageChange}
            />
            <LabDashboardCard
              bgColor={'#edc091'}
              count={graphDetail?.pendingYesOrdersCount}
              percentage={graphDetail?.pendingPercentageChange}
            />
            <LabDashboardCard
              bgColor={'#d6c79c'}
              count={graphDetail?.completeTodayOrdersCount}
              percentage={graphDetail?.comOrdersPercentageChange}
            />
            <LabDashboardCard
              count={35}
              percentage={'25%'}
              bgColor={'#c6f1f7'}
            />
          </View>

          <View
            style={{
              borderRadius: 8,
              elevation: 5,
              backgroundColor: '#fff',
              padding: RF(8),
            }}>
            <Text size={16} SFsemiBold style={{marginBottom: RF(16)}}>
              Total Users
            </Text>
            <BarChart
              hideRules
              isAnimated
              roundedTop
              data={data}
              spacing={32}
              height={140}
              showGradient
              roundedBottom
              barWidth={10}
              noOfSections={4}
              capThickness={4}
              yAxisThickness={0}
              xAxisThickness={0}
              yAxisLabelTexts={label}
              animationDuration={2000}
              gradientColor={colors.primary}
              yAxisTextStyle={{color: 'black'}}
              xAxisLabelTextStyle={{color: 'black'}}
            />
          </View>
        </View>
      </ImageBackground>

      {loading && <CustomLoader />}
      {user?.paidActivation === true ? null : <ActivationCard />}
    </Wrapper>
  );
};
export default PharmacyHome;

{
  /* <View style={globalStyles.rowSimple}>
<Text size={10} SFmedium color={colors.blueText}>
  Last Month
</Text>
<Image
  source={dropIcon}
  style={{width: RF(16), height: RF(16)}}
/>
</View> */
}
{
  /* <CustomModalize
          modalStyle={{backgroundColor: colors.LabOrange}}
          ref={modalizeRef}
          lineColor={colors.background}
          alwaysOpen={150}>
          <View style={{paddingBottom: RF(104)}}>
            <Text size={16} color={colors.background} SFsemiBold>
              In progress Insurance Detail
            </Text>
          </View>
        </CustomModalize> */
}
