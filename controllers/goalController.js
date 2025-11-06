const asyncHandler = require('express-async-handler');

// @desc    Get all goals
// @route   GET /api/goals
// @acess   private
const getGoals = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'Get goals' });
});

// @desc    Create a goal
// @route   POST /api/goals
// @access   private
const createGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please include a text field ooh');
	} else {
		res.status(201).json({ message: 'Create a goal' });
	}
});

// @desc    Update a goal
// @route   PUT /api/goals/:id
// @access  private
const updateGoal = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Update goal ${req.params.id}` });
});

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
// @acess   private
const deleteGoal = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Delete goal ${req.params.id}` });
});

module.exports = {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
};
