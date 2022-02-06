const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "User Name already Exists"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "this email already have an account"]
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "lender", "admin"]
    },
    status: {
        type: String,
        default: "pending"
    },
}, { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);