import mongoose, { Schema } from 'mongoose';

// Mongoose Schema
const RoomSchema = new Schema({
    type: String,
    name: String,
    desc: String,
    price: Number,
    thumbnail: String,
    direction: String,
    lat: String,
    long: String,
    status: String,
    services: [{ type: Schema.Types.ObjectId, ref: 'Service' }]
}, {
    timestamps: true,
});

// Mongoose model
const RoomModel = mongoose.model('Room', RoomSchema);
export default RoomModel;