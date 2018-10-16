const mongoose=require('mongoose');

const config=require('../config/database');

const bcrypt=require('bcrypt');

//User Schema
const UserSchema=mongoose.Schema({
	name:{
		type:String
	},
	email:{
		type:String,
		unique: true,
		required:true
	},
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
    
    hash: String,
  	salt: String
});

UserSchema.statics.hasPassword=function hashPassword(password)
{
	return bcrypt.hashSync(password,10);
}

UserSchema.methods.isValid=function(hashedpassword)
{
	return bcrypt.compareSync(hashedpassword,this.password);
}







const User=module.exports=mongoose.model('User',UserSchema);