var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const Pool = require('mysql/lib/Pool');
var flash = require('connect-flash');
var nodemailer = require('nodemailer');
const { error } = require('console');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Abhi1708',
	database: 'vaah_sap'
});
var username;
var empname;
var empid;
var atcolno;
var emptype;
var station;
var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.static('styles'))
app.get('/', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/login1.html'));
});
app.get('/registration', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/Registration.html'));
});
app.get('/forgotpassword', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/ResetPassword.html'));
});
app.get('/homepage', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/homepage.html'));
	//response.render('homepage', {emp_name : empname});
});
app.get('/changepassword', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/ChangePassword.html'));
});
app.get('/ViewStress', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/ViewStress.html'));
});
app.get('/logbook', function (request, response) {

// 	connection.query("select emp_name from emp_login",function(error,results,fields){
// 		if(error)throw error;
// 		console.log(results);
// response.json(results);
	//});
response.sendFile(path.join(__dirname + '/client/logbook.html'));
// 	connection.query("select emp_name from emp_login",function(error,results,fields){
// 		if(error)throw error;
// 		console.log(results);
// response.json(results);
	//});
});
app.get('/displaydata', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/displaydata.html'));
});
app.get('/ViewProfile2', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/viewprofile2.html'));
});
app.get('/OTD', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/Othertraining.html'));
});
app.get('/ViewOTD', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/ViewOthertraining2.html'));
});
app.get('/ViewAELP', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/ViewAELP2.html'));
});
app.get('/Training', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/Training.html'));
});
app.get('/ViewTraining', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/ViewTraining2.html'));
});
app.get('/ViewLogbook', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/ViewLogbook.html'));
});
app.get('/AELP', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/AELP.html'));
});
app.get('/Proficiency', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/proficiency2.html'));
});
app.get('/ViewProficiency', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/ViewProficiency.html'));
});
app.get('/Medical', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/Medical.html'));
});
app.get('/ViewMedical', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/ViewMedical2.html'));
});
app.get('/Endorsement', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/Endorsement.html'));
});
app.get('/ViewEndorsement', function (request, response) {
	response.sendFile(path.join(__dirname + '/client/ViewEndorsement2.html'));
});
app.post('/auth', function (request, response) {

	const username = request.body.username;
	const password = request.body.password;
	if (username && password) {
		//connection.query('SELECT * FROM Emp_login WHERE emp_no = ? AND emp_pwd = ?', [username, password], function(error, results, fields) {

		connection.query('call sp_chkpwd(?,?)', [username, password], function (error, results, fields) {
			var json = JSON.parse(JSON.stringify(results[0]));


			if (results[0].length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				empname = json[0].Emp_Name;
				atcolno = json[0].Emp_Atcol;
				empid = json[0].Emp_EmailID;
				emptype = json[0].Emp_Type;
				station = json[0].Emp_Station;
				request.session.atcolno = atcolno;
				request.session.station = station;
				// request.session.empname = empname;
				// request.session.atcolno = atcolno;
				// request.session.empid = empid;
				// request.session.emptype = emptype;
				response.setHeader('Content-Type', 'application/json');
				response.status(200)
				response.send(JSON.stringify({
					username: username,
					emptype: emptype,
					empname: empname,
					atcolno: atcolno
				}));
				//response.redirect('/homepage');
				//response.send('Welcome ' + empname);
			}
			else {
				//response.send('Incorrect Username or Password!');
				// alert("Incorrect Username or Password!")
				response.status(401)
				response.send()
				// response.redirect('/');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
app.post('/Registration', function (request, response) {

	var EmpNo = request.body.EmpNo;
	var EmpName = request.body.EmpName;
	var EmpAtcol = request.body.EmpAtcol;
	var EmpEmail = request.body.EmpEmail;
	var password = request.body.password1;
	if (EmpNo && EmpName && password && EmpAtcol && EmpEmail) {
		connection.query('call sp_EnterEmp_Details(?,?,?,?,?)', [EmpNo, EmpName, EmpAtcol, password, EmpEmail], function (error, results, fields) {

			if (results.affectedRows > 0) {
				request.session.loggedin = true;
				request.session.EmpName = EmpName;
				response.send(EmpName + 's Details saved successfully');
			}
			else {
				response.send('Incorrect Details');
			}
			response.end();
		});
	} else {
		response.send('Incorrect Details');
		response.end();
	}
});
app.post('/ResetPwd', function (request, response) {

	var username = request.body.EmpNo;
	if (username) {
		//connection.query('SELECT Emp_EmailID FROM Emp_login WHERE emp_no = ?', [username], function(error, results, fields) {
		connection.query('call sp_forgetpwd(?)', [username], function (error, results, fields) {

			var json = JSON.parse(JSON.stringify(results[0]));
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				empid = json[0].emp_emailid;
				var transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: 'vaahlogbook@gmail.com',
						pass: 'Ahmedabad@123'
					}
				});

				var mailOptions = {
					from: 'vaahlogbook@gmail.com',
					to: empid,
					subject: 'Reset Password',
					text: 'New Password for login is: ' + json[0].upd_pwd
				};




				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						console.log(error);
					} else {
						response.redirect('/');
					}
				});



			}
			else {
				response.send('Incorrect Username or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
app.post('/ChangePwd', function (request, response) {
var newpwd = request.body.NewPwd1;
var oldpwd = request.body.OldPwd1;
username = request.session.username;
	if (username) {
		//connection.query('SELECT Emp_EmailID FROM Emp_login WHERE emp_no = ?', [username], function(error, results, fields) {
		connection.query('call sp_ChangePwd(?,?,?)', [username,oldpwd,newpwd], function (error, results, fields) {

			if(results[0][0].chk > 0)
			{
				response.write(
					'<script>window.alert("Details Saved Successfully");window.location.replace("https://vaahlogbook.herokuapp.com/changepassword");</script>'
				  );
			}
			else
			{
				response.write(
					'<script>window.alert("Incorrect Old Password");window.location.replace("https://vaahlogbook.herokuapp.com/changepassword");</script>'
				  );

			}
		});
	}
		else{

			response.send("Incorrect details");
		}
});
app.post('/HomePage', function (request, response){
request.body.emp_name = empname;

});

app.post('/AddLogBook', function (request, response) {
	var datefrom;
	var dateto;
	var timefrom;
	var timeto;
	var unit;
	var remarks;
	datefrom = request.body.Date_From;
	dateto = request.body.Date_To;
timefrom = request.body.From_Time;
timeto = request.body.To_Time;
 unit = request.body.Emp_Rating;
 remarks = request.body.Emp_Remarks;	
 if(request.session.username)
 {
	connection.query('call sp_LogBookData_User(?,?,?,?,?,?,?,?,?)', [request.session.username,request.session.atcolno,datefrom,dateto,request.session.station,unit,timefrom,timeto,remarks], function (error, results, fields) {
		if(results.affectedRows > 0)
		{
			response.write(
				'<script>window.alert("Details Saved Successfully");window.location.replace("https://vaahlogbook.herokuapp.com/logbook");</script>'
			  );
		}
	else if(results[0][0].msg == 'Time Already Exists')
	{
		response.write(
			'<script>window.alert("Data with same time has already been saved");window.location.replace("https://vaahlogbook.herokuapp.com/logbook");</script>'
		  );

	}
	else if(results[0][0].msg == 'Recency Expired')
	{
		response.write(
			'<script>window.alert("Your Recency has expired!");window.location.replace("https://vaahlogbook.herokuapp.com/logbook");</script>'
		  );

	}
	else
	{
		response.write(
			'<script>window.alert("Error! Contact System Administrator");window.location.replace("https://vaahlogbook.herokuapp.com/logbook");</script>'
		  );
	}
	});	
}

	else
		{
			response.write(
				'<script>window.alert("Details couldnt be saved");window.location.replace("https://vaahlogbook.herokuapp.com/logbook");</script>'
			  );
	
		}
		

	


});

app.post('/ViewLogBook', function (request, response) {
	var datefrom;
	var dateto;
	var unit;
	datefrom = request.body.Date_From;
	dateto = request.body.Date_To;
 	unit = request.body.Emp_Rating;	
	var username = request.body.username;
	


if (unit == '[Select One]')
{
	unit = '';
}
	connection.query('call sp_LogBookData_ViewUser(?,?,?,?)', [username,datefrom,dateto,unit], function (error, results, fields) {
		if(results[0].length > 0)
		{
			 response.json(results[0]);
		}
	});

});

app.get('/home', function (request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + empname + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});
app.post('/Addprof', function (request, response) {
	var profdate;
	var unit;
	var instructor;
	var remarks;
	profdate = request.body.Date_Prof;
 unit = request.body.Prof_Rating;
 remarks = request.body.remarks;
 instructor = request.body.instructor;	
 if(request.session.username)
 {
	connection.query('call sp_addproficiency(?,?,?,?,?,?,?)', [request.session.empid,request.session.username,request.session.atcolno,unit,instructor,profdate,remarks], function (error, results, fields) {
		if(results.affectedRows > 0)
		{
			response.write(
				'<script>window.alert("Details Saved Successfully");window.location.replace("https://vaahlogbook.herokuapp.com/proficiency");</script>'
			  );
		}
	else if(results[0][0].msg = 'Time Already Exists')
	{
		response.write(
			'<script>window.alert("Data with same time has already been saved");window.location.replace("https://vaahlogbook.herokuapp.com/proficiency");</script>'
		  );

	}
	});	
}

	else
		{
			response.write(
				'<script>window.alert("Details couldnt be saved");window.location.replace("https://vaahlogbook.herokuapp.com/proficiency");</script>'
			  );
	
		}
		

	


});
app.post('/AddTraining', function (request, response) {
	var trainingcentre;
	var course;
	var startdate;
	var enddate;
	var remarks;
trainingcentre = request.body.Emp_Location;
course = request.body.Emp_Course;
	startdate = request.body.Date_From;
	enddate = request.body.Date_To;
 remarks = request.body.Emp_Remarks;	
 if(request.session.username)
 {
	connection.query('call sp_addtraining(?,?,?,?,?,?,?,?)', [request.session.username,empname,request.session.atcolno,trainingcentre,course,startdate,enddate,remarks], function (error, results, fields) {
		if(results.affectedRows > 0)
		{
			response.write(
				'<script>window.alert("Details Saved Successfully");window.location.replace("https://vaahlogbook.herokuapp.com/Training");</script>'
			  );
		}
	else if(results[0][0].msg = 'Time Already Exists')
	{
		response.write(
			'<script>window.alert("Data with same time has already been saved");window.location.replace("https://vaahlogbook.herokuapp.com/Training");</script>'
		  );

	}
	});	
}

	else
		{
			response.write(
				'<script>window.alert("Details couldnt be saved");window.location.replace("https://vaahlogbook.herokuapp.com/Training");</script>'
			  );
	
		}
		

	


});
app.post('/AddOtherTraining', function (request, response) {
	var trainingcentre;
	var course;
	var startdate;
	var enddate;
	var remarks;
trainingcentre = request.body.Emp_Location;
course = request.body.Emp_Course;
	startdate = request.body.Date_From;
	enddate = request.body.Date_To;
 results = request.body.Emp_Results;	
 if(request.session.username)
 {
	connection.query('call sp_AddOtherTraining(?,?,?,?,?,?,?,?)', [request.session.username,empname,request.session.atcolno,trainingcentre,course,startdate,enddate,results], function (error, results, fields) {
		if(results.affectedRows > 0)
		{
			response.write(
				'<script>window.alert("Details Saved Successfully");window.location.replace("https://vaahlogbook.herokuapp.com/OTD");</script>'
			  );
		}
	else if(results[0][0].msg = 'Time Already Exists')
	{
		response.write(
			'<script>window.alert("Data with same time has already been saved");window.location.replace("https://vaahlogbook.herokuapp.com/OTD");</script>'
		  );

	}
	});	
}

	else
		{
			response.write(
				'<script>window.alert("Details couldnt be saved");window.location.replace("https://vaahlogbook.herokuapp.com/OTD");</script>'
			  );
	
		}
		

	


});
app.post('/AddMedical', function (request, response) {
	var medicaldate;
	var validdate;
	var fitness;
	medicaldate = request.body.Date_Medical;
	validdate = request.body.Date_To;
 fitness = request.body.fitness;	
 if(request.session.username)
 {
	connection.query('call sp_AddMedical(?,?,?,?,?,?)', [request.session.username,empname,request.session.atcolno,medicaldate,validdate,fitness], function (error, results, fields) {
		if(results.affectedRows > 0)
		{
			response.write(
				'<script>window.alert("Details Saved Successfully");window.location.replace("https://vaahlogbook.herokuapp.com/Medical");</script>'
			  );
		}
	else if(results[0][0].msg = 'Time Already Exists')
	{
		response.write(
			'<script>window.alert("Data with same time has already been saved");window.location.replace("https://vaahlogbook.herokuapp.com/Medical");</script>'
		  );

	}
	});	
}

	else
		{
			response.write(
				'<script>window.alert("Details couldnt be saved");window.location.replace("https://vaahlogbook.herokuapp.com/Medical");</script>'
			  );
	
		}
		

	


});
app.post('/AddAELP', function (request, response) {
	var AELPdate;
	var validdate;
	var remarks;
	AELPdate = request.body.Date_Assess;
	validdate = request.body.Date_To;
 rating = request.body.AELP_Rating;	
 if(request.session.username)
 {
	connection.query('call sp_AddAELP(?,?,?,?,?,?)', [request.session.username,empname,request.session.atcolno,rating,AELPdate,validdate], function (error, results, fields) {
		if(results.affectedRows > 0)
		{
			response.write(
				'<script>window.alert("Details Saved Successfully");window.location.replace("https://vaahlogbook.herokuapp.com/AELP");</script>'
			  );
		}
	else if(results[0][0].msg = 'Time Already Exists')
	{
		response.write(
			'<script>window.alert("Data with same time has already been saved");window.location.replace("https://vaahlogbook.herokuapp.com/AELP");</script>'
		  );

	}
	});	
}

	else
		{
			response.write(
				'<script>window.alert("Details couldnt be saved");window.location.replace("https://vaahlogbook.herokuapp.com/AELP");</script>'
			  );
	
		}
		

	


});
app.post('/AddEnd', function (request, response) {
	var enddate;
	var rating;
	enddate = request.body.Date_End;
 rating = request.body.End_Rating;	
 if(request.session.username)
 {
	connection.query('call sp_AddEndorsement(?,?,?,?,?)', [request.session.username,empname,request.session.atcolno,rating,enddate], function (error, results, fields) {
		if(results.affectedRows > 0)
		{
			response.write(
				'<script>window.alert("Details Saved Successfully");window.location.replace("https://vaahlogbook.herokuapp.com/Endorsement");</script>'
			  );
		}
	else if(results[0][0].msg = 'Time Already Exists')
	{
		response.write(
			'<script>window.alert("Data with same time has already been saved");window.location.replace("https://vaahlogbook.herokuapp.com/Endorsement");</script>'
		  );

	}
	});	
}

	else
		{
			response.write(
				'<script>window.alert("Details couldnt be saved");window.location.replace("https://vaahlogbook.herokuapp.com/Endorsement");</script>'
			  );
	
		}
		

	


});
app.post('/ViewAELP', function (request, response) {
	
	connection.query('call sp_ViewAELP(?)', [request.session.atcolno], function (error, results, fields) {
		if(results[0].length > 0)
		{
			 response.json(results[0]);
		}
		else
		{
			response.write(
				'<script>window.alert("Unable To Process, Contact System Administrator");window.location.replace("https://vaahlogbook.herokuapp.com/ViewAelp");</script>'
			  );
	
		}
		
	});
});
app.post('/ViewProficiency', function (request, response) {
	
	connection.query('call sp_ViewProficiency(?)', [request.session.atcolno], function (error, results, fields) {
		if(results[0].length > 0)
		{
			 response.json(results[0]);
		}
		else
		{
			response.write(
				'<script>window.alert("Unable To Process, Contact System Administrator");window.location.replace("https://vaahlogbook.herokuapp.com/ViewProficiency");</script>'
			  );
	
		}
	});
});
app.post('/ViewMedical', function (request, response) {
	
	connection.query('call sp_ViewMedical(?)', [request.session.atcolno], function (error, results, fields) {
		if(results[0].length > 0)
		{
			 response.json(results[0]);
		}
		else
		{
			response.write(
				'<script>window.alert("Unable To Process, Contact System Administrator");window.location.replace("https://vaahlogbook.herokuapp.com/ViewMedical");</script>'
			  );
	
		}
	});
});
app.post('/ViewOTD', function (request, response) {
	
	connection.query('call sp_Viewothertraining(?)', [request.session.atcolno], function (error, results, fields) {
		if(results[0].length > 0)
		{
			 response.json(results[0]);
		}
		else
		{
			response.write(
				'<script>window.alert("Unable To Process, Contact System Administrator");window.location.replace("https://vaahlogbook.herokuapp.com/ViewOTD");</script>'
			  );
	
		}
	});
});
app.post('/ViewEndorsement', function (request, response) {
	
	connection.query('call sp_ViewEndorsement(?)', [request.session.atcolno], function (error, results, fields) {
		if(results[0].length > 0)
		{
			 response.json(results[0]);
		}
		else
		{
			response.write(
				'<script>window.alert("Unable To Process, Contact System Administrator");window.location.replace("https://vaahlogbook.herokuapp.com/ViewEndorsement");</script>'
			  );
	
		}
	});
});
app.post('/ViewTraining', function (request, response) {
	
	connection.query('call sp_ViewTraining(?)', [request.session.atcolno], function (error, results, fields) {
		if(results[0].length > 0)
		{
			 response.json(results[0]);
		}
		if(error)
		{
			response.write(
				'<script>window.alert("Unable To Process, Contact System Administrator");window.location.replace("https://vaahlogbook.herokuapp.com/ViewTraining");</script>'
			  );
	
		}
	});
});
app.post('/ViewStress', function (request, response) {
	connection.query('call sp_CheckStress(?,?,?)', [request.session.atcolno,request.body.datefrom,request.body.dateto], function (error, results, fields) {
		if(results[0].length > 0)
		{
			 response.json(results[0][0].stresshours);
		}
		if(error)
		{
			response.write(
				'<script>window.alert("Unable To Process, Contact System Administrator");window.location.replace("https://vaahlogbook.herokuapp.com/ViewTraining");</script>'
			  );
	
		}
	});
});
app.post('/DeleteLogbook', function (request, response) {

	connection.query('call sp_DeleteLogbookData(?,?,?,?)', [request.session.atcolno,request.body.LogUnit,request.body.LogDate,request.body.LogTime], function (error, results, fields) {
		
		if(results.affectedRows > 0)
		{
			response.json[results];
			console.log("data-updated");
			//response.write(
			//	'<script>window.alert("Data Deleted Successfully!");window.location.replace("https://vaahlogbook.herokuapp.com/ViewLogbook");</script>'
			  //);
		}
	
		else
{
	console.log('data-not updated');
	response.write(
				'<script>window.alert("Error! Contact System Administrator");window.location.replace("https://vaahlogbook.herokuapp.com/ViewLogbook");</script>'
			  );
}
	});


});
app.post('/DeleteMedical', function (request, response) {

	connection.query('call sp_deleteMedical(?,?)', [request.session.atcolno,request.body.LogDate], function (error, results, fields) {
		if(results.affectedRows > 0)
		{
			response.write(
				'<script>window.alert("Data Deleted Successfully!");window.location.replace("https://vaahlogbook.herokuapp.com/ViewMedical");</script>'
			  );
		}
		else
{
	response.write(
				'<script>window.alert("Error! Contact System Administrator");window.location.replace("https://vaahlogbook.herokuapp.com/ViewMedical");</script>'
			  );
}
	});


});
app.post('/DeleteAELP', function (request, response) {

	connection.query('call sp_deleteAELP(?,?,?)', [request.session.atcolno,request.body.AELPrating,request.body.LogDate], function (error, results, fields) {
		if(results.affectedRows > 0)
		{
			response.write(
				'<script>window.alert("Data Deleted Successfully!");window.location.replace("https://vaahlogbook.herokuapp.com/ViewAELP");</script>'
			  );
		}
		else
{
	response.write(
				'<script>window.alert("Error! Contact System Administrator");window.location.replace("https://vaahlogbook.herokuapp.com/ViewAELP");</script>'
			  );
}
	});


});
app.post('/DeleteProficiency', function (request, response) {

	connection.query('call sp_deleteProficiency(?,?,?)', [request.session.atcolno,request.body.LogUnit,request.body.LogDate], function (error, results, fields) {
		if(results.affectedRows > 0)
		{
			response.write(
				'<script>window.alert("Data Deleted Successfully!");window.location.replace("https://vaahlogbook.herokuapp.com/ViewProficiency");</script>'
			  );
		}
		else
{
	response.write(
				'<script>window.alert("Error! Contact System Administrator");window.location.replace("https://vaahlogbook.herokuapp.com/ViewProficiency");</script>'
			  );
}
	});


});
app.post('/DeleteEndorsement', function (request, response) {

	connection.query('call sp_deleteEndorsement(?,?,?)', [request.session.atcolno,request.body.LogUnit,request.body.LogDate], function (error, results, fields) {
		if(results.affectedRows > 0)
		{
			response.write(
				'<script>window.alert("Data Deleted Successfully!");window.location.replace("https://vaahlogbook.herokuapp.com/ViewEndorsement");</script>'
			  );
		}
		else
{
	response.write(
				'<script>window.alert("Error! Contact System Administrator");window.location.replace("https://vaahlogbook.herokuapp.com/ViewEndorsement");</script>'
			  );
}
	});


});
app.post('/DeleteTraining', function (request, response) {

	connection.query('call sp_deletetraining(?,?,?,?)', [request.session.atcolno,request.body.LogCentre,request.body.LogCourse,request.body.LogDate], function (error, results, fields) {
		if(results.affectedRows > 0)
		{
			response.write(
				'<script>window.alert("Data Deleted Successfully!");window.location.replace("https://vaahlogbook.herokuapp.com/ViewTraining");</script>'
			  );
		}
		else
{
	response.write(
				'<script>window.alert("Error! Contact System Administrator");window.location.replace("https://vaahlogbook.herokuapp.com/ViewTraining");</script>'
			  );
}
	});


});
app.post('/DeleteOTD', function (request, response) {

	connection.query('call sp_deleteothertraining(?,?,?,?)', [request.session.atcolno,request.body.LogCentre,request.body.LogCourse,request.body.LogDate], function (error, results, fields) {
		if(results.affectedRows > 0)
		{
			response.write(
				'<script>window.alert("Data Deleted Successfully!");window.location.replace("https://vaahlogbook.herokuapp.com/ViewOTD");</script>'
			  );
		}
		else
{
	response.write(
				'<script>window.alert("Error! Contact System Administrator");window.location.replace("https://vaahlogbook.herokuapp.com/ViewOTD");</script>'
			  );
}
	});


});
app.post('/CheckRecency', function (request, response) {
	
	connection.query('call sp_checkrecency(?,?)', [request.session.atcolno,request.body.LogUnit], function (error, results, fields) {
		if(results[1].length > 0)
		{
			 response.json(results[1]);
		}
		else
		{
			response.write(
				'<script>window.alert("Unable To Process, Contact System Administrator");window.location.replace("https://vaahlogbook.herokuapp.com/Homepage");</script>'
			  );
	
		}
		
	});
});
app.post('/CheckProficiency', function (request, response) {
	
	connection.query('call sp_checkproficiency(?,?)', [request.session.atcolno,request.body.LogUnit], function (error, results, fields) {
		if(results[0].length > 0)
		{
			 response.json(results[0]);
		}
		else
		{
			response.write(
				'<script>window.alert("Unable To Process, Contact System Administrator");window.location.replace("https://vaahlogbook.herokuapp.com/Homepage");</script>'
			  );
	
		}
		
	});
});
app.listen(process.env.PORT || 3000);