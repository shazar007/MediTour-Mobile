import {RF} from '@theme';
import styles from './styles';
import {uploadIcon} from '@assets';
import {eyeHideIcon} from '@assets';
import AppButton from '../AppButton';
import React, {useState} from 'react';
import {notificationList} from '@services';
import Toggle_Button from '../LoginOption';
import {FlatList, View} from 'react-native';
import CustomDropDown from '../CustomDropDown';
import ClickableField from '../clickableField';
import {useTheme} from '@react-navigation/native';
import CustomFloatingLabelInput from '../floatingLabelInput';
import Generic_List_Item_Selection from '../GenericList_ItemSelection';
import {useDispatch} from 'react-redux';

const RenderInputField = ({
  label,
  value,
  type,
  editable,
  endIcon,
  onPressEnd,
  onSubmit,
  handleChangeText,
}: {
  type?: any;
  label?: any;
  value?: any;
  endIcon?: any;
  editable?: any;
  onPressEnd?: any;
  onSubmit?: any;
  handleChangeText?: any;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <CustomFloatingLabelInput
      value={value}
      label={label}
      m_Top={RF(32)}
      bdClr={'#BCBCBC'}
      editable={editable}
      inputClr={'#0D47A1'}
      labelClr={'#BCBCBC'}
      eyeIconClr={'#0D47A1'}
      onPressEnd={onPressEnd}
      tintColorStart={'#0D47A1'}
      placeholderTextColor={'#0D47A1'}
      secureIcon={type == 'password' && eyeHideIcon}
      onChangeText={(text: any) =>
        handleChangeText && handleChangeText(text, type)
      }
      endIcon={endIcon}
      onSubmitEditing={() => onSubmit()}
      secureTextEntry={type == 'password'}
      keyboardType={
        type == 'cnicNo' || type == 'emergencyNo' ? 'numeric' : 'default'
      }
      onPress={type === 'password' ? togglePasswordVisibility : undefined}
    />
  );
};

export const Profile = ({
  email,
  data,
  bgclr,
  phone,
  onUpdate,
  onPressEnd,
  handleChangeText,
}: {
  no?: any;
  data?: any;
  bgclr?: any;
  email?: any;
  phone?: any;
  onUpdate?: any;
  onPressEnd?: any;
  handleChangeText?: any;
}) => {
  const [open1, setOpen1] = useState<any>(false);

  return (
    <>
      <ClickableField
        open={open1}
        openClr={bgclr}
        bgclr={bgclr}
        title={'Profile'}
        setOpen={setOpen1}>
        <RenderInputField
          type={'fname'}
          value={data?.fname}
          label={'Owner First Name'}
          handleChangeText={handleChangeText}
        />
        <RenderInputField
          type={'lname'}
          value={data?.lname}
          label={'Owner Last Name'}
          handleChangeText={handleChangeText}
        />
        <RenderInputField
          type={'cnicNo'}
          value={data?.cnicNo}
          label={'CNIC/Passport No.'}
          handleChangeText={handleChangeText}
        />
        <RenderInputField
          type={'cnicImage'}
          endIcon={uploadIcon}
          // onPressEnd={onPressEnd}
          onPressEnd={() => onPressEnd('cnicImage')}
          value={data?.cnicImage}
          label={'CNIC/Passport Image'}
        />
        <RenderInputField
          type={'cnicExpiry'}
          value={data?.cnicExpiry}
          label={'CNIC/Passport Expiry'}
          handleChangeText={handleChangeText}
        />
        <RenderInputField
          type={'emergencyNo'}
          label={'Emergency No'}
          value={data?.emergencyNo}
          handleChangeText={handleChangeText}
        />

        <View style={styles.view}>
          <AppButton
            title="Update"
            width={RF(92)}
            bgClr={'green'}
            height={RF(32)}
            onPress={onUpdate}
            textcolor={'white'}
          />
        </View>

        <RenderInputField
          value={phone}
          type={'phone'}
          editable={false}
          label={'Phone No'}
        />
        <RenderInputField
          value={email}
          type={'email'}
          label={'Email'}
          editable={false}
        />
      </ClickableField>
    </>
  );
};

export const Security = ({
  data,
  bgclr,
  onUpdate,
  handleChangeText,
}: {
  data?: any;
  bgclr?: any;
  onUpdate?: any;
  handleChangeText?: any;
}) => {
  const [open2, setOpen2] = useState<any>(false);

  return (
    <ClickableField
      open={open2}
      bgclr={bgclr}
      openClr={bgclr}
      title={'Security'}
      setOpen={setOpen2}>
      <RenderInputField
        type={'password'}
        label={'Current Password'}
        value={data?.password}
        handleChangeText={handleChangeText}
      />
      <RenderInputField
        type={'confirmPassword'}
        label={'New Password'}
        value={data?.confirmPassword}
        handleChangeText={handleChangeText}
      />
      <View style={styles.view}>
        <AppButton
          title="Update"
          width={RF(92)}
          bgClr={'green'}
          height={RF(32)}
          onPress={onUpdate}
          textcolor={'white'}
        />
      </View>
    </ClickableField>
  );
};

export const Info = ({
  data,
  bgclr,
  address,
  onUpdate,
  onPressEnd,
  handleChangeText,
}: {
  data?: any;
  bgclr?: any;
  address?: any;
  onUpdate?: any;
  onPressEnd?: any;
  handleChangeText?: any;
}) => {
  const [open3, setOpen3] = useState<any>(false);
  return (
    <>
      <ClickableField
        open={open3}
        bgclr={bgclr}
        title={'Info'}
        openClr={bgclr}
        setOpen={setOpen3}>
        <RenderInputField
          type={'name'}
          label={'Name'}
          value={data?.name}
          handleChangeText={handleChangeText}
        />
        <RenderInputField
          type={'logo'}
          label={'Logo'}
          value={data?.logo}
          endIcon={uploadIcon}
          editable={true}
          onPressEnd={() => onPressEnd('logo')}
        />
        <RenderInputField
          type={'licenseNo'}
          label={'License No'}
          value={data?.licenseNo}
          handleChangeText={handleChangeText}
        />
        <RenderInputField
          type={'licenseExpiry'}
          label={'License Expiry'}
          value={data?.licenseExpiry}
          handleChangeText={handleChangeText}
        />
        <RenderInputField
          type={'licenseImg'}
          endIcon={uploadIcon}
          label={'License Image'}
          value={data?.licenseImg}
          onPressEnd={() => onPressEnd('licenseImg')}
        />
        <RenderInputField value={address} label={'Address'} editable={false} />
        <View style={styles.view}>
          <AppButton
            title="Update"
            width={RF(92)}
            bgClr={'green'}
            height={RF(32)}
            onPress={onUpdate}
            textcolor={'white'}
          />
        </View>
      </ClickableField>
    </>
  );
};

export const Bank_Details = ({
  handleChangeText,
  bgclr,
  onUpdate,
  data,
}: {
  data?: any;
  handleChangeText?: any;
  bgclr?: any;
  onUpdate?: any;
}) => {
  const [open3, setOpen3] = useState<any>(false);

  return (
    <>
      <ClickableField
        open={open3}
        bgclr={bgclr}
        openClr={bgclr}
        setOpen={setOpen3}
        title={'Bank Details'}>
        <RenderInputField
          type={'bankName'}
          label={'Bank Name'}
          value={data?.bankName}
          handleChangeText={handleChangeText}
        />
        <RenderInputField
          type={'accHolderName'}
          value={data?.accHolderName}
          label={'Account Holder Name'}
          handleChangeText={handleChangeText}
        />
        <RenderInputField
          type={'accountNo'}
          value={data?.accountNo}
          label={'Account Number'}
          handleChangeText={handleChangeText}
        />

        <View style={styles.view}>
          <AppButton
            title="Update"
            width={RF(92)}
            bgClr={'green'}
            height={RF(32)}
            textcolor={'white'}
            onPress={onUpdate}
          />
        </View>
      </ClickableField>
    </>
  );
};

export const TaxInfo = ({
  data,
  bgclr,
  onUpdate,
  onPressEnd,
  handleChangeText,
}: {
  data?: any;
  bgclr?: any;
  onUpdate?: any;
  onPressEnd?: any;
  handleChangeText?: any;
}) => {
  const [open3, setOpen3] = useState<any>(false);

  return (
    <>
      <ClickableField
        title={'Tax Info'}
        open={open3}
        openClr={bgclr}
        setOpen={setOpen3}
        bgclr={bgclr}>
        <RenderInputField
          type={'incomeTax'}
          value={data?.incomeTax}
          label={'Income Tax No'}
          handleChangeText={handleChangeText}
        />
        <RenderInputField
          type={'salesTax'}
          value={data?.salesTax}
          label={'Sales Tax No'}
          handleChangeText={handleChangeText}
        />
        <RenderInputField
          type={'taxImg'}
          label={'Tax Image'}
          value={data?.taxImg}
          endIcon={uploadIcon}
          onPressEnd={() => onPressEnd('taxImg')}
        />

        <View style={styles.view}>
          <AppButton
            title="Update"
            width={RF(92)}
            bgClr={'green'}
            height={RF(32)}
            textcolor={'white'}
            onPress={onUpdate}
          />
        </View>
      </ClickableField>
    </>
  );
};

export const Social = ({
  data,
  bgclr,
  onUpdate,
  handleChangeText,
}: {
  data?: any;
  bgclr?: any;
  onUpdate?: any;
  handleChangeText?: any;
}) => {
  const [open4, setOpen4] = useState<any>(false);

  return (
    <>
      <ClickableField
        open={open4}
        bgclr={bgclr}
        openClr={bgclr}
        title={'Social'}
        setOpen={setOpen4}>
        <RenderInputField
          type={'web'}
          value={data?.web}
          label={'Website Link'}
          handleChangeText={handleChangeText}
        />
        <RenderInputField
          type={'insta'}
          value={data?.insta}
          label={'Instagram Link'}
          handleChangeText={handleChangeText}
        />
        <RenderInputField
          type={'twitter'}
          value={data?.twitter}
          label={'X. Link'}
          handleChangeText={handleChangeText}
        />
        <RenderInputField
          type={'fb'}
          value={data?.fb}
          label={'Facebook Link'}
          handleChangeText={handleChangeText}
        />

        <View style={styles.view}>
          <AppButton
            title="Update"
            width={RF(92)}
            bgClr={'green'}
            height={RF(32)}
            textcolor={'white'}
            onPress={onUpdate}
          />
        </View>
      </ClickableField>
    </>
  );
};

export const Availability = ({
  data,
  bgclr,
  setData,
  onUpdate,
}: {
  data?: any;
  bgclr?: any;
  setData?: any;
  onUpdate?: any;
}) => {
  const dispatch: any = useDispatch();
  const theme: any = useTheme();
  const colors = theme.colors;
  const [open, setOpen] = useState<any>(false);
  const [open5, setOpen5] = useState<any>(false);
  const [openReason, setOpenReason] = useState<any>(false);
  const [title, setTitle] = useState<any>('Online Status');
  const [reason_title, setReason_Title] = useState<any>('Choose a reasson');
  const [status, setStatus] = useState([
    {title: 'Offline Status'},
    {title: 'Online Status'},
  ]);
  const [reason, setReason] = useState([
    {title: 'Due to order Issue'},
    {title: 'Not booking properly'},
    {title: 'Due to Payment issue'},
    {title: 'Another reason not define'},
  ]);

  const onClick = (item: any, index?: any, type?: any) => {
    let clone = JSON.parse(JSON.stringify(data));
    Object.keys(clone).map((key: any, ind: any) => {
      if (type == key) {
        if (item?.title == 'Offline Status') {
          clone[key] = false;
        } else if (item?.title == 'Online Status') {
          clone[key] = true;
        }
      }
    });
    if (type == 'status') {
      setOpen(false);
      setTitle(`${item?.title}`);
    } else if (type == 'reason') {
      setOpenReason(false);
      setReason_Title(`${item?.title}`);
    }
    dispatch(setData(clone));
  };

  return (
    <View style={{marginBottom: RF(50)}}>
      <ClickableField
        open={open5}
        bgclr={bgclr}
        openClr={bgclr}
        setOpen={setOpen5}
        title={'Availability'}>
        <View style={{marginVertical: 20}}>
          <CustomDropDown
            open={open}
            size={RF(12)}
            title={title}
            clicked={open}
            bdClr={'white'}
            setClicked={setOpen}
            clr={colors?.fadeGray}>
            <Generic_List_Item_Selection
              mt={10}
              data={status}
              bgClr={'white'}
              lineClr={'#BCBCBC'}
              onPressItem={(item: any, index: any) =>
                onClick(item, index, 'status')
              }
            />
          </CustomDropDown>
        </View>

        <CustomDropDown
          size={RF(12)}
          bdClr={'white'}
          open={openReason}
          clicked={openReason}
          title={reason_title}
          clr={colors?.fadeGray}
          setClicked={setOpenReason}>
          <Generic_List_Item_Selection
            mt={10}
            data={reason}
            bgClr={'white'}
            lineClr={'#BCBCBC'}
            onPressItem={(item: any, index: any) =>
              onClick(item, index, 'reason')
            }
          />
        </CustomDropDown>

        <View style={styles.view}>
          <AppButton
            title="Update"
            width={RF(92)}
            bgClr={'green'}
            height={RF(32)}
            onPress={onUpdate}
            textcolor={'white'}
          />
          {/* <AppButton
            title="Cancel"
            width={RF(70)}
            height={RF(20)}
            bgClr={'white'}
            textcolor={'black'}
          /> */}
        </View>
      </ClickableField>
    </View>
  );
};

// export const Notification = ({
//   onToggle,
//   toggleMsg,
//   toggleInbox,
//   toggleOrder,
//   toggleRating,
//   bgclr,
// }: {
//   onToggle: any;
//   toggleMsg?: any;
//   toggleOrder?: any;
//   toggleInbox?: any;
//   toggleRating?: any;
//   bgclr?: any;
// }) => {
//   const [open7, setOpen7] = useState<any>(false);

//   return (
//     <>
//       <ClickableField
//         open={open7}
//         openClr={bgclr}
//         title={'Notification'}
//         setOpen={setOpen7}
//         bgclr={bgclr}>
//         <FlatList
//           data={notificationList}
//           renderItem={({item, index}: any) => {
//             return (
//               <Toggle_Button
//                 isToggle={
//                   index == 0
//                     ? toggleInbox
//                     : index == 1
//                     ? toggleMsg
//                     : index == 2
//                     ? toggleOrder
//                     : toggleRating
//                 }
//                 title={item?.title}
//                 onPress={() => onToggle(item, index)}
//               />
//             );
//           }}
//         />
//       </ClickableField>
//     </>
//   );
// };

// export const Help = ({}: {}) => {
//   const [open6, setOpen6] = useState<any>(false);
//   return (
//     <>
//       <ClickableField
//         open={open6}
//         setOpen={setOpen6}
//         title={'Help with Meditour'}>
//         <TextInput
//           multiline
//           style={styles.input}
//           placeholderTextColor={'black'}
//           placeholder="Write some here for query"
//         />
//         <AppButton
//           title="Submit"
//           width={RF(100)}
//           height={RF(24)}
//           bgClr={'#00276D'}
//           textcolor={'white'}
//         />
//       </ClickableField>
//     </>
//   );
// };
{
  /* <AppButton
            title="Cancel"
            width={RF(70)}
            height={RF(20)}
            bgClr={'white'}
            textcolor={'black'}
          /> */
}
