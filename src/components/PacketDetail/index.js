/**
 * Created by hwh on 17/6/14.
 */
import React from 'react';
import { Linking , View, Text, Image, StyleSheet, Dimensions, StatusBar, NavigatorIOS, TouchableWithoutFeedback } from 'react-native';
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  indexPhoto: {
    width: width,
    height: height
  }
})


class Index extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      redPacketCount:3,
      total:'sw'
    }
  }

  _renderAnswerList(list){
    return list.map((item,index)=>{
      return(
          <View key={item}>
            <View style={{padding:15}}>
              <View style={{flexDirection:'row'}}>
                <Image style={{width:40,height:40,borderRadius:4}} source={require('../../assets/bigRedPacker.png')}/>
                <View style={{marginLeft:10}}>
                  <Text style={{marginTop:4}}>测试</Text>
                  <Text style={{marginTop:4,color:'#999999'}}>20:36</Text>
                </View>
                <Text style={{position:'absolute',right:0,top:4}}>0.28元</Text>
              </View>
            </View>
            {index !== list.length - 1 ? <View style={{marginLeft:15,height:0.5,backgroundColor:'#f2f2f2'}}/>:false}
          </View>

      )
    })
  }

  render() {
    return (
        <View style={{flex:1}}>
          <Image source={require('../../assets/PacketResult.png')} style={{width:width,height:200}}></Image>
          <View style={{backgroundColor:'rgb(241,241,241)',justifyContent:'center',alignItems:'center'}}>
            <View style={{flexDirection:'row',width:width,justifyContent:'center',alignItems:'center'}}>
              <Text>金钱龟的红包</Text>
              <Image style={{marginLeft:6,width:14,height:14}} source={require('../../assets/pin.png')}/>
            </View>
            <Text style={{marginTop:10}}>12:5</Text>
            <Text style={{marginTop:20,fontSize:40,fontWeight:'bold',color:'rgb(48,48,48)'}}>{this.state.total}<Text style={{fontSize:12}}>  元</Text></Text>
            <Text style={{marginTop:10,borderWeight:'bold',color:'rgb(30,89,165)'}}>已存入零钱，可直接消费</Text>
            <Image source={require('../../assets/packerResultBottom.png')} style={{width:width,height:40}}></Image>
          </View>

          <Text style={{marginLeft:15,color:'#666666'}}>已领取3/3个，共2元</Text>
          <View style={{width:width,height:0.5,backgroundColor:'#f2f2f2',marginTop:5}}/>
          {this._renderAnswerList([1,2])}
          <View style={{width:width,height:0.5,backgroundColor:'#f2f2f2'}}/>
        </View>
    );
  }
}

export default Index;
