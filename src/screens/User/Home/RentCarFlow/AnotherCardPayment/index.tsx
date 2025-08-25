import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {
  AppButton,
  AppTextInput,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import useStyles from './styles';
import {RF} from '@theme';
import {Group, YY, banks} from '@assets';
import {navigate} from '@services';
import {useTheme} from '@react-navigation/native';

const AnotherCardPayment = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles();
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [showAddAnotherButton, setShowAddAnotherButton] = useState(true);

  const handleAddAnother = () => {
    setShowAdditionalFields(true);
    setShowAddAnotherButton(false);
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <HeaderCard notify numberOfIcons={'2'}>
          <UserHeaderContent ScreenTitle={'Add Payment'} />
        </HeaderCard>
        <View style={styles.MainContainer}>
          <View style={styles.MainCardStyle}>
            <Image source={Group} style={styles.ImgStyles} />
            <Text size={13} SFmedium color={colors.blueText}>
              Bank Name
            </Text>
          </View>
          <Text
            size={14}
            SFregular
            color={'#7D7D7D'}
            center
            style={{marginTop: RF(16)}}>
            Continue with Current Card
          </Text>
          <Text
            size={16}
            SFregular
            center
            color={'#00276D'}
            style={{marginVertical: RF(8)}}>
            Or
          </Text>
          {showAddAnotherButton && (
            <AppButton
              title="Add Another"
              textcolor={'#2A8FAF'}
              width={'50%'}
              bgColor={'#fff'}
              containerStyle={styles.ContainerStyle}
              onPress={handleAddAnother}
            />
          )}
          {showAdditionalFields && (
            <View style={{marginTop: RF(16)}}>
              <AppTextInput
                B_W={0.5}
                placeholder={'Bank Name'}
                placeholderTextColor={'#00276D'}
                p_Horizontal={RF(0.5)}
              />
              <AppTextInput
                B_W={0.5}
                placeholder={'Card Number'}
                placeholderTextColor={'#00276D'}
                p_Horizontal={RF(0.5)}
                endIcon={banks}
                widthEndIcon={RF(100)}
                heightEndIcon={RF(16)}
              />
              <AppTextInput
                B_W={0.5}
                placeholder={'Expiry'}
                placeholderTextColor={'#00276D'}
                p_Horizontal={RF(0.5)}
                endIcon={YY}
                widthEndIcon={RF(48)}
              />
              <AppTextInput
                B_W={0.5}
                placeholder={'CVC'}
                placeholderTextColor={'#00276D'}
                p_Horizontal={RF(0.5)}
              />
              <AppButton
                title="Submit"
                m_Top={RF(60)}
                onPress={() => navigate('PaymentDetails')}
              />
            </View>
          )}
        </View>
      </View>
    </Wrapper>
  );
};

export default AnotherCardPayment;
