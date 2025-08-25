import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CustomLoader,
  EmptyList,
  HeaderCard,
  Line,
  Text,
  UserHeaderContent,
} from '@components';
import {country} from '@assets';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import {getAllToursDetails} from '@services';
import {useSelector} from 'react-redux';

const SeeGuestReview = ({route}: any) => {
  const {item} = route.params;
  const [data, setData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const theme: any = useTheme();
  const colors = theme.colors;
  useEffect(() => {
    toursReviewsSystem();
  }, []);
  const toursReviewsSystem = () => {
    setLoading(true);
    const params = {
      vendorId: item?.agencyId,
    };
    getAllToursDetails(params)
      .then((res: any) => {
        setData(res.data.existingRating.ratings);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      toursReviewsSystem();
      setRefreshing(false);
    }, 100);
  };
  return (
    <View style={{flex: 1}}>
      <HeaderCard numberOfIcons={'2'} notify>
        <UserHeaderContent ScreenTitle={'Guest Reviews'} />
      </HeaderCard>
      <ScrollView>
        <View style={styles.Container}>
          <FlatList
            scrollEnabled={false}
            data={data}
            refreshControl={
              <RefreshControl
                enabled={true}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[changeColor, changeColor]}
              />
            }
            ListEmptyComponent={
              <EmptyList
                description={
                  loading ? 'Loading.....' : 'No Suggestion Available'
                }
              />
            }
            renderItem={({item}) => (
              <View style={{marginHorizontal: RF(8), marginVertical: RF(8)}}>
                <View style={styles.ContainerView}>
                  <View style={styles.ViewRow}>
                    <Image
                      source={{
                        uri:
                          item.userImage ||
                          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                      }}
                      style={styles.ImgView}
                    />
                  </View>
                  <View style={styles.Gap}>
                    <Text size={14} SFmedium color={colors.blueText}>
                      {item.userName}
                    </Text>
                    <View style={styles.ViewGap}>
                      <Image source={country} style={styles.Img} />
                      <Text size={12} SFregular color={colors.blueText}>
                        {/* {item?.addresses?.location} */}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text
                  size={12}
                  SFregular
                  color={'#7D7D7D'}
                  style={{marginVertical: RF(8)}}>
                  {item.review}
                </Text>
                {Object.entries(item.tourRating).map(([key, value]) => (
                  <View style={styles.JustifyView} key={key}>
                    <Text size={12} SFregular color={colors.blueText}>
                      {key}
                    </Text>
                    <Text SFregular size={12} color={'#00276D'}>
                      {value} / 5
                    </Text>
                  </View>
                ))}
                <Line mt={RF(8)} colors={'#7D7D7D'} />
              </View>
            )}
          />
        </View>
        {loading && <CustomLoader />}
      </ScrollView>
    </View>
  );
};

export default SeeGuestReview;

const styles = StyleSheet.create({
  ContainerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Container: {
    marginHorizontal: RF(16),
    marginVertical: RF(24),
    paddingBottom: RF(80),
  },
  ViewRow: {
    width: RF(48),
    height: RF(48),
    borderRadius: RF(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    elevation: 5,
    overflow: 'hidden',
  },
  ImgView: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  Gap: {gap: RF(8), marginLeft: RF(8)},
  ViewGap: {flexDirection: 'row', alignItems: 'center', gap: RF(8)},
  Img: {
    width: RF(16),
    height: RF(16),
    resizeMode: 'contain',
    borderRadius: RF(32),
  },
  JustifyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: RF(8),
  },
});
