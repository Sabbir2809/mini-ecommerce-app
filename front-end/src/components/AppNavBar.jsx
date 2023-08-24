import { Link, NavLink } from "react-router-dom";
import { getEmail, getToken, removeSession } from "../helpers/SessionHelper";
import logo from "./../assets/images/logo.png";
import user from "./../assets/images/user.webp";

const AppNavBar = () => {
  // handle logout
  const handleLogout = () => {
    removeSession();
    window.location.href = "/login";
  };
  return (
    <div className="navbar fixed top-0 z-50 px-20 drop-shadow-lg bg-base-100">
      <div className="flex-1">
        <Link to="/">
          <img className="w-20" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-2">
          <li>
            <NavLink to="/">Product</NavLink>
          </li>
        </ul>
        <ul className="menu menu-horizontal px-3">
          <li>
            <NavLink to="/cart-list">View Cart</NavLink>
          </li>
        </ul>
        {getToken() && getEmail() && (
          <div className="dropdown dropdown-end px-2">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user} alt="user" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <h1 className="mb-4">Email: {getEmail()}</h1>
              </li>

              <li>
                <button className="btn btn-sm btn-warning" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppNavBar;
