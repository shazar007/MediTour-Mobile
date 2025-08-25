import React, { useRef } from "react";
import PropTypes from "prop-types";
import { View, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { live } from "@assets";
import { RF } from "@theme";
import { rs } from "@services";

const LocationInput = ({
  placeholder = "Enter Your Location",
  type,
  setData,
  defaultValue,
}: {
  placeholder?: any,
  type?: any;
  setData?: any;
  defaultValue?: any
}) => {
  const autocompleteRef: any = useRef();

  const handleSelect = async (value: any) => {
    const {
      description,
      place_id,
    } = value;

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=AIzaSyBrNjsUsrJ0Mmjhe-WUKDKVaIsMkZ8iQ4A`
    );
    const data = await response.json();

    const { lat, lng } = data?.results[0]?.geometry?.location;
    let city = "";
    for (let component of data?.results[0].address_components) {
      for (let type of component.types) {
        if (type === "locality") {
          city = component.long_name;
          break;
        }
      }
      if (city !== "") break;
    }
    setData({ label: description, lat, lng, city });
  };

  const handleIconClick = () => {
    if (autocompleteRef.current) {
      autocompleteRef.current.focus();
    }
  };

  return (
    <View style={type === "box" ? styles.boxContainer : styles.lineContainer}>
      <GooglePlacesAutocomplete
        ref={autocompleteRef}
        placeholder={placeholder}
        disableScroll
        fetchDetails
        onPress={(data, details = null) => handleSelect(data)}
        query={{
          key: "AIzaSyBrNjsUsrJ0Mmjhe-WUKDKVaIsMkZ8iQ4A",
          language: "en",
        }}
        textInputProps={{
          defaultValue: defaultValue,
          placeholderTextColor: type === "box" ? "#999" : "#00276d",
          style: [styles.textInput, type === "box" ? styles.boxInput : styles.lineInput],
        }}
      />
      <TouchableOpacity onPress={handleIconClick}>
        <Image source={live} style={{ width: RF(24), height: RF(24) }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 10,
    width: "100%",
    padding: 10,
    color: '#000',
    backgroundColor: '#EDF1F3',
    paddingHorizontal: rs(8),
    paddingVertical: rs(8),
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: rs(14),
    marginTop: RF(8)
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#6F6F72",
  },
  textInput: {
    fontFamily: "Poppins",
    color: "#00276d",
  },
  boxInput: {
    fontSize: 14,
    fontStyle: "normal",
  },
  lineInput: {
    fontSize: 14,
    fontStyle: "italic",
  },
});

LocationInput.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  setData: PropTypes.func.isRequired,
  defaultValue: PropTypes.any,
};

export default LocationInput;
