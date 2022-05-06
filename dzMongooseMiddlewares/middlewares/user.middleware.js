const User = require('../db/user.model')

const checkIsEmailDuplicate = async (req, res, next) => {
    try {
        const { email = '' } = req.body;

        const isUserPresent = await User.findOne({ email: email.toLowerCase().trim()});

        if (isUserPresent) {
            res.status(409).json("Юзер із цією електронною адресою вже існує");
            return;
        }

        next();
    }
    catch (e) {
        res.json(e);
    }
}

const checkGender = (req, res, next) => {
    try {
        const {gender} = req.body;

        if (gender !== 'female' && gender !== 'male') {
            res.status(409).json('Стать може бути тільки чоловічою або жіночою');
        }

        next()
    }
    catch (e) {
        res.json(e);
    }
}

module.exports = {
    checkIsEmailDuplicate,
    checkGender
}
