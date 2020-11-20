// import {
//   initLoading,
//   endLoading,
//   setError,
//   unsetError,
//   setSuccess,
//   unsetSuccess,
// } from '../slices/genericsSlice';
// // import axiosInstance from '../api/axiosInstance';
// import {
//   setCompaniesList,
//   setCurrentCompany,
//   updateCompany,
//   setSegmentsList,
//   setCaptureWaysList,
//   setCompaniesListOfDocuments,
// } from '../slices/companiesSlice';

// const temporaryCompanies = [
//   {
//     id: 1,
//     name: 'PADARIA SENSAÇÃO UN. 1',
//     cnpj: '04.186.453/0001-05',
//     usuarios: [
//       {
//         id: 1,
//         nome: 'Daniel Cintra',
//         email: 'cintra.70@gmail.com',
//         celular: '11933906518',
//         rg: '14563399',
//         cpf: '016.017.796-07',
//         senha: 'asdf123',
//         first_access: false,
//         accepted_terms: false,
//         type: 'master',
//         status: 'ativo',
//       },
//     ],
//     status: 'ativo',
//     aprovado: true,
//   },
//   {
//     id: 2,
//     name: 'PADARIA SENSAÇÃO UN. 2',
//     cnpj: '24.373.771/0001-92',
//     usuarios: [
//       {
//         id: 1,
//         nome: 'Daniel Cintra',
//         email: 'cintra.70@gmail.com',
//         celular: '11933906518',
//         rg: '14563399',
//         cpf: '016.017.796-07',
//         senha: 'asdf123',
//         first_access: false,
//         accepted_terms: false,
//         type: 'operador',
//         status: 'ativo',
//       },
//     ],
//     status: 'ativo',
//     aprovado: true,
//   },
//   {
//     id: 3,
//     name: 'PADARIA SENSAÇÃO UN. 3',
//     cnpj: '52.811.156/0001-56',
//     usuarios: [],
//     status: 'inativo',
//     aprovado: false,
//   },
//   {
//     id: 4,
//     name: 'PADARIA SENSAÇÃO UN. 4',
//     cnpj: '21.285.282/0001-90',
//     usuarios: [],
//     status: 'ativo',
//     aprovado: true,
//   },
//   {
//     id: 5,
//     name: 'PANIFICADORA ALFA',
//     cnpj: '016.017.796-07',
//     usuarios: [],
//     status: 'inativo',
//     aprovado: false,
//   },
// ];

// const temporarySegments = [
//   {id: 1, name: 'Comercial', checked: false},
//   {id: 2, name: 'Tecnologia da informação', checked: false},
//   {id: 3, name: 'Varejista', checked: false},
//   {id: 4, name: 'Mercado', checked: false},
//   {id: 5, name: 'Logista', checked: false},
//   {id: 6, name: 'Contabilidade', checked: false},
//   {id: 7, name: 'Seguros', checked: false},
//   {id: 8, name: 'Brinquedos', checked: false},
// ];

// const temporaryCaptureWays = [
//   {id: 1, name: 'Euismod', percentage: 0, checked: false},
//   {id: 2, name: 'Volutpat', percentage: 0, checked: false},
//   {id: 3, name: 'Blandit', percentage: 0, checked: false},
//   {id: 4, name: 'Sed', percentage: 0, checked: false},
//   {id: 5, name: 'Turpis', percentage: 0, checked: false},
// ];

// const temporaryCompanyListOfDocuments = [
//   {
//     id: 1,
//     name: 'Foto/Selfie',
//     checked: false,
//     type: {id: 1, description: 'Foto/Camera'},
//     group: {id: 1, description: 'Documentos Pessoais'},
//     content: null,
//   },
//   {
//     id: 2,
//     name: 'Documento pessoal',
//     checked: false,
//     type: {id: 2, description: 'Foto/Upload Livre'},
//     group: {id: 1, description: 'Documentos Pessoais'},
//     content: null,
//   },
//   {
//     id: 3,
//     name: 'Comprovante de endereço',
//     checked: false,
//     type: {id: 2, description: 'Foto/Upload Livre'},
//     group: {id: 1, description: 'Documentos Pessoais'},
//     content: null,
//   },
//   {
//     id: 4,
//     name: 'Contrato de social',
//     checked: false,
//     type: {id: 2, description: 'Foto/Upload Livre'},
//     group: {id: 2, description: 'Estabelecimento comercial'},
//     content: null,
//   },
//   {
//     id: 5,
//     name: 'Cartão CNPJ',
//     checked: false,
//     type: {id: 2, description: 'Foto/Upload Livre'},
//     group: {id: 2, description: 'Estabelecimento comercial'},
//     content: null,
//   },
//   {
//     id: 6,
//     name: 'Procuração',
//     checked: false,
//     type: {id: 2, description: 'Foto/Upload Livre'},
//     group: {id: 2, description: 'Estabelecimento comercial'},
//     content: null,
//   },
// ];

// export const getCompanies = () => {
//   return async dispatch => {
//     dispatch(initLoading());
//     try {
//       // let response = await axiosInstance.get('usuario/1/estabelecimentos');
//       // let operations = response.data;
//       setTimeout(() => {
//         dispatch(setCompaniesList({companiesList: temporaryCompanies}));
//         dispatch(endLoading());
//       }, 3000);
//     } catch (error) {
//       dispatch(endLoading());
//     }
//   };
// };

// const _findCompanyByDoc = (doc, type) => {
//   return temporaryCompanies.find(
//     company => company[type === 'pf' ? 'cpf' : 'cnpj'] === doc,
//   );
// };

// export const postCompanyDoc = company => {
//   return async dispatch => {
//     dispatch(initLoading());
//     try {
//       // let response = await axiosInstance.post('estabelecimentos/documento');
//       // let result = response.data;
//       setTimeout(async () => {
//         const findedCompany = _findCompanyByDoc(
//           company[company.type === 'pf' ? 'cpf' : 'cnpj'],
//           company.type,
//         );

//         console.log('[findedCompany]', findedCompany);

//         if (!findedCompany) {
//           console.log('[company]', company);
//           dispatch(unsetError());
//           dispatch(updateCompany({company}));
//           dispatch(
//             setSuccess({message: 'Não existe empresa com esse documento.'}),
//           );
//           dispatch(endLoading());
//         }

//         if (
//           findedCompany &&
//           findedCompany.status === 'inativo' &&
//           !findedCompany.aprovado
//         ) {
//           dispatch(unsetSuccess());
//           await dispatch(setCurrentCompany({company: findedCompany}));
//           dispatch(
//             setError({
//               message: 'Estabelecimento comercial aguardando validação.',
//             }),
//           );
//           dispatch(endLoading());
//         }

//         if (
//           findedCompany &&
//           findedCompany.status === 'ativo' &&
//           findedCompany.aprovado &&
//           findedCompany.usuarios.length > 0 &&
//           findedCompany.usuarios[0].cpf === '016.017.796-07' &&
//           findedCompany.usuarios[0].type === 'master'
//         ) {
//           dispatch(unsetSuccess());
//           dispatch(setCurrentCompany({company: findedCompany}));
//           dispatch(
//             setError({
//               message: 'Você já está vinculado ao Estabelecimento comercial.',
//             }),
//           );
//           dispatch(endLoading());
//         }

//         if (
//           findedCompany &&
//           findedCompany.status === 'ativo' &&
//           findedCompany.aprovado &&
//           findedCompany.usuarios.length > 0 &&
//           findedCompany.usuarios[0].cpf === '016.017.796-07' &&
//           findedCompany.usuarios[0].type === 'operador'
//         ) {
//           dispatch(unsetSuccess());
//           dispatch(setCurrentCompany({company: findedCompany}));
//           dispatch(
//             setError({
//               message: 'Estabelecimento comercial ativo.',
//               text:
//                 'Deseja solicitar ao usuário Master autorização para se vincuilar ao Estabelecimento comercial ?',
//             }),
//           );
//           dispatch(endLoading());
//         }

//         if (
//           findedCompany &&
//           findedCompany.status === 'ativo' &&
//           findedCompany.aprovado &&
//           findedCompany.usuarios.length === 0
//         ) {
//           dispatch(unsetSuccess());
//           dispatch(setCurrentCompany({company: findedCompany}));
//           dispatch(
//             setError({
//               message:
//                 'Não existe usuário Master para esse Estabelecimento comercial.',
//               text: 'Gostaria de se tornar o usuário Master?',
//             }),
//           );
//           dispatch(endLoading());
//         }
//       }, 3000);
//     } catch (error) {
//       dispatch(endLoading());
//     }
//   };
// };

// export const postCompanyData = company => {
//   return async dispatch => {
//     dispatch(initLoading());
//     try {
//       setTimeout(() => {
//         dispatch(updateCompany({company}));
//         dispatch(endLoading());
//       }, 3000);
//       // let response = await axiosInstance.get('ofertas');
//       // let operations = response.data;
//     } catch (error) {
//       dispatch(endLoading());
//     }
//   };
// };

// export const getCompaniesSegments = () => {
//   return async dispatch => {
//     dispatch(initLoading());
//     try {
//       // let response = await axiosInstance.get('usuario/1/estabelecimentos');
//       // let operations = response.data;
//       setTimeout(() => {
//         dispatch(setSegmentsList({segmentsList: temporarySegments}));
//         dispatch(endLoading());
//       }, 3000);
//     } catch (error) {
//       dispatch(endLoading());
//     }
//   };
// };

// export const getCompaniesCaptureWaysList = () => {
//   return async dispatch => {
//     dispatch(initLoading());
//     try {
//       // let response = await axiosInstance.get('usuario/1/estabelecimentos');
//       // let operations = response.data;
//       setTimeout(() => {
//         dispatch(setCaptureWaysList({captureWaysList: temporaryCaptureWays}));
//         dispatch(endLoading());
//       }, 3000);
//     } catch (error) {
//       dispatch(endLoading());
//     }
//   };
// };

// export const getCompaniesListOfDocuments = () => {
//   return async dispatch => {
//     dispatch(initLoading());
//     try {
//       // let response = await axiosInstance.get('usuario/1/estabelecimentos');
//       // let operations = response.data;
//       setTimeout(() => {
//         dispatch(
//           setCompaniesListOfDocuments({
//             listOfDocuments: temporaryCompanyListOfDocuments,
//           }),
//         );
//         dispatch(endLoading());
//       }, 3000);
//     } catch (error) {
//       dispatch(endLoading());
//     }
//   };
// };
