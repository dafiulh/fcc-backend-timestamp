// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  const rawDate = req.params.date;
  let date;

  if (!rawDate) {
    date = new Date();
  } else if (/^\d+$/.test(rawDate)) {
    date = new Date(parseInt(rawDate));
  } else {
    date = new Date(rawDate);
  }

  if (!isNaN(date)) {
    res.json({
      unix: date.getTime(),
      utc: date.toGMTString()
    });
  } else {
    res.json({
      error : "Invalid Date"
    })
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
