import React from 'react';
import {getColorCode, RF} from '@theme';
import {Portal} from 'react-native-portalize';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Modalize, ModalizeProps} from 'react-native-modalize';

interface Props extends ModalizeProps {
  ref?: any;
  nav?: any;
  children?: any;
  lineColor?: any;
  headerTitle?: any;
  onOpen?: () => void;
  onClose?: () => void;
  childStyle?: any;
  padding?: any;
  modalHeader?: boolean;
  height?: any;
}

const CustomModalize = React.forwardRef((props: Partial<Props>, ref) => {
  const {children, lineColor, onOpen, height, padding, childStyle} = props;
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const {colorCode} = getColorCode();
  const styles = useStyles(lineColor, changeColor, padding, colorCode);

  return (
    <Portal>
      <Modalize
        closeOnOverlayTap={false}
        // keyboardAvoidingOffset={1}
        ref={ref}
        {...props}
        onOpen={onOpen}
        modalHeight={height ? height : 220}
        // tapGestureEnabled={false}
        avoidKeyboardLikeIOS={true}
        handlePosition="inside"
        overlayStyle={styles.overLay}
        handleStyle={styles.modal_TopBar}>
        <View
          style={{
            ...childStyle,
            padding: padding ? padding : RF(16),
          }}>
          {children}
        </View>
      </Modalize>
    </Portal>
  );
});

export default CustomModalize;

const useStyles = (
  lineColor: any,
  changeColor: any,
  padding: any,
  colorCode: any,
) =>
  StyleSheet.create({
    overLay: {
      backgroundColor: 'rgba(0,0,0,0.8)',
    },
    chlid_View: {flex: 1},
    modal_TopBar: {
      backgroundColor: colorCode ? colorCode : changeColor,
      width: RF(134),
      position: 'absolute',
    },
  });
