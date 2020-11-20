import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  Modal,
  View,
} from 'react-native';
import {Button, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

import axiosInstance from '../../redux/api/axiosInstance';

import setinha from '../../assets/images/setinhaloja.png';
import {ScrollView} from 'react-native-gesture-handler';

export default function CarrinhoList({
  data,
  total,
  user,
  idEndereco,
  setIdEndereco,
}) {
  const [showModal, setVisible] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [enderecos, setEnderecos] = useState([]);
  const [endereco, setEndereco] = useState(null);

  async function handleUser() {
    try {
      let userResp = await axiosInstance.get('/user?id_usuario=' + user.id);
      setUserDetail(userResp.data.data);
      setEnderecos(userResp.data.enderecos);
    } catch (error) {
      console.log(error);
    }
  }

  if (enderecos.length) {
    setIdEndereco(enderecos[0].id);
  }

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <>
      <Text style={styles.itensLabel}>Itens adicionados:</Text>

      <View style={styles.itensAdicionados}>
        <FlatList
          key={data.id}
          data={data}
          style={{maxHeight: 222}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <>
              <View style={styles.peca}>
                <Text style={styles.nomePeca}>{item.nome_peca}</Text>
                <Text style={styles.marcaPeca}>{item.marca_peca}</Text>
                <Text style={styles.nomeLoja}>{item.nome_loja}</Text>
                <Text style={styles.nomeLoja}>R$ {item.valor_peca}, 00</Text>
                <Text style={styles.quantidade}>
                  Qtd.: {item.quantidade_no_carrinho}
                </Text>
              </View>
              <View
                style={
                  index + 1 !== data.length
                    ? styles.separatorBlack
                    : styles.separatorWhite
                }
              />
            </>
          )}
        />
      </View>
      <ScrollView style={{marginBottom: 20}}>
        <View style={styles.divTotal}>
          <Text style={styles.labelTotal}>Valor total: </Text>
          <Text style={styles.valorTotal}>R$ {total?.total_carrinho},00</Text>
        </View>
        <View style={styles.separatorBlackMargin} />
        <View style={styles.divEndereco}>
          <Text style={styles.labelApelido}>
            {endereco ? endereco.apelido : enderecos[0]?.apelido}{' '}
          </Text>
          {endereco ? (
            <View style={styles.detalheEndereco}>
              <Text style={styles.enderecoLinha}>
                {endereco.rua}, {endereco.numero} - {endereco.bairro}
              </Text>
              <Text style={styles.enderecoLinha}>
                {endereco.cidade}, {endereco.uf}
              </Text>
              <Text style={styles.enderecoLinha}>CEP: {endereco.cep}</Text>
            </View>
          ) : (
            <View style={styles.detalheEndereco}>
              <Text style={styles.enderecoLinha}>
                {enderecos[0]?.rua}, {enderecos[0]?.numero} -{' '}
                {enderecos[0]?.bairro}
              </Text>
              <Text style={styles.enderecoLinha}>
                {enderecos[0]?.cidade}, {enderecos[0]?.uf}
              </Text>
              <Text style={styles.enderecoLinha}>CEP: {enderecos[0]?.cep}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
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
