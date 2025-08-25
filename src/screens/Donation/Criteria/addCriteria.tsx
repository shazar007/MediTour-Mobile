import useStyles from './styles';
import {LabBell, backIcon, plus} from '@assets';
import React, {useState, useRef, useEffect} from 'react';
import {
  Add_Criteria_Section,
  CustomHeader,
  CustomLoader,
  CustomModalize,
  ImageCard,
  ImageSelection,
  Text,
} from '@components';
import {
  View,
  Image,
  FlatList,
  Pressable,
  TextInput,
  RefreshControl,
} from 'react-native';
import {RF} from '@theme';
import {Modalize} from 'react-native-modalize';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp, useTheme} from '@react-navigation/native';
import {Wrapper, AppButton} from '@components';
import {
  navigate,
  showToast,
  navigationRef,
  donationAddCriteria,
  donationGETALLCriteria,
} from '@services';
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

const Donation_Add_Criteria = (props: Props, navigation: any) => {
  const {item, type} = props.route?.params;
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const modalizeRef = useRef<Modalize>(null);
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const dispatch: any = useDispatch();
  const [_index, setIndex] = useState<any>();
  const [criteria, setCriteria] = useState<any>([]);
  const [packages, setPackages] = useState<any>([]);
  const [uri, setUri] = useState<any>('');

  const [loading, setLoading] = useState<any>(false);

  const {img} = useSelector((state: any) => state.root.b2b);
  const [criteria_Item, set_Criteria_Item] = useState<any>();
  const [add_Criteria, setAdd_Criteria] = useState<any>(false);
  const [selectCriteria, setSelectCriteria] = useState<any>(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (type == 'add') {
      setName('');
      setDesc('');
    }
  }, []);

  useEffect(() => {
    fetchCriteria();
  }, []);
  const fetchCriteria = () => {
    setLoading(true);
    donationGETALLCriteria()
      .then((res: any) => {
        setCriteria(res?.data?.criterion);
        setAdd_Criteria(false);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };
  const onNext = () => {
    if (criteria_Item) {
      navigate('Donation_Add_Packages', {item: criteria_Item, type: 'add'});
    } else {
      Alert.showError('Please Select 1 criteria');
    }
  };
  const onOpenDetail = (item: any) => {
    if (criteria_Item) {
      navigate('Donation_Criteria', {
        data: item,
      });
    } else {
      Alert.showError('Please Select 1 criteria');
    }
  };
  const onSelect = (item: any, index: any) => {
    setIndex(index);
    set_Criteria_Item(item);
    if (item) {
      setSelectCriteria(true);
    }
  };
  const onAddCriteria = () => {
    setAdd_Criteria(true);
    modalizeRef.current?.open();
  };

  const _add_Criteria = () => {
    let params = {
      criteriaName: name,
      description: desc,
      image: img,
    };

    donationAddCriteria(params)
      .then((res: any) => {
        modalizeRef.current?.close();
        fetchCriteria();
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCriteria();
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Packages'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <View style={styles.view}>
        <FlatList
          scrollEnabled
          data={criteria}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
          style={{marginTop: RF(30)}}
          renderItem={({item, index}: any) => {
            return (
              <ImageCard
                img={item?.image}
                onOpenDetail={() => onOpenDetail(item)}
                onSelect={() => onSelect(item, index)}
                clr={index == _index ? 'green' : colors?.White}
              />
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View style={styles.empty}>
                <Text>No Criteria Found</Text>
              </View>
            );
          }}
        />
        <View style={{paddingBottom: 50}} />
      </View>

      <Pressable style={styles.btnV} onPress={onAddCriteria}>
        {/* <Image source={plus} style={styles.btn} /> */}
        <Text color={"#fff"}>Add Criteria</Text>
      </Pressable>

      <View style={styles.button}>
        <AppButton
          title="Next"
          onPress={onNext}
          bgClr={'#F4EFFF'}
          textcolor={colors?.bluE}
        />
      </View>

      <CustomModalize ref={modalizeRef} height={RF(450)}>
        <Add_Criteria_Section
          name={name}
          desc={desc}
          styles={styles}
          colors={colors}
          setDesc={setDesc}
          setName={setName}
          setUri={setUri}
          uri={uri}
          title={'Add Criteria'}
          onClose={_add_Criteria}
        />
      </CustomModalize>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

// const Add_Criteria_Section = ({
//   colors,
//   name,
//   setName,
//   styles,
//   desc,
//   setDesc,
//   onClose,
// }: {
//   styles?: any;
//   colors?: any;
//   name?: any;
//   setName?: any;
//   desc?: any;
//   setDesc?: any;
//   onClose?: any;
// }) => {
//   return (
//     <View
//       style={{
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}>
//       <Text
//         align
//         size={20}
//         SFsemiBold
//         color={colors?.bluE}
//         style={{marginTop: RF(20)}}>
//         Add Criteria
//       </Text>
//       <TextInput
//         value={name}
//         style={styles._input}
//         placeholderTextColor={'#7D7D7D'}
//         placeholder="Criteria Name e.g Education"
//         onChangeText={text => setName(text)}
//       />
//       <ImageSelection />

//       <TextInput
//         value={desc}
//         style={styles._input}
//         placeholder="Description"
//         placeholderTextColor={'#7D7D7D'}
//         onChangeText={text => setDesc(text)}
//       />
//       <AppButton
//         title="Save"
//         onPress={onClose}
//         bgClr={'#F4EFFF'}
//         textcolor={colors?.bluE}
//       />
//     </View>
//   );
// };

export default Donation_Add_Criteria;

{
  /* <CustomModalize
        ref={modalizeRef}
        height={add_Criteria ? RF(520) : RF(630)}>
        {add_Criteria ? (
          <Add_Criteria_Section
            name={name}
            desc={desc}
            styles={styles}
            colors={colors}
            setDesc={setDesc}
            setName={setName}
            onClose={_add_Criteria}
            uploadImage={uploadImage}
          />
        ) : (
          <View style={styles.view}>
            <FlatList
              data={criteria}
              scrollEnabled
              contentContainerStyle={{height: RF(400)}}
              renderItem={({item, index}: any) => {
                return (
                  <ImageCard
                    img={item?.image}
                    onSelect={() => onSelect(item, index)}
                    clr={index == _index ? 'green' : colors?.bluE}
                  />
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View style={styles.empty}>
                    <Text>No Criteria Found</Text>
                  </View>
                );
              }}
            />

            <Pressable style={styles.btnV} onPress={onAddCriteria}>
              <Image source={plus} style={styles.btn} />
            </Pressable>
            <AppButton
              title="Next"
              onPress={onNext}
              bgColor={'#F4EFFF'}
              textcolor={'white'}
            />
          </View>
        )}
      </CustomModalize> */
}
