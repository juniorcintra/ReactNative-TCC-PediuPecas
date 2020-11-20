import 'react-native-gesture-handler';
import React, {useState} from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';

import setinha from '../../assets/images/setinhaloja.png';

const DATA = [];

export default function EnderecoList({data}) {
  const [showModal, setVisible] = useState(false);
  return (
    <>
      <FlatList
        key={data.id}
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.Loja}>
            <View>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.NomeLoja}>{item.rua}</Text>
                <Text style={styles.EnderecoLoja}>{item.cep}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
