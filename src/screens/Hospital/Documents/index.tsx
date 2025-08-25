import useStyles from './styles';
import React, {useState, useRef, useEffect} from 'react';
import {CustomHeader, CustomLoader} from '@components';
import {View} from 'react-native';
import {Wrapper} from '@components';
import {useSelector} from 'react-redux';
import {Modalize} from 'react-native-modalize';
import {useTheme} from '@react-navigation/native';
import {getAllDepartments} from '@services';

const Hospital_Documents = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [input1, setInput1] = useState<any>('');
  const [input3, setInput3] = useState<any>('');
  const [editableDr, setEditableDr] = useState(false);
  const [editableName, setEditableName] = useState(false);
  const [editableLogo, setEditableLogo] = useState(false);
  const modalizeRef = useRef<Modalize>(null);
  const [allDept, setAllDept] = useState([]);
  const [dataSets, setDataSets] = useState([]);
  const [loading, setLoading] = useState<any>(false);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [selectedImage, setSelectedImage] = useState<any>('');
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const {B2B} = useSelector((state: any) => state.root.b2b);
  const [edit, setEdit] = useState<any>(false);

  useEffect(() => {
    // fetchAllDepartments();
  }, []);

  const fetchAllDepartments = () => {
    setLoading(true);
    getAllDepartments()
      .then((res: any) => {
        setAllDept(res?.data?.departments);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{backgroundColor: '#F5F5F5', flex: 1}}>
        <CustomHeader
          title={'Doctors'}
          leftIcon
          titleColor={colors.white}
          notify
        />
        {/* <HeaderCard
          icon1={LabMenu}
          icon2={LabBell}
          numberOfIcons={'2'}
          onPress={openDrawer}
          tintColor={colors.primary}
          cardColor={colors.Hospital}>
          <UserHeaderContent
            searhIconTr
            searhIconTrue
            tintColor={colors.primary}
            ScreenTitle={'Doctors'}
            ColorScreenTitle={colors.primary}
          />
        </HeaderCard> */}
        {/* <View style={styles.list}>
            <FlatList
              data={allDept}
              renderItem={(i: any, index: any) => {
                return (
                 <>
                 
                 </>
                );
              }}
            />
          </View> */}
      </View>

      {loading && <CustomLoader />}
    </Wrapper>
  );
};
export default Hospital_Documents;
