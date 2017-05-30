import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
} from 'react-native'

import { NativeRouter, Route, Link } from 'react-router-native'
import Index from './src/components/Index';
import IM from './src/components/IM';

const App = () => (
  <NativeRouter>
    <View style={styles.container}>
      <Route exact path="/" component={Index}/>
      <Route exact path="/IM" component={IM}/>
    </View>
  </NativeRouter>
);
export default App;

const styles = StyleSheet.create({
  container: {
    // marginTop: 25,
    padding: 10,
  },
  header: {
    fontSize: 20,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: 'center',
    fontSize: 15,
  }
})
