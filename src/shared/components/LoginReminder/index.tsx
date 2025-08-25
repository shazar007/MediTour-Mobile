import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLoggedIn} from '@redux';
import {margin, rs, rv} from '@services';
import {SvgUri} from 'react-native-svg';
import {reminderIcon} from '@assets';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import AppButton from '../AppButton';
import Line from '../Line';

const LoginReminder = () => {
  const dispatch: any = useDispatch();
  const theme: any = useTheme();
  const colors = theme.colors;

  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const navigateToLogin = () => {
    dispatch(setIsLoggedIn(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.roundView}>
          <Image
            source={reminderIcon}
            style={{...styles.icon, tintColor: changeColor}}
          />
        </View>
        <Text SFsemiBold color={colors.black}>
          First you’ve to create login
        </Text>
        <Text style={margin?.top_12} color={colors.black} center>
          Start making your next experience with MediTour, login first
        </Text>
        <AppButton
          bgClr={changeColor}
          onPress={navigateToLogin}
          title="Login"
          m_Top={rv(60)}
        />

        <View style={styles.seperator} />
        <Text style={margin?.top_12} color={'#7D7D7D'} center>
          Access to a Vast Network
        </Text>
      </View>
    </View>
  );
};

export default LoginReminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rs(24),
  },

  card: {
    borderRadius: rs(12),
    width: '100%',
    padding: rs(24),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  roundView: {
    height: 111,
    width: 111,
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginBottom: rv(28),
  },
  icon: {
    height: '85%',
    width: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    alignSelf: 'center',
  },
  seperator: {
    borderBottomWidth: 0.5,
    width: '100%',
    borderColor: '#7D7D7D',
    marginTop: rv(32),
    marginBottom: rv(16),
  },
});
