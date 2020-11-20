// import {createSlice} from '@reduxjs/toolkit';
// import userModel from '../../pages/UserRegister/data';

// const userRegisterSlice = createSlice({
//   name: 'userRegister',
//   initialState: {user: userModel},
//   reducers: {
//     setUser: {
//       reducer(state, action) {
//         state.user = action.payload.user;
//       },
//       prepare({user}) {
//         return {payload: {user}};
//       },
//     },
//     unsetUser: (state, action) => {
//       state.user = userModel;
//     },
//   },
// });

// export const {setUser, unsetUser} = userRegisterSlice.actions;

// export default userRegisterSlice.reducer;
