import mongoose, { Schema } from 'mongoose';

const TransactionSchema = new Schema(
	{
		description: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		type: {
			type: String,
			enum: ['income', 'expense'],
			required: true,
		},
		status: {
			type: String,
			enum: ['processing', 'completed'],
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Transaction', TransactionSchema);
