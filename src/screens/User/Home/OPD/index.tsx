import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {View} from 'react-native';
import {
  CardComponent,
  CustomFlatTab,
  CustomHeader,
  CustomLoader,
  EmptyList,
  HeaderCard,
  SearchInput,
  SwapCards,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {useSelector} from 'react-redux';
import {getAll_OPD_Doc} from './functionProps';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {GAP, navigate, rs} from '@services';
import {RF} from '@theme';
const drOptions = [
  {
    card1: 'Free OPD',
  },
  {
    card1: 'Paid OPD',
  },
];
const UserOpd = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [data, setData] = useState<any>([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('Free OPD');
  const [refreshing, setRefreshing] = useState(false);
  const {user} = useSelector((state: any) => state.root.user);
  const [searchDoctorText, setSearchDocterText] = useState<any>('');
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const docParams: any = {
    allDoctor: {
      searchValue: searchDoctorText,
      isMeditour: response === 'Free OPD' ? 'true' : 'false',
    },
    other_DoctorParams: {
      setData: setData,
      setRefreshing: setRefreshing,
      setLoading: setLoading,
    },
  };

  const getList_AllDoctors = () => {
    getAll_OPD_Doc(docParams);
  };

  // ................................. ALL OPD..................................

  useEffect(() => {
    if (response == 'Free OPD') {
      getList_AllDoctors();
    } else {
      getList_AllDoctors();
    }
  }, [response]);
  useEffect(() => {
    if (searchDoctorText == '') {
      getList_AllDoctors();
    }
  }, [searchDoctorText]);

  const handleItemPress = async (item: any) => {
    await setData([]);
    setResponse(item);
  };
  const toggleSearch = () => {
    setToggle(true);
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setSearchDocterText('');
    setTimeout(() => {
      if (response == 'Paid OPD') {
        getList_AllDoctors();
      }
      setRefreshing(false);
    }, 100);
  };
  const onSubmitEditing = () => {
    if (response == 'Paid OPD') {
      getList_AllDoctors();
    }
  };
  const onChangeText = (val: any) => {
    if (response == 'Paid OPD') {
      setSearchDocterText(val);
    }
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title={response}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <View style={styles.subContainer}>
        {response === 'Paid OPD' && (
          <View style={{margin: rs(16), marginBottom: 0}}>
            <SearchInput
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitEditing}
            />
          </View>
        )}

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 200,
            padding: rs(16),
            gap: GAP._16,
          }}
          data={data?.doctors}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[changeColor, changeColor]}
            />
          }
          ListEmptyComponent={
            <EmptyList description={loading ? '' : 'No data found'} />
          }
          renderItem={({item}) => {
            return (
              <CardComponent
                Size={9}
                showValues
                RatingTrue
                item={item}
                isVerify
                name={item?.name}
                style={styles.card}
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
                    freeOpd: response,
                    doctorType: 'doctor',
                  })
                }
              />
            );
          }}
        />
      </View>
      {loading && <CustomLoader />}
      <SwapCards
        card1={'Free OPD'}
        card2={'Paid OPD'}
        initialState={response}
        activeTextColor={colors.white}
        activeColor={changeColor}
        handlePress={handleItemPress}
        inActiveTextColor={changeColor}
      />
    </View>
  );
};

export default UserOpd;
