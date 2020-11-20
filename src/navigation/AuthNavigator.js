import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigator from './HomeNavigator';
import {Login, Cadastro, Recover, Home, Principal} from '../Pages';
import {useSelector} from 'react-redux';
// import SplashScreen from '../screens/SplashScreen/SplashScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <Stack.Screen name="Principal" component={HomeNavigator} />
        ) : (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Recover" component={Recover} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
        </>
         )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
