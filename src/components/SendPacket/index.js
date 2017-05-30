import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, Dimensions, StatusBar, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  sendPacketBar: {
    width: width,
    height: 60,
  },
  totalNumber: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
  },
  totalNumberLeft: {
    flexDirection: 'row',
    width: 100,
  },
  totalNumberRight: {
    flexDirection: 'row',
    width: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  description: {
    flexDirection: 'row',
    marginLeft: 40,
    marginTop: 10,
  },
  textArea: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    width: width*0.9,
    height: 60,
    backgroundColor: 'white',
    fontSize: 17,
    borderRadius: 5,
  },
  totalMoney: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 25,
  },
  snow: {
    width: width,
    height: 120,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  sendBtn: {
    width: 300,
    height: 40,
    marginLeft: 40,
    marginRight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E65432',
    borderRadius: 5,
  }
})

class SendPacket extends React.PureComponent {
  state={
    totalMoney: 0,
  };
  changeTotalMoney(text) {
    this.setState({
      totalMoney: Number(text),
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="black"
          barStyle="default"
        />
      <TouchableWithoutFeedback onPress={() => this.props.navigator.pop()}>
        <Image style={styles.sendPacketBar} source={require('../../assets/send-packet-bar.jpg')} />
      </TouchableWithoutFeedback>
      <View style={styles.totalNumber}>
        <View style={styles.totalNumberLeft}>
          <Image source={require('../../assets/ping.png')} style={{ width: 17, height: 17, marginRight: 5, }} />
          <Text style={{ fontSize: 18 }}>总金额</Text>
        </View>
        <View style={styles.totalNumberRight}>
          <TextInput style={{ height: 50, width: 50, textAlign: 'right' }} placeholder="0.00" onChangeText={(text) => this.changeTotalMoney(text)} />
          <Text style={{ fontSize: 18, marginLeft: 10 }}>元</Text>
        </View>
      </View>
      <View style={ styles.description }>
        <Text>当前为拼手气红包，</Text><Text style={{ color: '#50658F' }}>改为普通红包</Text>
      </View>
      <View style={styles.totalNumber}>
        <View style={styles.totalNumberLeft}>
          <Text style={{ fontSize: 18 }}>红包个数</Text>
        </View>
        <View style={styles.totalNumberRight}>
          <TextInput style={{ height: 50, width: 80, textAlign: 'right' }} placeholder="填写个数" />
          <Text style={{ fontSize: 18, marginLeft: 10 }}>个</Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={{ color: '#AAAAAA' }}>本群共3人</Text>
      </View>
      <TextInput
        style={styles.textArea}
        placeholder="恭喜发财，大吉大利"
        multiline
        placeholderTextColor="#AAAAAA"
      />
      <View style={ styles.totalMoney } >
        <Text style={{ fontSize: 25 }}>￥</Text><Text style={{ fontSize: 50 }}>{`${this.state.totalMoney}.00`}</Text>
      </View>
      <TouchableHighlight style={styles.sendBtn}>
        <View>
          <Text style={{ color: 'white', fontSize: 18 }}>塞钱进红包</Text>
        </View>
      </TouchableHighlight>
      <Image style={styles.snow} source={require('../../assets/snow.png')} />
      </View>
    );
  }
}

export default SendPacket;
