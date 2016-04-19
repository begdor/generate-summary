'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BidSumSchema   = new Schema({
    date: {type:Date,unique: true},
    open: {
      total: Number,
      avgDisReq: Number,
      maxDisReq: Number,
      minDisReq: Number,
      medDisReq: Number,
      avgBidAmt: Number,
      maxBidAmt: Number,
      minBidAmt: Number,
      medBidAmt: Number,
    },
    executed:{
      total: Number,
      avgSave: Number,
      highestSave: Number,
      highestSave: Number,
      highestAmtSave: Number,
      avgAmtSave: Number,
      medAmtSave: Number,
      maxPrice: Number,
      minPrice: Number,
      avgPrice:Number,
      medPrice: Number,
      avgAmt: Number,
      medAmt: Number,
    }
});

module.exports = mongoose.model('BidSum', BidSumSchema);
