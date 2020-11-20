import {createSlice} from '@reduxjs/toolkit';

const userModel = {
  accessToken: '',
  tokenId: '',
  refreshToken: '',
  termos: [],
  participantes: [],
  usuario: '',
  termoLido: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {currentUser: userModel, isLoggedIn: false},
  reducers: {
    setCurrentUser: {
      reducer(state, action) {
        state.currentUser = action.payload.user;
        state.isLoggedIn = true;
      },
      prepare({user}) {
        return {payload: {user}};
      },
    },

    unsetCurrentUser: (state, action) => {
      state.currentUser = userModel;
      state.isLoggedIn = false;
    },

    toggleAcceptedTerm: (state, action) => {
      state.currentUser.termoLido = !state.currentUser.termoLido;
    },

    toggleFirstAccess: (state, action) => {
      state.currentUser.first_access = !state.currentUser.first_access;
    },
  },
});

export const {
  setCurrentUser,
  unsetCurrentUser,
  toggleAcceptedTerm,
  toggleFirstAccess,
} = authSlice.actions;

export default authSlice.reducer;
