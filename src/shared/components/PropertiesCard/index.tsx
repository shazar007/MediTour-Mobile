import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {globalStyles, margin} from '@services';
import {useTheme} from '@react-navigation/native';
import {location, tick} from '@assets';
import {AirbnbRating} from 'react-native-ratings';

const PropertiesCard = ({
  item,
  onPress,
  source,
  locationHotel,
  name,
  PriceHotel,
}: {
  item?: any;
  onPress?: any;
  source?: any;
  locationHotel?: any;
  name?: any;
  adultValue?: any;
  PriceHotel?: any;
}) => {
  const theme: any = useTheme();
  const colors = theme.colors;

  //

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.card}>
          <Image style={styles.propertyTmage} source={source} />

          <View style={styles.descView}>
            <View style={globalStyles.row}>
              <Text color={colors.blueText} SFmedium size={16}>
                {name}
              </Text>
              {/* <Image source={like} style={styles.icon} /> */}
            </View>
            {/* <View
              style={[
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: RF(4),
                },
              ]}>
              <AirbnbRating
                size={13}
                showRating={false}
                isDisabled={true}
                defaultRating={item?.starRating ? item?.starRating : 0}
              />
            </View> */}
            <View style={[globalStyles.rowSimple, margin.top_8]}>
              <Image
                source={location}
                style={[styles.icon, styles.tintColor]}
              />
              <Text
                color={'rgba(8, 12, 47, 0.65)'}
                size={12}
                SFregular
                style={margin.left_8}>
                {locationHotel}
              </Text>
            </View>

            <Text
              color={colors.blueText}
              size={14}
              SFmedium
              style={{marginTop: RF(8)}}>
              Starting Price
            </Text>
            {/* ...................Total Price................... */}
            <View style={[globalStyles.row, margin.top_4]}>
              <Text size={16} SFmedium color={colors.blueText}>
                PKR {PriceHotel}
              </Text>
              <View style={[globalStyles.rowSimple]}>
                <Image source={tick} style={styles.tintColorTick} />
                <Text color={'#006838'} size={9} SFmedium style={margin.left_4}>
                  {item?.advanceCancelfreeofCharge}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PropertiesCard;

const styles = StyleSheet.create({
  container: {marginTop: RF(16)},
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#fff',
    overflow: 'hidden',
  },
  propertyTmage: {
    width: '100%',
    height: RF(95),
    resizeMode: 'cover',
  },
  maskView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingLeft: 10,
    paddingBottom: 5,
    justifyContent: 'flex-end',
  },
  descView: {
    width: '100%',
    paddingVertical: RF(8),
    paddingHorizontal: RF(8),
  },
  icon: {
    height: RF(14),
    width: RF(14),
    resizeMode: 'contain',
  },
  star: {height: RF(12), width: RF(92), resizeMode: 'contain'},
  tintColor: {
    tintColor: '#00276D',
  },
  tintColorTick: {
    tintColor: '#006838',
    height: RF(16),
    width: RF(16),
  },
  discountLine: {
    position: 'absolute',
    borderTopWidth: 1,
    top: 10,
    width: '90%',
    alignSelf: 'flex-end',
    borderColor: '#FB2047',
  },
});
