const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: String,
    lastname :String,
    email: String,
    mobilenumber: Number,
    password: String,
});

module.exports = mongoose.model('User', UserSchema);