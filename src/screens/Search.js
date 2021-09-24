import React, {Component} from 'react';
import {
  Text,
  View,
  // ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Input} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import {showMessage} from 'react-native-flash-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Card from '../component/CardSm';
import {connect} from 'react-redux';
import {searchData} from '../redux/actions/products';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: '',
      items: [],
      spinnerLoading: false,
      isLoading: true,
      refresh: false,
      content: false,
      search: '',
      sort: 'name',
    };
  }

  handleChange = val => {
    this.setState({
      search: val,
    });
  };

  search = async () => {
    await this.setState({content: true, page: 1});
    const {token} = this.props.auth;
    const search = this.state.search;
    const page = this.state.page;
    const order = this.state.sort;
    this.props.searchData(search, page, order, token).then(() => {
      if (this.props.products.errMsg === 'Item not found') {
        showMessage({
          message: `${this.props.products.errMsg}`,
          type: 'danger',
          backgroundColor: '#d63031',
          color: '#fff',
        });
        this.setState({isLoading: false, spinnerLoading: false, items: []});
      } else {
        this.setState({
          items: this.props.products.search,
          isLoading: false,
          spinnerLoading: false,
        });
      }
    });
  };

  infiniteSearch = () => {
    this.setState({content: true});
    const {token} = this.props.auth;
    const search = this.state.search;
    const page = this.state.page;
    const order = this.state.sort;
    this.props
      .searchData(search, page, order, token)
      .then(() => {
        this.setState({
          items: this.state.items.concat(this.props.products.search),
          isLoading: false,
          spinnerLoading: false,
        });
      })
      .catch(err => {
        console.log(err.response);
        this.setState({isLoading: false, spinnerLoading: false});
      });
  };

  handleLoadMore = () => {
    if (this.state.page < this.props.products.pageInfo.lastPage) {
      this.setState(
        {
          page: this.state.page + 1,
          spinnerLoading: true,
        },
        () => {
          this.infiniteSearch();
        },
      );
    }
  };

  componentDidMount() {
    this.search();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort !== this.state.sort) {
      this.search();
    }
  }

  render() {
    return (
      <>
        <View style={styles.wrapper}>
          <View style={styles.wrapperNav}>
            <View style={styles.buttonBack}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <MaterialIcons name="arrow-back-ios" color="#000" size={30} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.titleScreen}>Search</Text>
            </View>
          </View>
          <View style={styles.wrapperInput}>
            <Input
              width={210}
              onChangeText={this.handleChange}
              onSubmitEditing={() => this.search()}
              InputLeftElement={
                <MaterialIcons
                  style={styles.iconInput}
                  name="search"
                  color="#000"
                  size={30}
                />
              }
              style={styles.input}
              variant="rounded"
              placeholder="Search"
              borderColor="#000"
              color="#000"
            />
            <Picker
              style={styles.widthPicker}
              selectedValue={this.state.sort}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({sort: itemValue})
              }>
              <Picker.Item label="Name" value="name" />
              <Picker.Item label="Price" value="price" />
            </Picker>
          </View>
          {this.state.content === true ? (
            // <ScrollView
            //   onScroll={({nativeEvent}) => {
            //     if (isCloseToBottom(nativeEvent)) {
            //       this.handleLoadMore();
            //     }
            //   }}
            //   scrollEventThrottle={1000}
            //   style={styles.scrollView}
            //   showsVerticalScrollIndicator={false}>
            //   <View style={styles.wrapperCard}>
            //     {this.state.items.length > 0 && (
            //       <>
            //         {this.state.items.map(d => (
            //           <Card
            //             func={() =>
            //               this.props.navigation.navigate('ProductDetail', {
            //                 id: d.id,
            //               })
            //             }
            //             key={d.id}
            //             name={d.name}
            //             price={d.price}
            //             image={d.image}
            //           />
            //         ))}
            //       </>
            //     )}
            //   </View>
            // </ScrollView>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={styles.wrapperCard}
              data={this.state.items}
              renderItem={({item}) => (
                <Card
                  func={() =>
                    this.props.navigation.navigate('ProductDetail', {
                      id: item.id,
                    })
                  }
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />
              )}
              numColumns={2}
              ListFooterComponent={() => (
                <View>
                  {this.state.spinnerLoading ? (
                    <ActivityIndicator size="large" color="#FFBA33" />
                  ) : (
                    <></>
                  )}
                </View>
              )}
              ListFooterComponentStyle={styles.footer}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0}
            />
          ) : (
            <View style={styles.wrapperNoCard}>
              <Text style={styles.textNoCard}>What are you looking for?</Text>
            </View>
          )}
        </View>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  products: state.products,
});

const mapDispatchToProps = {searchData};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ECECEC',
    alignItems: 'center',
  },
  wrapperSpinner: {
    flex: 1,
    backgroundColor: '#ECECEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperInput: {
    top: 30,
    width: 320,
    flexDirection: 'row',
  },
  input: {
    fontFamily: 'Poppins-SemiBold',
  },
  widthPicker: {
    width: 130,
    fontFamily: 'Poppins-SemiBold',
  },
  iconInput: {
    marginLeft: 10,
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
  scrollView: {
    marginTop: 50,
  },
  wrapperCard: {
    marginTop: 50,
    width: 340,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wrapperNoCard: {
    marginTop: 40,
    width: 340,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNoCard: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  footer: {
    marginBottom: 50,
  },
});
