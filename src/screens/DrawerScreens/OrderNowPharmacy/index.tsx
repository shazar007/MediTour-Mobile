import {globalStyle, RF} from '@theme';
import {circum, phone, UserIcon} from '@assets';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, ScrollView, View} from 'react-native';
import {
  margin,
  navigate,
  SECTIONS,
  showToast,
  addPharmacyOrder,
} from '@services';
import useStyles from './styles';
import {
  Text,
  Line,
  AppButton,
  InputData,
  HeaderCard,
  SaveModal,
  CustomLoader,
  MedicineFolder,
  CustomAccordion,
  UserHeaderContent,
} from '@components';
import {setCart} from '@redux';
import {detailProps} from './props';

const OrderNoWPharmacy = ({route}: any) => {
  const {totalPrice, pharmacyName} = route.params;
  const dispatch = useDispatch();
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const [activeSections, setActiveSections] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const {cart, user, pharmacyData, currentLocation, selectedAddress} =
    useSelector((state: any) => state.root.user);

  useEffect(() => {
    if (visible == true) {
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
  }, [visible]);

  const handleSelect = (item: any) => {
    setSelected(item.title);
  };
  const sortedCart = [...cart];
  sortedCart.reverse();

  const orderCart = () => {
    let items: any = [];
    cart.map((i: any) => {
      items.push({
        itemId: i?._id,
        quantity: i?.quantity,
      });
    });
    setLoading(true);
    let params = {
      items: items,
      MR_NO: user?.mrNo,
      totalAmount: totalPrice,
      customerName: user?.name,
      vendorId: pharmacyData?._id,
      currentLocation: selectedAddress,
    };

    addPharmacyOrder(params)
      .then((res: any) => {
        showToast('Order Confirmed!', 'Successful', false);
        dispatch(setCart([]));
        setTimeout(() => {
          navigate('ViewCart');
        }, 1000);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        // setRefreshing(false);
      });
  };

  return (
    <View style={globalStyle.flex}>
      <HeaderCard numberOfIcons={'2'} title={'Continue Booking'}>
        <UserHeaderContent ScreenTitle={'Book Now'} />
      </HeaderCard>

      <ScrollView>
        {/*............................................................ Accordion....................................................................... */}

        <View style={styles.TopView}>
          <CustomAccordion
            data={SECTIONS}
            activeSections={activeSections}
            setActiveSections={setActiveSections}
            renderindex1={() => (
              <>
                <Line />
                <FlatList
                  style={styles.flatlistStyle}
                  scrollEnabled={false}
                  data={sortedCart}
                  renderItem={({item}: any) => {
                    return <MedicineFolder {...detailProps(item)} />;
                  }}
                />
              </>
            )}
            renderindex2={() => (
              <>
                <Line />
                <View style={margin.Horizontal_8}>
                  {/* <Text
                    size={16}
                    SFsemiBold
                    color={colors.blue}
                    style={margin.top_24}>
                    {sortedCart[0]?.generic}
                  </Text>
                  <Text style={margin.top_8}>
                    Shipping to address: 1499 uio streat, 41 second district,
                    Karachi, Pakistan
                  </Text> */}
                  <InputData UserName={user?.name} source={UserIcon} />
                  <InputData UserName={user?.mrNo} source={circum} />
                  <InputData UserName={user?.phone} source={phone} />

                  {/*............................................................ CheckBox....................................................................... */}
                </View>
              </>
            )}
          />
        </View>
        {loading && <CustomLoader />}
      </ScrollView>
      <View style={styles.ViewPrice}>
        <Text color={colors.blue} size={22} SFmedium>
          Total Price
        </Text>
        <Text color={colors.blue} size={22} SFmedium>
          Rs.{totalPrice.toFixed(2)}
        </Text>
      </View>
      <AppButton
        containerStyle={{borderColor: colors.blue, marginBottom: RF(40)}}
        textcolor={colors.blue}
        title="CONFIRM BOOKING"
        // onPress={() => setVisible(true)}
        onPress={orderCart}
      />

      {visible && (
        <SaveModal
          Visible={visible}
          title={'Your Lab order has been Successfully Booked.'}
        />
      )}
    </View>
  );
};

export default OrderNoWPharmacy;
