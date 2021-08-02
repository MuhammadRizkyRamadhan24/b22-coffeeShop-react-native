import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {Input} from 'native-base';
import {showMessage} from 'react-native-flash-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {connect} from 'react-redux';
import {authLogout} from '../redux/actions/auth';
import {changePassword} from '../redux/actions/user';

class EditPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
    };
  }

  setData = () => {
    const {token} = this.props.auth;
    const {oldPassword, newPassword} = this.state;
    this.props.changePassword(token, oldPassword, newPassword).then(() => {
      if (this.props.user.msg === 'Wrong Password') {
        showMessage({
          message: `${this.props.user.msg}!`,
          type: 'danger',
          backgroundColor: '#d63031',
          color: '#fff',
          duration: 4000,
        });
      } else {
        showMessage({
          message: 'Success edit password!',
          type: 'success',
          backgroundColor: '#6A4029',
          color: '#fff',
          duration: 4000,
        });
        this.props.authLogout();
      }
    });
  };

  changePassword = () => {
    Alert.alert('Update', 'Do you want to update it?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => this.setData()},
    ]);
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperNav}>
          <View style={styles.buttonBack}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialIcons name="arrow-back-ios" color="#000" size={30} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.titleScreen}>Edit Password</Text>
          </View>
        </View>
        <View style={styles.wrapperInput}>
          <Text style={styles.label}>Old Password :</Text>
          <Input
            value={this.state.oldPassword}
            onChangeText={val => this.setState({oldPassword: val})}
            type="password"
            variant="underlined"
            color="#000"
            borderColor="#000"
            fontFamily="Poppins-Regular"
            placeholder="Enter your old password"
          />
          <Text style={styles.label}>New Password :</Text>
          <Input
            value={this.state.newPassword}
            onChangeText={val => this.setState({newPassword: val})}
            type="password"
            variant="underlined"
            color="#000"
            borderColor="#000"
            fontFamily="Poppins-Regular"
            placeholder="Enter your new password"
          />
          <TouchableOpacity
            onPress={this.changePassword}
            style={styles.buttonBrown}>
            <Text style={styles.buttonTextBrown}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {
  authLogout,
  changePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ECECEC',
    alignItems: 'center',
  },
  wrapperNav: {
    alignItems: 'center',
    marginTop: 48,
    width: 320,
    height: 'auto',
    flexDirection: 'row',
  },
  buttonBack: {
    marginRight: 64,
  },
  titleScreen: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  wrapperInput: {
    marginTop: 25,
    width: 320,
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    marginTop: 21,
    color: '#000',
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
  },
  buttonBrown: {
    marginVertical: 30,
    paddingHorizontal: 24,
    width: 320,
    height: 70,
    backgroundColor: '#6A4029',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextBrown: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
  },
});
