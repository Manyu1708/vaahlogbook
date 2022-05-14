var express = require('express');
// import { createConnection } from 'mysql';


var app = express();

var PORT = 3000;

// var con = createConnection({
//     host: "localhost",

//     user: "root",
//     password: "Abhi1708",
//     database: "VAAH_sap"
//   });

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/client/HomePage.html");
});

// app.get('/getUser', function(req, res) {
//     // res.json({
//     //     "userName": "Anshul",
//     //     "userPassword": "Parmar",
//     // })

//     con.connect(function(err) {
//         if (err) throw err;
//         con.query("SELECT * FROM users", function (err, result, fields) {
//           if (err) throw err;
//           console.log(result);

//           res.json(result);
//         });
//       });
// });

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});
