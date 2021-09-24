import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Input} from 'native-base';
import {showMessage} from 'react-native-flash-message';
import {Formik} from 'formik';
import * as Yup from 'yup';

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

  register = values => {
    const {email, password, phoneNumber} = values;
    this.props.authRegister(email, phoneNumber, password).then(() => {
      if (this.props.auth.errMsg === '') {
        showMessage({
          message: 'Signup success!',
          type: 'success',
          backgroundColor: '#6A4029',
          color: '#fff',
        });
        return this.props.navigation.navigate('Login');
      } else {
        showMessage({
          message: `${this.props.auth.errMsg}`,
          type: 'danger',
          backgroundColor: '#d63031',
          color: '#fff',
        });
      }
    });
  };

  render() {
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .min(10, 'Min 10 Character!')
        .required('Must be filled!'),
      password: Yup.string()
        .min(8, 'Min 8 Character!')
        .required('Must be filled!'),
      phoneNumber: Yup.string()
        .min(11, 'Min 11 Character!')
        .required('Must be filled!'),
    });
    return (
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.wrapper}>
          <Text style={styles.text1}>Signup</Text>
          <Formik
            validationSchema={validationSchema}
            initialValues={{email: '', password: '', phoneNumber: ''}}
            onSubmit={values => this.register(values)}>
            {({handleChange, handleBlur, handleSubmit, errors, values}) => (
              <View style={styles.formInput}>
                <Input
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  type="email"
                  variant="underlined"
                  color="#fff"
                  style={styles.input}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />
                {errors.email ? (
                  <Text style={styles.textError}>{errors.email}</Text>
                ) : null}
                <Input
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  type="password"
                  variant="underlined"
                  color="#fff"
                  style={styles.input}
                  placeholder="Enter your password"
                  keyboardType="ascii-capable"
                />
                {errors.password ? (
                  <Text style={styles.textError}>{errors.password}</Text>
                ) : null}
                <Input
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  type="text"
                  variant="underlined"
                  color="#fff"
                  style={styles.input}
                  placeholder="Enter your phone number"
                  keyboardType="number-pad"
                />
                {errors.phoneNumber ? (
                  <Text style={styles.textError}>{errors.phoneNumber}</Text>
                ) : null}
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.buttonBrown}>
                  <Text style={styles.fontButton}>Create Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonWhite}>
                  <Text style={styles.fontButton2}>Create With Google</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
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
  textError: {
    color: 'red',
    fontFamily: 'Poppins-SemiBold',
  },
});
