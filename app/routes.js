// app/routes.js
var md5 = require('md5');
module.exports = function(app, passport) {
	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {
		// render the page and pass in any flash data if it exists
		if(req.session.passport.user)
		{
			res.redirect('/profile');
		}
		else
		{
			res.render('login.ejs', { message: req.flash('loginMessage') ,"local":req.session.passport});	
		}
		
	});
	app.get('/', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('index.ejs');
	});
	
	
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
