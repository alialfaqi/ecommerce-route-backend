import mongoose, { mongo } from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        minLength: 2
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    }
}, { timestamps: true })

export const subCategoryModel = mongoose.model("subCategory", subCategorySchema);