const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
    user: {
        type: Object,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    credentials: {
        type: Object,
        required: true
    }
}, { timestamps: true }
)
module.exports = mongoose.model("Loan", loanSchema)