// config/passport.js
// load all the things we need
var session  = require('express-session');
var LocalStrategy   = require('passport-local').Strategy;
var _crypto = require('crypto');
// load up the user model
var mysql = require('mysql');
var md5 = require('md5');
var dbconfig = require('./database');
var config = require('./config.json');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
var mongoose = require('mongoose');
/**
 * Configuration.
 */
var mongoUri = config.mongo.connectionString;
mongoose.connect(mongoUri, {
	useCreateIndex: true,
	useNewUrlParser: true
}, function(err, res) {

	if (err) {
		return console.error('Error connecting to "%s":', mongoUri, err);
	}
	console.log('Connected successfully to "%s"', mongoUri);
});
var clientModel = require('../mongo/model/client'),
	tokenModel = require('../mongo/model/token'),
	userModel = require('../mongo/model/user');
	
var saveUser = function(clients,users) {
	var client = new clientModel(clients);
	var user = new userModel(users);
	userModel.findOne({
		username: users.username,
	},function(err, users) 
	{
		if (err) {
			return console.error(err);
		}
		if(users==null || users=='null')
		{
			user.save(function(err, user) {
				if (err) {
					return console.error(err);
				}
				console.log('Created user', user);
			});
			
			client.save(function(err, client) {
				if (err) {
					return console.error(err);
				}
				console.log('Created client', client);
			});
		}
		else
		{
			users.password = users.password;
			users.save(function(err, user) {
				if (err) {
					return console.error(err);
				}
				console.log('updated user', user);
			});
		}
		console.log('users', users);
	});
};

function randomString(size)
{
	if(size === 0) {
		throw new Error('Zero-length randomString is useless.');
	}
	
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'+'abcdefghijklmnopqrstuvwxyz'+'0123456789';
	var objectId = '';
	var bytes = (0,_crypto.randomBytes)(size);
	for(var i = 0; i < bytes.length; ++i) {
		objectId += chars[bytes.readUInt8(i) % chars.length];
	}
	
	return objectId;
}
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM user WHERE user_level_id = 1 AND reseller_id = 0 AND status='active' AND id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            emailField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
			 // callback with email and password from our form
            connection.query("SELECT * FROM user WHERE user_level_id = 1 AND reseller_id = 0 AND status='active' AND email = ?",[username], function(err, rows){
				
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }
                // if the user is found but the password is wrong
                if (md5(password)!=rows[0].password)
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                
                saveUser({
								clientId: md5(rows[0].id),
								id: md5(rows[0].id),
								clientSecret: md5('secret_'+rows[0].id),
								userId: rows[0].id,
								grants: ["password","client_credentials","refresh_token"],
								redirectUris: []
							},{
								username: username,
								password: rows[0].password,
								name: rows[0].first_name+' '+rows[0].last_name,
								userId: rows[0].id
							});	
                
                return done(null, rows[0]);
            });
        })
    );
};
