const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true }, // save email toLowerCase!
    password: String
});

// On save hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
    const user = this;  // gets access to the user model

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) { // when salt generated, run callback function
        if(err) {
            return next(err)
        }

        // hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) { // when hash generated, run callback function
            if(err) {
                return next(err)
            }

            //overwrite plain text password with encrypted password
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if(err) {
            return callback(err)
        }

        callback(null, isMatch)
    })
};


// Create the model class
const ModelClass = mongoose.model('user', userSchema); // loads schema into mongoose, corresponds to collection named user

// Export the model
module.exports = ModelClass;