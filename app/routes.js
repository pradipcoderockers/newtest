// app/routes.js
var config = require('../config/config.json');
// expose this function to our app using module.exports
var mongoose = require('mongoose');
var Schema          = mongoose.Schema;
var CMSSchema   = new Schema({
    meta_title: {
        type: String,
    },
     meta_description: {
        type: String,
    },
     meta_keywords: {
        type: String,
    },
     title: {
        type: String,
    },
    type: {
        type: String,
    },
    menu_type: {
        type: String,
    },
    menu_description:{
		type: String,
	},
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updateAt: 'updated_at'
    }
});

var CMSSchemaModal =  mongoose.model('CMS', CMSSchema, 'cms');
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
module.exports = function(app, passport) {

	app.get('/',menuListeMiddleware, function(req, res,next) {
		
		
		CMSSchemaModal.findOne({'type':'home'}, function(err, pageData)
			{
				if (err){
					   
						res.render('index.ejs',{menuList:req.menu,pageData:err});
					}
					else
					{
						res.render('index.ejs',{menuList:req.menu,pageData:pageData});
					}
				
			});
	});
	
	app.get('/:type',menuListeMiddleware, function(req, res) {
	    if(req.params)
	    {
			CMSSchemaModal.findOne(req.params, function(err, pageData)
			{
				if (err){
					   
						res.render('index.ejs',{menuList:req.menu,pageData:err});
					}
					else
					{ 
						res.render('index.ejs',{menuList:req.menu,pageData:pageData});
					}
				
			});
		}
	});
};
// route middleware to make sure
var menuListeMiddleware = function(request, response, next){
	CMSSchemaModal.find({},{title:1,menu_description:1,type:1,menu_type:1,_id:0}, function(err, result)
	{
		var key;
		if (err)
			return next(error);
		if (!result) {
			return next(result);
		}
		 var contact  = [],about  = [],industries  = [], staffing  = [],resources  = [], managed_services  = [];
		 function groupBy(list, keyGetter) {
			const map = new Map();
			list.forEach((item) => {
				const key = keyGetter(item);
				if (!map.has(key)) {
					map.set(key, [item]);
				} else {
					map.get(key).push(item);
				}
			});
			return map;
		}
		const grouped = groupBy(result, res => res.menu_type);
		
		contact = grouped.get("contact");
		about = grouped.get("about");
		industries = grouped.get("industries");
		staffing = grouped.get("staffing");
		resources = grouped.get("resources");
		managed_services = grouped.get("managed_services");
		request.menu = {'contact':contact,'about':about,'industries':industries,'staffing':staffing,'resources':resources,'managed_services':managed_services};
		return next();
	});
}

		
	

