import { APIResponse } from '../../commonTypes';

export interface ISection {
  heading: string;
  children: any;
}

export interface IPriceDetail {
  label: string;
  price: number;
  showLine?: boolean;
  quantity?: number;
}

export interface IProduct {
  _id: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
}

export interface GetProductsResponse extends APIResponse {
  body: {
    products: IProduct[];
  };
}
