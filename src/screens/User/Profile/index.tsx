import {
  arrowDown,
  ArrowLeft,
  arrowup,
  edit,
  logOut,
  del,
  delete_profile,
} from '@assets';
import {CustomHeader, CustomLoader, DeleteModal, Wrapper} from '@components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useTheme} from '@react-navigation/native';
import {setFCMToken, setIsLoggedIn, setUser} from '@redux';
import {blockUser, logoutAll, navigate, rs, rv} from '@services';
import {getColorCode} from '@theme';
import {Alert} from '@utils';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Linking,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const User_Profile = ({route}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {user} = useSelector((state: any) => state?.root?.user);
  const {data} = route.params;
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {logOutAllSight} = getColorCode();
  const {changeStack} = useSelector((state: any) => state?.root?.shiftStack);

  const handleLogout = async () => {
    setLoading(true);
    logoutAll(logOutAllSight)
      .then(async (res: any) => {
        // await navigation.dispatch(DrawerActions.closeDrawer());
        dispatch(setIsLoggedIn(false));
        dispatch(setUser(null));
        dispatch(setFCMToken(null));
        AsyncStorage.clear();
        Alert.showSuccess('Successfully Logout');
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteUser = () => {
    setLoading(true);
    let data = {
      vendorType: 'Users',
      vendorId: user?._id,
      blocked: true,
    };

    blockUser(data)
      .then((res: any) => {
        dispatch(setIsLoggedIn(false));
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const openPrivacyPolicy = () => {
    const url = 'https://meditour.global/privactpolicys';
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const handlePolicy = (item: any) => {
    if (item?.title === 'Privacy Policy') {
      openPrivacyPolicy();
    } else {
      navigate(item?.screen);
    }
  };

  const editScreen =
    changeStack === 'User' ||
    changeStack === 'Doctors' ||
    changeStack === 'Physiotherapist' ||
    changeStack === 'Nutritionist' ||
    changeStack === 'Psychologist'
      ? true
      : false;

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Profile'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      {/* Profile Card */}

      <ScrollView>
        <Pressable
          onPress={() => navigate(data[0]?.editProfile)}
          style={styles.profileCard}>
          <Image
            source={{
              uri:
                user?.userImage ||
                user?.doctorImage ||
                user?.logo ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
            }}
            style={styles.profileImage}
          />

          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.accountNumber}>{user?.phone}</Text>
          </View>

          {editScreen && (
            <Pressable
              onPress={() => navigate(data[0]?.editProfile)}
              style={styles.editButton}>
              <Image source={edit} style={styles.editIcon} />
            </Pressable>
          )}
        </Pressable>

        {/* Settings Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activities</Text>

          <View style={styles.sectionCard}>
            {data[0]?.activities?.map((item: any, index: any) => {
              return (
                <View key={index}>
                  <SettingsItem
                    icon={item?.icon}
                    title={item?.title}
                    colors={colors}
                    onPress={() => navigate(item?.screen)}
                  />
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other Settings</Text>

          <View style={styles.sectionCard}>
            {data[1]?.others?.map((item: any, index: any) => {
              return (
                <View key={index}>
                  <SettingsItem
                    icon={item?.icon}
                    title={item?.title}
                    colors={colors}
                    onPress={() => handlePolicy(item)}
                  />
                </View>
              );
            })}
          </View>

          <View style={styles.sectionCard}>
            <SettingsItem
              icon={delete_profile}
              tintColor="red"
              title="Delete Account"
              onPress={() => setShowModal(true)}
              colors={colors}
            />
            <SettingsItem
              icon={logOut}
              tintColor="red"
              title="Log Out"
              onPress={handleLogout}
              colors={colors}
            />
          </View>
        </View>
        <CustomLoader loading={loading} />
        <DeleteModal
          Visible={showModal}
          cancelPress={() => setShowModal(false)}
          deletePress={() => deleteUser()}
          loading={loading}
        />
      </ScrollView>
    </Wrapper>
  );
};

const SettingsItem = ({
  icon,
  title,
  onPress,
  colors,
  tintColor,
  textColor = 'black',
  iconColor = 'black',
}: any) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
    <Image
      source={icon}
      style={[styles.icon, {tintColor: tintColor || colors?.primary}]}
    />
    <Text style={[styles.itemText, {color: textColor}]}>{title}</Text>

    <Image
      source={ArrowLeft}
      style={{width: rs(14), height: rs(12), tintColor: colors.dim_grey}}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#000',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: rs(20),
    fontWeight: 'bold',
  },
  profileCard: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: rs(16),
    fontWeight: 'bold',
    color: '#000',
  },
  accountNumber: {
    fontSize: rs(14),
    color: '#555',
  },
  editButton: {
    padding: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  section: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: rs(8),
    padding: rs(8),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: rs(16),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: rs(8),
    paddingVertical: rs(6),

    gap: rs(8),
    marginBottom: 10,
  },

  icon: {width: rs(20), height: rs(20), resizeMode: 'contain'},
  itemText: {
    flex: 1,
    fontSize: rs(14),
    color: '#000',
  },
  arrow: {
    // fontSize: rs(20),
    color: '#ccc',
  },
});

export default User_Profile;
