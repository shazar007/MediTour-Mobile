import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  CardComponent,
  CustomHeader,
  CustomLoader,
  CustomModalize,
  EmptyList,
  HeaderCard,
  MeditourButton,
  UserHeaderContent,
  UserSelectModal,
  Wrapper,
} from '@components';

import {RF} from '@theme';
import {RefreshControl} from 'react-native-gesture-handler';
import {
  GAP,
  GetAllDoctorsAvailable,
  getNearBy_AllDoctor,
  getSpecialties_AllDoc,
  navigate,
  PADDING,
  rs,
  showToast,
} from '@services';

import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import {Modalize} from 'react-native-modalize';

const detailData = [
  {id: 1, title: 'All Doctors'},
  {id: 2, title: 'Near Me'},
];

const SymptomsDoctor = ({route}: any) => {
  const {item} = route.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const [Data, setData] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const [toggle, setToggle] = useState(false);
  const {user} = useSelector((state: any) => state.root.user);

  useEffect(() => {
    setLoading(true);
    getAllDocAvailable();
  }, []);

  const getAllDocAvailable = () => {
    let params = {
      speciality: item.specialityTitle,
    };
    GetAllDoctorsAvailable(params)
      .then((res: any) => {
        setData(res?.data?.doctors);
      })
      .catch((err: any) => {
        showToast('error', err?.response?.data?.message, false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getAllDocAvailable();
      setRefreshing(false);
    }, 100);
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <CustomHeader
          title={item?.specialityTitle}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <FlatList
          contentContainerStyle={{
            paddingBottom: RF(80),
            padding: PADDING._16,
            gap: GAP._16,
          }}
          showsVerticalScrollIndicator={false}
          data={Data}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[changeColor, changeColor]}
            />
          }
          ListEmptyComponent={loading ? null : <EmptyList />}
          renderItem={({item}) => (
            <CardComponent
              Size={9}
              showValues
              RatingTrue
              item={item}
              isVerify
              name={item?.name}
              color={colors.blueText}
              title2={item?.speciality?.join(' ')}
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
                  doctorType: 'doctor',
                })
              }
            />
          )}
        />
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};
export default SymptomsDoctor;

const styles = StyleSheet.create({
  meditourButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
    marginHorizontal: RF(24),
  },
  flatListContainer: {
    marginHorizontal: RF(24),
    paddingBottom: RF(80),
  },
  view: {flex: 1, backgroundColor: '#FAF9F6'},
});
