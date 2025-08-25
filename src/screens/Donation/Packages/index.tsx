import {
  navigate,
  donationGETALLCriteria,
  donationGETALL_Packages,
} from '@services';
import {RF} from '@theme';
import useStyles from './styles';
import {useSelector} from 'react-redux';
import {CustomHeader, CustomLoader, Text} from '@components';
import {LabBell, LabMenu, drImg} from '@assets';
import FastImage from 'react-native-fast-image';
import React, {useState, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {FlatList, Image, Pressable, RefreshControl, View} from 'react-native';
import {Wrapper, AppButton, HeaderCard, UserHeaderContent} from '@components';

const DonationPackages = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [_index, setIndex] = useState<any>();
  const [criteria, setCriteria] = useState<any>([]);
  const [packages, setPackages] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [refreshing, setRefreshing] = useState(false);
  const {img} = useSelector((state: any) => state.root.b2b);
  const [add_Criteria, setAdd_Criteria] = useState<any>(false);

  useEffect(() => {
    fetchCriteria();
    fetch_All_Packages();
  }, []);
  const fetchCriteria = () => {
    setLoading(true);
    donationGETALLCriteria()
      .then((res: any) => {
        setCriteria(res?.data?.criterion);
        setAdd_Criteria(false);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };
  const fetch_All_Packages = () => {
    setLoading(true);
    donationGETALL_Packages()
      .then((res: any) => {
        setPackages(res?.data?.packages);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };
  const onOpen_Add_Packages = () => {
    // modalizeRef.current?.open();
    navigate('Donation_Add_Criteria', {item: '', type: 'add'});
  };
  const openDrawer = () => {
    // navigationRef?.current?.goBack();
    navigation.openDrawer();
  };
  const handleRefresh = () => {
    setRefreshing(true);
    fetch_All_Packages();
  };
  const onOpenDetail = (item: any) => {
    navigate('Donation_Package_Detail', {item: item});
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Packages'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <FlatList
        data={packages}
        style={{marginTop: 20}}
        contentContainerStyle={{paddingBottom: 80}}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        renderItem={({item, index}: any) => {
          let image: any = '';
          {
            item?.images.map((i: any) => {
              image = i;
            });
          }
          return (
            <Pressable style={styles.press} onPress={() => onOpenDetail(item)}>
              <FastImage source={{uri: image}} style={styles.image} />
              <View style={{marginLeft: RF(10)}}>
                <Text color={colors?.bluE} size={14} SFmedium>
                  {item?.donationTitle}
                </Text>
                <Text color={colors?.bluE} size={12} SFregular>
                  {item?.targetAudience}
                </Text>
                <Text color={colors?.bluE} size={12} SFregular>
                  Amount: {item?.requiredAmount}
                </Text>
                <Text color={colors?.bluE} size={12} SFregular>
                  Days: {item?.totalDays}
                </Text>
              </View>
            </Pressable>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <View style={styles.empty}>
              <Image source={drImg} style={styles.emptyImg} />
            </View>
          );
        }}
      />

      <View style={styles._button}>
        <AppButton
          bgClr={'#F4EFFF'}
          title="Add Package"
          textcolor={colors?.bluE}
          onPress={onOpen_Add_Packages}
        />
      </View>

      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default DonationPackages;
