import React, {useState} from 'react';
import {View, Alert, TouchableOpacity, Text} from 'react-native';

import styles from './styles';

import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/AntDesign';

import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {unsetCurrentUser} from '../../redux/slices/authSlice';

const NewModal = ({open, setOpen}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  function closeModal() {
    setOpen(false);
    dispatch(unsetCurrentUser());
  }

  function handleNavigate(page) {
    setOpen(false);
    navigation.navigate(page);
  }

  return (
    <Modal
      isVisible={open}
      onBackdropPress={() => setOpen(false)}
      style={{
        width: '70%',
        position: 'absolute',
        height: '100%',
        right: -30,
        top: -30,
      }}
      animationIn="slideInRight"
      animationInTiming={600}
      animationOut="slideOutRight"
      animationOutTiming={600}>
      <View style={styles.modalView}>
        <View
          style={{
            height: '50%',
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <TouchableOpacity
            onPress={() => handleNavigate('Principal')}
            style={styles.buttonMenu}>
            <Icon name="home" size={20} color="#000" />
            <Text style={styles.textMenu}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNavigate('Perfil')}
            style={styles.buttonMenu}>
            <Icon name="user" size={20} color="#000" />
            <Text style={styles.textMenu}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNavigate('Carrinho')}
            style={styles.buttonMenu}>
            <Icon name="shoppingcart" size={20} color="#000" />
            <Text style={styles.textMenu}>Carrinho</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
              onPress={() => handleNavigate('Favoritos')}
              style={styles.buttonMenu}>
              <Icon name="hearto" size={20} color="#FF6666" />
              <Text style={styles.textMenu}>Favoritos</Text>
            </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => handleNavigate('Reservas')}
            style={styles.buttonMenu}>
            <Icon name="tagso" size={22} color="#000" />
            <Text style={styles.textMenu}>Minhas Reservas</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
              onPress={() => handleNavigate('Lojas')}
              style={styles.buttonMenu}>
              <Icon name="isv" size={20} color="#000" />
              <Text style={styles.textMenu}>Lojas</Text>
            </TouchableOpacity> */}
        </View>
        <View
          style={{
            height: '20%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => closeModal()}
            style={styles.buttonLogout}>
            <Icon name="logout" size={20} color="#000" />
            <Text style={styles.textMenu}>Logout</Text>
          </TouchableOpacity>
          <Text>Versão: 1.0</Text>
        </View>
      </View>
    </Modal>
  );
};

export default NewModal;
