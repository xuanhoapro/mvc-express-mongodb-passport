/**
 * Created by HoaNguyen on 12/28/15.
 */
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var minlength8 = [8, 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];

// create a schema
var usersSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: minlength8, required: true},
    company: String,
    created: Date,
    updated: Date,
    del_flg: Number // 0 or 1
}, {collection: 'users_collection'});

// Apply the uniqueValidator plugin to Schema.
usersSchema.plugin(uniqueValidator);

// on every save, add the date, and del_flg
usersSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated field to current date
    this.updated = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created)
        this.created = currentDate;

    // if del_flg doesn't exist, add to that field = 0
    if (!this.del_flg)
        this.del_flg = 0;

    next();
});

// we need to create a model using it
var Users = mongoose.model('Users', usersSchema);

// make this available to our partner in our Node applications
module.exports = Users;
