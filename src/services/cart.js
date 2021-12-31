class Cart {
  static addToCart(product = null, qty = 1, cart) {
    console.log(qty);
    if (!this.inCart(product.id, cart)) {
      const format = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
      });
      const prod = {
        id: product.id,
        title: product.title,
        price: product.price,
        qty: qty,
        image: product.image,
        formattedPrice: format.format(product.price),
      };
      cart.items.push(prod);
      console.log('dfggdgdgdfg');
      this.calculateTotals(cart);
    }
  }

  static removeFromCart(id = 0, cart) {
    for (let i = 0; i < cart.items.length; i++) {
      const item = cart.items[i];
      if (item.id === id) {
        cart.items.splice(i, 1);
        this.calculateTotals(cart);
      }
    }
  }

  static updateCart(ids = [], qtys = [], cart) {
    let map = [];
    let updated = false;

    ids.forEach((id) => {
      qtys.forEach((qty) => {
        map.push({
          id: parseInt(id, 10),
          qty: parseInt(qty, 10),
        });
      });
    });
    map.forEach((obj) => {
      cart.items.forEach((item) => {
        if (item.id === obj.id) {
          if (obj.qty > 0 && obj.qty !== item.qty) {
            item.qty = obj.qty;
            updated = true;
          }
        }
      });
    });
    if (updated) {
      this.calculateTotals(cart);
    }
  }

  static inCart(productID = 0, cart) {
    let found = false;

    cart.items.forEach((item) => {
      if (item.id === productID) {
        found = true;
      }
    });
    return found;
  }

  static calculateTotals(cart) {
    cart.totals = 0.0;
    cart.items.forEach((item) => {
      let price = item.price;
      let qty = item.qty;
      let amount = price * qty;

      cart.totals += amount;
    });
    console.log(cart);
    this.setFormattedTotals(cart);
  }

  static emptyCart(request) {
    if (request.session) {
      request.session.cart.items = [];
      request.session.cart.totals = 0.0;
      request.session.cart.formattedTotals = '';
    }
  }

  static setFormattedTotals(cart) {
    console.log(cart);
    let format = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
    });
    let totals = cart.totals;
    cart.formattedTotals = format.format(totals);
  }
}

export default Cart;
