import React from 'react';
import {LabMenu} from '@assets';
import {CustomHeader, Text} from '@components';
import useStyles from './styles';
import {navigate} from '@services';
import {Image, View} from 'react-native';
import {HeaderCard, UserHeaderContent, Wrapper} from '@components';
import {RouteProp, useTheme} from '@react-navigation/native';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      data?: any;
    };
  }>;
}

const Donation_Donors_Detail = (props: Props, navigation: any) => {
  const {data} = props.route?.params;
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const styles: any = useStyles(colors);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{backgroundColor: '#F5F5F5', flex: 1}}>
        <CustomHeader
          title={data?.donorName}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <Image source={{uri: data?.userId?.userImage}} style={styles.image} />
        <View style={styles.row}>
          <Text size={16} SFmedium color={colors?.bluE}>
            Donor For:
          </Text>
          <Text size={16} SFregular color={colors?.bluE} style={styles.ml}>
            {data?.packageId?.donationTitle}
          </Text>
        </View>

        <View style={styles.row}>
          <Text size={16} SFmedium color={colors?.bluE}>
            Donor Price:
          </Text>
          <Text size={16} SFregular color={colors?.bluE} style={styles.ml}>
            {data?.donationAmount}
          </Text>
        </View>
      </View>
    </Wrapper>
  );
};
export default Donation_Donors_Detail;
