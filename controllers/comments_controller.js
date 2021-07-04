const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
 Post.findById(req.body.post,function(err,post){
   if(post){  //if post with the given id exists then create a comment on that post
       Comment.create({
           content : req.body.content,
           post : req.body.post,
           user : req.user._id
       },function(err,comment){
        if(err){console.log('Error in creating comment !'); return ;}
        post.comments.push(comment); //push the comment id in comment's array of post schema
        post.save(); // save the changes after pushing the comment

        return res.redirect('/');
       });
   }
 });
};

