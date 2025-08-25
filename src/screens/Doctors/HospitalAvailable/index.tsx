import {FlatList, Pressable, RefreshControl, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {doctorHospitalAvailability, margin, navigate} from '@services';
import {
  CustomHeader,
  CustomLoader,
  EmptyList,
  Text,
  Wrapper,
} from '@components';
import {getColorCode, RF} from '@theme';
import {Image} from 'react-native-animatable';
const HospitalAvailable = ({route}: any) => {
  const {Type} = route.params;
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const {hospitalAvailability, colorCode} = getColorCode();
  useEffect(() => {
    getHospitalAvailability();
  }, []);
  const getHospitalAvailability = () => {
    setLoading(true);
    doctorHospitalAvailability(hospitalAvailability)
      .then((res: any) => {
        setData(res.data.hospitals);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getHospitalAvailability();
      setRefreshing(false);
    }, 1000);
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Hospital Availability'}
        leftIcon
        titleColor={'#fff'}
        notify
      />

      <View style={{marginHorizontal: RF(24)}}>
        <FlatList
          style={margin.top_8}
          numColumns={2}
          data={data}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <EmptyList
              description={loading ? 'Loading.....' : 'No Hospital found'}
            />
          }
          renderItem={({item}: any) => {
            return (
              <Pressable
                onPress={() =>
                  navigate('Availability', {Type, HospitalId: item?._id})
                }
                style={{
                  paddingVertical: RF(8),
                  backgroundColor: '#00276D',
                  elevation: 2,
                  marginVertical: 5,
                  marginLeft: 2,
                  width: RF(140),
                  marginRight: RF(8),
                  borderRadius: RF(8),
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: RF(8),
                }}>
                <Image
                  source={{
                    uri:
                      item?.logo ||
                      'https://storage.googleapis.com/meditourglobal-ea15d.appspot.com/profile_pictures/image%253A1000000068?GoogleAccessId=firebase-adminsdk-faw9m%40meditourglobal-ea15d.iam.gserviceaccount.com&Expires=32503680000&Signature=jru3p0ODQ6arkkGcf7rtAWnHeZ5mU7XtUcuvJCT3C12tE8umO%2BOAqoIFkY9mS8%2BG02FhVOpq%2FRsEQVRbSW9E3j260WXEP37FjoYYLhS0Vd6SAJDh8TFTPzemlSM37J9bkbBKNtrVUtXYiRfP%2Bs5VXYBgQCJN8XWX8JYY8AYxkK3gcmx5RtKgDYLrY8fdJE1MSLeQRtfqQvwoTIQk0Z7IJ4%2BYhb5b8Pk%2FHeip3RtIqmV5aoXYn3%2BwixuDPcIwBT76nVHB7FF18wuj9vzJFTozjAMExyyCPuRhhVcRYYdhQZVkv5ViwDVM5cLWZ26bGJSzHRxOD2f4Sob%2F0TkNDHAznw%3D%3D',
                  }}
                  style={{width: RF(48), height: RF(48), borderRadius: RF(32)}}
                />
                <Text color={'#fff'} SFmedium>
                  {item?.name}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default HospitalAvailable;
