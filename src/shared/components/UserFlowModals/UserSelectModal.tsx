import Text from '../text';
import React, {useState} from 'react';
import {RF} from '@theme';
import {margin, rs} from '@services';
import {useTheme} from '@react-navigation/native';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import Search from '../Search/inidex';

interface Props {
  onClose: () => void;
  renderTopSection?: any;
  setCity: any;
}

const cityData = [
  'Abbottabad',
  'Ahmedpur East',
  'Alipur',
  'Alipur Chattha',
  'Arifwala',
  'Attock',
  'Awaran',
  'Badin',
  'Bahawalnagar',
  'Bahawalpur',
  'Bannu',
  'Bhan Saeedabad',
  'Bhawana',
  'Burewala',
  'Chachro',
  'Chagai',
  'Chak Jhumra',
  'Chakwal',
  'Charsadda',
  'Chawinda',
  'Chichawatni',
  'Chilas',
  'Chiniot',
  'Chishtian',
  'Chitral',
  'Chor',
  'Dadu',
  'Daharki',
  'Dalbandin',
  'Darya Khan',
  'Daska',
  'Daultala',
  'Dera Ghazi Khan',
  'Dera Ismail Khan',
  'Digri',
  'Dinga',
  'Dunyapur',
  'Faisalabad',
  'Farooqabad',
  'Fateh Jang',
  'Fort Abbas',
  'Gambat',
  'Ghotki',
  'Gilgit',
  'Gojra',
  'Golarchi',
  'Gujar Khan',
  'Gujranwala',
  'Gujrat',
  'Gwadar',
  'Hafizabad',
  'Hangu',
  'Haripur',
  'Hasilpur',
  'Hassan Abdal',
  'Hub',
  'Hujra Shah Muqeem',
  'Hyderabad',
  'Islamabad',
  'Islamkot',
  'Jacobabad',
  'Jahanian',
  'Jalalpur Pirwala',
  'Jamshoro',
  'Jand',
  'Jaranwala',
  'Jatoi',
  'Jauharabad',
  'Jhang',
  'Jhelum',
  'Jiwani',
  'Kabirwala',
  'Kadhan',
  'Kalat',
  'Kalabagh',
  'Kalat',
  'Kamoke',
  'Kandhkot',
  'Kandiaro',
  'Karachi',
  'Kasur',
  'Kashmore',
  'Khairpur',
  'Khairpur Nathan Shah',
  'Khanewal',
  'Kharan',
  'Kharian',
  'Khushab',
  'Khuzdar',
  'Kohat',
  'Kohlu',
  'Kot Addu',
  'Kot Diji',
  'Kot Momin',
  'Kot Radha Kishan',
  'Kotli',
  'Kotli Sattian',
  'Kunri',
  'Lahore',
  'Lakki Marwat',
  'Lalian',
  'Larkana',
  'Layyah',
  'Liaquatpur',
  'Lodhran',
  'Mailsi',
  'Malakand',
  'Mansehra',
  'Mandi Bahauddin',
  'Mandi Faizabad',
  'Manga Mandi',
  'Mardan',
  'Mashkay',
  'Mastung',
  'Matli',
  'Matiari',
  'Mianwali',
  'Minchinabad',
  'Mingora',
  'Mirpur Bathoro',
  'Mirpur Khas',
  'Mirpur Mathelo',
  'Mirpur Sakro',
  'Mirwah',
  'Mithi',
  'Multan',
  'Muridke',
  'Murree',
  'Muzaffargarh',
  'Muzaffarabad',
  'Nagarparkar',
  'Nankana Sahib',
  'Narowal',
  'Nawabshah',
  'New Saeedabad',
  'Nowshera',
  'Nushki',
  'Okara',
  'Pabbi',
  'Pakpattan',
  'Pano Aqil',
  'Parachinar',
  'Pasni',
  'Pasrur',
  'Pattoki',
  'Peshawar',
  'Phalia',
  'Pind Dadan Khan',
  'Pir Jo Goth',
  'Pir Mahal',
  'Pishin',
  'Qila Abdullah',
  'Qila Didar Singh',
  'Quetta',
  'Rahim Yar Khan',
  'Rajanpur',
  'Rangpur',
  'Renala Khurd',
  'Risalpur',
  'Rawalpindi',
  'Rohri',
  'Rojhan',
  'Sadiqabad',
  'Sahiwal',
  'Sakrand',
  'Samaro',
  'Sambrial',
  'Sanghar',
  'Sangla Hill',
  'Sarai Alamgir',
  'Sargodha',
  'Sehwan',
  'Shahdadkot',
  'Shahdadpur',
  'Shahkot',
  'Shahpur Chakar',
  'Shakargarh',
  'Sheikhupura',
  'Shikarpur',
  'Shorkot',
  'Shujaabad',
  'Sibi',
  'Sialkot',
  'Sinjhoro',
  'Sohbatpur',
  'Sukkur',
  'Swabi',
  'Swat',
  'Taunsa',
  'Taxila',
  'Thal',
  'Thal',
  'Thari Mirwah',
  'Tharparkar',
  'Thatta',
  'Toba Tek Singh',
  'Turbat',
  'Umerkot',
  'Vehari',
  'Wah',
  'Wana',
  'Wazirabad',
  'Zahir Pir',
  'Zhob',
  'Ziarat',
];
const UserSelectModal = (props: Props) => {
  const {onClose, renderTopSection, setCity} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const [value, setValue] = useState('');
  const [filteredData, setFilteredData] = useState(cityData);
  const onPressCity = (item: any) => {
    setCity(item);
    onClose();
  };
  const handleSearch = (query: any) => {
    setValue(query);
    if (query) {
      const filtered = cityData.filter(city =>
        city.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(cityData);
    }
  };
  return (
    <View style={{flex: 1}}>
      {renderTopSection && <View>{renderTopSection()}</View>}
      <Search
        radius={24}
        placeHolder={'Search here...'}
        value={value}
        onChangeText={handleSearch}
      />

      <Text size={18} SFmedium color={colors.blueText} style={margin.top_8}>
        Search by city
      </Text>

      <FlatList
        nestedScrollEnabled={true}
        style={{
          width: '100%',
          backgroundColor: '#F5F5F5',
          paddingHorizontal: RF(8),
          elevation: 2,
          borderRadius: 12,
          marginTop: rs(8),
        }}
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}: any) => {
          return (
            <Pressable
              style={{borderBottomWidth: 0.5, padding: RF(8)}}
              onPress={() => onPressCity(item)}>
              <Text color={'#000'} SFsemiBold>
                {item}
              </Text>
            </Pressable>
          );
        }}
      />

      {/* </View> */}

      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          position: 'absolute',
          width: '100%',
          top: SCREEN_HEIGHT / 1.2,
          zIndex: 100,
          borderWidth: 2,
        }}>
        <AppButton
          onPress={onCancel}
          title="CANCEL"
          containerStyle={{
            width: '40%',
            height: RF(42),
          }}
          bgClr={'rgba(217, 217, 217, 1)'}
          textcolor={changeColor}
        />
        <AppButton
          title="APPLY"
          onPress={onClose}
          containerStyle={{width: '40%', height: RF(42)}}
          bgClr={changeColor}
          textcolor={'#fff'}
        />
      </View> */}
      {/* <View> */}
      {/* <CustomFloatingLabelInput
        editable={false}
        label={'Select city name'}
        value={value}
        maxLength={35}
        endIcon={LabDropDown}
        enablePress={handleDrop}
      /> */}

      {/* <MultiSlider
          selectedStyle={{
            backgroundColor: colors.primary,
          }}
          markerStyle={{
            backgroundColor: colors.primary,
          }}
          values={sliderValue}
          sliderLength={SCREEN_WIDTH - 50}
          step={1}
          allowOverlap
          min={2}
          max={128}
          snapped
          onValuesChange={sliderValuesChange}
        /> */}
      {/* <View style={globalStyles.row}>
          {distance.map((distanceValue, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.distanceView,
                selectedDistance === distanceValue && {
                  backgroundColor: colors.primary,
                },
              ]}
              onPress={() => {
                // 

                setSelectedDistance(distanceValue);
                setSliderToValue(distanceValue);
              }}>
              <Text
                size={16}
                SFregular
                color={
                  selectedDistance === distanceValue ? '#fff' : colors.primary
                }>
                {distanceValue}
              </Text>
            </TouchableOpacity>
          ))}
        </View> */}
      {/* {type == 'Hospital' ? null : (
        <>
          <Text
            size={18}
            SFmedium
            color={colors.blueText}
            style={margin.top_32}>
            Rating
          </Text>
          <Ratings
            size={15}
            rating={rating}
            setRating={setRating}
            colors={colors.primary}
          />
        </>
      )} */}

      {/* <RowButton
        title1={'CANCEL'}
        loading={loading}
        title2={'APPLY'}
        onClose={onClose}
        onCancel={onCancel}
      /> */}
    </View>
  );
};

export default UserSelectModal;

const styles = StyleSheet.create({
  icon: {
    height: RF(16),
    width: RF(16),
    resizeMode: 'contain',
  },
  slider: {
    width: '100%',
    marginTop: RF(8),
  },
  distanceView: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    shadowOpacity: 1,
    marginTop: RF(8),
    opacity: 20,
    paddingVertical: RF(4),
    paddingHorizontal: RF(8),
    alignSelf: 'flex-start',
    borderRadius: 5,
    overflow: 'hidden',
  },
  extra: {width: '85%', alignSelf: 'center', marginTop: RF(25)},
});

{
  /* <View style={[globalStyles.row, styles.extra]}>
          <ModalButton
            title={'CANCEL'}
            backgroundColor={'rgba(217, 217, 217, 1)'}
          />
          <TouchableOpacity onPress={() => onClose(value)}>
            <ModalButton title={''} />
          </TouchableOpacity>
        </View> */
}

{
  /* <Text size={18} SFmedium color={colors.blueText}>
          Select your City
        </Text>
        <Pressable
          style={[globalStyles.row, margin.top_8]}
          onPress={handleToggle}>
          <Text SFmedium color={colors.blueText}>
            {selectCity ? selectCity : 'Lahore'}
          </Text>
          <View>
            <Image source={dropIcon} style={styles.icon} />
          </View>
        </Pressable>
        <Line /> */
}
{
  /* {toggle == true ? (
          <CustomDropDown
            renderList={dropDownData}
            handlePress={handleToggle}
            toggle={toggle}
          />
        ) : null}
        <View style={margin.top_32}>
          <CheckBox
            selected={selected}
            colors={colors}
            onPress={selectCheckBox}
            title={'Available Today'}
          />
          <CheckBox
            selected={selected}
            colors={colors}
            onPress={selectCheckBox}
            title={'Discount'}
          />
        </View> */
}

{
  // <View style={margin.top_32}>
  //         <CheckBox
  //           colors={colors}
  //           selected={selected}
  //           onPress={selectCheckBox}
  //           title={'Available Today'}
  //         />
  //         <CheckBox
  //           colors={colors}
  //           title={'Discount'}
  //           selected={selected}
  //           onPress={selectCheckBox}
  //         />
  //       </View>
  /* <Text size={18} SFmedium color={colors.blueText}>
          Select your City
        </Text>
        <Pressable
          style={[globalStyles.row, margin.top_8]}
          onPress={handleToggle}>
          <Text SFmedium color={colors.blueText}>
            {selectCity ? selectCity : 'Lahore'}
          </Text>
          <View>
            <Image source={dropIcon} style={styles.icon} />
          </View>
        </Pressable>
        <Line />
        {toggle == true ? (
          <CustomDropDown
            renderList={dropDownData}
            handlePress={handleToggle}
            toggle={toggle}
          />
        ) : null} */
}
