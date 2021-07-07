import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class ProductDetail extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.wrapperNav}>
            <View style={styles.buttonBack}>
              <TouchableOpacity>
                <MaterialIcons name="arrow-back-ios" color="#000" size={30} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonCart}>
              <TouchableOpacity>
                <MaterialIcons name="shopping-cart" color="#000" size={30} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.wrapperImage}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwY3VwfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
              }}
            />
            <View style={styles.wrapperVariant}>
              <TouchableOpacity style={styles.buttonVariant}>
                <Text style={styles.textVariant}>R</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonVariant}>
                <Text style={styles.textVariant}>L</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonVariant}>
                <Text style={styles.textVariant}>XL</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.textItem}>Cold Brew</Text>
            <Text style={styles.textPrice}>IDR 20.000</Text>
            <View style={styles.wrapperContent} />
          </View>
          <View style={styles.wrapperContent}>
            <Text style={styles.subtitle}>Delivery info</Text>
            <Text style={styles.description}>
              Delivered only on monday until friday from 1 pm to 7 pm
            </Text>
            <Text style={styles.subtitle}>Description</Text>
            <Text style={styles.description}>
              Cold brewing is a method of brewing that combines ground coffee
              and cool water and uses time instead of heat to extract the
              flavor. It is brewed in small batches and steeped for as long as
              48 hours.
            </Text>
          </View>
          <TouchableOpacity style={styles.buttonBrown}>
            <Text style={styles.fontButton}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginTop: 48,
    width: 320,
    height: 'auto',
    flexDirection: 'row',
  },
  buttonBack: {
    width: '50%',
  },
  buttonCart: {
    width: '50%',
    flexDirection: 'row-reverse',
  },
  wrapperImage: {
    marginTop: 17,
    alignItems: 'center',
  },
  image: {
    width: 241,
    height: 241,
    borderRadius: 9999,
  },
  wrapperVariant: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: 200,
  },
  buttonVariant: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 10,
    width: 40,
    height: 40,
    backgroundColor: '#FFBA33',
  },
  textVariant: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
  },
  textItem: {
    marginTop: 10,
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
  },
  textPrice: {
    color: '#6A4029',
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
  },
  wrapperContent: {
    marginTop: 11,
    width: 320,
  },
  subtitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
  },
  buttonBrown: {
    marginTop: 30,
    marginBottom: 30,
    width: 320,
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
