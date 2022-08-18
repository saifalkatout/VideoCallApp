import React, {useEffect} from 'react';
import {
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Button, Text, Avatar} from 'react-native-paper';
const {height, width} = Dimensions.get('window');

/* Redux */
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  studentJoin,
  teacherJoin,
  userJoin,
} from '../store/actions/videoActions';
const choices = [
  [
    {name: 'level1', key: '1'},
    {name: 'level1', key: '2'},
    {name: 'level1', key: '3'},
    {name: 'level1', key: '4'},
  ],
  [
    {name: 'Mfield1', key: '1'},
    {name: 'Mfield2', key: '2'},
    {name: 'Mfield3', key: '3'},
    {name: 'Mfield4', key: '4'},
  ],
  [
    {name: 'field1', key: '1'},
    {name: 'field2', key: '2'},
    {name: 'field3', key: '3'},
    {name: 'field4', key: '4'},
  ],
  [
    {name: 'mfield1', key: '1'},
    {name: 'mfield2', key: '2'},
    {name: 'mfield3', key: '3'},
    {name: 'mfield4', key: '4'},
  ],
  [
    {name: 'software', key: '1'},
    {name: 'software', key: '2'},
    {name: 'software', key: '3'},
    {name: 'software', key: '4'},
  ],
];

function MoreChoices({route, navigation}) {
  const CourseCard = ({item}) => {
    return (
      <TouchableOpacity
        key={item.key}
        onPress={() => {
          switch (route.params.pageNumber) {
            case 0:
              navigation.push('SchoolLevel', {
                User: {...route.params.User, SL: item.key},
                pageNumber: route.params.pageNumber + 1,
              });
              break;

            case 1:
              navigation.push('SchoolLevel', {
                User: {...route.params.User, MF: item.key},
                pageNumber: route.params.pageNumber + 1,
              });
              break;

            case 2:
              navigation.push('SchoolLevel', {
                User: {...route.params.User, f: item.key},
                pageNumber: route.params.pageNumber + 1,
              });
              break;

            case 3:
              navigation.push('SchoolLevel', {
                User: {...route.params.User, min: item.key},
                pageNumber: route.params.pageNumber + 1,
              });
              break;

            case 4:
              navigation.push('CallPage', {
                User: {...route.params.User, sof: item.key},
              });
              break;
          }
        }}>
        <View
          style={{
            alignItems: 'center',
            height: 100,
            width: '80%',
            marginBottom: 10,
            marginLeft: 40,
            backgroundColor: 'green',
          }}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 30,
              fontWeight: 'bold',
              fontSize: 30,
            }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <FlatList
            data={choices[route.params.pageNumber]}
            renderItem={CourseCard}
            keyExtractor={item => item.key}
          />
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = ({auth}) => ({
  auth,
});
export default connect(mapStateToProps, {})(MoreChoices);
