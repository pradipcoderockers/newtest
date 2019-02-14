var express = require('express');
const Sequelize = require('sequelize');
var session = require('express-session');
var md5 = require('md5');
const sequelize = new Sequelize('appypieml_db_local', 'appypie_db_ugr', '8F2uCyuqP89YuFx6', {
  host: '192.168.2.2',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // SQLite only
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
},
 {
  freezeTableName: true,
  tableName: 'user',
  timestamps: false
}
);

function logout(req, res) {
    var userId = req.body.userId;
    User.update({ _id: userId }, { $unset: { deviceToken: "" } }, { new: true }, function (err, resp) {
        res.json({
            userData: resp,
            status: 200,
            message: 'User Signed In'
        });
    })
}

function login(req, res) 
{
       console.log('kkkk',req.body); 
       var email = req.body.username;
       var password = req.body.password;
       User.findOne({ where: {email: email}}).then(user => {
		console.log(user.dataValues.password)
		console.log(md5(password));
		if (user==null || user=='null') 
		{
			res.redirect('/login');
		}
		else if(user.dataValues.password != md5(password)) 
		{
			res.redirect('/login');
		}
		else 
		{
			req.session.user = user.dataValues;
			res.redirect('/dashboard');
		}
     })
}
module.exports = {login,logout};
