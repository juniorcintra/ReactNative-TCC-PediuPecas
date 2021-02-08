import 'react-native-gesture-handler';
import * as React from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ButtonDefault} from '../../components';

import styles from './styles';

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
