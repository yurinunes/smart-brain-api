const mongoose = require('mongoose');

let loginSchema = new mongoose.Schema({
	hash: { type: String, required: true},
	email: { type: String, unique: true, required: true}
})

module.exports = mongoose.model('Login', loginSchema);