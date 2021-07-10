import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {Radio} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class Delivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
    };
  }
  render() {
    console.log(this.props.route.params.orders);
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperNav}>
          <View style={styles.buttonBack}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialIcons name="arrow-back-ios" color="#000" size={30} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.titleScreen}>Payment</Text>
          </View>
        </View>
        <View style={styles.wrapperSubtitle}>
          <Text style={styles.subtitle}>Products</Text>
        </View>
        <View style={styles.wrapperCard}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={{
                  uri: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwY3VwfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
                }}
              />
              <View style={styles.wrapperMiddleCard}>
                <Text style={styles.middleText}>Cold Brew</Text>
                <Text style={styles.middleText}>1</Text>
                <Text style={styles.middleText}>R</Text>
              </View>
              <View style={styles.wrapperRightCard}>
                <Text style={styles.rightText}>IDR 20.000</Text>
              </View>
            </View>
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={{
                  uri: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwY3VwfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
                }}
              />
              <View style={styles.wrapperMiddleCard}>
                <Text style={styles.middleText}>Cold Brew</Text>
                <Text style={styles.middleText}>1</Text>
                <Text style={styles.middleText}>R</Text>
              </View>
              <View style={styles.wrapperRightCard}>
                <Text style={styles.rightText}>IDR 20.000</Text>
              </View>
            </View>
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={{
                  uri: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwY3VwfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
                }}
              />
              <View style={styles.wrapperMiddleCard}>
                <Text style={styles.middleText}>Cold Brew</Text>
                <Text style={styles.middleText}>1</Text>
                <Text style={styles.middleText}>R</Text>
              </View>
              <View style={styles.wrapperRightCard}>
                <Text style={styles.rightText}>IDR 20.000</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.wrapperSubtitle}>
          <Text style={styles.subtitle}>Payment method</Text>
        </View>
        <View style={styles.wrapperRadio}>
          <Radio.Group
            name="radio-button"
            value={this.state.value}
            onChange={nextValue => {
              this.setState({value: nextValue});
            }}>
            <Radio accessibilityLabel="test" colorScheme="gray" value="Card">
              <MaterialIcons
                style={styles.logoRadio}
                name="credit-card"
                color="#F47B0A"
                size={30}
              />
              <Text style={styles.radio}>Card</Text>
            </Radio>
            <Radio accessibilityLabel="test" colorScheme="gray" value="Bank">
              <MaterialIcons
                style={styles.logoRadio}
                name="account-balance"
                color="#895537"
                size={30}
              />
              <Text style={styles.radio}>Bank account</Text>
            </Radio>
            <Radio accessibilityLabel="test" colorScheme="gray" value="COD">
              <MaterialIcons
                style={styles.logoRadio}
                name="delivery-dining"
                color="#FFBA33"
                size={30}
              />
              <Text style={styles.radio}>Cash on delivery</Text>
            </Radio>
          </Radio.Group>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Proceed payment</Text>
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
  wrapperSubtitle: {
    marginTop: 40,
    width: 320,
    height: 'auto',
  },
  subtitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
  },
  wrapperCard: {
    marginTop: 20,
    height: 228,
    backgroundColor: '#fff',
    width: 320,
    padding: 20,
    borderRadius: 20,
  },
  card: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  image: {
    width: 64,
    height: 74,
    borderRadius: 20,
  },
  wrapperMiddleCard: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  middleText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  wrapperRightCard: {
    marginLeft: 30,
    justifyContent: 'center',
  },
  rightText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
  },
  wrapperRadio: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    width: 320,
    padding: 20,
    borderRadius: 20,
  },
  radio: {
    marginLeft: 10,
    marginVertical: 15,
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
  },
  logoRadio: {
    marginLeft: 10,
    marginBottom: 4,
  },
  button: {
    marginVertical: 30,
    width: 320,
    height: 70,
    backgroundColor: '#6A4029',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
  },
});
