import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import {Button, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {ButtonLarge} from '../../components';
import {useDispatch, useSelector} from 'react-redux';

import axiosInstance from '../../redux/api/axiosInstance';

import Profile from '../../assets/images/profile2.jpg';

import {CarrinhoList, NewModal} from '../../components';

export default function Carrinho({route, navigation}) {
  const currentUser = useSelector(state => state.authReducer.currentUser);

  const dispatch = useDispatch();
  const [pecas, setPecas] = useState([]);
  const navi = useNavigation();
  const cod_reserva = route.params.cod_reserva;
  const detalheReserva = route.params.detalhe;

  useEffect(() => {
    handleReservaDetalhe();
  }, []);

  async function handleReservaDetalhe() {
    try {
      let pecasList = await axiosInstance.get(
        `/pecas/reserva/peca?cod_reserva=${cod_reserva}`,
      );
      setPecas(pecasList.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <View style={styles.Screen}>
        <View style={styles.Topo}>
          <Icon
            name="arrowleft"
            style={{color: '#fff', fontSize: 35}}
            onPress={() => navi.goBack()}
          />
          <Text style={styles.Ola}>
            Reserva: <Text style={styles.NameUser}>{cod_reserva}</Text>
          </Text>
        </View>
        <View style={styles.Lojas}>
          <Text style={styles.itensLabel}>Itens adicionados:</Text>
          <View style={styles.itensAdicionados}>
            <FlatList
              data={pecas}
              style={{maxHeight: 222}}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <>
                  <View style={styles.peca}>
                    <Text style={styles.nomePeca}>{item.titulo}</Text>
                    <Text style={styles.marcaPeca}>{item.marca}</Text>
                    <Text style={styles.nomeLoja}>{item.nome_loja}</Text>
                    <Text style={styles.nomeLoja}>R$ {item.valor}, 00</Text>
                    <Text style={styles.quantidade}>
                      Qtd.: {item.quantidade_reserva}
                    </Text>
                  </View>
                  <View
                    style={
                      index + 1 !== pecas.length
                        ? styles.separatorBlack
                        : styles.separatorWhite
                    }
                  />
                </>
              )}
            />
          </View>
          <View style={styles.divTotal}>
            <Text style={styles.labelTotal}>Valor total: </Text>
            <Text style={styles.valorTotal}>
              R$ {detalheReserva.total_reserva},00
            </Text>
          </View>
          <View style={styles.separatorBlackMargin} />
          <View style={styles.divEndereco}>
            <Text style={styles.labelApelido}>{detalheReserva.apelido}</Text>
            <View style={styles.detalheEndereco}>
              <Text style={styles.enderecoLinha}>
                {detalheReserva.rua}, Nº {detalheReserva.numero}
                {detalheReserva.complemento !== null
                  ? ', ' + detalheReserva.complemento + ' '
                  : ' '}
                - {detalheReserva.bairro}
              </Text>
              <Text style={styles.enderecoLinha}>
                {detalheReserva?.cidade}, {detalheReserva?.uf}
              </Text>
              <Text style={styles.enderecoLinha}>
                CEP: {detalheReserva?.cep}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
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
    padding: 40,
    backgroundColor: '#EBEBEB',
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
  itensLabel: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Barlow-Medium',
    lineHeight: 19,
  },
  itensAdicionados: {
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 23,
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 4,
  },
  peca: {
    width: '100%',
    height: 100,
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginTop: 12,
  },
  nomePeca: {
    fontFamily: 'Barlow-SemiBold',
    color: '#000',
    fontSize: 16,
    lineHeight: 19,
  },
  marcaPeca: {
    fontFamily: 'Barlow-SemiBold',
    color: '#D89614',
    fontSize: 14,
    lineHeight: 20,
  },
  nomeLoja: {
    fontFamily: 'Barlow-Regular',
    color: '#616161',
    fontSize: 14,
    lineHeight: 20,
  },
  quantidade: {
    position: 'absolute',
    right: 15,
    bottom: 10,
    fontFamily: 'Barlow-SemiBold',
    color: '#D89614',
    fontSize: 14,
    lineHeight: 20,
  },
  separatorBlack: {
    width: '100%',
    height: 1,
    backgroundColor: '#000',
  },
  separatorWhite: {
    width: '100%',
    height: 1,
    backgroundColor: '#fff',
  },
  divTotal: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelTotal: {
    fontFamily: 'Barlow-SemiBold',
    color: '#919191',
    fontSize: 16,
    lineHeight: 19,
  },
  valorTotal: {
    fontFamily: 'Barlow-SemiBold',
    color: '#000',
    fontSize: 16,
    lineHeight: 19,
  },
  separatorBlackMargin: {
    width: '100%',
    height: 1,
    backgroundColor: '#000',
    marginVertical: 22,
  },
  divEndereco: {
    width: '100%',
    height: 85,
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
