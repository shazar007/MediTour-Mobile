import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {RF, SCREEN_WIDTH} from '@theme';
import {useTheme} from '@react-navigation/native';
import {Text} from '@components';
import {coffeeItems, navigationRef, rs, rv} from '@services';
import {setChangeStack} from '@redux';
import {useDispatch} from 'react-redux';
import {back_arrow} from '@assets';
import {ScrollView} from 'react-native';

const JoinAsProvider = () => {
  const flatListRef: any = useRef();
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const dispatch = useDispatch();

  const goBack = () => {
    navigationRef.current?.goBack();
  };

  const handlePress = (itemName: any) => {
    dispatch(setChangeStack(itemName));
  };

  const renderItem = ({item}: any) => {
    return (
      <Pressable
        style={styles.itemContainer}
        onPress={() => handlePress(item.name)}>
        <ImageBackground
          resizeMode="cover"
          imageStyle={{borderRadius: 8}}
          source={item?.image}
          style={{
            width: SCREEN_WIDTH * 0.43,
            height: rs(158),
            padding: 12,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Text
                size={rs(12)}
                style={{fontWeight: Platform.OS === 'ios' ? '600' : '700'}}
                color={colors.white}>
                {item.name}
              </Text>
              <Text
                size={rs(7)}
                SFregular
                style={{width: rs(130)}}
                color={colors.white}>
                Registration As {item.name}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: rv(16),
            marginTop: rv(8),
          }}>
          <Pressable
            onPress={goBack}
            style={{
              backgroundColor: '#000',
              height: rs(32),
              width: rs(32),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: rs(16),
            }}>
            <Image
              source={back_arrow}
              style={{height: rs(18.67), width: rs(18.67)}}
            />
          </Pressable>
          <Text
            size={rs(16)}
            SFbold
            style={{fontWeight: '700'}}
            center
            color={colors.text}>
            You can Register As
          </Text>
          <View
            style={{
              backgroundColor: 'transparent',
              height: rs(32),
              width: rs(32),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: rs(16),
            }}></View>
        </View>

        <View>
          <FlatList
            scrollEnabled={false}
            numColumns={2}
            ref={flatListRef}
            data={coffeeItems}
            contentContainerStyle={{
              paddingBottom: rs(70),
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: rs(2),
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          backgroundColor: colors.background,
          bottom: 0,
          width: SCREEN_WIDTH,
          height: rv(48),
          justifyContent: 'center',
        }}>
        <Text size={rs(16)} SFregular center color={colors.text}>
          Who Are You?
        </Text>
      </View>
    </View>
  );
};

export default JoinAsProvider;

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: rs(16),
      paddingTop: Platform.OS === 'ios' ? RF(45) : RF(30),
    },

    itemContainer: {
      backgroundColor: colors.light_grey,
      width: SCREEN_WIDTH * 0.43,
      height: rs(158),
      marginHorizontal: rs(4),
      marginVertical: rs(4),
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  });
