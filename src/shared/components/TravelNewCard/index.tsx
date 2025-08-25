import React, {useMemo} from 'react';
import {RF} from '@theme';
import Text from '../text';
import moment = require('moment');
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {mediLogo} from '@assets';

interface Props {
  uri?: any;
  time?: any;
  title?: any;
  price?: any;
  onPress?: any;
  orderId?: any;
  quantity?: any;
  status?: any;
  gatewayName?: any;
}

const TravelNewCard = (props: Props) => {
  const theme = useTheme();
  const colors: any = theme.colors;
  const {
    title,
    time,
    price,
    quantity,
    orderId,
    uri,
    status,
    onPress,
    gatewayName,
  } = props;
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const formattedDateTime = useMemo(() => {
    return moment(time).format('M/D/YYYY, h:mmA');
  }, [time]);

  const handleAmount =
    gatewayName === 'stripe' ? `$ ${price?.toFixed(2)}` : `PKR ${price}`;

  return (
    <Pressable style={styles.cardContainer} onPress={onPress}>
      <Image source={uri ? {uri: uri} : mediLogo} style={styles.image} />

      <View style={styles.textContainer}>
        <View>
          <Text
            color={changeColor}
            size={12}
            SFsemiBold
            style={{width: 80}}
            numberOfLines={1}>
            {title}
          </Text>

          <Text size={12} SFregular color={changeColor}>
            Quantity:{quantity}
            {/* {quantity?.reduce(
              (total: number, item: any) => total + (item?.quantity || 0),
              0,
            )} */}
          </Text>
          <Text
            color={status == 'pending' ? 'red' : changeColor}
            size={12}
            SFsemiBold
            numberOfLines={1}>
            {status}
          </Text>
        </View>

        <View
          style={{
            marginRight: -10,
            alignItems: 'flex-end',
          }}>
          <Text color={'#00276D'} size={9} SFregular>
            {formattedDateTime}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text size={9} SFmedium color={colors?.orange}>
              Order ID:{' '}
            </Text>
            <Text size={9} SFregular color={colors?.orange}>
              {orderId}
            </Text>
          </View>
          {handleAmount && (
            <Text
              size={14}
              SFregular
              color={changeColor}
              style={{marginTop: RF(8)}}>
              {handleAmount}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default TravelNewCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '99%',
    height: RF(75),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 4,
    borderRadius: RF(16),
    paddingRight: RF(8),
  },
  image: {
    width: RF(80),
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
    padding: 10,
  },
  dateContainer: {
    flexDirection: 'column',
    marginTop: RF(8),
  },
});
