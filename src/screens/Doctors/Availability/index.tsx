import React, {useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import {
  Accordion,
  AppButton,
  AppTextInput,
  CustomHeader,
  CustomLoader,
  EmptyList,
  Text,
  Wrapper,
} from '@components';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {plus} from '@assets';
import {getColorCode, RF} from '@theme';
import {
  Add_PriceAvailability,
  getAvailability_DoctorsVendor,
  navigate,
  showToast,
} from '@services';
import {useSelector} from 'react-redux';
import {Alert} from '@utils';

const Availability = ({route}: any) => {
  const {Type, HospitalId} = route.params;
  const theme = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const {Availability, colorCode, availability_Price} = getColorCode();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [availabilityData, setAvailabilityData] = useState<any>([]);
  const [price, setPrice] = useState('');

  useEffect(() => {
    getDoctorAvailability();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getDoctorAvailability();
      return () => {};
    }, []),
  );
  const getDoctorAvailability = () => {
    setLoading(true);
    getAvailability_DoctorsVendor(Availability)
      .then(res => {
        let availability;
        if (Type === 'Clinic') {
          availability = res?.data?.availability[0]?.clinicAvailability;
        } else if (Type === 'Hospital') {
          availability = res?.data?.availability[0]?.hospitalAvailability?.find(
            (hospital: any) => hospital.hospitalId?._id === HospitalId,
          );
        } else if (Type === 'In-House') {
          availability = res?.data?.availability[0]?.inHouseAvailability;
        } else {
          availability = res?.data?.availability[0]?.videoAvailability;
        }

        if (availability) {
          const apiPhysicalAvailability = availability?.availability || [];
          const currentPrice =
            availability?.price?.actualPrice?.toString() || '0';
          setAvailabilityData(apiPhysicalAvailability);
          setPrice(currentPrice);
        }
      })
      .catch(err => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getDoctorAvailability();
      setRefreshing(false);
    }, 1000);
  };

  const addPrice = () => {
    let data = {
      type: Type.toLowerCase(),
      price: price,
      hospitalId: Type === 'Hospital' ? HospitalId : undefined,
    };
    Add_PriceAvailability(data, availability_Price)
      .then((res: any) => {
        Alert.showSuccess(res?.data?.message);
        getDoctorAvailability();
      })
      .catch(err => {
        Alert.showError(err);
      });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Availability'}
        leftIcon
        titleColor={'#fff'}
        notify
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainview}>
          <View style={{marginHorizontal: RF(24)}}>
            <Text size={16} SFmedium color={'#0D47A1'}>
              {`${Type} Price`}
            </Text>
            <View style={styles.ViewDirection}>
              <TextInput
                style={styles.TextView}
                value={price}
                onChangeText={setPrice}
              />
              <AppButton
                width={'25%'}
                height={RF(22)}
                title="Save"
                onPress={addPrice}
              />
            </View>
          </View>
          <Text
            size={18}
            SFsemiBold
            color={'#0D47A1'}
            style={{marginHorizontal: RF(24), marginVertical: RF(16)}}>
            Availability category
          </Text>
          <FlatList
            scrollEnabled={false}
            data={availabilityData}
            renderItem={({item}) => {
              return availabilityData.length > 0 ? (
                <Accordion
                  item={item}
                  Type={Type}
                  availabilityData={availabilityData}
                  setLoading={setLoading}
                  HospitalId={HospitalId}
                  getDoctorAvailability={getDoctorAvailability}
                />
              ) : (
                <EmptyList
                  description={loading ? 'Loading.....' : 'No data found'}
                />
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            ListEmptyComponent={
              <EmptyList
                description={loading ? 'Loading.....' : 'No data found'}
              />
            }
          />
        </View>
        {loading && <CustomLoader />}
      </ScrollView>
      <TouchableOpacity
        onPress={() =>
          navigate('AddAvailability', {
            frontdata: availabilityData,
            Type: Type,
            HospitalId: HospitalId,
          })
        }
        style={{...styles.RadioStyle, backgroundColor: colorCode}}>
        <Image source={plus} style={styles.PlusStyle} />
      </TouchableOpacity>
    </Wrapper>
  );
};

export default Availability;
