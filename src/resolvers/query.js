import User from '../models/user';
import Room from '../models/room';
import Service from '../models/service';

const Query = {
    status: () => 'Welcome to GraphQL',
    users: async() => {
        return await User.find().exec();
    },
    user: async(parent, { id }) => {
        // Verify if the id is ObjectId
        return await User.findById(id).exec();
    },
    rooms: async() => {
        return await Room.find().exec();
    },
    room: async(parent, { id }) => {
        // Verify if the id is ObjectId
        return await Room.findById(id).exec();
    },
    services: async() => {
        return await Service.find().exec();
    },
    service: async(parent, { id }) => {
        return await Service.findById(id).exec();
    }
};

export default Query;