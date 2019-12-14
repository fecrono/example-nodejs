import User from '../models/user';
const Query = {
  status: () => 'Welcome to GraphQL',
  users: async () => {
    return await User.find().exec();
  },
  user: async (parent, { id }) => {
    // Verify if the id is ObjectId
    return await User.findById(id).exec();
  },
};

export default Query;
