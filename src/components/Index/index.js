import React from 'react';
import { Linking , View, Text, Image, StyleSheet, Dimensions, StatusBar, NavigatorIOS, TouchableWithoutFeedback } from 'react-native';
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
      redPacketCount:3,
      money_arr:[0.95,0.95,0.5],
      totalMoney:20
    }
  }

  componentDidMount() {
    Linking.addEventListener('url', (e)=>this._handleOpenURL(e));
  }
  componentWillUnmount() {
    Linking.removeEventListener('url',(e)=>this._handleOpenURL(e));
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="white"
          barStyle="light-content"
        />
      <TouchableWithoutFeedback onPress={() => this.props.navigator.push({
              title: 'IM',
              component: IM,
              backButtonTitle: 'close',
              passProps:{
                 redPacketCount:this.state.totalCount,
                 totalMoney:this.state.totalMoney,
                  money_arr:this.state.money_arr
              },
              rightButtonIcon: require('../../assets/people.png'),
            })}>
        <Image style={ styles.indexPhoto } source={require('../../assets/index.png')} />
      </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default Index;
