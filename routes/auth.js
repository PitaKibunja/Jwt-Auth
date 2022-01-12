const router = require('express').Router()
const { check,validationResult } = require("express-validator")

router.get('/', (req, res) => {
    res.send('Auth route is working')
})
router.post('/signup', [
    check("email","Please provide a valid email").isEmail(),
    check("password","Please provide a password that is greater than 5 characters").isLength({min:6})
],(req, res) => {
    const { password, email } = req.body
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors:errors.array()
        })
    }
    console.log(password,email)
    res.json('Message at home now')
})



module.exports=router