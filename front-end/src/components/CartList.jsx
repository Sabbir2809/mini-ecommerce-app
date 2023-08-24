import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { convertPriceStringToNumber, getEmail, getGuestCart, getToken } from "../helpers/SessionHelper";
import PayNow from "./PayNow";

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // get email, token, guest productId form localStorage
        const postBody = { userEmail: getEmail() };
        const token = { headers: { token: getToken() }, productId: getGuestCart() };

        // check token in localStorage
        if (getToken()) {
          // cart-list api
          const res = await axios.post(
            `https://mini-ecommerce-app.onrender.com/api/cart-list`,
            postBody,
            token
          );

          if (res.data) {
            setCartItems(res.data.data);
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        if (error.response.data.success === false) {
          return toast.error(error.response.data.message);
        }
      }
    })();
  }, []);

  // Remove Product Item form CartList
  const handleRemoveCart = async (productId) => {
    try {
      // get email, token form localStorage
      const postBody = { userEmail: getEmail() };
      const token = { headers: { token: getToken() } };

      // delete-cart api
      const res = await axios.delete(
        `https://mini-ecommerce-app.onrender.com/api/delete-cart/${productId}`,
        token
      );

      // status success
      if (res.status) {
        toast.success("Remove Cart Successful!");
        if (getToken()) {
          const res = await axios.post(
            `https://mini-ecommerce-app.onrender.com/api/cart-list`,
            postBody,
            token
          );
          if (res.data) {
            setCartItems(res.data.data);
          }
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      if (error.response.data.success === false) {
        return toast.error(error.response.data.message);
      }
    }
  };

  // Calculate Cart Product Price
  const calculateTotalAmount = () => {
    const totalPrice = cartItems.reduce((total, currentValue) => {
      const price = convertPriceStringToNumber(currentValue);
      return total + price;
    }, 0);
    return totalPrice.toLocaleString();
  };

  return (
    <div className="container z-10 mx-auto my-12 p-9">
      <div className="grid grid-cols-1 mt-2 md:grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="container col-span-2">
          <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-1 gap-3">
            {cartItems?.length <= 0 ? (
              <p className="text-xl">
                Your Cart in Empty!{" "}
                <Link to="/" className="text-blue-500">
                  Please Add To Cart
                </Link>
              </p>
            ) : (
              cartItems?.map((item) => (
                <div
                  key={item?._id}
                  className="flex w-auto bg-white shadow-lg rounded-md overflow-hidden border p-4">
                  <img className="w-40" src={item?.cartList?.thumbnail} alt={item?.cartList?.title} />
                  <div className="w-2/3 p-4">
                    <h1 className="text-gray-900 font-bold text-2xl">{item?.cartList?.title}</h1>

                    <div className="flex item-center justify-between mt-3">
                      <h1 className="text-gray-700 font-bold text-xl">${item?.cartList?.price}</h1>
                      <button
                        onClick={() => handleRemoveCart(item?._id)}
                        className="btn btn-sm btn-primary btn-outline">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card shadow-xl h-auto w-100 bg-white">
          <div className="card-body">
            <h2 className="card-title">Total Item: {cartItems.length}</h2>
            <h6>Total Price: $ {calculateTotalAmount()} </h6>
            <PayNow cartItems={cartItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
