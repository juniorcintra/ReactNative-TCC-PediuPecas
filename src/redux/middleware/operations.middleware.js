// import {initLoading, endLoading} from '../slices/genericsSlice';
// import axiosInstanceProduction from '../api/axiosInstanceProduction';
// import {setOperations} from '../slices/operationsSlice';

// export const getOperations = () => {
//   return async dispatch => {
//     dispatch(initLoading());
//     try {
//       let response = await axiosInstanceProduction.get('ofertas');
//       let operations = response.data;
//       dispatch(setOperations(operations));
//       dispatch(endLoading());
//     } catch (error) {
//       dispatch(endLoading());
//     }
//   };
// };
