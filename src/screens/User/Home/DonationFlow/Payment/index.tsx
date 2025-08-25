import {FlatList, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  AppTextInput,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {backIcon, card} from '@assets';
import {RF} from '@theme';
const paymentCard = [
  {
    id: 1,
    image: card,
    title: 'Card',
  },
  {
    id: 2,
    image: card,
    title: 'Card',
  },
  {
    id: 3,
    image: card,
    title: 'Card',
  },
  {
    id: 4,
    image: card,
    title: 'Card',
  },
];
const Payment = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <HeaderCard onPress={goBack} icon1={backIcon}>
          <UserHeaderContent
            ScreenTitle={'Donate Money'}
            searhIconTrue
            size={RF(20)}
          />
        </HeaderCard>
        <View style={styles.ViewStyle}>
          <FlatList
            numColumns={2}
            data={paymentCard}
            contentContainerStyle={{width: '100%'}}
            columnWrapperStyle={styles.ColumnStyle}
            renderItem={({item}: any) => (
              <View style={styles.Container}>
                <View style={{marginHorizontal: RF(16), marginVertical: RF(8)}}>
                  <Image source={item.image} style={styles.ImageStyle} />
                  <Text
                    size={13}
                    SFmedium
                    color={colors.blueText}
                    style={{marginTop: RF(8)}}>
                    {item.title}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </Wrapper>
  );
};

export default Payment;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: '#FAF9F6'},
  Container: {
    width: '48.5%',
    height: RF(80),
    backgroundColor: 'rgba(255, 140, 140, 0.24)',
    borderWidth: 1,
    borderColor: 'rgba(226, 93, 93, 1)',
    borderRadius: RF(16),
  },
  ImageStyle: {
    width: RF(32),
    height: RF(32),
    resizeMode: 'contain',
  },
  ViewStyle: {marginTop: RF(24), marginHorizontal: RF(24)},
  ColumnStyle: {
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: RF(16),
  },
});
