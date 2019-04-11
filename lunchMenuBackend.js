//////////
//
// Pingry Lunch Menu Backend
// Author: Michael Sun
// Last Updated:  1/14/19
//
//////////
// var url = 'https://pingrytoday.pingry.org:3001/v1/lunch?api_key=8CwpHFmEngVsKou3F1HN6h4pTI9OjCB6yZn6vzFo'
// var https = require('https');
var apiKey = '8CwpHFmEngVsKou3F1HN6h4pTI9OjCB6yZn6vzFo'
var url = "https://pingrytoday.pingry.org:3001/v1/lunch?api_key=8CwpHFmEngVsKou3F1HN6h4pTI9OjCB6yZn6vzFo"
//Prints and returns today's lunch menu
var todaysLunch = function () {
    var promise = new Promise((resolve, reject) => {
        fetch("https://pingrytoday.pingry.org:3001/v1/lunch?api_key=8CwpHFmEngVsKou3F1HN6h4pTI9OjCB6yZn6vzFo&date=" + formatTodaysDate()).then(
            (response) => { return response.json() }
        ).then(result => {
            if (result) {
                resolve(result)
            }
        }).catch(ex => {
            reject(result)
            console.error(ex);
        })
    })
    return promise

}

//Prints and returns the given date's lunch (Date must be in the following format: YYYYMMDD)
var lunchByDate = function (date) {
    // var options = {
    //   "rejectUnauthorized": false, //Added this because it wouldn't work otherwise... not sure if this is secure
    //   'method': 'GET',
    //   'host': 'pingrytoday.pingry.org',
    //   'port': '3001',
    //   'path': '/v1/lunch?api_key='+ apiKey +'&date=' + date,
    //   'headers': {
    //   }
    // };
    // let promise = new Promise((resolve, reject) => {
    //   var req = https.request(options, (res) => {
    //     var chunks = [];
    //     res.on("data", (chunk) => {
    //       chunks.push(chunk);
    //     });
    //     res.on("end", (chunk) => {
    //       var body = Buffer.concat(chunks);
    //       var menu = body.toString()
    //       resolve(JSON.parse(menu))
    //     });
    //     res.on("error", (error) => {
    //       console.error(error);
    //       reject(error)
    //     });
    //   });
    //   req.end();
    // })

    urlByDate = url + '&date=' + date
    var todaysLunch = function () {
        fetch(urlByDate).then(
            response => response.json()
        ).then(result => {
            return result
        }).catch(ex => {
            console.error(ex);
        })
    }
}

//Properly formats today's date in this format: "YYYYMMDD" (ignore this function)
var formatTodaysDate = function () {
    var date = new Date();
    var today = date.getFullYear().toString()
    //getMonth is incremented because it returns 0-11 to designate months.
    if ((date.getMonth() + 1) < 10) {
        today = today + '0' + (date.getMonth() + 1).toString()
    } else {
        today = today + (date.getMonth() + 1).toString()
    }

    if ((date.getDate()) < 10) {
        today = today + '0' + (date.getDate()).toString()
    } else {
        today = today + (date.getDate()).toString()
    }
    return today;
}
console.log(formatTodaysDate())


//Formats the lunch menu nicely. Takes in 4D array from lunchByDate() or todaysLunch()
var formatLunchMenu = function (lunchMenu) {
    console.log(lunchMenu)
    var soups = lunchMenu[0]
    var saladbar = lunchMenu[1]
    var hotLunch = lunchMenu[2]
    var hotLunch2 = lunchMenu[3]  //I'm pretty sure both of these are hot lunch but I might be wrong
    var rightStation = lunchMenu[4]
    var panini = lunchMenu[5]
    var pasta = lunchMenu[6]
    var breakfast = lunchMenu[7]
    var desert = lunchMenu[8]

    console.log("----------------------------")
    console.log("SOUPS:")
    console.log(soups)
    console.log("----------------------------")
    console.log("SALAD BAR ITEMS:")
    console.log(saladbar)
    console.log("----------------------------")
    console.log("HOT LUNCH:")
    console.log(hotLunch)
    console.log("----------------------------")
    console.log("HOT LUNCH 2:")
    console.log(hotLunch2)
    console.log("----------------------------")
    console.log("THE RIGHT STATION THAT EVERYONE GOES TO THAT I CANT REMEMBER THE NAME OF:")
    console.log(rightStation)
    console.log("----------------------------")
    console.log("THE LEFT STATION THAT EVERYONE GOES TO THAT I CANT REMEMBER THE NAME OF:")
    console.log(panini)
    console.log("----------------------------")
    console.log("PASTA:")
    console.log(pasta)
    console.log("----------------------------")
    console.log("BREAKFAST:")
    console.log(breakfast)
    console.log("----------------------------")
    console.log("Desert:")
    console.log(desert)
    console.log("----------------------------")

    fullMenu = [breakfast, soups, hotLunch, hotLunch2, rightStation, panini, saladbar, pasta, desert]
    return fullMenu
}
var getTodaysMenu = () => {
    todaysLunch().then((result) => {
        var fullMenu = formatLunchMenu(result)
        //main stuff
        var ms = document.getElementById("MS");
        var stuff = fullMenu[4]
        for (var i = 0; i < stuff.length; i++) {
            var para = document.createElement("p");
            var node = document.createTextNode(stuff[i]);
            para.appendChild(node);
            ms.appendChild(para);
        }
        //soups
        var soup = document.getElementById("soups");
        for (var i = 0; i < fullMenu[1].length; i++) {
            var para = document.createElement("li");
            var node = document.createTextNode(fullMenu[1][i]);
            para.appendChild(node);
            soup.appendChild(para);
        }

        //pasta
        var soup = document.getElementById("pasta");
        var stuff = fullMenu[7]
        for (var i = 1; i < stuff.length; i++) {
            var para = document.createElement("li");
            var node = document.createTextNode(stuff[i]);
            para.appendChild(node);
            soup.appendChild(para);
        }
       
        //panini
        var panini = document.getElementById("Panini");
        var pan = fullMenu[5]
        for (var i = 0; i < pan.length; i++) {
            var para = document.createElement("li");
            var node = document.createTextNode(pan[i]);
            para.appendChild(node);
            panini.appendChild(para);
        }

        //desert
        var d = document.getElementById("desert");
        var des = fullMenu[8]
        for (var i = 0; i < des.length; i++) {
            var para = document.createElement("li");
            var node = document.createTextNode(des[i]);
            para.appendChild(node);
            d.appendChild(para);
        }

        //salad
        var d = document.getElementById("salad");
        var des = fullMenu[6]
        for (var i = 0; i < des.length; i++) {
            var para = document.createElement("li");
            var node = document.createTextNode(des[i]);
            para.appendChild(node);
            d.appendChild(para);
        }

        //main ingrediant
        var d = document.getElementById("MI");
        var des = fullMenu[3]
        for (var i = 0; i < des.length; i++) {
            var para = document.createElement("li");
            var node = document.createTextNode(des[i]);
            para.appendChild(node);
            d.appendChild(para);
        }

        //main ingrediant
        var d = document.getElementById("MI2");
        var des = fullMenu[2]
        for (var i = 0; i < des.length; i++) {
            var para = document.createElement("li");
            var node = document.createTextNode(des[i]);
            para.appendChild(node);
            d.appendChild(para);
        }

        return fullMenu
    });
}


getTodaysMenu()



