import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {connect} from 'react-redux';
import {authLogout} from '../redux/actions/auth';

const Signout = props => {
  return (
    <TouchableOpacity
      onPress={() => props.authLogout()}
      style={styles.wrapperText}>
      <Text style={styles.text}>Sign-out</Text>
      <MaterialIcons name="arrow-right-alt" color="#6A4029" size={30} />
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  authLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signout);

const styles = StyleSheet.create({
  wrapperText: {
    marginTop: 35,
    marginLeft: -122,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    color: '#6A4029',
  },
});
