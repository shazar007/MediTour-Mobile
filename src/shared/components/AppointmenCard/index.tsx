import React from 'react';
import Text from '../text';
import useStyles from './styles';
import {navigate} from '@services';
import {app_Img, appointment, opd} from '@assets';
import CustomIcon from '../CustomIcon';
import {Platform, Pressable, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setChangeColor} from '@redux';

const ios = Platform.OS == 'ios';
const AppointmentCard = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors, ios);
  const dispatch = useDispatch();

  const handleLaboratory = (
    screenName?: any,
    colorCode?: string,
    parmas?: string,
  ) => {
    navigate(screenName, {type: parmas});
    dispatch(setChangeColor(colorCode));
  };

  // const onPress = () => {
  //   navigate('Appointment');
  // };

  return (
    <Pressable
      style={styles.padding}
      onPress={() => handleLaboratory('UserOPD', 'rgba(0, 39, 109, 1)')}>
      <View style={styles.appointment}>
        <CustomIcon source={appointment} tintColor={colors.primary} />
        <View>
          <Text
            color={colors.primary}
            SFsemiBold
            size={14}
            style={styles.marginLeft}>
            Online OPD
          </Text>
          <Text color={colors.primary} size={12} style={styles.marginLeft}>
            Consultant & Free
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default AppointmentCard;
