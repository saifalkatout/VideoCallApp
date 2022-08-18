import { View, useWindowDimensions } from 'react-native';
import React, { useRef } from 'react';

import RoundedButton from './RoundedButtons';

const Header = ({ rightButtonPress, curindex }) => {
  const windowWidth = useWindowDimensions().width;
  const HEIGHT = windowWidth * 0.21;
  const FOOTER_PADDING = windowWidth * 0.1;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: "flex-end",
        height: HEIGHT,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingHorizontal: FOOTER_PADDING,
        width: windowWidth
      }}
    >
      {curindex !=2 && <RoundedButton label={"skip"} onPress={rightButtonPress} /> }
    </View>
  );
};

export default Header;