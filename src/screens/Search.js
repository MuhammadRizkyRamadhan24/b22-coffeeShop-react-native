import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {Input} from 'native-base';
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
    this.props.searchData(search, page, token).then(() => {
      if (this.props.products.errMsg === 'Item not found') {
        ToastAndroid.showWithGravity(
          'Not Find Data',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        this.setState({isLoading: false, spinnerLoading: false, items: []});
      }
      this.setState({
        items: this.props.products.search,
        isLoading: false,
        spinnerLoading: false,
      });
    });
  };

  infiniteSearch = () => {
    this.setState({content: true});
    const {token} = this.props.auth;
    const search = this.state.search;
    const page = this.state.page;
    this.props
      .searchData(search, page, token)
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

  render() {
    const isCloseToBottom = ({
      layoutMeasurement,
      contentOffset,
      contentSize,
    }) => {
      const paddingToBottom = 20;
      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      );
    };
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
          </View>
          {this.state.content === true ? (
            <ScrollView
              onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                  this.handleLoadMore();
                }
              }}
              scrollEventThrottle={1000}
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}>
              <View style={styles.wrapperCard}>
                {this.state.items.map(d => (
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
                ))}
              </View>
            </ScrollView>
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
  },
  input: {
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
});
