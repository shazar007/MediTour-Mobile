import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import Text from '../text';
import moment from 'moment';

const FlightUnique = ({
  valueData,
  value,
  stay,
}: {
  valueData?: any;
  value?: any;
  stay?: any;
}) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <View style={styles.Container}>
      {valueData?.map((user: any, index: any) => {
        return (
          <View key={user._id}>
            <View style={styles.ViewImage}>
              <Image
                source={{
                  uri:
                    user?.companyLogo ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                }}
                style={styles.logo}
              />
              <Text size={12} SFregular color={'#00276D'}>
                {user?.companyName}
              </Text>
            </View>
            {/* <View style={styles.FromStyle}>
              <View>
                <Text size={12} SFregular color={'#00276D'}>
                  {user?.from}
                </Text>
                <Text
                  size={16}
                  SFmedium
                  color={'#00276D'}
                  numberOfLines={2}
                  style={{width: '60%', borderWidth: 1}}>
                  {moment(user?.departureTime).format('DD/MM/YYYY hh:mm A')}
                </Text>
              </View>
              <View style={styles.planeIcon}>
                <Text center>✈️</Text>
                <View style={styles.ToStyle} />
                <Text size={9} SFregular color={'#00276D'} center>
                  {user?.flightTime}
                </Text>
              </View>
              <View>
                <Text size={12} SFregular color={'#00276D'}>
                  {user?.to}
                </Text>
                <Text size={16} SFmedium color={'#00276D'}>
                  {user?.arrivalTime}
                </Text>
              </View>
            </View> */}
            <View style={styles.FromTo}>
              <View style={{gap: RF(2), width: '33%'}}>
                <Text size={16} SFmedium color={'#00276D'}>
                  {user?.from}
                </Text>
                <View>
                  <Text size={9} SFregular color={'#00276D'}>
                    {moment(user?.departureTime).format('hh:mm A')}
                  </Text>
                  <Text size={9} SFregular color={'#00276D'}>
                    {user?.departureDate}
                  </Text>
                </View>
              </View>
              <View style={styles.planeIcon}>
                <Text center>✈️</Text>
                <View style={styles.ToStyle} />
                {/* <Text size={9} SFregular color={'#00276D'} center>
                  {user?.flightTime}
                </Text> */}
              </View>
              <View style={{gap: RF(2), width: '33%', alignItems: 'flex-end'}}>
                <Text size={16} SFmedium color={'#00276D'}>
                  {user?.to}
                </Text>
                <View>
                  <Text size={9} SFregular color={'#00276D'} center>
                    {moment(user?.arrivalTime).format('hh:mm A')}
                  </Text>
                  <Text size={9} SFregular color={'#00276D'}>
                    {user?.arrivalDate}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{marginTop: RF(8)}}>
              <Text size={16} SFmedium color={'#00276D'}>
                Amenities
              </Text>
              {user?.amenities.map((amenity: any, index: any) => (
                <Text
                  key={index}
                  size={12}
                  SFregular
                  color={'#00276D'}
                  style={{marginTop: RF(4)}}>
                  - {amenity}
                </Text>
              ))}
            </View>
            <View style={{marginTop: RF(8)}}>
              <Text size={9} SFregular color={'#0E54A3'}>
                No. of Handbag
              </Text>
              <Text size={14} SFregular color={'#0E54A3'}>
                {user?.noOfHandbag}
              </Text>
            </View>
            <View style={{marginTop: RF(8)}}>
              <Text size={9} SFregular color={'#0E54A3'}>
                Baggage Weight
              </Text>
              <Text size={14} SFregular color={'#0E54A3'}>
                {user?.baggageWeight}
              </Text>
            </View>
            {value?.flightType === 'stay' &&
              index < value?.flightDetails?.length - 1 && (
                <>
                  <View style={styles.dashedline} />
                  <View style={styles.viewStyle}>
                    <View style={styles.width40} />
                    <View style={styles.bg40}>
                      <Text
                        size={9}
                        SFregular
                        color={colors.primary}
                        style={{textAlign: 'center'}}>
                        {`Stay ${stay?.[index]} in ${user?.to}`}
                      </Text>
                    </View>
                    <View style={styles.left40} />
                  </View>
                </>
              )}
          </View>
        );
      })}
    </View>
  );
};

export default FlightUnique;

const styles = StyleSheet.create({
  Container: {
    borderRadius: RF(8),
    backgroundColor: '#F5F5F5',
    padding: RF(16),
    elevation: 5,
  },
  ViewImage: {
    alignSelf: 'center',
    alignItems: 'center',
    gap: RF(4),
  },
  logo: {
    width: RF(32),
    height: RF(27),
    borderRadius: RF(4),
    resizeMode: 'contain',
  },
  ToStyle: {
    borderStyle: 'dashed',
    borderBottomWidth: 1,
    borderColor: '#00276D',
    width: RF(80),
  },
  viewStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planeIcon: {
    gap: RF(4),
  },

  dashedline: {
    borderWidth: 0.7,
    borderColor: '#396DB2',
    borderStyle: 'dashed',
    top: RF(32),
  },
  FromTo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: RF(8),
  },
  width40: {
    width: RF(40),
    height: RF(40),
    borderRadius: RF(20),
    right: RF(40),
    backgroundColor: '#fff',
  },
  bg40: {
    backgroundColor: '#fff',
    marginHorizontal: RF(40),
    paddingHorizontal: RF(8),
    paddingVertical: RF(8),
    marginVertical: RF(16),
    borderRadius: RF(8),
  },
  left40: {
    width: RF(40),
    height: RF(40),
    borderRadius: RF(20),
    left: RF(30),
    backgroundColor: '#fff',
  },
  FromStyle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: RF(8),
  },
});
