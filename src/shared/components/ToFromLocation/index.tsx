import {Image, StyleSheet, View} from 'react-native';
import React, {useState, useCallback} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {RF} from '@theme';
import {GOOGLE_PLACES_API_KEY} from '@services';
import {airPlain} from '@assets';

const ToFromLocation = ({
  placeholder,
  setSelectCity,
}: {
  placeholder?: any;
  setSelectCity?: any;
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleTextChange = useCallback(
    (text: any) => {
      if (text !== inputValue) {
        setInputValue(text);
        if (text === '') {
          setSelectCity('');
        }
      }
    },
    [inputValue, setSelectCity],
  );

  const handlePress = useCallback(
    (data: any) => {
      const city = data?.structured_formatting?.main_text;
      setInputValue(city);
      setSelectCity(city);
      // if (city !== inputValue) {
      //   setInputValue(city);
      //   setSelectCity(city);
      // }
    },
    [inputValue, setSelectCity],
  );

  return (
    <View style={styles.container}>
      <Image
        source={airPlain}
        style={{width: RF(16), height: RF(16), resizeMode: 'contain'}}
      />
      <View style={styles.inputContainer}>
        <GooglePlacesAutocomplete
          disableScroll
          placeholder={placeholder}
          onPress={data => handlePress(data)}
          textInputProps={{
            placeholderTextColor: '#7D7D7D',
            value: inputValue,
            onChangeText: handleTextChange,
          }}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'en',
          }}
          styles={{
            container: {
              padding: 0,
            },
            textInput: {
              fontSize: RF(12),
              color: '#00276D',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            description: {
              color: '#00276D',
            },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
  },
  inputContainer: {
    flex: 1,
    marginLeft: 5,
  },
  floatingLabelInputContainer: {
    marginBottom: 10,
  },
});

export default ToFromLocation;
