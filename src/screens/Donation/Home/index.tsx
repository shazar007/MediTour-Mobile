import {RF} from '@theme';
import {
  globalStyles,
  donationGRAPH,
  donationTopDonor,
  donationGraphDETAILSUpperPortion,
} from '@services';
import moment from 'moment';
import useStyles from './styles';
import {setChangeColor} from '@redux';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LabBell, LabMenu, dummyProfileIcon} from '@assets';
import {useTheme, useFocusEffect} from '@react-navigation/native';
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {
  Text,
  Wrapper,
  HeaderCard,
  LineCharts,
  CustomLoader,
  EmptyList,
  ActivationCard,
} from '@components';

const DonationHome = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const dispatch: any = useDispatch();
  const [total, setTotal] = useState<any>({});
  const [graph, setGraph] = useState<any>([]);
  const [label, setLabel] = useState<any>([]);
  const [donorList, setDonorList] = useState([]);
  const [loading, setLoading] = useState<any>(false);
  const {B2B} = useSelector((state: any) => state.root.b2b);
  const {authToken, user} = useSelector((state: any) => state.root.user);

  useEffect(() => {
    fetchDashboard_Data();
    fetchTopDonor_Data();
    fetchGraph_Data();
  }, []);

  const fetchDashboard_Data = () => {
    setLoading(true);
    donationGraphDETAILSUpperPortion()
      .then((res: any) => {
        setTotal(res.data);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const fetchTopDonor_Data = () => {
    setLoading(true);
    donationTopDonor()
      .then((res: any) => {
        setDonorList(res?.data?.donations);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const fetchGraph_Data = () => {
    setLoading(true);
    donationGRAPH()
      .then((res: any) => {
        const labels = res?.data?.currentWeekData?.map((item: any) =>
          moment(item?.date).format('ddd'),
        );
        const values = res?.data?.currentWeekData?.map(
          (item: any) => item?.totalAmount,
        );
        setGraph(values);
        setLabel(labels);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setChangeColor(colors.Pharmacy));
    }, []),
  );

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'dark-content'}>
      <HeaderCard
        plusIcon
        twoInRow={true}
        icon1={LabMenu}
        icon2={LabBell}
        numberOfIcons={'3'}
        onPress={openDrawer}
        icon3={dummyProfileIcon}
        cardColor={'transparent'}
        tintColor={colors.primary}
        home
        notify
      />
      <ScrollView>
        <TouchableOpacity style={styles.DesignCard}>
          <Text size={24} SFmedium color={colors.background}>
            {total?.totalAmount}
          </Text>
          <Text
            size={14}
            SFregular
            color={colors.background}
            style={{left: RF(40)}}>
            Total Donations
          </Text>
        </TouchableOpacity>
        <View style={globalStyles.rowSimple}>
          <TouchableOpacity style={styles.DesignCard2nd}>
            <Text size={24} SFmedium color={colors.background}>
              {total?.totalDonors}
            </Text>
            <Text size={14} SFregular color={colors.background}>
              Donated People
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.DesignCard3rd}>
            <Text size={24} SFmedium color={colors.background}>
              {total?.totalPackages}
            </Text>
            <Text size={14} SFregular color={colors.background}>
              Total Packages
            </Text>
          </TouchableOpacity>
        </View>
        {graph.length > 0 && <LineCharts data={graph} label={label} />}

        <View style={styles.maincontainer}>
          <Text size={20} SFbolder color={colors?.bluE}>
            Top Donors
          </Text>
          <FlatList
            data={donorList}
            style={{marginTop: 10}}
            renderItem={({item, index}: any) => {
              return (
                <TouchableOpacity key={index} style={styles.top}>
                  <View style={styles.view}>
                    <Image
                      source={{uri: item?.userId?.userImage}}
                      style={styles.img}
                    />
                    <Text size={16} SFregular color={colors.primary}>
                      {item?.donorName}
                    </Text>
                  </View>
                  <Text size={14} SFregular color={colors.primary}>
                    {item?.donationAmount}
                  </Text>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    height: RF(150),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text size={16} SFsemiBold color={colors?.bluE}>
                    No Data Found!
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <View style={styles.mb} />

        {/* <View style={styles.maincontainer}>
          <Text size={20} SFbolder color={colors?.bluE}>
            Recent Activities
          </Text>
          <FlatList
            data={donorList}
            renderItem={({item, index}: any) => {
              return (
                <TouchableOpacity key={index} style={styles.top}>
                
                  <Text size={16} SFregular color={colors.primary}>
                    {item?.donorName}
                  </Text>
                  <Text size={14} SFregular color={colors.primary}>
                    {item?.donationAmount}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View> */}
      </ScrollView>

      {loading && <CustomLoader />}
      {user?.paidActivation === true ? null : <ActivationCard />}
    </Wrapper>
  );
};
export default DonationHome;
