import {addbutton, minusbutton, stateDropdown, stateDropup} from '@assets';
import {colors} from '@services';
import {RF} from '@theme';
import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

interface EditableInput {
  id?: number;
  label?: string;
  value?: string;
  editable?: boolean;
}

interface EditableInputItemProps {
  input?: EditableInput;
  onToggle?: (id: number) => void;
  onChangeText?: (text: string, id: number) => void;
}

const EditableInputItem: React.FC<EditableInputItemProps> = ({
  input,
  onToggle,
  onChangeText,
}) => {
  return (
    <View>
      <Text style={styles.label}>{input.label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, !input.editable && styles.nonEditable]}
          placeholder={`Input ${input.id}`}
          value={input.value}
          editable={input.editable}
          onChangeText={text => {
            // Handle text change
            onChangeText(text, input.id);
          }}
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onToggle(input.id)}></TouchableOpacity>
      </View>
    </View>
  );
};
interface Test3Props {
  showDropdown?: boolean;
  toggleDropdown?: () => void;
  dropdownText: string;
  dropDownText?: string;
  editableInputs?: EditableInput[];
  onToggleEditable?: (id: number) => void;
  backgroundColor?: string; // Background color prop
  activeBackgroundColor?: string; // Active background color prop
  inactiveBackgroundColor?: string; // Inactive background color prop
  onChangeText?: (text: string, id: number) => void;
  titleColor?: any;
}

const Inputdropdown: React.FC<Test3Props> = ({
  showDropdown,
  toggleDropdown,
  dropdownText,
  dropDownText,
  editableInputs,
  onToggleEditable,
  backgroundColor,
  activeBackgroundColor,
  inactiveBackgroundColor,
  titleColor,
  onChangeText,
}) => {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          {
            backgroundColor: showDropdown
              ? activeBackgroundColor
              : inactiveBackgroundColor,
          },
        ]}
        onPress={toggleDropdown}>
        <Text style={{color: titleColor, fontSize: 14, fontWeight: '500'}}>
          {showDropdown || dropdownText}
        </Text>
        <Image
          source={showDropdown ? stateDropup : stateDropdown}
          style={styles.iconRight}
        />
      </TouchableOpacity>
      {showDropdown && (
        <View
          style={[
            styles.dropdownContent,
            {backgroundColor: activeBackgroundColor},
          ]}>
          {editableInputs.map(input => (
            <EditableInputItem
              key={input.id}
              input={input}
              onToggle={onToggleEditable}
              onChangeText={onChangeText}
            />
          ))}
          <View style={styles.cardButtons}></View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  dropdownButton: {
    flexDirection: 'row',
    borderRadius: RF(8),
    padding: 14,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownContent: {
    width: '90%',
    borderBottomLeftRadius: RF(8),
    borderBottomRightRadius: RF(8),
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderRadius: 4,
    padding: 10,
    bottom: RF(6),
  },

  label: {
    marginBottom: 4,
    marginLeft: RF(6),
    fontWeight: '500',
    color: colors.primary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items to the end
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#BCBCBC',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    color: colors.primary,
  },
  nonEditable: {
    // backgroundColor: 'lightgray',
  },
  editButton: {
    marginBottom: RF(8),
  },
  icon: {
    width: RF(24),
    height: RF(24),
    tintColor: colors.primary,
  },
  iconRight: {
    width: RF(16),
    height: RF(16),
    marginLeft: 8,
    tintColor: colors.primary,
  },
  cardButtons: {
    flexDirection: 'row',
    marginTop: 8,
  },
  updateButton: {
    backgroundColor: 'orange',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: 'red',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});

export default Inputdropdown;
