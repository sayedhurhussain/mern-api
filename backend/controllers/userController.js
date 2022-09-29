const jwt = require('jsonwebtoken')
const bcrypt = require ('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel') 

// @desc    Register new user
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) =>{
    const {name, email, password} = req.body

    // Registration validation
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all field')
    }

    // Check if user exixts
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hasedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hasedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        })
    } else {
            res.status(400)
            throw new Error('Invalid user data')
    }
 })


 module.exports = {
    registerUser,
 }