import { Link, useParams } from "react-router-dom";

const PaymentFail = () => {
  const { transId } = useParams();

  return (
    <div className="bg-gray-100 my-20">
      <div className="bg-white p-6 md:mx-auto">
        <svg
          className="text-green-600 w-16 h-16 mx-auto my-6"
          style={{ color: "red" }}
          width={50}
          height={50}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm5.793-4.207a1 1 0 0 1 1.414 0L12 10.586l2.793-2.793a1 1 0 1 1 1.414 1.414L13.414 12l2.793 2.793a1 1 0 0 1-1.414 1.414L12 13.414l-2.793 2.793a1 1 0 0 1-1.414-1.414L10.586 12 7.793 9.207a1 1 0 0 1 0-1.414z"
            fill="red"
          />
        </svg>

        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            #{transId} Oh no, Your Payment Failed!
          </h3>
          <div className="py-10 text-center">
            <Link
              to="/cart-list"
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
              Please Try Again!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;
