let dbUsers = require("../db/users");

module.exports = {
    getAllUser: (req, res) => {
        res.render('users', {dbUsers});
    },

    getUserByID: (req, res) => {
        const {userID} = req.params;
        const user = dbUsers[userID];

        if (!user) {
            res.status(404).json('Юзера не знайдено');
            return;
        }
        res.json(user.name);
    },

    createUser: (req, res) => {
        dbUsers.push(req.body);
        res.json('Добавлений новий юзер');
    },

    deleteUser: (req, res) => {
        const {userID} = req.params;
        const user = dbUsers[userID];

        if (!user) {
            res.status(404).json('Неможливо видалити не існуючого юзера')
            return;
        }

        dbUsers = dbUsers.filter(i => i.id !== Number(userID));
        res.send(dbUsers);
    }
}