import { actionsType } from "data";

const cartReducer = (state, action) => {
    console.log(action.payload)

    switch (action.type) {
        case actionsType.ADD_TO_CART:

            // // check there are product added to the cart
            const productId = action.payload.productId;
            const productIndex = state.findIndex(product => product.productId == productId);

            if (productIndex >= 0) {
                const products = state.map(product => {
                    if (product.productId == productId) {
                        return { ...state[productIndex], quantity: product.quantity + 1 }
                    } else {
                        return product;
                    }
                })
                return [...products];
            } else {
                return [
                    ...state,
                    action.payload
                ]
            }
            break;

        default:
            return state
    }
}


export default cartReducer;