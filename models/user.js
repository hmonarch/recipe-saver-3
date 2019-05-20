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
  creationDate: {type: Date, default: Date.now},
  lastLogin: String,
  resetPasswordToken: String,
  resetPasswordExpires: String,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;