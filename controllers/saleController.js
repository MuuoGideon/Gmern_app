import asyncHandler from 'express-async-handler';
import Sale from '../models/saleModel.js';

// ===============================
// GET ALL SALES
// ===============================
const getSales = asyncHandler(async (req, res) => {
	const sales = await Sale.find().sort({ saleDate: -1 });
	res.status(200).json(sales);
});

// ===============================
// GET SINGLE SALE
// ===============================
const getSale = asyncHandler(async (req, res) => {
	const sale = await Sale.findById(req.params.id);

	if (!sale) {
		return res.status(404).json({ message: 'Sale not found' });
	}

	res.status(200).json(sale);
});

// ===============================
// CREATE NEW SALE
// ===============================
const setSale = asyncHandler(async (req, res) => {
	const { itemName, quantity, pricePerUnit, customerName, notes } = req.body;

	if (!itemName || !quantity || !pricePerUnit) {
		res.status(400);
		throw new Error('Please provide itemName, quantity, and pricePerUnit');
	}

	const sale = await Sale.create({
		itemName,
		quantity,
		pricePerUnit,
		customerName: customerName || 'Walk-in Customer',
		notes: notes || '',
	});

	res.status(201).json(sale);
});

// ===============================
// UPDATE SALE
// ===============================
const updateSale = asyncHandler(async (req, res) => {
	let sale = await Sale.findById(req.params.id);

	if (!sale) {
		res.status(404);
		throw new Error('Sale not found');
	}

	const updatedSale = await Sale.findByIdAndUpdate(
		req.params.id,
		{
			itemName: req.body.itemName ?? sale.itemName,
			quantity: req.body.quantity ?? sale.quantity,
			pricePerUnit: req.body.pricePerUnit ?? sale.pricePerUnit,
			customerName: req.body.customerName ?? sale.customerName,
			notes: req.body.notes ?? sale.notes,
		},
		{ new: true, runValidators: true }
	);

	res.status(200).json(updatedSale);
});

// ===============================
// DELETE SALE
// ===============================
const deleteSale = asyncHandler(async (req, res) => {
	const sale = await Sale.findById(req.params.id);

	if (!sale) {
		res.status(404);
		throw new Error('Sale not found');
	}

	await sale.deleteOne();
	res.status(200).json({ id: req.params.id });
});

export { getSales, getSale, setSale, updateSale, deleteSale };
