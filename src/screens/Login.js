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
import {showMessage} from 'react-native-flash-message';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {connect} from 'react-redux';
import {authLogin} from '../redux/actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  login = values => {
    this.props.authLogin(values.email, values.password).then(() => {
      if (this.props.auth.errMsg === '') {
        showMessage({
          message: 'Login success!',
          type: 'success',
          backgroundColor: '#6A4029',
          color: '#fff',
        });
        return this.props.navigation.navigate('Drawer');
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
    });
    return (
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.wrapper}>
          <View style={styles.wrapperText}>
            <Text style={styles.text1}>Login</Text>
          </View>
          <Formik
            validationSchema={validationSchema}
            initialValues={{email: '', password: ''}}
            onSubmit={values => this.login(values)}>
            {({handleChange, handleBlur, handleSubmit, errors, values}) => (
              <View style={styles.formInput}>
                <Input
                  width={'80%'}
                  type="email"
                  variant="underlined"
                  color="#fff"
                  style={styles.input}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email ? (
                  <Text style={styles.textError}>{errors.email}</Text>
                ) : null}
                <Input
                  width={'80%'}
                  type="password"
                  variant="underlined"
                  color="#fff"
                  style={styles.input}
                  placeholder="Enter your password"
                  keyboardType="ascii-capable"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {errors.password ? (
                  <Text style={styles.textError}>{errors.password}</Text>
                ) : null}
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ForgotPassword')
                  }>
                  <Text style={styles.forpas}>Forgot password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.buttonYellow}>
                  <Text style={styles.fontButton}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.fontDetail}>or login in with</Text>
                <TouchableOpacity style={styles.buttonWhite}>
                  <Text style={styles.fontButton2}>Login With Google</Text>
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

const mapDispatchToProps = {authLogin};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
    flex: 1,
    width: '100%',
  },
  text1: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 60,
    marginLeft: '10%',
    marginTop: '10%',
  },
  formInput: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    borderColor: '#fff',
    width: '80%',
  },
  forpas: {
    marginVertical: 20,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  buttonYellow: {
    width: '80%',
    height: '12%',
    backgroundColor: '#FFBA33',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontButton: {
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  buttonWhite: {
    width: '80%',
    height: '12%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontButton2: {
    fontSize: 15,
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
