import {RF} from '@theme';
import {CustomHeader, CustomLoader, EmptyList, Text} from '@components';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import {Wrapper} from '@components';
import {donationGETALLDonations, globalStyles, navigate} from '@services';

const DonationDonors = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState<any>(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchList();
  }, []);
  const fetchList = () => {
    donationGETALLDonations()
      .then((res: any) => {
        setList(res?.data?.donations);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchList();
      setRefreshing(false);
    }, 100);
  };

  // const handleOnPress = (item: any) => {
  //   navigate('Donation_Donors_Detail', {data: item});
  // };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{backgroundColor: '#F5F5F5', flex: 1}}>
        <CustomHeader
          title={'Donors'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <FlatList
          data={list}
          style={{marginTop: RF(20), marginBottom: 100}}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
          renderItem={({item, index}: any) => {
            return (
              <>
                <TouchableOpacity
                  key={index}
                  style={styles.DesignCard}
                  // onPress={() => handleOnPress(item)}
                >
                  <View style={globalStyles.row}>
                    <Text size={14} SFsemiBold color={colors.primary}>
                      {item?.donorName}
                    </Text>
                    <Text size={14} SFregular color={colors.primary}>
                      {item?.mrNo}
                    </Text>
                  </View>
                  <View style={globalStyles.row}>
                    <Text size={14} SFregular color={colors.primary}>
                      {item?.packageId?.donationTitle}
                    </Text>
                    <Text size={14} SFregular color={colors.primary}>
                      {item.gatewayName == 'stripe'
                        ? `$ ${item?.paidByUserAmount?.toFixed(2)}`
                        : `PKR ${item?.paidByUserAmount}`}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            );
          }}
          ListEmptyComponent={() => {
            return <EmptyList />;
          }}
        />
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};
export default DonationDonors;
