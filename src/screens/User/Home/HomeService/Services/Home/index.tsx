import {
  Text,
  Wrapper,
  EmptyList,
  HeaderCard,
  CustomLoader,
  LocationModal,
  CardComponent,
  CustomModalize,
  UserSelectModal,
  UserHeaderContent,
  CustomFlatTab,
} from '@components';
import {
  navigate,
  getAll_Doctors,
  getFilter_Doctor,
  customOptions_Services,
} from '@services';
import {RF} from '@theme';
import {UserBell} from '@assets';
import useStyles from './styles';
import {setChangeColor} from '@redux';
import {Modalize} from 'react-native-modalize';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, RefreshControl, ScrollView, View} from 'react-native';

const UserServices = ({route}: any) => {
  const item = route.params;
  const styles = useStyles();
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);
  const modalizeRef = useRef<Modalize>(null);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState<any>('');
  const [refreshing, setRefreshing] = useState(false);
  const [response, setResponse] = useState(item?.title);
  const [rating, setRating] = useState<number | null>(null);
  const [searchDoctorText, setSearchDoctorText] = useState<any>('');
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const {selectedAddress, user} = useSelector((state: any) => state.root.user);

  useEffect(() => {
    if (searchDoctorText == '') {
      getPsychologist();
    }
  }, [searchDoctorText]);

  useEffect(() => {
    if (response === 'Paramedic') {
      getPsychologist();
    }
    if (response === 'Nutritionist') {
      getPsychologist();
    }
    if (response === 'Physiotherapist') {
      getPsychologist();
    }
    if (response === 'Psychologist') {
      getPsychologist();
    }
  }, [response]);

  const toggleSearch = () => {
    setToggle(true);
  };
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const handleItemPress = (selectedItem: any) => {
    setResponse(selectedItem);
    if (selectedItem == 'Psychologist') {
      dispatch(setChangeColor('#DE987C'));
    }
    if (selectedItem == 'Nutritionist') {
      dispatch(setChangeColor('#BCC3A0'));
    }
    if (selectedItem == 'Physiotherapist') {
      dispatch(setChangeColor('#A2968E'));
    }
    if (selectedItem == 'Paramedic') {
      dispatch(setChangeColor('#50B4C3'));
    }
  };

  const getPsychologist = () => {
    setLoading(true);
    let params = {
      lat: selectedAddress?.lat,
      long: selectedAddress?.lng,
      page: 1,
      search: searchDoctorText,
      doctorType: response?.toLowerCase(),
      // radius: distance * 1000,
    };
    getAll_Doctors(params)
      .then((res: any) => {
        setData(res?.data?.doctors);
        setDistance('');
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const onCloseModalize = () => {
    setLoading(true);
    let params = {
      minRating: rating,
      lat: selectedAddress?.lat,
      long: selectedAddress?.lng,
      doctorType: response,
      radius: distance !== '' ? parseInt(distance) * 1000 : 0,
    };
    getFilter_Doctor(params)
      .then((res: any) => {
        setData(res?.data?.doctors);
        modalizeRef.current?.close();
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const onChangeText = (val: any) => {
    setSearchDoctorText(val);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getPsychologist();
      setRefreshing(false);
    }, 3000);
  };

  const onSubmitEditing = () => {
    getPsychologist();
  };

  const onEndEditing = () => {};

  const closeLocationModal = () => {
    setLoading(true);
    setTimeout(() => {
      getPsychologist();
    }, 2000);
    modalizeRef.current?.close();
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <HeaderCard
          plusIcon
          twoInRow
          toggle={toggle}
          icon3={UserBell}
          numberOfIcons={'3'}
          setToggle={setToggle}
          title={'Hi ' + user?.name}>
          <UserHeaderContent
            size={18}
            showFilter
            searhIconTrue
            onlySearchIcon
            toggle={toggle}
            ScreenTitle={response}
            onPress={toggleSearch}
            onOpenModalize={onOpen}
            onPressLocation={onOpen}
            onEndEditing={onEndEditing}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
          />
        </HeaderCard>

        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={styles.TopView}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                size={18}
                SFmedium
                color={colors.blueText}
                style={{marginHorizontal: RF(20)}}>
                {distance ? 'Under the Area of ' : 'Near Your Location'}
              </Text>
              {distance && (
                <Text size={18} SFmedium color={colors.blueText}>
                  {distance.toString()} Km
                </Text>
              )}
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              contentContainerStyle={{marginTop: RF(4)}}
              data={data}
              refreshControl={
                <RefreshControl
                  enabled={true}
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={[changeColor, changeColor]}
                />
              }
              ListEmptyComponent={loading ? null : <EmptyList />}
              renderItem={({item}: any) => (
                <CardComponent
                  Size={9}
                  showValues
                  RatingTrue
                  item={item}
                  isVerify
                  name={item?.name}
                  style={styles.card}
                  color={colors.blueText}
                  title2={item?.speciality}
                  title3={item?.qualifications ? item?.qualifications : ''}
                  logo={{
                    uri:
                      item?.doctorImage ||
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                  }}
                  onPress={() =>
                    navigate('UserDoctorDetails', {
                      item: item,
                      type: 'doctor',
                      doctorType: response?.toLowerCase(),
                    })
                  }
                />
              )}
            />
          </View>
        </ScrollView>

        {loading && <CustomLoader />}

        <CustomModalize
          ref={modalizeRef}
          height={toggle == true ? RF(330) : RF(700)}>
          {toggle == true ? (
            <UserSelectModal
              rating={rating}
              setRating={setRating}
              onClose={onCloseModalize}
              setDistance={setDistance}
            />
          ) : (
            <LocationModal onClose={closeLocationModal} />
          )}
        </CustomModalize>
      </View>
    </Wrapper>
  );
};

export default UserServices;
