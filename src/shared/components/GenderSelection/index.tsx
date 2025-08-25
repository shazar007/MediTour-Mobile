import { Pressable, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import RNDropDown from '../RnDropDown'
import { customOptions } from '@services'
import Text from '../text'
import { gender } from '@assets'
import { useTheme } from '@react-navigation/native'
import { RF } from '@theme'
const GenderSelection = ({ formik }: { formik: any }) => {
    const theme: any = useTheme()
    const colors = theme.colors;
    const [selectDrop, setSelectDrop] = useState('');
    const [open, setOpen] = useState<any>(false);
    const onOpen = () => {
        if (!open) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    };
    const handleDropDown = (title: any) => {
        formik.setFieldValue('gender', title);
        setSelectDrop(title);
        setOpen(!open);
    };
    return (
        <View>
            <RNDropDown
                title={selectDrop ? selectDrop : 'Gender'}
                onOpen={onOpen}
                open={open}
                box={'box'}
                iconSource_1={gender}
                // containerStyle={[
                //   margin.top_32,
                //   padding.right_8,
                //   { borderColor: colors.primary },
                // ]}
                dropDownData={customOptions}
                titleStyle={{ color: colors.primary }}
                renderDropDownData={(item: any) => (
                    <Pressable
                        onPress={() => handleDropDown(item?.title)}
                    >
                        <Text
                            style={{ marginTop: RF(16) }}
                            color={colors.primary}
                            SFregular>
                            {item?.title}
                        </Text>
                    </Pressable>
                )}
            />
        </View>
    )
}

export default GenderSelection

const styles = StyleSheet.create({})