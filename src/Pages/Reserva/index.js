import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import {Button, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {ButtonLarge} from '../../components';
import {useDispatch, useSelector} from 'react-redux';

import axiosInstance from '../../redux/api/axiosInstance';

import Profile from '../../assets/images/profile2.jpg';

import {ReservaList, NewModal} from '../../components';

export default function Reserva({navigation}) {
  const currentUser = useSelector(state => state.authReducer.currentUser);

  const dispatch = useDispatch();
  const [reservas, setReservas] = useState([]);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleReservas();
  }, []);

  async function handleReservas() {
    try {
      let reservasList = await axiosInstance.get(
        `/pecas/reserva?id_usuario=${currentUser.id}`,
      );
      setReservas(reservasList.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  let listaFiltrada = reservas.filter(function(value) {
    return value.cod_reserva.toUpperCase().includes(message.toUpperCase());
  });

  return (
    <View style={styles.Screen}>
      <View style={styles.Topo}>
        <Icon
          style={styles.MenuIcon}
          name="bars"
          size={35}
          color="#fff"
          onPress={() => setOpen(true)}
        />
        <Avatar rounded source={Profile} size="small" />
        <Text style={styles.Ola}>
          Minhas <Text style={styles.NameUser}>reservas!</Text>
        </Text>
        <View style={styles.searchSection}>
          <Icon
            style={styles.searchIcon}
            name="search1"
            size={20}
            color="#000"
          />
          <TextInput
            style={styles.input}
            placeholder="Pesquisar Reserva"
            underlineColorAndroid="transparent"
            placeholderTextColor="#000"
            onChangeText={text => setMessage(text)}
            value={message}
          />
        </View>
      </View>
      <View style={styles.Lojas}>
        <Text style={styles.LojasLabel}>Últimas reservas::</Text>
        <ScrollView
          scrollEnabled={true}
          style={{height: 390}}
          showsVerticalScrollIndicator={false}>
          <ReservaList data={listaFiltrada} user={currentUser} />
        </ScrollView>
      </View>
      {open && <NewModal open={open} setOpen={setOpen} />}
    </View>
  );
}

const styles = StyleSheet.create({
  Screen: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#EBEBEB',
  },
  Topo: {
    backgroundColor: '#000',
    justifyContent: 'space-between',
    width: '100%',
    padding: 40,
  },
  Ola: {
    fontFamily: 'Gilroy-Bold',
    color: '#EBB21D',
    fontSize: 25,
    marginVertical: 15,
  },
  NameUser: {
    color: '#fff',
  },
  searchSection: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: 45,
    padding: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  searchIcon: {
    paddingRight: 15,
  },
  input: {
    flex: 1,
    paddingLeft: 16,
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 4,
  },
  MenuIcon: {
    position: 'absolute',
    right: 40,
    top: 45,
  },
  Lojas: {
    paddingTop: 28,
    paddingHorizontal: 40,
    backgroundColor: '#EBEBEB',
    paddingBottom: 15,
  },
  LojasLabel: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Barlow-Medium',
  },
  ScrollStyle: {
    maxHeight: '80%',
    marginTop: 5,
    marginBottom: 20,
  },
});
