const express = require('express')
const router = express.Router()
const {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
} = require('../controllers/goalController')


const {protect} = require('../middleware/authMiddleware')

// get and post in one route
router.route('/').get(protect, getGoals).post(protect, setGoals)

// router.get('/', getGoals)
// router.post('/', setGoals)

// delete and update in one route
router.route('/:id').delete(protect, deleteGoals).put(protect, updateGoals) 

// router.put('/:id', updateGoals)
// router.delete('/:id', deleteGoals)



// router.get('/', (req, res) => {
//     // res.send('Get Goals');
    
//     // return json file
//     res.status(200 ).json({ message: 'Get goals' })
// })

// router.post('/', (req, res) => {
//     res.status(200 ).json({ message: 'Set goals' })
// })

// router.put('/:id', (req, res) => { 
//     res.status(200 ).json({ message: `Update goal ${req.params.id}` })
// })

// router.delete('/:id', (req, res) => {
//     res.status(200 ).json({ message: `Delete goal ${req.params.id}` })
// })

module.exports = router
