import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {searchProduct} from '@services';
import {FlatList} from 'react-native';
import {getColorCode} from '@theme';
import Text from '../text';
const SearchComponent = ({
  formik,
  searchResults,
  setSearchResults,
}: {
  formik?: any;
  searchResults?: any;
  setSearchResults?: any;
}) => {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const {searching_Product} = getColorCode();
  const handleSearch = async (text: string) => {
    let params = {
      keyword: text,
    };
    try {
      const res = await searchProduct(params, searching_Product);
      setSearchResults(res?.data?.products);
      setShowSuggestions(true);
    } catch (err) {}
  };

  const handleSearchDebounced = (text: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      handleSearch(text);
    }, 300);
  };

  const onChangeTextSearch = (val: string) => {
    formik.setFieldValue('medicineName', val);
    handleSearchDebounced(val);
  };

  const onSuggestionSelect = (suggestion: any) => {
    //
    formik.setFieldValue('medicineId', suggestion._id);
    formik.setFieldValue('medicineName', suggestion.productName);
    setShowSuggestions(false);
  };

  return (
    <View>
      <TextInput
        style={[styles.input]}
        placeholderTextColor={'#0D47A1'}
        placeholder={'Select a Medicine'}
        onChangeText={onChangeTextSearch}
        value={formik?.values?.medicineName}
      />

      {formik?.touched?.medicineId && formik?.errors?.medicineId ? (
        <Text style={{color: 'red'}}>{formik?.errors?.medicineId}</Text>
      ) : null}
      {showSuggestions && (
        <FlatList
          data={searchResults}
          scrollEnabled={false}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onSuggestionSelect(item)}>
              <View style={styles.suggestionItem}>
                <Text>{item.productName}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 8,
    color: '#0D47A1',
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
