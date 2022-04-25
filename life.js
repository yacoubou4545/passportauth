const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const authmodel=require('./bds/db')



mongoose.connect('mongodb://localhost:27017/pass');
user1=new authmodel({username:'abdoul',password:'12a'});
user1.save();






  