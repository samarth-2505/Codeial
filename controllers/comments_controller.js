const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes');

module.exports.create = async function(req,res){
try{
  let post = await Post.findById(req.body.post);
   if(post){  //if post with the given id exists then create a comment on that post
      let comment = await Comment.create({
           content : req.body.content,
           post : req.body.post,
           user : req.user._id
       });
      post.comments.push(comment); //push the comment id in comment's array of post schema
      post.save(); // save the changes after pushing the comment
     
      req.flash('success', 'Comment Posted !');
      return res.redirect('/');
   }
}
catch(err){
  req.flash('error', err);
  return res.redirect('/');
}  
};

module.exports.destroy = async function(req,res){
try{
  let comment = await Comment.findById(req.params.id); 
    let postId = comment.post;
    let post = await Post.findById(postId); 
      if(req.user.id == comment.user || req.user.id == post.user){ // if the user logged in is the guy who commented or the guy who posted 
        comment.remove(); // then only he/she can remove the comment
        await Post.findByIdAndUpdate(postId, {$pull : {comments : req.params.id}});
        req.flash('success', 'Comment Deleted !');
        return res.redirect('back');
      }
      else{
        req.flash('error', 'You cannot Delete this Comment !');
        return res.redirect('back');
      }
} 
catch(err){
  req.flash('error', err);
  return res.redirect('/');
}
};
