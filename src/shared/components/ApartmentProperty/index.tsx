import {
  Image,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {RF} from '@theme';
import Text from '../text';
import {globalStyles, margin} from '@services';
import {useTheme} from '@react-navigation/native';
import {like, location, property1, tick} from '@assets';

const ApartmentProperty = ({
  item,
  onPress,
  PriceHotel,
  adultValue,
}: {
  item?: any;
  onPress?: any;
  PriceHotel?: any;
  adultValue?: any;
}) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.card}>
          {/* ...................Property Image................... */}
          <ImageBackground style={styles.propertyTmage} source={property1}>
            <View style={styles.maskView}>
              <Text SFmedium color={'#fff'} size={14}>
                {item?.BreakFast}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.descView}>
            <View style={globalStyles.row}>
              <Text
                color={colors.blueText}
                SFmedium
                size={16}
                style={{width: RF(200)}}>
                {item?.propertyName}
              </Text>
              <Image source={like} style={styles.icon} />
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
                {item?.location?.address}
              </Text>
            </View>
            {/* ...................Property Details................... */}
            {/* <View style={[globalStyles.row, margin.top_8]}>
              <View style={[globalStyles.rowSimple, {width: '50%'}]}>
                <Text color={'rgba(0, 39, 109, 1)'} size={12} SFregular>
                  Hotel room:{' '}
                </Text>
                <Text color={colors.blueText} size={12} SFregular>
                  {item?.rooms?.[0].noOfBeds} bed
                </Text>
              </View>
            </View> */}
            {/* ...................Prrice for night................... */}
            <View style={[globalStyles.row, margin.top_16]}>
              <View style={[globalStyles.rowSimple]}>
                <Text color={colors.blueText} size={12} SFregular>
                  Price for 1 night,{adultValue} adult
                </Text>
              </View>
            </View>
            {/* ...................Total Price................... */}
            <View style={[globalStyles.row, margin.top_4]}>
              <Text size={16} SFmedium color={colors.blueText}>
                PKR {PriceHotel}
              </Text>
              <View style={[globalStyles.rowSimple]}>
                <Image source={tick} style={styles.tintColorTick} />
                <Text color={'#006838'} size={9} SFmedium style={margin.left_4}>
                  Free cancelation
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ApartmentProperty;

const styles = StyleSheet.create({
  container: {marginTop: RF(8)},
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
    height: RF(16),
    width: RF(16),
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
