import {ScrollView, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CustomHeader, Text, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {LabMenu, town} from '@assets';
import {Image} from 'react-native';
import {getColorCode, RF} from '@theme';
import {DoctorsRequestsItems, navigate} from '@services';
const DoctorsRequest = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {colorCode} = getColorCode();
  const styles = useStyles(colors, colorCode);

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Availability'}
        leftIcon
        titleColor={'#fff'}
        notify
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainview}>
          <Text size={18} SFsemiBold color={'#0D47A1'}>
            Availability category
          </Text>
          {DoctorsRequestsItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.CardDesign}
              onPress={() => navigate(item.Screen, {Type: item.name})}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.ContentContainer}>
                  <Image source={item?.img} style={styles.ImageView} />
                </View>
                <View style={styles.GapView}>
                  <Text size={16} SFsemiBold color={colors.primary}>
                    {`${item.name}`}
                  </Text>
                  <Text
                    size={12}
                    SFlight
                    color={colors.primary}
                    style={{width: RF(200)}}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
};
export default DoctorsRequest;
