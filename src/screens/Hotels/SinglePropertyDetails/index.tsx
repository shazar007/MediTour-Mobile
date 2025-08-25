import {
  CustomHeader,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {getSingleBNB, getSingleHome, getSinglePropertyDetail} from '@services';
import {RF, SCREEN_WIDTH} from '@theme';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';

const SinglePropertyDetails = ({route}: any) => {
  const {item, response} = route.params;
  const {B2B} = useSelector((state: any) => state.root.b2b);
  const lab = B2B?.hotel;

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader title={response} leftIcon titleColor={'#fff'} notify />
        <ScrollView style={styles.container}>
          <View style={{paddingBottom: RF(50)}}>
            <View>
              <Carousel
                data={
                  item?.homeImages
                    ? item?.homeImages
                    : item?.apartments?.[0]?.appartmentImages
                    ? item?.apartments?.[0]?.appartmentImages
                    : item?.bnb?.rooms?.[0]?.roomImages
                }
                renderItem={({item}: any) => {
                  return (
                    <View style={styles.imageContainer}>
                      <Image
                        source={{
                          uri:
                            item ||
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                        }}
                        style={styles.mainImage}
                      />
                    </View>
                  );
                }}
                firstItem={0}
                loop={true}
                autoplay
                autoplayInterval={3000}
                inactiveSlideScale={0.8}
                inactiveSlideOpacity={2}
                sliderWidth={SCREEN_WIDTH}
                itemWidth={SCREEN_WIDTH}
              />
            </View>
            <View style={styles.detailsContainer}>
              {response === 'Apartment' ? (
                <Section
                  title1={`${item?.customName}`}
                  Value1={'Custom Name:'}
                  title2={item?.contactNumber}
                  Value2={'Contact Number:'}
                  Value3={'Appartment No'}
                  title3={item?.apartments?.[0]?.appartmentNo}
                  Value4={'Appartment Name:'}
                  title4={item?.apartments?.[0]?.appartmentName}
                  Value5={'Appartment Size:'}
                  title5={item?.apartments?.[0]?.appartmentSize}
                  Value6={'Number Of Bedroom:'}
                  title6={item?.apartments?.[0]?.numberOfBedroom}
                  Value7={'kitchens:'}
                  title7={item?.apartments?.[0]?.kitchens}
                  Value8={'Language:'}
                  title8={item?.language}
                  item={item}
                  Value9={'Price:'}
                  title9={item?.apartments?.[0]?.basePricePerNight}
                  Value10={'Number Of Diningrooms'}
                  title10={item?.apartments?.[0]?.numberOfDiningrooms}
                  Value11={'Location'}
                  title11={item?.location?.address}
                />
              ) : response === 'B&B' ? (
                item?.bnb?.rooms.map((user: any) => (
                  <Section
                    title1={`${item?.bnb?.customName}`}
                    Value1={'Custom Name:'}
                    title2={item?.bnb?.contactNumber}
                    Value2={'Contact Number:'}
                    item={item?.bnb}
                    Value3={'Price:'}
                    title3={user?.pricePerNight}
                    Value4={'Room Name:'}
                    title4={user?.roomName}
                    Value5={'Room Size:'}
                    title5={user?.roomSize}
                    Value6={'Room Type:'}
                    title6={user?.roomType}
                    Value7={'Room Description:'}
                    title7={user?.roomDescription}
                    Value8={'Language:'}
                    title8={item?.bnb?.language}
                    Value9={'Bed Kinds:'}
                    title9={user?.bedKinds}
                    Value10={'Advance Cancel free of Charge'}
                    title10={item?.bnb?.advanceCancelfreeofCharge}
                    Value11={'Location'}
                    title11={item?.bnb?.location?.address}
                  />
                ))
              ) : (
                <Section
                  title1={`${item?.customName}`}
                  Value1={'Custom Name:'}
                  title2={item?.contactNumber}
                  Value2={'Contact Number:'}
                  Value3={'Price:'}
                  title3={item?.basePricePerNight}
                  Value4={'Home Name:'}
                  title4={item?.homeName}
                  Value5={'Home Size:'}
                  title5={item?.homeSize}
                  Value6={'Home Type:'}
                  title6={item?.homeType}
                  Value7={'Kitchens:'}
                  title7={item?.kitchens}
                  Value8={'Language:'}
                  item={item}
                  title8={item?.language}
                  Value9={'Number Of Floors:'}
                  title9={item?.numberOfFloors}
                  Value10={'Number Of Bedroom'}
                  title10={item?.numberOfBedroom}
                  Value11={'Location'}
                  title11={item?.location?.address}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  imageContainer: {
    height: RF(100),
    width: SCREEN_WIDTH - 42,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  mainImage: {
    width: '100%',
    height: RF(100),
    resizeMode: 'contain',
  },
  subImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  subImage: {
    width: '48%',
    height: 100,
    borderRadius: 10,
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: RF(10),
    padding: RF(20),
    marginTop: RF(16),
  },
  locationText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 16,
    color: '#000000',
  },
  policyTitle: {
    fontSize: 18,
    color: '#0D47A1',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  policyText: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 22,
  },
});
const Section = ({
  title1,
  Value1,
  Value2,
  title2,
  Value3,
  title3,
  Value4,
  title4,
  Value5,
  title5,
  Value6,
  title6,
  Value7,
  title7,
  Value8,
  title8,
  Value9,
  title9,
  Value10,
  title10,
  Value11,
  title11,
  item,
}: {
  title1?: any;
  item?: any;
  Value1?: any;
  onSubmit?: any;
  saveHistory?: any;
  setLoading?: any;
  title2?: any;
  Value9?: any;
  title9?: any;
  Value2?: any;
  Value3?: any;
  title3?: any;
  Value4?: any;
  title4?: any;
  Value5?: any;
  title5?: any;
  Value6?: any;
  title6?: any;
  Value7?: any;
  title7?: any;
  Value8?: any;
  title8?: any;
  Value10?: any;
  title10?: any;
  Value11?: any;
  title11?: any;
}) => {
  return (
    <View>
      <Text size={14} SFmedium color={'#00276D'}>
        {Value1}{' '}
        <Text size={12} SFregular color={'#00276D'}>
          {title1}
        </Text>
      </Text>
      <Text size={14} SFmedium color={'#00276D'}>
        {Value2}{' '}
        <Text size={12} SFregular color={'#00276D'}>
          {title2}
        </Text>
      </Text>
      <Text size={14} SFmedium color={'#00276D'}>
        {Value3}{' '}
        <Text size={12} SFregular color={'#00276D'}>
          {title3}
        </Text>
      </Text>
      <Text size={14} SFmedium color={'#00276D'}>
        {Value4}{' '}
        <Text size={12} SFregular color={'#00276D'}>
          {title4}
        </Text>
      </Text>
      <Text size={14} SFmedium color={'#00276D'}>
        {Value5}{' '}
        <Text size={12} SFregular color={'#00276D'}>
          {title5}
        </Text>
      </Text>
      <Text size={14} SFmedium color={'#00276D'}>
        {Value6}{' '}
        <Text size={12} SFregular color={'#00276D'}>
          {title6}
        </Text>
      </Text>
      <Text size={14} SFmedium color={'#00276D'}>
        {Value7}{' '}
        <Text size={12} SFregular color={'#00276D'}>
          {title7}
        </Text>
      </Text>
      <Text size={14} SFmedium color={'#00276D'}>
        {Value8}{' '}
        <Text size={12} SFregular color={'#00276D'}>
          {title8}
        </Text>
      </Text>
      <Text size={14} SFmedium color={'#00276D'}>
        {Value9}{' '}
        <Text size={12} SFregular color={'#00276D'}>
          {title9}
        </Text>
      </Text>
      <Text size={14} SFmedium color={'#00276D'}>
        {Value10}{' '}
        <Text size={12} SFregular color={'#00276D'}>
          {title10}
        </Text>
      </Text>
      <View style={{marginTop: RF(8)}}>
        <Text size={16} SFmedium color={'#00276D'}>
          {Value11}
        </Text>
        <Text size={12} SFregular color={'#00276D'}>
          {title11}
        </Text>
      </View>
      <View style={{marginTop: RF(8)}}>
        <Text size={16} SFmedium color={'rgba(0, 39, 109, 1)'}>
          Amenities
        </Text>
        {item?.amenities?.map((user: any) => (
          <Text
            size={12}
            SFregular
            style={{marginVertical: RF(4)}}
            color={'rgba(0, 39, 109, 1)'}>
            {user}
          </Text>
        ))}
      </View>
      <View>
        <Text size={16} SFmedium color={'rgba(0, 39, 109, 1)'}>
          Facilities
        </Text>
        {item?.facilities?.map((user: any) => (
          <Text
            size={12}
            SFregular
            style={{marginVertical: RF(4)}}
            color={'rgba(0, 39, 109, 1)'}>
            {user}
          </Text>
        ))}
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Check-in:</Text>
        <Text style={styles.infoValue}>
          {moment(item?.policies?.checkInTo).format('h:mmA')}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Check-out:</Text>
        <Text style={styles.infoValue}>
          {moment(item?.policies?.checkOutTo).format('h:mmA')}
        </Text>
      </View>
    </View>
  );
};
export default SinglePropertyDetails;
