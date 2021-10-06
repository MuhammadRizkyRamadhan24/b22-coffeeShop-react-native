import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import background from '../../assets/welcomeImage.png';

export default class WelcomeScreen extends Component {
  componentDidMount() {
    RNBootSplash.hide({fade: true});
  }
  render() {
    return (
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.wrapper}>
          <View style={styles.wrapperText}>
            <Text style={[styles.text, styles.fontSize1]}>Coffee for</Text>
            <Text style={[styles.text, styles.fontSize1, styles.additionalTop]}>
              Everyone
            </Text>
          </View>
          <View style={styles.wrapperButton}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LoginSignup')}
              style={styles.button}>
              <Text style={[styles.text, styles.fontSize2]}>Get started</Text>
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
    justifyContent: 'center',
  },
  wrapperButton: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  fontSize1: {
    fontSize: 60,
    color: '#fff',
  },
  fontSize2: {
    fontSize: 15,
  },
  text: {
    fontFamily: 'Poppins-Bold',
  },
  additionalTop: {
    top: -50,
  },
  button: {
    width: '80%',
    height: '30%',
    backgroundColor: '#FFBA33',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
