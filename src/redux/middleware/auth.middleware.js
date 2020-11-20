import {
  initLoading,
  endLoading,
  setError,
  unsetError,
  setSuccess,
  unsetSuccess,
} from '../slices/genericsSlice';
import axiosInstance from '../api/axiosInstance';
import {setCurrentUser, unsetCurrentUser} from '../slices/authSlice';

export const signIn = user => {
  return async dispatch => {
    dispatch(initLoading());
    try {
      let response = await axiosInstance.post('/login', user);
      let apiUser = response.data.data;
      if (response.status == 200) {
        dispatch(setCurrentUser({user: apiUser}));
        dispatch(unsetError());
        dispatch(
          setSuccess({message: `Usuário ${user.email} logado com sucesso`}),
        );
        dispatch(endLoading());
      } else {
        console.log('Usuário ou senha incorreto');
        dispatch(unsetCurrentUser());
        dispatch(setError({message: 'Usuário ou senha incorreto'}));
        dispatch(unsetSuccess());
        dispatch(endLoading());
      }
    } catch (error) {
      console.log(error);
      dispatch(endLoading());
    }
  };
};

export const requestResetPassword = user => {
  return async dispatch => {
    dispatch(initLoading());
    try {
      // let response = await axiosInstance.post('request-reset-password', user);
      // let user = response.data;
      setTimeout(() => {
        if (user.cpf === TEMPORARY_USER.cpf) {
          dispatch(unsetError());
          dispatch(
            setSuccess({
              message:
                'Foi enviado um código de confirmação para o e-mail cadastrado.',
            }),
          );
          dispatch(endLoading());
        }

        if (user.cpf !== TEMPORARY_USER.cpf) {
          dispatch(setError({message: 'Usuário inexistente'}));
          dispatch(unsetSuccess());
          dispatch(endLoading());
        }
      }, 3000);
    } catch (error) {
      dispatch(endLoading());
    }
  };
};

export const createNewPassword = data => {
  return async dispatch => {
    dispatch(initLoading());
    try {
      // let response = await axiosInstance.post('request-reset-password', data);
      // let user = response.data;
      setTimeout(() => {
        if (data.codigo_confirmacao === TEMPORARY_CODE) {
          dispatch(unsetError());
          dispatch(
            setSuccess({
              message: 'Senha cadastrada com sucesso.',
            }),
          );
          dispatch(endLoading());
        }

        if (data.codigo_confirmacao !== TEMPORARY_CODE) {
          dispatch(setError({message: 'Código de confirmação inválido'}));
          dispatch(unsetSuccess());
          dispatch(endLoading());
        }
      }, 3000);
    } catch (error) {
      dispatch(endLoading());
    }
  };
};
