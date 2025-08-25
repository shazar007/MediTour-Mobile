import {dropIcon} from '@assets';
import {RF} from '@theme';
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Text from '../text';

interface Props {
  activeSections?: any;
  setActiveSections?: any;
  renderindex1?: any;
  renderindex2?: any;
  renderHead?: any;
  CCI?: any;
  data?: any;
  style?: any;
  content?: any;
  setOpen?: any;
  open?: any;
  renderindex3?: any;
  clr?: any;
  size?: any;
}

const CustomAccordion = (props: Props) => {
  const {
    data,
    activeSections,
    setActiveSections,
    renderindex1,
    renderindex2,
    renderHead,
    CCI,
    style,
    content,
    setOpen,
    open,
    renderindex3,
    clr,
    size,
  } = props;

  const renderHeader = (section: any) => {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.OpenStyles}>
          <Text
            SFsemiBold
            size={size ? size : 16}
            color={clr ? clr : '#00276D'}>
            {section?.title}
          </Text>
          <Image
            source={CCI ? CCI : dropIcon}
            tintColor={'#00276D'}
            style={{width: RF(16), height: RF(16)}}
          />
        </View>
      </View>
    );
  };

  const renderContent = (section: any, index: any) => {
    return (
      <View>
        {index == 0 ? (
          <>{renderindex1 && <View>{renderindex1()}</View>}</>
        ) : index == 1 ? (
          <>{renderindex2 && <View>{renderindex2()}</View>}</>
        ) : (
          <>{renderindex3 && <View>{renderindex3()}</View>}</>
        )}
      </View>
    );
  };

  const updateSections = (activeSections: string[], index: any) => {
    setOpen && setOpen(!open);
    setActiveSections(activeSections);
  };

  return (
    <Accordion
      sections={data}
      onChange={updateSections}
      underlayColor={'transparent'}
      activeSections={activeSections}
      renderContent={content ? content : renderContent}
      renderHeader={renderHead ? renderHead : renderHeader}
      sectionContainerStyle={style ? style : styles.section}
    />
  );
};

export default CustomAccordion;

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    borderBottomWidth: 0.5,
    paddingBottom: RF(10),
    borderColor: 'rgba(0, 39, 109, 0.5)',
  },
  OpenStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  MainContainer: {
    paddingHorizontal: RF(8),
    paddingVertical: RF(7),
    // backgroundColor: 'rgba(245, 245, 245, 1)',
    // borderRadius: RF(16),
  },
  section: {
    borderRadius: RF(16),
    backgroundColor: 'rgba(245, 245, 245, 1)',
    marginVertical: 10,
    overflow: 'hidden',
    paddingVertical: 10,
  },
});
