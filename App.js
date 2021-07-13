import 'react-native-gesture-handler';
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginSignup from './src/screens/LoginSignup';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import ForgotPassword from './src/screens/ForgotPassword';
import Profile from './src/screens/Profile';
import EditProfile from './src/screens/EditProfile';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import ProductDetail from './src/screens/ProductDetail';
import {DrawerContent} from './src/screens/DrawerContent';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Cart from './src/screens/Cart';
import Delivery from './src/screens/Delivery';
import Seemore from './src/screens/Seemore';
import Payment from './src/screens/Payment';
import Coupon from './src/screens/Coupon';
import History from './src/screens/History';
import Promo from './src/screens/Promo';
import {connect} from 'react-redux';
import EditPassword from './src/screens/EditPassword';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const drawer = () => {
  return (
    <Drawer.Navigator
      drawerStyle={styles.drawer}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Search" component={Search} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Promo" component={Promo} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: 'transparent',
    width: 324,
  },
});

const App = props => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          {/* <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginSignup"
            component={LoginSignup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Drawer"
            component={drawer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Seemore"
            component={Seemore}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Delivery"
            component={Delivery}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Coupon"
            component={Coupon}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="History"
            component={History}
            options={{headerShown: false}}
          /> */}
          {props.auth.token === null ? (
            <React.Fragment>
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="LoginSignup"
                component={LoginSignup}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{headerShown: false}}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Stack.Screen
                name="Drawer"
                component={drawer}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Seemore"
                component={Seemore}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetail}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Cart"
                component={Cart}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Delivery"
                component={Delivery}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Payment"
                component={Payment}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Coupon"
                component={Coupon}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="History"
                component={History}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EditPassword"
                component={EditPassword}
                options={{headerShown: false}}
              />
            </React.Fragment>
          )}
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(App);
