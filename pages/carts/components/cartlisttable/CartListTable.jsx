import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useCarts } from "@root/hooks";

import { Table, Button } from "react-bootstrap";
import { ProductQuantity } from "@root/components/productquantity";
import { Loading } from "@root/components/loading";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";

import DefaultImage from "@assets/images/default/image.jpg";

import style from "./cartlisttable.module.scss";

const CartListTable = ({ cartsData, isCartsLoading }) => {
  const [currentCart, setCurrentCart] = useState(0);

  const { incrementCartData, decrementCartData, deleteCartData, isLoading } =
    useCarts();

  const handleProductIncrement = (event) => {
    const cartId = Number(event.currentTarget.getAttribute("data-cart-id"));
    setCurrentCart(cartId);
    incrementCartData({ cartId });
  };

  const handleProductDecrement = (event) => {
    const cartId = Number(event.currentTarget.getAttribute("data-cart-id"));
    setCurrentCart(cartId);
    decrementCartData({ cartId });
  };

  const handleProductDelete = (event) => {
    const deleteStatus = confirm("هل انت متاكد من انك تريد حذف المنتج؟");
    if (deleteStatus) {
      const cartId = Number(event.currentTarget.getAttribute("data-cart-id"));
      deleteCartData(cartId);
    }
  };

  return (
    <div className={style.cartListWrapper}>
      <div className={style.countinueShopping}>
        <Link href="/store">
          العودة الي التسوق <ArrowBackIcon fontSize="xs" />
        </Link>
      </div>

      <div style={{ overflowX: "auto" }}>
        {isLoading && (
          <Loading>
            <CircularProgress size={33} className={style.loadingIcon} />
          </Loading>
        )}
        <Table className={style.cartTable}>
          <thead>
            <tr>
              <th>الصورة</th>
              <th>اسم المنتج</th>
              <th>اللون</th>
              <th>الحجم</th>
              <th>السعر</th>
              <th>الكمية</th>
              <th>المجموع الكلي</th>
              <th>التحكم</th>
            </tr>
          </thead>
          <tbody>
            {isCartsLoading ? (
              <tr>
                <td>
                  <CircularProgress size={18} className={style.loadingIcon} />
                </td>
              </tr>
            ) : !!cartsData?.length ? (
              cartsData?.map((cart) => {
                return (
                  <tr key={cart?.id}>
                    <td style={{ width: "120px" }}>
                      <Link href={`/product/${cart?.product.product_slug}`}>
                        <Image
                          src={
                            cart?.product?.image
                              ? cart?.product?.image
                              : DefaultImage
                          }
                          alt={cart?.product?.product_name}
                          width={100}
                          height={80}
                        />
                      </Link>
                    </td>
                    <td>
                      <p className={style.productName}>
                        <Link href={`/product/${cart?.product.product_slug}`}>
                          {cart?.product?.product_name}
                        </Link>
                      </p>
                    </td>
                    <td>{cart?.color || "--"}</td>
                    <td>{cart?.size || "--"}</td>
                    <td>{Number(cart?.unit_price).toLocaleString()}</td>
                    <td>
                      <ProductQuantity
                        quantity={cart.quantity}
                        handleProductIncrement={handleProductIncrement}
                        handleProductDecrement={handleProductDecrement}
                        cartId={cart?.id}
                        currentCart={currentCart}
                        style={{ justifyContent: "center" }}
                      />
                    </td>
                    <td>{Number(cart?.total_price).toLocaleString()}</td>
                    <td>
                      <Button
                        className={style.deleteProduct}
                        data-cart-id={cart.id}
                        onClick={handleProductDelete}
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>لا توجد منتجات في سلة المشتريات</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CartListTable;
