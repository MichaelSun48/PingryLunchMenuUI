//////////
//
// Pingry Lunch Menu Backend
// Author: Michael Sun
// Last Updated:  1/14/19
//
//////////
var https = require('https');
var apiKey = '8CwpHFmEngVsKou3F1HN6h4pTI9OjCB6yZn6vzFo'


//Prints and returns today's lunch menu
var todaysLunch = function(){
  console.log("adsf")
  var options = {
    "rejectUnauthorized": false, //Added this because it wouldn't work otherwise... not sure if this is secure
    'method': 'GET',
    'host': 'pingrytoday.pingry.org',
    'port': '3001',
    'path': '/v1/lunch?api_key='+apiKey+'&date='+formatTodaysDate(),
    'headers': {
    }
  };

  let promise = new Promise((resolve, reject) => {
    var req = https.request(options, (res) => {
      console.log("REQ start")
      var chunks = [];
      res.on("data", (chunk) => {
        chunks.push(chunk);
      });
      res.on("end", (chunk) => {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        var menu = body.toString()
        resolve(menu)
      });
      res.on("error", (error) => {
        console.error(error);
        reject(error)
      });
    });
    req.end();
  })

  return promise.then((result) => {
    console.log("hello")
    return result
  }).catch( (error) => {
    return "Error requesting lunch menu: " + error
  })

}

//Prints and returns the given date's (YYYYMMDD) lunch
var lunchByDate = function(date){
  var options = {
    "rejectUnauthorized": false, //Added this because it wouldn't work otherwise... not sure if this is secure
    'method': 'GET',
    'host': 'pingrytoday.pingry.org',
    'port': '3001',
    'path': '/v1/lunch?api_key='+ apiKey +'&date=' + date,
    'headers': {
    }
  };
  var req = https.request(options, function (res) {
    var chunks = [];
    res.on("data", function (chunk){
      chunks.push(chunk);
    });
    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
      return body.toString();
    });
    res.on("error", function (error) {
      console.log("EROEOIREOR")
      console.error(error);
    });
  });
  req.end();
}

//Properly formats today's date in this format: "YYYYMMDD"
var formatTodaysDate = function(){
  var date = new Date();
  var today = date.getFullYear().toString()
  //getMonth is incremented because it returns 0-11 to designate months.
  if ((date.getMonth() + 1) < 10){
    today = today + '0' + (date.getMonth() + 1).toString()
  } else{
    today = today + (date.getMonth() + 1).toString()
  }

  if ((date.getDate()) < 10){
    today = today + '0' + (date.getDate()).toString()
  } else{
    today = today + (date.getDate()).toString()
  }
  return today;
}




//Formats the lunch menu nicely. Takes in 4D array from lunchByDate() or todaysLunch()
var formatLunchMenu = function(lunchMenu){
  console.log(lunchMenu)
  var soups = lunchMenu[0]
  console.log(soups)
}
console.log("START")
console.log(todaysLunch().then((result)=>{console.log(result)}))
console.log("END")
