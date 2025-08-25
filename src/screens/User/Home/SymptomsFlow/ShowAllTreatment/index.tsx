import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomHeader, CustomLoader, Text, Wrapper} from '@components';
import {getTreatments, navigate, rs, rv} from '@services';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';

const ShowAllTreatment = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    showAll(page);
  }, [page]);

  const showAll = (pageNumber: number) => {
    setLoading(pageNumber === 1);
    setIsFetchingMore(pageNumber > 1);

    let params = {
      page: pageNumber,
    };

    getTreatments(params)
      .then((res: any) => {
        if (pageNumber === 1) {
          setData(res.data?.categories);
        } else {
          setData((prevData: any) => [...prevData, ...res.data?.categories]);
        }

        if (!res.data?.nextPage) {
          setHasMore(false);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setIsFetchingMore(false);
      });
  };

  const loadMoreData = () => {
    if (hasMore && !isFetchingMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'All Treatments'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <FlatList
          data={data}
          scrollEnabled={true}
          numColumns={2}
          contentContainerStyle={{
            paddingBottom: RF(80),
            gap: rs(16),
            padding: rs(16),
          }}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
          renderItem={({item}: any) => (
            <Pressable
              onPress={() => navigate('SubCategoryTreatment', {item})}
              style={({pressed}) => [
                styles.card,
                {
                  backgroundColor: pressed ? colors.lightBackground : '#fff',
                  shadowColor: pressed ? 'transparent' : colors.shadowColor,
                },
              ]}
              android_ripple={{
                color: colors.lightPrimary,
                borderless: false,
                radius: rs(90),
              }}>
              <Text style={styles.cardText}>{item?.categoryName}</Text>
            </Pressable>
          )}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingMore ? <CustomLoader /> : null}
        />
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default ShowAllTreatment;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: rs(12),
    padding: rs(12),
    marginVertical: rs(8),
    shadowOffset: {width: 0, height: rs(2)},
    shadowOpacity: 0.2,
    shadowRadius: rs(4),
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: rs(14),
    fontFamily: 'SF-Pro-Text-Medium',
    color: '#000',
    textAlign: 'center',
  },
});
