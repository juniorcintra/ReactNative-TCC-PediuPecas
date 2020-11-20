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

import {useDispatch, useSelector} from 'react-redux';

import axiosInstance from '../../redux/api/axiosInstance';

import Profile from '../../assets/images/profile2.jpg';

import {LojaList, NewModal} from '../../components';

export default function Principal({navigation}) {
  const dispatch = useDispatch();
  const [pecas, setPecas] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    handlePecas();
  }, []);

  async function handlePecas() {
    try {
      let pecasList = await axiosInstance.get('/pecas');
      setPecas(pecasList.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  let listaFiltrada = pecas.filter(function(value) {
    function removerAcentos(newStringComAcento) {
      var string = newStringComAcento;
      var mapaAcentosHex = {
        a: /[\xE0-\xE6]/g,
        e: /[\xE8-\xEB]/g,
        i: /[\xEC-\xEF]/g,
        o: /[\xF2-\xF6]/g,
        u: /[\xF9-\xFC]/g,
        c: /\xE7/g,
        n: /\xF1/g,
      };

      for (var letra in mapaAcentosHex) {
        var expressaoRegular = mapaAcentosHex[letra];
        string = string.replace(expressaoRegular, letra);
      }

      return string;
    }

    let semAcento = removerAcentos(value.titulo);

    if (message.match(/^.*[^a-zA-Z 0-9]+.*$/g)) {
      return value.titulo.toUpperCase().includes(message.toUpperCase());
    } else {
      return semAcento.toUpperCase().includes(message.toUpperCase());
    }
  });

  const currentUser = useSelector(state => state.authReducer.currentUser);

  const [open, setOpen] = useState(false);

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
          Olá <Text style={styles.NameUser}>{currentUser.name}!</Text>
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
            placeholder="O que voce procura?"
            underlineColorAndroid="transparent"
            placeholderTextColor="#000"
            onChangeText={text => setMessage(text)}
            value={message}
          />
        </View>
      </View>
      <View style={styles.Lojas}>
        <Text style={styles.LojasLabel}>Peças Disponíveis:</Text>
        <ScrollView
          scrollEnabled={true}
          style={{height: 380, backgroundColor: '#EBEBEB'}}
          showsVerticalScrollIndicator={false}>
          <LojaList data={listaFiltrada} user={currentUser} />
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
  },
  Topo: {
    backgroundColor: '#000',
    justifyContent: 'space-between',
    width: '100%',
    padding: 40,
  },
  Ola: {
    fontFamily: 'Gilroy-Bold',
    color: '#F5B316',
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
  },
  ScrollStyle: {
    maxHeight: '80%',
    marginTop: 5,
    marginBottom: 20,
  },
});
