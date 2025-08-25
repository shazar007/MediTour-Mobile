import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  CardComponent,
  CustomHeader,
  Department,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {UserBell} from '@assets';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import {navigate, padding, rs} from '@services';

const ViewMoreDepart = ({route}: any) => {
  const {data, type, title, id} = route.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <CustomHeader
          title={title ? title : data[0]?.name}
          leftIcon
          titleColor={colors.white}
          notify
        />
        <Department data={data} />
      </View>
    </Wrapper>
  );
};

export default ViewMoreDepart;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: '#FAF9F6'},
  card: {justifyContent: 'center'},
  container: {
    width: RF(90),
    height: RF(90),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F1F1',
    elevation: 1,
    borderRadius: RF(8),
  },
  container2: {
    width: RF(51),
    height: RF(51),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RF(32),
  },
  imageStyle: {width: RF(32), height: RF(32), resizeMode: 'contain'},
  DepartmentStyle2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RF(8),
    alignItems: 'center',
  },
  FlatListStyle: {
    // justifyContent: 'space-between',
    gap: 10,
    width: '100%',
    marginBottom: RF(8),
  },
  containerStyle: {
    width: '100%',
  },
});
