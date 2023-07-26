import { IProduct } from '../Pages/Cart/types';
import { IAction } from './../commonTypes';
import {
  ADD_CART_ITEM,
  DELETE_CART_ITEM,
  SET_PRODUCTS,
  UPDATE_CART_ITEM_QUANTITY,
} from './typeConstants';

export const setProducts = (products: IProduct[]): IAction => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const addCartItem = (product: IProduct): IAction => ({
  type: ADD_CART_ITEM,
  payload: product,
});
export const deleteCartItem = (productId: string): IAction => ({
  type: DELETE_CART_ITEM,
  payload: productId,
});

export const updateCartItemQuantity = ({
  product,
  quantity,
}: {
  product: IProduct;
  quantity: number;
}): IAction => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: {
    product,
    quantity,
  },
});
