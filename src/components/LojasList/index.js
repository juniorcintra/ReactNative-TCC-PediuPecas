import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import axiosInstance from '../../redux/api/axiosInstance';
import {useNavigation} from '@react-navigation/native';
import {getDistance} from 'geolib';
import GetLocation from 'react-native-get-location';
import {set} from 'lodash';

export default function LojaList({navigation, data, user}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [object, setObject] = useState([]);
  const [newValor, setNewValor] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [coordinates, setCoordinates] = useState({});
  const navi = useNavigation();

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        setCoordinates({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  function handleDistance(user, loja) {
    const distancia = getDistance(user, loja) / 1000;

    const newdist = parseFloat(distancia.toFixed(2));

    const distance = newdist.toString().replace('.', ',');

    return distance + 'km';
  }

  function handleShow(peca) {
    setObject(peca);
    setModalVisible(true);
  }

  function handleNavigateCarrinho() {
    setModalVisible(false);
    navi.navigate('Carrinho');
  }

  async function handleAdd(peca, qtd) {
    try {
      let info = {
        id_produto: object.id,
        quantidade: qtd,
        id_usuario: user.id,
      };

      const res = await axiosInstance.post('/carrinho', info);

      Alert.alert(
        'Sucesso!',
        res.data.message + ' Você já pode ver seus produtos no carrinho.',
        [
          {
            text: 'Continuar Comprando',
            onPress: () => setModalVisible(false),
          },
          {
            text: 'Ver carrinho',
            onPress: () => handleNavigateCarrinho(),
          },
        ],
      );

      setQuantidade(1);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {data.map(peca => (
        <TouchableOpacity
          style={styles.Loja}
          onPress={() => handleShow(peca)}
          key={peca.id}>
          <Text style={styles.NomeLoja}>{peca.titulo}</Text>
          <Icon
            name="rightcircle"
            size={28}
            color="#000"
            style={{position: 'absolute', right: 20, top: 30}}
          />
          <Text style={styles.EnderecoLoja}>R$ {peca.valor}</Text>
          <Text style={styles.EnderecoLoja}>{peca.marca}</Text>
          <Text style={styles.DistanciaLoja}>
            Aprox.{' '}
            {handleDistance(coordinates, {
              latitude: peca.latitude,
              longitude: peca.longitude,
            })}
          </Text>
        </TouchableOpacity>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0,0,0,0.7)',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}>
          <View
            style={{
              width: 300,
              height: 500,
              alignSelf: 'center',
              marginTop: 100,
              borderRadius: 15,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'column',
              }}>
              <View
                style={{
                  height: 300,
                  width: 300,
                  backgroundColor: '#ccc',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 20,
                }}>
                <Image
                  source={{uri: object.foto}}
                  style={{width: 300, height: 300}}
                />
              </View>
              <View
                style={{
                  height: 207,
                  width: '100%',
                  backgroundColor: '#eee',
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    width: '100%',
                  }}>
                  <Text style={styles.TituloPeca}>{object.titulo}</Text>
                  <Text style={styles.PrecoPeca}>R${object.valor}</Text>
                  <Text style={styles.DescricaoPeca}>{object.marca}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={{backgroundColor: '#000'}}
                      onPress={() => setQuantidade(quantidade - 1)}>
                      <Icon name="minus" color="#fff" size={32} />
                    </TouchableOpacity>
                    <Text
                      style={{
                        width: 40,
                        height: 32,
                        backgroundColor: '#fff',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        fontWeight: 'bold',
                        color: '#000',
                        fontSize: 18,
                      }}>
                      {quantidade}
                    </Text>
                    <TouchableOpacity
                      style={{backgroundColor: '#000'}}
                      onPress={() => setQuantidade(quantidade + 1)}>
                      <Icon name="plus" color="#fff" size={32} />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      backgroundColor: '#EBB21D',
                      padding: 15,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 20,
                    }}
                    onPress={() => handleAdd(object, quantidade)}>
                    <Text
                      style={{
                        color: '#000',
                        fontFamily: 'Gilroy-Bold',
                        fontSize: 16,
                      }}>
                      Adicionar ao carrinho
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: -10,
                  top: -10,
                  width: 35,
                  height: 35,
                  backgroundColor: '#EBB21D',
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Icon name="close" size={25} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  Loja: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 7,
    height: 110,
    paddingHorizontal: 25,
    paddingVertical: 20,
    marginVertical: 8,
  },
  NomeLoja: {
    color: '#000',
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
  },
  EnderecoLoja: {
    color: '#888',
    fontSize: 15,
    width: '60%',
    fontFamily: 'Barlow-Medium',
  },
  TituloPeca: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Barlow-Bold',
    marginVertical: 3,
  },
  PrecoPeca: {
    color: '#D19B1C',
    fontSize: 18,
    fontFamily: 'Barlow-Bold',
    marginVertical: 3,
  },
  DescricaoPeca: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Barlow-Medium',
    marginVertical: 3,
  },
  Classificacao: {
    position: 'absolute',
    right: 23,
    bottom: 18,
    color: '#D89614',
    fontSize: 16,
  },
  DistanciaLoja: {
    color: '#D89614',
    position: 'absolute',
    right: 20,
    bottom: 15,
    fontFamily: 'Barlow-Medium',
  },
});
