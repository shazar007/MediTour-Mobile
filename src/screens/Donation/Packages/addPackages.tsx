import {RF} from '@theme';
import useStyles from './styles';
import {image} from '@assets';
import {useDispatch, useSelector} from 'react-redux';
import React, {useState, useEffect} from 'react';
import {RouteProp, useTheme} from '@react-navigation/native';
import {CustomHeader, CustomLoader, ImageSelection, Text} from '@components';
import {Image, Pressable, ScrollView, TextInput, View} from 'react-native';
import {Wrapper, AppButton} from '@components';
import {
  donationAddPackage,
  donationPackageEdit,
  navigate,
  navigationRef,
} from '@services';
import {setImg} from '@redux';
import {Alert} from '@utils';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      item?: any;
      type?: any;
    };
  }>;
}

const Donation_Add_Packages = (props: Props) => {
  const {item, type} = props.route?.params;
  const [name, setName] = useState(
    item?.donationTitle ? item?.donationTitle : '',
  );
  const [desc, setDesc] = useState(item?.description ? item?.description : '');
  const [target, setTarget] = useState(
    item?.targetAudience ? item?.targetAudience : '',
  );
  const [amount, setAmount] = useState(
    item?.requiredAmount ? item?.requiredAmount.toString() : '',
  );
  const [days, setDays] = useState(item?.totalDays ? item?.totalDays : '');
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState<any>(false);
  const [uri, setUri] = useState<any>(item?.images ? item?.images[0] : null);

  const {img} = useSelector((state: any) => state.root.b2b);

  useEffect(() => {
    dispatch(setImg(''));
    if (type == 'add') {
      setDesc('');
      setName('');
    }
  }, []);

  const onSave = () => {
    _add_Packages();
  };

  const _add_Packages = () => {
    if (name && target && amount && desc && days) {
      setLoading(true);
      let params = {
        images: [img],
        totalDays: days,
        description: desc,
        donationTitle: name,
        criteriaId: item?._id,
        targetAudience: target,
        requiredAmount: amount,
      };

      donationAddPackage(params)
        .then((res: any) => {
          navigate('DonationPackages');
        })
        .catch((err: any) => {})
        .finally(() => setLoading(false));
    } else {
      Alert.showError('Please fill all fields');
    }
  };

  const onEdit = () => {
    setLoading(true);
    let params = {
      images: [img],
      totalDays: days,
      description: desc,
      donationTitle: name,
      criteriaId: item?._id,
      targetAudience: target,
      requiredAmount: amount,
    };
    let id = item?._id;
    donationPackageEdit(id, params)
      .then((res: any) => {
        navigate('DonationPackages');
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={type == 'edit' ? 'Edit Package' : 'Add Packages'}
          leftIcon
          titleColor={colors.white}
          notify
        />
        <ScrollView>
          <View style={{marginHorizontal: RF(20)}}>
            <TextInput
              value={name}
              style={styles._input}
              placeholderTextColor={'#7D7D7D'}
              placeholder="Donation Title"
              onChangeText={text => setName(text)}
            />
            <TextInput
              value={target}
              style={styles._input}
              placeholderTextColor={'#7D7D7D'}
              placeholder="Target Audience"
              onChangeText={text => setTarget(text)}
            />
            <TextInput
              value={amount}
              style={styles._input}
              placeholderTextColor={'#7D7D7D'}
              placeholder="Total Required Amount"
              keyboardType='numeric'
              onChangeText={text => setAmount(text)}
            />
            <TextInput
              value={days}
              style={styles._input}
              placeholderTextColor={'#7D7D7D'}
              placeholder="Total Days"
              onChangeText={text => setDays(text)}
            />
            <TextInput
              value={desc}
              style={styles._input}
              placeholderTextColor={'#7D7D7D'}
              placeholder="Description"
              onChangeText={text => setDesc(text)}
            />
            <View style={styles.mt}>
              <ImageSelection uri={uri} setUri={setUri} />
            </View>
          </View>

          <View style={styles.button}>
            <AppButton
              title="Save"
              bgClr={'#F4EFFF'}
              textcolor={colors?.bluE}
              onPress={type == 'edit' ? onEdit : onSave}
            />
          </View>
        </ScrollView>
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

const Add_Criteria_Section = ({
  colors,
  name,
  setName,
  styles,
  uploadImage,
  desc,
  setDesc,
  onClose,
}: {
  uploadImage?: any;
  styles?: any;
  colors?: any;
  name?: any;
  setName?: any;
  desc?: any;
  setDesc?: any;
  onClose?: any;
}) => {
  return (
    <>
      <Text
        align
        size={20}
        SFsemiBold
        color={colors?.bluE}
        style={{marginTop: RF(20)}}>
        Add Criteria
      </Text>
      <TextInput
        value={name}
        style={styles._input}
        placeholderTextColor={'#7D7D7D'}
        placeholder="Criteria Name e.g Education"
        onChangeText={text => setName(text)}
      />
      <Pressable style={styles.imgV} onPress={uploadImage}>
        <Image source={image} style={styles._img} />
        <Text size={14} SFregular color={colors?.bluE}>
          Upload your image here, or browse
        </Text>
        <Text size={14} SFregular color={colors?.bluE}>
          Supports PNG,JPG,Webp
        </Text>
      </Pressable>

      <TextInput
        value={desc}
        style={styles._input}
        placeholder="Description"
        placeholderTextColor={'#7D7D7D'}
        onChangeText={text => setDesc(text)}
      />
      <AppButton
        title="Save"
        bgColor={'#F4EFFF'}
        textcolor={'white'}
        onPress={onClose}
      />
    </>
  );
};

export default Donation_Add_Packages;
