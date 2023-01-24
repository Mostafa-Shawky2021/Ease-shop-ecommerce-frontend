import { useState } from 'react';
import useAddCartData from './useAddCartData';
import useIncrementProductData from './useIncrementProductData';

const useCarts = () => {

    const [isLoading, setIsLoading] = useState(false);


    const {
        mutate: addCartMutation,
        isSuccess: isCartSuccessfully } = useAddCartData(setIsLoading)

    const {
        mutate: incrementProductMutation,
        isSuccess: isProductIncreased } = useIncrementProductData(setIsLoading)

    const addCartData = (cartData) => {
        addCartMutation(cartData)
    }
    const incrementProduct = (data) => {
        incrementProductMutation(data)
    }

    return {
        addCartData,
        incrementProduct,
        isLoading,
        isCartSuccessfully,
        isProductIncreased
    }
}

export default useCarts;