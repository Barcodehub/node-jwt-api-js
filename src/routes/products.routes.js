import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} from "../controllers/products.controllers.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/products", verifyToken, getProducts); //pasas token, osea debes estar logueado
router.get("/product/:id", verifyToken, getProduct);
router.post("/products", [verifyToken, isAdmin], createProduct); //si requiere admin logueado
router.patch("/product/:id", [verifyToken, isAdmin], updateProduct);
router.delete("/product/:id", [verifyToken, isAdmin], deleteProduct);

export default router;