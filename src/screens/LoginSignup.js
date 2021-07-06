import React, {Component} from 'react';
import {Text, View, ImageBackground, StyleSheet} from 'react-native';

import background from '../../assets/loginAndSignup.png';

export default class LoginSignup extends Component {
  render() {
    return (
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.wrapper} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
});
