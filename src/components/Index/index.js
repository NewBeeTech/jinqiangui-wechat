import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, StatusBar, NavigatorIOS, TouchableWithoutFeedback } from 'react-native';
const {height, width} = Dimensions.get('window');
import IM from '../IM';

const styles = StyleSheet.create({
  indexPhoto: {
    width: width,
    height: height
  }
})

class Index extends React.PureComponent {
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
              rightButtonIcon: require('../../assets/people.png'),
            })}>
        <Image style={ styles.indexPhoto } source={require('../../assets/index.png')} />
      </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default Index;
