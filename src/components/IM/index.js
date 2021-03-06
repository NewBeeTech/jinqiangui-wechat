import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import SendPacket from '../SendPacket';
const {height, width} = Dimensions.get('window');
import RedPacket from './RedPacket';
import PacketDetail from '../PacketDetail'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(232, 232, 232, 1.00)',
  },
  indexPhoto: {
    width: width,
    height: height,
  },
  text: {
    flex: 1,
  },
  input: {
    height: 40,
    width: width,
  },
  inputDetail: {
    width: width,
    height: 250,
  }
})

class IM extends React.PureComponent {
  state={
    showInputDetail: false,
    packets: [],
    showLast:0,
    infoShow:false
  };
  async componentWillMount() {
    const value = await AsyncStorage.getItem('packets');

    this.setState({
      packets: JSON.parse(value) || [],
    });
    if (this._scrollView) {
      // this._scrollView.scrollTo(0);
      // console.warn(this._scrollView.contentOffset.y);
      // this._scrollView.scrollToEnd({animated: false});
    }
  }
  async componentWillReceiveProps(nextProps) {
    console.log('cwr___', JSON.stringify(nextProps));
    const value = await AsyncStorage.getItem('packets');
    let value_Obj = JSON.parse(value)
    console.log('value',value_Obj)

    this.setState({
      packets: value_Obj || [],
    });
  }


  componentWillUnmount() {
    // 请注意Un"m"ount的m是小写

    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
  }

  _delayRender(item){
    for(var i = 0;i < item;i++){
      setTimeout(
          ()=>{
            console.log('out',this.state.showLast)
              this.setState({
                showLast:this.state.showLast + 1
              })
          },1000 + 500 * i
      )
    }
  }

  _renderGetRedPacket(count,item){
    console.log('been_call')
    var items = [];
    for (var i = 0;i < count;i++){
      items.push((
          <View key={i} style={{marginTop:10,flexDirection:'row',backgroundColor:'rgba(165,165,165,0.5)',paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5}}>
            <Image source={require('../../assets/smallRed.png')} style={{width:8,height:12}}/>
            <Text onPress={(i)=>{

            }} style={{fontSize:12,color:'white'}}>金钱龟{item.random_arr[i] || i+1}已经领取了<Text onPress={()=>{
              this.props.navigator.push({
                title:'微信红包',
                component:PacketDetail,
                leftButtonTitle: '< 返回',
                rightButtonTitle: '',
                onLeftButtonPress:()=>{this.props.navigator.pop();this.props.navBarHidden(true);},
                // onBackButtonPress:()=>{console.warn('back');this.props.navBarHidden(true)},
                passProps:{
                  redPacketCount:item.redPacketCount,
                  totalMoney:item.totalMoney,
                  money_arr:item.money_arr,
                  packetTitle:item.description,
                  navBarHidden:this.props.navBarHidden,
                  date:item.date,
                  random_arr:item.random_arr
                }
              })
            }} style={{fontSize:12,color:'rgb(247,157,69)'}}>红包</Text>{item.redPacketCount == i+1 && "，您的红包已经被领完"}</Text>
          </View>))
    }
    if(count === item.redPacketCount){
      this.setState({
        showTopAlert:true
      })
    }
    return items
  }
  changeInputStatus() {
    this.setState({
      showInputDetail: !this.state.showInputDetail
    });
  }
  _renderTime(item,key){
    var min = new Date(item.date).getMinutes()
    if(min < 10){
      min = "0" + min
    }
    let time = new Date(item.date).getHours() + ":" + min
    if(key == this.state.packets.length - 1){
      AsyncStorage.setItem('lastPacketTime',time).then(success=>{

      })
    }
    return time
  }
  renderPackets() {
    return this.state.packets && this.state.packets.map((item, key) => {
      return (
        <View key={key} style={{ flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{ marginTop: 10, textAlign: 'center', width: 50, color: 'white', backgroundColor: 'rgba(200, 200, 200, 1.00)', borderRadius: 10, }}>{this._renderTime(item,key)}</Text>
          <RedPacket title={item.description} />
          {key == this.state.packets.length - 1 && this.state.infoShow ? this._renderGetRedPacket(this.state.showLast,item) : this._renderGetRedPacket(item.redPacketCount,item)}
        </View>
      );
    });
  }
  goToSendPacket() {
    this.props.navigator.push({
      title: 'Send Packet',
      component: SendPacket,
      backButtonTitle: 'close',
      backButtonIcon: '',
      leftButtonIcon: '',
      barTintColor: "#F2F2F2",
      tintColor:"black",
      titleTextColor: "black",
      rightButtonIcon: require('../../assets/test.png'),
      shadowHidden: true,
      navigationBarHidden: true,
      passProps:{
        redPacketCount:this.props.redPacketCount,
        totalMoney:this.props.totalMoney,
        money_arr:this.props.money_arr,
        callBack:(count)=>{
          this._delayRender(count);
          this.setState({
            infoShow:true
          },()=>{
            setTimeout(()=>{
              this.setState({
                infoShow:false
              })
            },1000 * 10)
          })
        }
      }
    })
  }
  scrollContent(width, totalHeight) {
    if (totalHeight < height) {

    } else {
      this._scrollView.scrollTo({y:(totalHeight-height+100),animated:false});
    }
  }

  getMoney(arr){
    var moneyStr = "";
    arr.forEach((item,index)=>{
      if(index == 0 ){
        moneyStr += item
      }else{
        moneyStr += " "+item
      }
    })
    return moneyStr
  }
  anaList(arr){
    return arr.map((item,index)=>{
      return(
          <Text style={{fontSize:13,color:'white',marginTop:4}}>第{index+1}包金额：{item}</Text>
      )
    })
  }
  render() {
    const {money_arr} = this.props
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="light-content"
        />
        {this.state.infoShow && <View style={{position:'absolute',zIndex:99,backgroundColor:'rgba(55,55,55,0.5)',width:width,top:64,alignItems:'center'}}>
          <Text style={{fontSize:25,color:'yellow',marginTop:8}}>正版金钱龟</Text>
          <Text style={{fontSize:13,color:'white',marginTop:8}}>您成功设置了{money_arr.length}个领取金额：{this.getMoney(money_arr)}</Text>
          <Text style={{fontSize:13,color:'white',marginTop:4}}>数据采集分析如下：</Text>
          {this.anaList(money_arr)}
          <Text style={{fontSize:13,color:'white',marginTop:4}}>请核对领取的红包金额是否准确</Text>

        </View>}
      <ScrollView
        style={styles.text}
        ref={(scrollView) => { this._scrollView = scrollView; }}
        onContentSizeChange={(width,totalHeight) => this.scrollContent(width, totalHeight)}
      >
        {this.renderPackets()}
        {/* <RedPacket title="测试" /> */}
      </ScrollView>
      { this.state.showInputDetail ||
        <TouchableWithoutFeedback onPress={() => this.changeInputStatus()}>
          <Image
            style={styles.input}
            source={require('../../assets/input.png')}
          />
        </TouchableWithoutFeedback>
      }
      { this.state.showInputDetail &&
        <TouchableWithoutFeedback onPress={() => {this.changeInputStatus(); this.goToSendPacket();}}>
          <Image
            style={styles.inputDetail}
            source={require('../../assets/input-detail.png')}
          />
        </TouchableWithoutFeedback>
      }
      </View>
    );
  }
}

export default IM;
