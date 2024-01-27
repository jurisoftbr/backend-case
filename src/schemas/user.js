import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: false,
			index: true,
			lowercase: true,
		},
		password: {
			type: String,
			hidden: true,
		},
		role: {
			type: String,
			enum: ['admin', 'user'],
			default: 'user',
		},
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
		collection: 'User',
	},
);

UserSchema.pre('save', function encryptPasswordHook(next) {
	if (this.isModified('password')) {
		this.password = this.encryptPassword(this.password);
	}

	return next();
});

UserSchema.methods = {
	comparePassword(plainTextPassword) {
		return bcrypt.compareSync(plainTextPassword, this.password);
	},
	encryptPassword(password) {
		return bcrypt.hashSync(password, 8);
	},
};

export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
