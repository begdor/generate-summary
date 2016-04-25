'use strict';

var express = require('express');
var app = express();
var pastSummary = require('./pastSummary');
var mongoose = require('mongoose');

var Bids = require('./models/Bids');
var BidSums = require('./models/BidSums');
//MARK: connect to mongodb in Promise constructor
mongoose.connect('mongodb://localhost:27017/test');


app.get('/',function(req,res){

	//MARK: connect ot mongoose and verify the login information
	var promise = Bids.getBids();
	promise.then(function(bids){
    var sums = pastSummary.pastSummary(bids, new Date());
    /*for (let sum in sums) {
      console.log(sum);
      let bidSum = new BidSums(sum);
      bidSum.save();
    }*/
    sums.forEach(function(entry){
      let bidSum = new BidSums(entry);
      bidSum.save();
    });

		console.log('finished: total summaries:',sums.length);
  },function(err){
		console.log(error);
	});
});

app.listen(1111, function(){
	console.log('Login app listening on port 1111!');
});
