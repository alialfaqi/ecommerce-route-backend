import { Types } from "mongoose";
import AppError from "../../utils/AppError.js";
import { brandModel } from "../models/brand.model.js"
import slugify from "slugify";

const createBrand = async (req, res, next) => {
    const { name } = req.body;

    const addedBrand = await brandModel.insertMany({ name, slug: slugify(name) })
    res.send({ message: "added", addedBrand })
    // await categoryModel.create({ name, slug: name })

    // const result = new categoryModel({ name, slug: slugify(name) })
    // await result.save()

}


const getAllBrands = async (req, res, next) => {
    const results = await brandModel.find({})
    res.send({ message: "Done", results })
}

const getBrandById = async (req, res, next) => {
    const { id } = req.params
    const results = await brandModel.findById(id)
    res.send({ message: "Done", results })
}

const updateBrand = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const result = await brandModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
    !result && next(new AppError("not found Brand", 404))
    result && res.send({ message: "success", result })
}
const deleteBrand = async (req, res, next) => {
    const { id } = req.params;
    // check if id is a valid objectId
    if (!Types.ObjectId.isValid(id))
        return next(new AppError("Invalid ObjectId.", 401))
    const result = await brandModel.findByIdAndDelete(id);
    if (!result)
        return next(new AppError("Brand does not exist.", 404));
    res.send({ message: "success", result })
}

export {
    createBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand
}