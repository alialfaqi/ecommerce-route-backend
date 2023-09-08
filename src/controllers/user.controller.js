// const createUser = async (req, res, next) => {
//     let results = new userModel(req.body)
//     let added = await results.save()
//     res.status(201).json({ message: 'added', added })
// }
import AppError from "../../utils/AppError"
import { userModel } from "../models/user.model.js"
import catchAsynncError from "../middlewares/catchAsyncError.js";


const createUser = async (req, res, next) => {
    const foundedUser = await userModel.find({ email: req.body.email })
    foundedUser && next(new AppError("Duplicated User", 409))
    const results = new userModel(req.body)
    const added = await results.save()
    res.send({ message: "added user", added })
}

const getAllUser = async (req, res, next) => {
    const results = await userModel.find()
}

const changePassword = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    req.body.changePasswordAt = Date.now()
    const result = userModel.findByIdAndUpdate(id, req.body, { new: true })
    !result && next(new AppError("user not found", 404))
    result && req.send({ message: "Done", result })
})

