import {View, ImageBackground, Image} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {CurvedCard, GoBack, Text, Wrapper} from '@components';
import {forgot, User} from '@assets';
import {RF} from '@theme';

const ForgotPassword = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const styles = useStyles(colors);

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'dark'}>
      <View style={styles.container}>
        <GoBack navigation={navigation} />
        <ImageBackground
          source={User}
          resizeMode="contain"
          style={styles.userImg}
          imageStyle={styles.backImage}>
          <CurvedCard>
            <View style={{flex: 1}}>
              <Text
                size={24}
                SFsemiBold
                color={colors.primary}
                style={{marginVertical: RF(32), alignSelf: 'center'}}>
                FORGOT PASSWORD
              </Text>
              <Image
                source={forgot}
                style={{
                  height: RF(72),
                  width: RF(72),
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
              <Text
                size={16}
                SFmedium
                color={'rgba(100, 100, 100, 1)'}
                style={{
                  marginVertical: RF(32),
                  alignSelf: 'center',
                  textAlign: 'center',
                }}>
                Please enter your Mobile Number to receive a Verification codess
              </Text>
            </View>
          </CurvedCard>
        </ImageBackground>
      </View>
    </Wrapper>
  );
};

export default ForgotPassword;
