console.log('js file of toggle_friendship is loaded');
class ToggleFriendship{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleFriendship();
    }


    toggleFriendship(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'GET',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                
                if (data.data.friendAdded == true){
                    $('button').html(`Delete Friend`);
                    $('button').removeClass( "add" ).addClass( "delete" );
                }else{
                    $(' button').html(`Add Friend`);
                    $('button').removeClass( "delete" ).addClass( "add" );
                }

            })
            .fail(function(errData) {
                console.log('error in completing the request', errData);
            });
            

        });
    }
}


new ToggleFriendship($('.toggle-friend-button'));