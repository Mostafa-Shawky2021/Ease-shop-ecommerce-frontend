import { ListItem } from "@root/components/listitem";
import { useCartsData, useGuest } from "@root/hooks";
import calcTotalPrice from "utils/calcTotalPrice";

import style from './productorder.module.scss';

const ProductsOrder = () => {

    const { guestId } = useGuest();

    const { data: carts } = useCartsData(guestId);

    return (
        <div className={style.productsOrderWrapper}>
            <h4 className={style.title}>تفاصيل الاوردر</h4>
            <div className='table-responsive'>
                <table className={style.table}>
                    <thead className={style.tableHead}>
                        <tr>
                            <th>اسم المنتج </th>
                            <th>السعر الكلي</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ListItem
                            data={carts}
                            renderItem={(cart) => (
                                <tr key={cart.id}>
                                    <td style={{ width: '75%' }}>   x {cart.quantity} {cart?.product?.product_name}</td>
                                    <td style={{ width: '25%' }}>{Number(cart.total_price).toLocaleString()}</td>
                                </tr>
                            )}
                        />
                        <tr>
                            <td style={{ color: '#000' }}>المجموع الكلي </td>
                            <td style={{ color: '#000' }}>{calcTotalPrice(carts)}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ProductsOrder;