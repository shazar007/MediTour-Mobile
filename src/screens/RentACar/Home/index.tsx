import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  Wrapper,
  HeaderCard,
  VendorCard,
  CustomLoader,
  HireVsCancelChart,
  UserHeaderContent,
  CustomHeader,
  ActivationCard,
} from '@components';
import {RF} from '@theme';
import moment from 'moment';
import {LabMenu} from '@assets';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {BarChart} from 'react-native-gifted-charts';
import {RentCarDETAILS, RentCarGRAPH, showToast} from '@services';
import {setChangeColor} from '@redux';

const RentACar_Home = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [detail, setDetail] = useState<any>(null);
  const {B2B} = useSelector((state: any) => state.root.b2b);
  const {user} = useSelector((state: any) => state.root.user);

  const rentCar = B2B?.rentCar;

  const openDrawer = () => {
    navigation.openDrawer();
  };
  useFocusEffect(
    React.useCallback(() => {
      dispatch(setChangeColor(colors.RentACar));
    }, []),
  );
  useEffect(() => {
    fetchGraph();
  }, []);

  const dashDetails = () => {
    RentCarDETAILS()
      .then((res: any) => {
        setDetail(res?.data);
      })
      .catch(() => {});
  };

  const fetchGraph = () => {
    setLoading(true);
    RentCarGRAPH()
      .then((res: any) => {
        let updatedData = res?.data?.last12MonthsData?.map(
          (item: any) => (
            setLabel(item?.customersCount),
            {
              value: item?.customersCount,
              label: moment(item?.month).format('MMM'),
              frontColor: colors.LabOrange,
            }
          ),
        );
        setData(updatedData);
        dashDetails();
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

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Dashboard'}
        // leftIcon
        titleColor={colors.white}
        notify
      />
      <ScrollView>
        <View
          style={{
            marginHorizontal: RF(24),
            marginTop: RF(16),
            paddingBottom: RF(80),
          }}>
          <Text size={18} SFsemiBold color={'#0D47A1'}>
            Hello {rentCar?.ownerFirstName + ' ' + rentCar?.ownerLastName}
          </Text>
          <Text
            size={12}
            SFregular
            color={'#7D7D7D'}
            style={{marginTop: RF(4)}}>
            Welcome Back !
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: RF(24),
            }}>
            <VendorCard
              backgroundColor={'rgba(255, 244, 222, 1)'}
              data={detail?.todayRequestCount}
            />
          </View>
          <HireVsCancelChart detail={detail} />
          {/* <BarChartComponent /> */}
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
      </ScrollView>
      {loading && <CustomLoader />}
      {user?.paidActivation === true ? null : <ActivationCard />}
    </Wrapper>
  );
};

export default RentACar_Home;
