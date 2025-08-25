import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import React, {useRef} from 'react';

import useStyles from './styles';
import {
  B2BModalize,
  CustomModalize,
  DocDashboardCard,
  Doctorgraphlisting,
  HeaderCard,
  Text,
  Wrapper,
} from '@components';
import {
  BGDashboard,
  LabBell,
  LabMenu,
  dropIcon,
  dummyProfileIcon,
} from '@assets';
import {RF} from '@theme';
import {useTheme, useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {PhysiostackData, docdataArray, globalStyles} from '@services';
import {BarChart} from 'react-native-gifted-charts';
import {Modalize} from 'react-native-modalize';
import {setChangeColor} from '@redux';
const PhysiotherapistHome = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(setChangeColor(colors.Pharmacy));
    }, []),
  );
  const modalizeRef = useRef<Modalize>(null);
  const renderItem = ({item}: any) => (
    <DocDashboardCard
      headertitle={item.headertitle}
      title={item.title}
      text={item.text}
      IconTrue={item.image}
      bgColor={colors.background}
    />
  );
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <ImageBackground source={BGDashboard} style={styles.Background}>
        <View style={{bottom: RF(16)}}>
          <HeaderCard
            onPress={openDrawer}
            twoInRow={true}
            plusIcon
            cardColor={'transparent'}
            icon1={LabMenu}
            tintColor={colors.background}
            numberOfIcons={'3'}
            icon2={LabBell}
            icon3={dummyProfileIcon}
          />
        </View>
        <View style={styles.maincontainer}>
          <View style={[globalStyles.row, {marginVertical: RF(8)}]}>
            <Text size={24} SFmedium color={colors.background}>
              Hello Dr. Laiba
            </Text>

            <View style={styles.card}>
              <Text size={10} SFmedium color={colors.primary}>
                Overall
              </Text>
              <Image
                source={dropIcon}
                style={{
                  width: RF(16),
                  height: RF(16),
                  tintColor: colors.primary,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              paddingHorizontal: RF(0),
            }}>
            <Text
              size={14}
              SFmedium
              color={colors.background}
              style={{width: RF(230)}}>
              Here your important notes & task please check your Appointments
            </Text>
            <Text size={14} SFmedium color={colors.background}>
              8:00pm
            </Text>
          </View>

          <View style={{marginTop: RF(32)}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={docdataArray}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
            />
          </View>
          <Doctorgraphlisting
            bgColor={colors.Physiotherapist}
            bgcolor={colors.Physiotherapist}
            BGcolor={colors.Physiotherapist}
            backColor={colors.Physiotherapist}
          />
          <BarChart
            width={400}
            barWidth={16}
            spacing={30}
            noOfSections={4}
            barBorderRadius={8}
            hideRules
            height={210}
            yAxisThickness={0}
            xAxisThickness={0}
            stackData={PhysiostackData}
            hideYAxisText
          />
        </View>
        <CustomModalize
          modalStyle={{backgroundColor: colors.Physiotherapist}}
          ref={modalizeRef}
          lineColor={colors.background}
          alwaysOpen={150}>
          <View style={{paddingBottom: RF(104)}}>
            <Text size={16} color={colors.background} SFsemiBold>
              In progress Ambulance Detail
            </Text>
          </View>
        </CustomModalize>
      </ImageBackground>
    </Wrapper>
  );
};
export default PhysiotherapistHome;
