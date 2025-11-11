import asyncHandler from 'express-async-handler';
import Goal from '../models/goalModel.js';

// @desc    Get all goals
// @route   GET /api/goals
// @access  private
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find();
	res.status(200).json(goals);
});

// @desc    Get a single goal
// @route   GET /api/goals/:id
// @access  private
const getGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(404);
		throw new Error('Goal not found');
	}
	res.status(200).json(goal);
});

// @desc    Create a new goal
// @route   POST /api/goals
// @access  private
const createGoal = asyncHandler(async (req, res) => {
	const { fName, year, month, amount } = req.body;

	// Validate required fields
	if (!fName || !year || !month || !amount) {
		res.status(400);
		throw new Error(
			'Please include all required fields: fName, year, month, amount'
		);
	}

	const goal = await Goal.create({ fName, year, month, amount });
	res.status(201).json(goal);
});

// @desc    Update a goal
// @route   PUT /api/goals/:id
// @access  private
const updateGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(404);
		throw new Error('Goal not found');
	}

	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedGoal);
});

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
// @access  private
const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(404);
		throw new Error('Goal not found');
	}

	await goal.deleteOne();
	res.status(200).json({ id: req.params.id });
});

export { getGoals, getGoal, createGoal, updateGoal, deleteGoal };
