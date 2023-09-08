// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         trim: true,
//         minLength: 1,
//         required: true
//     },
//     email: {
//         type: String,
//         trim: true,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//         minLength: 6,
//     },
//     phone: {
//         type: string,
//         required: true
//     },
//     profilePic: String,
//     role: {
//         type: String,
//         enum: ['user', 'admin'],
//         default: "user"
//     },
//     changePasswordAt: {
//         type: Date
//     },
//     isActive: {
//         type: Boolean,
//         default: true
//     },
//     verified: {
//         type: Boolean,
//         default: false
//     }
// }, { timestamps: true })

// userSchema.pre("save", function () {
//     this.password = bcrypt.hashSync(this.password, 7)
// })

// userSchema.pre("findOneAndUpdate", function () {
//     this._update.password = bcrypt.hashSync(this.password, 7)
// })

// export const userModel = mongoose.model("User", userSchema)

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "user name is required"],
        minLength: [1, "too short userName"]
    },
    email: {
        type: String,
        trim: true,
        unique: [true, "email must be unique"],
        required: [true, "email is required"],
        minLength: 1
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "min lenght 6 charachters"]
    },
    phone: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const userModel = mongoose.model("User", userSchema)