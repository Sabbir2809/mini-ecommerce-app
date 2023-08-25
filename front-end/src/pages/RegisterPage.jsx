import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
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

  // register
  const handleSubmit = (event) => {
    event.preventDefault();

    // input validation
    if (inputs.email.length === 0) {
      return toast.error("Email Required");
    }
    if (inputs.password.length === 0) {
      return toast.error("Password Required");
    }

    (async () => {
      try {
        // user-register api
        const { data } = await axios.post(
          `https://mini-ecommerce-app.onrender.com/api/auth/user-register`,
          inputs
        );

        // success status
        if (data.success) {
          toast.success("Registration Successful");
          navigate("/login");
        }
      } catch (error) {
        if (error.response.data.success === false) {
          toast.error(error.response.data.message);
        }
      }
    })();
  };

  return (
    <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
      <div className="flex shadow-md">
        <div
          className="flex flex-wrap content-center justify-center rounded-l-md bg-white"
          style={{ width: "24rem", height: "32rem" }}>
          <form className="w-72" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold">Welcome To Mini Ecommerce Register Page</h1>
            <div className="mt-4">
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleOnChange}
                  value={inputs.email}
                  placeholder="Enter your email"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
              </div>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleOnChange}
                  value={inputs.password}
                  placeholder="*****"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
              </div>
              <div className="mb-3">
                <button className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">
                  Register
                </button>
              </div>
            </div>
            <div className="text-center">
              <span className="text-xs text-gray-400 font-semibold">Do not have account? </span>
              <Link to={"/login"} className="text-xs font-semibold text-purple-700">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
