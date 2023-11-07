import AppError from "../AppError";

const deleteOne = (model) => {
    async (req, res, next) => {
        const { id } = req.params;
        const result = await model.findByIdAndDelete(id);
        !result && next(new AppError("Brand not Found", 404));
        result && res.send({ message: "success", result });
    }

}

export default deleteOne;