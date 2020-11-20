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

import {format, parseISO} from 'date-fns';

import axiosInstance from '../../redux/api/axiosInstance';
import {useNavigation} from '@react-navigation/native';
import {set} from 'lodash';

export default function ReservaList({navigation, data, user}) {
  const [object, setObject] = useState([]);
  const navi = useNavigation();

  function handleNavigateCarrinho(detalhe) {
    navi.navigate('ReservaDetalhe', {
      cod_reserva: detalhe.cod_reserva,
      detalhe: detalhe,
    });
  }

  return (
    <>
      {data.map(peca => (
        <TouchableOpacity
          style={styles.Loja}
          onPress={() => handleNavigateCarrinho(peca)}
          key={peca.cod_reserva}>
          <View style={styles.divCod}>
            <Text style={styles.NomeLoja}>Reserva código:</Text>
            <Text style={styles.codReserva}>{peca.cod_reserva}</Text>
          </View>

          <Icon
            name="rightcircle"
            size={16}
            color="#000"
            style={{position: 'absolute', right: 22, top: 22}}
          />
          <Text style={styles.totalReserva}>
            Valor Total: R${peca.total_reserva},00
          </Text>
          <Text style={styles.dataReserva}>
            {format(parseISO(peca?.data_reserva), 'dd/MM/yyyy')}
          </Text>
        </TouchableOpacity>
      ))}
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
    height: 114,
    borderRadius: 7,
    padding: 22,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  divCod: {display: 'flex', flexDirection: 'column'},
  codReserva: {
    color: '#D89614',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    lineHeight: 22,
  },
  NomeLoja: {
    color: '#000',
    fontFamily: 'Barlow-SemiBold',
    fontSize: 13,
    lineHeight: 16,
    marginBottom: 5,
  },
  totalReserva: {
    color: '#919191',
    fontSize: 14,
    fontFamily: 'Barlow-Regular',
    lineHeight: 20,
  },
  dataReserva: {
    position: 'absolute',
    right: 22,
    bottom: 22,
    color: '#919191',
    fontSize: 14,
    fontFamily: 'Barlow-Regular',
    lineHeight: 20,
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
