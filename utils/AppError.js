// export default class AppError extends Error {
//     constructor(message, statusCode) {
//         super(message)
//         // this.message = message
//         this.statusCode = statusCode
//     }
// }

export default class AppError extends Error {
    constructor(message, statusCode, errors) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
}




