import 'react-native-gesture-handler';
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginSignup from './src/screens/LoginSignup';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import ForgotPassword from './src/screens/ForgotPassword';
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
      {/* <Text>Test</Text> */}
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
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
