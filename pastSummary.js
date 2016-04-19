'use strict';

var Summary = require('./calSummary');

// MARK: sort the list by date
var sortDate = function (list, key, start, end) {
  if(start>=end) return;
  var pivot = list[end];
  var i = start, j = end;
  while (i < j) {
    while (i < j && list[i][key] <= pivot[key]){
      i++;
    }
    if (i < j) {
      var temp = list[i];
      list[i] = list[j];
      list[j] = temp;
    }
    //pivot is at index of i
    while(j > i && list[j][key] >= pivot[key]) {
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
  var list = [];
  var res = [];
  for (let i in items) {
    if (items[i].status === 'open' ||
    items[i].status === 'executed' || items[i].status === 'executedArchived') {
      list.push(items[i]);
    }
  }
  sortDate(list, 'createdDate', 0, list.length - 1);
  //sortDate(exeList, 'executionDate', 0, exeList.length - 1);
  //console.log(openList);
  var first = new Date(list[0].createdDate);
  console.log(first);
  //var firstExe = new Date(exeList[0].executionDate);
  var startDate = new Date(first.getUTCFullYear(),
                           first.getUTCMonth(),
                           first.getUTCDate());
  for (let i = 0; i < list.length; i++) {
    if (new Date(list[i].createdDate) <= startDate ) continue;
    let temp = Summary.calSummary(list.slice(0,i-1));
    temp['date'] = startDate;
    res.push(temp);
    startDate.setDate(startDate.getDate() + 1);
  }
  console.log(res);
};
