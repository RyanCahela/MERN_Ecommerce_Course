import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import morgan from "morgan";
import helmet from "helmet";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

//middleware
app.use(helmet());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("api is running...");
});

app.use("/api/products", productRoutes);

//Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on PORT: ${PORT}`.yellow.bold
  )
);
