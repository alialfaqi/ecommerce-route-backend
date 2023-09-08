// const globalErrorHandler = () => {
//     return app.use((err, req, res, next) => {
//         const statusCode = err.statusCode || 500
//         res.status(statusCode).send({
//             status: statusCode,
//             message: err?.message || "internal server error",
//             errros: err?.errros || []
//         })
//     })
// }



const globalErrorHandler = () => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).send({
        status: statusCode,
        message: err?.message || "internal server error",
        errros: err?.errros || []
    })
}
