// import {createSlice} from '@reduxjs/toolkit';
// import {orderBy} from 'lodash';

// const companyModel = {
//   id: '',
//   nome: '',
//   cpf: '',
//   rg: '',
//   cnpj: '',
//   type: '',
//   razaoSocial: '',
//   nomeFantasia: '',
//   cep: '',
//   endereco: '',
//   numero: '',
//   complemento: '',
//   cidade: '',
//   estado: '',
//   bairro: '',
//   responsible: false,
// };

// const companiesSlice = createSlice({
//   name: 'companies',
//   initialState: {
//     companiesList: [],
//     currentCompany: companyModel,
//     company: companyModel,
//     segmentsList: [],
//     filteredSegmentsList: [],
//     captureWaysList: [],
//     listOfDocuments: [],
//   },
//   reducers: {
//     setCurrentCompany: {
//       reducer(state, action) {
//         state.currentCompany = action.payload.company;
//       },
//       prepare({company}) {
//         return {payload: {company}};
//       },
//     },

//     unsetCurrentCompany: (state, action) => {
//       state.currentCompany = companyModel;
//     },

//     setCompaniesList: {
//       reducer(state, action) {
//         state.companiesList = action.payload.companiesList;
//       },
//       prepare({companiesList}) {
//         return {payload: {companiesList}};
//       },
//     },

//     setSegmentsList: {
//       reducer(state, action) {
//         state.segmentsList = action.payload.segmentsList;
//         state.filteredSegmentsList = action.payload.segmentsList;
//       },
//       prepare({segmentsList}) {
//         return {payload: {segmentsList}};
//       },
//     },

//     setCaptureWaysList: {
//       reducer(state, action) {
//         state.captureWaysList = action.payload.captureWaysList;
//       },
//       prepare({captureWaysList}) {
//         return {payload: {captureWaysList}};
//       },
//     },

//     setCompaniesListOfDocuments: {
//       reducer(state, action) {
//         state.listOfDocuments = action.payload.listOfDocuments;
//       },
//       prepare({listOfDocuments}) {
//         return {payload: {listOfDocuments}};
//       },
//     },

//     updateCaptureWaysList: {
//       reducer(state, action) {
//         state.captureWaysList = action.payload.captureWaysList;
//       },
//       prepare(captureWaysList) {
//         return {payload: {captureWaysList}};
//       },
//     },

//     toggleCaptureWayChecked: {
//       reducer(state, action) {
//         state.captureWaysList.forEach(captureWay => {
//           if (captureWay.id === action.payload.captureWay) {
//             captureWay.checked = !captureWay.checked;
//           }
//         });
//       },
//       prepare(captureWay) {
//         return {payload: {captureWay}};
//       },
//     },

//     setCompany: {
//       reducer(state, action) {
//         state.company = action.payload.company;
//       },
//       prepare({company}) {
//         return {payload: {company}};
//       },
//     },

//     updateCompany: {
//       reducer(state, action) {
//         state.company = {...state.company, ...action.payload.company};
//       },
//       prepare({company}) {
//         return {payload: {company}};
//       },
//     },

//     unsetCompany: (state, action) => {
//       state.company = companyModel;
//     },

//     toggleSegmentChecked: {
//       reducer(state, action) {
//         console.log('[segment id]', action.payload.segment);
//         state.filteredSegmentsList.forEach(segment => {
//           if (segment.id === action.payload.segment) {
//             segment.checked = !segment.checked;
//           }
//         });
//       },
//       prepare(segment) {
//         return {payload: {segment}};
//       },
//     },

//     orderSegments: {
//       reducer(state, action) {
//         console.log('[order]', action.payload.type);
//         state.filteredSegmentsList = orderBy(
//           state.filteredSegmentsList,
//           ['name'],
//           [action.payload.type],
//         );
//       },
//       prepare(type) {
//         return {payload: {type}};
//       },
//     },

//     filterSegments: {
//       reducer(state, action) {
//         const filter = action.payload.filter;
//         state.filteredSegmentsList = state.segmentsList;
//         if (filter) {
//           state.filteredSegmentsList = state.segmentsList.filter(segment => {
//             return segment.name.indexOf(filter) >= 0;
//           });
//         }
//       },
//       prepare(filter) {
//         return {payload: {filter}};
//       },
//     },
//   },
// });

// export const {
//   setCurrentCompany,
//   unsetCurrentCompany,
//   setCompaniesList,
//   setCompany,
//   unsetCompany,
//   updateCompany,
//   setSegmentsList,
//   toggleSegmentChecked,
//   orderSegments,
//   filterSegments,
//   setCaptureWaysList,
//   toggleCaptureWayChecked,
//   updateCaptureWaysList,
//   setCompaniesListOfDocuments,
// } = companiesSlice.actions;

// export default companiesSlice.reducer;
