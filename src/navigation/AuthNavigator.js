import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigator from './HomeNavigator';
import {Login, Cadastro, Recover, onBoarding} from '../Pages';
import {useSelector} from 'react-redux';

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
            <Stack.Screen name="onBoarding" component={onBoarding} />
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
