import { Types } from "mongoose";
import AppError from "../../utils/AppError.js";
import slugify from "slugify";
import { subCategoryModel } from "../models/subcategory.model.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";

const createSubCategory = async (req, res, next) => {
    const { name, categoryId } = req.body;

    const addedSubCategory = await subCategoryModel.insertMany({ name, slug: slugify(name), category: categoryId })
    res.send({ message: "added", addedSubCategory })
    // await categoryModel.create({ name, slug: name })

    // const result = new categoryModel({ name, slug: slugify(name) })
    // await result.save()

}


const getAllSubCategories = catchAsyncError(async (req, res, next) => {
    let filter = {}
    if (req.params && req.params.id) {
        filter = {
            category: req.params.id
        }
    }
    const results = await subCategoryModel.find(filter)
    res.send({ message: "Done", results })
}
)


const getSubCategoryById = async (req, res, next) => {
    const { id } = req.params
    const results = await subCategoryModel.findById(id)
    res.send({ message: "Done", results })
}

const updateSubCategory = async (req, res, next) => {
    const { id } = req.params;
    const { name, categoryId } = req.body;
    const result = await subCategoryModel.findByIdAndUpdate(id, { name, slug: slugify(name), category: categoryId }, { new: true })
    !result && next(new AppError("not found category", 404))
    result && res.send({ message: "success", result })
}
const deleteSubCategory = async (req, res, next) => {
    const { id } = req.params;
    // check if id is a valid objectId
    if (!Types.ObjectId.isValid(id))
        return next(new AppError("Invalid ObjectId.", 401))
    const result = await subCategoryModel.findByIdAndDelete(id);
    if (!result)
        return next(new AppError("subCategory does not exist.", 404));
    res.send({ message: "success", result })
}

export {
    createSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory
}