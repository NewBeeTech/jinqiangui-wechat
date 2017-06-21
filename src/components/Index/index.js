import React from 'react';
import {AsyncStorage, Linking , View, Text, Image, StyleSheet, Dimensions, StatusBar, NavigatorIOS, TouchableWithoutFeedback } from 'react-native';
const {height, width} = Dimensions.get('window');
import IM from '../IM';

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
      totalCount:3,
      money_arr:[0.95,0.95,0.5],
      totalMoney:20,
      lastTime:"20:43"
    }
  }

  componentDidMount() {
    this._getLastTime()
    Linking.addEventListener('url', (e)=>this._handleOpenURL(e));
  }
  componentWillUnmount() {
    Linking.removeEventListener('url',(e)=>this._handleOpenURL(e));
  }

  componentWillReceiveProps(nextProps){
    this._getLastTime()
  }


  getQueryString(url,name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = url.split('?')[1].substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  }

  _handleOpenURL(event) {
    console.log('schemaUrl',event);

    let url = event.url
    let totalCount = this.getQueryString(url,'totalCount')
    let totalMoney = this.getQueryString(url,'totalMoney')
    console.log('totalMoney',totalMoney,totalCount)
    var money_arr = [];
    for(var i = 0;i < 4;i++) {
      let money = this.getQueryString(url,`money${i+1}`)
      money && money_arr.push(money)
    }
    this.setState({
      totalCount:totalCount,
      totalMoney:totalMoney,
      money_arr:money_arr
    })
  }

  async _getLastTime(){
     let time = await AsyncStorage.getItem('lastPacketTime')
      console.log('time',time)
    if(time){
      this.setState({
        lastTime:time
      })
    }

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="white"
          barStyle="light-content"
        />
      <TouchableWithoutFeedback onPress={() => this.props.navigator.push({
              title: '金钱龟测试群（12）',
              component: IM,
              backButtonTitle: '关闭',
              passProps:{
                 redPacketCount:this.state.totalCount,
                 totalMoney:this.state.totalMoney,
                  money_arr:this.state.money_arr,
                  navBarHidden:this.props.navBarHidden
              },
              rightButtonIcon: require('../../assets/people.png'),
            })}>
        <View>
          <Image style={ styles.indexPhoto } source={require('../../assets/IMG_5172.png')} />
          <Text style={{position:'absolute',color:'#999999',top:72,right:6,fontSize:12}}>{this.state.lastTime}</Text>
        </View>
      </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default Index;
