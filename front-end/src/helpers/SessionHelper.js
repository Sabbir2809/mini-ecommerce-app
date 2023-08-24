class SessionHelper {
  setToken(token) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  setEmail(email) {
    localStorage.setItem("email", email);
  }
  getEmail() {
    return localStorage.getItem("email");
  }
  setGuestCart(productId) {
    localStorage.setItem("guestCartItem", productId);
  }
  getGuestCart() {
    return localStorage.getItem("guestCartItem");
  }
  convertPriceStringToNumber(getStringPrice) {
    const stringPrice = getStringPrice.cartList.price;
    const price = parseInt(stringPrice);
    return price;
  }
  removeSession() {
    localStorage.clear();
  }
}

export const {
  setToken,
  getToken,
  setEmail,
  getEmail,
  setGuestCart,
  getGuestCart,
  convertPriceStringToNumber,
  removeSession,
} = new SessionHelper();
