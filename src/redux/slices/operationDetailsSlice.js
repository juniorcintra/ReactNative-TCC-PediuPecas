// import {createSlice} from '@reduxjs/toolkit';
// import operation from '../../pages/OperationDetails/data';
// import {paginate} from '../../utils';

// const operationsSlice = createSlice({
//   name: 'operationDetails',
//   initialState: {
//     operation,
//     contract: '',
//     receipt: '',
//   },
//   reducers: {
//     setOperationDetails: (state, action) => {
//       state.operation = {
//         ...action.payload,
//         recebiveis: paginate(action.payload.recebiveis, 4),
//       };
//     },

//     unsetOperation: (state, action) => {
//       state.operation = operation;
//     },

//     setOperationContract: (state, action) => {
//       state.contract = action.payload;
//     },

//     setOperationReceipt: (state, action) => {
//       state.receipt = action.payload;
//     },
//   },
// });

// export const {
//   setOperationDetails,
//   setOperationContract,
//   setOperationReceipt,
//   unsetOperation,
// } = operationsSlice.actions;

// export default operationsSlice.reducer;
