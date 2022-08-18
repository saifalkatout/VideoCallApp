import React from 'react';
import { View, Text, Image, Dimensions, Animated } from 'react-native';
const Page = ({ curindex,backgroundColor, title, text, image1,image2 }) => {
  const windowWidth = Dimensions.get('window').width;  return (
    <View
      style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
        width: windowWidth
      }}
    >
      <View>
          <Animated.View>
          <Image source={(image1)} marginBottom={-40} marginRight={curindex%2==0?50:0} zIndex={0}/>
          <Image source={(image2)} marginLeft={curindex%2==0?'auto':40} zIndex={1}/>
          </Animated.View>
      </View>
      <View style={{ marginTop: 16, marginBottom:16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>
          {title}
        </Text>
      </View>
      <View style={{ marginTop: 16, marginBottom:16,marginRight:30,marginLeft:30 }}>
        <Text style={{ fontSize: 20,  color: 'black', textAlign:'center' }}>
          {text}
        </Text>
      </View>
    </View>
  );
};

export default Page;