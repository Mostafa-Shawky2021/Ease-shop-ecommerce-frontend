import { useState, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import {
    useGuest,
    useAddCartData,
    useIncrementCartData,
    useDecrementCartData,
    useDeleteCartData
} from '@root/hooks';

import { queryKeys } from 'data';

const useCarts = (productDetails = null) => {

    const [isLoading, setIsLoading] = useState(false);
    const [productVariants, setProductVariants] = useState({
        color: "",
        size: "",
        quantity: 1,
    });

    const queryClient = useQueryClient();

    const { guestId } = useGuest();

    const addCart = useAddCartData(setIsLoading, guestId)
    const incrementCart = useIncrementCartData(setIsLoading, setProductVariants, guestId);
    const decrementCart = useDecrementCartData(setIsLoading, guestId);
    const deleteCart = useDeleteCartData(setIsLoading, guestId);

    useEffect(() => {

        const firstSize = productDetails?.sizes?.length
            ? productDetails.sizes[0].size_name
            : "";
        const firstColor = productDetails?.colors?.length
            ? productDetails.colors[0].color_name
            : "";

        setProductVariants({
            ...productVariants,
            size: firstSize,
            color: firstColor
        });


    }, [productDetails]);

    const checkProductDetailsContainVariants = () => {

        return Boolean(productDetails?.colors?.length || productDetails?.sizes?.length)
    }

    const checkProductVariantValidation = () => {

        let productVariantsStauts = true;

        if (productDetails?.colors?.length && !productVariants?.color?.trim()) {
            console.log('should chose at least color');
            productVariantsStauts = false;
        }
        if (productDetails?.colors?.length && !productVariants?.size?.trim()) {
            console.log('should chose at least size');
            productVariantsStauts = false;
        }

        return productVariantsStauts;
    }

    const addCartData = () => {

        let calcTotalPrice = 0;
        calcTotalPrice = productDetails?.price_discount
            ? (productDetails.price_discount * productVariants.quantity)
            : (productDetails.price * productVariants.quantity)

        if (!checkProductVariantValidation()) return false;

        const carts = queryClient.getQueryData(queryKeys.USER_CARTS(guestId));

        const cartData = {

            user_id: guestId,
            product_id: productDetails.id,
            size: productVariants.size,
            color: productVariants.color,
            quantity: productVariants.quantity,
            unit_price: productDetails.price_discount || productDetails.price,
            total_price: calcTotalPrice

        }

        // check if product contain color or size
        if (checkProductDetailsContainVariants()) {
            // check if cart has already been added
            const cartExistWithSamedata = carts?.find(cart => {

                if (cartData.size == cart.size && cartData.color == cart.color) return cart;
                if (cartData.size === cart.size) return cart;
                if (cartData.color === cart.color) return cart;
            });


            if (cartExistWithSamedata) {

                incrementCart.mutate(
                    {
                        cartId: cartExistWithSamedata.id,
                        quantity: productVariants.quantity
                    });
                return true;
            }

            addCart.mutate(cartData);

            return true;

        } else {

            // check if cart has already been added
            const cartExist = carts.find(cart => cart.product_id === cartData.product_id);
            if (cartExist) {
                incrementCart.mutate(
                    {
                        cartId: cartExist.id,
                        quantity: productVariants.quantity
                    });
                return true
            }
            addCart.mutate(cartData);
            return true;

        }

    }

    const incrementCartData = (data) => {

        incrementCart.mutate(data)
    }

    const decrementCartData = (data) => {

        decrementCart.mutate(data);
    }

    const deleteCartData = (cartId) => {

        deleteCart.mutate(cartId);
    }

    return {
        productVariants,
        setProductVariants,
        addCartData,
        incrementCartData,
        decrementCartData,
        deleteCartData,
        isLoading,

    }
}

export default useCarts;