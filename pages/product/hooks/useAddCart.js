import { useMutation } from "@tanstack/react-query"
import { addCart } from "../queries"

const useAddCart = () => {
    return useMutation(addCart, {
        onSuccess: (data) => console.log(`cart added ${data}`)
    })
}

export default useAddCart;