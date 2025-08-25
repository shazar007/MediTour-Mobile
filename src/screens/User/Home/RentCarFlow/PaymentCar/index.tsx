import {ScrollView, View} from 'react-native';
import React from 'react';
import {
  AppButton,
  AppTextInput,
  HeaderCard,
  UserHeaderContent,
  Wrapper,
} from '@components';
import useStyles from './styles';
import {RF} from '@theme';
import {navigate} from '@services';
import {YY, banks} from '@assets';

const PaymentCar = ({navigation}) => {
  const styles = useStyles();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <HeaderCard notify numberOfIcons={'2'}>
          <UserHeaderContent ScreenTitle={'Add Payment'} size={20} />
        </HeaderCard>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.ViewStyle}>
            <AppTextInput
              placeholder={'Bank Name'}
              placeholderTextColor={'#00276D'}
              p_Horizontal={RF(0.5)}
            />
            <AppTextInput
              placeholder={'Card Number'}
              placeholderTextColor={'#00276D'}
              p_Horizontal={RF(0.5)}
              endIcon={banks}
              widthEndIcon={RF(100)}
              heightEndIcon={RF(16)}
            />
            <AppTextInput
              placeholder={'Expiry'}
              placeholderTextColor={'#00276D'}
              p_Horizontal={RF(0.5)}
              endIcon={YY}
              widthEndIcon={RF(48)}
            />
            <AppTextInput
              placeholder={'CVC'}
              placeholderTextColor={'#00276D'}
              p_Horizontal={RF(0.5)}
            />

            <View style={{height: '60%', justifyContent: 'flex-end'}}>
              <AppButton
                title="Submit"
                bgColor={'#fff'}
                textcolor={'#2A8FAF'}
                containerStyle={{
                  borderWidth: 1,
                  borderColor: '#2A8FAF',
                }}
                onPress={() => navigate('AnotherCardPayment')}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Wrapper>
  );
};

export default PaymentCar;
