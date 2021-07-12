import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {connect} from 'react-redux';

class History extends Component {
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
            <Text style={styles.titleScreen}>History</Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(History);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#BCBABA',
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
    marginRight: 97,
  },
  titleScreen: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
});
