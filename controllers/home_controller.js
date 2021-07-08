const Post= require('../models/post');
const User= require('../models/user');

module.exports.home = function(req, res){
    //cookies come with the req 
    console.log(req.cookies);
    //we can change the cookie's key's value like this at the server side
    // res.cookie('user_id',25);
    
    // Post.find({},function(err,posts){
    //     return res.render('home', {
    //         title: "Home Page",
    //         posts : posts            //This way, only the user's id will be accesible in the ejs file
    //     });
    // });
    
    //populate the user of each post 
    Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })
    .exec(function(err,posts){
        User.find({},function(err,users){
            return res.render('home', {
                title: "Home Page",
                posts : posts,
                all_users : users
            });
        });
    });
};

// module.exports.actionName = function(req, res){}