import {LabMenu} from '@assets';
import useStyles from './styles';
import {Image} from 'react-native';
import React, {useState} from 'react';
import {RouteProp, useTheme} from '@react-navigation/native';
import {Pressable, ScrollView, View} from 'react-native';
import {HealthPlanofInsurance, navigate} from '@services';
import {CustomHeader, Text, Wrapper} from '@components';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      item?: any;
    };
  }>;
}

const InsurancePackage = (props: Props, navigation: any) => {
  const {item} = props.route?.params;
  const [toggle, setToggle] = useState(false);
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);

  const toggleSearch = () => {
    setToggle(true);
  };
  const MyselfPackage = (i: any) => {
    navigate('MyselfPackage', {item: i?.name, pckg: item + ' ' + i?.name});
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader title={'Health'} leftIcon titleColor={'#fff'} notify />

      {/* <HeaderCard home numberOfIcons={'3'}>
        <UserHeaderContent
          toggle={toggle}
          onPress={toggleSearch}
          ScreenTitle={'Health'}
        />
      </HeaderCard> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.view}>
          {HealthPlanofInsurance.map((item, index) => (
            <Pressable
              onPress={() => MyselfPackage(item)}
              key={index}
              style={styles.press}>
              <Text size={20} SFmedium color={colors.primary}>
                {item?.name}
              </Text>
              <View style={styles.viewTxt}>
                <Text
                  size={12}
                  SFlight
                  color={colors.primary}
                  style={styles.wd}>
                  {item?.description}
                </Text>
                <Image source={item.Avatar} style={styles.img} />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
};
export default InsurancePackage;
