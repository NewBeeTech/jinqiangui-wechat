import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import SendPacket from '../SendPacket';
const {height, width} = Dimensions.get('window');
import RedPacket from './RedPacket';

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
    console.warn('cwr', JSON.stringify(nextProps));
    const value = await AsyncStorage.getItem('packets');
    this.setState({
      packets: JSON.parse(value) || [],
    });
  }
  changeInputStatus() {
    this.setState({
      showInputDetail: !this.state.showInputDetail,
    });
  }
  renderPackets() {
    const views = [];
    return this.state.packets && this.state.packets.map((item, key) => {
      return(
        <View style={{ flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{ marginTop: 10, textAlign: 'center', width: 50, color: 'white', backgroundColor: 'rgba(200, 200, 200, 1.00)', borderRadius: 10, }}>{new Date(item.date).getHours()}:{new Date(item.date).getMinutes()}</Text>
          <RedPacket title={item.description} />
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
    })
  }
  scrollContent(width, totalHeight) {
    if (totalHeight < height) {

    } else {
      this._scrollView.scrollTo({y:(totalHeight-height+100)});
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="light-content"
        />
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
