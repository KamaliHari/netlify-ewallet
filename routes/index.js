var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const session = require('express-session');
const path = require('path'); 
let alert = require('alert'); 

var conn = mysql.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'root',      // Replace with your database username
  password: '23.11.2002root',      // Replace with your database password
  database: 'Walletapp' // // Replace with your database Name
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});


router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
//login auth
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, 'static')));

router.post('/login_t', function(request, response) {

	let username = request.body.uname;
	let password = request.body.psw;

	if (username && password) {
		a=conn.query('SELECT * FROM Customer_info2 WHERE username = ? AND password = ?', [username, password], function(error, results, fields){
			console.log(a);
      if (error) throw error;

			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/dashboard');
			} else {
				alert('Incorrect Username ');
}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});




router.get('/login_t', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.ejs'));
});




 
router.post('/register', function(req, res, next) {
  var uname = req.body.uname;
  var email = req.body.email;
  var mnum = req.body.mobileno;
  var psw = req.body.psw;
  var cpsw= req.body.conpsw;
  var accno= req.body.accno;
  var bank= req.body.bank;
  console.log(email);
  var sql = `INSERT INTO Customer_info1 (Username, email,mobileno, password,conpassword,accno,bank) VALUES ("${uname}","${email}","${mnum}","${psw}","${cpsw}","${accno}","${bank}")`;
  conn.query(sql, function(err, result){
  if (err) throw err;
  console.log('record inserted');
  res.redirect('/');
  
});
});



router.get('/', function(req, res, next) {
  res.render('login', { title: 'Home' });
});
router.get('/addwalletpts', function(req, res, next) {
  res.render('Add wallet points', { title: 'Home' });
});
router.get('/CheckWalletBal', function(req, res, next) {
  res.render('Check Wallet Balance', { title: 'Home' });
});
router.get('/dashbd', function(req, res, next) {
  res.render('dashboard', { title: 'Home' });
});
router.get('/signup', function(req, res, next) {
  res.render('Signup', { title: 'Home' });
});
router.get('/paymnt', function(req, res, next) {
  res.render('Payment', { title: 'Home' });
});
router.get('/payopts', function(req, res, next) {
  res.render('payoptions', { title: 'Home' });
});
router.get('/payTax', function(req, res, next) {
  res.render('PayTax', { title: 'Home' });
});
router.get('/qrc', function(req, res, next) {
  res.render('qrcode', { title: 'Home' });
});
router.get('/RecDTH', function(req, res, next) {
  res.render('RechargeDTH', { title: 'Home' });
});
router.get('/RecMob', function(req, res, next) {
  res.render('RechargeMob', { title: 'Home' });
});
router.get('/Transactionlist', function(req, res, next) {
  res.render('Transaction List', { title: 'Home' });
});
router.get('/UtiliBill', function(req, res, next) {
  res.render('UtilBill', { title: 'Home' });
});
router.get('/SFwallet', function(req, res, next) {
  res.render('wallet', { title: 'Home' });
});





module.exports = router;