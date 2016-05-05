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
  var currentDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  var list = [];
  //MARK: store the bids data into two List
  var openList = [];
  var exeList = [];
  var res = [];
  for (let i in items) {
    if (items[i].status === 'open') {
      openList.push(items[i]);
    }
    else if (((items[i].status === 'executed'|| items[i].status === 'executedArchived')
    && items[i].originalPrice != items[i].strikePrice)) {
      exeList.push(items[i]);
    }
  }

  sortDate(openList, 'createdDate', 0, openList.length - 1);
  sortDate(exeList, 'executionDate', 0, exeList.length - 1);

  var first = new Date(openList[0].createdDate);
  var second = new Date(exeList[0].createdDate);
  first = first>second?second:first;
  //var firstExe = new Date(exeList[0].executionDate);
  var startDate = new Date(first.getUTCFullYear(),
                           first.getUTCMonth(),
                           first.getUTCDate());
  var i = 1, j = 0;
  while (startDate <= currentDate) {
    var tempOpen = [];
    var tempExe = [];
    //MARK: find the open bids before the startDate
    while(i < openList.length) {
      //find the index of list that createDate is later than startDate
      if (new Date(openList[i].createdDate) <= startDate ) {
        i++;
      }
      else {
        break;
      }
    }
    while(j < exeList.length) {
      //find the index of list that createDate is later than startDate, change the status when necessary
      if (new Date(exeList[j].createDate) > startDate ) {
        break;
      }
      else if (new Date(exeList[j].executionDate) > startDate ) {
        tempOpen.push(Object.assign({},exeList[j])) ;
        tempOpen[tempOpen.length-1].status = 'open';
        j++;
      }
      else {
        tempExe.push(exeList[j]);
        j++;
      }
    }
    j = 0;
    //generate the summary of that day and added it to res list, increase the day by one
    var tempList = openList.slice(0,i-1);
    tempList = tempList.concat(tempOpen);
    tempList = tempList.concat(tempExe);
    var temp = Summary.calSummary(tempList);
    temp['date'] = new Date(startDate);
    res.push(temp);
    startDate.setDate(startDate.getDate() + 1);
  }
  return res;
};
