const Post= require('../models/post');


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
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home', {
            title: "Home Page",
            posts : posts
        });
    });
};

// module.exports.actionName = function(req, res){}