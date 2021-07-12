import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class Coupon extends Component {
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
            <Text style={styles.titleScreen}>My Coupons</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>
          Coupons will be updated every weeks. Check them out!
        </Text>
        <View style={styles.wrapperCard}>
          <View style={styles.wrapperCardTop}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://ik.imagekit.io/10tn5i0v1n/article/3fb23deb8e5dae14f62df7b860572284.jpeg',
              }}
            />
            <Text style={styles.itemName}>Cold Brew</Text>
            <Text style={styles.itemDiscount}>20% OFF</Text>
            <Text style={styles.itemDetail}>
              Buy 1 Choco Oreo and get 20% off for Beef Spaghetti
            </Text>
          </View>
          <View style={styles.wrapperCardBottom}>
            <Text style={styles.textTitle}>COUPON CODE</Text>
            <Text style={styles.couponCode}>FNPR15RG</Text>
            <Text style={styles.expCode}>Valid untill October 10th 2020</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.buttonBrown}>
          <Text style={styles.fontButton}>Apply Coupon</Text>
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
    marginRight: 72,
  },
  titleScreen: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    marginTop: 45,
    textAlign: 'center',
    fontSize: 12,
    width: 260,
    fontFamily: 'Poppins-Regular',
  },
  wrapperCard: {
    marginTop: 45,
    width: 284,
    height: 472,
    backgroundColor: '#FFCB65',
    borderRadius: 20,
  },
  wrapperCardTop: {
    height: '70%',
    alignItems: 'center',
  },
  image: {
    width: 129,
    height: 129,
    borderRadius: 129 / 2,
    marginTop: 53,
  },
  itemName: {
    marginTop: 16,
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
  },
  itemDiscount: {
    marginTop: -10,
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
  },
  itemDetail: {
    width: 247,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  wrapperCardBottom: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#000',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  couponCode: {
    fontFamily: 'Poppins-Bold',
    fontSize: 33,
  },
  expCode: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  buttonBrown: {
    marginTop: 48,
    width: 284,
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
});
