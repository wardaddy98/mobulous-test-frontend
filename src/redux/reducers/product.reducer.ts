import { IProduct } from '../../Pages/Cart/types';
import { IAction } from '../../commonTypes';
import {
  ADD_CART_ITEM,
  DELETE_CART_ITEM,
  SET_PRODUCTS,
  UPDATE_CART_ITEM_QUANTITY,
} from '../typeConstants';
import { IInitialProductReducerState } from '../types';

const initialState: IInitialProductReducerState = {
  products: [],
  cart: [],
};

export const productReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      const updatedStore = { ...state, products: action.payload };
      return updatedStore;
    }

    case ADD_CART_ITEM: {
      const productPayload: IProduct = action.payload;

      const tempCart = [...state.cart];

      const productIndex = tempCart.findIndex(e => e.product._id === productPayload._id);

      if (productIndex !== -1) {
        tempCart[productIndex].quantity = tempCart[productIndex].quantity + 1;
      } else {
        tempCart.push({
          product: productPayload,
          quantity: 1,
        });
      }

      return { ...state, cart: tempCart };
    }

    case DELETE_CART_ITEM: {
      const productId = action.payload;

      const tempCart = [...state.cart];
      const productIndex: number = tempCart.findIndex(e => e.product._id === productId);

      if (productIndex !== -1) {
        if (tempCart[productIndex].quantity === 1) {
          tempCart.splice(productIndex, 1);
        } else {
          tempCart[productIndex].quantity = tempCart[productIndex].quantity - 1;
        }
      }
      return { ...state, cart: tempCart };
    }

    case UPDATE_CART_ITEM_QUANTITY: {
      const { product, quantity }: { product: IProduct; quantity: number } = action.payload;

      const tempCart = [...state.cart];

      const productIndex = tempCart.findIndex(e => e.product._id === product._id);

      if (productIndex !== -1) {
        tempCart[productIndex].quantity = quantity;
      } else {
        tempCart.push({
          product,
          quantity,
        });
      }
      return { ...state, cart: tempCart };
    }
    default:
      return state;
  }
};
