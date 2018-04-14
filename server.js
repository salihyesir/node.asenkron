var http    = require("http");          
var express = require("express");
var path= require('path');
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');
const jstoxml = require('jstoxml');

var app = express();
//ders.js benim veri tabanı şemamı içerir.
var ders = require("./ders");
var db;

//view engine olarak ejs yi tercih ettim.
var ejsLayouts = require('express-ejs-layouts');
app.set('view engine','ejs');
app.use(ejsLayouts);
app.use(bodyParser.json());

//js ve css klasörlerimi kullanıcılara açtım.
app.use("/JS", express.static(__dirname + '/JS'));
app.use("/CSS", express.static(__dirname + '/CSS'));
 
app.set('views',path.join(__dirname,'./views'));
// db ile mongoDB ye bağlanıyoruz.
 mongoose.connect('mongodb://localhost/Salih_YESIR');
 db = mongoose.connection;
 //handle mongo error
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function () {
   // we're connected!
 });

 //Veri tabanından tüm derslerin içeriğini yolladım.
 app.get('/', function(req, res) {
     ders.find(/*{ sira : "0"},*/function(err, results){
        console.log(results);
        res.render('./index.ejs', {dersler : results})
     });
});
app.use(bodyParser.json());

app.post('/', function(req, res){
  // Insert JSON straight into MongoDB
  var str = JSON.stringify(req.body);  
  var obj = JSON.parse(str);
  //Veri tabanında sadece bir dersin içeriğini güncelliyecek şekilde ayarladım.  
  ders.updateOne({sira:"0"}, { $set: obj[0]  }, function (err, results) {
      if (err)
      
          res.send('Error');
      else{
        res.send(obj[0]);
      }
    });
});

//getJson ve getXml Ajax yöntemime hizmet eder.get:getirmek anlamındadır.
// Bu kısım da sadece aktif olan yer yollanır
app.post('/getJson', function(req, res) {
ders.find({ sira : "0"},function(err, results){
  console.log("------------");
  console.log(results);
  res.send( results[0])
});
});
app.post('/getXml', function(req, res) {
ders.find({ sira : "0"},function(err, results){
  var jstr = JSON.stringify(results[0]); 
  var jstr2 = JSON.parse(jstr); 
  var xmlResults = jstoxml.toXML( jstr2 );
  console.log(xmlResults);
  res.send( xmlResults );
});
});

//Sunucumu 8080 portundan Aktif ettim.
var webServer = http.createServer(app).listen(8080);

webServer.listen(8080, function () {
    console.log('listening on http://localhost:8080');
});