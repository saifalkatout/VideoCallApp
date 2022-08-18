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

function UserList({navigation}) {
  const dispatch = useDispatch();
  //const auth = useSelector(state => state.auth);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <Button
            style={{
              backgroundColor: '#FFF',
              width: width * 0.4,
              borderColor: '#2D8CFF',
              borderWidth: 1,
              borderRadius: 5,
            }}
            mode="contained"
            onPress={() =>
              navigation.push('CountryPage', {
                type: 0,
              })
            }>
            <Text
              style={{
                color: '#2D8CFF',
                fontSize: 20,
              }}>
              Teacher
            </Text>
          </Button>

          <Button
            style={{
              width: width * 0.4,
              backgroundColor: 'green',
              borderWidth: 1,
              borderRadius: 5,
            }}
            onPress={() =>
              navigation.push('CountryPage', {
                type: 1,
              })
            }
            mode="contained">
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
              }}>
              Student
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = ({auth}) => ({
  auth,
});

export default connect(mapStateToProps, {})(UserList);
