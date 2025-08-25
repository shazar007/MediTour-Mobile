import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {
  Text,
  Wrapper,
  AppButton,
  DropModal,
  HeaderCard,
  UserHeaderContent,
  CustomDropList,
  CustomLoader,
  InsuranceComponent,
  EmptyList,
  CustomHeader,
} from '@components';
import Form from './Form';
import {RF} from '@theme';
import useStyles from './styles';
import {healthCompagin} from '@assets';
import {useTheme} from '@react-navigation/native';
import {
  AddRemovedFev,
  navigate,
  postInsuranceFamily,
  showToast,
  TravelingPlain,
} from '@services';
import {useDispatch, useSelector} from 'react-redux';
import {setFavorites, setUser} from '@redux';
const SingleTripPlain = [
  {id: 1, title: 'Pakistan'},
  {id: 2, title: 'USA'},
  {id: 3, title: 'UK'},
  {id: 4, title: 'Bangladesh'},
  {id: 5, title: 'Italy'},
  {id: 6, title: 'Spain'},
  {id: 7, title: 'Portugal'},
  {id: 9, title: 'Australia'},
  {id: 10, title: 'South Africa'},
  {id: 11, title: 'Sri Lanka'},
  {id: 12, title: 'Spain'},
  {id: 13, title: 'UAE'},
];
const InsurancePlain = ({route}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {downText} = route.params;
  const styles = useStyles(colors);
  const [data, setData] = useState<any>([]);
  const [selected, setSelected] = useState('');
  const [selectItem, setSelectItem] = useState('');
  const dispatch = useDispatch();
  const [passanger, setPassanger] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const {user} = useSelector((state: any) => state.root.user);
  useEffect(() => {
    if (user && user.favourites) {
      dispatch(setFavorites(user.favourites));
    }
  }, [user]);
  const handleItemPress = (item: any) => {
    setSelected(item);
  };
  const hanldeItem = (item: any) => {
    setSelectItem(item);
  };
  const hanldePassanger = (item: any) => {
    setPassanger(item);
  };

  const customOptions = downText === 'Health' && [
    {title: 'Family Plan'},
    {title: 'Individual Plan'},
    {title: 'Parents Plan'},
  ];
  const customOptions2 = downText === 'Travel' && [
    {title: 'Single Trip'},
    {title: 'Multiple Trips'},
  ];

  const addRemovedFvt = (itemId: any, setLoading: any) => {
    setLoading(true);
    const request = {
      type: selected?.toLowerCase(),
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
  useEffect(() => {
    if (downText === 'Health' && selected) {
      setData([]);
      setPage(1);
      InsuranceFamily(1);
    }
  }, [selected]);
  const InsuranceFamily = (pageNumber: any) => {
    setLoading(true);
    let data = {
      page: pageNumber,
    };
    let params: any = {
      planType: selected?.toLowerCase(),
    };
    //
    postInsuranceFamily(data, params)
      .then((res: any) => {
        //
        setData((prevDonorData: any) => [
          ...prevDonorData,
          ...res?.data?.insurances,
        ]);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      InsuranceFamily(page);
      setRefreshing(false);
    }, 3000);
  };
  const loadMoreDonors = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      InsuranceFamily(nextPage); // Trigger the data fetch
      setLoadingMore(false);
    }
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <CustomHeader
          title={downText}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          nestedScrollEnabled={true}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[changeColor, changeColor]}
            />
          }>
          <View style={styles.heightValue}>
            <Text size={20} numberOfLines={1} color={colors.blueText} SFmedium>
              {downText} Insurance Plans
            </Text>
            <CustomDropList
              FormData={customOptions || customOptions2}
              FormName={selected === '' ? 'Please Select Best Plan' : selected}
              selected={selected}
              stateField={handleItemPress}
            />

            {selected === '' && (
              <>
                <View style={styles.ViewStyle}>
                  <Image source={healthCompagin} style={styles.ImageStyle} />
                </View>
                <View style={styles.textStyle}>
                  <Text size={16} SFregular>
                    Get the Best {downText} plan for
                  </Text>
                  <Text size={20} color={colors.blueText} SFmedium>
                    Yourself, Family or Parents
                  </Text>
                </View>
              </>
            )}
            {(selected === 'Family Plan' ||
              selected === 'Individual Plan' ||
              selected === 'Parents Plan') && (
              <>
                <View style={{height: RF(16)}} />
                <FlatList
                  data={data}
                  scrollEnabled={false}
                  onEndReached={loadMoreDonors}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={
                    loadingMore ? <ActivityIndicator /> : null
                  }
                  ListEmptyComponent={!data.length ? <EmptyList /> : null}
                  renderItem={({item}: any) => (
                    <InsuranceComponent
                      item={item}
                      response={selected?.toLowerCase()}
                      handleFavorite={() =>
                        addRemovedFvt(item?._id, setLoading)
                      }
                      screenNavigate={() =>
                        navigate('CompanyDetails', {
                          item: item,
                          type: selected?.toLowerCase(),
                          passanger: passanger,
                        })
                      }
                    />
                  )}
                />
              </>
            )}
            {(selected === 'Single Trip' || selected === 'Multiple Trips') && (
              <>
                <Text
                  size={18}
                  SFmedium
                  color={colors.blueText}
                  style={styles.TrueTextStyle}>
                  Please fill form
                </Text>

                <CustomDropList
                  FormData={SingleTripPlain}
                  FormName={
                    selectItem === '' ? 'Country of Travelling' : selectItem
                  }
                  selected={selectItem}
                  stateField={hanldeItem}
                />
                <CustomDropList
                  FormData={TravelingPlain}
                  FormName={
                    passanger === '' ? 'Passenger Travelling' : passanger
                  }
                  selected={passanger}
                  stateField={hanldePassanger}
                />
                <AppButton
                  title="Search"
                  m_Top={RF(48)}
                  bgClr={changeColor}
                  onPress={() => {
                    if (passanger === '' || selectItem === '') {
                      showToast('error', 'Please fill fields', true);
                    } else {
                      navigate('InsuranceServices', {
                        type: selected,
                        passanger: passanger,
                        selectItem: selectItem,
                      });
                    }
                  }}
                  m_Vertical={RF(4)}
                />
              </>
            )}
          </View>
        </ScrollView>
        {loading && <CustomLoader />}
      </View>
    </Wrapper>
  );
};

export default InsurancePlain;
