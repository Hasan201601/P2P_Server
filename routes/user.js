const router = require("express").Router()
const User = require("../models/User")
const CryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken")

router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SECRET),
        role: req.body.role
    })
    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        !user && res.status(401).json("Wrong Credentials")

        const hashedPassword = CryptoJs.AES.decrypt(
            user.password,
            process.env.PASS_SECRET
        )
        const OriginalPassword = hashedPassword.toString(CryptoJs.enc.Utf8)
        OriginalPassword !== req.body.password &&
            res.status(401).json("Wrong Credentials");

        const accessToken = await jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        )
        const { password, ...others } = user._doc;
        res.status(201).json({ others, accessToken })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.patch("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJs.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET
        ).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (err) {
        res.status(500).json(err);

    }
});
module.exports = router