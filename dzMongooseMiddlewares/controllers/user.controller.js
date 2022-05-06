const User = require("../db/user.model");

module.exports = {
    getAllUser: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        }
        catch (e) {
            res.json(e);
        }
    },

    getUserByID: async (req, res) => {
        try {
            const {userID} = req.params;
            const user = await User.findById(userID);

            if (!user) {
                res.status(404).json('Юзера не знайдено');
                return;
            }
            res.json(user);
        }
        catch (e) {
            res.json(e);
        }
    },

    createUser: async (req, res) => {
        try {
            const createdUser = await User.create(req.body);
            res.status(201).json(createdUser);
        }
        catch (e) {
            res.json(e);
        }
    },

    updateUser: async (req, res) => {
        try {
            const { userID } = req.params;
            const user = await User.findByIdAndUpdate(userID, req.body);

            res.status(200).json(user);
        }
        catch (e) {
            res.json(e);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {userID} = req.params;
            const user = await User.findByIdAndDelete(userID);

            if (!user) {
                res.status(404).json('Неможливо видалити не існуючого юзера')
                return;
            }

            res.status(204).send();
        }
        catch (e) {
            res.json(e);
        }
    }
}