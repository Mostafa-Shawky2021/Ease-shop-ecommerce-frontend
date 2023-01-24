import React, { createContext, useState, useEffect } from 'react';
import { useCartsData } from 'hooks';

export const CartContext = createContext();



export const CartProvider = ({ children }) => {
    const [userId, setUserId] = useState(null)
    const { data } = useCartsData(userId)

    useEffect(() => {
        const userId = JSON.parse(window.localStorage.getItem('guest')) || null;
        if (userId) {
            setUserId(userId);
        }

    }, [])

    return (
        <CartContext.Provider value={{ carts: data || [] }}>
            {children}
        </CartContext.Provider>
    )
}
