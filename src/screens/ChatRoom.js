import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {io} from 'socket.io-client';
import {REACT_APP_BASE_URL} from '@env';
import {connect} from 'react-redux';
import {
  getChatHome,
  getChatRoom,
  postChat,
  postAttachment,
  deleteChat,
} from '../redux/actions/chat';
import select from '../../assets/select.png';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {Spinner} from 'native-base';

const socket = io(`${REACT_APP_BASE_URL}`);

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: [],
      chatroom: [],
      id_sender: '',
      id_receiver: '',
      image: '',
      showImage: '',
      sendChat: '',
      modalVisible: false,
      loadingChat: false,
    };
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  getChatHome = () => {
    const {token, id} = this.props.auth;
    this.props.getChatHome(id, token).then(() => {
      this.setState(
        {
          home: this.props.chat.chatHome,
          id_sender: id,
          id_receiver: this.props.route.params.idReceiver,
        },
        () => {
          this.props.getChatRoom(id, this.state.id_receiver, token).then(() => {
            this.setState({
              chatroom: this.props.chat.chatRoom.reverse(),
            });
          });
        },
      );
    });
  };

  componentDidMount() {
    this.getChatHome();
    socket.on(this.props.auth.id, data => {
      this.getChatHome();
      const {token} = this.props.auth;
      this.props
        .getChatRoom(this.state.id_sender, this.state.id_receiver, token)
        .then(() => {
          this.setState({
            chatroom: this.props.chat.chatRoom.reverse(),
          });
        });
    });
  }

  sendChat = () => {
    const {id_sender, id_receiver, sendChat} = this.state;
    const {token} = this.props.auth;
    if (this.state.sendChat !== '') {
      this.props.postChat(id_sender, id_receiver, sendChat, token);
      socket.on(this.state.id_receiver, data => {
        this.getChatHome();
        this.props
          .getChatRoom(this.state.id_sender, this.state.id_receiver, token)
          .then(() => {
            this.setState({
              chatroom: this.props.chat.chatRoom.reverse(),
              sendChat: '',
            });
          });
      });
    }
  };

  sendImage = () => {
    const {id_sender, id_receiver, image, modalVisible} = this.state;
    const {token} = this.props.auth;
    if (image !== '') {
      this.props.postAttachment(id_sender, id_receiver, image, token);
      socket.on(this.state.id_receiver, data => {
        this.getChatHome();
        this.props
          .getChatRoom(this.state.id_sender, this.state.id_receiver, token)
          .then(() => {
            this.setState({
              chatroom: this.props.chat.chatRoom,
            });
            this.setModalVisible(!modalVisible);
          });
      });
    }
  };

  selectPicture = e => {
    if (!e.didCancel) {
      const maxSize = 1024 * 1024 * 2;
      if (e.assets[0].fileSize < maxSize) {
        if (
          e.assets[0].type === 'image/jpeg' ||
          e.assets[0].type === 'image/jpg' ||
          e.assets[0].type === 'image/png'
        ) {
          this.setState({
            showImage: e.assets[0].uri,
            image: e.assets[0],
          });
        } else {
          showMessage({
            message: 'File Not a Picture!',
            type: 'danger',
            backgroundColor: '#d63031',
            color: '#fff',
          });
        }
      } else {
        showMessage({
          message: 'File To Large!',
          type: 'danger',
          backgroundColor: '#d63031',
          color: '#fff',
        });
        this.setState({
          image: '',
          showImage: '',
        });
      }
    }
  };

  setPicture = () => {
    Alert.alert('Select Picture', 'Please choose a picture', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Gallery',
        onPress: () => launchImageLibrary({quality: 1}, this.selectPicture),
      },
      {
        text: 'Camera',
        onPress: () => launchCamera({quality: 1}, this.selectPicture),
      },
    ]);
  };

  alertDelete = (id, deleted) => {
    console.log(id);
    if (deleted === '0') {
      Alert.alert('Delete Message', 'Do you want delete it?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => this.deleteMessage(id),
        },
      ]);
    }
  };

  deleteMessage = id => {
    const {token} = this.props.auth;
    this.props.deleteChat(token, id);
    socket.on(id, data => {
      this.setState({
        loadingChat: true,
      });
      this.getChatHome();
      this.props
        .getChatRoom(this.state.id_sender, this.state.id_receiver, token)
        .then(() => {
          this.setState({
            chatroom: this.props.chat.chatRoom,
            loadingChat: false,
          });
        });
    });
  };

  render() {
    // console.log(REACT_APP_BASE_URL);
    const {modalVisible} = this.state;
    return (
      <View style={styles.wrapper}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {this.state.showImage !== '' ? (
                <Image
                  style={styles.imageAttachment}
                  source={{uri: this.state.showImage}}
                />
              ) : (
                <Image style={styles.imageAttachment} source={select} />
              )}
              <TouchableOpacity
                style={styles.buttonImage}
                onPress={this.setPicture}>
                <Text style={[styles.textStyle, styles.white]}>
                  Select Image
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonImage}
                onPress={this.sendImage}>
                <Text style={[styles.textStyle, styles.white]}>Send Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.wrapperNav}>
          <View style={styles.wrapperBack}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}>
              <MaterialIcons name="arrow-back-ios" color="#000" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperHeader}>
            <Image
              style={styles.imageReceiver}
              source={
                this.props.route.params.imageReceiver === null
                  ? {
                      uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                    }
                  : {
                      uri: `${REACT_APP_BASE_URL}/static/images/${this.props.route.params.imageReceiver}`,
                    }
              }
            />
            <Text style={styles.titleScreen}>
              {this.props.route.params.nameReceiver}
            </Text>
          </View>
        </View>
        <View style={styles.wrapperContent}>
          {this.state.loadingChat === false ? (
            <FlatList
              style={styles.wrapperBubble}
              data={this.state.chatroom}
              renderItem={({item}) => (
                <>
                  {item.id_sender === this.props.auth.id ? (
                    <View style={styles.wrapperChatBubbleSender}>
                      <TouchableOpacity
                        onLongPress={() =>
                          this.alertDelete(item.id, item.deleted)
                        }
                        delayLongPress={500}
                        style={styles.containerChatBubbleSender}>
                        {item.deleted === '1' ? (
                          <Text style={styles.chatTextDeleted}>
                            Message Deleted!
                          </Text>
                        ) : (
                          <>
                            {item.chat !== null && (
                              <Text style={styles.chatText}>{item.chat}</Text>
                            )}
                            {item.image !== null && (
                              <Image
                                style={styles.imageChat}
                                resizeMode="cover"
                                source={{
                                  uri: `${REACT_APP_BASE_URL}/static/images/${item.image}`,
                                }}
                              />
                            )}
                          </>
                        )}
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.wrapperChatBubbleReceiver}>
                      <TouchableOpacity
                        onLongPress={() =>
                          this.alertDelete(item.id, item.deleted)
                        }
                        delayLongPress={1000}
                        style={styles.containerChatBubbleReceiver}>
                        {item.deleted === '1' ? (
                          <Text style={[styles.chatTextDeleted, styles.white]}>
                            Message Deleted!
                          </Text>
                        ) : (
                          <>
                            {item.chat !== null && (
                              <Text style={[styles.chatText, styles.white]}>
                                {item.chat}
                              </Text>
                            )}
                            {item.image !== null && (
                              <Image
                                style={styles.imageChat}
                                resizeMode="cover"
                                source={{
                                  uri: `${REACT_APP_BASE_URL}/static/images/${item.image}`,
                                }}
                              />
                            )}
                          </>
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
            />
          ) : (
            <View style={styles.wrapperSpinner}>
              <Spinner color="#000" />
            </View>
          )}
          <View style={styles.wrapperSendBox}>
            <View style={styles.containerSendBox}>
              <View style={styles.textInput}>
                <TextInput
                  value={this.state.sendChat}
                  onChangeText={val => this.setState({sendChat: val})}
                  onSubmitEditing={() => this.sendChat()}
                  style={[styles.widthTextInput]}
                  placeholder="Type a message..."
                />
              </View>
              <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                <Image
                  style={styles.iconCamera}
                  source={{
                    uri: 'https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
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
  postAttachment,
  postChat,
  getChatRoom,
  deleteChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
const win = Dimensions.get('window');
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
    marginTop: 30,
    width: '85%',
    flexDirection: 'row',
  },
  wrapperBack: {
    flex: 1,
    justifyContent: 'center',
  },
  titleScreen: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginLeft: '8%',
    width: '70%',
  },
  wrapperHeader: {
    flex: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageReceiver: {
    width: 60,
    height: 60,
    borderRadius: 999,
  },
  wrapperContent: {
    flex: 1,
    width: '100%',
  },
  wrapperBubble: {
    flex: 1,
    transform: [{scaleY: -1}],
  },
  wrapperSendBox: {
    height: 70,
  },
  containerSendBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  widthTextInput: {
    width: '100%',
    fontFamily: 'Poppins-Regular',
  },
  textInput: {
    width: '75%',
    height: 50,
    backgroundColor: '#dbdbdb',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2%',
    borderRadius: 30,
  },
  wrapperChatBubbleSender: {
    width: '100%',
    alignItems: 'flex-end',
    transform: [{scaleY: -1}],
  },
  wrapperChatBubbleReceiver: {
    width: '100%',
    alignItems: 'flex-start',
    transform: [{scaleY: -1}],
  },
  containerChatBubbleSender: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    marginVertical: 5,
    marginRight: 10,
    borderColor: '#6A4029',
  },
  containerChatBubbleReceiver: {
    borderWidth: 1,
    borderColor: '#6A4029',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginVertical: 5,
    marginLeft: 10,
    width: 'auto',
    backgroundColor: '#6A4029',
  },
  chatText: {
    fontFamily: 'Poppins-Regular',
  },
  white: {
    color: 'white',
  },
  imageChat: {
    width: win.width / 2,
    height: win.width / 2,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  chatTextDeleted: {
    fontFamily: 'Poppins-SemiBoldItalic',
  },
  iconCamera: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 999,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: '10%',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    elevation: 5,
    alignItems: 'center',
  },
  imageAttachment: {
    width: 320,
    height: 300,
  },
  textStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  buttonImage: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    width: 300,
    height: 60,
    backgroundColor: '#6A4029',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonClose: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    width: 300,
    height: 60,
    borderColor: '#6A4029',
    borderWidth: 2,
  },
});
