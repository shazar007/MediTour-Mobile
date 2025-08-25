import {FlatList, Image, ScrollView, View} from 'react-native';
import React, {useMemo} from 'react';
import {HeaderCard, Text, UserHeaderContent, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {RF} from '@theme';
import moment from 'moment';
const OrderDetails = ({route}: any) => {
  const {item, name} = route.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const formattedDateTime = useMemo(() => {
    return moment(item.createdAt).format('M/D/YYYY, h:mmA');
  }, [item.createdAt]);
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <HeaderCard numberOfIcons={'2'} notify>
          <UserHeaderContent ScreenTitle={name} />
        </HeaderCard>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text size={16} SFmedium color={colors.primary}>
                Order iD:{' '}
                <Text size={14} SFregular color={colors.primary}>
                  {item?.orderId}
                </Text>
              </Text>
              <View style={{marginTop: RF(5)}}>
                <Text size={9} color={colors.primary} SFmedium>
                  {formattedDateTime}
                </Text>
                <Text
                  center
                  size={14}
                  color={item?.status == 'pending' ? 'red' : colors.primary}
                  SFmedium>
                  {item?.status}
                </Text>
              </View>
            </View>
            <Image source={{uri: item?.vendorId?.logo}} style={styles.image} />
            <Text size={16} SFsemiBold color={colors.primary}>
              Selected items
            </Text>
            <FlatList
              scrollEnabled={false}
              data={item.items}
              renderItem={({item}: any) => {
                return (
                  <View style={styles.itemContainer}>
                    <View style={styles.itemHeader}>
                      <View style={styles.content}>
                        <Text size={12} SFbold color={colors.primary}>
                          {item?.itemId.testName || item?.itemId?.generic} -{' '}
                          <Text size={9} SFmedium color={colors.primary}>
                            {item?.itemId?.testCode || item?.itemId?.medCode}
                          </Text>
                        </Text>
                        <Text
                          size={12}
                          SFbold
                          color={colors.primary}
                          style={{marginLeft: RF(16)}}>
                          x{item?.quantity}{' '}
                        </Text>
                        {item?.itemId?.categoryName ? null : (
                          <Text size={9} SFmedium color={colors.primary}>
                            pack
                          </Text>
                        )}
                      </View>
                      <Text size={14} SFmedium color={colors.primary}>
                        Rs.
                        {item?.itemId?.price || item?.itemId?.actualPrice}
                      </Text>
                    </View>

                    {item?.itemId?.medicineBrand ? (
                      <View style={styles.itemHeader}>
                        <View style={styles.content}>
                          <Text size={12} SFmedium color={colors.primary}>
                            Brand -{' '}
                            <Text size={9} SFmedium color={colors.primary}>
                              {item?.itemId?.medicineBrand}
                            </Text>
                          </Text>
                          <Text
                            size={12}
                            SFmedium
                            color={colors.primary}
                            style={{marginLeft: RF(16)}}>
                            Type -{' '}
                            <Text size={9} SFmedium color={colors.primary}>
                              {item?.itemId?.medicineType}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <Text size={12} SFregular color={'#465C67'}>
                        {item.itemId.medicineBrand}
                      </Text>
                    )}

                    <Text size={12} SFregular color={'#465C67'}>
                      {item.itemId.testDescription}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.TotalBill}>
          <Text size={18} SFmedium color={colors.primary}>
            Total Amount
          </Text>
          <Text size={18} SFmedium color={colors.primary}>
            Rs.{item?.totalAmount}
          </Text>
        </View>
      </View>
    </Wrapper>
  );
};
export default OrderDetails;
