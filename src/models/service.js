import mongoose, { Schema } from 'mongoose';

// Mongoose Schema
const ServiceSchema = new Schema({
    name: String,
    desc: String,
    icon: String
}, {
    timestamps: true,
});

// Mongoose model
const ServiceModel = mongoose.model('Service', ServiceSchema);
export default ServiceModel;