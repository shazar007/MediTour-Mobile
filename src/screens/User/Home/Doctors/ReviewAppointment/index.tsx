import {View} from 'react-native';
import React from 'react';
import {HeaderCard, UserHeaderContent, Wrapper} from '@components';
import {backIcon} from '@assets';
import useStyles from './styles';

const ReviewAppointment = ({navigation}: any) => {
  const styles = useStyles();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <HeaderCard
          onPress={goBack}
          numberOfIcons={'2'}
          iconFalse
          title={'Hi Wajahat'}
          icon1={backIcon}>
          <UserHeaderContent ScreenTitle={'Book Appointment'} onlySearchIcon />
        </HeaderCard>
      </View>
    </Wrapper>
  );
};

export default ReviewAppointment;
