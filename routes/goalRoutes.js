const express = require('express');
const {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
} = require('../controllers/goalController');
const router = express.Router();

// Get all goals
router.get('/', getGoals);

// Create a goal
router.post('/', createGoal);

// Update a goal
router.put('/:id', updateGoal);

// Delete a goal
router.delete('/:id', deleteGoal);

module.exports = router;
