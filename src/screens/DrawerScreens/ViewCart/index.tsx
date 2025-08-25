import {
  Text,
  AppButton,
  EmptyList,
  HeaderCard,
  MedicineFolder,
  UserHeaderContent,
  CustomLoader,
  CustomHeader,
} from '@components';
import {RF} from '@theme';
import {drawer} from '@assets';
import {setAmount, setCart, setStripeObj} from '@redux';
import useStyles from './styles';
import {GAP, navigate, rs} from '@services';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, RefreshControl, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

const ViewCart = ({navigation}: any) => {
  const styles = useStyles();
  const theme: any = useTheme();
  const colors = theme?.colors;
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const {cart, currentLocation, user, pharmacyData} = useSelector(
    (state: any) => state.root.user,
  );
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item: any) => {
      totalPrice += item?.quantity * item?.tpPrice;
    });
    return totalPrice;
  };

  useEffect(() => {
    const calculatedTotalPrice = calculateTotalPrice();
    setTotalPrice(calculatedTotalPrice);
  }, [cart]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  const handleValue = (value: any, item: any) => {
    const myArray = JSON.parse(JSON.stringify(cart));
    let objIndex = myArray.findIndex((obj: any) => obj?._id == item?._id);
    myArray[objIndex].quantity = value;
    const filteredCart = myArray.filter((item: any) => item?.quantity > 0);
    dispatch(setCart(filteredCart));
  };
  const confirmation = () => {
    setLoading(true);

    setTimeout(async () => {
      await dispatch(
        setStripeObj({
          cart: cart,
        }),
      ),
        await dispatch(setAmount(totalPrice)),
        setLoading(false);

      navigate('StripeAlFalah', {
        type: 'pharmacy',
        actualAmount: totalPrice,
      });
    }, 2000);
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title={'Cart'}
        leftIcon={'back'}
        titleColor={colors.white}
        notify
      />

      <View style={{flex: 1}}>
        <FlatList
          data={cart}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: rs(16), gap: GAP?._16}}
          style={{
            paddingBottom: 150,
          }}
          renderItem={({item}: any) => {
            return (
              <View style={styles.card}>
                <MedicineFolder
                  quantity
                  item={item}
                  restrict={'0'}
                  color={'#099BED'}
                  Packet={'- Per Pack'}
                  value={item?.quantity}
                  setValue={handleValue}
                  MG={item?.tpPrice}
                  MedicineName={item?.productName}
                  MedicinePrice={item?.strength}
                  containerStyle={{marginTop: 0}}
                  MedicineBrand={item?.brand}
                  MedicineImage={item?.medicineImage}
                />
              </View>
            );
          }}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[changeColor, changeColor]}
            />
          }
          ListEmptyComponent={
            loading ? null : (
              <View style={{height: 500}}>
                <EmptyList />
              </View>
            )
          }
          ListFooterComponent={
            cart[0]?.quantity && (
              <>
                <View style={styles.heightStyles}>
                  <View style={styles.ViewPrice}>
                    <Text color={'#099BED'} size={22} SFmedium>
                      Total Price
                    </Text>
                    <Text color={'#099BED'} size={22} SFmedium>
                      Rs.{totalPrice.toFixed(2)}
                    </Text>
                  </View>
                  <AppButton
                    lodingColor={'#fff'}
                    containerStyle={{borderColor: '#099BED', marginBottom: 50}}
                    textcolor={'#fff'}
                    loading={loading}
                    title="Confirmation"
                    m_Top={RF(24)}
                    onPress={confirmation}
                  />
                </View>
              </>
            )
          }
        />
      </View>
    </View>
  );
};

export default ViewCart;
