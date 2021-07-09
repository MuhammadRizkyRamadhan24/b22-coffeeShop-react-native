import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperNav}>
          <View style={styles.buttonBack}>
            <TouchableOpacity>
              <MaterialIcons name="arrow-back-ios" color="#000" size={30} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.titleScreen}>My Profile</Text>
          </View>
        </View>
        <View style={styles.wrapperSubtitle}>
          <Text style={styles.subtitle}>Your Information</Text>
          <View style={styles.wrapperSubtitleRight}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('EditProfile')}>
              <Text style={styles.subtitleRight}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.wrapperContent}>
          <View>
            <Image
              style={styles.image}
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
              }}
            />
          </View>
          <View style={styles.contentRight}>
            <Text style={styles.contentTextBold}>User</Text>
            <Text style={styles.contentText}>email@email.com</Text>
            <Text style={styles.contentText}>0123456789</Text>
            <Text style={styles.contentText}>address</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.buttonWhite}>
          <Text style={styles.buttonTextWhite}>Order History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWhite}>
          <Text style={styles.buttonTextWhite}>Edit Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWhite}>
          <Text style={styles.buttonTextWhite}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWhite}>
          <Text style={styles.buttonTextWhite}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBrown}>
          <Text style={styles.buttonTextBrown}>Save Change</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
    marginRight: 92,
  },
  titleScreen: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  wrapperTitle: {
    marginTop: 36,
    width: 320,
    height: 'auto',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 34,
  },
  wrapperSubtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    width: 320,
    height: 'auto',
  },
  subtitle: {
    width: '50%',
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
  },
  wrapperSubtitleRight: {
    width: '50%',
    flexDirection: 'row-reverse',
  },
  subtitleRight: {
    color: '#6A4029',
    fontFamily: 'Poppins-SemiBold',
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  wrapperContent: {
    marginTop: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: 320,
    padding: 20,
    borderRadius: 20,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  contentRight: {
    marginLeft: 15,
  },
  contentTextBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  contentText: {
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#6A4029',
  },
  buttonWhite: {
    marginTop: 24,
    paddingHorizontal: 24,
    width: 320,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
  },
  buttonTextWhite: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
  },
  buttonBrown: {
    marginTop: 30,
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
