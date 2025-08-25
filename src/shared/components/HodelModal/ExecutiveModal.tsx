import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../text';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import RoomSelection from '../RoomSelection';
import Line from '../Line';
import AppButton from '../AppButton';

interface Props {
  onPress?: any;
  item?: any; // Add item prop
  totalPrice?: any;
  selectedRooms: any;
  setSelectedRooms: any;
}

const ExecutiveModal = (props: Props) => {
  const {onPress, item, totalPrice, selectedRooms, setSelectedRooms} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const handleQuantityChange = (quantity: any) => {
    //

    setSelectedRooms(item._id, quantity);
  };

  return (
    <View style={styles.container}>
      <Text size={20} color={colors.blueText} SFmedium style={styles.title}>
        {item?.roomName || item?.apartments?.[0]?.roomName}
      </Text>
      <RoomSelection
        size={14}
        M_t={RF(16)}
        setValue={handleQuantityChange}
        value={
          selectedRooms.find((room: any) => room.id === item._id)?.quantity || 0
        }
        color={'#00276D'}
        title={'Number of rooms'}
      />
      <Line colors={colors.blueText} />

      <Text size={14} SFmedium color={colors.blueText} style={styles.priceText}>
        PKR {totalPrice}{' '}
        <Text size={14} SFmedium color={colors.blueText}>
          {selectedRooms.length === 0
            ? '0 room'
            : selectedRooms.reduce(
                (total: any, room: any) => total + room.quantity,
                0,
              ) > 0
            ? `${selectedRooms.reduce(
                (total: any, room: any) => total + room.quantity,
                0,
              )} rooms`
            : selectedRooms.map((item: any) => {
                item?.quantity;
              })}
        </Text>
      </Text>
      {/* <Text size={12} SFregular style={styles.taxesText}>
        + PKR 2,786 taxes and fees
      </Text> */}
      <AppButton title="Choose" m_Top={RF(24)} onPress={onPress} />
    </View>
  );
};

export default ExecutiveModal;

const styles = StyleSheet.create({
  container: {
    padding: RF(8),
    gap: RF(8),
  },
  title: {
    marginTop: RF(0),
  },
  priceText: {
    marginTop: RF(8),
  },
  taxesText: {
    marginTop: RF(8),
  },
});
