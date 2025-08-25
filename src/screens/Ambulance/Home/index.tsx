import {Pressable, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivationCard, CustomLoader, Text, Wrapper} from '@components';
import {Served, bid, newAmbulance, notification} from '@assets';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import {Image} from 'react-native';
import useStyles from './styles';
import {ambDashBoard, navigate} from '@services';
import {useSelector} from 'react-redux';
import moment from 'moment';

const AmbulanceHome = () => {
  const theme: any = useTheme();
  const color = theme.color;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({
    recentRequests: [],
    servedPatients: [],
    totalBids: 0,
    totalRequests: 0,
  });
  const styles = useStyles(color);
  const {B2B} = useSelector((state: any) => state?.root?.b2b);
  const {user} = useSelector((state: any) => state?.root?.user);

  let info: any = B2B?.ambulance;

  const onOpen = () => {
    navigate('Notifications');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    ambDashBoard()
      .then((res: any) => {
        setData(res?.data);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ScrollView>
      <Wrapper
        statusBarBagColor={'transparent'}
        statusBarStyle={'dark-content'}>
        <View>
          <View style={styles.backCircle} />
          <View style={styles?.drawerHeader}>
            <View style={styles.ViewContent}>
              <Image
                style={styles?.profile}
                source={{
                  uri:
                    info?.logo ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                }}
              />
              <Pressable onPress={onOpen}>
                <Image source={notification} style={styles?.icon2} />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <Text size={20} SFmedium color={'#00276D'}>
            Hello {info?.name}
          </Text>
          <Text size={14} SFmedium color={'#6E6F72'} style={{width: RF(200)}}>
            Welcome Back !
          </Text>
          <View style={styles.ViewRow}>
            <View style={styles.rowStyle}>
              <Image source={newAmbulance} style={styles.imageView} />
              <View style={{marginTop: RF(16), gap: RF(8)}}>
                <Text size={16} SFmedium color={'#00276D'}>
                  Total Request
                </Text>
                <Text size={16} SFmedium color={'#6E6F72'}>
                  {data.totalRequests}
                </Text>
              </View>
            </View>
            <View style={{gap: RF(8)}}>
              <View style={styles.Rowing}>
                <Image source={bid} style={styles.bidView} />
                <View style={styles.sent}>
                  <Text size={16} SFmedium style={{width: RF(38)}}>
                    Sent Bids
                  </Text>
                  <Text size={14} SFmedium color={'#6E6F72'}>
                    {data.totalBids}
                  </Text>
                </View>
              </View>
              <View style={styles.ImageContent}>
                <Image source={Served} style={styles.served} />
                <View style={styles.ViewJs}>
                  <Text
                    size={16}
                    SFmedium
                    color={'#00276D'}
                    style={{width: RF(80)}}>
                    Served Patients
                  </Text>
                  <Text size={16} SFbold color={'#6E6F72'}>
                    {data.servedPatients?.[0]?.distinctUserIds}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <Text size={16} SFbold color={'#00276D'}>
            Recent Request
          </Text>
          {data.recentRequests.map((request: any) => {
            return (
              <View key={request._id} style={styles.requestBox}>
                <Image
                  style={styles?.profile}
                  source={{
                    uri:
                      request?.userId?.userImage ||
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                  }}
                />
                <View style={{marginLeft: RF(10), gap: RF(4)}}>
                  <View style={styles.numRow}>
                    <Text
                      size={16}
                      SFmedium
                      color={'#00276D'}
                      style={{width: RF(150)}}
                      numberOfLines={1}>
                      {request?.userId?.name}
                    </Text>
                    <Text
                      size={12}
                      SFlight
                      color={'#00276D'}
                      style={{width: RF(64)}}
                      center>
                      {moment(request.createdAt).format('MM/DD/YYYY hh:mm A')}
                    </Text>
                  </View>
                  <Text size={12}>{request?.pickUp?.address}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </Wrapper>
      {loading && <CustomLoader />}
      {user?.paidActivation === true ? null : <ActivationCard />}
    </ScrollView>
  );
};
export default AmbulanceHome;
