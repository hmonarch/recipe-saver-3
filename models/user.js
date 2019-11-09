const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: Schema.ObjectId,
	email: String,
	password: String,
	name: String,
	facebookId: String,
	googleId: String,
	subscription: String,
	profileImage: String,

	stripeSubId: String,
	subActive: Boolean,
	subEnds: Number,

  creationDate: {type: Date, default: Date.now},
	lastLogin: {type: Date, default: Date.now},
	appVersion: {type: Number, default: 3},
  resetPasswordToken: String,
  resetPasswordExpires: String,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;