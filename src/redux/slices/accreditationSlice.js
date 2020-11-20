// import {createSlice} from '@reduxjs/toolkit';
// import {arrayOfFilteredAccreditationList} from '../../pages/SimulatePrice/data';
// import {isAfter, isBefore, isEqual} from 'date-fns';
// import {brl2Int} from '../../utils/real';
// import {groupBy} from 'lodash';

// const transformDate = date => {
//   const newDate = date.split('/');
//   return `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
// };

// const getDefaultCheckedAccreditation = accreditationList => {
//   return accreditationList.map((e, ex) => {
//     e.id = ex;
//     e.checked = true;
//     e.valor = 0;
//     e.arranjos.map((el, elx) => {
//       el.id = elx;
//       el.checked = true;
//       el.valor = 0;
//       el.recebiveis.map(elem => {
//         elem.valorParcial = elem.valor;
//         el.valor += elem.valorParcial;
//         return elem;
//       });
//       el.valorParcial = el.valor;
//       e.valor += el.valor;
//       return el;
//     });
//     e.valorParcial = e.valor;
//     return e;
//   });
// };

// const accreditationSlice = createSlice({
//   name: 'accreditation',
//   initialState: {
//     accreditationList: [
//       {
//         id: '',
//         arranjos: [],
//       },
//     ],
//     filteredAccreditationList: [
//       {
//         id: '',
//         arranjos: [],
//       },
//     ],
//     modify: 0,
//   },
//   reducers: {
//     setAccreditation: {
//       reducer(state, action) {
//         state.accreditationList = action.payload.accreditations;
//         state.filteredAccreditationList = action.payload.accreditations;
//         state.modify = 1;
//       },
//       prepare({accreditations}) {
//         return {payload: {accreditations}};
//       },
//     },

//     filterAccreditation: {
//       reducer(state, action) {
//         const filter = action.payload.filter;
//         const list = state.accreditationList;
//         const filtered = [];

//         if (
//           filter &&
//           filter.type === 'date' &&
//           !filter.leftDate &&
//           !filter.rightDate
//         ) {
//           state.filteredAccreditationList = getDefaultCheckedAccreditation(
//             state.accreditationList,
//           );
//         }

//         if (filter && filter.type === 'value' && !filter.valueTextField) {
//           state.filteredAccreditationList = getDefaultCheckedAccreditation(
//             state.accreditationList,
//           );
//         }

//         if (
//           filter &&
//           filter.type === 'date' &&
//           filter.leftDate &&
//           filter.rightDate
//         ) {
//           list.forEach((accreditation, i) => {
//             if (accreditation.arranjos.length > 0) {
//               const arranjos = [];
//               accreditation.arranjos.forEach((arrangement, j) => {
//                 if (arrangement.recebiveis.length > 0) {
//                   const recebiveis = [];
//                   arrangement.recebiveis.forEach((receivable, k) => {
//                     const rd = new Date(receivable.dataLiquidacao);
//                     const leftDate = new Date(transformDate(filter.leftDate));
//                     const rightDate = new Date(transformDate(filter.rightDate));

//                     if (
//                       (isAfter(rd.getTime(), leftDate.getTime()) ||
//                         isEqual(rd.getTime(), leftDate.getTime())) &&
//                       (isBefore(rd.getTime(), rightDate.getTime()) ||
//                         isEqual(rd.getTime(), rightDate.getTime()))
//                     ) {
//                       recebiveis.push(receivable);
//                     }
//                   });

//                   if (recebiveis.length > 0) {
//                     arranjos.push({...arrangement, recebiveis});
//                   }
//                 }
//               });

//               if (arranjos.length > 0) {
//                 filtered.push({...accreditation, arranjos});
//               }
//             }
//           });

//           console.log('filtered', JSON.stringify(filtered));

//           state.filteredAccreditationList = getDefaultCheckedAccreditation(
//             filtered,
//           );
//         }

//         if (filter && filter.type === 'value' && filter.valueTextField) {
//           list.forEach((accreditation, i) => {
//             if (accreditation.arranjos.length > 0) {
//               const arranjos = [];
//               accreditation.arranjos.forEach((arrangement, j) => {
//                 const recebiveis = [];
//                 if (arrangement.recebiveis.length > 0) {
//                   arrangement.recebiveis.forEach((receivable, k) => {
//                     if (receivable.valor <= filter.valueTextField) {
//                       recebiveis.push(receivable);
//                     }
//                   });

//                   if (recebiveis.length > 0) {
//                     arranjos.push({...arrangement, recebiveis});
//                   }
//                 }
//               });

//               if (arranjos.length > 0) {
//                 filtered.push({...accreditation, arranjos});
//               }
//             }
//           });

//           console.log('filtered', JSON.stringify(filtered));

//           state.filteredAccreditationList = getDefaultCheckedAccreditation(
//             filtered,
//           );
//         }
//       },
//       prepare(filter) {
//         return {payload: {filter}};
//       },
//     },

//     toggleAccreditation: {
//       reducer(state, action) {
//         const {credId, arrId} = action.payload;
//         state = {
//           ...state,
//           filteredAccreditationList: state.filteredAccreditationList.map(e => {
//             // Buscando a credenciadora pelo id
//             if (credId === e.id) {
//               // Casos os dois Ids sejam iguais, quer dizer que é uma alteração na checkbox de credenciadora
//               if (credId === arrId) {
//                 e.checked = !e.checked;
//                 e.valorParcial = e.checked ? e.valor : 0;
//                 e.arranjos.map(el => {
//                   el.recebiveis.map(elem => {
//                     elem.valorParcial = e.checked ? elem.valor : 0;
//                   });
//                   el.checked = e.checked;
//                   el.valorParcial = e.checked ? el.valor : 0;
//                   return el;
//                 });
//                 // Caso os ids sejam diferentes, vai buscar um arranjo
//               } else {
//                 let bool = false;
//                 e.arranjos.map(el => {
//                   if (arrId === el.id) {
//                     el.checked = !el.checked;
//                     if (el.checked) {
//                       el.valorParcial = el.valor;
//                       e.valorParcial += el.valor;
//                       el.recebiveis.map(elem => {
//                         elem.valorParcial = elem.valor;
//                       });
//                     } else {
//                       e.valorParcial -= el.valorParcial;
//                       el.valorParcial = 0;
//                       el.recebiveis.map(elem => {
//                         elem.valorParcial = 0;
//                       });
//                     }
//                   }
//                   bool = bool || el.checked;
//                   return el;
//                 });
//                 e.checked = bool;
//               }
//             }
//             return e;
//           }),
//         };
//         state.modify = 1;
//       },
//       prepare(credId, arrId) {
//         return {payload: {credId, arrId}};
//       },
//     },

//     setDefaultCheckedAccreditation: (state, action) => {
//       state.filteredAccreditationList = getDefaultCheckedAccreditation(
//         state.accreditationList,
//       );
//     },

//     incrementModify: (state, action) => {
//       state.modify = state.modify + 1;
//     },

//     decrementModify: (state, action) => {
//       state.modify = state.modify - 1;
//     },

//     resetModify: (state, action) => {
//       state.modify = 0;
//     },

//     setReceivedById: {
//       reducer(state, action) {
//         const {credId, arrId, id, txt} = action.payload;

//         state = {
//           ...state,
//           filteredAccreditationList: state.filteredAccreditationList.map(e => {
//             if (e.id === credId) {
//               e.arranjos.map(el => {
//                 if (el.id === arrId) {
//                   el.recebiveis.map(elem => {
//                     if (elem.id === id) {
//                       const diff = elem.valorParcial - txt;
//                       el.valorParcial -= diff;
//                       e.valorParcial -= diff;
//                       elem.valorParcial = txt;
//                     }
//                     return elem;
//                   });
//                 }
//                 return el;
//               });
//             }
//             return e;
//           }),
//         };
//       },
//       prepare(credId, arrId, id, txt) {
//         return {payload: {credId, arrId, id, txt}};
//       },
//     },

//     updateCheckbox: (state, action) => {
//       state = {
//         ...state,
//         filteredaccreditationlist: state.filteredAccreditationList.map(e => {
//           e.checked = !!e.valorParcial;
//           e.arranjos.forEach(el => {
//             el.checked = !!el.valorParcial;
//           });
//           return e;
//         }),
//       };
//     },
//   },
// });

// export const {
//   setAccreditation,
//   toggleAccreditation,
//   setDefaultCheckedAccreditation,
//   incrementModify,
//   decrementModify,
//   resetModify,
//   setReceivedById,
//   updateCheckbox,
//   filterAccreditation,
// } = accreditationSlice.actions;

// export default accreditationSlice.reducer;
