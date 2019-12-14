const Subscription = {
    newUser: {
        subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator(['user-added']),
    },
};

export default Subscription;