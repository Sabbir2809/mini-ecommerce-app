import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getToken } from "../helpers/SessionHelper";
import Loader from "./Loader";
import Product from "./Product";

const ProductList = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // get all product api
        const res = await axios.get("https://mini-ecommerce-app.onrender.com/api/products", {
          headers: { token: getToken() },
        });
        // success status
        if (res.status) {
          setProducts(res.data);
        }
      } catch (error) {
        if (error.response.data.success === false) {
          toast.error(error.response.data.message);
        }
      }
    })();
  }, []);
  return (
    <div className="h-screen w-full grid place-items-center ">
      {products === null ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] m-20">
          {products?.data?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
