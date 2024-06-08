import fs from "fs";
import crypto from "crypto";

class CartsManager {
  constructor() {
    (this.path = "./src/data/fs/files/carts.json"), this.init();
  }

  init() {
    const exists = fs.existsSync(this.path);

    if (!exists) {
      const carts = [];
      const cartsString = JSON.stringify(carts, null, 4);
      fs.writeFileSync(this.path, cartsString);
      console.log(`File in path ${this.path} has been created`);
    } else {
      console.log(`File in path ${this.path} already exists.`);
    }
  }

  async create(data, next) {
    try {
      if (Object.keys(data).length === 0) {
        const error = new Error(
          "Bad request: the create method requires a data object that has not been passed as a parameter."
        );
        error.statusCode = 400;
        throw error;
      }

      if (!data.user_id) {
        const error = new Error("Bad request: user:id field is required.");
        error.statusCode = 400;
        throw error;
      } else {
        const cart = {
          id: crypto.randomBytes(12).toString("hex"),
          user_id: data.user_id,
          product_id: data.product_id,
          quantity: data.quantity || 1,
          state: data.state || "reserved",
        };

        let carts = await fs.promises.readFile(this.path, "utf-8");
        carts = JSON.parse(carts);
        carts.push(cart);
        carts = JSON.stringify(carts, null, 4);

        await fs.promises.writeFile(this.path, carts);

        console.log(`Cart created with ID: ${cart.id} at path ${this.path}`);
        return cart;
      }
    } catch (error) {
      return next(error);
    }
  }

  async read(user_id) {
    try {
      let userCarts = await fs.promises.readFile(this.path, "utf-8");
      userCarts = JSON.parse(userCarts);

      if (userCarts.length === 0) {
        const error = new Error("The user Cart is empty.");
        throw error;
      } else {
        return userCarts;
      }
    } catch (error) {
      console.log(`Error while reading user carts: ${error}`);
      return [];
    }
  }

  async readOne(id, next) {
    try {
      if (id === ":id") {
        const error = new Error(
          "Bad request:: the ID parameter is required by the readOne method."
        );
        error.statusCode = 400;
        throw error;
      }

      let userCarts = await fs.promises.readFile(this.path, "utf-8");
      userCarts = JSON.parse(userCarts);

      if (userCarts.length === 0) {
        const error = new Error("No cart to show.");
        throw error;
      } else {
        const foundCart = userCarts.find((cart) => cart.id === id);

        if (!foundCart) {
          console.log(`Cart ID ${id} not found.`);
          return null;
        } else {
          console.log("Found cart: ", foundCart);
          return foundCart;
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  async destroy(id, next) {
    if (id === ":id") {
      const error = new Error(
        "Bad request:: the ID parameter is required by the destroy method."
      );
      error.statusCode = 400;
      throw error;
    }

    try {
      let userCarts = await this.read();

      const foundCart = userCarts.find((cart) => cart.id === id);

      if (!foundCart) {
        const error = new Error(`Cart ID ${id} not found to delete.`);
        error.statusCode = 404;
        throw error;
      } else {
        let cartsUpdated = userCarts.filter((cart) => cart.id !== id);
        cartsUpdated = JSON.stringify(cartsUpdated, null, 4);

        await fs.promises.writeFile(this.path, cartsUpdated);
        console.log(`Cart ID ${id} has been deleted.`);
        return foundCart;
      }
    } catch (error) {
      return next(error);
    }
  }

  async update(id, data, next) {
    try {
      if (id === ":id") {
        const error = new Error(
          "Bad request: the ID parameter is required by the update method."
        );
        error.statusCode = 400;
        throw error;
      }

      let userCarts = await fs.promises.readFile(this.path, "utf-8");
      userCarts = JSON.parse(userCarts);
      let cartFound = userCarts.find((cart) => cart.id === id);

      if (!cartFound) {
        const error = new Error(`Not found: Cart ID ${id} not found.`);
        error.statusCode = 404;
        throw error;
      } else {
        cartFound = Object.assign(cartFound, data);
        userCarts = JSON.stringify(userCarts, null, 4);

        await fs.promises.writeFile(this.path, userCarts);
        console.log(`Cart ID ${id} updated.`);
        return cartFound;
      }
    } catch (error) {
      return next(error);
    }
  }
}

const cartsManager = new CartsManager();
export default cartsManager;
