import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import background from '../../assets/loginAndSignup.png';

export default class LoginSignup extends Component {
  render() {
    return (
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.wrapper}>
          <View style={styles.wrapperText}>
            <Text style={[styles.fontSize1]}>Welcome!</Text>
            <Text style={[styles.fontSize2, styles.additionalTop]}>
              Get a cup of coffee for free every sunday morning
            </Text>
          </View>
          <View style={styles.wrapperButton}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Signup')}
              style={styles.buttonBrown}>
              <Text style={styles.fontSize3}>Create New Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
              style={styles.buttonYellow}>
              <Text style={styles.fontSize4}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  wrapperText: {
    alignItems: 'center',
    marginTop: 100,
    width: 343,
    height: 112,
  },
  fontSize1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 65,
    textAlign: 'center',
    color: '#fff',
  },
  fontSize2: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    fontSize: 17,
    top: -30,
    color: '#fff',
  },
  fontSize3: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: 17,
    color: '#fff',
  },
  fontSize4: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: 17,
    color: '#000',
  },
  wrapperButton: {
    width: 340,
    height: 180,
    marginTop: 423,
  },
  buttonYellow: {
    width: '100%',
    height: 70,
    backgroundColor: '#FFBA33',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonBrown: {
    width: '100%',
    height: 70,
    backgroundColor: '#6A4029',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
