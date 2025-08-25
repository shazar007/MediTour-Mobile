import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {dropIcon, upload} from '@assets';
import useStyles from './styles';
import {globalStyles, margin} from '@services';

const Property = ({data}: {data?: any}) => {
  const [amenities, setAmenities] = useState(false);
  const styles = useStyles();
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <View style={{marginTop: RF(24)}}>
      <Text size={18} SFbold color={colors.blueText}>
        Staff Speaking
      </Text>
      <Text
        size={12}
        SFregular
        color={colors.blueText}
        style={{marginVertical: RF(8)}}>
        {data?.language}
      </Text>
      <Text size={18} SFsemiBold color={colors.blueText}>
        Property surroundings
      </Text>

      <View style={{marginTop: RF(4)}}>
        <FlatList
          scrollEnabled={false}
          data={data.propertySurroundings}
          renderItem={({item}) => {
            return (
              <View style={styles.HotelStyle}>
                <Text size={14} color={colors.blueText} SFmedium>
                  {item?.propertyName}
                </Text>
                <Text size={14} color={colors.blueText} SFmedium>
                  {item.propertyDistance}
                </Text>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.selectedContainer}>
        <Text size={18} color={colors.blueText} SFsemiBold>
          Policies
        </Text>
        <TouchableOpacity onPress={() => setAmenities(!amenities)}>
          <Image
            source={amenities ? upload : dropIcon}
            style={styles.dropIcon}
          />
        </TouchableOpacity>
      </View>
      <Text size={14} SFregular color={'#7D7D7D'} style={{marginTop: RF(4)}}>
        Check In From{' '}
        {`${data.policies?.checkInFrom} Until ${data.policies?.checkInTo}`}
      </Text>
      <Text size={14} SFregular color={'#7D7D7D'}>
        Check Out From{' '}
        {`${data.policies?.checkOutFrom} Until ${data.policies?.checkOutTo}`}
      </Text>
      {amenities && (
        <>
          <View style={[globalStyles.row, margin.top_8]}>
            <Text size={14} SFsemiBold color={colors.primary}>
              Pets
            </Text>
            <Text size={12} SFregular color={colors.primary}>
              {data?.pets} Allowed
            </Text>
          </View>
          {data?.chargesOfPets && (
            <View style={[globalStyles.row, margin.top_8]}>
              <Text size={14} SFsemiBold color={colors.primary}>
                Charges of Pets
              </Text>
              <Text size={12} SFregular color={colors.primary}>
                {data?.chargesOfPets}
              </Text>
            </View>
          )}
          <Text
            size={14}
            SFsemiBold
            color={colors.primary}
            style={{marginTop: RF(8)}}>
            Policy Against Accidental Booking
          </Text>
          <Text
            size={14}
            SFregular
            color={colors.primary}
            style={{marginTop: RF(8)}}>
            {data?.advanceCancelfreeofCharge}
          </Text>
          {data?.minimumStay && (
            <>
              <Text
                size={14}
                SFsemiBold
                color={colors.primary}
                style={{marginTop: RF(8)}}>
                Minimum stay
              </Text>
              <Text
                size={14}
                SFregular
                color={colors.primary}
                style={{marginTop: RF(8)}}>
                {data?.minimumStay}
              </Text>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default Property;

// const styles = StyleSheet.create({});
