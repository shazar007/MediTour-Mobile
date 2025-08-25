import {RF} from '@theme';
import React from 'react';
import Text from '../text';
import {Plus, Miuns, plus} from '@assets';
import {useSelector} from 'react-redux';
import {Image, Pressable, StyleSheet, View} from 'react-native';

const LoginOption = ({
  clr,
  open,
  title,
  height,
  setOpen,
  children,
  clrTxt,
  bgclr,
  openClr,
  medicine,
}: {
  clr?: any;
  open?: any;
  title?: any;
  height?: any;
  setOpen?: any;
  children?: any;
  clrTxt?: any;
  bgclr?: any;
  openClr?: any;
  medicine?: any;
}) => {
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const onOpen = () => {
    setOpen(!open);
  };

  return (
    <Pressable
      style={[
        styles.main,
        {
          height: open ? height : RF(40),
          backgroundColor: open ? openClr : bgclr ? bgclr : 'white',
        },
      ]}
      onPress={onOpen}>
      <View style={styles.row}>
        <Text size={14} SFmedium color={clrTxt ? clrTxt : '#00276D'}>
          {title}
        </Text>
        {medicine && (
          <View
            style={{flexDirection: 'row', alignItems: 'center', gap: RF(8)}}>
            <View
              style={{
                borderStyle: 'dotted',
                alignItems: 'center',
                borderWidth: 1,
                padding: RF(4),
                borderColor: '#00276D',
                flexDirection: 'row',
                borderRadius: RF(4),
              }}>
              <Image
                source={plus}
                style={{
                  tintColor: '#00276D',
                  width: RF(12),
                  height: RF(12),
                  resizeMode: 'contain',
                }}
              />
              <Text size={9} SFmedium color={'#00276D'}>
                Medicine
              </Text>
            </View>
            <View
              style={{
                borderStyle: 'dotted',
                alignItems: 'center',
                borderWidth: 1,
                padding: RF(4),
                borderColor: '#00276D',
                flexDirection: 'row',
                borderRadius: RF(4),
              }}>
              <Image
                source={plus}
                style={{
                  tintColor: '#00276D',
                  width: RF(12),
                  height: RF(12),
                  resizeMode: 'contain',
                }}
              />
              <Text size={9} SFmedium color={'#00276D'}>
                Test
              </Text>
            </View>
          </View>
        )}

        <View style={styles.imgView}>
          <Image
            source={open ? Miuns : Plus}
            style={[
              styles.img,
              {tintColor: open == false ? '#00276D' : clr ? clr : 'white'},
            ]}
          />
        </View>
      </View>

      {open && (
        <>
          <View style={styles.line} />
          <View style={{paddingHorizontal: RF(20)}}>{children}</View>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: RF(20),
    height: RF(40),
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  open: {
    marginTop: RF(20),
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: RF(20),
    paddingHorizontal: RF(20),
    justifyContent: 'space-between',
  },
  main: {
    marginTop: RF(20),
    marginHorizontal: RF(20),
    paddingBottom: RF(20),
    borderRadius: 10,
    elevation: 10,
  },
  imgView: {
    width: RF(20),
    height: RF(20),
    borderRadius: 7,
  },
  img: {width: RF(16.5), height: RF(16), resizeMode: 'contain'},
});

export default LoginOption;
