import User from '../models/user';

const Mutation = {
    createUser: (parent, { input }) => {
        const user = new User(input);
        user.save();

        return user;
    },
};

export default Mutation;
