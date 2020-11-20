import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Button, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

import {useDispatch, useSelector} from 'react-redux';

import axiosInstance from '../../redux/api/axiosInstance';

import Profile from '../../assets/images/profile2.jpg';

import {LojaList, NewModal} from '../../components';

import {ButtonLarge} from '../../components';

export default function Perfil({navigation}) {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [enderecos, setEnderecos] = useState([]);

  useEffect(() => {
    setTimeout(function() {
      handleUser();
    }, 3000);
  }, []);

  async function handleUser() {
    try {
      let userList = await axiosInstance.get(
        `/user?id_usuario=${currentUser.id}`,
      );
      setUser(userList.data.data[0]);
      setEnderecos(userList.data.enderecos);
    } catch (error) {
      console.log(error);
    }
  }

  const [open, setOpen] = useState(false);

  const currentUser = useSelector(state => state.authReducer.currentUser);

  return (
    <>
      <View style={styles.Screen}>
        <View style={styles.Topo}>
          <Icon
            style={styles.MenuIcon}
            name="bars"
            size={35}
            color="#fff"
            onPress={() => setOpen(true)}
          />
          <View style={{flexDirection: 'row'}}>
            <Avatar rounded source={Profile} size="small" />
            <Text style={styles.PageTitle}>Perfil</Text>
          </View>

          <Text style={styles.Ola}>
            Olá <Text style={styles.NameUser}>{currentUser.name}!</Text>
          </Text>
        </View>
        <View style={styles.ContainerPerfil}>
          <Text style={styles.ProfileItemTitle}>Email:</Text>
          <Text style={styles.ProfileItem}>{currentUser.email}</Text>
        </View>
        <View style={styles.ContainerPerfil}>
          <Text style={styles.ProfileItemTitle}>Celular:</Text>
          <Text style={styles.ProfileItem}>{user.celular}</Text>
        </View>
        <View style={styles.ContainerPerfil}>
          <Text style={styles.ProfileItemTitle}>CPF:</Text>
          <Text style={styles.ProfileItem}>{user.cpf}</Text>
        </View>

        <View style={styles.ContainerPerfil}>
          <Text style={styles.ProfileItemTitle}>Endereços</Text>
        </View>
        <FlatList
          data={enderecos}
          style={{
            height: 227,
            width: '100%',
            display: 'flex',
            paddingHorizontal: 25,
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity style={styles.Loja}>
              <Text style={styles.labelApelido}>{item.apelido}</Text>
              <View style={styles.detalheEndereco}>
                <Text style={styles.enderecoLinha}>
                  {item.rua}, Nº {item.numero}
                  {item.complemento !== null
                    ? ', ' + item.complemento + ' '
                    : ' '}
                  - {item.bairro}
                </Text>
                <Text style={styles.enderecoLinha}>
                  {item.cidade}, {item.uf}
                </Text>
                <Text style={styles.enderecoLinha}>CEP: {item.cep}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <ButtonLarge
          action={() => navigation.navigate('CadastroEndereco')}
          text="Novo Endereço"
          type="default"
        />
      </View>
      {open && <NewModal open={open} setOpen={setOpen} />}
    </>
  );
}

const styles = StyleSheet.create({
  Screen: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
  },
  Topo: {
    backgroundColor: '#000',
    justifyContent: 'space-between',
    width: '100%',
    padding: 40,
    marginBottom: 25,
  },
  Ola: {
    fontFamily: 'Gilroy-Bold',
    color: '#EBB21D',
    fontSize: 25,
    marginTop: 15,
  },
  PageTitle: {
    fontFamily: 'Gilroy-Bold',
    color: '#EBB21D',
    fontSize: 25,
    marginLeft: 10,
  },
  NameUser: {
    color: '#fff',
  },
  MenuIcon: {
    position: 'absolute',
    right: 40,
    top: 45,
  },
  ProfileItemTitle: {
    color: '#000000',
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
  },
  ProfileItem: {
    color: '#757575',
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
    marginLeft: 12,
  },
  ContainerPerfil: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 25,
  },
  Loja: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 4,
    paddingHorizontal: 23,
    paddingVertical: 18,
    marginVertical: 10,
  },
  NomeLoja: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
    height: 25,
  },
  EnderecoLoja: {
    color: '#919191',
    fontSize: 14,
    lineHeight: 20,
    width: '60%',
  },
  Classificacao: {
    position: 'absolute',
    right: 10,
    bottom: 30,
    color: '#D89614',
    fontSize: 16,
  },
  divEndereco: {
    width: '100%',
    height: 100,
    display: 'flex',
    justifyContent: 'space-between',
  },
  labelApelido: {
    fontFamily: 'Barlow-Bold',
    color: '#616161',
    fontSize: 14,
    lineHeight: 20,
  },
  detalheEndereco: {
    display: 'flex',
    flexDirection: 'column',
  },
});
