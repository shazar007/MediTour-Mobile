import {
  I18nManager,
  Image,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {search} from '@assets';
import {rs, rv} from '@services';
import {useTheme} from '@react-navigation/native';

const SearchInput = (props: TextInputProps) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  return (
    <View style={styles.searchContainer}>
      <View style={styles.icon}>
        <Image
          source={search}
          style={styles.icon}
          tintColor={colors.fadeGray}
        />
      </View>

      <TextInput
        style={styles.input}
        autoCorrect={false}
        enablesReturnKeyAutomatically
        placeholder={'Search'}
        placeholderTextColor={colors.fadeGray}
        {...props}
      />
    </View>
  );
};

export default SearchInput;

const useStyles = (colors: any) =>
  StyleSheet.create({
    searchContainer: {
      width: '100%',
      height: rv(34),
      backgroundColor: colors?.white,
      paddingLeft: rs(17),
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.mediumGray,
      borderRadius: rs(8),
    },
    input: {
      width: '90%',
      height: 'auto',
      backgroundColor: colors.white,
      marginLeft: rs(24),
      fontSize: rs(12),
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    icon: {
      position: 'absolute',
      left: rs(8),
      height: rv(16),
      width: rs(16),
    },
  });
