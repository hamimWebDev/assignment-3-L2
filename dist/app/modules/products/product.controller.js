"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsController = void 0;
const product_service_1 = require("./product.service");
const product_zod_validation_1 = require("./product.zod.validation");
const postProductsFromDb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const zodData = product_zod_validation_1.ProductSchema.parse(productData);
        const result = yield product_service_1.productsService.postProductsFromDb(zodData);
        res.json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
});
const getAllProductsFromDb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        if (typeof searchTerm == "undefined") {
            const result = yield product_service_1.productsService.getAllProductsFromDb();
            res.json({
                success: true,
                message: "Products fetched successfully!",
                data: result,
            });
        }
        else if (typeof searchTerm !== "undefined") {
            const result = yield product_service_1.productsService.searchIPhoneByIdFromDb();
            res.json({
                success: true,
                message: "Products matching search term 'iphone' fetched successfully!",
                data: result,
            });
        }
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
});
const getProductByIdFromDb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.productId;
        const result = yield product_service_1.productsService.getProductByIdFromDb(_id);
        res.json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
});
const putProductByIdFromDb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateData = req.body;
        const _id = req.params.productId;
        const product = yield product_service_1.productsService.putProductByIdFromDb(_id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        // Update product data
        Object.assign(product, updateData);
        // Decrease inventory quantity by 1
        if (product.inventory.quantity > 0) {
            product.inventory.quantity -= 1;
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Insufficient inventory quantity",
            });
        }
        const updatedProduct = yield product.save();
        res.json({
            success: true,
            message: "Product updated successfully!",
            data: updatedProduct,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
});
const deletedProductByIdFromDb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.productId;
        const result = yield product_service_1.productsService.deletedProductByIdFromDb(_id);
        res.json({
            success: true,
            message: "Product deleted successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
});
exports.productsController = {
    postProductsFromDb,
    getAllProductsFromDb,
    getProductByIdFromDb,
    deletedProductByIdFromDb,
    putProductByIdFromDb,
};
