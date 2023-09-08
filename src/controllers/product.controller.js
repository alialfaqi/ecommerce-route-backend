import { Types } from "mongoose";
import AppError from "../../utils/AppError.js"
import slugify from "slugify";
import { productModel } from "../models/product.model.js";
import ApiFeature from "../../utils/APIFeature.js";

const createProduct = async (req, res, next) => {
    const { title } = req.body;
    req.body.slug = slugify(title);
    req.body.imgCover = req.files.imgCover[0].filename
    req.body.images = req.files.images.map(img => img.filename)
    const addedProduct = await productModel.insertMany(req.body)
    res.send({ message: "added", addedProduct })
    // await categoryModel.create({ name, slug: name })

    // const result = new categoryModel({ name, slug: slugify(name) })
    // await result.save()

}


// const getAllProducts = async (req, res, next) => {
//     //1-Pagination
//     let page = req.query.page * 1 || 1; //we use oring with 1 if ther is no page
//     if (page <= 0) page = 1  //conditon if the page a wrong number less than 1 
//     const skip = (page - 1) * 4

//     //2-Filter
//     let filterObj = { ...req.query }
//     let excludedQuery = ["page", "sort", "keyword", "fields"]
//     //to delete any query in the array before form the filterOb
//     excludedQuery.forEach((q) => {
//         delete filterObj[q]
//     })
//     //to find products with prices higher than  500 find({price:{$gte:500}})
//     filterObj = JSON.stringify(filterObj)
//     filterObj = filterObj.replace(/\bgt|gte|lt|lte\b/g, match => `$${match}`)
//     filterObj = JSON.parse(filterObj)

//     //3-sort
//     //build query 
//     let mongooseQuery = productModel.find(filterObj).skip(skip).limit(5)

//     if (req.query.sort) {
//         let sortBy = req.query.sort.split(",").join(" ")  //to sort by multiple things
//         mongooseQuery.sort(sortBy)
//     }

//     //$or oring in mongoose
//     //4-search 
//     if (req.query.keyword) {
//         mongooseQuery.find({
//             $or: [
//                 { title: { $regex: req.query.keyword, $options: "i" } }, { description: { $regex: req.query.keyword, $options: "i" } }
//             ]
//         })
//     }

//     //5-fields
//     if (req.query.field) {
//         let field = req.query.field.split(",").join(" ")
//         console.log(field);
//         mongooseQuery.select(field)
//     }

//     //execute query 
//     const results = await mongooseQuery
//     res.send({ message: "Done", page, results })
// }

const getAllProducts = async (req, res, next) => {
    let apiFeature = new ApiFeature(productModel.find(), req.query).pagination().sort().search()
    let results = await apiFeature.mongooseQuery
    res.send({ message: "Done", page: apiFeature.page, results })
}

const getProductById = async (req, res, next) => {
    const { id } = req.params
    const results = await productModel.findById(id)
    res.send({ message: "Done", results })
}

const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const { title } = req.body;
    if (req.body.name) {
        req.body.slug = slugify(title)
    }
    const result = await productModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
    !result && next(new AppError("not found Product", 404))
    result && res.send({ message: "success", result })
}
const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    // check if id is a valid objectId
    if (!Types.ObjectId.isValid(id))
        return next(new AppError("Invalid ObjectId.", 401))
    const result = await productModelctModel.findByIdAndDelete(id);
    if (!result)
        return next(new AppError("Product does not exist.", 404));
    res.send({ message: "success", result })
}

export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}