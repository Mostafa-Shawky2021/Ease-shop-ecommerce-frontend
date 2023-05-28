import { useState, useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { useGuest, useAddCartData, useIncrementCartData, useDecrementCartData, useDeleteCartData } from "@root/hooks";

import { queryKeys } from "data";

const useCarts = (productDetails = null) => {
	const [isLoading, setIsLoading] = useState(false);
	const [productVariants, setProductVariants] = useState({
		color: null,
		size: null,
		quantity: 1,
	});

	const queryClient = useQueryClient();

	const { guestId } = useGuest();

	const addCart = useAddCartData(setIsLoading, guestId);
	const incrementCart = useIncrementCartData(setIsLoading, setProductVariants, guestId);
	const decrementCart = useDecrementCartData(setIsLoading, guestId);
	const deleteCart = useDeleteCartData(setIsLoading, guestId);

	useEffect(() => {
		const firstSize = productDetails?.sizes?.length ? productDetails.sizes[0].size_name : null;
		const firstColor = productDetails?.colors?.length ? productDetails.colors[0].color_name : null;

		setProductVariants({
			...productVariants,
			size: firstSize,
			color: firstColor,
		});
	}, [productDetails]);

	const checkProductDetailsContainVariants = () => {
		return Boolean(productDetails?.colors?.length || productDetails?.sizes?.length);
	};

	const checkProductVariantValidation = () => {
		let productVariantsStauts = true;

		if (productDetails?.colors?.length && !productVariants?.color?.trim()) {
			console.log("should chose at least color");
			productVariantsStauts = false;
		}
		if (productDetails?.sizes?.length && !productVariants?.size?.trim()) {
			console.log("should chose at least size");
			productVariantsStauts = false;
		}

		return productVariantsStauts;
	};

	const addCartData = () => {
		let calcTotalPrice = 0;
		calcTotalPrice = productDetails?.price_discount
			? productDetails.price_discount * productVariants.quantity
			: productDetails.price * productVariants.quantity;

		if (!checkProductVariantValidation()) return false;

		const carts = queryClient.getQueryData(queryKeys.USER_CARTS(guestId));

		const newCartData = {
			user_id: guestId,
			product_id: productDetails.id,
			size: productVariants.size,
			color: productVariants.color,
			quantity: productVariants.quantity,
			unit_price: productDetails.price_discount || productDetails.price,
			total_price: calcTotalPrice,
		};

		// check if product contain color or size
		if (checkProductDetailsContainVariants()) {
			// check if cart has already been added
			const cartExistWithSamedata = carts?.find((cart) => {
				if (cart.product_id === newCartData.product_id) {
					if (newCartData.size === cart.size && newCartData.color == cart.color) return cart;
					if (newCartData.size === cart.size && newCartData.color === null) return cart;
					if (newCartData.color === cart.color && newCartData.size === null) return cart;
					return false;
				}
			});
			if (cartExistWithSamedata) {
				incrementCart.mutate({
					cartId: cartExistWithSamedata.id,
					quantity: productVariants.quantity,
				});
				return true;
			}

			addCart.mutate(newCartData);
			return true;
		} else {
			// check if cart has already been added
			const cartExist = carts?.find((cart) => cart.product_id === newCartData.product_id);
			if (cartExist) {
				incrementCart.mutate({
					cartId: cartExist.id,
					quantity: productVariants.quantity,
				});
				return true;
			}
			addCart.mutate(newCartData);
			return true;
		}
	};

	const incrementCartData = (data) => {
		incrementCart.mutate(data);
	};

	const decrementCartData = (data) => {
		decrementCart.mutate(data);
	};

	const deleteCartData = (cartId) => {
		deleteCart.mutate(cartId);
	};

	return {
		productVariants,
		setProductVariants,
		addCartData,
		incrementCartData,
		decrementCartData,
		deleteCartData,
		isLoading,
	};
};

export default useCarts;
