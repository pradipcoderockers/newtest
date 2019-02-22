'use strict';

const 
    mongoose        = require('mongoose'),
    path            = require('path'),
    config          = require(path.resolve('./config/env/development')),
    Schema          = mongoose.Schema,

CMSSchema   = new Schema({
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


module.exports = mongoose.model('CMS', CMSSchema, 'cms');
