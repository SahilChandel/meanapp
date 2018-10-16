const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');

const mongoose=require('mongoose');
const config=require('./config/database');

//connect to database
mongoose.connect(config.database);

//on Connected
mongoose.connection.on('connected', ()=>{
	console.log("connect with database:" +config.database);
});

//on error
mongoose.connection.on('connected', (err)=>{
	console.log("connection error:" +err);
});

const app=express();

//require routes
const users=require('./routes/users');

//use cors
app.use(cors({
	origin:['http://localhost:4200','http://127.0.0.1:4200'],
	credentials:true
}));

//use bodyparser middleware
app.use(bodyParser.json());





app.use('/users',users);

app.get('/',function(req,res)
	{
		res.send('Hello');
	});


app.listen(3000,function()
{
	console.log('Open broser at port number 3000');
})