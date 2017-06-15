/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} from 'react-native';
import Index  from './src/components/Index';
import IM from './src/components/IM';
import Detail from './src/components/PacketDetail'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


export default class JinqianguiWechat extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Index,
          title: '微信(121)',
        }}
        style={{flex: 1}}
        tintColor="white"
        titleTextColor="white"
        barTintColor="black"
        rightButtonSystemIcon="add"
      />
    );
  }
}


AppRegistry.registerComponent('JinqianguiWechat', () => JinqianguiWechat);
