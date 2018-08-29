const User = require('../models/user');
const jwt = require('jsonwebtoken');

const config = require('../config/dev');

const { normaliseErrors } = require('../helpers/mongoose');

// exports.auth = function (req, res) {
//     const { email, password } = req.body;

//     if (!password || !email) {
//         return res.status(422).send({ errors: [{ title: 'Data missing.', message: 'Provide email and password.' }] });
//     }

//     User.findOne({ email }, function (err, user) {
//         if (err) {
//             return res.status(422).send({ errors: normaliseErrors(err.errors) });
//         }

//         if (!user) {
//             return res.status(422).send({ errors: [{ title: 'Invalid user.', message: 'User does not exists.' }] });
//         }

//         if (user.hasSamePassword(password)) {
//             const token = jwt.sign({
//                 userId: user.id,
//                 username: user.username
//             }, config.SECRET, { expiresIn: '1h' });

//             return res.json(token);
//         } else {
//             return res.status(422).send({ errors: [{ title: 'Wrong data.', message: 'Wrong email or password.' }] });
//         }
//     })
// }

exports.auth = function (req, res) {
    const { email, password } = req.body;

    if (!password || !email) {
        return res.status(422).send({ errors: [{ title: 'Data missing!', message: 'Provide email and password!' }] });
    }

    User.findOne({ email }, function (err, user) {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (!user) {
            return res.status(422).send({ errors: [{ title: 'Invalid User!', message: 'User does not exist' }] });
        }

        if (user.hasSamePassword(password)) {
            const token = jwt.sign({
                userId: user.id,
                username: user.username
            }, config.SECRET, { expiresIn: '1h' });

            return res.json(token);
        } else {
            return res.status(422).send({ errors: [{ title: 'Wrong Data!', message: 'Wrong email or password' }] });
        }
    });
}

exports.register = function (req, res) {
    const { username, email, password, passwordConfirmation } = req.body;
    // Above the same results
    // const username = req.body.username;
    // const email = req.body.email;
    // const password = req.body.password;
    // const passwordConfirmation = req.body.passwordConfirmation;

    if (!password || !email) {
        return res.status(422).send({ errors: [{ title: 'Data missing.', message: 'Provide email and password.' }] });
    }

    if (password !== passwordConfirmation) {
        return res.status(422).send({ errors: [{ title: 'Invalid password.', message: 'Password is not the same as confirmation.' }] });
    }

    //User.findOne({email:email}) //the same
    User.findOne({ email }, function (err, existingUser) {
        if (err) {
            return res.status(422).send({ errors: normaliseErrors(err.errors) });
        }

        if (existingUser) {
            return res.status(422).send({ errors: [{ title: 'Invalid user.', message: 'User with the same email already exists.' }] });
        }

        const user = new User({
            username,
            email,
            password
        });

        user.save(function (err) {
            if (err) {
                return res.status(422).send({ errors: normaliseErrors(err.errors) });
            }
            return res.json({ "registered": true });
        });
    });
}

exports.authMiddleware = function (req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        const user = parseToken(token);

        User.findById(user.userId, function (err, user) {
            if (err) {
                return res.status(422).send({ errors: normaliseErrors(err.errors) });
            }
            if (user) {
                res.locals.user = user;
                next();
            } else {
                return unAuthorized(res)
            }
        });

    } else {
        return unAuthorized(res)
    }
}

function parseToken(token) {
    // token ='Bearer ihdeihdiehnnewjdijdknxnihihzhfdmehehfehfejh'
    // token = token.split(' ')[1]; --take the second part of the string token
    return jwt.verify(token.split(' ')[1], config.SECRET);
}

function unAuthorized(res) {
    return res.status(401).send({ errors: [{ title: 'Unauthorized!', message: 'Yoy must login to have access.' }] });
}

