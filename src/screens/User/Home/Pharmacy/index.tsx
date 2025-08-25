// import React from 'react';
// import {GetNearbyAll} from '@components';
// import {StyleSheet, Text, View} from 'react-native';

// const UserPharmacy = () => {
//   return (
//     <>
//       <GetNearbyAll type={'pharmacy'} />
//     </>
//   );
// };

// export default UserPharmacy;

// const styles = StyleSheet.create({});

import {
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  AppButton,
  CustomHeader,
  CustomLoader,
  CustomModalize,
  EmptyList,
  HeaderCard,
  LoginReminder,
  MedicineFolder,
  SearchInput,
  Text,
  UserHeaderContent,
} from '@components';
import {getMedicineNear, rs, rv, searchProduct} from '@services';
import {RF} from '@theme';
import {useSelector, useDispatch} from 'react-redux';
import {Modalize} from 'react-native-modalize';
import {setCart, setPharmacyData} from '@redux';
import Tooltip from 'react-native-walkthrough-tooltip';
import {useTheme} from '@react-navigation/native';
const UserPharmacy = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalizeRef = useRef<Modalize>(null);
  const [tooltip, setTooltip] = useState(false);
  const [quantities, setQuantities] = useState<any>(1);
  const [modalVisible, setModalVisible] = useState(false);

  const {cart, currentLocation, user} = useSelector(
    (state: any) => state.root.user,
  );
  const dispatch = useDispatch();
  const [medicineData, setMedicineData] = useState<any>(null);
  const [searchText, setSearchText] = useState<any>('');
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  //
  useEffect(() => {
    getMedicine();
  }, []);
  const onPress = (i: any) => {
    if (user === null) {
      setModalVisible(true);
    } else {
      setMedicineData(i);
      modalizeRef.current?.open();
    }
  };

  //

  const HnadleModal = () => {
    if (!medicineData) return;
    const quantity = quantities;
    const updatedCart = [...cart];
    const existingIndex = updatedCart.findIndex(
      item => item._id === medicineData._id,
    );

    if (existingIndex !== -1) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push({...medicineData, quantity});
    }
    dispatch(setPharmacyData(data));
    dispatch(setCart(updatedCart));

    modalizeRef.current?.close();

    setTimeout(() => {
      setTooltip(true);
      setTimeout(() => {
        setTooltip(false);
      }, 2000);
    }, 1000);
  };
  const getMedicine = () => {
    setLoading(true);
    let parmas = {
      keyword: searchText,
    };
    //
    getMedicineNear(parmas)
      .then((res: any) => {
        //
        setData(res?.data?.products);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const onChangeText = (val: any) => {
    setSearchText(val);
    if (val == '') {
      getMedicine();
    }
  };

  const onSubmitEditing = () => {
    getMedicine();
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getMedicine();
      setRefreshing(false);
    }, 3000);
  };
  return (
    <View style={styles.main}>
      <CustomHeader
        title={'Pharmacy'}
        leftIcon
        titleColor={colors.white}
        notify
      />
      <View style={{padding: rs(16), paddingBottom: rs(8)}}>
        <SearchInput
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
      <FlatList
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
          loading ? null : <EmptyList description={'No data found'} />
        }
        contentContainerStyle={{paddingBottom: RF(80)}}
        renderItem={({item, index}: any) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPress(item)}
            style={{
              backgroundColor: '#fff',
              marginTop: index === 0 ? rv(8) : rv(16),
              marginHorizontal: rs(16),
              elevation: 5,
              padding: RF(12),
              borderRadius: RF(8),
            }}>
            <Text size={16} SFmedium color={'#00276D'}>
              {item?.productName}
            </Text>
            <Text size={14} SFregular color={'#00276D'}>
              {item?.brand}
            </Text>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text size={14} SFregular color={'#00276D'}>
                {item?.strength}
              </Text>
              <Text
                size={14}
                SFregular
                color={'#00276D'}>{`${item?.tpPrice}/-`}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {loading && <CustomLoader />}
      {/* open modal */}
      <CustomModalize
        ref={modalizeRef}
        height={RF(290)}
        childStyle={{paddingHorizontal: RF(24), paddingTop: RF(16)}}>
        <>
          <MedicineFolder
            MedicineName={medicineData?.productName}
            MedicineBrand={medicineData?.brand}
            MedicinePrice={medicineData?.strength}
            MG={medicineData?.tpPrice}
            Packet={'- Per Pack'}
            MedicineImage={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU'
            }
            setValue={setQuantities}
            value={quantities}
            color={'#099BED'}
            item={medicineData}
            restrict={true}
          />

          <AppButton title="Add to Cart" m_Top={32} onPress={HnadleModal} />
        </>
      </CustomModalize>
      <Tooltip
        isVisible={tooltip}
        backgroundColor={'transparent'}
        contentStyle={{marginTop: RF(180), elevation: 5}}
        content={<Text>Added Successfully</Text>}></Tooltip>

      <Modal transparent animationType="slide" visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={{flexGrow: 1}}>
            <LoginReminder />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default UserPharmacy;

const styles = StyleSheet.create({
  main: {flex: 1, backgroundColor: '#FAF9F6'},
});
