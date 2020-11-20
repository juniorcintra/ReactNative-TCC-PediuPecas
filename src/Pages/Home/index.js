import 'react-native-gesture-handler';
import * as React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ButtonDefault, Image} from '../../components';

import ImageBack from '../../assets/images/background.png';
import imageLogo from '../../assets/images/logo2.png';

export default function Home({navigation}) {
  return (
    <ImageBackground source={ImageBack} style={styles.image}>
      <View style={styles.container}>
        <Image image={imageLogo} width={104} height={117} />
        <Text style={styles.DescText}>
          Encontre peças automotivas perto de você.
        </Text>
        <Text style={styles.SubDesc}>Crie já sua conta grátis.</Text>
        <ButtonDefault
          text="Entrar"
          type="default"
          action={() => navigation.navigate('Login')}
        />
        <ButtonDefault
          text="Crie sua conta"
          type="light"
          action={() => navigation.navigate('Cadastro')}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 120,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  DescText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Gilroy-Bold',
    width: 190,
    height: 95,
    textAlign: 'center',
  },
  SubDesc: {
    color: '#C9C9C9',
    fontSize: 16,
    fontFamily: 'Barlow-Medium',
  },
});
