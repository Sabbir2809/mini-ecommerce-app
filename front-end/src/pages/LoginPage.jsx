import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { getEmail, getGuestCart, getToken, setEmail, setToken } from "../helpers/SessionHelper";

const LoginPage = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // setInputs
  const handleOnChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  // login
  const handleSubmit = async (event) => {
    event.preventDefault();

    // input validation
    if (inputs.email.length === 0) {
      return toast.error("Email Required");
    }
    if (inputs.password.length === 0) {
      return toast.error("Password Required");
    }

    try {
      // user-login api
      const { data } = await axios.post(`http://localhost:8000/api/auth/user-login`, inputs);
      if (data.success) {
        // set email, token in localStorage
        setToken(data.token);
        setEmail(data.data.email);

        toast.success("Login Successful");

        // get email, token in localStorage
        const postBody = { userEmail: getEmail(), productId: getGuestCart() };
        const token = { headers: { token: getToken() } };

        // check token in localStorage
        if (getToken()) {
          const res = await axios.post(`http://localhost:8000/api/create-cart`, postBody, token);
          // success status
          if (res.status) {
            localStorage.removeItem("guestCartItem");
            navigate(`/cart-list`);
          }
        } else {
          navigate(`/`);
        }
      }
    } catch (error) {
      if (error.response.data.success === false) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2">
        <div className="flex items-center w-full justify-center h-screen">
          <div className="card w-8/12 card-side bg-white shadow-xl">
            <div className="card-body justify-center items-center">
              <form className="w-8/12" onSubmit={handleSubmit}>
                <h1 className="text-2xl text-center font-bold text-blue-500 my-10">
                  Welcome To Mini E-Commerce Login Page
                </h1>
                <div>
                  <input
                    type="email"
                    name="email"
                    onChange={handleOnChange}
                    value={inputs.email}
                    placeholder="Enter Your Email..."
                    className="input w-full bg-white rounded-lg input-bordered"
                  />
                </div>
                <br />
                <div>
                  <input
                    type="password"
                    name="password"
                    onChange={handleOnChange}
                    value={inputs.password}
                    placeholder="Enter Your Password..."
                    className="input w-full bg-white rounded-lg input-bordered"
                  />
                </div>
                <button className="btn rounded-lg w-full my-4 btn-primary">Login</button>
                <div>
                  <p>
                    You do not have an account?{" "}
                    <Link to={"/register"}>
                      <strong>Register now</strong>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
