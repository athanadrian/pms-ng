const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        max: [32, 'Too long, max is 32 characters'],
        min: [4, 'Too short, min is 4 characters'],
    },
    email: {
        type: String,
        max: [32, 'Too long, max is 32 characters'],
        min: [4, 'Too short, min is 4 characters'],
        required: 'Email is required.',
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        max: [32, 'Too long, max is 32 characters'],
        min: [4, 'Too short, min is 4 characters'],
        required: 'Password is required.',
    },
    properties: [{ type: Schema.Types.ObjectId, ref: 'Property' }]
});

userSchema.methods.hasSamePassword = function (requestedPassword) {

    return bcrypt.compareSync(requestedPassword, this.password);
}

userSchema.pre('save', function (next) {
    const user = this;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            next();
        });
    });
})

module.exports = mongoose.model('User', userSchema);