import express from 'express';
import {
	getGoals,
	getGoal,
	createGoal,
	updateGoal,
	deleteGoal,
} from '../controllers/goalController.js';

const router = express.Router();

// CRUD routes
router.route('/').get(getGoals).post(createGoal);

router.route('/:id').get(getGoal).put(updateGoal).delete(deleteGoal);

export default router;
