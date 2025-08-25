import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppButton,
  CustomHeader,
  CustomLoader,
  DonarComponent,
  DonationCard,
  EmptyList,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import {getColorCode, RF} from '@theme';
import {getRecentDonor, navigate, rs, rv} from '@services';
import useStyles from './styles';
import {donationList, getDonationNeedy, getListCompany} from './functionProps';
import {donation_card} from '@assets';
import {Alert} from '@utils';

const UserDonation = () => {
  const [showMore, setShowMore] = useState(false);
  const [data, setData] = useState<any>([]);
  const [donorData, setDonor] = useState<any>([]);
  const [companyData, setCompanyData] = useState<any>([]);
  const [needyPeople, setNeedyPeople] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const [page, setPage] = useState(1);
  const styles = useStyles();
  const theme: any = useTheme();
  const colors = theme.colors;
  const {width} = Dimensions.get('window');
  const sliceData = companyData.slice(0, 4);
  const {colorCode} = getColorCode();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await getListCompany(otherParams);
        await donationList(otherParams);
        await getDonationNeedy(otherParams);
        await getDonorDonation(page);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (page > 1) {
      getDonorDonation(page);
    }
  }, [page]);

  const otherParams = {
    setData: setData,
    setCompanyData: setCompanyData,
    setNeedyPeople: setNeedyPeople,
  };

  const handleItemPress = (item: any) => {
    navigate('UserDonationPak', {item: item});
  };
  const getDonorDonation = async (pageNumber: number) => {
    let params = {
      page: pageNumber,
    };
    try {
      const res = await getRecentDonor(params);

      if (res?.data?.nextPage) {
        setNextPage(res?.data?.nextPage);
      }
      if (page > 1) {
        let newArr = donorData.concat(res?.data?.donations);
        setDonor(newArr);
      } else {
        setDonor(res?.data?.donations);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const loadMoreDonors = () => {
    if (nextPage && page < nextPage) {
      setLoadingMore(true);
      setPage(page + 1);
      setLoadingMore(false);
    }
  };

  const handleOpenLink = async () => {
    const url = 'https://meditour.global/services/donation';
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.showError("Can't open this URL");
    }
  };

  return (
    <>
      {Platform.OS === 'ios' ? (
        <View
          style={{
            flex: 1,
          }}>
          <CustomHeader
            title={'Donation'}
            leftIcon
            titleColor={colors.white}
            notify
          />

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: rs(16),
              // height: RF(391),
              // width: '100%',
            }}>
            <View
              style={{
                height: 'auto',
                width: '100%',
                borderRadius: rs(24),
                backgroundColor: colors.white,
                paddingBottom: rv(16),
              }}>
              {/* donation_card */}
              <Image
                source={donation_card}
                style={{
                  height: rv(220),
                  width: '100%',
                  borderTopLeftRadius: rs(24),
                  borderTopRightRadius: rs(24),
                }}
              />

              <View style={{top: 20, paddingHorizontal: rs(12)}}>
                <Text
                  size={12}
                  style={{fontWeight: '700'}}
                  color={colors.blueText}>
                  Foundation
                </Text>
                <Text
                  size={10}
                  style={{fontWeight: '400', top: rv(8), lineHeight: rv(14)}}
                  color={colors.text}>
                  The organization is a humanitarian non-profit dedicated to
                  social welfare. Established in the early 1950s by a
                  compassionate individual, it has been committed to providing
                  aid and support to those in need. The founder led the
                  organization until their passing in the mid-2010s. A trained
                  nurse played a key role in managing its maternity and adoption
                  services.
                </Text>
              </View>

              <AppButton
                title="Donate"
                m_Top={rv(40)}
                bgClr={'#E25D5D'}
                onPress={handleOpenLink}
              />
            </View>
          </View>
        </View>
      ) : (
        <Wrapper
          statusBarBagColor={'transparent'}
          statusBarStyle={'light-content'}>
          <View style={styles.view}>
            <CustomHeader
              title={'Donation'}
              leftIcon
              titleColor={colors.white}
              notify
            />

            <ScrollView>
              <View style={{marginBottom: RF(80)}}>
                <View style={{marginHorizontal: rs(16), marginTop: rs(16)}}>
                  <Text size={18} SFmedium color={colors.blueText}>
                    Need to Help
                  </Text>
                </View>
                <View style={{justifyContent: 'center', marginTop: RF(12)}}>
                  <Carousel
                    data={data}
                    ListEmptyComponent={
                      <EmptyList
                        height
                        description={
                          loading ? 'Loading.....' : 'No Company Available'
                        }
                      />
                    }
                    renderItem={({item}: any) => <DonationCard item={item} />}
                    firstItem={0}
                    loop={true}
                    autoplay={true}
                    autoplayInterval={2000}
                    inactiveSlideScale={0.84}
                    sliderWidth={width}
                    inactiveSlideOpacity={0.6}
                    itemWidth={width * 0.55}
                    slideStyle={styles.slideStyles}
                  />
                </View>
                <View style={{marginHorizontal: rs(16), marginTop: RF(12)}}>
                  <View style={styles.ViewMoreStyle}>
                    <Text size={18} SFmedium color={colors.blueText}>
                      Explore Packages
                    </Text>
                    <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                      <Text
                        size={12}
                        SFregular
                        color={colors.blueText}
                        style={{textDecorationLine: 'underline'}}>
                        {showMore ? 'See Less' : 'See More'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    scrollEnabled={false}
                    data={showMore === true ? companyData : sliceData}
                    numColumns={4}
                    ListEmptyComponent={
                      <EmptyList
                        height
                        description={
                          loading ? 'Loading.....' : 'No Packages Available'
                        }
                      />
                    }
                    columnWrapperStyle={{justifyContent: 'space-evenly'}}
                    contentContainerStyle={{
                      width: '100%',
                    }}
                    renderItem={({item}) => {
                      return (
                        <View style={styles.gapView}>
                          <TouchableOpacity
                            onPress={() => handleItemPress(item)}
                            style={[
                              styles.TouchableStyle,
                              {
                                borderColor: '#E25D5D',
                              },
                            ]}>
                            {item?.criteriaDetails?.map(
                              (i: any, index: any) => (
                                <Image
                                  key={index}
                                  source={{
                                    uri:
                                      i?.image ||
                                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                                  }}
                                  style={[styles.ImageViewStyle]}
                                />
                              ),
                            )}
                          </TouchableOpacity>
                          <Text
                            size={12}
                            SFregular
                            color={colors.blueText}
                            style={{width: RF(68)}}>
                            {item.criteriaName}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
                <View style={styles.ViewDonorStyle}>
                  <Text size={18} SFmedium color={colors.blueText}>
                    Recent Donors
                  </Text>
                  <DonarComponent
                    data={donorData}
                    loading={loading}
                    onEndReached={loadMoreDonors}
                    loadingMore={loadingMore}
                  />
                </View>
              </View>
            </ScrollView>

            {loading && <CustomLoader />}
          </View>
        </Wrapper>
      )}
    </>
  );
};

export default UserDonation;
