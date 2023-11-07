import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
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
    image: String
}, {
    timestamps: true
})

categorySchema.post('init', (doc) => {
    console.log(doc, 'from doc');
    doc.image = `http://localhost:3000/category/${doc.image}`
})

export const categoryModel = mongoose.model("Category", categorySchema);