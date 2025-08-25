import {Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useStyles from './styles';
import {
  AppButton,
  AppTextInput,
  HeaderCard,
  SaveModal,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {EditButton, ProfileIcon, UserIcon, lock, phone} from '@assets';
import {RF} from '@theme';

const EditProfile = () => {
  const [visible, setVisible] = useState(false);
  const styles = useStyles();
  useEffect(() => {
    if (visible === true) {
      setTimeout(() => {
        setVisible(false);
      }, 1000);
    }
  }, [visible]);
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <HeaderCard CrossEdit numberOfIcons={'2'}>
          <UserHeaderContent />
        </HeaderCard>
        <View style={styles.MainContainer}>
          <Image source={ProfileIcon} style={styles.ImageView} />
        </View>
        <View style={styles.ContainerEdit}>
          <Image source={EditButton} style={styles.ImageEdit} />
        </View>
        <View style={styles.MarginTop}>
          <AppTextInput placeholder={'Wajahat Khan'} startIcon={UserIcon} />
          <AppTextInput placeholder={'0300 1234567'} startIcon={phone} />

          <AppTextInput
            placeholder={'Old Password'}
            startIcon={lock}
            tintColorStart={'#00276D'}
          />
          <AppTextInput
            placeholder={'New Password'}
            startIcon={lock}
            tintColorStart={'#00276D'}
          />
          <AppTextInput
            placeholder={'Confirm Password'}
            startIcon={lock}
            tintColorStart={'#00276D'}
          />
          <AppButton
            title="Save"
            m_Top={RF(160)}
            onPress={() => setVisible(true)}
          />
        </View>
        {visible && (
          <SaveModal
            Visible={visible}
            title={'Your Profile has been Successfully Update.'}
          />
        )}
      </View>
    </Wrapper>
  );
};

export default EditProfile;
