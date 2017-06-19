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
  constructor(props){
    super(props)
    this.state = {
      tintColor:'white',
      titleTextColor:'white',
      barTintColor:'black',
      shadowHidden:false,
      translucent:true
    }
  }

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Index,
          title: '微信',
          passProps:{
            navBarHidden:(normal)=>{
              if(normal){
                this.setState({
                  tintColor:'white',
                  titleTextColor:'white',
                  barTintColor:'black',
                  shadowHidden:false,
                  translucent:true
                })
              }else{
                this.setState({
                  tintColor:'rgb(225,229,183)',
                  titleTextColor:'rgb(225,229,183)',
                  barTintColor:'rgb(214,90,69)',
                  shadowHidden:true,
                  translucent:false
                })
              }

            }
          }
        }}
        style={{flex: 1}}
        tintColor={this.state.tintColor}
        titleTextColor={this.state.titleTextColor}
        barTintColor={this.state.barTintColor}
        rightButtonSystemIcon="add"
        navigationBarHidden={this.state.navBarHidden}
        shadowHidden={this.state.shadowHidden}
        translucent={this.state.translucent}
      />
    );
  }
}


AppRegistry.registerComponent('JinqianguiWechat', () => JinqianguiWechat);
