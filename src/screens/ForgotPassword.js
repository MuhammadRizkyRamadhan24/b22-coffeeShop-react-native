import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import background from '../../assets/forgotPassword.jpg';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  render() {
    return (
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.wrapper}>
          <Text style={styles.text1}>Don’t</Text>
          <Text style={styles.text2}>Worry!</Text>
          <Text style={styles.text3}>
            We’ve just sent a link to your email to request a new password
          </Text>
          <Text style={styles.text4}>Haven’t received any link?</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Drawer')}
            style={styles.buttonYellow}>
            <Text style={styles.fontButton}>Resend Link</Text>
          </TouchableOpacity>
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
  text1: {
    width: 320,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 65,
    marginTop: 40,
  },
  text2: {
    width: 320,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 65,
    marginTop: -50,
  },
  text3: {
    textAlign: 'center',
    width: 320,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    fontSize: 15,
  },
  text4: {
    marginTop: 400,
    textAlign: 'center',
    width: 320,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    fontSize: 15,
  },
  buttonYellow: {
    marginVertical: 30,
    width: 340,
    height: 70,
    backgroundColor: '#FFBA33',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontButton: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
});
