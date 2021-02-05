import 'react-native-gesture-handler';
import * as React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ButtonDefault} from '../../components';

import ImageBack from '../../assets/images/background.png';
import imageLogo from '../../assets/images/logonova.png';

export default function Home({navigation}) {
  return (
    <ImageBackground source={ImageBack} style={styles.image}>
      <View style={styles.container}>
        <Image source={imageLogo} style={styles.logo} />
        <Text style={styles.DescText}>
          Encontre peças automotivas perto de você.
        </Text>
        <View style={styles.divBottom}>
          <ButtonDefault
            text="Cadastrar"
            type="light"
            action={() => navigation.navigate('Cadastro')}
          />
          <View style={styles.divLogin}>
            <Text style={styles.SubDesc}>Já possui uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.login}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxHeight: 600,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  DescText: {
    color: '#fff',
    fontSize: 22,
    lineHeight: 27,
    fontFamily: 'Gilroy-SemiBold',
    maxWidth: 220,
    height: 95,
    textAlign: 'center',
  },
  SubDesc: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Gilroy-Medium',
  },
  logo: {
    maxWidth: 260,
    maxHeight: 80,
  },
  divBottom: {
    width: 200,
    height: 90,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divLogin: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  login: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'Gilroy-Bold',
  },
});
