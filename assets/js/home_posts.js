{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
             url : '/posts/create',
             method : 'post',
             data : newPostForm.serialize(), //sends the post form data in JSON format
             success : function(data){
                 let newPost = newPostDom(data.data.post);
                 $('#posts-list-container>ul').prepend(newPost);
                 deletePostDom($(' .delete-post-btn', newPost));
             },
             error : function(error){
                 console.log(error.responseText);
             }
            });
        });
    }

    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">           
                    <p>
                        <a class="delete-post-btn" href="/posts/destroy/${post._id}">Delete Post</a>
                    </p>
                    <p>
                    ${post.content}
                        <br>
                        <small>
                        ${post.user.name}
                        </small>
                    </p>
                    <div class="post-comments">

                        <form action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="Type Comment here..." required>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add Comment">
                        </form>  
        
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}" style="list-style-type:circle">
    
                        </ul>
                    </div>
                    </div>
                </li>`);
    }
    
    //method to delete a post from DOM
    let deletePostDom = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
             url : $(deleteLink).prop('href'),
             method : 'get',
             success : function(data){
               $(`#post-${data.data.post_id}`).remove();
             },
             error : function(error){
                console.log(error.responseText);
            }
            });
        });
    }

    createPost();
}