import {createSlice} from '@reduxjs/toolkit';

const cepSlice = createSlice({
  name: 'cep',
  initialState: {endereco: {}},
  reducers: {
    setEndereco: {
      reducer(state, action) {
        state.endereco = action.payload.endereco;
      },
      prepare(endereco) {
        return {payload: {endereco}};
      },
    },
  },
});

export const {setEndereco} = cepSlice.actions;

export default cepSlice.reducer;
