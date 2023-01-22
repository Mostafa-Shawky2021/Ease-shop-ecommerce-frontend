import React, { createContext, useReducer } from 'react';

import { cartReducer } from 'reducer';

export const CartContext = createContext();

const initialState = [];

export const CartProvider = ({ children }) => {
    const [carts, dispatch] = useReducer(cartReducer, initialState)

    return (
        <CartContext.Provider value={{ carts, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}
