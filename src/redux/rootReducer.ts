import { combineReducers } from 'redux';
import { productReducer } from './reducers/product.reducer';

export const rootReducer = combineReducers({
  product: productReducer,
});
