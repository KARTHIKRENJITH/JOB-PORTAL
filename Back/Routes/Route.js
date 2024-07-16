const express = require("express");
const router = express.Router();
const User = require("../Models/UserSchema");       
const {SignUp,getAll,Login,Logout} = require("../Controller/Register");
const {MobileLogin,Otp} = require("../Controller/OtpAuth");
const passport = require("passport");


router.post("/register", SignUp);
router.get("/getAll", getAll);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/mobilelogin", MobileLogin);
router.post("/otp", Otp);



router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/home',
    failureRedirect: 'http://localhost:5173'
}));

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({ message: "success", user: req.user });
    } else {
        res.status(400).json({ message: "unsuccess" });
    }
});




module.exports = router