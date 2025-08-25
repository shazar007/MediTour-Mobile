import {
  Details,
  Products,
  SwapCards,
  HeaderCard,
  CustomLoader,
  LocationModal,
  CustomModalize,
  UserHeaderContent,
  CustomHeader,
  ShowAllTest,
} from '@components';

import {
  padding,
  getAll_Tests,
  getAll_Medicines,
  favorite_Pharmacy,
  getSingle_Pharmacy,
  getAll_Ratings_Reviews,
  getSingle_UserLaboratory,
  getAll_AdminTextCategories,
  showToast,
  AddRemovedFev,
} from '@services';

import {RF} from '@theme';
import {setFavorites, setUser} from '@redux';
import {Modalize} from 'react-native-modalize';
import {useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';

const DetailsScreen = ({route, navigation}: any) => {
  const {item, cardColor, type} = route.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch: any = useDispatch();
  const modalizeRef = useRef<Modalize>(null);
  const [data, setData] = useState<any>();
  const [fav, setFav] = useState<any>(false);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shift, setShift] = useState('DETAILS');
  const [reviews, setReviews] = useState<any>();
  const [pharmacyId, setPharmacyId] = useState<any>();
  const [searchText, setSearchText] = useState<any>('');
  const [productData, setProductData] = useState<any>([]);
  const [medicines, setMedicines] = useState<any>([]);
  const [favPharmacy, setFavPharmacy] = useState<any>(false);
  const [favLoading, setFavLoading] = useState(false);
  //

  const {user, selectedAddress, cart} = useSelector(
    (state: any) => state.root.user,
  );
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  useEffect(() => {
    if (user && user.favourites) {
      dispatch(setFavorites(user.favourites));
    }
  }, [user, dispatch]);
  useEffect(() => {
    if (type == 'pharmacy') {
      getSignlePharmacy();
    } else if (type == 'lab') {
      getSingleLab();
      getAll_Admin_TextCategories();
    }
  }, []);

  const onPressShift = (item: any) => {
    setShift(item);
  };

  const toggleSearch = () => {
    setToggle(true);
  };

  const getAll_Medicine = (id: any) => {
    setLoading(true);
    let params = {
      pharmId: id,
      page: 1,
    };
    getAll_Medicines(params)
      .then((res: any) => {
        //
        setMedicines(res?.data?.medicines);
      })
      .catch((err: any) => {
        showToast(err?.response?.data?.message, '', false);
      })
      .finally(() => setLoading(false));
  };

  const getSignlePharmacy = () => {
    setLoading(true);

    let params = {
      pharmacyId: item?._id,
      lat: selectedAddress?.lat,
      long: selectedAddress?.lng,
    };

    //

    getSingle_Pharmacy(params)
      .then((res: any) => {
        getReviews(res?.data?.pharmacy);
        getAll_Medicine(res?.data?.pharmacy?._id);
        setData(res?.data);
        setPharmacyId(res?.data?.lab?._id);
        let result = user.favouritePharmacies.includes(
          res?.data?.pharmacy?._id,
        );
        if (result) {
          setFavPharmacy(true);
        }
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const getSingleLab = () => {
    setLoading(true);
    let params = {
      labId: item?._id,
      lat: selectedAddress?.lat,
      long: selectedAddress?.lng,
    };

    getSingle_UserLaboratory(params)
      .then((res: any) => {
        //
        setData(res?.data);
        getReviews(res.data);
        // let result = user.favouriteLabs.includes(res?.data?.lab?._id);
        // if (result) {
        //   setFav(true);
        // }
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const getAll_Admin_TextCategories = () => {
    setLoading(true);
    getAll_AdminTextCategories()
      .then((res: any) => {
        setProductData(res?.data?.testCategories);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const addRemovedFvt = (itemId: any) => {
    setFavLoading(true);
    const params = {
      type: type == 'lab' ? 'laboratory' : 'pharmacy',
      itemId: data?.pharmacy?._id || data?.lab?._id,
    };

    AddRemovedFev(params)
      .then((res: any) => {
        dispatch(setUser(res?.data?.user));
        dispatch(setFavorites(res?.data?.user.favourites));
        showToast('success', res?.data?.message, true);
      })
      .catch((err: any) => {})
      .finally(() => {
        setFavLoading(false);
      });
  };

  const getReviews = (val: any) => {
    setLoading(true);
    let params = {
      vendorId: type == 'pharmacy' ? val?._id : val?.lab?._id,
    };

    getAll_Ratings_Reviews(params)
      .then((res: any) => {
        //
        setReviews(res?.data?.existingRating?.ratings);
      })
      .catch((err: any) => {
        //
      })
      .finally(() => setLoading(false));
  };

  //

  const get_Test = () => {
    setLoading(true);
    let params = {
      labId: item?._id,
      categoryName: searchText,
    };
    getAll_Tests(params)
      .then((res: any) => {
        setProductData(res?.data?.tests);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const onSubmitEditing = () => {
    if (searchText == '') {
      getAll_Admin_TextCategories();
    } else {
      get_Test();
    }
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  return (
    <>
      <View style={{flex: 1}}>
        <CustomHeader
          title={item?.name}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <View
          style={[
            padding.Horizontal_16,
            {paddingBottom: RF(140), marginTop: RF(16)},
          ]}>
          {shift == 'DETAILS' ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <>
                {data && (
                  <Details
                    type={type}
                    colors={colors}
                    reviews={reviews}
                    favLoading={favLoading}
                    distance={data?.distance}
                    item={type == 'lab' ? data?.lab : data?.pharmacy}
                    uri={type == 'lab' ? data?.lab?.logo : data?.pharmacy?.logo}
                    onFavorite={addRemovedFvt}
                  />
                )}
              </>
            </ScrollView>
          ) : (
            <>
              {productData && <ShowAllTest product={data} labId={item?._id} />}
            </>
          )}
        </View>
        <SwapCards
          card1={'DETAILS'}
          initialState={shift}
          activeTextColor={'#fff'}
          activeColor={changeColor}
          handlePress={onPressShift}
          inActiveTextColor={changeColor}
          card2={type == 'lab' ? 'PRODUCTS' : 'MEDICINE'}
        />
      </View>

      <CustomModalize ref={modalizeRef} height={700}>
        <LocationModal onClose={onClose} />
      </CustomModalize>
      {loading && <CustomLoader />}
    </>
  );
};

export default DetailsScreen;
