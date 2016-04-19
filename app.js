'use strict';

var express = require('express');
var app = express();
var pastSummary = require('./pastSummary');
var mongoose = require('mongoose');

var Bids = require('./models/Bids');
//MARK: connect to mongodb in Promise constructor
mongoose.connect('mongodb://localhost:27017/test');


app.get('/',function(req,res){

	//MARK: connect ot mongoose and verify the login information
	var promise = Bids.getBids();
	promise.then(function(bids){
    console.log(bids.length);
    pastSummary.pastSummary(bids, new Date());
    },function(err){
		console.log(error);
	});
});

app.listen(1111, function(){
	console.log('Login app listening on port 1111!');
});
