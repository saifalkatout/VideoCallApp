import { View, useWindowDimensions } from 'react-native';
import React, { useRef } from 'react';

import RoundedButton from './RoundedButtons';

const Footer = ({
    backgroundColor,
    leftButtonPress = false,
    rightButtonPress = false,
    curindex
  }) => {
  const windowWidth = useWindowDimensions().width;
  const HEIGHT = windowWidth * 0.21;
  const FOOTER_PADDING = windowWidth * 0.1;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: curindex != 0?'space-between':"flex-end",
        height: HEIGHT,
        backgroundColor,
        alignItems: 'center',
        paddingHorizontal: FOOTER_PADDING,
        width:windowWidth
      }}
    >
        {curindex != 0 && (
        <RoundedButton label={"Back"} onPress={leftButtonPress} />
        )}
        {curindex != 2 &&
        <View style={{backgroundColor:'#0693e3', borderRadius:50, paddingBottom:10, paddingTop: 10, paddingRight: 20, paddingLeft: 20}}><RoundedButton label={"Next"} onPress={rightButtonPress} /></View>
        }
        {curindex == 2 &&
        <View style={{backgroundColor:'#0693e3', borderRadius:50, paddingBottom:10, paddingTop: 10, paddingRight: 20, paddingLeft: 20}}><RoundedButton label={"Get Started"} onPress={rightButtonPress} /></View>
        }
    </View>
  );
};

export default Footer;