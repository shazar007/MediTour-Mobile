import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import Text from '../text';
import {favourite, fill_favourite} from '@assets';
import {useSelector} from 'react-redux';

interface Props {
  item?: any;
  screenNavigate?: any;
  handleFavorite?: any;
  indicator?: any;
  response?: any;
}
const InsuranceComponent = (props: Props) => {
  const {item, screenNavigate, handleFavorite, response} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const [loading, setLoading] = useState(false);
  const {user, favorites} = useSelector((state: any) => state.root.user);
  const isFavorite = favorites?.some(
    (fav: any) => fav.itemId === item?._id && fav.favModel === response,
  );
  return (
    <TouchableOpacity style={styles.TouchStyle} onPress={screenNavigate}>
      <View style={styles.ContainerCard}>
        <Image
          source={{
            uri:
              item?.insuranceId?.logo ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
          }}
          style={styles.ImageLogo}
        />
      </View>
      <View style={styles.innerRow}>
        <View style={styles.ViewStyle}>
          <Text
            size={14}
            SFbold
            numberOfLines={1}
            color={colors.blueText}
            style={{width: '72%'}}>
            {item?.packageName}
          </Text>
          <Pressable
            style={styles.favView}
            onPress={() => handleFavorite(item._id, setLoading)}>
            {loading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <>
                {isFavorite ? (
                  <Image
                    source={fill_favourite}
                    style={[styles.favoriteIcon]}
                  />
                ) : (
                  <Image source={favourite} style={[styles.favoriteIcon]} />
                )}
              </>
            )}
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: RF(16),
          }}>
          <Text
            size={RF(12)}
            SFregular
            color={colors.blueText}
            style={styles.marginTop}>
            {item?.packageDescription}
          </Text>
          <Text size={12} SFmedium color={colors.blueText}>
            {item?.actualPrice}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InsuranceComponent;

const styles = StyleSheet.create({
  marginTop: {width: RF(140)},
  ContainerCard: {
    width: RF(48),
    height: RF(48),
    backgroundColor: '#fff',
    borderRadius: RF(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  favView: {
    position: 'absolute',
    right: 0,
  },
  favoriteIcon: {
    width: RF(16),
    height: RF(16),
    resizeMode: 'contain',
  },
  ImageLogo: {
    width: '100%',
    height: RF(26),
    resizeMode: 'contain',
  },
  innerRow: {
    marginLeft: RF(8),
    flexGrow: 1,
  },
  TouchStyle: {
    width: '100%',
    paddingVertical: RF(8),
    paddingHorizontal: RF(8),
    borderWidth: 1,
    borderColor: 'rgba(116, 108, 162, 1)',
    borderRadius: RF(16),
    backgroundColor: 'rgba(116, 108, 162, 0.24)',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: RF(4),
  },
  ViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
