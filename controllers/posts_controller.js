const Post= require('../models/post');
const Comment = require('../models/comment');

//no need to convert to async await as there's only one level of heirarchy , but still it can be converted (see in the pdf)
module.exports.create= function(req,res){
    Post.create({
        content : req.body.content,
        user : req.user._id
    },function(err,post){
        if(err){req.flash('error', 'Error in Creating Post !'); return res.redirect('back');}
        req.flash('success', 'Post Created !');
        return res.redirect('back');
    });
}

module.exports.destroy = async function(req,res){

  try{
    let post = await Post.findById(req.params.id);
    // .id means we are converting the object id stored in ._id to string for comparison
    if(post.user == req.user.id){
     post.remove();
     await Comment.deleteMany({post : req.params.id /* or post.id */});
     req.flash('success', 'Post Deleted !');
     return res.redirect('back');
    }
    else{
      req.flash('error', 'You are not Authorized to Delete this post !');
      return res.redirect('back');
    } 
  } 
  catch(err){
    req.flash('error', 'Error in Deleting Post !');
    return res.redirect('back');
  }
 
}