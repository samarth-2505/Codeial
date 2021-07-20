const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession=async function(req,res){
    try{
       let user = await User.findOne({email : req.body.email});
       if(!user || user.password != req.body.password)
       {
           return res.json(422,{
               message : "Invalid Username or Password !"
           });
       }
       else{
           return res.json(200,{
                message : "Sign In Succesfull ! Here is your token, Please keep it safe!",
                data : {
                    token : jwt.sign(user.toJSON(), 'codeial', {expiresIn : '10000'}) //here we are encrypting our user using the 'codeial' key
                }
           });
       }
    }
    catch(err){
      console.log(err);
      return res.json(500,{
          message : "Internal Server Error"
      });
    }
}