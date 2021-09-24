import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Spinner} from 'native-base';
import {REACT_APP_BASE_URL} from '@env';

import {connect} from 'react-redux';
import {getUserById} from '../redux/actions/user';

const HeadDrawer = props => {
  const [loading, setLoading] = React.useState(true);

  const getData = async () => {
    const {token} = props.auth;
    await props.getUserById(token).then(async () => {
      await setLoading(false);
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  // console.log(REACT_APP_BASE_URL);
  return (
    <View style={styles.wrapperProfile}>
      {loading === false ? (
        <>
          {props.user.data.image === null && (
            <Image
              style={styles.image}
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
              }}
            />
          )}
          {props.user.data.image !== null && (
            <Image
              style={styles.image}
              source={{
                uri: `${REACT_APP_BASE_URL}/static/images/${props.user.data.image}`,
              }}
            />
          )}
          <Text style={styles.name}>{props.user.data.display_name}</Text>
          <Text style={styles.email}>{props.user.data.email}</Text>
        </>
      ) : (
        <>
          <Spinner color="#fff" />
        </>
      )}
    </View>
  );
};
const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {
  getUserById,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadDrawer);

const styles = StyleSheet.create({
  wrapperProfile: {
    width: 324,
    height: 288,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#6A4029',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  name: {
    width: 240,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
  },
  email: {
    width: 240,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
  },
});
