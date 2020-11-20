import React, {useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigationState} from '@react-navigation/native';

import {FullSreenContext} from '../context/FullScreenContext';
import {useDispatch, useSelector} from 'react-redux';
import {incrementModify} from '../redux/slices/accreditationSlice';
// import SplashScreen from '../screens/SplashScreen/SplashScreen';
import {updateTopNavProps} from '../redux/slices/genericsSlice';
import {
  Principal,
  Carrinho,
  Reserva,
  Perfil,
  CadastroEndereco,
  ReservaDetalhe,
} from '../Pages';

const Stack = createStackNavigator();

const HomeNavigator = ({navigation}) => {
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="Carrinho" component={Carrinho} />
        <Stack.Screen name="Reservas" component={Reserva} />
        <Stack.Screen name="ReservaDetalhe" component={ReservaDetalhe} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="CadastroEndereco" component={CadastroEndereco} />
      </Stack.Navigator>
    </>
  );
};

export default HomeNavigator;
