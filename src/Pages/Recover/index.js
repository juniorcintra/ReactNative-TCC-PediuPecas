import 'react-native-gesture-handler';
import * as React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Recover({navigation}) {
  return (
    <View style={styles.container}>
      <Icon
        name="arrowleft"
        style={{color: '#fff', fontSize: 32}}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.DescText}>
        Informe seu e-mail para recuperar sua senha
      </Text>
      <Text style={styles.SubDesc}>
        Enviaremos um link no seu e-mail para recuperar sua senha
      </Text>
      <TextInput
        style={{
          width: '100%',
          height: 40,
          borderBottomColor: '#fff',
          borderWidth: 1,
          fontSize: 16,
          color: '#fff',
        }}
        placeholder="E-mail"
        placeholderTextColor="#fff"
        textContentType="emailAddress"
        autoCompleteType="email"
      />
      <Button
        title="Enviar"
        buttonStyle={[
          {
            backgroundColor: '#EBB21D',
            height: 53,
            borderRadius: 4,
          },
        ]}
        containerStyle={[{width: '100%'}]}
        titleStyle={{
          color: '#000',
          fontFamily: 'Gilroy-Bold',
        }}
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingVertical: 40,
    backgroundColor: '#000',
    paddingHorizontal: 45,
  },
  DescText: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'Gilroy-Bold',
    width: 300,
    height: 61,
    textAlign: 'left',
  },
  SubDesc: {
    color: '#C9C9C9',
    fontSize: 16,
    fontFamily: 'Barlow-Regular',
  },
});
