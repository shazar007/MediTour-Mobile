import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import moment from 'moment';
import Text from '../text';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import {del} from '@assets';
import {navigate} from '@services';

const FlightsContent = ({
  item,
  onDel,
  type,
  type2,
  type3,
}: {
  item?: any;
  onDel?: any;
  type?: any;
  type2?: any;
  type3?: any;
}) => {
  const checkType = type == 'booking';

  const theme = useTheme();
  const colors: any = theme.colors;
  const styles = useStyles(checkType, type2);

  const titleColor = checkType ? '#fff' : '#7D7D7D';
  const resTextColor = checkType ? '#fff' : colors.blueText;

  const totalTravelers = item?.adult + item?.children + item?.infant;

  const inBooking =
    item.requestId?.adult + item?.requestId?.children + item?.requestId?.infant;
  const checkTraveler = totalTravelers || inBooking;
  const checkItme = item?.flights || item?.requestId?.flights;

  const handleNavigate = () => {
    if (type == 'booking') {
      return;
    } else {
      navigate('FlightsDetails', {item: item});
    }
  };

  return (
    <Pressable onPress={handleNavigate} style={styles.content}>
      <View style={styles.ViewContent}>
        <View>
          <Text size={9} SFregular color={type3 ? type3 : titleColor}>
            Flight Type
          </Text>
          <Text size={14} SFsemiBold color={resTextColor}>
            {checkType ? item?.requestId?.requestType : item?.requestType}
          </Text>
        </View>
        {type == 'booking' ? null : (
          <TouchableOpacity onPress={onDel}>
            <Image
              source={del}
              style={{width: RF(18), height: RF(18), resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        )}
      </View>
      {checkItme?.map((user: any) => (
        <View
          // key={index}

          style={styles.ViewReact}>
          <View>
            <Text size={9} SFregular color={type3 ? type3 : titleColor}>
              From
            </Text>
            <Text
              size={14}
              SFsemiBold
              style={{width: RF(80)}}
              color={resTextColor}>
              {user?.from}
            </Text>
          </View>
          <View>
            <Text size={9} SFregular color={type3 ? type3 : titleColor} center>
              To
            </Text>
            <Text
              size={14}
              SFsemiBold
              style={{width: RF(80)}}
              color={resTextColor}>
              {user?.to}
            </Text>
          </View>
          <View>
            <Text
              size={9}
              SFregular
              color={type3 ? type3 : titleColor}
              alignEnd>
              Departure
            </Text>
            <Text size={14} SFsemiBold color={resTextColor}>
              {moment(user?.departure).format('MM-DD-YYYY')}
            </Text>
          </View>
        </View>
      ))}
      <View style={styles.viewJs}>
        <View>
          <Text size={9} SFregular color={type3 ? type3 : titleColor}>
            Travelers
          </Text>
          <Text size={14} SFsemiBold color={resTextColor}>
            {checkTraveler}
          </Text>
        </View>
        {item?.requestId?.requestType === 'round' && (
          <View>
            <Text size={9} SFregular color={type3 ? type3 : titleColor}>
              Return Date
            </Text>
            <Text size={14} SFsemiBold color={resTextColor}>
              {moment(item?.requestId?.returnFlight).format('MM-DD-YYYY')}
            </Text>
          </View>
        )}

        <View>
          <Text size={9} SFregular color={type3 ? type3 : titleColor} alignEnd>
            Flight Class
          </Text>
          <Text size={14} SFsemiBold color={resTextColor}>
            {item?.flightClass || item?.requestId?.flightClass}
          </Text>
        </View>

        {item?.requestType === 'round' && (
          <View>
            <Text size={9} SFregular color={titleColor}>
              Return
            </Text>
            <Text size={14} SFsemiBold color={resTextColor}>
              {moment(item?.returnFlight).format('MM-DD-YYYY')}
            </Text>
          </View>
        )}
      </View>
      {type !== 'booking' && (
        <Text center SFmedium style={{textDecorationLine: 'underline'}}>
          View Details
        </Text>
      )}
    </Pressable>
  );
};

export default FlightsContent;

const useStyles = (type?: any, type2?: any) =>
  StyleSheet.create({
    ViewReact: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    content: {
      paddingHorizontal: RF(16),
      paddingVertical: RF(16),
      borderRadius: RF(16),
      elevation: type ? 0 : 5,
      borderBottomEndRadius: type ? 0 : RF(16),
      borderBottomStartRadius: type ? 0 : RF(16),
      backgroundColor: type ? 'rgba(0, 104, 56, 1)' : type2 ? type2 : '#fff',
      gap: RF(8),
    },
    contentView: {
      padding: RF(8),
      borderRadius: RF(16),
      elevation: 5,
      marginHorizontal: RF(4),
      backgroundColor: '#fff',
      marginVertical: RF(8),
    },
    ViewContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    viewContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    DEL: {width: RF(16), height: RF(16), resizeMode: 'contain'},
    viewJs: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
