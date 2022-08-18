import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Dimensions,
  Alert,
  Button,
  StyleSheet,
} from 'react-native';
import {connectSocket} from '../actions';
import {connect} from 'react-redux';
const {height, width} = Dimensions.get('window');
import Peer from 'react-native-peerjs';
import InCallManager from 'react-native-incall-manager';
import {
  RTCView,
  mediaDevices,
} from 'react-native-webrtc';
import Axios from "axios"
function CallPage({route, navigation}) {
  const [localStream,setLocalStream] = useState(null);
  const [localStreamURL,setLocalStreamURL] = useState("");
  const [remoteStream,setRemoteStream] = useState(null);
  const user = route.params.User
  const choices = user.MF + user.SL + user.countryCode + user.f + user.min + user.sof
  let peer = user.UserType?useRef( new Peer(newID) ):useRef( new Peer() );
  var constraints = { audio: true,video: { facingMode: "user" }};
  let call;
  
  async function fun2(){
    let id;
    await Axios.get(`http://192.168.1.20:5001/ta-azar/us-central1/user/pid`,{ params: { choices: choices } }).then(res=>{id = res.data.key}).catch(err=> console.log(err))
    mediaDevices.getUserMedia(constraints).then(stream =>{
    call = peer.current.call(id, stream);
    setLocalStream(stream)
    setLocalStreamURL(stream.toURL())
    }).catch(err =>{console.log(err)})
  }

  async function fun1(){
    const rand = Math.floor(Math.random() * 10000);
    const newID = `746536-163368-${rand.toString().padStart(6,'0')}-${choices}`;
    await Axios.post(`http://192.168.1.20:5001/ta-azar/us-central1/user/pid`,{id:newID}).catch(err => {console.log(err)})
    mediaDevices.getUserMedia(constraints).then(stream =>{
      setLocalStream(stream)
      setLocalStreamURL(stream.toURL())
      peer.current.on("call", mediaconnection =>{
         mediaconnection.answer(localStream)
         mediaconnection.on("stream",rs=>{
          InCallManager.start('audio/video')
          InCallManager.setSpeakerphoneOn(true);
            
           setRemoteStream(rs.toURL());
         })
      })
    }).catch(err =>{console.log(err)})
  }

  navigation.addListener('beforeRemove', (e) => {
    peer?.current.destroy();
    const tracks = localStream?.getTracks();
      tracks?.forEach(function(track) {
        track.stop();
      });
  })

  useEffect(()=>{
    if(user.userType)
    fun1();
    else 
    fun2();
  },[])

  call?.on('stream', rs => {
    InCallManager.start('audio/video')
    InCallManager.setSpeakerphoneOn(true);
    setRemoteStream(rs.toURL())
   })

  function toggleMuteCall(){
    localStream.getTracks().forEach((track) => track.muted = !track.muted);
  }

  function toggleCamera(){
      localStream.getVideoTracks().forEach((track) => track._switchCamera());
     }
  return (  
    <View style={styles.root}>
          <RTCView
            streamURL={localStreamURL}
            style={{height: 300, width: 300,flex:1}}
            zOrder={20} mirror={true}
          />
          <RTCView
            streamURL={remoteStream}
            style={{height: 150, width: 150,flex:1}}
            zOrder={1} mirror={true}
          />
          <View style={{flexDirection:'row'}}>
          {/* <View style={{flex:1, borderRadius:50}}><Button  title={"hang up"} color={"red"} onPress={()=>HangUp()}/></View> */}
          <View style={{flex:1, borderRadius:50}}><Button title={"mute"} color={"blue"} onPress={()=>{toggleMuteCall()}}/></View>
          <View style={{flex:1, borderRadius:50}}><Button title={"flip Camera"} color={"purple"} onPress={()=>toggleCamera()}/></View>
          <View style={{flex:1, borderRadius:50}}><Button title={"Next"} color={"blue"} onPress={()=>toggleCamera()}/></View>
          </View>
    </View>
  );

}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  inputField: {
    marginBottom: 10,
    flexDirection: 'column',
  },
  videoContainer: {
    flex: 1,
    minHeight: 450,
  },
  videos: {
    width: '100%',
    flex: 1,
    position: 'relative',
    overflow: 'hidden',

    borderRadius: 6,
  },
  localVideos: {
    backgroundColor: 'red',
    height: 100,
    marginBottom: 10,
  },
  remoteVideos: {
    height: 400,
  },
  localVideo: {
    backgroundColor: '#f2f2f2',
    height: '100%',
    width: '100%',
  },
  remoteVideo: {
    backgroundColor: '#f2f2f2',
    height: '100%',
    width: '100%',
  },
});
const mapStateToProps = ({auth}) => ({
  auth,
});
const mapDispatchToProps = () => ({
  connectSocket,
});
export default connect(mapStateToProps, mapDispatchToProps)(CallPage);
