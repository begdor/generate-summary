'use strict';


var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BidsSchema   = new Schema({
  _id:            {type:String, unique: true},
  createdDate:    Date,
  executionDate:  Date,
  status:         String,
  originalPrice:  Number,
  executionPrice: Number,
  strikePrice:    Number,
  quantity:       Number,
});

BidsSchema.statics.getBids =  function () {
	var self = this; // TODO: why?

	return new Promise(function (resolve, reject) {

		self.find('bids','',function (err, bids) {

			if (err) {
				return reject(err); // why return not else
			}
			return resolve(bids);
		});
	});
}

module.exports = mongoose.model('Bids', BidsSchema);
