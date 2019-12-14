import User from '../models/user';
import Room from '../models/room';
import Service from '../models/service';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Mutation = {
    signup: async (parent, { input }) => {
        const { email, password, name, lastname, type } = input;
        const user = await User.findOne({ email }).exec();
        if (user) {
            throw new Error("This email is already in use");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            lastname,
            email,
            password: encryptedPassword,
            type,
        });
        newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
        return {
            token,
            user: newUser,
        };
    },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email }).exec();
        if (!user) {
            throw new Error('UNAUTHORIZED');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('UNAUTHORIZED');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        return {
            token,
            user,
        };
    },
    createUser: (parent, { input }, { currentUser }) => {
        if (!currentUser) {
            throw new Error('UNAUTHORIZED');
        }
        const user = new User(input);
        user.save();

        return user;
    },
    updateUser: async(parent, { id, input }, { currentUser }) => {
        if (!currentUser) {
            throw new Error('UNAUTHORIZED');
        }

        const user = await User.findByIdAndUpdate(id, {
            $set: {
                ...input,
            },
        }, { new: true }).exec();

        return user;
    },
    deleteUser: async(parent, { id }, { currentUser }) => {
        if (!currentUser) {
            throw new Error('UNAUTHORIZED');
        }

        await User.findByIdAndDelete(id);

        return true;
    },

    createRoom: async(parent, { input }, { currentUser }) => {
        if (!currentUser) {
            throw new Error('UNAUTHORIZED');
        }
        const room = new Room(input);
        room.save();

        return room;
    },

    updateRoom: async(parent, { id, input }, { currentUser }) => {
        if (!currentUser) {
            throw new Error('UNAUTHORIZED');
        }
        const room = await Room.findByIdAndUpdate(id, {
            $set: {
                ...input,
            },
        }, { new: true }).exec();

        return room;
    },

    deleteRoom: async(parent, { id }, { currentUser }) => {
        if (!currentUser) {
            throw new Error('UNAUTHORIZED');
        }
        await Room.findByIdAndDelete(id);
        return true;
    },

    createService: async(parent, { input }, { currentUser }) => {
        if (!currentUser) {
            throw new Error('UNAUTHORIZED');
        }
        const service = new Service(input);
        service.save();
        return service;
    },
    updateService: async(parent, { id, input }, { currentUser }) => {
        if (!currentUser) {
            throw new Error('UNAUTHORIZED');
        }
        const service = await Service.findByIdAndUpdate(id, {
            $set: {
                ...input,
            }
        }, { new: true }).exec();
        return service;
    },
    deleteService: async(parent, { id }, { currentUser }) => {
        if (!currentUser) {
            throw new Error('UNAUTHORIZED');
        }
        await Service.findByIdAndDelete(id);
        return true;
    },
};

export default Mutation;