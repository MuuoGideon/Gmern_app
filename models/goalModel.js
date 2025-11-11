import mongoose from 'mongoose';

const goalSchema = mongoose.Schema(
	{
		fName: {
			type: String,
			required: [true, 'Please enter your first name value'],
		},
		year: {
			type: Number,
			required: [true, 'Please enter amount value'],
		},
		month: {
			type: Number,
			required: [true, 'Please enter amount value'],
		},
		amount: {
			type: Number,
			required: [true, 'Please enter amount value'],
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Goal', goalSchema);
