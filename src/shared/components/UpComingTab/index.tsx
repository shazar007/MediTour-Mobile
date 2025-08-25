import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import Text from '../text';
import moment from 'moment';

interface Props {
  onPress?: () => void;
  item?: any;
  title?: string;
  RowTrue?: boolean;
  TypeAppoint?: string;
  Specialist?: string;
  Education?: string;
  doctorImage?: string;
  DateTime?: string;
  HospitalName?: string;
  imageBtn?: any;
  DoctorName?: string;
  selected?: string;
}

const UpComingTab = ({
  onPress,
  item,
  title,
  RowTrue,
  DoctorName,
  HospitalName,
  doctorImage,
  TypeAppoint,
  Education,
  DateTime,
  imageBtn,
  Specialist,
  selected,
}: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);

  const formattedDate = useMemo(() => {
    return moment(item?.appointmentDateAndTime).format('M/D/YYYY');
  }, [item?.appointmentDateAndTime]);

  const formattedTime = useMemo(() => {
    return moment(item?.appointmentDateAndTime).format('h:mm A');
  }, [item?.appointmentDateAndTime]);

  return (
    <View style={styles.card}>
      {/* Profile and Name Section */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri:
              item?.doctorId?.doctorImage ||
              doctorImage ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
          }}
          style={styles.profileImage}
        />
        <View style={styles.nameSection}>
          <Text size={18} SFmedium color={colors.primary}>
            {item?.doctorId?.name || DoctorName}
          </Text>
          <Text size={12} SFregular color={'#7D7D7D'}>
            {item?.doctorId?.speciality?.join(', ') || Specialist}
          </Text>
        </View>
      </View>

      {/* Appointment Details */}
      <View style={styles.detailsSection}>
        <Text size={14} SFregular color={colors.primary}>
          Appointment Date:
        </Text>
        <Text size={14} SFmedium color={colors.accent}>
          {formattedDate || DateTime}
        </Text>

        <Text
          size={14}
          SFregular
          color={colors.primary}
          style={styles.detailSpacing}>
          Time:
        </Text>
        <Text size={14} SFmedium color={colors.accent}>
          {formattedTime || DateTime}
        </Text>

        <Text
          size={14}
          SFregular
          color={colors.primary}
          style={styles.detailSpacing}>
          Type:
        </Text>
        <Text size={14} SFmedium color={colors.accent}>
          {item?.appointmentType || TypeAppoint}
        </Text>
      </View>

      {/* Extra Info */}
      <View style={styles.extraInfoSection}>
        <Text size={12} SFregular color={colors.primary}>
          {item?.doctorId?.qualifications || Education}
        </Text>
        <Text size={12} SFregular color={colors.primary}>
          {item?.doctorId?.clinicName || HospitalName}
        </Text>
      </View>

      {/* Action Button */}
      {RowTrue && (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
          <Image source={imageBtn} style={styles.buttonIcon} />
          <Text size={12} SFmedium color={'#FFFFFF'}>
            {title || 'Book Now'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UpComingTab;

const useStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: '#ffff',
      borderRadius: RF(20),
      padding: RF(16),
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 8,
      shadowOffset: {width: 0, height: 2},
    },
    profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: RF(12),
    },
    profileImage: {
      width: RF(60),
      height: RF(60),
      borderWidth: 1,
      borderColor: '#DEEEF78F',
      borderRadius: RF(30),
      resizeMode: 'contain',
    },
    nameSection: {
      marginLeft: RF(16),
      flex: 1,
    },
    detailsSection: {
      backgroundColor: colors?.light_grey,
      borderRadius: RF(12),
      padding: RF(12),
      marginVertical: RF(10),
    },
    detailSpacing: {
      marginTop: RF(6),
    },
    extraInfoSection: {
      marginTop: RF(10),
      paddingHorizontal: RF(10),
    },
    buttonContainer: {
      backgroundColor: '#1A3D7C',
      borderRadius: RF(10),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: RF(10),
      marginTop: RF(10),
    },
    buttonIcon: {
      width: RF(18),
      height: RF(18),
      resizeMode: 'contain',
      tintColor: '#FFFFFF',
      marginRight: RF(6),
    },
  });
