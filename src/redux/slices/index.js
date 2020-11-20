import {combineReducers} from 'redux';

import genericReducer from '../slices/genericsSlice';

import cepReducer from '../slices/cepSlice';

import authReducer from '../slices/authSlice';

export default combineReducers({genericReducer, cepReducer, authReducer});
