import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CustomHeader,
  CustomLoader,
  EmptyList,
  Text,
  Wrapper,
} from '@components';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {Image} from 'react-native';
import {getColorCode, RF} from '@theme';
import {getAppointmentVendor, navigate} from '@services';
import moment from 'moment';
import {RefreshControl} from 'react-native-gesture-handler';
const DoctorsAppointment = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const {appointment} = getColorCode();
  const [data, setData] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAppointment();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getAppointment();
      return () => {};
    }, []),
  );
  const getAppointment = () => {
    setLoading(true);
    getAppointmentVendor(appointment)
      .then((res: any) => {
        setData(res.data.Appointments);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getAppointment();
      setRefreshing(false);
    }, 100);
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Appointments'}
        leftIcon
        titleColor={'#fff'}
        notify
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <FlatList
            scrollEnabled={false}
            data={data}
            refreshControl={
              <RefreshControl
                enabled={true}
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            ListEmptyComponent={
              <EmptyList
                description={loading ? 'Loading.....' : 'No Appointment found'}
              />
            }
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.CardDesign}
                onPress={() =>
                  navigate('AppointmentPrescription', {item: item})
                }>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={{
                      uri:
                        item.patientId.userImage ||
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                    }}
                    style={styles.imageView}
                  />
                  <View style={{flex: 1, marginLeft: RF(8)}}>
                    <View style={styles.rowView}>
                      <Text size={16} SFmedium color={colors.primary}>
                        {item.patientId.name}
                      </Text>
                      <Text size={12} SFmedium color={colors.primary}>
                        {moment(item?.appointmentDateAndTime).format('h:mmA')}
                      </Text>
                    </View>
                    <View style={styles.gapView}>
                      <Text size={14} SFsemiBold color={'#FF842F'}>
                        {`${item.appointmentType}`}
                      </Text>
                      <Text
                        size={12}
                        SFmedium
                        color={colors.primary}
                        style={{marginLeft: RF(8)}}>
                        {moment(item?.appointmentDateAndTime).format(
                          'M/D/YYYY',
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};
export default DoctorsAppointment;
