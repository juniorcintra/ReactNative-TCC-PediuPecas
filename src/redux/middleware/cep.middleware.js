import {initLoading, endLoading} from '../slices/genericsSlice';
import {setEndereco} from '../slices/cepSlice';
import viacep from '../api/viacep';

export const searchCep = cep => {
  console.log('cep', cep);
  return async dispatch => {
    dispatch(initLoading());
    try {
      const normalizedCep = cep.replace('-', '').replace('.', '');
      const response = await viacep.get(`${normalizedCep}/json`);
      const endereco = response.data;
      console.log('endereco', endereco);
      dispatch(setEndereco(endereco));
      dispatch(endLoading());
    } catch (error) {
      dispatch(endLoading());
    }
  };
};
