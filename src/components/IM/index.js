import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, StatusBar, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import SendPacket from '../SendPacket';
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indexPhoto: {
    width: width,
    height: height,
  },
  text: {
    marginTop: 64,
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
  };
  changeInputStatus() {
    this.getPackets();
    this.setState({
      showInputDetail: !this.state.showInputDetail,
    });
  }
  async getPackets() {
    const value = await AsyncStorage.getItem('packets');
    console.warn(value);
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
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="light-content"
        />
      <Text style={styles.text}>IMsdsdjfklsdfjlsdkfdlskfjsldfjsdklfsdkfjlsdkfjlsdkfjlsdkfjlksdfjlsdfjksdlfjdlskfjlkkkjjsdfkjjjsdffkjsdlf</Text>
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
