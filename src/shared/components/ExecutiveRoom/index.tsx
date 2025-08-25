import {View, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import Text from '../text';
import {RF, SCREEN_WIDTH} from '@theme';
import AppButton from '../AppButton';

interface Props {
  onOpenModalize?: any;
  room?: any;
  Type?: any;
  size?: any;
  sofaBed?: any;
  Price?: any;
  StayingGuests?: any;
  diningRoom?: any;
  discription?: any;
  BreakFast?: any;
  noOfBed?: any;
  kitchens?: any;
  item?: any;
  bath?: any;
  roomName?: any;
  titleButton?: any;
}
const ExecutiveRoom = ({
  onOpenModalize,
  item,
  noOfBed,
  Price,
  Type,
  diningRoom,
  bath,
  kitchens,
  discription,
  size,
  sofaBed,
  BreakFast,
  StayingGuests,
  roomName,
  titleButton,
}: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;

  return (
    <View style={styles.CardStyle}>
      <View style={styles.ViewRow}>
        <Text color={colors.blueText} size={16} SFmedium>
          {roomName}
        </Text>
        {/* <TouchableOpacity onPress={handleOnPress}>
          <Image source={Question} style={styles.ImageView} />
        </TouchableOpacity> */}
      </View>
      <View style={styles.Gap}>
        <Text size={12} SFregular color={colors.blueText}>
          {Type}
        </Text>
        <Text size={12} SFregular color={colors.blueText}>
          No Of Bed: {noOfBed}
        </Text>
        <Text size={12} SFregular color={colors.blueText}>
          Size: {size} ft
        </Text>
        {diningRoom && (
          <Text size={12} SFregular color={colors.blueText}>
            {diningRoom}
          </Text>
        )}
        {bath && (
          <Text size={12} SFregular color={colors.blueText}>
            {bath}
          </Text>
        )}
        {kitchens && (
          <Text size={12} SFregular color={colors.blueText}>
            Kitchens: {kitchens}
          </Text>
        )}
        {sofaBed && (
          <Text size={12} SFregular color={colors.blueText}>
            NumberOfSofaBed: {sofaBed}
          </Text>
        )}
        {BreakFast && (
          <Text size={12} SFregular color={colors.blueText}>
            Breakfast: {BreakFast}
          </Text>
        )}
        {StayingGuests && (
          <Text size={12} SFregular color={colors.blueText}>
            TotalStayingGuests: {StayingGuests}
          </Text>
        )}
        {discription && (
          <>
            <Text size={14} SFsemiBold color={'#00810B'}>
              Room Discription
            </Text>
            <Text size={12} SFregular color={colors.blueText}>
              {discription}
            </Text>
          </>
        )}
      </View>

      <Text size={14} SFsemiBold color={'#00810B'} style={{marginTop: RF(8)}}>
        Fecilities
      </Text>
      <FlatList
        data={item?.facilities}
        scrollEnabled={false}
        contentContainerStyle={styles.FlatStyle}
        renderItem={({item}: any) => (
          <View>
            <Text
              size={9}
              SFmedium
              color={colors.primary}
              style={{marginBottom: RF(8)}}>
              {item}
            </Text>
          </View>
        )}
      />
      <View style={styles.ViewGap}>
        <Text size={14} SFsemiBold color={'#00810B'}>
          Price Per Night
        </Text>
        <Text size={18} color={colors.blueText} SFsemiBold>
          PKR {Price}
        </Text>
      </View>
      <AppButton onPress={onOpenModalize} title={titleButton} m_Top={RF(16)} />
    </View>
  );
};

export default ExecutiveRoom;
const styles = StyleSheet.create({
  FacilitiesStyle: {
    width: RF(32),
    height: RF(32),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RF(100),
    elevation: 1,
  },
  ParkingImage: {
    width: RF(20),
    height: RF(20),
    resizeMode: 'contain',
  },

  DisStyles: {marginVertical: RF(16), gap: RF(8)},
  FlatListContainer: {
    width: RF(32),
    height: RF(32),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RF(16),
    elevation: 5,
  },
  ScrollViewStyle: {
    marginHorizontal: RF(24),
    marginTop: RF(24),
    paddingBottom: RF(80),
  },
  FlatStyle: {
    width: '100%',
    marginTop: RF(4),
  },
  ImgStyle: {
    width: RF(20),
    height: RF(20),
    resizeMode: 'contain',
  },
  FlatListStyle: {
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: RF(16),
  },
  container: {width: '100%'},

  CardStyle: {
    width: '100%',
    paddingVertical: RF(16),
    paddingHorizontal: RF(10),
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: RF(16),
  },
  ViewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: RF(8),
  },
  ImageView: {width: RF(18), height: RF(18), resizeMode: 'contain'},
  Gap: {gap: RF(4)},
  TopView: {marginTop: RF(8), gap: RF(4)},
  ViewGap: {gap: RF(8)},
});
