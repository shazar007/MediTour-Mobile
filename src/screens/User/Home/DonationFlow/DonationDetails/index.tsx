import {View, Image, ImageBackground, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CustomHeader,
  CustomLoader,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import useStyles from './styles';
import {get_donationNgo, rs} from '@services';

const DonationDetails = ({route}: any) => {
  const {item} = route.params;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const styles = useStyles();
  const theme: any = useTheme();
  const colors = theme.colors;

  useEffect(() => {
    setLoading(true);
    company_Details();
  }, []);
  const company_Details = () => {
    let params = {
      companyId: item?.company._id,
    };
    get_donationNgo(params)
      .then((res: any) => {
        setData(res.data.company);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <CustomHeader
          title={'Package Details'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <ScrollView nestedScrollEnabled={true} style={{flexGrow: 1}}>
          <View style={{paddingBottom: RF(80), padding: rs(16)}}>
            <ImageBackground
              source={{
                uri:
                  item?.company?.logo ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
              }}
              borderRadius={RF(16)}
              style={{width: '100%', height: RF(240)}}>
              {data?.logo && (
                <Image
                  source={{
                    uri:
                      item?.company?.logo ||
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
                  }}
                  style={styles.ImageStyle}
                />
              )}
            </ImageBackground>
            <View style={{marginTop: RF(24)}}>
              {/* <Text size={18} SFsemiBold color={colors.blueText}>
                About
              </Text>
              <Text
                size={14}
                SFlight
                color={colors.blueText}
                style={{marginTop: RF(8)}}>
                {data?.description}
              </Text> */}
              <Text
                size={18}
                color={colors.blueText}
                SFsemiBold
                style={{marginTop: RF(8)}}>
                Address
              </Text>
              <Text
                size={16}
                SFlight
                color={colors.blueText}
                style={{marginTop: RF(8)}}>
                {`${data?.location?.address}`}
              </Text>
            </View>
          </View>
        </ScrollView>
        {loading && <CustomLoader />}
      </View>
    </Wrapper>
  );
};

export default DonationDetails;
