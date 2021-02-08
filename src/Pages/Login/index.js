import 'react-native-gesture-handler';
import * as React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {ButtonLarge} from '../../components';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {signIn} from '../../redux/middleware';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Login({navigation}) {
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.genericReducer.loading);
  const error = useSelector(state => state.genericReducer.error);

  const submitSignIn = data => {
    dispatch(signIn(data));
  };

  return (
    <View style={styles.container}>
      <Icon
        name="arrowleft"
        style={{color: '#fff', fontSize: 35}}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.DescText}>Digite seus dados para entrar</Text>
      <Text style={styles.SubDesc}>
        Preencha os campos com seu e-mail e senha.
      </Text>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Email inválido')
            .required(),
          password: Yup.string().required(),
        })}
        onSubmit={values => {
          submitSignIn(values);
        }}>
        {props => (
          <>
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
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={props.handleChange('email')}
              onBlur={props.handleBlur('email')}
              value={props.values.email}
            />
            {props.touched.name && props.errors.email ? (
              <Text style={styles.error}>{props.errors.email}</Text>
            ) : null}
            <TextInput
              style={{
                width: '100%',
                height: 40,
                borderBottomColor: '#fff',
                borderWidth: 1,
                fontSize: 16,
                color: '#fff',
              }}
              placeholder="Senha"
              placeholderTextColor="#fff"
              textContentType="password"
              autoCompleteType="password"
              secureTextEntry={true}
              onChangeText={props.handleChange('password')}
              onBlur={props.handleBlur('password')}
              value={props.values.password}
            />
            {props.touched.name && props.errors.password ? (
              <Text style={styles.error}>{props.errors.password}</Text>
            ) : null}
            <ButtonLarge
              text="Continuar"
              type="default"
              action={props.handleSubmit}
              loading={isLoading}
              disabled={props.isSubmitting}
            />
          </>
        )}
      </Formik>

      <Text
        style={styles.Esqueci}
        onPress={() => navigation.navigate('Recover')}>
        Esqueci minha senha
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingVertical: 40,
    backgroundColor: '#000',
    paddingHorizontal: 45,
  },
  DescText: {
    color: '#fff',
    fontSize: 28,
    fontFamily: 'Gilroy-Bold',
    width: '80%',
    height: 71,
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
