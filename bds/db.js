const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const authSchema=new Schema({
    username:{type:String},
    password:{type:String}
})

authSchema.plugin(passportLocalMongoose);

const auth=mongoose.model('auth',authSchema);
module.exports=auth;