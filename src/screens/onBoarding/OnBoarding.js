import React, { useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Animated } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import Footer from '../../components/Footer';
import Header from '../../components/header';
import Page from '../../components/Page';
import Paginator from '../../components/Paginator'
const Onboarding = ({navigation}) => {
  const slides = [
    {
      id: 1,
      title:'Interactive Learning',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
      image1: require('../../../images/870267c0-18a7-40ea-b83d-a91148a0ab80.png'),
      image2: require('../../../images/c57ebe4e-605e-480b-8718-0b017acbaa0e.png')
    },
    {
      id: 2,
      title:'Save Time',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
      image1: require('../../../images/934fcb8e-3076-4d48-ba2f-41ec26b76172.png'),
      image2: require('../../../images/fce39c52-e29c-4232-8a5b-acdc76a441b6.png')
    },
    {
      id: 3,
      title:'Whiteboard',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.      ',
      image1: require('../../../images/30722278-9fb7-45e9-9bda-b7111ea5237c.png'),
      image2: require('../../../images/b571f653-6dd5-49cc-9a88-aac72c43c45c.png')
    },
  ]
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current
  return (
      <View style={styles.container}>
        <View style={styles.container}>
        <Header curindex={currentIndex} rightButtonPress={() => {navigation.push('SigninPage');}}/>
          <FlatList 
          data={slides} 
          renderItem={({item})=>{ return <View>
          <Page backgroundColor="#ffffff" text={item.text} title={item.title} image1={item.image1} image2={item.image2}           curindex={currentIndex}
 /></View>}}
          horizontal
          pagingEnabled
          bounces={false}
          keyExtractor={(item)=>{return item.id}}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: {  x: scrollX  } } }],{
            useNativeDriver: false,
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          ref={slidesRef}
          viewabilityConfig={viewConfig}  />
          
        </View>
        <Paginator data={slides} scrollX={scrollX}></Paginator>
        <Footer
                curindex={currentIndex}  
                backgroundColor="#ffffff"
                rightButtonLabel="Next"
                rightButtonPress={() => {
                 if(currentIndex < slides.length -1 ){
                    slidesRef.current.scrollToIndex({index: currentIndex + 1});
                 }
                 else{
                  navigation.push('SigninPage');
                 }
               }}
                leftButtonLabel="Back"
                leftButtonPress={() => {
                  if(currentIndex > 0 ){
                    slidesRef.current.scrollToIndex({index: currentIndex - 1});
                 }
                }} />
      </View>

  );
};
export default Onboarding

const styles =  StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  }
})