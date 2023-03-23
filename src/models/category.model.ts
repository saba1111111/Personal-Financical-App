import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema(
	{
		name: {
			required: true,
			type: String,
		},
		description: {
			required: false,
			type: String,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Category', CategorySchema);
