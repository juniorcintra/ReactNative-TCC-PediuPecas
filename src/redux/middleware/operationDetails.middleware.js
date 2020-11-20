// import {initLoading, endLoading} from '../slices/genericsSlice';
// import axiosInstanceProduction from '../api/axiosInstanceProduction';
// import {
//   setOperationDetails,
//   setOperationContract,
//   setOperationReceipt,
// } from '../slices/operationDetailsSlice';

// // Api Middleware Requests
// export const getOperationDetails = operationId => {
//   return async dispatch => {
//     dispatch(initLoading());
//     try {
//       let response = await axiosInstanceProduction.get(
//         `ofertas/${operationId}`,
//       );
//       let operationDetails = response.data;
//       dispatch(setOperationDetails(operationDetails));
//       dispatch(endLoading());
//     } catch (error) {
//       dispatch(endLoading());
//     }
//   };
// };

// export const getOperationContract = operationId => {
//   return async dispatch => {
//     dispatch(initLoading());
//     try {
//       let response = await axiosInstanceProduction.get(
//         `ofertas/${operationId}/contrato`,
//       );
//       let contract = response.data;
//       dispatch(setOperationContract(contract));
//       dispatch(endLoading());
//     } catch (error) {
//       dispatch(endLoading());
//     }
//   };
// };

// export const getOperationReceipt = operationId => {
//   return async dispatch => {
//     dispatch(initLoading());
//     try {
//       let response = await axiosInstanceProduction.get(
//         `ofertas/${operationId}/comprovante-liquidacao`,
//       );
//       let receipt = response.data;
//       dispatch(setOperationReceipt(receipt));
//       dispatch(endLoading());
//     } catch (error) {
//       dispatch(endLoading());
//     }
//   };
// };
