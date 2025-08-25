import {dropIcon} from '@assets';
import {RF} from '@theme';
import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Text from '../text';
const data = [
  {
    title: 'graphic designing',
    contents: ['graphic designing', 'graphic designing'],
  },
  {
    title: 'web designing',
    content: 'Content for section 2',
  },
];

const AccordionItem = ({title, content, index, selectedIndex, onToggle}) => {
  const isExpanded = index === selectedIndex;

  const toggleAccordion = () => {
    onToggle(index);
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: isExpanded ? '#fff' : '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: RF(8),
          paddingVertical: RF(16),
          marginTop: RF(8),
          elevation: 5,
        }}
        onPress={toggleAccordion}>
        <Text>{title}</Text>
        <Image source={dropIcon} style={{width: RF(16), height: RF(16)}} />
      </TouchableOpacity>

      {isExpanded && (
        <View>
          {Array.isArray(content) ? (
            content.map((item, contentIndex) => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: '#FFF',
                  // borderRadius: RF(8),
                  // paddingVertical: RF(16),
                  // elevation: 5,
                  marginTop: RF(8),
                }}>
                <Text key={contentIndex} color={'black'}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: '#FFF',
                // borderRadius: RF(8),
                // paddingVertical: RF(16),
                // elevation: 5,
                marginTop: RF(8),
              }}>
              <Text color={'black'}>{content}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const Accordion = () => {
  const [selectedContent, setSelectedContent] = useState(null);

  const handleToggle = index => {
    setSelectedContent(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <View>
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          title={item.title}
          content={item.content || item.contents}
          selectedIndex={selectedContent}
          onToggle={handleToggle}
        />
      ))}
    </View>
  );
};

export default Accordion;
