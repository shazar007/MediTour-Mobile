import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {FlatList, RefreshControl, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {LabMenu} from '@assets';
import {
  CardList,
  CustomLoader,
  EmptyList,
  Wrapper,
  CustomHeader,
} from '@components';
import {pshychologistPatientsHistory, navigate, navigationRef} from '@services';
import {getColorCode, RF} from '@theme';
import useStyles from './styles';

const All_Patient_History = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const styles: any = useStyles();
  const {colorCode, pateintEhistory} = getColorCode();
  const [allPatients, setAllPatients] = useState([]);
  const [loading, setLoading] = useState<any>(false);
  const {B2B} = useSelector((state: any) => state.root.b2b);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isEndReached, setIsEndReached] = useState(false);

  useEffect(() => {
    fetchAllPatients(page);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setIsEndReached(false);
    setTimeout(() => {
      fetchAllPatients(1, true);
      setRefreshing(false);
    }, 3000);
  };

  const fetchAllPatients = (pageNo: number, isRefreshing = false) => {
    setLoading(true);
    pshychologistPatientsHistory(pateintEhistory, pageNo)
      .then((res: any) => {
        const newPatients = res?.data?.Patients || [];
        if (newPatients.length === 0) {
          setIsEndReached(true);
        } else {
          setAllPatients(
            isRefreshing ? newPatients : [...allPatients, ...newPatients],
          );
          setPage(pageNo);
        }
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  // const loadMorePatients = () => {
  //   if (!loading && !isEndReached) {
  //     fetchAllPatients(page + 1);
  //   }
  // };

  const onOpen = (item: any) => {
    navigate('DOC_HistoryDetails', {
      data: item,
    });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.main}>
        <CustomHeader
          title={'Patient History'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <FlatList
          data={allPatients}
          contentContainerStyle={{paddingBottom: RF(80)}}
          renderItem={({item}: any) => {
            return (
              <CardList
                onPress={() => onOpen(item)}
                title={'Patient ID: ' + item?.mrNo}
                label={'Patient Name: ' + item?.name}
              />
            );
          }}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              // onRefresh={handleRefresh}
              colors={[changeColor, changeColor]}
            />
          }
          ListEmptyComponent={
            loading ? null : <EmptyList description={'No data found'} />
          }
          // onEndReached={loadMorePatients}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading && !refreshing ? <CustomLoader /> : null}
        />
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default All_Patient_History;
