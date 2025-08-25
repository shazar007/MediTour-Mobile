import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Card,
  CardComponent,
  CustomHeader,
  CustomLoader,
  EmptyList,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import useStyles from './styles';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import {
  getSpecialtiesDoctor,
  getveriable,
  navigate,
  padding,
  rs,
  topViewTreatments,
} from '@services';
import {Right} from '@assets';
import {useSelector} from 'react-redux';

const SymptomsAll = ({route}: any) => {
  const {specialityTitle, type, item} = route.params;
  //
  const theme: any = useTheme();
  const colors = theme.colors;
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [indicatorLoader, setIndicatorLoader] = useState(false);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const styles = useStyles();
  useEffect(() => {
    !indicatorLoader && setLoading(true);
    if (type === 'All') {
      allFetch();
    } else {
      treatment();
    }
  }, [page]);

  const treatment = () => {
    let params = {
      name: specialityTitle?.toUpperCase(),
      page: page,
    };
    //
    topViewTreatments(params)
      .then((res: any) => {
        //
        if (res?.data?.nextPage) {
          setNextPage(res?.data?.nextPage);
        }
        if (page > 1) {
          let newArr = data.concat(res?.data?.doctors);
          setData(newArr);
        } else {
          setData(res.data?.doctors);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setIndicatorLoader(false);
      });
  };
  const allFetch = () => {
    let paging = {
      page: page,
    };
    let params = {
      treatmentId: item?._id,
    };
    getveriable(paging, params)
      .then((res: any) => {
        //
        if (res?.data?.nextPage) {
          setNextPage(res?.data?.nextPage);
        }
        if (page > 1) {
          let newArr = data.concat(res?.data?.doctors);
          setData(newArr);
        } else {
          setData(res.data?.doctors);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setIndicatorLoader(false);
      });
  };

  const fetchNextPage = () => {
    if (nextPage && page < nextPage) {
      setPage(page + 1);
      setIndicatorLoader(true);
    }
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      treatment();
      setPage(1);
      setRefreshing(false);
    }, 100);
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={specialityTitle}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <FlatList
        onEndReached={fetchNextPage}
        ListFooterComponent={
          <ActivityIndicator
            animating={indicatorLoader}
            style={{marginTop: 20}}
          />
        }
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[changeColor, changeColor]}
          />
        }
        ListEmptyComponent={
          <EmptyList description={loading ? 'Loading.....' : 'No data found'} />
        }
        data={data}
        contentContainerStyle={{
          paddingBottom: 80,
          padding: rs(16),
          gap: rs(8),
        }}
        renderItem={({item}: any) => {
          return (
            <CardComponent
              Size={9}
              showValues
              RatingTrue
              item={item}
              rate={item?.doctor?.averageRating}
              isVerify
              name={item?.doctor?.name}
              style={styles.card}
              color={colors.blueText}
              title2={item?.doctor?.speciality?.join(' ')}
              title3={item?.doctor?.qualifications}
              logo={{
                uri:
                  item?.doctor?.doctorImage ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
              }}
              onPress={() =>
                navigate('UserDoctorDetails', {
                  item: item?.doctor,
                  type: 'doctor',
                  doctorType: 'treatment',
                })
              }
            />
          );
        }}
      />
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default SymptomsAll;
