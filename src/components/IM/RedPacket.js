import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, StatusBar, TouchableWithoutFeedback, AsyncStorage } from 'react-native';

const styles = StyleSheet.create({
  redPacket: {
    width: 250,
    height: 80,
    position: 'relative',
  },
  avator: {
    width: 40,
    height: 40,
    marginLeft: 5,
  },
  cell: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
    alignSelf: 'flex-end',
  },
  cellTitle: {
    position: 'absolute',
    left: 60,
    top: 10,
    color: 'white',
    backgroundColor: '#FC9E2B',
    fontSize: 18,
  },
  cellSubTitle: {
    position: 'absolute',
    left: 60,
    top: 35,
    color: 'white',
    backgroundColor: '#FC9E2B',
    fontSize: 12,
  }
});

export default ({ title }) => {
  return(
    <View style={styles.cell}>
      <Image style={styles.redPacket} source={require('../../assets/redPacket.png')}>
        <Text style={styles.cellTitle}>{title}</Text>
        <Text style={styles.cellSubTitle}>领取红包</Text>
      </Image>
      <Image style={styles.avator} source={require('../../assets/avator.png')} />
    </View>
  );
}
