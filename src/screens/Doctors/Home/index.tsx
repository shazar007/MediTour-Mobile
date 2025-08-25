import {ColorValue, FlatList, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivationCard,
  ChartConfig,
  CustomLoader,
  DocDashboardCard,
  HomeServices_Header,
  Text,
  Wrapper,
} from '@components';
import {getColorCode} from '@theme';
import {
  get_Dashboard_Details,
  margin,
  navigate,
  Physio_graph,
  rv,
} from '@services';
import useStyles from './styles';
import {useSelector} from 'react-redux';
import DropdownAlert, {
  DropdownAlertColor,
  DropdownAlertData,
  DropdownAlertProps,
  DropdownAlertType,
} from 'react-native-dropdownalert';
import {Alert} from '@utils';
const DoctorHome = ({navigation}: any) => {
  const styles = useStyles();
  const {dashboard, doctortype, homeGraph} = getColorCode();
  const [loading, setLoading] = useState(false);
  const [dashDetail, setDashDetail] = useState<any>(null);
  const [graph, setGraph] = useState<any>([]);
  const {user} = useSelector((state: any) => state.root.user);

  const {B2B} = useSelector((state: any) => state?.root?.b2b);
  let info: any = B2B?.doctor;

  const data = [
    {
      id: 0,
      title: `Total${'\n'}Pateints`,
      response: dashDetail?.patientCount,
    },
    {
      id: 1,
      title: `Total${'\n'}Appointments`,
      response: dashDetail?.appointmentCount,
      percentage: dashDetail?.appointmentPercentageChange,
    },
    {
      id: 2,
      title: `Waiting${'\n'}Pateints`,
      response: dashDetail?.waitingPatients,
      percentage: dashDetail?.waitingPercentageChange,
    },
    {
      id: 3,
      title: 'Cured Pateints',
      response: dashDetail?.curedPatientCount,
      percentage: dashDetail?.curedPercentageChange,
    },
  ];

  useEffect(() => {
    fetchDashBoard();
    fetchGraph_Data();
  }, []);

  const fetchDashBoard = () => {
    setLoading(true);
    let params = {
      duration: 'week',
      doctorType: doctortype,
    };
    get_Dashboard_Details(params, dashboard)
      .then((res: any) => {
        setDashDetail(res?.data);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchGraph_Data = () => {
    setLoading(true);
    Physio_graph(homeGraph)
      .then((res: any) => {
        setGraph(res?.data);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView>
      <Wrapper
        statusBarBagColor={'transparent'}
        statusBarStyle={'light-content'}>
        <HomeServices_Header
          home
          notify
          onOpen={() => navigate('Notifications')}
          item={dashDetail}
          name={info?.name}
          navigation={navigation}
          logo={
            info?.doctorImage ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU'
          }
        />

        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={data}
          style={margin?.Vertical_16}
          contentContainerStyle={styles?.flatListContainer}
          renderItem={({item}: any) => {
            return (
              <DocDashboardCard
                name={item?.response}
                title={item?.title}
                percentage={item?.percentage}
              />
            );
          }}
        />
        <View style={styles?.chartView}>
          <ChartConfig graphData={graph} />
        </View>
      </Wrapper>
      {loading && <CustomLoader />}
      {/* <DropdownAlert
        alert={func => {
          // Save the alert function so you can control it later
          Alert.alertObj = func;
        }}
        dismissInterval={0} // This ensures the alert doesn't dismiss automatically
        safeViewStyle={{
          height: '100%',
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
        activeStatusBarStyle={'default'}
        inactiveStatusBarStyle={'default'}
        updateStatusBar={false}
        children={<ActivationCard />}
      /> */}
      {user?.paidActivation === true ? null : <ActivationCard />}
    </ScrollView>
  );
};

export default DoctorHome;
