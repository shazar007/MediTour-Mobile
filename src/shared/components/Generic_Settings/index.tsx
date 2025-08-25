import {
  Info,
  Social,
  Profile,
  TaxInfo,
  Security,
  Bank_Details,
  Availability,
} from './section';
import axios from 'axios';
import styles from './styles';
import Wrapper from '../wrapper';
import {setSettings} from '@redux';
import {getColorCode} from '@theme';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import CustomLoader from '../CustomLoader';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import {BASE_URL, showToast} from '@services';
import CustomHeader from '../AA_New_Components/CustomHeader';

const Generic_Settings = ({
  bgclr,
  phone,
  email,
  address,
  onUpdate,
}: {
  bgclr?: any;
  phone?: any;
  email?: any;
  address?: any;
  onUpdate?: any;
}) => {
  const dispatch: any = useDispatch();
  const theme: any = useTheme();
  const colors = theme.colors;
  const {endPoints} = getColorCode();
  const [loading, setLoading] = useState<any>(false);
  const {settings} = useSelector((state: any) => state.root.b2b);

  const handleChangeText = async (text: any, type: any) => {
    let clone = JSON.parse(JSON.stringify(settings));
    Object.keys(clone).map((key: any, ind: any) => {
      if (type == key) {
        clone[key] = text;
      }
    });
    dispatch(setSettings(clone));
  };

  const onPressEnd = async (type: any) => {
    let clone = JSON.parse(JSON.stringify(settings));

    setLoading(true);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      let imageUrl = result[0]?.uri;
      let name = imageUrl.split('/').pop();
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      const formData = new FormData();
      formData.append('file', {
        uri: imageUrl,
        type: 'image/jpeg',
        name: name,
      });
      axios
        .post(BASE_URL + endPoints, formData, {
          headers: headers,
        })
        .then(response => {
          Object.keys(clone).map((key: any, ind: any) => {
            if (key == type) {
              clone[key] = response?.data?.fileUrl;
            }
          });
          dispatch(setSettings(clone));
        })
        .catch(error => {
          if (error?.response?.data?.message == undefined) {
            showToast('error', 'Server error', false);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        setLoading(false);
      } else {
        console.error('DocumentPicker Error:', error);
        setLoading(false);
      }
    }
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Settings'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      {/* <HeaderCard
        home
        numberOfIcons={'2'}
        icon1Clr={icon1Clr}
        onPress={openDrawer}
        cardColor={cardColor}>
        <UserHeaderContent
          ScreenTitle={'Settings'}
          ColorScreenTitle={hederTxtClr}
        />
      </HeaderCard> */}

      <ScrollView style={styles.pb}>
        <Profile
          bgclr={bgclr}
          email={email}
          phone={phone}
          data={settings}
          onUpdate={onUpdate}
          onPressEnd={onPressEnd}
          handleChangeText={handleChangeText}
        />

        <Security
          bgclr={bgclr}
          data={settings}
          onUpdate={onUpdate}
          handleChangeText={handleChangeText}
        />

        <Info
          bgclr={bgclr}
          data={settings}
          address={address}
          onUpdate={onUpdate}
          onPressEnd={onPressEnd}
          handleChangeText={handleChangeText}
        />

        <Bank_Details
          data={settings}
          bgclr={bgclr}
          onUpdate={onUpdate}
          handleChangeText={handleChangeText}
        />

        <TaxInfo
          data={settings}
          bgclr={bgclr}
          onUpdate={onUpdate}
          onPressEnd={onPressEnd}
          handleChangeText={handleChangeText}
        />

        <Social
          data={settings}
          bgclr={bgclr}
          onUpdate={onUpdate}
          handleChangeText={handleChangeText}
        />

        <Availability
          data={settings}
          bgclr={bgclr}
          setData={setSettings}
          onUpdate={onUpdate}
        />
        {loading && <CustomLoader />}
      </ScrollView>
    </Wrapper>
  );
};

export default Generic_Settings;

// name={drName}
// address={address}
// license={license}
// c_name={clinicName}
// qualification={qualification}

//....Notification....//
// const [toggleMsg, setToggleMsg] = useState<any>(false);
// const [toggleOrder, setToggleOrder] = useState<any>(false);
// const [toggleInbox, setToggleInbox] = useState<any>(false);
// const [toggleRating, setToggleRating] = useState<any>(false);
{
  /* <Notification
          onToggle={onToggle}
          toggleMsg={toggleMsg}
          toggleInbox={toggleInbox}
          toggleOrder={toggleOrder}
          toggleRating={toggleRating}
        /> */
}
// const onToggle = (item: any, index: any) => {
//   if (index == 0) {
//     setToggleInbox(!toggleInbox);
//   } else if (index == 1) {
//     setToggleMsg(!toggleMsg);
//   } else if (index == 2) {
//     setToggleOrder(!toggleOrder);
//   } else if (index == 3) {
//     setToggleRating(!toggleRating);
//   }
// };
