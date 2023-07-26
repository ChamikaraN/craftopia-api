import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import { connect } from "./config/db";
import errorHandler from "./middleware/errorHandlerMiddleware";
import logger from "./utils/logger";
import authRouter from "./routes/auth";
import employeeRouter from "./routes/employee";
import categoryRouter from "./routes/category";
import productRouter from "./routes/product";
import orderRouter from "./routes/order";
import generateCategories from "./faker/generateCategories";
import generateProducts from "./faker/generateProducts";
import generateOrders from "./faker/generateOrders";

const app: Application = express();
const PORT = process.env.PORT ?? 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
  "https://employee-management-frontend-chami.vercel.app",
  "http://localhost:5173",
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
    credentials: true,
  })
);

app.use(helmet());

// Testing root endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("Hey this is my API running 🥳");
});

app.get("/generateCategories", async (req: Request, res: Response) => {
  try {
    await generateCategories();
    res.send("Hey this is my API running 🥳");
  } catch (error) {
    console.error("Error generating products:", error);
    res.status(500).send("Error generating products.");
  }
});

app.get("/generateProducts", async (req: Request, res: Response) => {
  try {
    await generateProducts();
    res.send("Hey this is my API running 🥳");
  } catch (error) {
    console.error("Error generating products:", error);
    res.status(500).send("Error generating products.");
  }
});

app.get("/generateOrders", async (req: Request, res: Response) => {
  try {
    await generateOrders();
    res.send("Hey this is my API running 🥳");
  } catch (error) {
    console.error("Error generating products:", error);
    res.status(500).send("Error generating products.");
  }
});

// Routes
// Auth Route
app.use("/api/v1/auth", authRouter);
// Employee Route
app.use("/api/v1/employee", employeeRouter);
// Category Route
app.use("/api/v1/category", categoryRouter);
// Product Route
app.use("/api/v1/product", productRouter);
// Order Route
app.use("/api/v1/order", orderRouter);

// Error handling middleware
app.use(errorHandler);

// Connect to database and start server
connect()
  .then(() => {
    logger.info("Connected to database!");
    app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
      app.emit("ready"); // emit the ready event
    });
  })
  .catch((err: Error) => {
    console.error(err);
  });

export default app;
