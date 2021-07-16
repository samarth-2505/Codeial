const Post= require('../models/post');
const User= require('../models/user');

module.exports.home = async function(req, res){
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
    
    //populate the user of each post and the comments array of each post, also populate the user of each comments array's element
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
                path : 'user'
            }
        });
    
        let users = await User.find({});
    
        return res.render('home', {
            title: "Home Page",
            posts : posts,
            all_users : users
        });
    }
    catch(err){
        console.log('Error ! ',err);
        return;
    }
    
};

// module.exports.actionName = function(req, res){}