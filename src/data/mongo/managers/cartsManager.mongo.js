import Manager from "../Manager.mongo.js";
import cartModel from "../models/cart.model.js";

const cartsManager = new Manager(cartModel);
export default cartsManager;