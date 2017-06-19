/**
 * Created by hwh on 17/6/14.
 */
import React from 'react';
import {ScrollView, Linking , View, Text, Image, StyleSheet, Dimensions, StatusBar, NavigatorIOS, TouchableWithoutFeedback } from 'react-native';
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

  }

  componentDidMount(){
    this.props.navBarHidden(false)
  }

  _renderAnswerList(list){
    console.log('list',list)
    return list.map((item,index)=>{
      return(
          <View key={index}>
            <View style={{padding:15}}>
              <View style={{flexDirection:'row'}}>
                <Image style={{width:40,height:40,borderRadius:4}} source={require('../../assets/bigRedPacker.png')}/>
                <View style={{marginLeft:10}}>
                  <Text style={{marginTop:4}}>测试</Text>
                  <Text style={{marginTop:4,color:'#999999'}}>20:36</Text>
                </View>
                <Text style={{position:'absolute',right:0,top:4}}>{item}</Text>
              </View>
            </View>
            {index !== list.length - 1 && <View style={{marginLeft:15,height:0.5,backgroundColor:'#f2f2f2'}}/>}
          </View>
      )
    })
  }

  render() {
    return (
        <ScrollView style={{flex:1}}>
          <Image source={require('../../assets/PacketResult.png')} style={{width:width,height:150}}></Image>
          <View style={{backgroundColor:'rgb(241,241,241)',justifyContent:'center',alignItems:'center'}}>
            <View style={{flexDirection:'row',width:width,justifyContent:'center',alignItems:'center'}}>
              <Text>金钱龟的红包</Text>
              <Image style={{marginLeft:6,width:14,height:14}} source={require('../../assets/pin.png')}/>
            </View>
            <Text style={{marginTop:10}}>{this.props.packetTitle}</Text>
            <Text style={{marginTop:20,fontSize:40,fontWeight:'bold',color:'rgb(48,48,48)'}}>{this.props.totalMoney+'.0'}<Text style={{fontSize:12}}>  元</Text></Text>
            <Text style={{marginTop:10,color:'rgb(30,89,165)'}}>已存入零钱，可直接消费</Text>
            <Image source={require('../../assets/packerResultBottom.png')} style={{width:width,height:40}}></Image>
          </View>

          <Text style={{marginLeft:15,color:'#666666'}}>已领取{this.props.redPacketCount}/{this.props.redPacketCount}个，共{this.props.totalMoney}元</Text>
          <View style={{width:width,height:0.5,backgroundColor:'#f2f2f2',marginTop:5}}/>
          {this._renderAnswerList(this.props.money_arr)}
          <View style={{width:width,height:0.5,backgroundColor:'#f2f2f2'}}/>
        </ScrollView>
    );
  }
}

export default Index;
