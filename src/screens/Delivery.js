import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
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
    console.log(this.state);
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperNav}>
          <View style={styles.buttonBack}>
            <TouchableOpacity>
              <MaterialIcons name="arrow-back-ios" color="#000" size={30} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.titleScreen}>Checkout</Text>
          </View>
        </View>
        <View style={styles.wrapperTitle}>
          <Text style={styles.title}>Delivery</Text>
        </View>
        <View style={styles.wrapperSubtitle}>
          <Text style={styles.subtitle}>Address details</Text>
        </View>
        <View style={styles.wrapperAddress}>
          <Text style={styles.textAddressBold}>Iskandar Street</Text>
          <Text style={styles.textAddress}>
            Km 5 refinery road oppsite re public road, effurun, Jakarta
          </Text>
          <Text style={styles.textAddress}>+62 81348287878</Text>
        </View>
        <View style={styles.wrapperSubtitle}>
          <Text style={styles.subtitle}>Delivery methods</Text>
        </View>
        <View style={styles.wrapperAddress}>
          <Radio.Group
            name="radio-button"
            value={this.state.value}
            onChange={nextValue => {
              this.setState({value: nextValue});
            }}>
            <Radio accessibilityLabel="test" colorScheme="gray" value="one">
              <Text style={styles.radio}>Door delivery</Text>
            </Radio>
            <Radio accessibilityLabel="test" colorScheme="gray" value="two">
              <Text style={styles.radio}>Pick up at store</Text>
            </Radio>
            <Radio accessibilityLabel="test" colorScheme="gray" value="three">
              <Text style={styles.radio}>Dine in</Text>
            </Radio>
          </Radio.Group>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Payment')}
          style={styles.button}>
          <Text style={styles.buttonTextPayment}>Proceed to payment</Text>
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
    marginTop: 35,
    width: 320,
    height: 'auto',
  },
  subtitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
  },
  wrapperAddress: {
    marginTop: 17,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    width: 320,
  },
  textAddress: {
    marginVertical: 5,
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
  },
  textAddressBold: {
    marginVertical: 5,
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
  },
  radio: {
    marginLeft: 15,
    marginTop: 1,
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    marginVertical: 50,
    width: 320,
    height: 70,
    backgroundColor: '#6A4029',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextPayment: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
  },
});
