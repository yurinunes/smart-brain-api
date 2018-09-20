const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
	name: String,
	email: {type: String, unique: true, required: true},
	entries: {type: Number, default: 0},
	joined: {type: Date, default: Date.now, required: true}

});

module.exports = mongoose.model('User', userSchema);