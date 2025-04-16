import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { getBaseUrl } from "../../utils/getbaseurl";
const OrderSummery = () => {
  const dispatch = useDispatch();
  const { products, selectedItems, totalPrice } = useSelector(
    (state) => state.cart
  );
  // console.log(products)
  // console.log(selectedItems)
  // console.log(totalPrice)
  const { user } = useSelector((state) => state.auth);

  // clear cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // handle make payment
  const makePayment = async (e) => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
    //console.log(stripe)
    const body = {
      products: products,
      userId: user?._id,
    };
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/orders/create-checkout-session`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
      if (result.error) {
        console.error("Error redirecting to checkout", result.error);
        return;
      }
    } catch (error) {
      console.error("Error creating checkout", error);
    }
  };
  return (
    <>
      <div className=" bg-primary-light mt-5 rounded text-base">
        <div className="px-6 py-4 space-y-5">
          <h1 className="text-2xl font-bold text-dark">Order Summary</h1>
          <p className="text-dark mt-2">Selected Items :{selectedItems}</p>
          <p className="text-dark mt-2">
            Total Price :${totalPrice.toFixed(2)}
          </p>
        </div>
        <div className="px-4 pb-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClearCart();
            }}
            className="bg-red-500 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center mb-4"
          >
            <span className="mr-2 cursor-pointer">Clear Cart</span>

            <i className="ri-delete-bin-7-line"></i>
          </button>
          {/* product checkout */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // amra jetate click korbo thi setai ate kaj kore onno state gola na.
              makePayment();
            }}
            className="bg-green-600 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center"
          >
            <span className="mr-2">Proceed Checkout</span>
            <i className="ri-bank-card-line"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderSummery;
