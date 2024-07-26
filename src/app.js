import express from "express";
import productsRouter from "./routes/products.routes.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";

const app = express();
// Habilitar CORS 
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api", productsRouter);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Page not found",
  });
});

export default app;
