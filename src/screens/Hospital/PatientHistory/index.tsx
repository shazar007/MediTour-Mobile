import useStyles from './styles';
import {LabMenu, drImg} from '@assets';
import {FlatList, Image, View} from 'react-native';
import {useSelector} from 'react-redux';
import React, {useState, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {
  CardList,
  CustomHeader,
  CustomLoader,
  EmptyList,
  Text,
} from '@components';
import {hospitalgetPatients, navigate, navigationRef} from '@services';
import {Wrapper, HeaderCard, UserHeaderContent} from '@components';
import {getColorCode, RF, SCREEN_HEIGHT} from '@theme';

const Hospital_Patient_History = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [allPatients, setAllPatients] = useState([]);
  const [loading, setLoading] = useState<any>(false);
  const [allHistory, setAllHistory] = useState<any>([]);

  const {headerTextColor, colorCode} = getColorCode();
  const {B2B} = useSelector((state: any) => state.root.b2b);
  const {changeStack} = useSelector((state: any) => state.root.shiftStack);

  useEffect(() => {
    fetchAllPatients();
  }, []);

  const fetchAllPatients = () => {
    setLoading(true);
    hospitalgetPatients(1)
      .then((res: any) => {
        setAllHistory(res?.data);
        setAllPatients(res?.data?.Patients);
      })

      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const onOpen = (item: any) => {
    navigate('Hospital_Patient_History_Detail', {
      data: item,
      allHistory: allHistory,
    });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.main}>
        <CustomHeader
          title={'Patient History'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        {/* <HeaderCard
          home
          numberOfIcons={'2'}
          onPress={openDrawer}
          icon1Clr={headerTextColor}
          cardColor={colorCode}
          NotColor={colors.bluE}>
          <UserHeaderContent
            ColorScreenTitle={headerTextColor}
            ScreenTitle={'Patient History'}
          />
        </HeaderCard> */}

        <View style={styles.list}>
          <FlatList
            data={allPatients}
            renderItem={({item, index}: any) => {
              return (
                <CardList
                  onPress={() => onOpen(item)}
                  title={'Patient ID: ' + item?.mrNo}
                  label={'Patient Name: ' + item?.name}
                />
              );
            }}
            ListEmptyComponent={() => {
              return <EmptyList />;
            }}
          />
        </View>
      </View>

      {loading && <CustomLoader />}
    </Wrapper>
  );
};
export default Hospital_Patient_History;
