const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// const { json } = require("express")

// @desc    Get goals
// @route GET /api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
    // res.status(200 ).json({ message: 'Get goals' })
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

// @desc    Set goals
// @route POST /api/goals
// @access private
const setGoals = asyncHandler(async (req, res) => {
    // res.status(200 ).json({ message: 'Set goals' })
    if(!req.body.text) {
        // res.status(400).json( {message: 'please add a text field'} )
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })
    // res.status(200).json({ message: 'set goal'})
    res.status(200).json(goal)
 
})

// @desc    Update goals
// @route PUT /api/goals/:id
// @access private
const updateGoals = asyncHandler(async (req, res) => { 
    // res.status(200 ).json({ message: `Update goal ${req.params.id}` })
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new ('Goal not found')
    }

    const user = await User.findById(req.user.id)

    // Check the user
    if(!user) {
        req.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true, })

    res.status(200 ).json(updatedGoal)
})

// @desc    Delete goals
// @route DELETE /api/goals
// @access private
const deleteGoals = asyncHandler(async (req, res) => {
    // res.status(200 ).json({ message: `Delete goal ${req.params.id}` })
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new ('Goal not found')
    }

    const user = await User.findById(req.user.id)

    // Check the user
    if(!user) {
        req.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove()

    res.status(200 ).json({ id: req.params.id})
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}