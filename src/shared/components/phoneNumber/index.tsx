import {RF} from '@theme';
import {colors, rs, rv} from '@services';
import {dropIcon, phone} from '@assets';
import React, {useRef, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

interface Props {
  phValue?: any;
  setValue?: any;
  formattedValue?: any;
  setFormattedValue?: any;
  type?: any;
  placeholder?: any;
  onChangeText?: any;
  onChangeFormattedText?: any;
  handleFomatValue?: (text: any) => void;
}

const PhoneNumber = (props: Props) => {
  const {
    phValue,
    setValue,
    formattedValue,
    handleFomatValue,
    setFormattedValue,
    type,
    placeholder,
    onChangeText,
    onChangeFormattedText,
  } = props;

  const [forWidth, setForWidth] = useState<any>(2);
  const phoneInput = useRef<PhoneInput>(null);
  const onChangePhone = (code: any) => {
    setForWidth(code?.callingCode[0]?.length);
  };

  return (
    <>
      <View style={type == 'box' ? styles?.boxview : styles.mainView}>
        <Image source={phone} style={styles.callIcon} />

        <PhoneInput
          value={phValue}
          ref={phoneInput}
          placeholder={placeholder ? placeholder : '3204567890'}
          containerStyle={styles.fieldContainer}
          textInputProps={{
            maxLength: 13,
            placeholderTextColor: 'gray',
            // style: styles.placeholderText,
          }}
          countryPickerButtonStyle={[
            styles.countryButtonStyle,

            {width: forWidth == 2 ? RF(60) : RF(70)},
          ]}
          onChangeCountry={code => onChangePhone(code)}
          renderDropdownImage={
            <Image source={dropIcon} style={styles.dropIcon} />
          }
          // codeTextStyle={styles.codeTxt}
          textContainerStyle={styles.containerText}
          textInputStyle={styles.input}
          defaultValue={phValue}
          defaultCode="PK"
          layout="second"
          onChangeText={text => {
            setValue && setValue(text);
            handleFomatValue && handleFomatValue(text);
            onChangeText && onChangeText(text);
          }}
          onChangeFormattedText={formattedText => {
            // Update the state with the formatted value
            setFormattedValue && setFormattedValue(formattedText);
            onChangeFormattedText && onChangeFormattedText(formattedText);
            // handleFomatValue && handleFomatValue(formattedText); // Update the formatted value in the formik form
          }}
          // autoFocus
        />
        {/* <Image source={verifyPhone} style={styles.icon} /> */}
      </View>
      {/* {showMessage && (
        <View style={styles.message}>
          <Text>Value : {value}</Text>
          <Text>Formatted Value : {formattedValue}</Text>
          <Text>Valid : {valid ? 'true' : 'false'}</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const checkValid = phoneInput.current?.isValidNumber(formattedValue);
          setShowMessage(true);
          setValid(checkValid ? checkValid : false);
        }}>
        <Text style={{color: '#000', borderWidth: 1, borderColor: '#000'}}>
          Check
        </Text>
      </TouchableOpacity> */}
    </>
  );
};

export default PhoneNumber;

// const styles = StyleSheet.create({
//   button: {
//     borderWidth: 1,
//     marginTop: 20,
//   },
//   message: {},
//   mainView: {
//     marginTop: RF(16),
//     borderBottomWidth: 1,
//     borderColor: colors.primary,
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     // height: RF(30),
//   },
//   boxview: {
//     flexDirection: 'row',
//     marginTop: RF(8),
//     height: rv(48),
//     alignItems: 'center',
//     // paddingBottom: RF(4),
//     color: '#000',
//     backgroundColor: '#EDF1F3',
//     borderColor: '#4A5568',
//     paddingHorizontal: rs(14),
//     paddingVertical: rs(4),
//     fontFamily: 'SF-Pro-Text-Regular',
//     fontSize: rs(14),
//     borderRadius: 10,
//   },
//   callIcon: {
//     width: RF(16),
//     height: RF(16),
//     marginRight: RF(16),
//     marginBottom: RF(2),
//     alignSelf: 'center',
//     tintColor: colors.primary,
//   },
//   fieldContainer: {
//     width: '85%',
//     height: '100%',
//     backgroundColor: 'transparent',
//     // borderWidth: 1,
//   },
//   countryButtonStyle: {
//     alignItems: 'center',
//     width: RF(65),
//     justifyContent: 'flex-start',
//     borderColor: colors.primary,
//   },
//   dropIcon: {
//     height: RF(15),
//     width: RF(15),
//   },
//   codeTxt: {
//     fontSize: RF(14),
//     alignSelf: 'center',
//     color: colors.primary,
//     marginRight: RF(5),
//   },
//   containerText: {
//     paddingHorizontal: 0,
//     paddingVertical: 0,
//     backgroundColor: 'transparent',
//   },
//   input: {
//     paddingLeft: 0,
//     textAlignVertical: 'bottom',
//     fontSize: RF(14),
//     paddingBottom: RF(2),
//     marginBottom: -2,
//   },
//   placeholderText: {},
//   icon: {
//     height: RF(16),
//     width: RF(16),
//     resizeMode: 'contain',
//     position: 'absolute',
//     right: 5,
//     bottom: 5,
//   },
// });

const styles = StyleSheet.create({
  mainView: {
    marginTop: RF(16),
    borderBottomWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%', // Ensures full width
  },
  boxview: {
    flexDirection: 'row',
    marginTop: RF(8),
    height: rv(48),
    alignItems: 'center',
    backgroundColor: '#EDF1F3',
    borderColor: '#4A5568',
    paddingHorizontal: rs(14),
    paddingVertical: rs(4),
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: rs(14),
    borderRadius: 10,
    width: '100%', // Ensures full width
  },
  fieldContainer: {
    width: '100%', // Make the input field take the full width
    height: '100%',
    backgroundColor: 'transparent',
    flex: 1, // Allow flexibility within parent
  },
  input: {
    paddingLeft: 0,
    // textAlignVertical: 'bottom',
    fontSize: RF(14),
    backgroundColor: 'transparent',
    flex: 1, // Expand to full width
    // borderWidth: 1,
    padding: 0,
  },
  dropIcon: {
    height: RF(15),
    width: RF(15),
  },
  callIcon: {
    width: RF(16),
    height: RF(16),
    marginRight: RF(16),
    marginBottom: RF(2),
    alignSelf: 'center',
    tintColor: colors.primary,
  },

  countryButtonStyle: {
    alignItems: 'center',
    width: RF(65),
    justifyContent: 'flex-start',
    borderColor: colors.primary,
  },
  containerText: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
});
