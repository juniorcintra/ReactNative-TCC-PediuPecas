import 'react-native-gesture-handler';
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

import {useDispatch, useSelector} from 'react-redux';

import axiosInstance from '../../redux/api/axiosInstance';

import Profile from '../../assets/images/profile2.jpg';

import {LojaList, NewModal} from '../../components';

import {getDistance} from 'geolib';

import {ButtonLarge} from '../../components';

import GetLocation from 'react-native-get-location';
import viacep from '../../redux/api/viacep';
import {set} from 'lodash';

export default function CadastroEndereco({navigation}) {
  const dispatch = useDispatch();
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [apelido, setApelido] = useState('');
  const [region, setRegion] = useState({});

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        setRegion(location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  const handleSend = async () => {
    const data = {
      id_usuario: currentUser.id,
      cep,
      rua,
      bairro,
      numero,
      complemento,
      cidade,
      uf,
      apelido,
      lat: region.latitude,
      long: region.longitude,
    };

    let response = await axiosInstance.post('cadastro/enderecos', data);
    Alert.alert(
      'Sucesso!',
      response.data.message +
        ' Você já pode ver sua reserva ou voltar à tela inicial!',
      [
        {
          text: 'Voltar ao perfil',
          onPress: () => navigation.goBack(),
        },
        {
          text: 'Novo endereço',
          onPress: () => close(),
        },
      ],
    );
  };

  const getEndCeo = async () => {
    try {
      let response = await fetch('https://viacep.com.br/ws/' + cep + '/json');
      let json = await response.json();
      setRua(json.logradouro);
      setBairro(json.bairro);
      setCidade(json.localidade);
      setUf(json.uf);
    } catch (error) {
      console.error(error);
    }
  };

  const [open, setOpen] = useState(false);

  const currentUser = useSelector(state => state.authReducer.currentUser);

  return (
    <>
      <View style={styles.Screen}>
        <View style={styles.Topo}>
          <Icon
            name="arrowleft"
            style={{color: '#fff', fontSize: 35, marginBottom: 25}}
            onPress={() => navigation.goBack()}
          />
          <View style={{flexDirection: 'row'}}>
            <Avatar rounded source={Profile} size="small" />
            <Text style={styles.PageTitle}>Novo Endereço</Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            alignContent: 'center',
            justifyContent: 'center',
          }}
          style={{marginVertical: 10, width: '100%', paddingHorizontal: 30}}>
          <Text style={styles.labelInput}>CEP</Text>
          <TextInput
            value={cep}
            onChangeText={value => setCep(value)}
            style={styles.input}
          />

          <Text style={styles.labelInput}>Rua</Text>
          <TextInput
            value={rua}
            onChangeText={value => setRua(value)}
            onFocus={getEndCeo}
            style={styles.input}
          />

          <Text style={styles.labelInput}>Bairro</Text>
          <TextInput
            value={bairro}
            onChangeText={value => setBairro(value)}
            style={styles.input}
          />

          <Text style={styles.labelInput}>Numero</Text>
          <TextInput
            value={numero}
            onChangeText={value => setNumero(value)}
            style={styles.input}
          />

          <Text style={styles.labelInput}>Complemento</Text>
          <TextInput
            value={complemento}
            onChangeText={value => setComplemento(value)}
            style={styles.input}
          />

          <Text style={styles.labelInput}>Cidade</Text>
          <TextInput
            value={cidade}
            onChangeText={value => setCidade(value)}
            style={styles.input}
          />

          <Text style={styles.labelInput}>UF</Text>
          <TextInput
            value={uf}
            onChangeText={value => setUf(value)}
            style={styles.input}
          />

          <Text style={styles.labelInput}>Apelido</Text>
          <TextInput
            value={apelido}
            onChangeText={value => setApelido(value)}
            style={styles.inputLast}
          />
        </ScrollView>
        <ButtonLarge action={handleSend} text="Enviar" type="default" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  Screen: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
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
  PageTitle: {
    fontFamily: 'Gilroy-Bold',
    color: '#EBB21D',
    fontSize: 25,
    marginLeft: 10,
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
    height: 36,
    paddingLeft: 6,
    borderColor: '#000000',
    color: '#000',
    borderRadius: 4,
    borderBottomWidth: 1,
  },
  inputLast: {
    height: 36,
    paddingLeft: 6,
    borderColor: '#000000',
    color: '#000',
    borderRadius: 4,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  labelInput: {
    fontSize: 14,
    fontFamily: 'Gilroy-Bold',
    marginVertical: 6,
  },
  MenuIcon: {
    position: 'absolute',
    right: 40,
    top: 45,
  },
  EnderecosContainer: {
    justifyContent: 'center',
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
  ProfileItemTitle: {
    color: '#000000',
    fontFamily: 'Gilroy-Bold',
    fontSize: 20,
  },
  ProfileItem: {
    color: '#757575',
    fontFamily: 'Gilroy-Bold',
    fontSize: 20,
  },
  ContainerPerfil: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  Loja: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 4,
    height: 150,
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
});
