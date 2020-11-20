// import {
//   initLoading,
//   endLoading,
//   setError,
//   unsetError,
//   setSuccess,
//   unsetSuccess,
// } from '../slices/genericsSlice';
// // import axiosInstance from '../api/axiosInstance';
// import {unsetUser} from '../slices/userRegisterSlice';

// export const storeUser = user => {
//   return async dispatch => {
//     dispatch(initLoading());
//     try {
//       // let response = await axiosInstance.post('usuarios', user);
//       // let user = response.data;

//       setTimeout(() => {
//         if (user.email !== 'cintra.70@gmail.com') {
//           dispatch(unsetError());
//           dispatch(
//             setSuccess({
//               message: `Usuário ${user.nome} cadastrado com sucesso`,
//             }),
//           );
//           dispatch(unsetUser());
//           dispatch(endLoading());
//         }

//         if (user.email === 'cintra.70@gmail.com') {
//           dispatch(unsetSuccess());
//           dispatch(setError({message: 'Já existe um usuário com este e-mail'}));
//           dispatch(unsetUser());
//           dispatch(endLoading());
//         }
//       }, 3000);
//     } catch (error) {
//       dispatch(endLoading());
//     }
//   };
// };
