import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Input} from 'native-base';

import background from '../../assets/signup.png';
import {connect} from 'react-redux';
import {authRegister} from '../redux/actions/auth';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      phoneNumber: '',
    };
  }

  register = () => {
    const {email, password, phoneNumber} = this.state;
    this.props.authRegister(email, phoneNumber, password).then(() => {
      if (this.props.auth.errMsg === '') {
        ToastAndroid.showWithGravity(
          'Signup success',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        return this.props.navigation.navigate('Login');
      } else {
        ToastAndroid.showWithGravity(
          `${this.props.auth.errMsg}`,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    });
  };

  render() {
    return (
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.wrapper}>
          <Text style={styles.text1}>Signup</Text>
          <View style={styles.formInput}>
            <Input
              value={this.state.email}
              onChangeText={val => this.setState({email: val})}
              type="email"
              variant="underlined"
              color="#fff"
              style={styles.input}
              placeholder="Enter your email"
            />
            <Input
              value={this.state.password}
              onChangeText={val => this.setState({password: val})}
              type="password"
              variant="underlined"
              color="#fff"
              style={styles.input}
              placeholder="Enter your password"
            />
            <Input
              value={this.state.phoneNumber}
              onChangeText={val => this.setState({phoneNumber: val})}
              type="text"
              variant="underlined"
              color="#fff"
              style={styles.input}
              placeholder="Enter your phone number"
            />
            <TouchableOpacity
              onPress={this.register}
              style={styles.buttonBrown}>
              <Text style={styles.fontButton}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonWhite}>
              <Text style={styles.fontButton2}>Create With Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {authRegister};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

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
    marginLeft: -95,
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
  buttonBrown: {
    marginTop: 30,
    marginBottom: 10,
    width: 340,
    height: 70,
    backgroundColor: '#6A4029',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontButton: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  buttonWhite: {
    marginVertical: 10,
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
