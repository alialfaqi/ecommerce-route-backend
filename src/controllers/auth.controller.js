import catchAsynncError from "../middlewares/catchAsyncError"

const allowTo = (...roles) => {

    return catchAsynncError((req, res, next) => {
        if (!roles.includes(req.user.role)) return next(new AppError("not authorized", 403))
        next()
    })
}

