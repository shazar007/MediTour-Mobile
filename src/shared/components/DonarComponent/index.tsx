import {
  FlatList,
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import EmptyList from '../emptyComponent';
import {rv} from '@services';
import {useSelector} from 'react-redux';

interface Props {
  data?: any;
  loading?: any;
  onEndReached?: () => void;
  loadingMore?: boolean;
}

const DonarComponent = (props: Props) => {
  const {data, loading, onEndReached, loadingMore} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const {exchangeRate} = useSelector((state: any) => state.root.user);
  return (
    <FlatList
      data={data}
      nestedScrollEnabled
      style={{maxHeight: rv(500)}}
      ListEmptyComponent={
        <EmptyList
          height
          description={loading ? 'Loading.....' : 'No List Available'}
        />
      }
      renderItem={({item}: any) => {
        const STRIPE = item?.gatewayName === 'stripe' ? true : false;
        const DONAR_AMOUNT = STRIPE
          ? item?.paidByUserAmount * exchangeRate
          : item?.paidByUserAmount;
        const CURRENCY = STRIPE ? '$ ' : 'PKR ';

        return (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: RF(16),
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{
                    uri:
                      item?.userId?.userImage ||
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                  }}
                  style={{
                    width: RF(32),
                    height: RF(32),
                    resizeMode: 'contain',
                    borderRadius: RF(100),
                  }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: RF(8),
                    gap: RF(4),
                    width: RF(110),
                  }}>
                  <Text
                    size={16}
                    SFregular
                    color={colors.blueText}
                    numberOfLines={1}>
                    {item?.donorName}
                  </Text>
                  <Text
                    size={12}
                    SFregular
                    color={colors.blueText}
                    numberOfLines={1}>
                    {item.donationPurpose}
                  </Text>
                </View>
              </View>
              <Text size={14} SFsemiBold color={'rgba(226, 93, 93, 1)'}>
                {CURRENCY + DONAR_AMOUNT?.toFixed(2)}
              </Text>
            </View>
            {/* <Text size={14} SFsemiBold color={'rgba(226, 93, 93, 1)'}>
              {item.donationAmount
                ? `RS.${item.donationAmount.toLocaleString()}`
                : 'not'}
            </Text> */}
          </>
        );
      }}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
    />
  );
};

export default DonarComponent;

const styles = StyleSheet.create({});
