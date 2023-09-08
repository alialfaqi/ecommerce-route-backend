import { Types } from "mongoose";
import AppError from "../../utils/AppError.js";
import { categoryModel } from "../models/category.model.js";
import slugify from "slugify";
import ApiFeature from "../../utils/APIFeature.js";
import catchAsyncError from "../middlewares/catchAsyncError.js"





const createCategory = catchAsyncError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename

    // const addedCategory = await categoryModel.insertMany(req.body)

    // res.send({ message: "added", addedCategory })
    // await categoryModel.create({ name, slug: name })

    const result = new categoryModel(req.body)
    await result.save()
})


const getAllCategories = catchAsyncError(async (req, res, next) => {
    let apiFeature = new ApiFeature(categoryModel.find(), req.query).pagination().sort().search()
    let results = await apiFeature.mongooseQuery
    res.send({ message: "Done", page: apiFeature.page, results })
})

const getCategoryById = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    const results = await categoryModel.findById(id)
    res.send({ message: "Done", results })
})

const updateCategory = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.params;
        const { name } = req.body;
        const result = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        !result && next(new AppError("not found category", 404))
        result && res.send({ message: "success", result })
    }
)

const deleteCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    // check if id is a valid objectId
    if (!Types.ObjectId.isValid(id))
        return next(new AppError("Invalid ObjectId.", 401))
    const result = await categoryModel.findByIdAndDelete(id);
    if (!result)
        return next(new AppError("Category does not exist.", 404));
    res.send({ message: "success", result })
})

export {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}

