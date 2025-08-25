import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {searchDoctorTest, searchProduct} from '@services';
import {FlatList} from 'react-native';
import {getColorCode} from '@theme';
import Text from '../text';

const SearchTest = ({
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
  const {search_Test} = getColorCode();

  const handleSearch = async (text: string) => {
    let params = {
      search: text,
    };
    try {
      const res = await searchDoctorTest(params, search_Test);
      setSearchResults(res?.data?.data);
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
    formik.setFieldValue('testName', val);
    handleSearchDebounced(val);
  };

  const onSuggestionSelect = (suggestion: any) => {
    //
    formik.setFieldValue('testId', suggestion._id);
    formik.setFieldValue('testName', suggestion.name);
    setShowSuggestions(false);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={'Select a Test'}
        onChangeText={onChangeTextSearch}
        placeholderTextColor={'#0D47A1'}
        value={formik?.values?.testName}
      />

      {formik?.touched?.testName && formik?.errors?.testName ? (
        <Text style={{color: 'red'}}>{formik?.errors?.testName}</Text>
      ) : null}
      {showSuggestions && (
        <FlatList
          data={searchResults}
          scrollEnabled={false}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onSuggestionSelect(item)}>
              <View style={styles.suggestionItem}>
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SearchTest;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000', // Add a border color for better visibility
    padding: 8, // Add some padding for better UX
    color: '#0D47A1',
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
