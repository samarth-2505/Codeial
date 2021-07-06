const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes');

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

module.exports.destroy = function(req,res){

  Comment.findById(req.params.id, function(err,comment){
    let postId = comment.post;
    Post.findById(postId, function(err,post){
      if(req.user.id == comment.user || req.user.id == post.user){ // if the user logged in is the guy who commented or the guy who posted 
        comment.remove(); // then only he/she can remove the comment
        Post.findByIdAndUpdate(postId, {$pull : {comments : req.params.id}}, function(err,post){ //removing the comment id from the post's comments' array
            if(err){console.log('Error in updating post !'); return ;}
            return res.redirect('back');
        });
      }
      else{
        return res.redirect('back');
      }
    });
  
  });
}
