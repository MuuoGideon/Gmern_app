import mongoose from 'mongoose'; // bring in mongoose to allow schema creation and interaction with DB

// A schema tells Mongoose how each sale document should look.
const saleSchema = new mongoose.Schema(
	{
		itemName: {
			type: String,
			required: true,
			trim: true, // trim emepty spaces
		},
		quantity: {
			type: Number,
			required: true,
			min: 1,
		},
		pricePerUnit: {
			type: Number,
			required: true,
			min: 0,
		},
		totalPrice: {
			type: Number,
			default: 0, // Will be overwritten automatically
		},
		customerName: {
			type: String,
			required: true,
			trim: true,
		},
		notes: {
			type: String,
			trim: true,
		},
	},
	{ timestamps: true }
);

// 🔥 AUTO CALCULATE TOTAL PRICE BEFORE SAVE
// pre('save'): runs before saving a document.
// this: refers to the document being saved.
// It automatically computes:
saleSchema.pre('save', function (next) {
	this.totalPrice = this.quantity * this.pricePerUnit;
	next();
});

// 🔥 ALSO CALCULATE FOR findOneAndUpdate()
// Auto-calculating totalPrice during updates
saleSchema.pre('findOneAndUpdate', function (next) {
	const update = this.getUpdate();

	// Only calculate if quantity or price changed
	if (update.quantity != null || update.pricePerUnit != null) {
		const quantity = update.quantity ?? this.getQuery().quantity;
		const price = update.pricePerUnit ?? this.getQuery().pricePerUnit;

		update.totalPrice = quantity * price;
	}

	next();
});

export default mongoose.model('Sale', saleSchema);
