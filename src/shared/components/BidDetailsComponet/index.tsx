import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {navigate, rv} from '@services';
import Text from '../text';
import {RF} from '@theme';
import moment from 'moment';

const BidDetailsComponet = ({
  item,
  totalTravelers,
  type,
}: {
  item?: any;
  totalTravelers?: any;
  type?: any;
}) => {
  const getShortLocation = (location: any) => {
    return location ? location.slice(0, 3) : '';
  };

  const checkType = type == 'booking';
  const items: any = checkType
    ? item?.bidRequestId?.flightDetails
    : item?.flightDetails;

  const styles = useStyles(type);
  const CURRENCY_ = item?.gatewayName === 'blinq' ? 'PKR' : '$';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={{
            uri:
              item?.agencyId?.logo ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
          }}
          style={styles.logo}
        />
        <Text SFmedium size={16} color={'#00276D'}>
          {item.agencyId?.name}
        </Text>
      </View>

      {items?.map((userId: any, index: any) => {
        //

        return (
          <React.Fragment key={userId?.id}>
            <View style={styles.route}>
              <Text size={14} SFsemiBold color={'#00276D'}>
                {getShortLocation(userId?.to)}
                {/* {userId?.to} */}
              </Text>
              <View style={styles.planeIcon}>
                <Text center>✈️</Text>
                <View style={styles.dash} />
                <Text size={9} SFregular color={'#00276D'} center>
                  {`${userId?.departureDate} ${moment(
                    userId?.departureTime,
                  ).format('hh:mm A')}`}
                </Text>
              </View>
              <Text size={14} SFsemiBold color={'#00276D'}>
                {getShortLocation(userId?.from)}
                {/* {userId?.from} */}
              </Text>
            </View>
            <View style={styles.details}>
              <Image
                source={{
                  uri:
                    userId?.companyLogo ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                }}
                style={styles.airlineLogo}
              />
              <Text size={14} SFmedium color={'#00276D'}>
                {userId?.companyName}
              </Text>
            </View>
            {index === items.length - 1 && (
              <Text center size={14} SFmedium color={'#00276D'}>
                {CURRENCY_}{' '}
                {(item?.gatewayName === 'stripe' && item?.dollarAmount) ||
                  item?.ticketPrice ||
                  item?.bidRequestId?.ticketPrice}
              </Text>
            )}
          </React.Fragment>
        );
      })}
      {/* {checkType && item?.eTicket ? null : (
        <Text color={'rgba(0, 104, 56, 1)'}>
          E-Ticket will be upload in a few minutes
        </Text>
      )} */}

      <TouchableOpacity
        onPress={() =>
          navigate('BidDetails', {
            item: item,
            type: type,
            totalTravelers: totalTravelers,
          })
        }>
        <Text
          size={14}
          center
          SFmedium
          color={'#00276D'}
          style={{textDecorationLine: 'underline', marginTop: rv(16)}}>
          View Details
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BidDetailsComponet;

const useStyles = (type?: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: '#F5F5F5',
      borderRadius: type ? 0 : RF(8),
      // marginHorizontal: type ? 0 : RF(4),
      // marginVertical: type ? 0 : RF(4),
      padding: RF(15),
      elevation: type ? 0 : 5,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: RF(12),
    },
    logo: {
      width: RF(32),
      height: RF(32),
      resizeMode: 'contain',
      borderRadius: RF(32),
      elevation: 5,
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    route: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
    city: {
      fontSize: 16,
      fontWeight: 'bold',
    },

    duration: {
      fontSize: 12,
      color: '#888',
    },
    details: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
    airlineLogo: {
      width: RF(40),
      height: RF(25),
      borderRadius: RF(4),
      elevation: 5,
    },
    dash: {
      borderStyle: 'dashed',
      borderBottomWidth: 1,
      borderColor: '#00276D',
      width: RF(80),
    },

    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });
