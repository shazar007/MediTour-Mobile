import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {dropIcon} from '@assets';
import React, {useState} from 'react';
import Text from '../text';
import {LAYOUT, RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {navigate} from '@services';
interface Props {
  options?: any;
  backgroundColor?: any;
  selected?: any;
  style?: any;
  title?: any;
  tintColor?: any;
  marginTop?: any;
  TitleName?: any;
  height?: any;
  width?: any;
  styling?: any;
  handleDropDown: (item: any) => void;
}
const DropModal = (props: Partial<Props>) => {
  const {
    options,
    backgroundColor,
    selected,
    style,
    title,
    marginTop,
    height,
    tintColor,
    TitleName,
    width,
    styling,
    handleDropDown,
  } = props;
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const theme: any = useTheme();
  const colors = theme.colors;
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleModalContentPress = (event: any) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <View>
      <Modal
        transparent={true}
        visible={showModal}
        animationType="fade"
        onRequestClose={handleModalClose}>
        <TouchableWithoutFeedback onPress={handleModalContentPress}>
          <View
            style={{
              flex: 1,
              backgroundColor: backgroundColor
                ? backgroundColor
                : 'rgba(0, 0, 0, 0.7)',
            }}>
            <View
              style={[
                styles.Container2,
                {
                  marginTop: marginTop ? marginTop : RF(120),
                  width: width ? width : RF(225),
                },
                styling,
              ]}>
              <FlatList
                data={options}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: '100%',
                        height: height ? height : RF(30),
                        justifyContent: 'center',
                        borderRadius: 4,
                        backgroundColor:
                          selected === item.title ? changeColor : '#fff',
                      }}
                      onPress={() => {
                        if (item?.move) {
                          navigate(item.move);
                        } else if (handleDropDown) {
                          handleDropDown(item);
                        }
                        setShowModal(false);
                      }}>
                      <Text
                        SFmedium
                        size={14}
                        color={
                          selected === item.title ? '#fff' : colors.blueText
                        }
                        style={{marginHorizontal: 10}}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TouchableOpacity onPress={() => setShowModal(!showModal)} style={style}>
        {title && (
          <Text size={12} SFregular color={colors.blueText}>
            {TitleName}
          </Text>
        )}
        <Image
          source={dropIcon}
          tintColor={tintColor ? tintColor : colors.background}
          style={{
            width: RF(24),
            height: RF(24),
            marginTop: RF(8),
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DropModal;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    elevation: 4,
    width: RF(225),
    height: RF(35),
    borderRadius: LAYOUT.RADIUS.BOX,
    marginTop: RF(95),
    marginHorizontal: RF(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Container2: {
    elevation: 5,
    marginLeft: RF(24),
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  ImageStyles: {
    width: RF(16),
    height: RF(16),
    marginRight: RF(10),
    tintColor: '#13A89E',
  },
});
