import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import RoomSelection from '../RoomSelection';
import Text from '../text';
import {RF} from '@theme';

interface Props {
  MedicineBrand?: any;
  MedicineName?: any;
  MedicinePrice?: any;
  setQuantities?: any;
  Packet?: any;
  quantity?: any;
  MG?: any;
  confirmation?: any;
  selectedQuantity?: any;
  MedicineImage?: any;
  color?: any;
  item?: any;
  value?: any;
  setValue?: any;
  containerStyle?: any;
  restrict?: any;
}
const MedicineFolder = (props: Props) => {
  const {
    MedicineBrand,
    MedicineName,
    MedicinePrice,
    Packet,
    MG,
    MedicineImage,
    confirmation,
    selectedQuantity,
    color,
    item,
    value,
    setValue,
    containerStyle,
    restrict,
  } = props;

  const valuess = MG * selectedQuantity;
  const sort = valuess.toFixed(2);

  return (
    <>
      <View style={[styles.MainContainer, containerStyle]}>
        <View style={{flexDirection: 'row'}}>
          {/* <Image source={{uri: MedicineImage}} style={styles.ImageView} /> */}
          <View style={styles.RowDirection}>
            <Text
              numberOfLines={3}
              color={'#099BED'}
              size={14}
              SFmedium
              style={{width: RF(100)}}>
              {MedicineName}
            </Text>
            <Text color={'#099BED'} size={12} SFregular>
              {MedicineBrand}
            </Text>
            <Text color={'#099BED'} size={12} SFregular>
              {MedicinePrice}
            </Text>
            {confirmation ? (
              <Text color={'#099BED'} size={12} SFregular>
                Quantity : {selectedQuantity}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={[styles.ViewPrice]}>
          {confirmation ? (
            <Text size={12} SFregular color={'#099BED'}>
              Rs. {sort}
            </Text>
          ) : (
            <Text color={'#099BED'} size={12} SFmedium>
              {MG}
              <Text size={10} SFregular color={'#099BED'}>
                {Packet}
              </Text>
            </Text>
          )}
        </View>
      </View>

      {confirmation ? null : (
        <RoomSelection
          item={item}
          color={color}
          value={value}
          title={'Quantity'}
          restrict={restrict}
          setValue={setValue}
        />
      )}
    </>
  );
};

export default MedicineFolder;

const styles = StyleSheet.create({
  MainContainer: {
    width: '100%',
    height: RF(77),
    marginTop: RF(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ImageView: {width: RF(80), height: RF(77), resizeMode: 'contain'},
  RowDirection: {
    flexDirection: 'column',
    marginTop: RF(4),
    marginLeft: RF(4),
  },
  ViewPrice: {
    bottom: 0,
    position: 'absolute',
    right: 0,
  },
});
