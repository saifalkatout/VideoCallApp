import {StyleSheet, View, SafeAreaView, TextInput, Text, Button } from "react-native";
import  React,{useState} from 'react';

function SignUp({route, navigation}) {

  const [Username, setUsername] = useState(null);
  const [Password, setPassword] = useState(null);
  const [enabled, setEnabled] = useState(true);
  const SignUpFromServer = () => {
    setEnabled(false)
    return fetch(`http://localhost:5001/ta-azar/us-central1/addUser?name=${Username}&pass=${Password}`,  {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((res)=>{console.log(res);setEnabled(true)})
      .catch(err=>{console.log(err);setEnabled(true)})
  }
  return (
        <SafeAreaView>
            <View style={styles.container}>
            <Text style={styles.label}>
                Username
            </Text>
            <TextInput
                editable={enabled}
                style={styles.input}
                onChangeText={setUsername}
                value={Username}
            />
            </View>
            <View>
            <Text style={styles.label}>
                Password
            </Text>
            <TextInput
                editable={enabled}
                style={styles.input}
                onChangeText={setPassword}
                value={Password}
            />
            </View>
            <Button
            title="GO"
            onPress={() => SignUpFromServer()} />
           </SafeAreaView>
  );
};
export default SignUp;
const styles = StyleSheet.create({
    container:{
        marginTop:20
    },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',	  
  },
  label:{
      color:'black'
    }
});
