const express=require('express');
const router=express.Router();
const passport=require('passport');
var jwt = require('jsonwebtoken');
var async = require("async");
const User=require('../model/user');

//Register User
router.post('/register',function(req,res)
{
        addToDB(req,res);
});

//add values to db during signup

async function addToDB(req,res)
{
        var user=User(
                {
                        name:req.body.name,
                        email:req.body.email,
                        username:req.body.username,
                        password:User.hasPassword(req.body.password)

                });
      try{
        doc=await user.save();

        let _res = {
          status: true,
          data: doc
        }
        return res.status(201).json(_res);
      


      }
      catch(err)
      {
        let _res = {
          status: false
        }
        return res.json(_res);
      }
}


//SignUp
router.post('/login',function(req,res)
{
     userlogin(req,res);
});



function userlogin( req, res)
{
 User.findOne({username: req.body.username}).then(function(User)
             {
               
                if(User)
                {
                   
                  if(User.isValid(req.body.password)==true)
                  {
                    
                  var jwt = require('jsonwebtoken');
                  var token = jwt.sign({ username: User.username }, 'shhhhh');
                          
                    var data={
                              status:true,
                              token:token
                             }
                              return res.status(200).json(data);
                  }
                  else
                  {
                    var data={
                      status:false
                    }
                    return res.status(501).json(data);
                  }
                }
                else
                {
                  var data={
                      status:false
                    }
                  return res.status(501).json(data);
                }
              
             
             });
}


//Profile
router.get('/profile',function(req,res)
{
	res.send('Profile');
});



module.exports=router;