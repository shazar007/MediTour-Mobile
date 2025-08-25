import useStyles from './styles';
import {LabBell, backIcon} from '@assets';
import {Image, Pressable, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  Wrapper,
  AppButton,
  CustomLoader,
  DelSave_Modal,
  CustomModalize,
  Add_Criteria_Section,
  CustomHeader,
} from '@components';
import {RF} from '@theme';
import {Modalize} from 'react-native-modalize';
import {RouteProp, useTheme} from '@react-navigation/native';
import {
  navigate,
  navigationRef,
  donationEditCriteria,
  donationdeleteCriteria,
} from '@services';
import {setImg} from '@redux';
import {useDispatch} from 'react-redux';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      data?: any;
    };
  }>;
}

const Donation_Criteria = (props: Props) => {
  const {data} = props.route?.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const dispatch: any = useDispatch();
  const [del, setDel] = useState(false);
  const modalizeRef = useRef<Modalize>(null);
  const [update, setUpdate] = useState<any>();
  const [delModal, setDelModal] = useState(false);
  const [uri, setUri] = useState(data?.image || '');
  const [loading, setLoading] = useState<any>(false);
  const [prevData, setPrevData] = useState<any>(data);
  const [openDetail, setOpenDetail] = useState(false);
  const [name, setName] = useState(data?.criteriaName || '');
  const [desc, setDesc] = useState(data?.description || '');

  useEffect(() => {
    dispatch(setImg(data?.image));
  }, []);

  const onOpen = () => {
    setOpenDetail(!openDetail);
  };
  const _edit_Criteria = () => {
    let id: any = data?._id;
    let params = {
      description: name,
      criteriaName: desc,
      image: uri,
    };
    donationEditCriteria(id, params)
      .then((res: any) => {
        setUpdate(res?.data?.criteria);
        setPrevData({});
        modalizeRef.current?.close();
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };
  const _del_Criteria = () => {
    setLoading(true);
    let id: any = data?._id;
    donationdeleteCriteria(id)
      .then((res: any) => {
        setDelModal(false);
        navigate('DonationPackages');
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };
  const handleClick = () => {
    setDel(true);
    setDelModal(true);
  };

  const handleDelete = () => {
    if (delModal) {
      _del_Criteria();
    }
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Criteria'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <View style={styles.v}>
        <Image
          style={styles.img}
          source={{uri: update?.image ? update?.image : prevData?.image}}
        />
      </View>
      <Pressable onPress={onOpen}>
        <Text color={colors?.bluE} size={16} SFsemiBold align numberOfLines={2}>
          {update?.description ? update?.description : prevData?.description}
        </Text>
        <View style={styles.row}>
          <AppButton
            width={100}
            height={32}
            title="Update"
            bgClr={'#F4EFFF'}
            textcolor={colors?.bluE}
            containerStyle={{marginRight: 10}}
            onPress={() => modalizeRef.current?.open()}
          />
          <AppButton
            width={100}
            height={32}
            title="Delete"
            bgClr={'red'}
            
            onPress={handleClick}
            textcolor={"#fff"}
          />
        </View>
      </Pressable>

      {/* <View style={styles.button}>
        <AppButton
          bgClr={'#F4EFFF'}
          textcolor={colors?.bluE}
          title="Continue"
        />
      </View> */}

      <CustomModalize ref={modalizeRef} height={RF(450)}>
        <Add_Criteria_Section
          name={name}
          desc={desc}
          styles={styles}
          colors={colors}
          uri={uri}
          setDesc={setDesc}
          setName={setName}
          onClose={_edit_Criteria}
          title={'Update Criteria'}
          setUri={setUri}
        />
      </CustomModalize>

      {del && (
        <DelSave_Modal
          title={'Criteria'}
          simpleModal={delModal}
          handleDelete={handleDelete}
          setSimpleModal={setDelModal}
        />
      )}

      {loading && <CustomLoader />}
    </Wrapper>
  );
};
export default Donation_Criteria;
