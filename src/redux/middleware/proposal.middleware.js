// import {
//   initLoading,
//   endLoading,
//   setSuccess,
//   setError,
//   unsetError,
//   unsetSuccess,
// } from '../slices/genericsSlice';
// import axiosInstanceProduction from '../api/axiosInstanceProduction';
// import {setProposal, unsetProposal} from '../slices/proposalSlice';

// const normalizeReceivables = simulationData => {
//   let receivables = {recebiveis: []};

//   simulationData.map(accreditor => {
//     if (accreditor.arranjos.length > 0) {
//       accreditor.arranjos.map(arrangement => {
//         if (arrangement.recebiveis.length > 0) {
//           arrangement.recebiveis.map(receivable => {
//             receivables.recebiveis.push({
//               id: receivable.id,
//               valorBruto: receivable.valorParcial,
//             });
//           });
//         }
//       });
//     }
//   });

//   return receivables;
// };

// export const postProposal = simulation => {
//   return async dispatch => {
//     dispatch(initLoading());
//     try {
//       const receivables = normalizeReceivables(simulation);
//       let response = await axiosInstanceProduction.post('ofertas', receivables);
//       let finalProposal = response.data;
//       dispatch(setProposal({proposal: finalProposal}));
//       dispatch(endLoading());
//     } catch (error) {
//       dispatch(endLoading());
//     }
//   };
// };

// export const manageProposal = ({type, id}) => {
//   return async dispatch => {
//     dispatch(initLoading());
//     try {
//       let response = await axiosInstanceProduction.patch(
//         `ofertas/${id}/${type === 'aceitar' ? 'encerrar' : 'cancelar'}`,
//       );

//       if (response) {
//         dispatch(unsetError());
//         dispatch(
//           setSuccess({message: `Operação ${id}, concluída com sucesso`}),
//         );
//       }

//       if (!response) {
//         dispatch(unsetSuccess());
//         dispatch(
//           setError({
//             message:
//               'Houve um erro ao processar a sua requisição, por favor, tente novamente',
//           }),
//         );
//       }

//       dispatch(unsetProposal());
//       dispatch(endLoading());
//     } catch (error) {
//       dispatch(endLoading());
//     }
//   };
// };
