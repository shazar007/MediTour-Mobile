import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {setCart, setPharmacyData} from '@redux';
import {navigate} from '@services';
import {RF, SCREEN_HEIGHT} from '@theme';
import React, {useRef, useState} from 'react';
import {Modalize} from 'react-native-modalize';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Tooltip from 'react-native-walkthrough-tooltip';
import {
  AppButton,
  CustomModalize,
  MedicineFolder,
  Text,
  EmptyList,
} from '@components';

interface Props {
  item?: any;
  type?: any;
  array?: any;
  bgColor?: any;
  pharmacyName?: any;
  labId?: any;
}

const Products = (props: Props) => {
  const {array, item, type, pharmacyName, labId} = props;
  const modalizeRef = useRef<Modalize>(null);
  const [tooltip, setTooltip] = useState(false);
  const [medicineData, setMedicineData] = useState<any>(null);
  const colors: any = useTheme();
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const {cart, currentLocation, user} = useSelector(
    (state: any) => state.root.user,
  );

  //

  const [quantities, setQuantities] = useState<any>(1);
  const dispatch = useDispatch();

  const onPress = (i: any) => {
    if (type == 'lab') {
      navigate('ProductDetail', {product: item, category: i, labId: labId});
    } else {
      setMedicineData(i);
      modalizeRef.current?.open();
    }
  };

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
      updatedCart.push({...medicineData, quantity, pharmacyName});
    }
    dispatch(setPharmacyData(item?.pharmacy));
    dispatch(setCart(updatedCart));

    modalizeRef.current?.close();

    setTimeout(() => {
      setTooltip(true);
      setTimeout(() => {
        setTooltip(false);
      }, 2000);
    }, 1000);
  };

  return (
    <>
      {array ? (
        <View>
          <FlatList
            data={array}
            scrollEnabled={false}
            numColumns={type == 'lab' ? 2 : 1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            ListEmptyComponent={<EmptyList />}
            renderItem={({item}) => {
              return (
                <>
                  {type == 'lab' ? (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.outer}
                      onPress={() => onPress(item)}>
                      <View style={styles.view}>
                        <Text
                          center
                          size={14}
                          SFsemiBold
                          color={'black'}
                          style={{width: '80%'}}>
                          {item?.categoryName}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.pharm}
                      onPress={() => onPress(item)}>
                      <View style={styles.viewImg}>
                        <Image
                          source={{uri: item?.medicineImage}}
                          style={styles.img}
                        />
                      </View>

                      <View style={styles._viewTxt}>
                        <Text color={colors?.blueText} size={16} SFmedium>
                          {item?.generic}
                        </Text>
                        <Text
                          size={12}
                          SFregular
                          color={colors?.blueText}
                          style={{textAlign: 'left'}}>
                          {item?.medicineBrand}
                        </Text>
                        <Text size={12} SFregular color={colors?.blueText}>
                          {item?.potency}
                        </Text>
                      </View>

                      <View style={styles.viewTxt}>
                        <Text SFmedium size={13} color={changeColor}>
                          {item?.actualPrice}/-
                        </Text>
                        <Text SFmedium size={10} color={changeColor}>
                          Per Pack
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </>
              );
            }}
          />
          <Tooltip
            isVisible={tooltip}
            backgroundColor={'transparent'}
            contentStyle={{marginTop: RF(180), elevation: 5}}
            content={<Text>Added Successfully</Text>}></Tooltip>
        </View>
      ) : (
        <View style={styles._view}>
          <Text size={22}>No Data Found!</Text>
        </View>
      )}

      {/* open modal */}
      <CustomModalize
        ref={modalizeRef}
        height={RF(290)}
        childStyle={{paddingHorizontal: RF(24), paddingTop: RF(16)}}>
        {medicineData?.medicineImage && (
          <>
            <MedicineFolder
              MedicineName={medicineData?.generic}
              MedicineBrand={medicineData?.medicineBrand}
              MedicinePrice={medicineData?.potency}
              MG={medicineData?.actualPrice}
              Packet={'- Per Pack'}
              MedicineImage={medicineData?.medicineImage}
              setValue={setQuantities}
              value={quantities}
              color={colors.primary}
              item={medicineData}
              restrict={true}
            />

            <AppButton title="Add to Cart" m_Top={32} onPress={HnadleModal} />
          </>
        )}
      </CustomModalize>
    </>
  );
};

export default Products;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
    borderRadius: RF(16),
  },
  viewImg: {
    width: RF(80),
    height: RF(75),
    borderRadius: RF(16),
  },
  _viewTxt: {paddingHorizontal: RF(5), marginTop: RF(5)},
  viewTxt: {
    flexDirection: 'row',
    marginRight: RF(15),
    marginBottom: RF(5),
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginLeft: RF(5),
  },
  pharm: {
    height: RF(75),
    borderRadius: 16,
    elevation: 2,
    backgroundColor: '#fff',
    margin: RF(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    width: '100%',
    gap: 16,
  },
  list: {
    width: '100%',
    marginBottom: RF(8),
    justifyContent: 'space-between',
  },
  _view: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_HEIGHT / 2,
  },
  outer: {
    width: '47.5%',
    height: RF(115),
    borderRadius: 8,
    overflow: 'hidden',
    shadowOpacity: 75,
    marginTop: RF(5),
  },
  view: {
    opacity: 0.8,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F2F6',
  },
  MainContainer: {width: '100%', height: RF(77), marginTop: RF(24)},
  ImageView: {width: RF(80), height: RF(77), resizeMode: 'contain'},
  RowDirection: {
    flexDirection: 'column',
    marginLeft: RF(8),
  },
  ViewPrice: {justifyContent: 'flex-end', marginLeft: RF(45)},
});

// const HnadleModal = () => {
//   setLoading(true);
//   const quantity = quantities;
//   const updatedCart = {...medicineData, quantity};
//   let params = {
//     medicineId: updatedCart._id,
//     quantity: updatedCart?.quantity,
//   };
//   setTooltip(true);
//   addTo_Cart(params)
//     .then((res: any) => {
//       setTooltip(true);
//       setTimeout(() => {
//         setTooltip(false);
//         modalizeRef.current?.close();
//       }, 2000);
//     })
//     .finally(() => setLoading(false));
// };
