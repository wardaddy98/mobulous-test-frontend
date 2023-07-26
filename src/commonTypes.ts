import { IProduct } from './Pages/Cart/types';

export interface APIResponse {
  status: number;
  message: string;
  body?: any;
}

export interface IAppContext {
  products?: IProduct[];
  setProducts?: any;
}

export interface IAction {
  type: string;
  payload: any;
}
