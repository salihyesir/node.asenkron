var mongoose = require ('mongoose');
//mongoose: MongoDB ile etkileşimi basitleştirmek için nesne veri modellemesi
var dersSchema = mongoose.Schema;
var dersSchema = new mongoose.Schema({
    sira:{ type: String, trim: true},
    kodu:{ type: String, trim: true},
    adi:{ type: String,  trim: true},
    icerigi:{ type: String, trim: true}
});
var ders=mongoose.model('ders',dersSchema);

var myobj =[{
    "sira" : "0",
    "kodu" : "BSM 103",
    "adi" : "Programlamaya Giriş",
    "icerigi" : "C ve C++"
},
{
    "sira" : "1",
    "kodu" : "BSM 201",
    "adi" : "Elektrik Devre Temelleri",
    "icerigi" : "1"
},
{
    "sira" : "2",
    "kodu" : "BSM 205",
    "adi" : "Web Programlama",
    "icerigi" : "1"
},
{
    "sira" : "3",
    "kodu" : "BSM 309",
    "adi" : "İşletim Sistemleri",
    "icerigi" : "1"
},
{
    "sira" : "4",
    "kodu" : "BSM 458",
    "adi" : "Ağ Programlama",
    "icerigi" : "1"
}];
ders.find(function(err, results){
    if(err) throw err;
    console.log(results.length+ " ders veri tabanında kayıtlı");
    if (results.length < 1  ){
        ders.insertMany(myobj, function(err, res) {
            if (err) throw err;
            console.log("Dersler Veri Tabanına Kayıt edildi");
          });
    }
    else
        console.log("Veri tabanımız var");
});

  



module.exports = ders;