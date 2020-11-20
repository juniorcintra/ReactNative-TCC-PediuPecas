import {createSlice} from '@reduxjs/toolkit';

const genericsSlice = createSlice({
  name: 'operations',
  initialState: {
    loading: false,
    error: 'Error message',
    success: 'Success message',
    text: '',
    topNavProps: {
      icon: '',
    },
  },
  reducers: {
    initLoading: (state, action) => {
      state.loading = true;
    },

    endLoading: (state, action) => {
      state.loading = false;
    },

    setError: {
      reducer(state, action) {
        state.error = action.payload.message;
        state.text = action.payload.text;
      },
      prepare({message, text}) {
        return {payload: {message, text}};
      },
    },

    unsetError: (state, action) => {
      state.error = null;
    },

    setSuccess: {
      reducer(state, action) {
        state.success = action.payload.message;
        state.text = action.payload.text;
      },
      prepare({message, text}) {
        return {payload: {message, text}};
      },
    },

    unsetSuccess: (state, action) => {
      state.success = null;
    },

    updateTopNavProps: {
      reducer(state, action) {
        state.topNavProps = action.payload.topNavProps;
      },
      prepare(topNavProps) {
        return {payload: {topNavProps}};
      },
    },
  },
});

export const {
  initLoading,
  endLoading,
  setError,
  unsetError,
  setSuccess,
  unsetSuccess,
  updateTopNavProps,
} = genericsSlice.actions;

export default genericsSlice.reducer;
