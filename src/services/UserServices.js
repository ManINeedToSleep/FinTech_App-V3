import { User } from './DatabaseCreation.js';

export const createUser = async (username, email, password) => {
    try {
        const user = await User.create({ username, email, password });
        return user; // Return the created user object
    } catch (err) {
        console.error('Error inserting user:', err);
        throw err; // Propagate the error to be handled in the route
    }
};

export const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ where: { email } });
        return user;
    } catch (err) {
        console.error('Error finding user:', err);
        throw err;
    }
};
