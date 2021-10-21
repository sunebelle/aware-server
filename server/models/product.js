import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name can't be empty"],
    trim: true,
  },
  code: {
    type: String,
    unique: true,
    default: `AZ-${Math.random().toString().substring(2, 8)}`,
  },
  description: [String], //height.. made in...
  price: {
    type: Number,
    required: [true, "A product must have a price"],
    min: [0, "Product price must be above 1"],
    max: [300, "Product price must be below 300"],
    default: 20,
  },
  imageCover: {
    type: String,
    required: [true, "Please provide the product image"],
  },
  images: [String],
  quantity: {
    type: Number,
    required: [true, "Please provide the number of product available"],
    default: 0,
    min: [0, "Quantity must be a positive number"],
  },
  available: {
    type: String,
    default: function (el) {
      if (this.quantity > 0) {
        return (el = "In-store");
      } else {
        return (el = "Out-of-stock");
      }
    },
  },
  size: {
    type: [String],
    // type: String,
    required: [true, "Please provide the size of product"],
    enum: {
      values: ["S", "M", "L", "XLL"],
      message: "Size is either: S, M, L, XLL",
    },
  },
  color: {
    type: [String],
    // type: String,
    required: [true, "Please provide the color of product"],
    //red, light-gold, cornflower, orange,charcoal-grey,white, black
  },
  brand: {
    // type: [String],
    type: String,
    required: [true, "Please provide the brand of product"],
    //Zara, H&M,Pull&Bear,Dior,Chanel
  },
  for: {
    type: String,
    // men, ladies, boys, girls
    required: [true, "A product must be used for a certain type of person"],
  },
  type: {
    type: String,
    // Tops/Bottoms/ Dresses/Jackets/Shoes/Accesories/Sale
    required: [true, "A product must belong to a type"],
  },
  category: {
    type: [String],
    required: [true, "A product must be categorized"],
    // "Rompers / Jumpsuits",  "Casual dresses","Going out dresses",
    // "Party / Ocassion dresses", "Mini dresses",
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

//This virtual will not appear on the tour DB, but with input if it is populated
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

const Product = mongoose.model("Product", productSchema);

export default Product;
