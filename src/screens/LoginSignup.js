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
    flex: 3,
    width: '85%',
    justifyContent: 'center',
  },
  fontSize1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 60,
    textAlign: 'center',
    color: '#fff',
  },
  fontSize2: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    fontSize: 15,
    top: -30,
    color: '#fff',
  },
  fontSize3: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
  fontSize4: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: 15,
    color: '#000',
  },
  wrapperButton: {
    flex: 1,
    width: '80%',
  },
  buttonYellow: {
    width: '100%',
    height: '30%',
    backgroundColor: '#FFBA33',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonBrown: {
    width: '100%',
    height: '30%',
    backgroundColor: '#6A4029',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
