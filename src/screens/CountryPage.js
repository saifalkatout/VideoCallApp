import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Button, Text, Avatar} from 'react-native-paper';
import CountryPicker from 'react-native-country-picker-modal';
const {height, width} = Dimensions.get('window');
function Country({props, route, navigation}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [country, setCountry] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const onSelect = (country: Country) => {
    setCountry(country.name);
    setCountryCode(country.cca2);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          height: height * 0.09,
          alignItems: 'center',
          justifyContent: 'center',
        }}></View>
      <View style={{flex: 1, padding: 10}}>
        <View
          style={{
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <CountryPicker
            {...{
              onSelect,
            }}
          />
          <Text>{country}</Text>
        </View>
        <View style={{}}>
          <Button
            onPress={() => {
              navigation.push('SchoolLevel', {
                User: {countryCode, userType: route.params.type},
                pageNumber: 0,
              });
            }}>
            NEXT
          </Button>
        </View>
      </View>
    </View>
  );
}
export default Country;
