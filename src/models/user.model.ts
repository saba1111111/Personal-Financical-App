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
	},
	{ timestamps: true }
);

export default mongoose.model('User', UserSchema);