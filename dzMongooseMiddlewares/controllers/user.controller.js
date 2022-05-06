const User = require("../db/user.model");

module.exports = {
    getAllUser: async (req, res) => {
        const users = await User.find();
        res.json(users);
    },

    getUserByID: async (req, res) => {
        const {userID} = req.params;
        const user = await User.findById(userID);

        if (!user) {
            res.status(404).json('Юзера не знайдено');
            return;
        }
        res.json(user);
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

    deleteUser: async (req, res) => {
        const {userID} = req.params;
        const user = await User.findByIdAndDelete(userID);

        if (!user) {
            res.status(404).json('Неможливо видалити не існуючого юзера')
            return;
        }

        res.status(204).send();
    }
}