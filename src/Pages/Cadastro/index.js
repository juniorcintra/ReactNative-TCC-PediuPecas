import 'react-native-gesture-handler';
import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {ButtonLarge} from '../../components';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {Formik, ErrorMessage} from 'formik';
import ViewPager from '@react-native-community/viewpager';
import * as Yup from 'yup';
import axiosInstance from '../../redux/api/axiosInstance';

export default function Cadastro() {
  const [loading, setLoading] = useState(false);
  const [iconPassword, setIconPassword] = useState('eye');
  const [iconConfirmPass, setIconConfirmPass] = useState('eye');
  const [visiblePass, setVisiblePass] = useState(true);
  const [visibleConfirmPass, setVisibleConfirmPass] = useState(true);

  const viewPager = useRef(null);

  const navigaton = useNavigation();

  function continuar(page) {
    viewPager.current.setPage(page);
  }

  async function sendCadastro(data) {
    try {
      setLoading(true);
      let response = await axiosInstance.post('/cadastro', data);
      alert(response.data.message);
      setLoading(false);
      navigaton.navigate('Login');
    } catch (e) {
      console.log('erro no cadastro', e);
    }
  }
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 25}}>
        <Icon
          name="arrowleft"
          style={{color: '#fff', fontSize: 35, marginBottom: 25}}
          onPress={() => navigaton.goBack()}
        />
        <Text style={styles.DescText}>Crie sua conta</Text>
        <Text style={styles.SubDesc}>
          Preencha os campos abaixo com seus dados.
        </Text>
      </View>
      <Formik
        initialValues={{
          nome: '',
          email: '',
          celular: '',
          password: '',
          confirmPassword: '',
          cpf: '',
        }}
        validationSchema={Yup.object({
          nome: Yup.string()
            .notRequired()
            .min(3, 'O nome deve ter mais de 3 letras'),
          email: Yup.string()
            .email()
            .required('Email inválido'),
          celular: Yup.string(),
          password: Yup.string()
            .required()
            .min(6, 'A senha deve ter pelo menos 6 caracteres'),
          confirmPassword: Yup.string()
            .required()
            .test('passwords-match', 'As senhas devem ser iguais', function(
              value,
            ) {
              if (this.parent.password !== value) {
                return viewPager.current.setPage(0);
              }
              return this.parent.password === value;
            }),
        })}
        onSubmit={values => {
          sendCadastro(values);
        }}>
        {props => (
          <>
            <ViewPager
              onPageScroll={params => {
                const {offset, position} = params.nativeEvent;
                if (offset !== 0) {
                  return;
                }

                continuar(position);
              }}
              ref={viewPager}
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                alignItems: 'center',
              }}
              orientation="horizontal"
              initialPage={0}>
              <View
                key="1"
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ScrollView style={{paddingHorizontal: 25}}>
                  <TextInput
                    style={{
                      width: '100%',
                      borderBottomColor: '#fff',
                      borderWidth: 1,
                      fontSize: 18,
                      color: '#fff',
                      marginVertical: 20,
                    }}
                    placeholder="E-mail"
                    placeholderTextColor="#fff"
                    textContentType="emailAddress"
                    autoCompleteType="email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                    value={props.values.email}
                  />
                  {props.touched.email && props.errors.email ? (
                    <Text style={styles.error}>{props.errors.email}</Text>
                  ) : null}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <TextInput
                      style={{
                        width: '85%',
                        height: 60,
                        borderBottomColor: '#fff',
                        borderWidth: 1,
                        fontSize: 18,
                        color: '#fff',
                        marginVertical: 20,
                      }}
                      placeholder="Senha"
                      placeholderTextColor="#fff"
                      textContentType="password"
                      autoCompleteType="password"
                      secureTextEntry={visiblePass}
                      onChangeText={props.handleChange('password')}
                      onBlur={props.handleBlur('password')}
                      value={props.values.password}
                    />
                    <TouchableOpacity
                      style={{
                        width: '15%',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                      }}
                      onPress={() => {
                        if (visiblePass) {
                          setIconPassword('eye-off');
                          setVisiblePass(false);
                        } else {
                          setIconPassword('eye');
                          setVisiblePass(true);
                        }
                      }}>
                      <Feather
                        name={iconPassword}
                        style={{color: '#fff', fontSize: 24}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 40,
                    }}>
                    <TextInput
                      style={{
                        width: '85%',
                        height: 60,
                        borderBottomColor: '#fff',
                        borderWidth: 1,
                        fontSize: 18,
                        color: '#fff',
                        marginTop: 20,
                        marginBottom: 30,
                      }}
                      placeholder="Confirmar Senha"
                      placeholderTextColor="#fff"
                      textContentType="password"
                      autoCompleteType="password"
                      secureTextEntry={visibleConfirmPass}
                      onChangeText={props.handleChange('confirmPassword')}
                      onBlur={props.handleBlur('confirmPassword')}
                      value={props.values.confirmPassword}
                    />
                    <TouchableOpacity
                      style={{
                        width: '15%',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                      }}
                      onPress={() => {
                        if (visibleConfirmPass) {
                          setIconConfirmPass('eye-off');
                          setVisibleConfirmPass(false);
                        } else {
                          setIconConfirmPass('eye');
                          setVisibleConfirmPass(true);
                        }
                      }}>
                      <Feather
                        name={iconConfirmPass}
                        style={{color: '#fff', fontSize: 24}}
                      />
                    </TouchableOpacity>
                  </View>
                  {props.touched['confirmPassword'] &&
                  props.errors['confirmPassword'] ? (
                    <Text style={{color: '#ff0000', paddingBottom: 10}}>
                      {props.errors['confirmPassword']}
                    </Text>
                  ) : null}
                  <ButtonLarge
                    text="Continuar"
                    type="default"
                    action={() => continuar(1)}
                    loading={loading}
                  />
                </ScrollView>
              </View>
              <View
                key="2"
                style={{
                  width: '100%',
                }}>
                <ScrollView style={{paddingHorizontal: 20}}>
                  <TextInput
                    style={{
                      width: '100%',
                      borderBottomColor: '#fff',
                      borderWidth: 1,
                      fontSize: 18,
                      color: '#fff',
                      marginVertical: 20,
                    }}
                    placeholder="Seu Nome"
                    placeholderTextColor="#fff"
                    textContentType="name"
                    autoCompleteType="name"
                    onChangeText={props.handleChange('nome')}
                    onBlur={props.handleBlur('nome')}
                    value={props.values.nome}
                  />
                  {props.touched.nome && props.errors.nome ? (
                    <Text style={{color: '#fff'}}>{props.errors.nome}</Text>
                  ) : null}
                  <TextInput
                    style={{
                      width: '100%',
                      height: 60,
                      borderBottomColor: '#fff',
                      borderWidth: 1,
                      fontSize: 18,
                      color: '#fff',
                      marginVertical: 20,
                    }}
                    placeholder="Celular (DDD + Número)"
                    placeholderTextColor="#fff"
                    textContentType="telephoneNumber"
                    autoCompleteType="tel"
                    keyboardType="numeric"
                    onChangeText={props.handleChange('celular')}
                    onBlur={props.handleBlur('celular')}
                    value={props.values.celular}
                  />
                  {props.touched.celular && props.errors.celular ? (
                    <Text style={styles.error}>{props.errors.celular}</Text>
                  ) : null}

                  <TextInput
                    style={{
                      width: '100%',
                      height: 60,
                      borderBottomColor: '#fff',
                      borderWidth: 1,
                      fontSize: 18,
                      color: '#fff',
                      marginTop: 20,
                      marginBottom: 70,
                    }}
                    placeholder="CPF"
                    placeholderTextColor="#fff"
                    textContentType="none"
                    autoCompleteType="off"
                    keyboardType="numeric"
                    onChangeText={props.handleChange('cpf')}
                    onBlur={props.handleBlur('cpf')}
                    value={props.values.cpf}
                    maxLength={15}
                  />
                  {props.touched.cpf && props.errors.cpf ? (
                    <Text style={styles.error}>{props.errors.cpf}</Text>
                  ) : null}

                  <ButtonLarge
                    text="Cadastrar"
                    type="default"
                    action={props.handleSubmit}
                    loading={loading}
                  />
                </ScrollView>
              </View>
            </ViewPager>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingTop: 50,
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  DescText: {
    color: '#fff',
    fontSize: 28,
    fontFamily: 'Gilroy-Bold',
    width: 207,
    height: 61,
    textAlign: 'left',
  },
  SubDesc: {
    color: '#C9C9C9',
    fontSize: 16,
    fontFamily: 'Barlow-Regular',
  },
  Esqueci: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
