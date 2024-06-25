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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsService = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const postProductsFromDb = (pData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.create(pData);
    return result;
});
const getAllProductsFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.find();
    return result;
});
const getProductByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findById(id);
    return result;
});
const putProductByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findById(id);
    return product;
});
const deletedProductByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.updateOne({ _id: id }, { isDeleted: true });
    return result;
});
const searchIPhoneByIdFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.default.find({
        name: { $regex: "iphone", $options: "i" },
    });
    return products;
});
exports.productsService = {
    postProductsFromDb,
    getAllProductsFromDb,
    getProductByIdFromDb,
    deletedProductByIdFromDb,
    putProductByIdFromDb,
    searchIPhoneByIdFromDb,
};
