import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Orders from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    //clear the data models (clear the database)
    await Orders.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    console.log("createdUsers", createdUsers);

    //we need to attach the admin users id to the user field of the products model
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (e) {
    console.error(`${e}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    //clear the data models (clear the database)
    await Orders.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (e) {
    console.error(`${e}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  //WARNING: This will delete the entire database
  //destroyData();
} else {
  importData();
}
