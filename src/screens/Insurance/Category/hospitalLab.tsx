import {RF} from '@theme';
import {
  Text,
  Wrapper,
  AppButton,
  CustomLoader,
  SelectButton,
  EmptyList,
  CustomHeader,
} from '@components';
import useStyles from './styles';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  View,
} from 'react-native';
import {RouteProp, useTheme} from '@react-navigation/native';
import {_gender, navigate, showToast} from '@services';
import {useDispatch, useSelector} from 'react-redux';
import {setHealth} from '@redux';
import {getAll_Hospital, getAllLabs} from './function';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      item?: any;
      pckg?: any;
    };
  }>;
}

const Haelth_Category_Hos_Lab = (props: Props, navigation: any) => {
  const {item, pckg} = props.route?.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const dispatch: any = useDispatch();
  const [labs, setLabs] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState<any>(-1);
  const [type, setType] = useState<any>('hospital');
  const [hospital, setHospital] = useState<any>([]);
  const [selectedLabs, setSelectedLabs] = useState<any>([]);
  const {health} = useSelector((state: any) => state.root.b2b);
  const [selectedHospitals, setSelectedHospitals] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [indicator, setIndicator] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const hospitalParams: any = {
    allHospital: {
      search: '',
      page: page,
    },
    other_HospitalParams: {
      setHospitalData: setHospital,
      setRefreshing: setRefreshing,
      setLoading: setLoading,
      setNextPage: setNextPage,
      setIndicator: setIndicator,
      hospitalData: hospital,
      page: page,
    },
  };
  const laborteryParams: any = {
    allLab: {
      search: '',
      page: page,
    },
    other_allLab: {
      setHospitalData: setLabs,
      setRefreshing: setRefreshing,
      setLoading: setLoading,
      setNextPage: setNextPage,
      setIndicator: setIndicator,
      hospitalData: labs,
      page: page,
    },
  };
  const getHospitalList = () => {
    getAll_Hospital(hospitalParams);
  };
  const getLabs = () => {
    getAllLabs(laborteryParams);
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      if (type == 'hospital') {
        getHospitalList();
        setPage(1);
      }
      if (type == 'labs') {
        getLabs();
        setPage(1);
      }
      setRefreshing(false);
    }, 100);
  };
  useEffect(() => {
    if (type == 'hospital') {
      getHospitalList();
      setPage(1);
    }
    if (type == 'labs') {
      getLabs();
      setPage(1);
    }
  }, [page, type]);

  const onSelect_Hospital = (item: any, index: any) => {
    setSelect(index);
    const selected = selectedHospitals.includes(item._id);

    if (selected) {
      setSelectedHospitals(
        selectedHospitals.filter((i: any) => i !== item._id),
      );
    } else {
      setSelectedHospitals([...selectedHospitals, item._id]);
    }
  };
  const onSelect_Labs = (item: any, index: any) => {
    setSelect(index);
    const selected = selectedLabs.includes(item._id);
    if (selected) {
      setSelectedLabs(selectedLabs.filter((i: any) => i !== item._id));
    } else {
      setSelectedLabs([...selectedLabs, item._id]);
    }
  };
  const onSave = () => {
    if (type == 'hospital') {
      if (selectedHospitals.length === 0) {
        showToast('Error', 'Please select at least one hospital', false);
        return;
      }
      setType('labs');
    } else {
      if (selectedLabs.length === 0) {
        showToast('Error', 'Please select at least one lab', false);
        return;
      }
      let obj = {
        ...health,
        labs: selectedLabs,
        hospitals: selectedHospitals,
      };
      dispatch(setHealth(obj));
      navigate('Category_Benefits', {pckg: pckg});
    }
  };
  const fetchNextPage = () => {
    if (nextPage && page < nextPage) {
      setPage(page + 1);
      setIndicator(true);
    }
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader title={pckg} leftIcon titleColor={'#fff'} notify />

      <View style={{marginHorizontal: RF(20), marginTop: RF(16)}}>
        <Text size={18} SFsemiBold color={colors?.bluE}>
          {type == 'hospital' ? ' Hospitals' : 'Labs'}
        </Text>
      </View>

      <View style={styles.outer}>
        <FlatList
          data={type == 'hospital' ? hospital : labs}
          style={styles.inner}
          showsVerticalScrollIndicator={false}
          onEndReached={fetchNextPage}
          nestedScrollEnabled
          ListFooterComponent={
            <ActivityIndicator size={'large'} animating={indicator} />
          }
          renderItem={({item, index}: any) => {
            return (
              <View style={styles.main}>
                <View style={styles._view}>
                  <Image source={{uri: item?.logo}} style={styles.img} />
                  <Text>{item?.name}</Text>
                  <SelectButton
                    onSelect={
                      type == 'labs'
                        ? () => onSelect_Labs(item, index)
                        : () => onSelect_Hospital(item, index)
                    }
                    select={
                      type == 'labs' && selectedLabs.includes(item._id)
                        ? true
                        : selectedHospitals.includes(item._id)
                        ? true
                        : false
                    }
                  />
                </View>
                <View style={styles.line} />
              </View>
            );
          }}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
          ListEmptyComponent={
            <EmptyList
              description={loading ? 'Loading.....' : 'No data found'}
            />
          }
        />
      </View>

      <View style={styles.view}>
        <AppButton
          size={14}
          onPress={onSave}
          title={type == 'hospital' ? 'Save Hospitals' : 'Save Labs'}
        />
      </View>

      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default Haelth_Category_Hos_Lab;
