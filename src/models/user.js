import mongoose, { Schema } from 'mongoose';

// Mongoose Schema
const UserSchema = new Schema({
    name: String,
    lastname: String,
    email: String,
    type: String,
}, {
    timestamps: true,
});

// Mongoose model
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
