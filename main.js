import express from "express"
import * as dotenv from "dotenv"
dotenv.config()
import morgan from "morgan"
import { connection } from "./db.js"

//import routes
import categoryRouter from "./src/routes/category.routes.js"
import subCategoryRouter from "./src/routes/subCategory.routes.js"
import brandRouter from "./src/routes/brand.routes.js"
import productRouter from "./src/routes/product.routes.js"
import AppError from "./utils/AppError.js"

const app = express()
const port = 3000
connection()

//Middlewares
app.use(express.static('uploads'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))   //for loggging most common is dev   


//Routes
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/subcategory", subCategoryRouter)
app.use("/api/v1/brand", brandRouter)
app.use("/api/v1/product", productRouter)
app.all("*", (req, res, next) =>
    // res.send({ message: `can't find this route : ${req.originalUrl}` })
    next(new AppError(`can't find this route: ${req.originalUrl}`, 404))
)


//Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).send({
        status: statusCode,
        message: err?.message || "Internal Server Error!",
        errors: err?.errors || []
    })
})

process.on("unhandledRejection", (err) => {
    console.log(err)
})

app.listen(port, () => console.log(`app is listening on port${port}`))


