import { Types } from "mongoose";
import AppError from "../../utils/AppError.js";
import { categoryModel } from "../models/category.model.js";
import slugify from "slugify";

const createCategory = async (req, res, next) => {
    const { name } = req.body;

    const addedCategory = await categoryModel.insertMany({ name, slug: slugify(name) })
    res.send({ message: "added", addedCategory })
    // await categoryModel.create({ name, slug: name })

    // const result = new categoryModel({ name, slug: slugify(name) })
    // await result.save()

}


const getAllCategories = async (req, res, next) => {
    const results = await categoryModel.find({})
    res.send({ message: "Done", results })
}

const getCategoryById = async (req, res, next) => {
    const { id } = req.params
    const results = await categoryModel.findById(id)
    res.send({ message: "Done", results })
}

const updateCategory = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const result = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
    !result && next(new AppError("not found category", 404))
    result && res.send({ message: "success", result })
}
const deleteCategory = async (req, res, next) => {
    const { id } = req.params;
    // check if id is a valid objectId
    if (!Types.ObjectId.isValid(id))
        return next(new AppError("Invalid ObjectId.", 401))
    const result = await categoryModel.findByIdAndDelete(id);
    if (!result)
        return next(new AppError("Category does not exist.", 404));
    res.send({ message: "success", result })
}

export {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}