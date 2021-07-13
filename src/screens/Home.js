import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Spinner} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Card from '../component/CardLg';
import Subtitle from '../component/Subtitle';
import Seemore from '../component/Seemore';

import {REACT_APP_BASE_URL} from '@env';
import {connect} from 'react-redux';
import {getDataByCategories} from '../redux/actions/products';
import {getCategory} from '../redux/actions/categories';
import {getUserById} from '../redux/actions/user';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      favoriteProduct: [],
      coffee: [],
      nonCoffee: [],
      foods: [],
      addOn: [],
      isLoading: true,
      loading: true,
    };
  }

  getProduct = () => {
    const {token} = this.props.auth;
    this.props.getCategory(token).then(() => {
      this.props.getDataByCategories(1, token).then(() => {
        this.setState({
          favoriteProduct: this.props.products.data,
        });
        this.props.getDataByCategories(2, token).then(() => {
          this.setState({
            coffee: this.props.products.data,
          });
          this.props.getDataByCategories(3, token).then(() => {
            this.setState({
              nonCoffee: this.props.products.data,
            });
            this.props.getDataByCategories(4, token).then(() => {
              this.setState({
                foods: this.props.products.data,
              });
              this.props.getDataByCategories(5, token).then(() => {
                this.setState({
                  addOn: this.props.products.data,
                });
              });
            });
          });
        });
      });
      this.setState({
        categories: this.props.categories.data,
        isLoading: false,
      });
    });
  };

  getUserData = () => {
    const {token} = this.props.auth;
    this.props.getUserById(token).then(() => {
      this.setState({
        loading: false,
      });
    });
  };

  componentDidMount() {
    this.getUserData();
    this.getProduct();
  }

  render() {
    // console.log(this.props, this.state, 'home');
    return (
      <>
        {this.state.isLoading !== true ? (
          <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
            <View style={styles.wrapper}>
              <View style={styles.header}>
                {this.state.loading !== true ? (
                  this.props.user.data !== [] ? (
                    <>
                      {this.props.user.data[0].image === null ? (
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('Profile')
                          }
                          style={styles.marginIcon}>
                          <Image
                            style={styles.profile}
                            source={{
                              uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                            }}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('Profile')
                          }
                          style={styles.marginIcon}>
                          <Image
                            style={styles.profile}
                            source={{
                              uri: `${REACT_APP_BASE_URL}/static/images/${this.props.user.data[0].image}`,
                            }}
                          />
                        </TouchableOpacity>
                      )}
                    </>
                  ) : (
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Profile')}
                      style={[styles.profile, styles.marginIcon]}
                    />
                  )
                ) : (
                  <></>
                )}
                {/* <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Profile')}
                  style={[styles.profile, styles.marginIcon]}
                /> */}
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Cart')}
                  style={styles.marginIcon}>
                  <MaterialIcons name="shopping-cart" color="#000" size={30} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.marginIcon}>
                  <MaterialIcons
                    name="chat-bubble-outline"
                    color="#000"
                    size={30}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.openDrawer()}
                  style={styles.marginIconMenu}>
                  <MaterialIcons name="menu-open" color="#000" size={40} />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>A good coffee is a good day</Text>
              <View style={styles.wrapperCard}>
                <View style={styles.wrapperSubtitle}>
                  <View style={styles.subtitle}>
                    <Subtitle title={this.state.categories[0].name_category} />
                  </View>
                  <Seemore
                    func={() =>
                      this.props.navigation.navigate('Seemore', {
                        id: 1,
                        title: this.state.categories[0].name_category,
                      })
                    }
                  />
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {/* <Card
                    func={() => this.props.navigation.navigate('ProductDetail')}
                  /> */}
                  {/* {this.state.favoriteProduct.map(d => (
                    <Card key={d.id} data={d} />
                  ))} */}
                  {this.state.favoriteProduct !== [] ? (
                    this.state.favoriteProduct.map(d => (
                      <Card
                        func={() =>
                          this.props.navigation.navigate('ProductDetail', {
                            id: d.id,
                          })
                        }
                        key={d.id}
                        name={d.name}
                        price={d.price}
                        image={d.image}
                      />
                    ))
                  ) : (
                    <Spinner color="black" />
                  )}
                </ScrollView>
              </View>

              <View style={styles.wrapperCard}>
                <View style={styles.wrapperSubtitle}>
                  <View style={styles.subtitle}>
                    <Subtitle title={this.state.categories[1].name_category} />
                  </View>
                  <Seemore
                    func={() =>
                      this.props.navigation.navigate('Seemore', {
                        id: 2,
                        title: this.state.categories[1].name_category,
                      })
                    }
                  />
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {this.state.coffee !== [] ? (
                    this.state.coffee.map(d => (
                      <Card
                        func={() =>
                          this.props.navigation.navigate('ProductDetail', {
                            id: d.id,
                          })
                        }
                        key={d.id}
                        name={d.name}
                        price={d.price}
                        image={d.image}
                      />
                    ))
                  ) : (
                    <Spinner color="black" />
                  )}
                </ScrollView>
              </View>

              <View style={styles.wrapperCard}>
                <View style={styles.wrapperSubtitle}>
                  <View style={styles.subtitle}>
                    <Subtitle title={this.state.categories[2].name_category} />
                  </View>
                  <Seemore
                    func={() =>
                      this.props.navigation.navigate('Seemore', {
                        id: 3,
                        title: this.state.categories[2].name_category,
                      })
                    }
                  />
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {this.state.nonCoffee !== [] ? (
                    this.state.nonCoffee.map(d => (
                      <Card
                        func={() =>
                          this.props.navigation.navigate('ProductDetail', {
                            id: d.id,
                          })
                        }
                        key={d.id}
                        name={d.name}
                        price={d.price}
                        image={d.image}
                      />
                    ))
                  ) : (
                    <Spinner color="black" />
                  )}
                </ScrollView>
              </View>

              <View style={styles.wrapperCard}>
                <View style={styles.wrapperSubtitle}>
                  <View style={styles.subtitle}>
                    <Subtitle title={this.state.categories[3].name_category} />
                  </View>
                  <Seemore
                    func={() =>
                      this.props.navigation.navigate('Seemore', {
                        id: 4,
                        title: this.state.categories[3].name_category,
                      })
                    }
                  />
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {this.state.foods !== [] ? (
                    this.state.foods.map(d => (
                      <Card
                        func={() =>
                          this.props.navigation.navigate('ProductDetail', {
                            id: d.id,
                          })
                        }
                        key={d.id}
                        name={d.name}
                        price={d.price}
                        image={d.image}
                      />
                    ))
                  ) : (
                    <Spinner color="black" />
                  )}
                </ScrollView>
              </View>

              <View style={styles.wrapperCard}>
                <View style={styles.wrapperSubtitle}>
                  <View style={styles.subtitle}>
                    <Subtitle title={this.state.categories[4].name_category} />
                  </View>
                  <Seemore
                    func={() =>
                      this.props.navigation.navigate('Seemore', {
                        id: 5,
                        title: this.state.categories[4].name_category,
                      })
                    }
                  />
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {this.state.addOn !== [] ? (
                    this.state.addOn.map(d => (
                      <Card
                        func={() =>
                          this.props.navigation.navigate('ProductDetail', {
                            id: d.id,
                          })
                        }
                        key={d.id}
                        name={d.name}
                        price={d.price}
                        image={d.image}
                      />
                    ))
                  ) : (
                    <Spinner color="black" />
                  )}
                </ScrollView>
              </View>
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
  user: state.user,
  products: state.products,
  categories: state.categories,
});

const mapDispatchToProps = {getDataByCategories, getCategory, getUserById};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

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
  header: {
    alignItems: 'center',
    marginTop: 48,
    width: 320,
    height: 'auto',
    flexDirection: 'row-reverse',
  },
  profile: {
    marginRight: 0,
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#000',
  },
  marginIcon: {
    marginLeft: 8,
  },
  marginIconMenu: {
    marginRight: 170,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: '#000',
    width: 285,
    fontSize: 34,
    marginLeft: -17.5,
    marginTop: 40,
  },
  subtitle: {
    width: 260,
  },
  wrapperCard: {
    marginVertical: 24,
    width: 347,
    marginLeft: 46,
  },
  wrapperSubtitle: {
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
  },
});
