import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Input} from 'native-base';

import background from '../../assets/login.png';

export default class Login extends Component {
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
          <Text style={styles.text1}>Login</Text>
          <View style={styles.formInput}>
            <Input
              value={this.state.email}
              onChange={e => this.setState({email: e.target.value})}
              type="email"
              variant="underlined"
              color="#fff"
              style={styles.input}
              placeholder="Enter your email"
            />
            <Input
              value={this.state.password}
              onChange={e => this.setState({password: e.target.value})}
              type="password"
              variant="underlined"
              color="#fff"
              style={styles.input}
              placeholder="Enter your password"
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              <Text style={styles.forpas}>Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Drawer')}
              style={styles.buttonYellow}>
              <Text style={styles.fontButton}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.fontDetail}>or login in with</Text>
            <TouchableOpacity style={styles.buttonWhite}>
              <Text style={styles.fontButton2}>Login With Google</Text>
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
  text1: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 65,
    marginTop: 40,
    marginLeft: -150,
  },
  formInput: {
    marginTop: 270,
    width: 340,
  },
  input: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    borderColor: '#fff',
  },
  forpas: {
    marginVertical: 20,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  buttonYellow: {
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
  buttonWhite: {
    width: 340,
    height: 70,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontButton2: {
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  fontDetail: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
});
