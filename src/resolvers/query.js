import User from '../models/user';
import Room from '../models/room';
import Service from '../models/service';

const Query = {
    status: () => 'Welcome to GraphQL',
    users: async(parent, {}, { currentUser }) => {
        if (!currentUser) {
            throw new Error('UNAUTHORIZED');
        }
        return await User.find().exec();
    },
    user: async(parent, { id }, { currentUser }) => {
        if (!currentUser) {
            throw new Error('UNAUTHORIZED');
        }
        // Verify if the id is ObjectId
        return await User.findById(id).exec();
    },
    rooms: async(parent, {}, { currentUser }) => {
        if (!currentUser) {
            throw new Error('UNAUTHORIZED');
        }
        const rooms = await Room.find().populate('services').exec();
        console.log(rooms);
        return rooms;
    },
    room: async(parent, { id }, { currentUser }) => {
        if (!currentUser) {
            throw new Error('UNAUTHORIZED');
        }
        // Verify if the id is ObjectId
        return await Room.findById(id).exec();
    },
    services: async(parent, {}, { currentUser }) => {
        if (!currentUser) {
            throw new Error('UNAUTHORIZED');
        }
        return await Service.find().exec();
    },
    service: async(parent, { id }, { currentUser }) => {
        if (!currentUser) {
            throw new Error('UNAUTHORIZED');
        }
        return await Service.findById(id).exec();
    }
};

export default Query;