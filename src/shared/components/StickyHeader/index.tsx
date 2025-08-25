import {
  Animated,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TouchableHighlightProps,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RF} from '@theme';
import {Wrapper, Text} from '@components';
import {DetailsHeaderScrollView} from 'react-native-sticky-parallax-header';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {backIcon, drawer, notification, plus} from '@assets';
import {
  getNotifications,
  globalStyles,
  margin,
  navigate,
  navigationRef,
  PADDING,
  rs,
} from '@services';
import {useSelector} from 'react-redux';

interface Props extends TouchableHighlightProps {
  home?: any;
  title?: any;
  onPress?: any;
  children?: any;
  renderHeader?: any;
  showDrawerIcon?: any;
  setToggle?: any;
  toggle?: any;
  cardColor?: any;
}

const ios = Platform.OS === 'ios';

const StickyHeader = (props: Props) => {
  const {
    onPress,
    children,
    renderHeader,
    title,
    showDrawerIcon,
    setToggle,
    toggle,
    cardColor,
  } = props;
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const {user} = useSelector((state: any) => state.root.user);
  const [data, setData] = useState<any>([]);

  const styles = useStyles(changeColor);
  const goBack = () => {
    if (toggle == true) {
      setToggle(false);
    } else {
      navigationRef?.current?.goBack();
    }
  };

  // const EmergencyScreen = () => {
  // };

  let checkTitle = title == false || null;

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    let id = user?._id;
    getNotifications(id)
      .then((res: any) => {
        setData(res?.data?.notifications);
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <SafeAreaProvider>
        <DetailsHeaderScrollView
          showsVerticalScrollIndicator={false}
          renderHeader={() =>
            renderHeader && (
              <View
                style={{
                  ...styles.header,
                  backgroundColor: cardColor ? cardColor : changeColor,
                }}>
                {renderHeader()}
              </View>
            )
          }
          renderHeaderBar={() => (
            <Animated.View
              style={{
                ...styles.headerbar,
                backgroundColor: cardColor ? cardColor : changeColor,
              }}>
              <View style={globalStyles.rowSimple}>
                <Pressable onPress={onPress ? onPress : goBack}>
                  <Image
                    style={styles.icon}
                    source={showDrawerIcon ? drawer : backIcon}
                  />
                </Pressable>
                {checkTitle || (
                  <Text
                    size={16}
                    SFregular
                    color={'#fff'}
                    style={margin.left_16}>
                    {'Hi ' + user?.name}
                  </Text>
                )}
              </View>
              <View style={styles.assetView}>
                {/* <Pressable onPress={() => navigate('EmergencyScreen')}>
                  <Image style={styles.icon} source={plus} />
                </Pressable> */}

                <Pressable
                  onPress={() => navigate('Notifications', {item: data})}>
                  <Image style={styles.icon} source={notification} />
                </Pressable>
              </View>
            </Animated.View>
          )}>
          {children}
        </DetailsHeaderScrollView>
      </SafeAreaProvider>
    </Wrapper>
  );
};

export default StickyHeader;

const useStyles = (changColor: any) =>
  StyleSheet.create({
    header: {
      paddingHorizontal: rs(16),
      paddingBottom: ios ? RF(8) : RF(16),
      backgroundColor: changColor,
    },
    headerbar: {
      width: '100%',
      paddingTop: ios ? 50 : 60,
      paddingBottom: ios ? 10 : 20,
      backgroundColor: changColor,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: PADDING?._16,
    },
    icon: {
      height: ios ? RF(18) : RF(20),
      width: ios ? RF(18) : RF(20),
      resizeMode: 'contain',
    },
    assetView: {flexDirection: 'row', gap: 16},
    title: {},
  });
