import {StyleSheet, View, Image, Platform} from 'react-native';
import React from 'react';
import Card from '../ResponsiveCard';
import CustomIcon from '../CustomIcon';
import {
  bed,
  dash_Doctors,
  dash_HomeServices,
  dash_Laboratory,
  dash_Pharmacy,
  homeService,
  Icon11,
  Icon13,
  Icon2,
  Icon4,
  Icon5,
  travel,
  travelcard,
} from '@assets';
import Text from '../text';
import {LAYOUT, RF} from '@theme';
import {navigate, rs, rv} from '@services';
import {setChangeColor} from '@redux';
import {useDispatch} from 'react-redux';

const layout = LAYOUT.MARGIN;
const ios = Platform.OS === 'ios';
const weight: any = ios ? 700 : 600;

const Section1 = () => {
  const dispatch = useDispatch();

  const handleLaboratory = (
    screenName?: any,
    colorCode?: string,
    parmas?: string,
  ) => {
    navigate(screenName, {type: parmas});
    dispatch(setChangeColor(colorCode));
  };

  return (
    <View>
      <Card
        height={ios ? rv(70) : rv(72)}
        color={'rgba(19, 168, 158, 1)'}
        screen={() =>
          handleLaboratory('UserDoctor', 'rgba(19, 168, 158, 1)', 'Doctor')
        }>
        <CustomIcon source={Icon2} />
        <View style={styles.innerRow}>
          <Text size={14} style={{fontWeight: weight}} SFbold color={'#fff'}>
            Doctors
          </Text>
          <Text size={12} SFregular color={'#fff'} style={styles.marginTop}>
            Verified Doctors & Hospital
          </Text>
        </View>
        <View style={styles.image1}>
          <Image
            style={styles.cardImage}
            source={
              dash_Doctors
              // doctors
            }
            resizeMode={'contain'}
          />
        </View>
      </Card>

      <View style={styles.rowContainer}>
        <Card
          width={'48.5%'}
          color={'rgba(238, 116, 55, 1)'}
          screen={() =>
            handleLaboratory('UserLaboratory', 'rgba(238, 116, 55, 1)')
          }>
          <View>
            <CustomIcon source={Icon4} />
            <Text
              size={14}
              style={{fontWeight: weight, marginTop: 8}}
              SFbold
              color={'#fff'}>
              Laboratory
            </Text>
          </View>
          <Image
            style={[styles.cardImage, {width: rs(70), height: rv(74)}]}
            source={
              dash_Laboratory
              // lab
            }
            // resizeMode={'contain'}
          />
        </Card>

        <Card
          width={'48.5%'}
          color={'rgba(9, 155, 237, 1)'}
          screen={() =>
            handleLaboratory('UserPharmacy', 'rgba(9, 155, 237, 1)')
          }>
          <View>
            <CustomIcon source={Icon5} />
            <Text
              size={14}
              style={{fontWeight: weight, marginTop: 8}}
              SFbold
              color={'#fff'}>
              Pharmacy
            </Text>
          </View>
          <Image
            style={[
              styles.cardImage,
              {width: rs(54), height: rv(70), right: 5, bottom: RF(-8)},
            ]}
            source={dash_Pharmacy}
            // resizeMode={'contain'}
          />
        </Card>
      </View>
    </View>
  );
};

const Section2 = () => {
  const dispatch = useDispatch();
  const handleLaboratory = (screenName: string, colorCode: string) => {
    navigate(screenName);
    dispatch(setChangeColor(colorCode));
  };
  return (
    <View style={[styles.section2Container]}>
      <View
        style={{
          width: '60%',
          height: '100%',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            height: ios ? rv(90) : rv(100),
          }}>
          <Card
            color={'#3B58B8'}
            screen={() => handleLaboratory('MainHTR', '#3B58B8')}>
            <View style={{marginBottom: 20}}>
              <CustomIcon source={travel} tintColor={'#3B58B8'} />
            </View>
            <View style={styles.innerRow}>
              <Text
                size={14}
                style={{fontWeight: weight, marginBottom: 4}}
                SFbold
                color={'#fff'}>
                Travel & Tourism
              </Text>

              <Text size={12} SFregular color={'#fff'}>
                Visa Services
              </Text>
              <Text size={12} SFregular color={'#fff'}>
                Rent A Car
              </Text>
            </View>
            <Image
              style={[
                styles.cardImage,
                {width: rs(64), height: rv(64), right: 5},
              ]}
              source={travelcard}
              resizeMode={'contain'}
            />
          </Card>
        </View>

        <View style={{height: rv(64)}}>
          <Card
            color={'rgba(0, 59, 149, 1)'}
            screen={() =>
              handleLaboratory('UserTravelAndTourism', 'rgba(0, 59, 149, 1)')
            }>
            <View style={{flexDirection: 'row'}}>
              <CustomIcon source={bed} />
              <View style={styles.innerRow}>
                <Text
                  size={14}
                  style={{fontWeight: weight}}
                  SFbold
                  color={'#fff'}>
                  Hotels
                </Text>
                <Text
                  size={12}
                  SFregular
                  color={'#fff'}
                  style={{marginTop: rv(4)}}>
                  Stay at Best Place
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </View>
      <View
        style={{
          height: '100%',
          width: '37.5%',
        }}>
        <Card
          color={'#B1800A'}
          colum
          alignStart
          screen={() => handleLaboratory('UserHomeService', '#B1800A')}>
          <View style={{marginTop: 20}}>
            <CustomIcon source={homeService} />
            <Text
              size={14}
              style={{fontWeight: weight, marginTop: rv(6)}}
              SFbold
              color={'#fff'}>
              Home Service
            </Text>
            <Text size={12} SFregular color={'#fff'} style={styles.marginTop}>
              Doctors
            </Text>
            <Text size={12} SFregular color={'#fff'} style={styles.marginTop}>
              Ambulance
            </Text>

            <Text size={12} SFregular color={'#fff'} style={styles.marginTop}>
              Physiotherapists
            </Text>
            <Text size={12} SFregular color={'#fff'} style={styles.marginTop}>
              Psychologists
            </Text>
            <Text size={12} SFregular color={'#fff'} style={styles.marginTop}>
              Nutritionist
            </Text>
            <Text size={12} SFregular color={'#fff'} style={styles.marginTop}>
              Nurses
            </Text>
          </View>
          {/* <Image
            style={[
              styles.cardImage,
              {
                width: rs(65),
                height: rv(90),
                right: -10,
              },
            ]}
            source={dash_HomeServices}
            resizeMode={'contain'}
          /> */}
        </Card>
      </View>
    </View>
  );
};

const Section3 = () => {
  const dispatch = useDispatch();
  const handleLaboratory = (screenName: string, colorCode: string) => {
    navigate(screenName);
    dispatch(setChangeColor(colorCode));
  };
  return (
    <View style={styles.section3Container}>
      <Card
        width={'48.5%'}
        color={'#746CA2'}
        screen={() => handleLaboratory('UserInsurance', '#746CA2')}>
        <CustomIcon source={Icon13} />
        <View style={styles.innerRow}>
          <Text size={14} style={{fontWeight: weight}} SFbold color={'#fff'}>
            Insurance
          </Text>
          <Text size={12} SFregular color={'#fff'} style={{marginTop: 4}}>
            Health & Travel
          </Text>
        </View>
      </Card>

      <Card
        width={'48.5%'}
        color={'#E25D5D'}
        screen={() => handleLaboratory('UserDonation', '#E25D5D')}>
        <CustomIcon source={Icon11} tintColor={'#E25D5D'} />
        <View style={styles.innerRow}>
          <Text size={14} style={{fontWeight: weight}} SFbold color={'#fff'}>
            Donation
          </Text>
          <Text size={12} SFregular color={'#fff'} style={{marginTop: 4}}>
            Help People
          </Text>
        </View>
      </Card>
    </View>
  );
};

export {Section1, Section2, Section3};

const styles = StyleSheet.create({
  cardImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    right: 0,
    bottom: -14,
  },
  innerRow: {
    marginLeft: 8,
  },
  image1: {
    width: RF(100),
    height: '100%',
    // right: 0,
  },
  marginTop: {marginTop: ios ? rv(1) : rv(-1)},
  rowContainer: {
    height: ios ? rv(70) : rv(72),
    marginTop: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  section2Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: ios ? rv(160) : rv(172),
    marginTop: layout.LOW,
  },
  section3Container: {
    height: ios ? rv(62) : rv(66),
    marginTop: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
