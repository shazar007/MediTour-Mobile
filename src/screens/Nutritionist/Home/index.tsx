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
  BGNutritionistDashboard,
  LabBell,
  LabMenu,
  dropIcon,
  dummyProfileIcon,
} from '@assets';
import {RF} from '@theme';
import {useTheme, useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {NutritionstackData, docdataArray, globalStyles} from '@services';
import {BarChart} from 'react-native-gifted-charts';
import {Modalize} from 'react-native-modalize';
import {setChangeColor} from '@redux';

const NutritionistHome = ({navigation}: any) => {
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
      <ImageBackground
        source={BGNutritionistDashboard}
        style={styles.Background}>
        <View style={{bottom: RF(16)}}>
          <HeaderCard
            onPress={openDrawer}
            twoInRow={true}
            plusIcon
            cardColor={'transparent'}
            icon1={LabMenu}
            tintColor={colors.primary}
            numberOfIcons={'3'}
            icon2={LabBell}
            icon3={dummyProfileIcon}
          />
        </View>
        <View style={styles.maincontainer}>
          <View style={globalStyles.row}>
            <Text size={24} SFmedium color={colors.primary}>
              Hello Dr. Laiba
            </Text>
            <View style={styles.card}>
              <Text size={10} SFmedium color={colors.background}>
                Overall
              </Text>
              <Image
                source={dropIcon}
                style={{
                  width: RF(16),
                  height: RF(16),
                  tintColor: colors.background,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <Text
              size={14}
              SFmedium
              color={colors.primary}
              style={{width: RF(230)}}>
              Here your important notes & task please check your Appointments
            </Text>
            <Text size={14} SFmedium color={colors.primary}>
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
            bgColor={colors.Nutritionist}
            bgcolor={colors.Nutritionist}
            BGcolor={colors.Nutritionist}
            backColor={colors.Nutritionist}
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
            stackData={NutritionstackData}
            hideYAxisText
          />
        </View>
        <CustomModalize
          modalStyle={{backgroundColor: colors.Nutritionist}}
          ref={modalizeRef}
          lineColor={colors.primary}
          alwaysOpen={150}>
          <View style={{paddingBottom: RF(104)}}>
            <Text size={16} color={colors.primary} SFsemiBold>
              In progress Ambulance Detail
            </Text>
          </View>
        </CustomModalize>
      </ImageBackground>
    </Wrapper>
  );
};

export default NutritionistHome;
