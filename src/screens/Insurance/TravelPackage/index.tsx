import {LabMenu} from '@assets';
import useStyles from './styles';
import React, {useState} from 'react';
import {FlatList, Image} from 'react-native';
import {Pressable, View} from 'react-native';
import {RouteProp, useTheme} from '@react-navigation/native';
import {
  navigate,
  navigationRef,
  Travel_Plan_Insurance,
  Travel_PlanofInsurance,
} from '@services';
import {CustomHeader, Text, Wrapper} from '@components';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      item?: any;
      pckg?: any;
    };
  }>;
}

const Insurance_Travel_Package = (props: Props, navigation: any) => {
  const {item, pckg} = props.route?.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [selected, setSelected] = useState(false);
  const [selected_Card, setSelected_Card] = useState<any>('');

  const InsurancePackage = (i: any) => {
    if (selected == false) {
      setSelected_Card(i?.name);
      setSelected(true);
    } else if (selected_Card) {
      navigate('MyselfPackage', {
        pckg: `${item + ' ' + selected_Card + ' ' + i?.name}`,
      });
    }
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader title={item} leftIcon titleColor={'#fff'} notify />
      <View style={styles.view}>
        <FlatList
          data={selected ? Travel_Plan_Insurance : Travel_PlanofInsurance}
          renderItem={({item, index}: any) => {
            return (
              <Pressable
                key={index}
                style={styles.press}
                onPress={() => InsurancePackage(item)}>
                <Text size={20} SFmedium color={colors.primary}>
                  {item?.name}
                </Text>
                <View style={styles.txtV}>
                  <Text
                    SFlight
                    size={12}
                    style={styles.wd}
                    color={colors.primary}>
                    {item?.description}
                  </Text>
                  <Image source={item?.Avatar} style={styles.img} />
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </Wrapper>
  );
};
export default Insurance_Travel_Package;
