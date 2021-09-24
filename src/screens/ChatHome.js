import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Spinner} from 'native-base';
import {connect} from 'react-redux';
import {getChatHome, searchUser} from '../redux/actions/chat';
import {io} from 'socket.io-client';

import {REACT_APP_BASE_URL} from '@env';
const socket = io(`${REACT_APP_BASE_URL}`);

class ChatHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      loading: true,
      loadingSearch: false,
      idReceiver: '',
    };
  }

  getChatHome = () => {
    const {token, id} = this.props.auth;
    this.props.getChatHome(id, token).then(() => {
      this.setState({
        loading: false,
      });
    });
  };

  searchUserChat = async () => {
    await this.setState({loadingSearch: true});
    const {token} = this.props.auth;
    this.props.searchUser(this.state.search, token).then(() => {
      this.setState({
        loadingSearch: false,
      });
    });
  };

  toChatRoom = item => {
    if (item.id_receiver === this.props.auth.id) {
      this.props.navigation.navigate('ChatRoom', {
        idReceiver: item.id_sender,
        imageReceiver: item.imageUser,
        nameReceiver: item.display_name,
      });
    }
    if (item.id_sender === this.props.auth.id) {
      this.props.navigation.navigate('ChatRoom', {
        idReceiver: item.id_receiver,
        imageReceiver: item.imageUser,
        nameReceiver: item.display_name,
      });
    }
  };

  componentDidMount() {
    this.getChatHome();
    socket.on(this.props.auth.id, data => {
      this.getChatHome();
    });
  }

  render() {
    // console.log(REACT_APP_BASE_URL);
    return (
      <>
        {this.state.loading === false ? (
          <View style={styles.wrapper}>
            <View style={styles.wrapperNav}>
              <View style={styles.buttonBack}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Home')}>
                  <MaterialIcons name="arrow-back-ios" color="#000" size={30} />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.titleScreen}>Chat</Text>
              </View>
            </View>
            <View style={styles.wrapperSearch}>
              <View style={styles.textInput}>
                <MaterialIcons color={'#A3A3A3'} name="search" size={32} />
                <TextInput
                  style={[styles.widthTextInput]}
                  placeholder="Search User"
                  onChangeText={val => this.setState({search: val})}
                  onSubmitEditing={() => this.searchUserChat()}
                />
              </View>
              <Text style={styles.textSearch}>
                Choose a user you want to talk with
              </Text>
              {this.state.loadingSearch === true && (
                <View style={styles.wrapperSpinnerSearch}>
                  <Spinner color="#000" />
                </View>
              )}
              <FlatList
                data={this.props.chat.user}
                style={styles.wrapperResultSearch}
                horizontal={true}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ChatRoom', {
                        idReceiver: item.id,
                        imageReceiver: item.image,
                        nameReceiver: item.display_name,
                      })
                    }
                    key={item.id}
                    style={styles.wrapperCardResult}>
                    <Image
                      style={styles.imageResult}
                      source={
                        item.image === null
                          ? {
                              uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                            }
                          : {
                              uri: `${REACT_APP_BASE_URL}/static/images/${item.image}`,
                            }
                      }
                    />
                    <Text style={styles.textResult}>{item.display_name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <FlatList
              data={this.props.chat.chatHome}
              style={styles.wrapperChatList}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => this.toChatRoom(item)}
                  style={styles.containerCard}
                  key={item.id}>
                  <Image
                    style={styles.imageCard}
                    source={
                      item.imageUser === null
                        ? {
                            uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                          }
                        : {
                            uri: `${REACT_APP_BASE_URL}/static/images/${item.imageUser}`,
                          }
                    }
                  />
                  <View style={styles.wrapperCardRight}>
                    <Text style={styles.fontCardName}>{item.display_name}</Text>
                    {item.deleted === '0' ? (
                      <>
                        {item.chat === null && (
                          <Text style={styles.fontCardChat}>Sending Image</Text>
                        )}
                        {item.chat !== null && (
                          <Text style={styles.fontCardChat}>{item.chat}</Text>
                        )}
                      </>
                    ) : (
                      <Text style={styles.fontCardChatDelete}>
                        Message Deleted!
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
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
  chat: state.chat,
  user: state.user,
});

const mapDispatchToProps = {
  getChatHome,
  searchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatHome);

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
  wrapperSpinnerSearch: {
    width: '100%',
    height: 60,
  },
  wrapperNav: {
    alignItems: 'center',
    marginTop: 48,
    width: '85%',
    height: 'auto',
    flexDirection: 'row',
  },
  buttonBack: {
    marginRight: 115,
  },
  titleScreen: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  wrapperSearch: {
    width: '85%',
    marginTop: '10%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E2',
  },
  widthTextInput: {
    width: '90%',
    fontFamily: 'Poppins-Regular',
  },
  textInput: {
    width: '100%',
    height: 60,
    backgroundColor: '#dbdbdb',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2%',
    borderRadius: 30,
  },
  wrapperResultSearch: {
    width: '100%',
    flexDirection: 'row',
  },
  wrapperCardResult: {
    marginHorizontal: 10,
  },
  imageResult: {
    width: 90,
    height: 90,
    borderRadius: 999,
    marginBottom: 10,
  },
  textResult: {
    fontFamily: 'Poppins-Regular',
    width: 90,
    height: 70,
    textAlign: 'center',
  },
  textSearch: {
    fontFamily: 'Poppins-Regular',
    marginVertical: '10%',
  },
  wrapperChatList: {
    width: '90%',
  },
  containerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E2',
  },
  imageCard: {
    width: 80,
    height: 80,
    borderRadius: 999,
  },
  wrapperCardRight: {
    width: 230,
    height: '100%',
    marginLeft: 15,
  },
  fontCardName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginTop: 10,
  },
  fontCardChat: {
    fontFamily: 'Poppins-Regular',
  },
  fontCardChatDelete: {
    fontFamily: 'Poppins-SemiBoldItalic',
  },
});
