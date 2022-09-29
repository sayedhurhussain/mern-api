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
            token: generateToken(user._id) 
        })
    } else {
            res.status(400)
            throw new Error('Invalid user data')
    }
 })

// @desc   login/ Authenticate new user
// @route   POST /api/users/login
// @access  public
const loginUser = asyncHandler(async (req, res) =>{
    const {email, password} = req.body

    // Check the user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
 })

 // Generate JWT
 const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
 }



 module.exports = {
    registerUser,
    loginUser,
 }