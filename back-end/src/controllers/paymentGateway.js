// Dependencies
const SSLCommerzPayment = require("sslcommerz-lts");
const orderModel = require("../models/orderModel");

// Create Payment
exports.paymentGateway = async (req, res) => {
  try {
    // frontend send {name, email,phone, address, productInformation} to backend
    const order = req.body;

    // product price calculation
    const productPrice = order.productList.reduce((total, currentValue) => {
      const stringPrice = currentValue.cartList.price;
      const price = parseInt(stringPrice);
      return total + price;
    }, 0);

    // use unique tran_id for each api call
    const tran_id = Date.now().toString();

    const data = {
      total_amount: productPrice,
      currency: "USD",
      tran_id: tran_id,
      success_url: `http://localhost:8000/api/payment/success/${tran_id}`,
      fail_url: `http://localhost:8000/api/payment/fail/${tran_id}`,
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: order.name,
      cus_email: order.email,
      cus_add1: order.address,
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: order.phone,
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    // SSLCommerz Secret key:
    const store_id = process.env.STORE_ID;
    const store_passwd = process.env.STORE_PASSWORD;
    const is_live = false; //true for live, false for sandbox

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    sslcz.init(data).then((apiResponse) => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.send({ url: GatewayPageURL });

      // order create and save data mongodb
      const finalOrder = {
        product: order.productList,
        paidStatus: false,
        transactionId: tran_id,
      };

      const result = orderModel.create(finalOrder);
      console.log("Redirecting to: ", GatewayPageURL);
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Payment Success
exports.paymentSuccess = async (req, res) => {
  try {
    // update paidStatus
    const result = await orderModel.updateOne(
      { transactionId: req.params.transId },
      {
        $set: {
          paidStatus: true,
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.redirect(`http://localhost:5173/api/payment/success/${req.params.transId}`);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Payment Success
exports.paymentFail = async (req, res) => {
  try {
    const result = await orderModel.deleteOne({ transactionId: req.params.transId });

    if (result.deletedCount) {
      res.redirect(`http://localhost:5173/api/payment/fail/${req.params.transId}`);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
