import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

const BuyNow = ({ cartItems }) => {
  // input formObject
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // setInputs
  const handleOnChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  // Payment Gateway
  const handlePayNow = async (event) => {
    event.preventDefault();

    // input filed validation
    if (inputs.name.length === 0) {
      return toast.error("Full Name Required");
    }
    if (inputs.email.length === 0) {
      return toast.error("Email Required");
    }
    if (inputs.phone.length === 0) {
      return toast.error("Phone Number Required");
    }
    if (inputs.address.length === 0) {
      return toast.error("Address Required");
    }

    try {
      // cartItems insert in inputs object
      inputs.productList = cartItems;

      // order api
      const response = await axios.post("https://mini-ecommerce-app.onrender.com/api/order", inputs);

      // success status
      if (response.status) {
        window.location.replace(response.data.url);
      }
    } catch (error) {
      if (error.response.data.success === false) {
        return toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div className="lg:col-span-2">
      <form onSubmit={handlePayNow} className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
        <div className="md:col-span-5">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleOnChange}
            id="name"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          />
        </div>
        <div className="md:col-span-5">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleOnChange}
            id="email"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          />
        </div>
        <div className="md:col-span-5">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={inputs.phone}
            onChange={handleOnChange}
            id="number"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          />
        </div>
        <div className="md:col-span-5">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={inputs.address}
            onChange={handleOnChange}
            id="address"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          />
        </div>
        <div className="md:col-span-5 text-right">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuyNow;
