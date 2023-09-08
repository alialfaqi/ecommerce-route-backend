export const validation = (schema) => {
    return (req, res, next) => {
        const inputs = { ...req.body, ...req.params, ...req.query }
        const { error } = createCategorySchema.validate(inputs, { abortEarly: false })
        if (error) {
            const errors = error.details.map((detail) => detail.message)
            res.send(errors)
        } else {
            next()
        }
    }
}


//any middleware should return (req, res, next)