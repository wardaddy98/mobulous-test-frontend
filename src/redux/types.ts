import { IProduct } from '../Pages/Cart/types';
import store from './store';

export interface IInitialProductReducerState {
  products: IProduct[];
  cart: ICartItem[];
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export type RootState = ReturnType<typeof store.getState>;
