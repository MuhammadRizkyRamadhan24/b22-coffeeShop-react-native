import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Card from '../component/cardXs';

export default class Cart extends Component {
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
            <Text style={styles.titleScreen}>My Cart</Text>
          </View>
        </View>
        <View style={styles.wrapperCard}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Card />
            <Card />
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTextCoupon}>Apply Delivery Coupons</Text>
        </TouchableOpacity>
        <View style={styles.wrapperContent}>
          <Text style={styles.contentTextLeft}>Item Total</Text>
          <View style={styles.contentRight}>
            <Text style={styles.contentTextRight}>IDR 40.000</Text>
          </View>
        </View>
        <View style={styles.wrapperContent}>
          <Text style={styles.contentTextLeft}>Delivery Charge</Text>
          <View style={styles.contentRight}>
            <Text style={styles.contentTextRight}>IDR 0.000</Text>
          </View>
        </View>
        <View style={styles.wrapperContent}>
          <Text style={styles.contentTextLeft}>Tax</Text>
          <View style={styles.contentRight}>
            <Text style={styles.contentTextRight}>IDR 10.000</Text>
          </View>
        </View>
        <View style={styles.wrapperTotal}>
          <Text style={styles.totalTextLeft}>Total</Text>
          <View style={styles.totalRight}>
            <Text style={styles.totalTextRight}>IDR 10.000</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Delivery')}
          style={styles.button}>
          <Text style={styles.buttonTextCheckout}>CHECKOUT</Text>
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
  wrapperCard: {
    height: 360,
    marginTop: 20,
    width: 320,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    width: 320,
    height: 70,
    backgroundColor: '#FFBA33',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextCoupon: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  buttonTextCheckout: {
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
  },
  wrapperContent: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contentTextLeft: {
    marginVertical: 5,
    width: '50%',
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: '#8a8a8a',
  },
  contentRight: {
    width: '50%',
    flexDirection: 'row-reverse',
  },
  contentTextRight: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
  },
  wrapperTotal: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  totalTextLeft: {
    marginVertical: 5,
    width: '50%',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  totalRight: {
    width: '50%',
    flexDirection: 'row-reverse',
  },
  totalTextRight: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
});
