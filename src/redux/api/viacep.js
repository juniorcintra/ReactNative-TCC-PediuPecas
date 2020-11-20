import axios from 'axios';

const viacep = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
});

const interceptResponse = response => {
  console.log('Busca de cep realizada com sucesso.');
  return response;
};

const interceptResponseError = error => {
  console.log('Houve um ou mais erros ao buscar o cep.');

  Promise.reject(error);
};

viacep.interceptors.response.use(interceptResponse, interceptResponseError);

export default viacep;
