
module.exports=function(app,passport){
	app.get('/',function(req,res){
		res.render('index',{title:'Home page'});
	});

	app.get('/profile',ensureAuthenticated,function(req,res){
		res.render('profile',{
			user:req.user
		});
	});

	app.get('/auth/google',
  passport.authenticate('google',{scope : ['profile', 'email']})
  );
 
app.get('/auth/google/callback', 
  passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));
};


function ensureAuthenticated(req, res, next) {  
    if (req.isAuthenticated()) { return next(); }
    res.send(401,{msg:'cound not authenticate'});
}