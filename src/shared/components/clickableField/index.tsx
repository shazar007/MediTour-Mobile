import {RF} from '@theme';
import React from 'react';
import Text from '../text';
import {Plus, Miuns} from '@assets';
import {useSelector} from 'react-redux';
import {Image, Pressable, StyleSheet, View} from 'react-native';

const ClickableField = ({
  clr,
  open,
  title,
  height,
  setOpen,
  children,
  clrTxt,
  bgclr,
  openClr,
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
          backgroundColor: bgclr ? bgclr : 'white',
        },
      ]}
      onPress={onOpen}>
      <View style={styles.row}>
        <Text size={14} SFmedium color={clrTxt ? clrTxt : '#0D47A1'}>
          {title}
        </Text>
        <View style={styles.imgView}>
          <Image
            source={open ? Miuns : Plus}
            style={[
              styles.img,
              {
                tintColor: clr ? clr : '#0D47A1',
                //  open == false ?
              },
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
    backgroundColor: '#BCBCBC',
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

export default ClickableField;
