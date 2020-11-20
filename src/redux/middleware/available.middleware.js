// import {initLoading, endLoading} from '../slices/genericsSlice';
// import axiosInstance from '../api/axiosInstance';
// import {setAvailableTotal} from '../slices/availableSlice';

// export const getAvailableTotal = () => {
//   return async dispatch => {
//     dispatch(initLoading());
//     try {
//       let response = await axiosInstance.get('saldo');
//       let availableTotal = response.data.saldo;
//       dispatch(setAvailableTotal({availableTotal}));
//       dispatch(endLoading());
//     } catch (error) {
//       dispatch(endLoading());
//     }
//   };
// };
