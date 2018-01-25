// init project
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var routes = require('./routes.js');

var app = module.imports = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT


//return JSON via get
app.get('/:date', function(req, res, next){

  //JSON Schema for natural date
  var dateSchema = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  //get date param from request
  var dateRaw = req.params.date;

  //check dateRaw to determine if is NaN
  if(isNaN(dateRaw)){
    //convert raw date to Natural
    var dateNat = new Date(dateRaw);
    if(dateNat == "Invalid Date"){
      dateNat = null;
      dateUnix = null;
    } else {
      dateNat = dateNat.toLocaleDateString('en-GB', dateSchema);

      //convert raw date to Unix
      var dateUnix = new Date(dateRaw).getTime()/1000;
    }
  } else {
    dateUnix = dateRaw;
    //convert Unix date to natural
    var dateNat = new Date(dateUnix*1000);
    dateNat = dateNat.toLocaleDateString('en-GB', dateSchema);
  }

  res.json({unix: dateUnix, natural: dateNat});
});

routes(app);

app.listen(port, function(){
});
