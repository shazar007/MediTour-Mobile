import {
  Alert,
  Keyboard,
  LayoutAnimation,
  Modal,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from 'react-native';
import React, {useState} from 'react';
import useStyles from './styles';
import {
  CustomHeader,
  LoginReminder,
  SaveModal,
  Text,
  Wrapper,
} from '@components';
import {
  CallAmbulance_Flow,
  GOOGLE_PLACES_API_KEY,
  navigationRef,
  rs,
  rv,
  showToast,
} from '@services';
import {useSelector} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useTheme} from '@react-navigation/native';

const EmergencyScreen = () => {
  const styles = useStyles();
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [selectCity, setSelectCity] = useState<any>(null);
  const [selectDropOff, setDropOff] = useState<any>(null);
  const {user} = useSelector((state: any) => state?.root?.user);
  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const theme: any = useTheme();
  const colors = theme.colors;

  const pushAmbulance = () => {
    if (user === null) {
      setModalVisible(true);
    } else {
      if (selectCity && selectDropOff) {
        const data = {
          pickUp: {
            lng: selectCity.geometry.location.lng,
            lat: selectCity.geometry.location.lat,
            address: selectCity.formatted_address,
            city: selectCity.name,
          },
          dropOff: {
            lng: selectDropOff.geometry.location.lng,
            lat: selectDropOff.geometry.location.lat,
            address: selectDropOff.formatted_address,
            city: selectDropOff.name,
          },
        };

        setLoading(true);

        CallAmbulance_Flow(data)
          .then((res: any) => {
            setRequestSuccess(true);
            setTimeout(() => {
              navigationRef.current.goBack();
              setRequestSuccess(false);
            }, 3000);
          })
          .catch((err: any) => {
            Alert.alert('Error', err?.response?.data?.message);
          })
          .finally(() => setLoading(false));
      } else {
        if (!selectCity) {
          showToast('Error', 'Please select a pickup location.', false);
        } else if (!selectDropOff) {
          showToast('Error', 'Please select a drop-off location.', false);
        }
      }
    }
  };

  const onPreRe = () => {
    pushAmbulance();
  };

  const [focusedId, setFocusedId] = useState<string | null>(null);

  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'dark-content'}>
      <TouchableWithoutFeedback onPress={handleTouchablePress}>
        <View style={styles.bgRemove}>
          <CustomHeader
            title={'Ambulance'}
            leftIcon
            titleColor={colors.white}
            notify
          />

          <View
            style={[styles.subContainer, {backgroundColor: colors.background}]}>
            <SearchLocationComponent
              id="pickup"
              placeholder="Search Pickup"
              setValue={setSelectCity}
              focusedId={focusedId}
              setFocusedId={setFocusedId}
              colors={colors}
            />
            <SearchLocationComponent
              id="drop"
              placeholder="Search Drop off"
              setValue={setDropOff}
              focusedId={focusedId}
              setFocusedId={setFocusedId}
              colors={colors}
            />
            <TouchableOpacity
              style={styles.TouchStyle}
              onPress={onPreRe}
              disabled={loading}>
              {loading ? (
                <Text size={14} SFmedium color={'#FF4545'}>
                  Loading...
                </Text>
              ) : (
                <Text size={14} SFmedium color={'#FF4545'}>
                  Request
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <SaveModal
            Visible={requestSuccess}
            title={'Your request has been successfully submitted'}>
            <Text size={12} SFregular color={'#00276D'}>
              We will notify you in a few minutes
            </Text>
            <Text size={12} center SFregular color={'#007B1B'}>
              Thank you
            </Text>
          </SaveModal>
        </View>
      </TouchableWithoutFeedback>
      <Modal transparent animationType="slide" visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={{flexGrow: 1}}>
            <LoginReminder />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Wrapper>
  );
};

export default EmergencyScreen;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SearchLocationComponent = ({
  placeholder,
  setValue,
  focusedId,
  setFocusedId,
  id,
  colors,
}: any) => {
  const handleFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFocusedId(id);
  };

  const handleBlur = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFocusedId(null);
  };

  const isFocused = focusedId === id;

  return (
    <View
      style={{
        backgroundColor: '#E0E0E0',
        borderRadius: 8,
        width: '100%',
        marginTop: rv(8),
        height: isFocused ? rv(200) : rv(40),
        overflow: 'hidden',
        zIndex: 10,
      }}>
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        onPress={(data, details: any = null) => {
          if (details) {
            setValue(details);
          } else {
            console.error('Error fetching details');
          }
        }}
        listEmptyComponent={() => (
          <Text size={12} center SFregular color={'#007B1B'}>
            No Data Found
          </Text>
        )}
        textInputProps={{
          placeholderTextColor: '#7D7D7D',
          onFocus: handleFocus,
          onBlur: handleBlur,
          style: {
            margin: 0,
            color: colors?.primary,
            height: rv(40),
            width: '100%',
            backgroundColor: '#E0E0E0',
            paddingHorizontal: rs(12),
            borderRadius: 8,
            fontSize: rs(12),
          },
        }}
        fetchDetails={true}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en',
        }}
        styles={{
          listView: {
            backgroundColor: '#F5F5F5',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            marginTop: rv(8),
            width: '100%',
          },
          description: {
            color: '#0D47A1',
          },
          row: {
            paddingVertical: rv(12),
            paddingHorizontal: rs(12),
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0',
          },
        }}
      />
    </View>
  );
};
