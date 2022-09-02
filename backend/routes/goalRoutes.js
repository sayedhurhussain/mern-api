const express = require('express');
const router = express.Router();
const { getGoals, setGoals, updateGoals, deleteGoals } = require('../controllers/goalController')

// get and post in one route
router.route('/').get(getGoals).post(setGoals);

// router.get('/', getGoals)
// router.post('/', setGoals)

// delete and update in one route
router.route('/:id').delete(deleteGoals).put(updateGoals)

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
