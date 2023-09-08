import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minLength: 2
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    priceAfterDiscount: {
        type: Number,
        min: 0
    },
    ratingAvg: {
        type: Number,
        min: 1,
        max: 5
    },
    ratingCount: {
        type: Number,
        default: 0,
        min: 0
    },
    description: {
        type: String,
        minlength: 5,
        maxLength: 300,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0,
        required: true
    },
    sold: {
        type: Number,
        default: 0,
        min: 0
    },
    imgCover: String,
    images: [String],
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    },
    subCategory: {
        type: mongoose.Types.ObjectId,
        ref: "subCategory",
        required: true
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "Brand",
        required: true
    }

}, {
    timestamps: true
}
)
//hooks -- mongoose middleware
productSchema.post('init', (doc) => {
    doc.imageCover = process.env.BASE_URL + "product/" + doc.imageCover;
    doc.images = doc.images.map(ele => process.env.BASE_URL + "product/" + ele)
})


export const productModel = mongoose.model("Product", productSchema)


