"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductFindQuerySchema = exports.ProductSchema = void 0;
const z = __importStar(require("zod"));
// Define Zod schemas for subdocuments
const VariantSchema = z.object({
    type: z.string().nonempty(),
    value: z.string().nonempty(),
});
const InventorySchema = z.object({
    quantity: z.number().positive(),
    inStock: z.boolean(),
});
// Define Zod schema for the main document
const ProductSchema = z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    price: z.number().positive(),
    category: z.string().nonempty(),
    tags: z.array(z.string().nonempty()),
    variants: z.array(VariantSchema),
    inventory: InventorySchema,
    isDeleted: z.boolean().optional(),
});
exports.ProductSchema = ProductSchema;
// Define Zod schema for pre-find and pre-findOne hooks
const ProductFindQuerySchema = ProductSchema.omit({ isDeleted: true });
exports.ProductFindQuerySchema = ProductFindQuerySchema;
