import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {getColorCode, RF} from '@theme';
import {globalStyles, margin} from '@services';
import {drawer, dummyProfileIcon, notification} from '@assets';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';

const HomeServices_Header = ({navigation, name, item, logo, onOpen}: any) => {
  const theme: any = useTheme();
  const colors = theme?.colors;
  const {colorStack, colorCode} = getColorCode();
  const styles = useStyles(colorCode, colorStack);
  const pateintName = item?.upcomingAppointment?.patientId?.name;
  const appointmentType = item?.upcomingAppointment?.appointmentType;

  const userImage: any = item?.upcomingAppointment?.patientId?.userImage;

  const date = moment(item?.upcomingAppointment?.appointmentDateAndTime).format(
    'hh:mm A',
  );
  const formattedTime = moment(
    item?.upcomingAppointment?.appointmentDateAndTime,
  ).format('YYYY-MM-DD');

  const openDrawer = () => {
    navigation?.openDrawer();
  };

  return (
    <View style={{height: RF(320)}}>
      <View style={styles.backCircle} />
      <View style={styles?.drawerHeader}>
        <Pressable
        // onPress={openDrawer}
        >
          {/* <Image source={drawer} style={styles?.icon} /> */}
        </Pressable>
        <Pressable onPress={onOpen}>
          <Image source={notification} style={styles?.icon2} />
        </Pressable>
      </View>

      <View style={styles.headerView}>
        {/* ..//..............Profile ......................../. */}

        <View style={[globalStyles?.rowSimple, margin?.bottom_16]}>
          <Image style={styles?.profile} source={{uri: logo}} />
          <View style={[margin?.left_8, margin?.top_24]}>
            <Text size={20} color={colors?.ThemeText} SFsemiBold>
              {name}
            </Text>
            <Text
              size={12}
              color={colors?.ThemeText}
              style={{width: '65%', opacity: 0.8}}>
              Here your important notes & task please check your appointment
            </Text>
          </View>
        </View>

        {/* ..//..............Appointment card ......................../. */}
        <View style={styles?.appointmentCard}>
          <View style={{...globalStyles?.row, alignItems: 'flex-start'}}>
            <Text size={16} color={colorStack} SFsemiBold>
              Upcoming Appointment
            </Text>
            <View style={margin?.top_4}>
              <Text color={colors?.primary} size={10} SFmedium>
                {formattedTime}
              </Text>
              <Text
                color={colors?.primary}
                size={10}
                SFlight
                style={{textAlign: 'right'}}>
                {date}
              </Text>
            </View>
          </View>
          <View style={[globalStyles?.rowSimple, margin?.top_8]}>
            <Image
              style={{height: RF(48), width: RF(48), borderRadius: 40}}
              source={{uri: userImage}}
            />
            <View style={margin?.left_16}>
              <Text SFsemiBold>{pateintName}</Text>
              <Text>{appointmentType}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeServices_Header;

const useStyles = (color: any, textColor: any) =>
  StyleSheet.create({
    backCircle: {
      height: RF(550),
      width: RF(550),
      backgroundColor: color,
      borderRadius: 400,
      position: 'absolute',
      top: -300,
      left: -40,
    },
    headerView: {
      position: 'absolute',
      marginHorizontal: RF(24),
      left: 0,
      alignSelf: 'center',
      bottom: 0,
      right: 0,
    },
    icon: {
      height: RF(16),
      width: RF(16),
    },
    icon2: {
      height: RF(24),
      width: RF(24),
    },
    drawerHeader: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: RF(60),
      paddingHorizontal: RF(24),
    },
    profile: {
      height: RF(55),
      width: RF(55),
      borderWidth: 1,
      borderColor: '#fff',
      borderRadius: 50,
    },
    appointmentCard: {
      height: RF(120),
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 8,
      elevation: 1,
    },
  });
