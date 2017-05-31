import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, Dimensions, StatusBar, TouchableWithoutFeedback, TouchableHighlight, AsyncStorage } from 'react-native';
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
  },
  modal: {
    width,
    height,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(85, 85, 85, 0.8)',
  },
  modalAlert: {
    width: width*0.7,
    height: width*0.7,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    top: -100,
  },
  modalHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(216, 239, 217, 0.8)',
    paddingBottom: 10,
  },
  modalBody: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  modalMoney: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(233, 233, 233, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(233, 233, 233, 0.8)',
    padding: 10,
  },
  modalInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(233, 233, 233, 0.8)',
    fontSize: 25,
    lineHeight: 40,
    textAlign: 'center',
  }
})

class SendPacket extends React.PureComponent {
  state={
    totalMoney: 0,
    packetNumber: 0,
    description: '',
    showModal: false,
  };
  changeTotalMoney(text) {
    this.setState({
      totalMoney: Number(text),
    });
  }
  changePacketNumber(text) {
    this.setState({
      packetNumber: Number(text),
    })
  }
  changeDescription(text) {
    this.setState({
      description: text,
    })
  }
  async passwordChange(text, index) {
    this.refs[`ref${index+1}`] && this.refs[`ref${index+1}`].focus();
    if (index === 6) {
      const packets = await AsyncStorage.getItem('packets');
      if (packets) {
        let packetsObject = JSON.parse(packets);
        packetsObject.push({
          totalMoney: this.state.totalMoney,
          packetNumber: this.state.packetNumber,
          description: this.state.description,
        });
        await AsyncStorage.setItem('packets', JSON.stringify(packetsObject));
        this.props.navigator.pop({
          passProps: {
            packets: packetsObject,
          }
        });
      } else {
        await AsyncStorage.setItem('packets', JSON.stringify([{
          totalMoney: this.state.totalMoney,
          packetNumber: this.state.packetNumber,
          description: this.state.description,
        }]));
        this.props.navigator.pop({
          passProps: {
            packets: [{
              totalMoney: this.state.totalMoney,
              packetNumber: this.state.packetNumber,
              description: this.state.description,
            }],
          }
        });
      }
    }
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
          <TextInput style={{ height: 50, width: 80, textAlign: 'right' }} placeholder="填写个数" onChangeText={(text) => this.changePacketNumber(text)} />
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
        onChangeText={(text) => this.changeDescription(text)}
      />
      <View style={ styles.totalMoney } >
        <Text style={{ fontSize: 25 }}>￥</Text><Text style={{ fontSize: 50 }}>{`${this.state.totalMoney}.00`}</Text>
      </View>
      <TouchableHighlight style={styles.sendBtn} onPress={() => this.setState({ showModal: true })}>
        <View>
          <Text style={{ color: 'white', fontSize: 18 }}>塞钱进红包</Text>
        </View>
      </TouchableHighlight>
      <Image style={styles.snow} source={require('../../assets/snow.png')} />
      <View
        style={{
          width,
          height,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          top: 0,
          backgroundColor: 'rgba(85, 85, 85, 0.8)',
          display: this.state.showModal ? '' : 'none',
        }}
      >
        <View style={styles.modalAlert}>
          <View style={styles.modalHeader}>
            <TouchableHighlight onPress={() => this.setState({ showModal: false })}>
            <Image source={require('../../assets/close.png')} style={{ width: 12, height: 12 }} />
            </TouchableHighlight>
            <Text style={{ textAlign: 'center', width: '90%', fontSize: 16 }}>请输入支付密码</Text>
          </View>
          <View style={styles.modalBody}>
            <Text>微信红包{this.state.showModal? 'true': 'false'}</Text>
            <Text style={{ fontSize: 40, margin: 10 }}>￥{`${this.state.totalMoney}.00`}</Text>
          </View>
          <View style={styles.modalMoney}>
            <Image source={require('../../assets/money.png')} style={{ height: 22, width: 22, marginRight: 10 }} />
            <Text style={{ fontSize: 16, color: '#AAAAAA', width: 200}}>零钱</Text>
            <Image source={require('../../assets/arrow-right.png')} style={{ height: 12, width: 12 }} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TextInput ref="ref1" autoFocus secureTextEntry style={styles.modalInput} onChangeText={(text) => this.passwordChange(text, 1)} />
            <TextInput ref="ref2" secureTextEntry style={styles.modalInput} onChangeText={(text) => this.passwordChange(text, 2)} />
            <TextInput ref="ref3" secureTextEntry style={styles.modalInput} onChangeText={(text) => this.passwordChange(text, 3)} />
            <TextInput ref="ref4" secureTextEntry style={styles.modalInput} onChangeText={(text) => this.passwordChange(text, 4)} />
            <TextInput ref="ref5" secureTextEntry style={styles.modalInput} onChangeText={(text) => this.passwordChange(text, 5)} />
            <TextInput ref="ref6" secureTextEntry style={styles.modalInput} onChangeText={(text) => this.passwordChange(text, 6)} />
          </View>
        </View>
      </View>
      </View>
    );
  }
}

export default SendPacket;
