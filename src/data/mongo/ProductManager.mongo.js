import Product from "./models/product.model.js";

class ProductManager {
  constructor() {}
  async create(data) {
    try {
      const one = await Product.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async read(cat) {
    try {
      const all = await Product.find();
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = await Product.findById({ _id: id });
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const one = await Product.findByIdAndUpdate(id, data, { new: true });
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = await Product.findByIdAndDelete(id);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const productManager = new ProductManager();
export default productManager;