module.exports.home = function(req, res){
    //cookies come with the req 
    console.log(req.cookies);
    //we can change the cookie's key's value like this at the server side
    // res.cookie('user_id',25);
    return res.render('home', {
        title: "Home"
    });
};

// module.exports.actionName = function(req, res){}