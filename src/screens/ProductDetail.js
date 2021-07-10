import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Spinner} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {REACT_APP_BASE_URL} from '@env';
import {connect} from 'react-redux';
import {getDataById} from '../redux/actions/products';
import {addItems} from '../redux/actions/carts';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      click: false,
      item: [],
    };
  }

  getDataById = () => {
    const id = this.props.route.params.id;
    const {token} = this.props.auth;
    this.props.getDataById(id, token).then(() => {
      this.setState({
        isLoading: false,
      });
    });
  };

  setItem = (variant, price) => {
    const data = {
      id: this.props.products.detailData.id,
      name: this.props.products.detailData.name,
      image: this.props.products.detailData.image,
      variant: variant,
      end_price: price,
      additional_price: price - this.props.products.detailData.base_price,
      amount: 1,
    };
    this.setState({
      item: data,
      click: true,
    });
  };

  addItem = () => {
    this.props.addItems(this.state.item);
    // .then(() => {
    ToastAndroid.showWithGravity(
      'Success add to cart',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
    // });
  };

  componentDidMount() {
    this.getDataById();
  }

  render() {
    console.log(this.props.navigation);
    return (
      <>
        {this.state.isLoading !== true ? (
          <ScrollView>
            <View style={styles.wrapper}>
              <View style={styles.wrapperNav}>
                <View style={styles.buttonBack}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}>
                    <MaterialIcons
                      name="arrow-back-ios"
                      color="#000"
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonCart}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Cart')}>
                    <MaterialIcons
                      name="shopping-cart"
                      color="#000"
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.wrapperImage}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `${REACT_APP_BASE_URL}/static/images/${this.props.products.detailData.image}`,
                  }}
                />
                <View style={styles.wrapperVariant}>
                  {this.props.products.detailData.variants.map((d, i) => (
                    <TouchableOpacity
                      onPress={() => this.setItem(d.variant, d.price)}
                      key={d.id}
                      style={styles.buttonVariant}>
                      <Text style={styles.textVariant}>{d.variant}</Text>
                    </TouchableOpacity>
                  ))}
                  {/* <TouchableOpacity style={styles.buttonVariant}>
                    <Text style={styles.textVariant}>R</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonVariant}>
                    <Text style={styles.textVariant}>L</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonVariant}>
                    <Text style={styles.textVariant}>XL</Text>
                  </TouchableOpacity> */}
                </View>
                <Text style={styles.textItem}>
                  {this.props.products.detailData.name}
                </Text>
                <Text style={styles.textPrice}>
                  IDR {this.props.products.detailData.base_price}
                </Text>
                <View style={styles.wrapperContent} />
              </View>
              <View style={styles.wrapperContent}>
                <Text style={styles.subtitle}>Delivery info</Text>
                <Text style={styles.description}>
                  Delivered only : {this.props.products.detailData.delivery}
                </Text>
                <Text style={styles.subtitle}>Description</Text>
                <Text style={styles.description}>
                  {this.props.products.detailData.detail}
                </Text>
              </View>
              {this.state.click === true && (
                <TouchableOpacity
                  onPress={this.addItem}
                  style={styles.buttonBrown}>
                  <Text style={styles.fontButton}>Add to cart</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.wrapperSpinner}>
            <Spinner color="#000" />
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  products: state.products,
  carts: state.carts,
});

const mapDispatchToProps = {getDataById, addItems};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#BCBABA',
    alignItems: 'center',
  },
  wrapperSpinner: {
    flex: 1,
    backgroundColor: '#BCBABA',
    alignItems: 'center',
    justifyContent: 'center',
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
