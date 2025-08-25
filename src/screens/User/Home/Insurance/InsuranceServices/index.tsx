import {FlatList, RefreshControl, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CustomHeader,
  CustomLoader,
  EmptyList,
  HeaderCard,
  InsuranceComponent,
  UserHeaderContent,
  Wrapper,
} from '@components';
import useStyles from './styles';
import {RF} from '@theme';
import {
  AddRemovedFev,
  navigate,
  postInsuranceFamily,
  postInsuranceFlight,
  showToast,
} from '@services';
import {useDispatch, useSelector} from 'react-redux';
import {setFavorites, setUser} from '@redux';
import {useTheme} from '@react-navigation/native';

const InsuranceServices = ({route}: any) => {
  const {type, selectItem, passanger} = route.params;
  //
  const theme: any = useTheme();
  const colors = theme.colors;
  const [dataArray, setData] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [moreDataLoading, setMoreDataLoading] = useState(false);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const styles = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    postInsuranceTravel(1);
  }, []);

  const postInsuranceTravel = (pageNumber: any) => {
    if (loading || moreDataLoading) return;
    setLoading(pageNumber === 1);
    setMoreDataLoading(pageNumber > 1);

    let data = {
      page: pageNumber,
    };
    let params = {
      planType: type?.toLowerCase(),
      passengerTraveling: passanger.toLowerCase(),
      country: selectItem,
    };

    postInsuranceFlight(data, params)
      .then((res: any) => {
        const newInsurances = res?.data?.insurances;
        setData(
          pageNumber === 1 ? newInsurances : [...dataArray, ...newInsurances],
        ); // Append data for subsequent pages
        setPage(pageNumber); // Update current page
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setMoreDataLoading(false);
      });
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      postInsuranceTravel(1);
      setRefreshing(false);
    }, 3000);
  };
  const handleLoadMore = () => {
    if (!moreDataLoading && dataArray.length > 0) {
      postInsuranceTravel(page + 1); // Load next page
    }
  };
  const addRemovedFvt = (itemId: any, setLoading: any) => {
    setLoading(true);
    const request = {
      type: passanger?.toLowerCase(),
      itemId: itemId,
    };
    AddRemovedFev(request)
      .then((res: any) => {
        showToast('success', res?.data?.message, true);
        dispatch(setUser(res.data?.user));
        dispatch(setFavorites(res?.data?.user.favourites));
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <CustomHeader title={type} leftIcon titleColor={colors.white} notify />

        {loading ? (
          <CustomLoader />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                enabled={true}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[changeColor, changeColor]}
              />
            }>
            <View style={styles.MainView}>
              <FlatList
                scrollEnabled={false}
                data={dataArray}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={moreDataLoading ? <CustomLoader /> : null}
                ListEmptyComponent={dataArray && <EmptyList />}
                renderItem={({item}) => (
                  <View>
                    <InsuranceComponent
                      item={item}
                      response={passanger.toLowerCase()}
                      handleFavorite={() =>
                        addRemovedFvt(item?._id, setLoading)
                      }
                      screenNavigate={() =>
                        navigate('CompanyDetails', {
                          item: item,
                          type: type?.toLowerCase(),
                          passanger: passanger.toLowerCase(),
                        })
                      }
                    />
                  </View>
                )}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </Wrapper>
  );
};

export default InsuranceServices;
