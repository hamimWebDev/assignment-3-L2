"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRoute = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// post product
router.post("/", product_controller_1.productsController.postProductsFromDb);
// search all iphone
// get All product
router.get("/", product_controller_1.productsController.getAllProductsFromDb);
// get A product by id
router.get("/:productId", product_controller_1.productsController.getProductByIdFromDb);
// put A product by id
// product.inventory.quantity -= 1
router.put("/:productId", product_controller_1.productsController.putProductByIdFromDb);
// delete A product by id
router.delete("/:productId", product_controller_1.productsController.deletedProductByIdFromDb);
// product Tasks complete
exports.productsRoute = router;
