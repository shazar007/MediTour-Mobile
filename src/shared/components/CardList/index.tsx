import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../text';
import {RF} from '@theme';
import {LabDownload, pre, TestLab1} from '@assets';

const CardList = ({
  onPress,
  title,
  label,
  presc,
  onOpen,
  title2,
  title3,
  showValue,
  item,
}: {
  onPress?: any;
  title?: any;
  label?: any;
  presc?: any;
  onOpen?: any;
  title2?: any;
  item?: any;
  title3?: any;
  showValue?: any;
}) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles: any = useStyles(colors);
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} style={styles.txt}>
        <View style={styles.row}>
          <Text SFregular size={16} color={colors?.bluE}>
            {title}
          </Text>
          <Text SFregular size={16} color={colors?.bluE}>
            {title2}
          </Text>
        </View>

        <View style={styles.row}>
          <Text
            SFregular
            size={16}
            color={colors?.bluE}
            style={{width: RF(200)}}>
            {label}
          </Text>
          <Text SFregular size={16} color={colors?.bluE}>
            {title3}
          </Text>
        </View>
      </TouchableOpacity>
      {/* {showValue &&
         item?.ePrescription?.test?.[0]?.results.map(user => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: RF(8),
            }}>
            <View
              style={{flexDirection: 'row', alignItems: 'center', gap: RF(4)}}>
              <Image
                source={pre}
                style={{width: RF(16), height: RF(16), overflow: 'hidden'}}
              />
              <Text>Check up Result.pdf 123kb</Text>
            </View>
            <View
              style={{
                backgroundColor: '#00276D',
                width: RF(16),
                height: RF(16),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: RF(4),
              }}>
              <Image
                source={LabDownload}
                style={{
                  width: RF(12),
                  height: RF(12),
                  resizeMode: 'contain',
                  tintColor: '#fff',
                }}
              />
            </View>
          </View>
        ))} */}
      {presc && (
        <Pressable onPress={onOpen} style={{alignSelf: 'center'}}>
          <Text color={colors?.orange} belowLine>
            Prescription
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const useStyles = (colors: any) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    txt: {justifyContent: 'center'},

    card: {
      backgroundColor: colors.background,
      elevation: 2,
      padding: RF(8),
      borderRadius: RF(8),
      borderLeftColor: colors.Hospital,
      borderLeftWidth: 2,
      marginHorizontal: RF(20),
      marginVertical: RF(8),
      justifyContent: 'center',
    },
  });

export default CardList;
