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
} from 'react-native';
import {Button, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {ButtonLarge} from '../../components';
import {useDispatch, useSelector} from 'react-redux';

import axiosInstance from '../../redux/api/axiosInstance';

import Profile from '../../assets/images/profile2.jpg';

import {CarrinhoList, NewModal} from '../../components';

export default function Carrinho({navigation}) {
  const currentUser = useSelector(state => state.authReducer.currentUser);

  const dispatch = useDispatch();
  const [carrinho, setCarrinho] = useState([]);
  const [totalCarrinho, setTotalCarrinho] = useState([]);
  const [reserva, setReserva] = useState([]);
  const [idEndereco, setIdEndereco] = useState(null);
  const navi = useNavigation();

  useEffect(() => {
    handlePecas();
  }, []);

  useEffect(() => {
    carrinho.map(item =>
      setReserva(state => [
        ...state,
        {
          id_usuario: currentUser.id,
          id_loja: item.id_loja,
          id_produto: item.id_peca,
          quantidade: item.quantidade_no_carrinho,
          total: item.valor_peca * item.quantidade_no_carrinho,
          id_endereco: idEndereco,
        },
      ]),
    );
  }, [carrinho]);

  async function handlePecas() {
    try {
      setCarrinho([]);
      let carrinhoList = await axiosInstance.get(
        '/carrinho?id_usuario=' + currentUser.id,
      );
      setCarrinho(carrinhoList.data.data);
      setTotalCarrinho(carrinhoList.data.total);
    } catch (error) {
      console.log(error);
    }
  }

  function handleNavigateHome() {
    setReserva([]);
    navi.navigate('Principal');
  }

  function handleNavigateReserva() {
    setReserva([]);
    navi.navigate('Reservas');
  }

  async function handleReserva() {
    try {
      let response = await axiosInstance.post('/pecas/reserva', reserva);

      Alert.alert(
        'Sucesso!',
        response.data.message +
          ' Você já pode ver sua reserva ou voltar à tela inicial!',
        [
          {
            text: 'Voltar ao início',
            onPress: () => handleNavigateHome(),
          },
          {
            text: 'Ver reserva',
            onPress: () => handleNavigateReserva(),
          },
        ],
      );

      handlePecas();
    } catch (error) {
      console.log(error);
    }
  }

  const [open, setOpen] = useState(false);

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
          <Avatar rounded source={Profile} size="small" />
          <Text style={styles.Ola}>
            Meu <Text style={styles.NameUser}>carrinho!</Text>
          </Text>
        </View>
        <View style={styles.Lojas}>
          <CarrinhoList
            data={carrinho}
            total={totalCarrinho}
            user={currentUser}
            idEndereco={idEndereco}
            setIdEndereco={setIdEndereco}
          />
          <ButtonLarge text="Reservar" type="default" action={handleReserva} />
        </View>
        {open && <NewModal open={open} setOpen={setOpen} />}
      </View>
    </>
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
    paddingTop: 20,
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
