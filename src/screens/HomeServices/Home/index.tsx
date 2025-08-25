import {FlatList, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ChartConfig,
  CustomLoader,
  DocDashboardCard,
  HomeServices_Header,
  Wrapper,
} from '@components';
import {getColorCode} from '@theme';
import {get_Dashboard_Details, margin, Physio_graph} from '@services';
import useStyles from './styles';

const HomeServices_Home = ({navigation}: any) => {
  const styles = useStyles();
  const {dashboard, doctortype, homeGraph} = getColorCode();
  const [loading, setLoading] = useState(false);
  const [dashDetail, setDashDetail] = useState<any>(null);
  const [graph, setGraph] = useState<any>([]);

  const data = [
    {
      id: 0,
      title: `Total${'\n'}Pateints`,
      response: dashDetail?.patientCount,
      percentage: dashDetail?.patientPercentageChange,
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
          navigation={navigation}
          item={dashDetail}
          name={dashDetail?.doctorName}
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
    </ScrollView>
  );
};

export default HomeServices_Home;
