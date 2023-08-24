import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getEmail, getToken, setGuestCart } from "../helpers/SessionHelper";

const Product = ({ product }) => {
  const { _id, title, description, thumbnail, price } = product;
  const navigate = useNavigate();

  // add to cart product
  const handleAddToCart = async () => {
    try {
      // get email, token form localStorage
      const postBody = { userEmail: getEmail(), productId: _id };
      const token = { headers: { token: getToken() } };

      // check token in localStorage
      if (getToken()) {
        const res = await axios.post(`http://localhost:8000/api/create-cart`, postBody, token);

        if (res.status) {
          toast.success("Add To Cart Successful!");
        }
      } else {
        setGuestCart(_id);
        navigate("/login");
      }
    } catch (error) {
      if (error.response.data.success === false) {
        return toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="card w-100  drop-shadow-lg bg-base-100">
      <figure className="w-full h-[250px]">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="text-blue-900 text-xl font-bold">{title}</h2>
        <p className=" text-gray-400">{description}</p>
        <h6 className="font-bold text-right">Price: ${price}</h6>
        <div className="card-actions justify-end">
          <button onClick={handleAddToCart} className="btn btn-sm btn-outline btn-primary">
            Add Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
