import { Schema, model, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "carts";

const schema = new Schema(
  {
    user_id: {
      type: Types.ObjectId,
      required: true,
      index: true,
      ref: "users",
    },
    product_id: {
      type: Types.ObjectId,
      required: true,
      index: true,
      ref: "products",
    },
    product_quantity: { type: Number },
    cart_status: {
      type: String,
      default: "saved",
      required: true,
      enum: ["saved", "submited"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("find", function () {
  this.populate("user_id", "email -_id");
});

schema.pre("findOne", function () {
  this.populate("user_id", "email -_id");
});

schema.pre("find", function () {
  this.populate("product_id", "title -_id");
});

schema.pre("findOne", function () {
  this.populate("product_id", "title -_id");
});

schema.plugin(mongoosePaginate);

const CartModel = model(collection, schema);

export default CartModel;
