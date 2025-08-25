import React from 'react';
import {Image, View, ScrollView} from 'react-native';
import {
  AppButton,
  CustomHeader,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {navigate} from '@services';
import {useSelector} from 'react-redux';

const HomeRoomDetails = ({route}: any) => {
  const {entirePlace, item, selectedItem} = route.params;
  const styles: any = useStyles();
  const theme = useTheme();

  const colors: any = theme.colors;
  const {hotelInfo} = useSelector((state: any) => state.root.b2b);

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={
            item === 'A private room'
              ? 'Private room Details'
              : item === 'Entire place'
              ? 'Entire place Details'
              : ''
          }
          leftIcon
          titleColor={'#fff'}
          notify
        />

        <ScrollView>
          <View style={styles.ViewDetails}>
            <View style={styles.apartmentCard}>
              <Image
                source={{uri: entirePlace.homeImages?.[0]}}
                style={styles.image}
              />

              <View style={styles.details}>
                <View style={styles.Row}>
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={styles.title}
                      size={12}
                      SFlight
                      color={'#00276D'}>
                      Home Type
                    </Text>
                    <Text
                      style={styles.title}
                      size={12}
                      SFregular
                      color={'#00276D'}>
                      {entirePlace.homeType}
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={styles.title}
                      size={12}
                      SFlight
                      color={'#00276D'}>
                      Custom Name
                    </Text>
                    <Text
                      style={styles.title}
                      size={12}
                      SFregular
                      color={'#00276D'}>
                      {entirePlace.homeName}
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={styles.title}
                      size={12}
                      SFlight
                      color={'#00276D'}>
                      Bed Rooms
                    </Text>
                    <Text
                      style={styles.title}
                      size={12}
                      SFregular
                      color={'#00276D'}>
                      {entirePlace.numberOfBedroom}
                    </Text>
                  </View>
                </View>
                <View style={styles.Row}>
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={styles.title}
                      size={12}
                      SFlight
                      color={'#00276D'}>
                      Dining rooms
                    </Text>
                    <Text
                      style={styles.title}
                      size={12}
                      SFregular
                      color={'#00276D'}>
                      {entirePlace.numberOfDiningrooms}
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={styles.title}
                      size={12}
                      SFlight
                      color={'#00276D'}>
                      Kitchen
                    </Text>
                    <Text
                      style={styles.title}
                      size={12}
                      SFregular
                      color={'#00276D'}>
                      {entirePlace.kitchens}
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={styles.title}
                      size={12}
                      SFlight
                      color={'#00276D'}>
                      Bathroom
                    </Text>
                    <Text
                      style={styles.title}
                      size={12}
                      SFregular
                      color={'#00276D'}>
                      {entirePlace.numberOfBathroom}
                    </Text>
                  </View>
                </View>
                {entirePlace?.beds?.map((user: any) => (
                  <View style={styles.Row}>
                    <View style={{alignItems: 'center'}}>
                      <Text
                        style={styles.title}
                        size={12}
                        SFlight
                        color={'#00276D'}>
                        Available Beds
                      </Text>
                      <Text
                        style={styles.title}
                        size={12}
                        SFregular
                        color={'#00276D'}>
                        {user?.availableBeds}
                      </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text
                        style={styles.title}
                        size={12}
                        SFlight
                        color={'#00276D'}>
                        No. of Beds
                      </Text>
                      <Text
                        style={styles.title}
                        size={12}
                        SFregular
                        color={'#00276D'}>
                        {user?.noOfBeds}
                      </Text>
                    </View>
                  </View>
                ))}
                <View style={styles.Row}></View>

                <View style={styles.Row}>
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={styles.title}
                      size={12}
                      SFlight
                      color={'#00276D'}>
                      Floors
                    </Text>
                    <Text
                      style={styles.title}
                      size={12}
                      SFregular
                      color={'#00276D'}>
                      {entirePlace.numberOfFloors}
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={styles.title}
                      size={12}
                      SFlight
                      color={'#00276D'}>
                      Size
                    </Text>
                    <Text
                      style={styles.title}
                      size={12}
                      SFregular
                      color={'#00276D'}>
                      {entirePlace.homeSize}
                    </Text>
                  </View>
                </View>
                <Text size={16} SFsemiBold color={'#00276D'}>
                  Price per night
                </Text>
                <View style={styles.Row}>
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={styles.title}
                      size={12}
                      SFlight
                      color={'#00276D'}>
                      Basic Price Per Night
                    </Text>
                    <Text
                      style={styles.title}
                      size={12}
                      SFregular
                      color={'#00276D'}>
                      {entirePlace.basePricePerNight}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <AppButton
              title="Next"
              width={RF(140)}
              height={RF(40)}
              m_Top={RF(16)}
              onPress={() =>
                navigate('Facilities', {
                  selectedItem: selectedItem,
                  item: item,
                })
              }
            />
          </View>
        </ScrollView>
      </View>
    </Wrapper>
  );
};

const useStyles = () => ({
  plusButton: {
    width: RF(12),
    height: RF(12),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  ViewDetails: {
    paddingBottom: RF(50),
    marginHorizontal: RF(24),
    marginVertical: RF(8),
  },
  Common: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: RF(4),
  },
  apartmentCard: {
    backgroundColor: '#fff',
    borderRadius: RF(8),
    padding: RF(8),
    elevation: 5,
    marginTop: RF(16),
    marginVertical: RF(8),
  },
  RowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: RF(24),
    marginHorizontal: RF(24),
  },
  Touch: {
    justifyContent: 'center',
    alignItems: 'center',
    width: RF(48),
    height: RF(48),
    borderRadius: RF(32),
    backgroundColor: '#0D47A1',
  },
  pag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: RF(24),
  },
  //   slideStyles: {bor},
  TextingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Row3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: RF(100),
    borderRadius: RF(8),
    marginBottom: RF(16),
    resizeMode: 'contain',
  },
  details: {
    flexDirection: 'column',
  },
  TextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paginationStyles: {
    backgroundColor: 'transparent',
    paddingBottom: 0,
    paddingTop: 0,
    marginTop: RF(8),
  },
  dotStyles: {
    width: RF(10),
    height: RF(10),
    borderRadius: 5,
    backgroundColor: 'rgba(226, 93, 93, 1)',
    marginHorizontal: RF(-8),
  },
  bgStyles: {
    backgroundColor: 'rgba(0, 39, 109, 1)',
  },
  title: {
    // fontWeight: 'bold',
    marginTop: RF(8),
  },
  description: {
    marginTop: RF(8),
    color: '#666',
  },
  paginationContainer: {
    paddingVertical: RF(8),
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dotStyle: {
    width: RF(8),
    height: RF(8),
    borderRadius: RF(4),
    // marginHorizontal: RF(4),
    backgroundColor: '#0D47A1',
  },
  inactiveDotStyle: {
    backgroundColor: '#C4C4C4',
  },
  indexContainer: {
    alignItems: 'center',
    marginTop: RF(8),
  },
  indexText: {
    color: '#0D47A1',
    fontWeight: 'bold',
  },
});
export default HomeRoomDetails;
