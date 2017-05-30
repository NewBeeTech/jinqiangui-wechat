import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, Dimensions, StatusBar, TouchableWithoutFeedback } from 'react-native';
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
})

class SendPacket extends React.PureComponent {
  state={
    showInputDetail: false,
  };
  changeInputStatus() {
    this.setState({
      showInputDetail: !this.state.showInputDetail,
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
      <View>
        <Text>总金额</Text>
        <TextInput />
      </View>
      </View>
    );
  }
}

export default SendPacket;
