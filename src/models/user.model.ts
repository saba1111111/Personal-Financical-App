import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
	{
		userName: {
			required: true,
			type: String,
		},
		email: {
			required: true,
			type: String,
		},
		password: {
			required: true,
			type: String,
		},
		categories: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Category',
				required: true,
			},
		],
		resetCode: String,
		resetCodeExpiration: Number,
	},
	{ timestamps: true }
);

export default mongoose.model('User', UserSchema);
