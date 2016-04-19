'use strict';

var Summary = require('./calSummary');

// MARK: sort the list by date
var sortDate = function (list, key, start, end) {
  if(start>=end) return;
  var pivot = list[end];
  var i = start, j = end;
  while (i < j) {
    while (i < j && list[i][key] >= pivot[key]){
      i++;
    }
    if (i < j) {
      var temp = list[i];
      list[i] = list[j];
      list[j] = temp;
    }
    //pivot is at index of i
    while(j > i && list[j][key] <= pivot[key]) {
      j--;
    }
    if (i < j) {
      var temp = list[i];
      list[i] = list[j];
      list[j] = temp;
    }
  //pivot is at index of j
  }
  if(i > start) sortDate(list, key, start, i-1);
  if(i < end) sortDate(list, key, i+1, end);
}

var exports = module.exports = {};

exports.pastSummary = function(items,date){
  //generate a standard date starting of the day
  var currentDate = new Date(date.getUTCFullYear, date.getUTCMonth, date.getUTCDate);
  var openList = [], exeList = [];
  for (let i in items) {
    if (items[i].status === 'open') openList.push(items[i]);
    // excluding at price bids
    if (items[i].status === 'executed' && items[i].originalPrice !== items[i].strikePrice) exeList.push(items[i]);
  }
  sortDate(openList, 'createdDate', 0, openList.length - 1);
  sortDate(exeList, 'executionDate', 0, exeList.length - 1);
  //console.log(openList);
  var firstOpen = new Date(openList[0].createdDate);
  var firstExe = new Date(exeList[0].executionDate);
  var startOpen = new Date(firstOpen.getUTCFullYear,
                           firstOpen.getUTCMonth,
                           firstOpen.getUTCDate);
  var startExe = new Date(firstExe.getUTCFullYear,
                          firstExe.getUTCMonth,
                          firstExe.getUTCDate);
  for (let i = 0; i < openList.length; i++) {
    if (new Date(openList[i].createdDate) <= startOpen ) continue;
    console.log(Summary.calSummary(openList.slice(0,i-1)));
    startOpen.setDate(startOpen.getDate() + 1);
  }
};
