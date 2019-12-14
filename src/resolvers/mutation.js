import User from '../models/user';
import Room from '../models/room';
import Service from '../models/service';

const Mutation = {
    createUser: (parent, { input }) => {
        const user = new User(input);
        user.save();

        return user;
    },
    updateUser: async(parent, { id, input }) => {
        const user = await User.findByIdAndUpdate(id, {
            $set: {
                ...input,
            },
        }, { new: true }).exec();

        return user;
    },
    deleteUser: async(parent, { id }) => {
        await User.findByIdAndDelete(id);

        return true;
    },

    createRoom: async(parent, { input }) => {
        const room = new Room(input);
        room.save();

        return room;
    },

    updateRoom: async(parent, { id, input }) => {
        const room = await Room.findByIdAndUpdate(id, {
            $set: {
                ...input,
            },
        }, { new: true }).exec();

        return room;
    },

    deleteRoom: async(parent, { id }) => {
        await Room.findByIdAndDelete(id);
        return true;
    },

    createService: async(parent, { input }) => {
        const service = new Service(input);
        service.save();
        return service;
    },
    updateService: async(parent, { id, input }) => {
        const service = await Service.findByIdAndUpdate(id, {
            $set: {
                ...input,
            }
        }, { new: true }).exec();
        return service;
    },
    deleteService: async(parent, { id }) => {
        await Service.findByIdAndDelete(id);
        return true;
    }
};

export default Mutation;