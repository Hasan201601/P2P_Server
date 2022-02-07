const router = require("express").Router()
const Loan = require("../models/Loan")
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken")

router.post("/loanRequest", verifyToken, async (req, res) => {
    const newLoan = new Loan({
        user: req.body.user,
        amount: req.body.amount,
        credentials: req.body.credentials
    })
    try {
        const savedLoan = await newLoan.save()
        res.status(201).json(savedLoan)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router