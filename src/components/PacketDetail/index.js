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

function toDecimal2(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(x*100)/100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}


class Index extends React.PureComponent {
  constructor(props){
    super(props)

  }

  componentDidMount(){
    this.props.navBarHidden(false)
  }

  setRandomNumber(money){
    if(money < 0){
      return
    }
    var random_money = parseFloat(toDecimal2(Math.random() * 10))
    console.log('random_money',money,random_money)
    if(money > random_money){
      console.log('random_money>>>___',money,random_money)

      return random_money
    }else{
      random_money = this.setRandomNumber(money)
    }
    return random_money
  }

  _renderAnswerList(list,redPacketCount){
    let total = this.props.totalMoney;
    var arr = list.slice(0)

    if(redPacketCount > list.length){
      var arr_money = 0
      var left_count = redPacketCount - list.length
      for(var money of list){
        arr_money += parseFloat(money)
      }
      var left_money = total - arr_money
      let money = parseFloat(toDecimal2(left_money/left_count))
      console.log('money',money,left_money,arr_money)

      if(left_count === 1){
        arr.push(left_money)
      }else if(left_count > 1){
        var left_total = 0;
        var last_random = 0
        for(var i = 0;i < left_count;i++){
          if(i === left_count-1){
            arr.push(toDecimal2(left_money-left_total))
          }else{
            if(i % 2 == 0){
              last_random = this.setRandomNumber(money)
              console.log('last_random',last_random)
              var random_money = money - last_random
              left_total += random_money
              arr.push(toDecimal2(random_money))
            }else{
              var random_money = money + last_random
              left_total += random_money
              arr.push(toDecimal2(last_random + money))
            }
          }
        }
      }
    }

    let max = Math.max.apply({},arr.map(((item,index)=>{
      return toDecimal2(item)
    })))

    return arr.map((item,index)=>{
      return(
          <View key={index}>
            <View style={{padding:15}}>
              <View style={{flexDirection:'row'}}>
                <Image style={{width:40,height:40,borderRadius:4}} source={require('../../assets/avator.png')}/>
                <View style={{marginLeft:10}}>
                  <Text style={{marginTop:4}}>金钱龟{index+1}</Text>
                  {index == arr.length - 1 ?
                      <Text style={{marginTop:4,color:'rgb(30,89,165)'}}>留言</Text>
                      :
                      <Text style={{marginTop:4,color:'#999999'}}>{new Date(this.props.date).getHours()}:{new Date(this.props.date).getMinutes()}</Text>
                  }
                </View>
                <Text style={{position:'absolute',right:0,top:4}}>{item}元</Text>
              </View>
              {item == max && <Image source={require('../../assets/crown.png')} style={{width:10,height:10,position:'absolute',right:75,top:45}}/>}
              {item == max && <Text style={{position:'absolute',right:15,top:45,color:'rgb(254,189,83)',fontSize:13}}>手气最佳</Text>}

            </View>

            {index !== arr.length - 1 && <View style={{marginLeft:15,height:0.5,backgroundColor:'#f2f2f2'}}/>}
          </View>
      )
    })
  }

  render() {
    return (
        <ScrollView style={{flex:1,marginBottom:64}}>
          <Image source={require('../../assets/PacketResult.png')} style={{width:width,height:150}}></Image>
          <View style={{backgroundColor:'rgb(241,241,241)',justifyContent:'center',alignItems:'center'}}>
            <View style={{flexDirection:'row',width:width,justifyContent:'center',alignItems:'center'}}>
              <Text>金钱龟的红包</Text>
              <Image style={{marginLeft:6,width:14,height:14}} source={require('../../assets/pin.png')}/>
            </View>
            <Text style={{marginTop:10}}>{this.props.packetTitle}</Text>
            <Text style={{marginTop:20,fontSize:40,fontWeight:'bold',color:'rgb(48,48,48)'}}>{this.props.totalMoney+'.0'}<Text style={{fontSize:12}}>  元</Text></Text>
            <Image source={require('../../assets/packerResultBottom.png')} style={{width:width,height:40}}></Image>
          </View>

          <Text style={{marginLeft:15,color:'#666666'}}>{this.props.redPacketCount}个红包共{this.props.totalMoney}元，5秒被抢光</Text>
          <View style={{width:width,height:0.5,backgroundColor:'#f2f2f2',marginTop:8}}/>
          {this._renderAnswerList(this.props.money_arr,this.props.redPacketCount)}
          <View style={{width:width,height:0.5,backgroundColor:'#f2f2f2'}}/>

          <Text style={{alignSelf:'center',marginTop:20,marginBottom:20,color:'rgb(30,89,165)'}}>查看我的红包记录</Text>
        </ScrollView>
    );
  }
}

export default Index;
