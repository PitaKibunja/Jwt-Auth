const router = require('express').Router()
const { check,validationResult } = require("express-validator")
const { users } = require("../db")
const bcrypt = require("bcrypt")

router.post('/signup', [
    check("email","Please provide a valid email").isEmail(),
    check("password","Please provide a password that is greater than 5 characters").isLength({min:6})
],async(req, res) => {
    const { password, email } = req.body
    
    //validate the input
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors:errors.array()
        })
    }
    //validate the existence of the user
    let user = users.find((user) => {
        return user.email===email
    })
    if (user) {
        res.status(400).json({
            status: 'failure',
            msg:"The user already exists"
        })
    }

    let hashedPassword = await bcrypt.hash(password, 10)
    
    users.push({
        email,
        password:hashedPassword
    })
   
    res.json('Message at home now')
})
router.get("/allusers", async (req, res) => {
    res.json(users)
})


module.exports=router